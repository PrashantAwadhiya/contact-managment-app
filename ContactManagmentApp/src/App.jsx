import React, { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Pagination from "./components/Pagination";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingContact, setEditingContact] = useState(null);

  const itemsPerPage = 20;

  const addContact = (contact) => {
    if (editingContact) {
      const updatedContacts = contacts.map((c, index) =>
        index === editingContact.index ? contact : c
      );
      setContacts(updatedContacts);
      setEditingContact(null);
    } else {
      setContacts([...contacts, contact]);
    }
  };

  const deleteContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.phone} ${contact.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const editContact = (index) => {
    setEditingContact({ ...contacts[index], index });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-gray-800 drop-shadow-md">
        📇 Contact Management
      </h1>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="🔍 Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[50%] shadow-xl p-4 mb-8 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 bg-white/90 backdrop-blur-lg"
        />
      </div>
      <div className="max-w-4xl mx-auto bg-white/90 p-8 rounded-2xl shadow-2xl backdrop-blur-lg">
        <ContactForm addContact={addContact} currentContact={editingContact} />
      </div>
      <div className="mt-10">
        <ContactList contacts={paginatedContacts} deleteContact={deleteContact} editContact={editContact} />
      </div>
      <div className="mt-8">
        <Pagination currentPage={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default App;
