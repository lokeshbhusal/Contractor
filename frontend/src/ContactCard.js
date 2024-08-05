import React, { useState, useEffect } from "react";
import PhoneList from "./PhoneList";

function ContactCard({ contact, deleteContact, fetchData }) {
  const [phones, setPhones] = useState([]);
  const [newPhoneName, setNewPhoneName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showPhones, setShowPhones] = useState(false);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    try {
      const data = await fetchData(
        `http://localhost/api/contacts/${contact.id}/phones`
      );
      setPhones(data);
    } catch (error) {
      console.log("Error fetching phones:", error);
    }
  };

  const deletePhone = (phoneId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this phone?");
    if (shouldDelete) {
      try {
        fetchData(`http://localhost/api/contacts/${contact.id}/phones/${phoneId}`, {
          method: "DELETE",
        })
          .then(() => {
            setPhones((prevPhones) => prevPhones.filter((phone) => phone.id !== phoneId));
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const addPhone = async () => {
    if (newPhoneName.trim() === "" || newPhoneNumber.trim() === "") {
      alert("Phone name and number cannot be blank");
      return;
    }
    try {
      await fetchData(
        `http://localhost/api/contacts/${contact.id}/phones`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newPhoneName,
            number: newPhoneNumber,
            contactId: contact.id,
          }),
        }
      );
      fetchPhones();
      setNewPhoneName("");
      setNewPhoneNumber("");
    } catch (error) {
      console.log("Error adding phone:", error);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-info">
        <div className="contact-name" onClick={() => setShowPhones(!showPhones)}>
          {contact.name}
        </div>
        <button className="delete-button" onClick={() => deleteContact(contact.id)}>
          Delete
        </button>
      </div>
      {phones.length > 0 && showPhones && <hr />}
      {showPhones && (
        <PhoneList
          phones={phones}
          deletePhone={deletePhone}
          addPhone={addPhone}
          newPhoneName={newPhoneName}
          newPhoneNumber={newPhoneNumber}
          setNewPhoneName={setNewPhoneName}
          setNewPhoneNumber={setNewPhoneNumber}
        />
      )}
    </div>
  );
}

export default ContactCard;
