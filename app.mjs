import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const PORT = 3000

const client = new MongoClient(process.env.MONGODB_URI)
const dbName = process.env.DB_NAME



async function mongoRun() {
    try {
        await client.connect()
        console.log('Connected to Database')

        const db = client.db(dbName)
        const collections = await db.listCollections({name: 'users'}).toArray()
        if(collections.length > 0 ) {
            await db.collection('users').drop()
            console.log('Collection users has been dropped.')
        } else {
            console.log('Skippong drop')
        }
        
        const users = [
            { name: 'Joshn', age: 30},
            { name: 'Don', age: 30},
            { name: 'Heyson', age: 36},
            { name: 'Mish', age: 39},
            { name: 'Carl', age: 55}
        ]
       

        const insertManyResult = await db.collection('users').insertMany(users)

        console.log('Five users have been inserted', insertManyResult)

        await db.collection('users').deleteMany({})
        console.log('Collection users has been cleared')

        const insertResult = await db.collection('users').insertOne({ name: 'Examplename', age: 49, email:"example@gmail.com"})
        console.log('User with examplename has been inserted')

        await db.collection('users').insertOne({ name: 'Sam', age: 59, email:"sam@gmail.com"})
        console.log('User with name Sam has been inserted')

        await db.collection('users').deleteOne({ name: 'Sam' })
        console.log('Sam has been deleted')

        const updatedResult = await db.collection('users').updateOne({_id: insertResult.insertedId}, { $set: {
            name: 'ChangedName', age:52
        }})

        console.log('Updated one', updatedResult)

        const replacedResult = await db.collection('users').replaceOne({ name: 'ChangedName', age:52}, { name: 'Replaced', age:54, email:'replaced@gmail.com'})
        console.log('Replaced one', replacedResult)

        await db.collection('users').insertOne({ name: 'last', age:55})
        await db.collection('users').insertOne({ name: 'last', age:35})
        await db.collection('users').insertOne({ name: 'last', age:25})

        console.log('Last users have been added')

        await db.collection('users').updateMany({ name: 'last'}, {$set: { age:66 }})


        const documents = await db.collection('users').find({}).toArray()

        console.log('Documents', documents)

        app.listen(PORT, () => {
            console.log(`Listening on ${PORT} PORT`)
        })
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    } finally {
       await client.close()
    }
}


mongoRun().catch(console.dir)