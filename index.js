const contacts = require('./contacts');
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const listContacts = await contacts.listContacts();
            return console.table(listContacts);

        case "get":
            const contactById = await contacts.getContactById(id);
            return console.table(contactById);
        
        case "add":
            const addResult = await contacts.addContact({name, email, phone})
            return console.table(addResult);

        case "remove":
            const removeResult = await contacts.removeContact(id);
            return console.table(removeResult);

        default:
        console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);