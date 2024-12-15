/**
 * Safely joins URL parts handling trailing and leading slashes
 * @param base - The base URL
 * @param paths - The path segments to join
 * @returns A properly formatted URL
 */
export function joinUrl(base: string, ...paths: string[]): string {
  // Remove trailing slashes from base and leading/trailing slashes from paths
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPaths = paths.map((path) => path.replace(/^\/+|\/+$/g, ""));

  // Join all parts with a single slash
  return [cleanBase, ...cleanPaths].join("/");
}
