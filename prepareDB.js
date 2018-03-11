const { DB, DBStatus } = require('./DB');
const db = new DB();


// db.createUsersDataBase().then((data) => {
//     console.log(data);
// });
// db.insertUserToUserData({username: "test_user", password: "test", name: "John", surname: "Doe"});
// db.createUser({username: "test_user3", password: "test", name: "John", surname: "Snow"})

// db.getBookContent({owner: "test_user", ref: "UUID_1"}).then(data => {
//     console.log(data)
// });

// db.createBook(
//     {username: "test_user", password: "test", name: "John", surname: "Doe"},
//     {id: 03, name: "Test Book 3", author: "John Snow", anyOtherInfo: "Bla bla", ref: "UUID_3"}
// ).then(data => {
//     console.log(data)
// });

// db.insertInBook(
//     {id: 03, name: "Test Book 3", author: "John Snow", anyOtherInfo: "Bla bla", ref: "UUID_3", owner: "test_user"},
//     [
//         {id: 0, content: "bla bal bla", children: [1, 2, 3], parents: []},
//         {id: 1, content: "bla bal bla", children: [4, 5], parents: [0]}
//     ],
// ).then(data => {
//     console.log(data)
// });
db.listUserBooks('test_user').then(bookList => {
    console.log(bookList);
})