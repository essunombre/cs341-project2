// Db connection
const mongodb = require("../data/database");
// unique id, the primaryKey
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(users);
  });
};

const getById = async (req, res) => {
  // res.send("I will be the get Id: " + req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid userId to find a user.");
  }
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .findOne({ _id: userId });

    if (result) {
      res.setHeader("Content-type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createUser = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    licenseNumber: req.body.licenseNumber,
    vehicleId: req.body.vehicleId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(user);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Inserting the user");
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid User id to find a User.");
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirthday: req.body.dateOfBirthday,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    licenseNumber: req.body.licenseNumber,
    vehicleId: req.body.vehicleId,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Updating the user");
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid userId to find a user.");
  }
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // User successfully deleted
    } else {
      res.status(404).json("User not found"); // No user found with the given ID
    }
  } catch (e) {
    res.status(500).json(e.toString()); // Handle any errors
  }
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser,
};
