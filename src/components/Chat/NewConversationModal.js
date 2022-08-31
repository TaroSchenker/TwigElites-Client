import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../../contexts/ContactsProvider";
import { useConversations } from "../../contexts/ConversationsProvider";

const NewConversationModal = ({ closeModal }) => {
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    createConversation(selectedContactsIds);
    closeModal();
  };

  const handleCheckboxChange = (contactId) => {
    console.log(contactId);
    setSelectedContactsIds((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter((prevId) => {
          return contactId !== prevId;
        });
      } else {
        return [...prevSelectedContactIds, contactId];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map((contact) => (
            <Form.Group
              controlId={contact.id}
              key={contact.id}
              className="text-black d-flex"
            >
              <Form.Check
                type="checkbox"
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              ></Form.Check>
              {contact.id}
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default NewConversationModal;
