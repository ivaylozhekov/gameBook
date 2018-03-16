# gameBook

start Mongo:

1. navigate to mongoDB bin directory
2. start mongo default service - run: ./mongod
3. start mongo shell           - run: ./mongo


MongoDB commands

show dbs - lists all databases
use temp - swithces to temp database

db.dropDatabase() - removes temp database
show collections - lists all collections in database
db.<collection_name>.find() - list <collection_name> content


remove from array:
db.UUID_1.update({"_id": ObjectId("59b6e5a4bd7f64415c709c01")}, {$pull: {children: { linkText: "1"}}})