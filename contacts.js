const fs = require("fs").promises;
const path = require('path');
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const data = await listContacts();
    return data.find(contact => contact.id === contactId) || `There is no contact with id=${contactId} in the file`;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const deletedContact = contacts.find(contact => contact.id === contactId)
    if (deletedContact) {
        filteredContacts = contacts.filter(contact => contact.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2))
        return deletedContact;
    } else return `Сontact with id ${contactId} not found`
    
}

async function addContact(data) {
    const newContact = { id: nanoid(21), ...data };
    const contacts = await listContacts();
    if (!contacts.find(contact => contact.name === data.name)) {
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
        return newContact;
    } else return 'This contact is already in the file';
    
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};