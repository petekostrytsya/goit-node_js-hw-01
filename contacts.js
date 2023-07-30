const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');
const { error } = require('console');


const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        console.log(error.message);
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const result = contacts.find(contact => contact.id === contactId);
        return result || null;
        }
    catch (error) {
            console.log(error.message);
        }
}

async function removeContact(contactById) {
    try {
        const contacts = await listContacts();
        const indexContact = contacts.findIndex(contact => contact.id === contactById);
        if (indexContact === -1) {
            return null;
        }
        const [delcontact] = contacts.splice(indexContact, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return delcontact;
        }
    catch (error) {
        console.log(error.message);
        }
}

async function addContact(name, email, phone) {
    try {
        const contacts = await listContacts();
        const newContact = {
            id: nanoid(),
            name,
            email,
            phone,
        };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
        return newContact;
        }   
    catch (error) {
            console.log(error.message);
            }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
