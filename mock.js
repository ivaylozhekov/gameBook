let users = [
    {id: 0, name: "Ivan", surname: "Ivanov", username: "ivan_ivanov"},
    {id: 1, name: "Peter", surname: "Petrov", username: "peter_petrov"}
]

let availableBooks = [
    {id: 01, name: "Test Book 1", author: "John Snow", anyOtherInfo: "Bla bla", ref: "UUID_1", owner: 'ivan_ivanov'},
    {id: 02, name: "Test Book 2", author: "John Snow", anyOtherInfo: "Bla bla", ref: "UUID_2", owner: 'ivan_ivanov'}
]

let books_ivan_ivanov = [
    {id: 01, name: "Test Book 1", author: "John Snow", anyOtherInfo: "Bla bla", ref: "UUID_1"},
    {id: 02, name: "Test Book 2", author: "John Snow", anyOtherInfo: "Bla bla", ref: "UUID_2"}
];

let UUID_1 = [
    {id: 0, content: "bla bal bla", parents: []},
    {id: 1, content: "bla bal bla", parents: [0]},
    {id: 2, content: "bla bal bla", parents: [0]},
    {id: 3, content: "bla bal bla", parents: [0]},
    {id: 4, content: "bla bal bla", parents: [1], neededAssets:[3, 6]},
    {id: 5, content: "bla bal bla", parents: [1]},
    {id: 6, content: "bla bal bla", parents: [4]},
    {id: 7, content: "bla bal bla", parents: [4]},
    {id: 8, content: "bla bal bla", parents: [6]},
    {id: 9, content: "bla bal bla", parents: [7,13]},
    {id: 10, content: "bla bal bla", parents: [8]},
    {id: 11, content: "bla bal bla", parents: [9]},
    {id: 12, content: "bla bal bla", parents: [11]},
    {id: 13, content: "bla bal bla", parents: [5]},
    {id: 14, content: "bla bal bla", parents: [13]},
    {id: 15, content: "bla bal bla", parents: [14]},
    {id: 16, content: "bla bal bla", parents: [14]},
    {id: 17, content: "bla bal bla", parents: [15]},
    {id: 18, content: "bla bal bla", parents: [16]},
    {id: 19, content: "bla bal bla", parents: [2]},
    {id: 20, content: "bla bal bla", parents: [3]},
    {id: 21, content: "bla bal bla", parents: [19]},
    {id: 22, content: "bla bal bla", parents: [19]},
    {id: 23, content: "bla bal bla", parents: [3]},
    {id: 24, content: "bla bal bla", parents: [3, 21]},

];

let UUID_1_v2 = [
    {id: 0, content: "bla bal bla", children: [1, 2, 3]},
    {id: 1, content: "bla bal bla", children: [4, 5]},
    {id: 2, content: "bla bal bla", children: [19]},
    {id: 3, content: "bla bal bla", children: [20, 23]},
    {id: 4, content: "bla bal bla", children: [{ id: 6, neededAssets:[3, 6] }, 7 ] },
    {id: 5, content: "bla bal bla", children: [13]},
    {id: 6, content: "bla bal bla", children: [8]},
    {id: 7, content: "bla bal bla", children: [9]},
    {id: 8, content: "bla bal bla", children: [10]},
    {id: 9, content: "bla bal bla", children: [11]},
    {id: 10, content: "bla bal bla", children: []},
    {id: 11, content: "bla bal bla", children: [12]},
    {id: 12, content: "bla bal bla", children: []},
    {id: 13, content: "bla bal bla", children: [9, 14]},
    {id: 14, content: "bla bal bla", children: [15]},
    {id: 15, content: "bla bal bla", children: [17]},
    {id: 16, content: "bla bal bla", children: [18]},
    {id: 17, content: "bla bal bla", children: []},
    {id: 18, content: "bla bal bla", children: []},
    {id: 19, content: "bla bal bla", children: [21, 22]},
    {id: 20, content: "bla bal bla", children: [24]},
    {id: 21, content: "bla bal bla", children: [24]},
    {id: 22, content: "bla bal bla", children: []},
    {id: 23, content: "bla bal bla", children: []},
    {id: 24, content: "bla bal bla", children: []},
];

let UUID_1_v3 = [
    {id: 0, content: "bla bal bla", children: [1, 2, 3], parents: []},
    {id: 1, content: "bla bal bla", children: [4, 5], parents: [0]},
    {id: 2, content: "bla bal bla", children: [19], parents: [0]},
    {id: 3, content: "bla bal bla", children: [20, 23], parents: [0]},
    {id: 4, content: "bla bal bla", children: [{ id: 6, neededAssets:[3, 6] }, 7 ] , parents: [1]},
    {id: 5, content: "bla bal bla", children: [13], parents: [1]},
    {id: 6, content: "bla bal bla", children: [8], parents: [4]},
    {id: 7, content: "bla bal bla", children: [9], parents: [4]},
    {id: 8, content: "bla bal bla", children: [10], parents: [6]},
    {id: 9, content: "bla bal bla", children: [11], parents: [7,13]},
    {id: 10, content: "bla bal bla", children: [], parents: [8],
    {id: 11, content: "bla bal bla", children: [12], parents: [9]},
    {id: 12, content: "bla bal bla", children: [], parents: [11]},
    {id: 13, content: "bla bal bla", children: [9, 14], parents: [5]},
    {id: 14, content: "bla bal bla", children: [15,16], parents: [13]},
    {id: 15, content: "bla bal bla", children: [17], parents: [14]},
    {id: 16, content: "bla bal bla", children: [18], parents: [14]},
    {id: 17, content: "bla bal bla", children: [], parents: [15]},
    {id: 18, content: "bla bal bla", children: [], parents: [16]},
    {id: 19, content: "bla bal bla", children: [21, 22], parents: [2]},
    {id: 20, content: "bla bal bla", children: [24], parents: [3]},
    {id: 21, content: "bla bal bla", children: [24], parents: [19]},
    {id: 22, content: "bla bal bla", children: [], parents: [19]},
    {id: 23, content: "bla bal bla", children: [], parents: [3]},
    {id: 24, content: "bla bal bla", children: [], parents: [3, 21]},
];

let UUID_1_Assets = [
    {id: 1, description: "blala", img:"http://"},
    {id: 2, description: "blala", img:"http://"},
    {id: 2, description: "blala", img:"http://"}
];

let UUID_2 = [
    {id: 0, content: "bla bal bla", refs: [12, 32, 54]},
    {id: 1, content: "bla bal bla", refs: [45, 47, 95]},
    {id: 2, content: "bla bal bla", refs: [23, 12]}
];