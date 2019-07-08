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
            searchContact();
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
    for(var contact of contacts){
        console.log(contact.name, contact.number);
    }
};
function addNewContact(){
    var name = readlineSync.question('Name: ');
    var number = readlineSync.question('Number: ');
    var contact = {
        name: name,
        number: parseInt(number)
    };
    contacts.push(contact);
    var content = JSON.stringify(contacts);
    fs.writeFileSync(dataFile,content,{encoding:'utf8'});
    console.log('Add new contact successful !');
};
function editContact(){
    console.log(contacts);
    var id = readlineSync.question('Choose a number start from 0: ');
    var getContact = contacts[id];
    var name = readlineSync.question('Name: ');
    var number = readlineSync.question('Number: ');
    getContact = {
        name: name,
        number: parseInt(number)
    };
    contacts[id] = getContact;
    console.log(contacts);
}
function deleteContact(){
    var id = readlineSync.question('Choose an element to delete start form 0: ');
    contacts.splice(id, 1);
    console.log(contacts);
};
function searchContact(){
    var results = readlineSync.question('Enter a name or number to search: ');
    for(var item of contacts ){
      if(item.name === results.toLowerCase() || item.number === results.toString()){
            console.log(item);
      }
    }
};
function saveAndExit(){
    var content = JSON.stringify(contacts);
    fs.writeFileSync(dataFile,content,{encoding:'utf8'});
};
function main(){
    loadData();
    showMenu();

};
main();