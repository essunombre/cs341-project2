const validator = require("../helpers/validate");

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    dateOfBirth: "required|string",
    gender: "required|string",
    phoneNumber: "string",
    licenseNumber: "required|string",
    vehicleId: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "User validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveVehicle = (req, res, next) => {
  const validationRule = {
    make: "required|string",
    model: "required|string",
    color: "required|string",
    year: "required|min:2000|max:2025",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Vehicle validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
    saveUser,
    saveVehicle,
};
