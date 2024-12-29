import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

interface CaptchaResponse {
    success: boolean;
    score?: number;
    'error-codes'?: string[];
}

const app = express();
app.use(cors({
    origin: 'https://bobi-tsvetkov-portfolio.vercel.app',
    methods: ['GET', 'POST'],
}));
app.use(express.json());

app.post('/verify-captcha', async (req, res) => {
    console.log('Received request with body:', req.body);
    const { token } = req.body;
    if (!token) {
        console.log('No token provided');
        return res.status(400).json({ success: false, message: 'No token provided' });
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        });

        if (!response.ok) {
            return res.status(500).json({ success: false, message: 'reCAPTCHA verification failed on Google\'s side' });
        }

        try {
            const data = await response.json() as CaptchaResponse;

            if (data.success && data.score && data.score >= 0.5) {
                return res.json({ success: true, score: data.score });
            } else {
                return res.json({ success: false, message: 'Captcha verification failed' });
            }
        } catch (jsonError) {
            console.error('JSON parsing error:', jsonError);
            return res.status(500).json({ success: false, message: 'Error parsing reCAPTCHA response' });
        }
    } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        return res.status(500).json({ success: false, message: 'Error contacting reCAPTCHA service' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
