const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

app.use(express.json());

app.post('/call-python-endpoint', async (req, res) => {
  try {
    // Extract the message from the request
    const message = req.body.message;

    // Call the Python server endpoint
    const pythonResponse = await axios.post('http://python-server:5000/python-endpoint', { message });

    // Log the Python server's response
    console.log('Python Server Response:', pythonResponse.data);

    res.json({ success: true, message: 'Request sent to Python server' });
  } catch (error) {
    console.error('Error calling Python server:', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Node.js Server running on http://localhost:${port}`);
});
