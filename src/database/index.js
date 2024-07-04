import mongoose from "mongoose";


const configOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


const connectToDB = async () => {
    const connectionUrl = process.env.DATABASE_URL;

    mongoose.connect(connectionUrl, configOptions)
        .then(() => console.log('Ecommerce database connected successfully!'))
        .catch((error) => console.log(`Error from DB connection: ${error.mongoose}`))
}

export default connectToDB;