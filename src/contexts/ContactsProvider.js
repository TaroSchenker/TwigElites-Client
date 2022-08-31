import { useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactsContext = createContext();

export const useContacts = () => {
  return useContext(ContactsContext);
};

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);

  const createContact = (id) => {
    setContacts((prevContact) => {
      return [...prevContact, { id}];
    });
  };
  return (
    <ContactsContext.Provider value={{ contacts, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
};
