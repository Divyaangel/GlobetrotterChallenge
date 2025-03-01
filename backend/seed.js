const mongoose = require('mongoose');
const Destination = require('./models/Destination');
const destinations = require('./destinations.json');

const dotenv = require('dotenv');
dotenv.config();

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await Destination.deleteMany();
        await Destination.insertMany(destinations);
        console.log('Database seeded successfully');
        process.exit();
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDatabase();