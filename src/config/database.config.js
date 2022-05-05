const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const mongoDbUri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.davcf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        
        await mongoose.connect(mongoDbUri);
        console.log('Successfully connected to the database');
    } catch (error) {
        console.log(`Could not connect to the database.\n${error}`);
        process.exit(1);
    }
};

module.exports = connectDatabase;