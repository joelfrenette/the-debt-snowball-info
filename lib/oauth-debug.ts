/**
 * Utility functions for debugging OAuth issues
 */

/**
 * Logs important information about the current environment
 * that can help debug OAuth redirect issues
 */
export function logOAuthDebugInfo() {
  if (typeof window !== "undefined") {
    console.group("OAuth Debug Information")
    console.log("Current URL:", window.location.href)
    console.log("Origin:", window.location.origin)
    console.log("Protocol:", window.location.protocol)
    console.log("Hostname:", window.location.hostname)
    console.log("Port:", window.location.port)
    console.log("User Agent:", navigator.userAgent)
    console.groupEnd()
  }
}

/**
 * Validates a redirect URI to ensure it's properly formatted
 * @param uri The redirect URI to validate
 * @returns An object with validation results
 */
export function validateRedirectUri(uri: string) {
  try {
    const url = new URL(uri)
    const isHttps = url.protocol === "https:"
    const hasPath = url.pathname !== "/"

    return {
      isValid: true,
      url: url.toString(),
      isHttps,
      hasPath,
      warnings: [
        ...(isHttps ? [] : ["URI uses HTTP instead of HTTPS which may not be allowed in production"]),
        ...(hasPath ? [] : ["URI has no path component which is unusual for OAuth callbacks"]),
      ],
    }
  } catch (error) {
    return {
      isValid: false,
      error: "Invalid URL format",
      originalUri: uri,
    }
  }
}
