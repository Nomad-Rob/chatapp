// Setting up the Express Server

const express = require('express');
// Call server any other orgin
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
// Adding JSON body parser middleware
app.use(express.json());
app.use(cors({ origin: true }));

// Adding Post Route
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      'https://api.chatengine.io/users/',
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "a5797d0d-cd91-4017-b04b-6801f2b5fe33" }}
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  // console.log("Fetch user from DB.");
  // return res.json({ user: {} });

  // Fetch this user from Chat Engine in this project!
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

// Docs at rest.chatengine.io
// vvv On port 3001!
app.listen(3001);
