var MongoClient = require('mongodb').MongoClient;
var baseUrl = "mongodb://localhost:27017";
var usersUrl = `${baseUrl}/users`;

function db () {
    
    this.createUsersDataBase = function () {
        MongoClient.connect(usersUrl, function(err, db) {
            if (err) throw err;
            console.log(`Users database created!`);
            db.createCollection("userData", function(err, res) {
                if (err) throw err;
                console.log("User data collection created!");
                var admin = {username: "admin", password: "admin"};
                res.insertOne(admin, function(err, res) {
                    if (err) throw err;
                    console.log("Admin user created!");
                    db.close();
                });
            });
        });
        MongoClient.connect(usersUrl, function(err, db) {
            if (err) throw err;
            console.log(`Users database created!`);
            db.createCollection("available_books", function(err, res) {
                if (err) throw err;
                console.log("Available books collection created!");
                db.close();
            });
        });
    };

    // createUsersDataBase();

    this.createUser = function (userData) {
        MongoClient.connect(usersUrl, function(err, db) {
            if (err) throw err;
            db.collection("userData").insertOne(userData, function(err, res) {
                if (err) throw err;
                console.log("User added to users database!");
                db.close();
            });
        });
        MongoClient.connect(`${baseUrl}/${userData.username}`, function(err, db) {
            if (err) throw err;
            console.log(`Database for ${userData.username} created!`);
            db.close();
        });
    };

    // createUser({username: "test_user", password: "test", name: "John", surname: "Doe"});

    this.createBook = function (userData, bookData) {
        MongoClient.connect(`${baseUrl}/${userData.username}`, function(err, db) {
            if (err) throw err;
            db.createCollection("books", function(err, res) {
                if (err) throw err;
                console.log(`Books collection for ${userData.username} created!`);
                res.insertOne(bookData, function(err, res) {
                    if (err) throw err;
                    console.log("Book created!");
                    db.close();
                });
                // db.close();
            });
            db.createCollection(bookData.ref, function(err, res) {
                if (err) throw err;
                console.log(`Collection for ${bookData.ref} created!`);
                db.close();
            });
            db.createCollection(`${bookData.ref}_Assets`, function(err, res) {
                if (err) throw err;
                console.log(`Collection for ${bookData.ref}_Assets created!`);
                db.close();
            });
        });
    };

    this.insertInBook = function(book, content) {
        MongoClient.connect(`${baseUrl}/${book.owner}`, function(err, db) {
            if (err) throw err;
            db.collection(book.ref).insertMany(content, function(err, res) {
                if (err) throw err;
                console.log("Content Inserted");
                db.close();
            });
        });
    }

    this.getBookContent = function(book, cb) {
        MongoClient.connect(`${baseUrl}/${book.owner}`, function(err, db) {
            if (err) throw err;
            db.collection(book.ref).find({}).toArray(function(err, res) {
                if (err) throw err;
                cb(res);
                db.close();
            });
        });
    }

    // this.createBook(
    //     {username: "test_user", password: "test", name: "John", surname: "Doe"},
    //     {id: 01, name: "Test Book 1", author: "John Snow", anyOtherInfo: "Bla bla", ref: "UUID_1"}
    // );

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var myobj = { name: "Test Book 1", author: "John Doe", content: {
//       head: "blaa alsdfa lsldls dfiewe",
//       0: { content: "bla", refs: [5, 21] },
//       1: { content: "bla2", refs: [16, 52] }      
//   }};
// //   db.collection("books").insertOne(myobj, function(err, res) {
// //     if (err) throw err;
// //     console.log("1 document inserted");
// //     db.close();
// //   });
// db.collection("books").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// // var query = { name: "Test Book 1" };
// //   db.collection("books").find(query).toArray(function(err, result) {
// //     if (err) throw err;
// //     console.log(result[0].content[1]);
// //     db.close();
// //   });
// });
}

module.exports = db;
