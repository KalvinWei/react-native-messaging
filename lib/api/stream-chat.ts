import axios from "axios";

/**
 *
 * @param accessToken access token from Azure AD
 */
export default async function getStreamToken(accessToken: string) {
  const response = await axios.post(
    "http://localhost:3000/api/get-stream-token",
    {
      azureToken: accessToken,
    }
  );

  return response.data.streamToken;
}
