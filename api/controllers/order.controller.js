const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { gigId } = req.body;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
      // ...other session configuration
    });

    res.status(200).json({ stripeSession: session });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ message: 'Payment setup failed' });
  }
};