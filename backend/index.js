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

app.listen(3001);
