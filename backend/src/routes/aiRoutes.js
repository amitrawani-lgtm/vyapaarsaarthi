const express = require('express');
const router = express.Router();
const multer = require('multer');
const { generateResponse } = require('../services/aiService');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Configure Multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// @route   POST /api/ai/chat
// @desc    Process text chat
// @access  Private
router.post('/chat', ensureAuthenticated, async (req, res) => {
    try {
        const { message } = req.body;
        // Pass userId to service
        const response = await generateResponse(message, [], req.user._id);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/ai/process
// @desc    Process multimodal input (image/audio)
// @access  Private
router.post('/process', ensureAuthenticated, upload.single('file'), async (req, res) => {
    try {
        const { message } = req.body;
        const file = req.file;

        if (!file && !message) {
            return res.status(400).json({ message: 'Please provide a message or file' });
        }

        const files = file ? [file] : [];
        const prompt = message || (file.mimetype.startsWith('audio/') ? "Transcribe and summarize this audio" : "Analyze this image");

        // Pass userId
        const response = await generateResponse(prompt, files, req.user._id);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
