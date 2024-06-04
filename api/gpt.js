const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    const { text } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/gpt-4/completions', {
            prompt: text,
            max_tokens: 100
        }, {
            headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` }
        });

        res.json({ text: response.data.choices[0].text });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
