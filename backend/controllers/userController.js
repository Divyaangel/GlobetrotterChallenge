const User = require('../models/User');

exports.login = async (req, res) => {
    const { username } = req.query; // Get username from query parameters

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'Username not found. Please register first.' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
};

exports.updateScore = async (req, res) => {
    try {
        const { username } = req.params;
        const { score } = req.body;

        // Find the user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's score
        user.score = score;

        // Update highScore if the current score is higher
        if (score > user.highScore) {
            user.highScore = score;
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ 
            success: true, 
            score: user.score, 
            highScore: user.highScore 
        });
    } catch (error) {
        console.error('Error updating score:', error);
        res.status(500).json({ error: 'An error occurred while updating the score' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.registerUser = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username is already registered. Please try a different name.' });
        }

        const newUser = new User({ username, score: 0 });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
};

exports.getUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getHighScore = async (req, res) => {
    try {
        const { username } = req.params;

        // Find the user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user's high score
        res.status(200).json({ 
            success: true, 
            highScore: user.highScore 
        });
    } catch (error) {
        console.error('Error fetching user high score:', error);
        res.status(500).json({ error: 'An error occurred while fetching the high score' });
    }
};

exports.getGlobalHighScore = async (req, res) => {
    try {
        // Debug: Log all users to check scores
        const allUsers = await User.find({});
      

        // Find the user with the highest score
        const topUser = await User.aggregate([
            { $addFields: { scoreNumber: { $toDouble: "$highScore" } } }, // Convert score to number
            { $sort: { scoreNumber: -1 } }, // Sort by the converted number
            { $limit: 1 } // Limit to the top user
        ]);
        
        if (topUser.length === 0) {
            return res.status(404).json({ message: 'No users found or no scores available' });
        }
        
        res.json({ globalHighScore: topUser[0].scoreNumber });

        } catch (error) {
        console.error('Error retrieving global high score:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the high score', details: error.message });
    }
};
exports.setChallengedHighScore = async (req, res) => {
    try {
        const { challenger, score } = req.query;

        // Validate input
        if (!challenger || !score) {
            return res.status(400).json({ message: 'Challenger and score are required' });
        }

        // Save the challenged high score (you can use a separate collection or field in the User model)
        const updatedUser = await User.findOneAndUpdate(
            { username: challenger },
            { challengedHighScore: score },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Challenger not found' });
        }

        res.json({ success: true, challengedHighScore: updatedUser.challengedHighScore });
    } catch (error) {
        console.error('Error setting challenged high score:', error);
        res.status(500).json({ error: 'An error occurred while setting the challenged high score' });
    }
};
