const getAll = (req, res) => {
  res.send("I will be get all metro");
};

const getById = (req, res) => {
  res.send("I will be the get Id: " + req.params.id);
};

module.exports = {
  getAll,
  getById,
};
