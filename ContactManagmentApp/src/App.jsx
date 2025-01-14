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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        Contact Management App
      </h1>
     
      <ContactForm
        addContact={addContact}
        currentContact={editingContact}
      />

     <input
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-[60%] shadow-lg p-3 my-7 border rounded-lg mx-auto block"
      />

      <ContactList
        contacts={paginatedContacts}
        deleteContact={deleteContact}
        editContact={editContact}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default App;
