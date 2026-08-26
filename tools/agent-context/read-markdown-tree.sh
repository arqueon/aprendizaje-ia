#!/usr/bin/env bash

set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  read-markdown-tree.sh ROOT validate
  read-markdown-tree.sh ROOT list-pages [FILTER]
  read-markdown-tree.sh ROOT headings PAGE_TITLE
  read-markdown-tree.sh ROOT range PAGE_TITLE START_LINE END_LINE
  read-markdown-tree.sh ROOT search PATTERN [pages|journals|all]
  read-markdown-tree.sh ROOT journal YYYY_MM_DD

This helper only reads a Markdown tree with pages/, journals/, and logseq/.
It never creates, edits, renames, or deletes files.
USAGE
}

fail() {
  printf 'read-markdown-tree: %s\n' "$1" >&2
  exit 2
}

if [[ $# -lt 2 ]]; then
  usage >&2
  exit 2
fi

root_input=$1
command_name=$2
shift 2

if ! context_root=$(readlink -f -- "$root_input"); then
  fail "cannot resolve ROOT"
fi

[[ -d "$context_root/pages" ]] || fail "ROOT has no pages/ directory"
[[ -d "$context_root/journals" ]] || fail "ROOT has no journals/ directory"
[[ -d "$context_root/logseq" ]] || fail "ROOT has no logseq/ directory"

page_path() {
  local page_title=${1:-}
  local candidate
  local resolved

  [[ -n "$page_title" ]] || fail "PAGE_TITLE is required"
  [[ "$page_title" != */* && "$page_title" != *'..'* ]] || fail "PAGE_TITLE must be an exact page name"

  candidate="$context_root/pages/$page_title.md"
  [[ -f "$candidate" ]] || fail "page not found: $page_title"
  resolved=$(readlink -f -- "$candidate") || fail "cannot resolve page: $page_title"

  case "$resolved" in
    "$context_root"/pages/*) printf '%s\n' "$resolved" ;;
    *) fail "page resolves outside pages/" ;;
  esac
}

case "$command_name" in
  validate)
    [[ $# -eq 0 ]] || fail "validate accepts no additional arguments"
    printf 'OK pages=%s journals=%s logseq=%s\n' \
      "$context_root/pages" "$context_root/journals" "$context_root/logseq"
    ;;

  list-pages)
    [[ $# -le 1 ]] || fail "list-pages accepts at most one FILTER"
    page_filter=${1:-}
    if [[ -n "$page_filter" ]]; then
      rg --files "$context_root/pages" | sed -e "s#^$context_root/pages/##" -e 's/\.md$//' | sort | rg -- "$page_filter" || true
    else
      rg --files "$context_root/pages" | sed -e "s#^$context_root/pages/##" -e 's/\.md$//' | sort
    fi
    ;;

  headings)
    [[ $# -eq 1 ]] || fail "headings requires PAGE_TITLE"
    target_page=$(page_path "$1")
    rg -n '^(- )?#{1,4}[[:space:]]' "$target_page" || true
    ;;

  range)
    [[ $# -eq 3 ]] || fail "range requires PAGE_TITLE START_LINE END_LINE"
    target_page=$(page_path "$1")
    start_line=$2
    end_line=$3
    [[ "$start_line" =~ ^[1-9][0-9]*$ && "$end_line" =~ ^[1-9][0-9]*$ ]] || fail "line numbers must be positive integers"
    (( start_line <= end_line )) || fail "START_LINE must not exceed END_LINE"
    (( end_line - start_line < 400 )) || fail "range is limited to 400 lines"
    sed -n "${start_line},${end_line}p" "$target_page"
    ;;

  search)
    [[ $# -ge 1 && $# -le 2 ]] || fail "search requires PATTERN and optional scope"
    search_pattern=$1
    search_scope=${2:-all}
    case "$search_scope" in
      pages) search_targets=("$context_root/pages") ;;
      journals) search_targets=("$context_root/journals") ;;
      all) search_targets=("$context_root/pages" "$context_root/journals") ;;
      *) fail "scope must be pages, journals, or all" ;;
    esac
    rg -n --glob '*.md' -- "$search_pattern" "${search_targets[@]}" || true
    ;;

  journal)
    [[ $# -eq 1 ]] || fail "journal requires YYYY_MM_DD"
    journal_date=$1
    [[ "$journal_date" =~ ^[0-9]{4}_[0-9]{2}_[0-9]{2}$ ]] || fail "journal date must use YYYY_MM_DD"
    journal_path="$context_root/journals/$journal_date.md"
    [[ -f "$journal_path" ]] || fail "journal not found: $journal_date"
    resolved_journal=$(readlink -f -- "$journal_path") || fail "cannot resolve journal"
    case "$resolved_journal" in
      "$context_root"/journals/*) sed -n '1,400p' "$resolved_journal" ;;
      *) fail "journal resolves outside journals/" ;;
    esac
    ;;

  help|-h|--help)
    usage
    ;;

  *)
    usage >&2
    fail "unknown command: $command_name"
    ;;
esac
