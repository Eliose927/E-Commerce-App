import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongoDB ${conn.connection.host}...`)
    } catch (err) {
        console.log(`Error in mongoDB ${err}`.bgRed.white)
    }
}

export default connectDB