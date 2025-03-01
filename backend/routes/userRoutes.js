const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Static routes
router.post('/register', userController.registerUser);
router.get('/login', userController.login);
router.get('/all', userController.getAllUsers);
router.post('/:username/update-score', userController.updateScore); // Dynamic route
router.get('/:username/highscore', userController.getHighScore); // Dynamic route
router.get('/globalhighscore', userController.getGlobalHighScore); // Static route
router.get('/set-challenged-highscore', userController.setChallengedHighScore); // Static route

// Dynamic routes
router.get('/:username', userController.getUser); // Dynamic route

module.exports = router;