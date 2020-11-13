const stripeKey = 'sk_test_51GxExbKOFmCt70mTAL9hWLykXWsSDz6j8AonY5UyCtnyDWA8H8eNmnDfquxJJQLrjGELbTLgnCKTL16mJZrvaimL003BM83ePs';
const stripe = require('stripe')(stripeKey);

const getStripeSession = (lineItems) => {
    const sessionData = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:4000/RegistrationDone.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4000/index.html',
    };

  return stripe.checkout.sessions.create(sessionData);
}

module.exports = {
  getStripeSession: getStripeSession
};