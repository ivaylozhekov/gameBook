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

    async createBook(userData, bookData) {
        try {
            const client  = await MongoClient.connect(`${baseUrl}/${userData.username}`);
            const bookCollection = await client.collection("books");
            await bookCollection.insertOne(bookData);
            console.log("Book created!");
            const bookRefCollection = await client.createCollection(bookData.bookId);
            console.log(`Collection for ${bookData.bookId} created!`);
            const bookAssetsCollection = await client.createCollection(`${bookData.bookId}_Assets`);
            console.log(`Collection for ${bookData.bookId}_Assets created!`);

            await client.close();
            return new DBResponse(DBStatus.OK);
        } catch(err) {
            return new DBResponse(DBStatus.ERROR, err);
        }
    }

    async insertInBook (bookInfo, content) {
        try {
            const client  = await MongoClient.connect(`${baseUrl}/${bookInfo.owner}`);
            const bookCollection = await client.createCollection(bookInfo.bookId);
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
            const bookCollection = await client.collection(bookInfo.bookId);            
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
            const bookCollection = await client.collection(bookInfo.bookId);
            const result = await bookCollection.find({_id: new Mongo.ObjectId(bookInfo.paragraphId)}).toArray();
            
            await client.close();
            return new DBResponse(DBStatus.OK, result);
        } catch(err) {
            return new DBResponse(DBStatus.ERROR, err);
        }
    }

    async addBookParagraph (bookInfo) {
        try {
            const client  = await MongoClient.connect(`${baseUrl}/${bookInfo.owner}`);
            const bookCollection = await client.collection(bookInfo.bookId);
            const result = await bookCollection.insertOne(bookInfo.paragraph);
            const updateResult = await bookCollection.updateOne(
                {_id: new Mongo.ObjectId(bookInfo.parentId)},
                { $push: { children:  result.insertedId } }
            );
            console.log(updateResult);
            await client.close();
            return new DBResponse(DBStatus.OK, result.ops);
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
}

module.exports.DB = DB;
module.exports.DBStatus = DBStatus;