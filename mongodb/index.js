import mongoose from 'mongoose'

const dbPath = 'mongodb://127.0.0.1:27017/local';

require('./schema/info')
require('./schema/student')

const database = () => {
  mongoose.set('debug', true)
  mongoose.Promise = global.Promise
  mongoose.connect(dbPath)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(dbPath)
  })
  mongoose.connection.on('error', err => {
    console.error(err)
  })
  mongoose.connection.on('open', async () => {
    console.log('Connected to MongoDB ', dbPath)
  })
}

database()