var fs = require('fs');
var readlineSync = require('readline-sync');
var contacts = [];
var dataFile = './dataContact.json';
function loadData(){
    var fileData = fs.readFileSync(dataFile);
    contacts = JSON.parse(fileData);
};
function showMenu(){
    console.log('1. Show all contact');
    console.log('2. Add new contact');
    console.log('3. Edit contact');
    console.log('4. Delete contact');
    console.log('5. Search contact');
    console.log('6. Save and Exit');
    var option = readlineSync.question('>');
    switch(option){
        case '1':
            showAllContact();
            showMenu();
            break;
        case '2':
            addNewContact();
            showMenu();
            break;
        case '3':
            editContact();
            showMenu();
            break;
        case '4':
            deleteContact();
            showMenu();
            break;
        case '5':
            var search = readlineSync.question('Enter a name, number or id to search: ');
            console.log('Search result: ',searchContact(search));         
            showMenu();
            break;
        case '6':
            saveAndExit();
            break;
        default:
            console.log('Wrong option!');
            showMenu();
            break;
    }
};
function showAllContact(){
        console.log(contacts);
};
function addNewContact(){
    var name = readlineSync.question('Name: ');
    var number = readlineSync.question('Number: ');
    var contact = {
        name: name,
        number: parseInt(number),
        id: contacts[contacts.length - 1].id + 1
    };

    contacts.push(contact);
    var content = JSON.stringify(contacts);
    fs.writeFileSync(dataFile,content,{encoding:'utf8'});
    console.log('Add new contact successful !');
};
function editContact(){
    var search = readlineSync.question('Search a contact you want to edit > ');
    var searched = searchContact(search);
    console.log('Result search: ');
    for(contact of searched){
        console.log('> ',contact.id, '. ',contact);
    }
    var id = readlineSync.question('Choose an id to edit: ');
    var getContact = contacts[id];
    var newName = readlineSync.question('New Name: ');
    var newNumber = readlineSync.question('New Number: ');
    var newID = readlineSync.question('New Id: ')
    getContact = {
        name: newName,
        number: parseInt(newNumber),
        id: parseInt(newID)
    };
    contacts[id] = getContact;
    console.log(contacts);
}
function deleteContact(){
    var search = readlineSync.question('Search a contact you want to delete > ');
    var searched = searchContact(search);
    console.log('Result search: ');
    for(contact of searched){
        console.log('> ',contact.id, '. ',contact);
    }
    var id = readlineSync.question('Choose an id to delete > ');
    contacts.splice(id, 1);
    console.log('Done!');
    console.log(contacts);
    
};
function searchContact(search){
    var searched = contacts.filter(contact => {
        var regex = new RegExp(search, 'i');
        if(regex.test(contact.name) ||
        regex.test(Number(contact.number)) ||
        regex.test(Number(contact.id)))
        {         
            return contact;   
        }
    });
    return searched;
};
function saveAndExit(){
    var content = JSON.stringify(contacts);
    fs.writeFileSync(dataFile,content,{encoding:'utf8'});
    console.log('Done!');
};
function main(){
    loadData();
    showMenu();

};
main();