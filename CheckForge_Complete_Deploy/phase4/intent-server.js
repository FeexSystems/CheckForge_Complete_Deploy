
const express = require('express');
const bodyParser = require('body-parser');
const { parse } = require('./intentParser');
const app = express();
app.use(bodyParser.json());

app.post('/api/voice-intent', async (req, res) => {
  const text = req.body.transcript;
  const intent = await parse(text);
  res.json({ success: true, intent });
});

app.listen(4000, () => console.log('Voice intent server running on port 4000'));
