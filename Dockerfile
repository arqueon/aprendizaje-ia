# syntax=docker/dockerfile:1.7

ARG NODE_IMAGE=node:22.22.0-bookworm-slim@sha256:dd9d21971ec4395903fa6143c2b9267d048ae01ca6d3ea96f16cb30df6187d94
ARG NGINX_IMAGE=nginxinc/nginx-unprivileged:1.29.4-alpine3.23@sha256:a6c4f61f456b85b8fdf7ec7ab28cc3e299440e6fb4a9dea520e5fd8fd440025e

FROM ${NODE_IMAGE} AS build

ARG TARGETARCH
ARG HUGO_BASEURL
ARG HUGO_VERSION=0.164.0
ARG GO_VERSION=1.25.6

ENV HUGO_ENVIRONMENT=production \
    HUGO_CACHEDIR=/tmp/hugo-cache \
    PATH=/usr/local/go/bin:${PATH}

RUN set -eux; \
    apt-get update; \
    apt-get install --yes --no-install-recommends ca-certificates curl git; \
    rm -rf /var/lib/apt/lists/*; \
    case "${TARGETARCH}" in \
      amd64) \
        go_sha="f022b6aad78e362bcba9b0b94d09ad58c5a70c6ba3b7582905fababf5fe0181a"; \
        hugo_sha="fea17b8c076f950bb2e9f9486667bdaa29422883888d509d63931c73e8a9b3a4" ;; \
      arm64) \
        go_sha="738ef87d79c34272424ccdf83302b7b0300b8b096ed443896089306117943dd5"; \
        hugo_sha="232d3bc2d1d9510625985ff7c89767598ffea5bc6e5e2882c791313f5a43f723" ;; \
      *) echo "Arquitectura no soportada: ${TARGETARCH}" >&2; exit 64 ;; \
    esac; \
    curl --fail --location --silent --show-error \
      "https://go.dev/dl/go${GO_VERSION}.linux-${TARGETARCH}.tar.gz" \
      --output /tmp/go.tar.gz; \
    echo "${go_sha}  /tmp/go.tar.gz" | sha256sum --check --strict; \
    tar --extract --gzip --file /tmp/go.tar.gz --directory /usr/local; \
    curl --fail --location --silent --show-error \
      "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-${TARGETARCH}.tar.gz" \
      --output /tmp/hugo.tar.gz; \
    echo "${hugo_sha}  /tmp/hugo.tar.gz" | sha256sum --check --strict; \
    tar --extract --gzip --file /tmp/hugo.tar.gz --directory /usr/local/bin hugo; \
    rm /tmp/go.tar.gz /tmp/hugo.tar.gz; \
    go version; \
    hugo version; \
    node --version

WORKDIR /srv/source

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts --no-audit --no-fund

COPY . .

RUN test -n "${HUGO_BASEURL}" \
    && npm run h5p:verify \
    && node tools/container/build-site.mjs "${HUGO_BASEURL}" /opt/site-root

FROM ${NGINX_IMAGE} AS runtime

COPY deploy/nginx/mime.types /etc/nginx/mime.types
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build --chown=101:101 /opt/site-root/ /usr/share/nginx/html/

USER 101:101
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -T 2 -O /dev/null http://127.0.0.1:8080/healthz || exit 1
