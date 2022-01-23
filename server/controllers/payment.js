const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);
const User = require("../models/User");

const createOrRetrieveStripeCustomer = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found!!");
  }
  if (user.stripeCustomerId !== "") {
    return await stripe.customers.retrieve(user.stripeCustomerId);
  }
  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
  });
  if (!customer) {
    throw new Error("Unable to create payment account!!");
  }
  user.set({ stripeCustomerId: customer.id });
  const saveUser = await user.save();
  if (!saveUser) {
    throw new Error("Unable to link payment account to user account!!");
  }
  return customer;
};

exports.getClientSecret = asyncHandler(async (req, res, next) => {
  const customer = await createOrRetrieveStripeCustomer(req.user.id);
  if (!customer) {
    res.status(400);
    throw new Error("Unable to create customer");
  }
  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ["card"],
  });
  if (!setupIntent) {
    res.status(404);
    throw new Error("Unable proccess payment setup");
  }
  res.status(200);
  res.send({ client_secret: setupIntent.client_secret });
});
