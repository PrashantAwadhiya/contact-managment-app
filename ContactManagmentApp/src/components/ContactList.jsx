import React from "react";

const ContactList = ({ contacts, deleteContact, editContact }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-6">
      {contacts.map((contact, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
        >
          <img
            src={contact.imageUrl}
            alt={contact.name}
            className="w-16 h-16 rounded-full mx-auto mb-4"
          />
          <h3 className="text-xl font-bold text-center">{contact.name}</h3>
          <p className="text-center text-gray-600">{contact.phone}</p>
          <p className="text-center text-gray-600">{contact.email}</p>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => editContact(index)}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteContact(index)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
