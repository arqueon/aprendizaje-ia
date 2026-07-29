import path from "node:path";
import { fileURLToPath } from "node:url";

export function validateBaseURL(candidate) {
  if (!candidate || /[\u0000-\u001f\u007f]/.test(candidate)) {
    throw new Error("base_url contiene controles o está vacía");
  }

  const url = new URL(candidate);
  if (url.protocol !== "https:") {
    throw new Error("base_url debe usar HTTPS");
  }
  if (url.username || url.password) {
    throw new Error("base_url no puede contener credenciales");
  }
  if (url.search || url.hash) {
    throw new Error("base_url no puede contener consulta ni fragmento");
  }
  if (!url.pathname.endsWith("/")) {
    throw new Error("base_url debe terminar en /");
  }
  return url.href;
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const normalized = validateBaseURL(process.env.HUGO_BASEURL);
  console.log(`Hugo base URL válida: ${normalized}`);
}
