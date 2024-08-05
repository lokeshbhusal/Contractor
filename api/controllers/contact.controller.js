const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;
const Op = db.Sequelize.Op;


// function for error handling
const handleError = (res, message, status = 500) => {
  res.status(status).send({ message });
};

// Create contact

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const newContact = await Contacts.create({ name });
    res.send(newContact);
  } catch (err) {
    handleError(res, err.message || "An error occurred while creating a contact");
  }
};

// Get all contacts
exports.findAll = async (req, res) => {
  try {
    const contacts = await Contacts.findAll();
    res.send(contacts);
  } catch (err) {
    handleError(res, err.message || "An error occurred while retrieving contacts.");
  }
};

// Get one contact by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.contactId;
    const contact = await Contacts.findByPk(id);
    
    if (contact) {
      res.send(contact);
    } else {
      handleError(res, `Contact with id=${id} not found`, 404);
    }
  } catch (err) {
    handleError(res, err.message || "An error occurred while retrieving the contact.");
  }
};
// update contact
exports.update = async (req, res) => {
  try {
    const id = req.params.contactId;
    const [numUpdated] = await Contacts.update(req.body, {
      where: { id: id },
    });

    if (numUpdated === 1) {
      res.send({ message: "Contact updated successfully." });
    } else {
      handleError(res, `Cannot update Contact with id=${id}.`);
    }
  } catch (err) {
    handleError(res, err.message || "An error occurred while updating the contact.");
  }
};

exports.delete = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    // Delete associated phones first
    await Phones.destroy({ where: { contactId } });

    // After phones are deleted, delete the contact
    const numDeleted = await Contacts.destroy({ where: { id: contactId } });

    if (numDeleted === 1) {
      res.send({
        message: "Contact was deleted successfully!",
      });
    } else {
      res.status(404).send({
        message: `Contact with id=${contactId} not found`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error deleting Contact with id=${contactId}`,
      error: err.message,
    });
  }
};








