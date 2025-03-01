


const getDestinationDetails = async (req, res) => {
    try {
        const { city } = req.params;
        const destination = await Destination.findOne({ city });
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.json({
            fun_fact: destination.fun_fact,
            trivia: destination.trivia,
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = { getDestinationDetails };



