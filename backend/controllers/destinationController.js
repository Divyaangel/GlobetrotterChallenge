const Destination = require('../models/Destination');

const getRandomDestination = async (req, res) => {
    try {
        const destinations = await Destination.find();
        if (destinations.length === 0) {
            return res.status(404).json({ message: 'No destinations found' });
        }
        const randomIndex = Math.floor(Math.random() * destinations.length);
        // res.json(destinations[randomIndex]);
        const destination = destinations[randomIndex];
        res.json({
            city: destination.city,
            country: destination.country,
            clues: destination.clues,
            fun_fact: destination.fun_fact, // Include fun facts
            trivia: destination.trivia,     // Include trivia
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = { getRandomDestination };