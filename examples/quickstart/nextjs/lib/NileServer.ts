import Nile from "@niledatabase/server";
import AuthCookieData from "@/lib/AuthUtils";

// Initialize the Nile server object for reuse in all pages
// Note that the Nile server configuration points to Nile APIs as the base path

const nile = Nile();

export default nile;

// This returns a reference to the Nile Server, configured with the user's auth token and tenantID (if any)
// If Nile already have a connection to the same tenant database for the same user, we'll return an existing connection
export async function configureNile(
  rawAuthCookie: any,
  tenantId: string | null | undefined
) {
  const authData = JSON.parse(rawAuthCookie.value) as AuthCookieData;
  const server = await nile;
  return server.getInstance({
    //debug: true,
    tenantId: tenantId,
    userId: authData.tokenData?.sub,
    api: {
      token: authData.accessToken,
    },
  });
}
