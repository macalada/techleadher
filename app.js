const express = require('express');
const { response } = require('express');
const app = express();
const { getStripeSession } = require('./utils')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/stripe/checkout/', async (req, res) => {
  
  const lineItems = req.body.lineItems;
  const session = await getStripeSession(lineItems);
  console.log('session id: ', session)
  res.json({session_id: session.id});
  
});



const PORT = process.env.PORT || 4000;
// Use static server to serve the Express Yourself Website
app.use(express.static('public'));



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
