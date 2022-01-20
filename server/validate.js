const { check, validationResult, body } = require("express-validator");
const Schedule = require("./models/Schedule");

exports.validateRegister = [
  check("name", "Please enter a name").not().isEmpty(),
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6,
  }),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];

exports.validateScheduleSchema = [
  body("name", "schedule name is required")
    .not()
    .isEmpty()
    .isString()
    .custom(async (name, { req }) => {
      const schedule = await Schedule.findOne({
        name,
        profileId: req.profile.id,
      });
      if (schedule) {
        return Promise.reject("Schedule name is already exists");
      }
    }),
  body("days.*.isAvailable", "is available required")
    .not()
    .isEmpty()
    .isBoolean()
    .withMessage("only accepts true or false"),

  body("days.*.start", "start hour is required")
    .notEmpty()
    .isInt({ min: 0, max: 23 })
    .withMessage("start hour should be a number between 0 to 23"),
  body("days.*.end", "end hour is required")
    .notEmpty()
    .isInt({ min: 0, max: 23 })
    .withMessage("end hour should be a number between 0 to 23"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
