export function getBaseUrl() {
   return process.env?.REACT_APP_BASE_URL ?? `//${window.location.hostname}:8080/api/v1`;
}