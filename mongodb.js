// Create.Read.Update.Delete

const {
    MongoClient,
    ObjectID
} = require('mongodb')

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";


// OPTIONAL ID GENERATION
// const id = new ObjectID();

// console.log(id);
// console.log(id.getTimestamp())



MongoClient.connect(
    connectionURL, {
        useNewUrlParser: true
    },
    (error, client) => {
        if (error) {
            return console.log("Unable to connect to database");
        }
        const db = client.db(databaseName);

        db.collection('users').findOne({_id: new ObjectID("5d4a234c42e96626984f4073")}, (error, user) => {
            if(error){
                return console.log("Unable to find user")
            }
            console.log(user)
            
        })
    })














    // INSERT OPTIONS
//     db.collection('tasks').insertMany([{
//             description: 'Wash the sink',
//             completed: false
//         },
//         {
//             description: 'Fold Laundry',
//             completed: true
//         },
//         {
//             description: 'Dishes',
//             completed: false

//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log('cannot retrieve tasks')
//         }
//         console.log(result.ops)
//     })

//INSERT ONE 

//     db.collection("users").insertOne({
//         _id: id,    
//         name: "Vikrum",
//         age: 111
//     },
//     (error, result) => {
//         if (error) {
//             return console.log("unable to insert user");
//         } else {
//             console.log(result.ops);
//         }
//     });
// });




// INSERT MANY


// db.collection("users").insertMany(
//     [{
//             name: "jen",
//             age: 28
//         },
//         {
//             name: "Gunther",
//             age: 27
//         }
//     ],
//     (error, result) => {
//         if (error) {
//             return console.log('unable to insert doc')
//         }
//         console.log(result.ops)
//     }
// );