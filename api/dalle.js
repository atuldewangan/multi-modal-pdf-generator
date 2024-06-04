// api/dalle.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/images/generations', {
            prompt: text,
            n: 1,
            size: '512x512'
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        res.json({ images: response.data.data.map(img => img.url) });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
