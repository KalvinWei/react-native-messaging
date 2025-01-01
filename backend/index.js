const express = require("express");
const axios = require("axios");
const { StreamChat } = require("stream-chat");

const app = express();
app.use(express.json());

const streamApiKey = "awv9qgdaawex";
const streamApiSecret =
  "6zw66syuaem9z8q54es9kygz5fq7j25nemgwurc4erk4vt2qrtxqhgathamk9h75";
const streamServerClient = StreamChat.getInstance(
  streamApiKey,
  streamApiSecret
);

app.post("/api/get-stream-token", async (req, res) => {
  const { azureToken } = req.body;

  // Verify the Azure AD token (this step is simplified for the example)
  const userInfo = await axios.get("https://graph.microsoft.com/v1.0/me", {
    headers: { Authorization: `Bearer ${azureToken}` },
  });

  const userId = userInfo.data.id;
  const userName = userInfo.data.displayName;

  // Generate a Stream Chat token
  const streamToken = streamServerClient.createToken(userId);

  res.json({ streamToken, userId, userName });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
