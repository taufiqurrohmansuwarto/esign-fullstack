// this must be validator
const { body, validationResult } = require("express-validator");

const validator = [
  // all is required
  body("properties")
    .isArray()
    .withMessage("properties must be array")
    .notEmpty()
    .withMessage("properties must not be empty"),
  body("properties.*.xPos")
    .isNumeric()
    .withMessage("xPos must be number")
    .notEmpty()
    .withMessage("xPos must not be empty"),
  body("properties.*.yPos")
    .isNumeric()
    .withMessage("yPos must be number")
    .notEmpty()
    .withMessage("yPos must not be empty"),
  body("properties.*.width")
    .isNumeric()
    .withMessage("width must be number")
    .notEmpty()
    .withMessage("width must not be empty"),
  body("properties.*.height")
    .isNumeric()
    .withMessage("height must be number")
    .notEmpty()
    .withMessage("height must not be empty"),
  body("properties.*.page")
    .isNumeric()
    .withMessage("page must be number")
    .notEmpty()
    .withMessage("page must not be empty"),
  body("passphrase")
    .notEmpty()
    .withMessage("passphrase must not be empty")
    .isString()
    .withMessage("passphrase must be string"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

const selfSignValidator = {
  validator,
  validate,
};

module.exports = selfSignValidator;
