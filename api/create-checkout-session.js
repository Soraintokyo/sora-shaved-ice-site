// /api/create-checkout-session.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { quantity } = req.body;               // how many scoops, etc.
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price: 'prod_S991tvwTQSi514',           // the product’s Price ID you set up
      quantity: quantity || 1,
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/`,
  });
  res.json({ id: session.id });
}
const session = await stripe.checkout.sessions.create({
    /* … */
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${req.headers.origin}/cancel`,
  });
  