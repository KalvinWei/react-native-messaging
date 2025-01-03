import { clientId, tenantId } from "lib/environment/azure-auth-config";
import * as AuthSession from "expo-auth-session";
import axios from "axios";

const discovery = {
  authorizationEndpoint: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
  tokenEndpoint: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
};

export async function signInWithAzureAD() {
  try {
    const authRequest = new AuthSession.AuthRequest({
      clientId,
      redirectUri: "com.zensoft.rnmsg://auth",
      scopes: ["openid", "profile", "email", "User.Read"],
      responseType: AuthSession.ResponseType.Token,
    });

    const result = await authRequest.promptAsync(discovery);
    if (result.type === "success") {
      const accessToken = result.params.access_token;

      const userProfileResponse = await axios.get(
        "https://graph.microsoft.com/v1.0/me",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const profile = userProfileResponse.data;

      if (profile) {
        return {
          user: {
            id: profile.id,
            name: profile.displayName,
          },
          accessToken,
        };
      }
    } else {
      throw new Error("Failed to sign in with Azure AD");
    }
  } catch (error) {
    console.error("Error in signInWithAzureAD:", error);
  }
}

export function signOutWithAzureAD() {
  try {
    AuthSession.dismiss();
  } catch (error) {
    console.error("Error in signOutWithAzureAD:", error);
  }
}
