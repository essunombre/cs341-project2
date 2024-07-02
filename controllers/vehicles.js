// Db connection
const mongodb = require("../data/database");
// unique id, the primaryKey
const {ObjectId} = require("mongodb");

const getAll = async (req, res) => {
  const result = await mongodb.getDatabase().db().collection('vehicles').find();
  result.toArray().then((vehicles) =>{
    res.setHeader("Content-type", "application/json");
    res.status(200).json(vehicles);
  })
};

const getById = async (req, res) => {
  // res.send("I will be the get Id: " + req.params.id);
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid contact id to find a contact.");
  }
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("vehicles")
      .findOne({ _id: userId });

    if (result) {
      res.setHeader("Content-type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).send("Contact not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAll,
  getById,
};
