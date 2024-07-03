// Db connection
const mongodb = require("../data/database");
// unique id, the primaryKey
const { ObjectId } = require("mongodb");


const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection("vehicles").find();
  result.toArray().then((vehicles) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(vehicles);
  });
};

const getById = async (req, res) => {
  // res.send("I will be the get Id: " + req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid vehicleId to find a vehicle.");
  }
  try {
    const vehicleId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("vehicles")
      .findOne({ _id: vehicleId });

    if (result) {
      res.setHeader("Content-type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).send("Vehicle not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createVehicle = async (req, res) => {
  const vehicle = {
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    year: req.body.year,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("vehicles")
    .insertOne(vehicle);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while Inserting the vehicle"
      );
  }
};

const updateVehicle = async (req, res) => {
  //#swagger.tags=['Contacts']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid vehicleId to find a Vehicle.");
  }
  const vehicleId = new ObjectId(req.params.id);
  const vehicle = {
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    year: req.body.year,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("vehicles")
    .replaceOne({ _id: vehicleId }, vehicle);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while Updating the Vehicle");
  }
};

const deleteVehicle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid vehicleId to find a vehicle.");
  }
  const vehicleId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("vehicles")
      .deleteOne({ _id: vehicleId });

    if (result.deletedCount > 0) {
      res.status(204).send(); // Vehicle successfully deleted
    } else {
      res.status(404).json("Vehicle not found"); // No vehicle found with the given ID
    }
  } catch (e) {
    res.status(500).json(e.toString()); // Handle any errors
  }
};

module.exports = {
  getAll,
  getById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
};
