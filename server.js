const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const port = 3000; // Change to your desired port

app.use(bodyParser.json());
app.use(cors())
// Endpoint to handle incoming webhook data
app.post('/webhook', (req, res) => {
    const cartData = req.body;

    // Process the cart data (for demonstration, we'll just log it)
    console.log('Received cart data:', cartData);

    // Send a response if needed
    res.status(200).json({ message: 'Webhook received data successfully' });
});

app.listen(port, () => {
    console.log(`Webhook server is running on port ${port}`);
});
