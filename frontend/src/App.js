import React, { useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import Stats from "./Stats";
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState("");
  const [showStats, setShowStats] = useState(false); 

  const fetchData = async (url, options = {}) => {
    const response = await fetch(url, options);
    return await response.json();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await fetchData("http://localhost/api/contacts");
      setContacts(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const createContact = async (name) => {
    try {
      await fetchData("http://localhost/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      fetchContacts();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteContact = (contactId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this contact?");
    if (shouldDelete) {
      try {
        fetchData(`http://localhost/api/contacts/${contactId}`, {
          method: "DELETE",
        })
          .then(() => {
            setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== contactId));
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  // Function to toggle the visibility of stats
  const toggleStats = () => {
    setShowStats(!showStats);
  };

  return (
    <div className="app-container">
      <h1>Contactor</h1>
      <div className="main-container">
        <h2>Contact</h2>
        <div className="add-contact">
          <input
            type="text"
            placeholder="New Contact Name"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
          />
          <button
            onClick={() => {
              if (newContactName.trim() === "") {
                alert("Contact name cannot be blank");
                return;
              }
              createContact(newContactName);
              setNewContactName("");
            }}
          >
            Create Contact
          </button>
        </div>
        {contacts.length > 0 && <hr />}
        <div className="contact-list">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              deleteContact={deleteContact}
              fetchData={fetchData}
            />
          ))}
        </div>
      </div>
      <div className="ram">
        <button type="button" onClick={toggleStats} className="show-stats">
          {showStats ? "Hide stats" : "Show stats"}
        </button>
        {showStats && <Stats />}
      </div>
    </div>
  );
}

export default App;
