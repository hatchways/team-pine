const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);
const User = require("../models/User");
const Profile = require("../models/Profile");
const Request = require("../models/Request");
const moment = require("moment");

const calculateTotalHours = (start, end) => {
  var duration = moment.duration(moment(end).diff(start));
  return duration.asHours();
};
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

// @route GET /payments/secret
// @desc Get setup intent client secret
// @access Private
exports.getClientSecret = asyncHandler(async (req, res, next) => {
  const customer = await createOrRetrieveStripeCustomer(req.user.id);
  if (!customer) {
    res.status(404);
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

// @route GET /payments/saved-cards
// @desc Get list of saved cards
// @access Private
exports.getListOfPaymentSources = asyncHandler(async (req, res, next) => {
  const customer = await createOrRetrieveStripeCustomer(req.user.id);
  if (!customer) {
    res.status(404);
    throw new Error("Customer's payment account is not exists!!");
  }
  const cards = await stripe.customers.listSources(customer.id, {
    object: "card",
    limit: 3,
  });
  if (!cards) {
    res.status(404);
    throw new Error("No Card is setup yet!!");
  }
  res.status(200);
  res.send({
    success: {
      cards: cards.data,
    },
  });
});

// @route POST /payments/charge-default-card
// @desc collect payment from customer's saved card
// @access Private
exports.chargeSavedPaymentMethod = asyncHandler(async (req, res, next) => {
  const { requestId } = req.body;
  if (!requestId) {
    res.status(400);
    throw new Error("Please provide a request id to process payment");
  }
  const request = await Request.findById(requestId);
  if (!request) {
    res.status(404);
    throw new Error("Request Not Found!!");
  }
  const { requester, startDate, endDate } = request;
  const profile = await Profile.findById(requester);
  const customer = await createOrRetrieveStripeCustomer(profile.userId);
  if (!customer) {
    res.status(404);
    throw new Error("Unable to create a payment account!!");
  }
  const paymentMethods = await stripe.customers.listPaymentMethods(
    customer.id,
    { type: "card" }
  );
  if (!paymentMethods) {
    res.status(404);
    throw new Error("Unable to fetch saved payment methods!!");
  }
  if (!paymentMethods.data === []) {
    res.status(404);
    throw new Error("Payment method needs to be setup");
  }
  const amountNeedsToBeCharged = calculateTotalHours(startDate, endDate);
  if (amountNeedsToBeCharged < 1) {
    res.status(400);
    throw new Error("Hours of diffrence should be more than zero");
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountNeedsToBeCharged * 100,
    currency: "cad",
    customer: customer.id,
    payment_method: paymentMethods.id,
    off_session: true,
    confirm: true,
  });
  if (!paymentIntent) {
    res.status(404);
    throw new Error("Unable to charge the saved payment method!!");
  }
  res.status(200);
  res.send(paymentIntent);
});
