const Mongo = require('mongodb-promisified')();
const MongoClient = Mongo.MongoClient;
const baseUrl = "mongodb://localhost:27017";
const usersUrl = `${baseUrl}/users`;
const { promisify } = require('util');

const DBStatus = {
    OK: "OK",
    ERROR: "ERROR"
}

class DBResponse {
    constructor(status, payload) {
        this.status = status;
        this.payload = payload;
    }    
}

class DB {
    
    async createUsersDataBase () {
        try {
            const admin = {username: "admin", password: "admin"};
            const client  = await MongoClient.connect(usersUrl);
            const userCollection = await client.createCollection("userData");
            console.log(`Users database created!`);        
            await userCollection.insertOne(admin);
            console.log("Admin user created!");
            await client.close();
            return new DBResponse(DBStatus.OK);
        } catch(err) {
            return new DBResponse(DBStatus.ERROR, err);
        }
    }

    async insertUserToUserData (userData) {
        const client  = await MongoClient.connect(usersUrl);
        const userCollection = await client.collection("userData");            
        await userCollection.insertOne(userData);
        console.log("User added to users database!");
        await client.close();
    }

    async prepareUserDatabase (userData) {
        const client  = await MongoClient.connect(`${baseUrl}/${userData.username}`);
        const bookCollection = await client.createCollection("books");
        console.log(`Database for ${userData.username} created!`);
        await client.close();
    }

    async createUser (userData) {
        Promise.all([this.insertUserToUserData(userData), this.prepareUserDatabase(userData)]).then(() => {
            return new DBResponse(DBStatus.OK);
        }).catch(err => {
            return new DBResponse(DBStatus.ERROR, err);
        });
    }

    async createBook(bookData) {
        try {
            const client  = await MongoClient.connect(`${baseUrl}/${bookData.owner}`);
            const bookCollection = await client.collection("books");
            const book = await bookCollection.insertOne(bookData);
            console.log("Book created!");
            const bookRefCollection = await client.createCollection(`Book_${book.insertedId}`);
            console.log(`Collection for Book_${book.insertedId} created!`);
            const bookAssetsCollection = await client.createCollection(`Book_${book.insertedId}_Assets`);
            console.log(`Collection for Book_${book.insertedId}_Assets created!`);

            await client.close();
            return new DBResponse(DBStatus.OK, book.ops[0]);
        } catch(err) {
            return new DBResponse(DBStatus.ERROR, err);
        }
    }

    async insertInBook (bookInfo, content) {
        try {
            const client  = await MongoClient.connect(`${baseUrl}/${bookInfo.owner}`);
            const bookCollection = await client.createCollection(this.getBookCollectionById(bookInfo.bookId));
            await bookCollection.insertMany(content);
            await client.close();
            return new DBResponse(DBStatus.OK);
        } catch(err) {
            return new DBResponse(DBStatus.ERROR, err);
        }
    }

    async getBookContent (bookInfo) {
        try {
            const client  = await MongoClient.connect(`${baseUrl}/${bookInfo.owner}`);
            const bookCollection = await client.collection(this.getBookCollectionById(bookInfo.bookId));            
            const result = await bookCollection.find({}).toArray();
            await client.close();
            return new DBResponse(DBStatus.OK, result);
        } catch(err) {
            return new DBResponse(DBStatus.ERROR, err);
        }
    }

    async getBookParagraphById (bookInfo) {
        try {
            const client  = await MongoClient.connect(`${baseUrl}/${bookInfo.owner}`);
            const bookCollection = await client.collection(this.getBookCollectionById(bookInfo.bookId));
            const result = await bookCollection.find({_id: new Mongo.ObjectId(bookInfo.paragraphId)}).toArray();
            await client.close();
            return new DBResponse(DBStatus.OK, result[0]);
        } catch(err) {
            return new DBResponse(DBStatus.ERROR, err);
        }
    }

    async addBookParagraph (bookInfo) {
        try {
            const client  = await MongoClient.connect(`${baseUrl}/${bookInfo.owner}`);
            const bookData = await client.collection(this.getBookCollectionById(bookInfo.bookId));
            const result = await bookData.insertOne(bookInfo.paragraph);
            let updatedParentParagraph = {};
            let updatedBookEntry = {};
            if (bookInfo.parentId) {
                updatedParentParagraph = await bookData.findOneAndUpdate(
                    { _id: new Mongo.ObjectId(bookInfo.parentId) },
                    { $push: { children:  { linkText: bookInfo.linkText, ref: result.insertedId } } },
                    { returnOriginal: false }
                );
            } else {
                const bookCollection = await client.collection("books");
                updatedBookEntry = await bookCollection.findOneAndUpdate(
                    { _id: new Mongo.ObjectId(bookInfo.bookId) },
                    { $set: { entry: result.insertedId } },
                    { returnOriginal: false }
                );
            }
            await client.close();
            return new DBResponse(DBStatus.OK, { 
                createdParagraph: result.ops[0],
                updatedParent: {
                    paragraph: updatedParentParagraph.value,
                    bookEntry: updatedBookEntry.value
                }
            });
        } catch(err) {
            console.log(err);
            return new DBResponse(DBStatus.ERROR, err);
        }
    }

    async listUserBooks (username) {
        try {
            const client  = await MongoClient.connect(`${baseUrl}/${username}`);
            const userCollection = await client.collection("books");    
            const result = await userCollection.find().toArray();
            await client.close();
            return new DBResponse(DBStatus.OK, result);
        } catch(err) {
            return new DBResponse(DBStatus.ERROR, err);
        }
    }

    getBookCollectionById(bookId) {
        return `Book_${bookId}`
    }
}

module.exports.DB = DB;
module.exports.DBStatus = DBStatus;