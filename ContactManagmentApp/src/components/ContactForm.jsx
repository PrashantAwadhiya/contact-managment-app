import React, { useState, useEffect } from "react";
import uploadImageToCloudinary from "../utils/Cloudinary";

const ContactForm = ({ addContact, currentContact }) => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    imageUrl: "",
  });
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
    if (currentContact) {
      setContact(currentContact);
    }
  }, [currentContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploadedImageUrl = await uploadImageToCloudinary(file);
      setContact({ ...contact, imageUrl: uploadedImageUrl });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(contact);
    setContact({ name: "", phone: "", email: "", imageUrl: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {currentContact ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        value={contact.name}
        onChange={handleChange}
        placeholder="Name"
        className="w-full p-3 mb-4 border rounded-lg focus:border-blue-500"
        required
      />
      <input
        type="text"
        name="phone"
        value={contact.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="w-full p-3 mb-4 border rounded-lg focus:border-blue-500"
        required
      />
      <input
        type="email"
        name="email"
        value={contact.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 mb-4 border rounded-lg focus:border-blue-500"
        required
      />
      <div className="mb-4">
        <label className="block mb-2 text-gray-600">Upload Photo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />
        {uploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
        {contact.imageUrl && (
          <p className="text-sm text-green-500 mt-2">Photo uploaded successfully!</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
      >
        {currentContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
