const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const { DB, DBStatus } = require('./DB');
const db = new DB();
const baseUrl = '/api';

app.use(cors());

app.get(`${baseUrl}/books/:owner/:bookId`, async (req, res) => {
  const { status, payload } = await db.getBookContent({owner: req.params.owner, ref: req.params.bookId});
  if (status === DBStatus.OK) {
    let convertedData = {};
    payload.forEach(element => {
      convertedData[element.id] = element;
    });
    res.send({data: convertedData});
  } else {
    res.send({error: payload});
  }
  
});

app.get(`${baseUrl}/lbc`, function (req, res) {
//   db.insertInBook({owner: 'test_user', ref: 'UUID_1'}, 
//   [
//     {id: 0, content: "bla bal bla", children: [1, 2, 3], parents: []},
//     {id: 1, content: "bla bal bla", children: [4, 5], parents: [0]},
//     {id: 2, content: "bla bal bla", children: [19], parents: [0]},
//     {id: 3, content: "bla bal bla", children: [20, 23], parents: [0]},
//     {id: 4, content: "bla bal bla", children: [{ id: 6, neededAssets:[3, 6] }, 7 ] , parents: [1]},
//     {id: 5, content: "bla bal bla", children: [13], parents: [1]},
//     {id: 6, content: "bla bal bla", children: [8], parents: [4]},
//     {id: 7, content: "bla bal bla", children: [9], parents: [4]},
//     {id: 8, content: "bla bal bla", children: [10], parents: [6]},
//     {id: 9, content: "bla bal bla", children: [11], parents: [7,13]},
//     {id: 10, content: "bla bal bla", children: [], parents: [8]},
//     {id: 11, content: "bla bal bla", children: [12], parents: [9]},
//     {id: 12, content: "bla bal bla", children: [], parents: [11]},
//     {id: 13, content: "bla bal bla", children: [9, 14], parents: [5]},
//     {id: 14, content: "bla bal bla", children: [15, 16], parents: [13]},
//     {id: 15, content: "bla bal bla", children: [17], parents: [14]},
//     {id: 16, content: "bla bal bla", children: [18], parents: [14]},
//     {id: 17, content: "bla bal bla", children: [], parents: [15]},
//     {id: 18, content: "bla bal bla", children: [], parents: [16]},
//     {id: 19, content: "bla bal bla", children: [21, 22], parents: [2]},
//     {id: 20, content: "bla bal bla", children: [24], parents: [3]},
//     {id: 21, content: "bla bal bla", children: [24], parents: [19]},
//     {id: 22, content: "bla bal bla", children: [], parents: [19]},
//     {id: 23, content: "bla bal bla", children: [], parents: [3]},
//     {id: 24, content: "bla bal bla", children: [], parents: [3, 21]},
// ]
//   , function(data) {
//     res.send({data});
//   });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});