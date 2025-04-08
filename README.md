# The server is running on 3000 PORT
# `npm run dev - starting the server`
## MongoDB - `npm install mongodb`
## Express - `npm install express`
## Nodemon - `npm install nodemon`
### This server demonstrates how to connect to a MongoDB collection and work with its methods.
#  It performs a series of CRUD operations such as:

`Dropping an existing collection (users)`

`Inserting multiple and single documents`

`Deleting documents (one and many)`

`Updating and replacing documents`

`Displaying all records in the collection`

# MongoDB Connection
dotenv.config()

const client = new MongoClient(process.env.MONGODB_URI)

const dbName = process.env.DB_NAME
