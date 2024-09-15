export function getBaseUrl() {
   return process.env?.REACT_APP_BASE_URL ?? `/api/v1`;
}