import React from "react";

function PhoneList({
  phones,
  deletePhone,
  addPhone,
  newPhoneName,
  newPhoneNumber,
  setNewPhoneName,
  setNewPhoneNumber,
}) {
  return (
    <div className="phone-list-container">
      <div className="add-phone-form">
        <input
          type="text"
          placeholder="Name"
          value={newPhoneName}
          onChange={(e) => setNewPhoneName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newPhoneNumber}
          onChange={(e) => {
            const inputValue = e.target.value.replace(/[^0-9]/g, "");
            const truncatedValue = inputValue.slice(0, 10);
            setNewPhoneNumber(truncatedValue);
          }}
          maxLength="10"
        />

        <button className="add-phone-button" onClick={addPhone}>
          Add
        </button>
      </div>
      <table className="phone-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((phone) => (
            <tr key={phone.id}>
              <td>{phone.name}</td>
              <td>{phone.number}</td>
              <td>
                <button className="delete-button" onClick={() => deletePhone(phone.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default PhoneList;
