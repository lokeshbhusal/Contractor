const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

//function for error handling
const handleError = (res, message, status = 500) => {
  res.status(status).send({ message });
};
// create
exports.create = async (req, res) => {
  try {
    const phoneData = {
      name: req.body.name,
      number: req.body.number,
      contactId: req.body.contactId,
    };

    const newPhone = await Phones.create(phoneData);
    res.send(newPhone);
  } catch (err) {
    handleError(res, err.message || "An error occurred while creating a phone record.");
  }
};

// Get all phones
exports.findAll = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const phones = await Phones.findAll({ where: { contactId: contactId } });
    res.send(phones);
  } catch (err) {
    handleError(res, err.message || "An error occurred while retrieving phone records.");
  }
};

// Get one phone by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.phoneId;
    const phone = await Phones.findByPk(id);

    if (phone) {
      res.send(phone);
    } else {
      handleError(res, `Phone with id=${id} not found`, 404);
    }
  } catch (err) {
    handleError(res, err.message || "An error occurred while retrieving the phone record.");
  }
};

// Update one phone by id
exports.update = async (req, res) => {
  try {
    const id = req.params.phoneId;
    const [numUpdated] = await Phones.update(req.body, {
      where: { id: id },
    });

    if (numUpdated === 1) {
      res.send({ message: "Phone updated successfully." });
    } else {
      handleError(res, `Cannot update Phone with id=${id}.`);
    }
  } catch (err) {
    handleError(res, err.message || "An error occurred while updating the phone record.");
  }
};

// Delete one phone by id
exports.delete = async (req, res) => {
  try {
    const id = req.params.phoneId;
    const numDeleted = await Phones.destroy({
      where: { id: id },
    });

    if (numDeleted === 1) {
      res.send({ message: "Phone was deleted successfully." });
    } else {
      handleError(res, `Cannot delete Phone with id=${id}.`);
    }
  } catch (err) {
    handleError(res, err.message || "An error occurred while deleting the phone record.");
  }
};
