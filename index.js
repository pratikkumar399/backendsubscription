const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51NOQr6SDTAaBjofmR9v3X8y4OWVTGnGwA5IJDVpuxnt0NbKKhjaqEtRBRCEhLq60GE2hUq3tP4SFEdbspTXnkFG000BYfFmkeR');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const home = require("./public/home");

app.use("/home", home);
app.post('/create-payment-intent', async (req, res) => {
    const { amount, currency, description } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            description, // Add the description to the payment intent
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Payment intent creation failed' });
    }
});




const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

