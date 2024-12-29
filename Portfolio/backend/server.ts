import express, { Request, Response, NextFunction } from 'express';
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
    origin: [
        'https://bobitsvetkov.github.io',
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'healthy' });
});

app.post('/verify-captcha', async (req: Request, res: Response) => {
    console.log('Received request with body:', req.body);
    const { token } = req.body;

    if (!token) {
        console.log('No token provided');
        return res.status(400).json({ success: false, message: 'No token provided' });
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.error('RECAPTCHA_SECRET_KEY not configured');
        return res.status(500).json({ success: false, message: 'Server configuration error' });
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        });

        if (!response.ok) {
            console.error('Google reCAPTCHA API error:', response.status, response.statusText);
            return res.status(500).json({
                success: false,
                message: 'reCAPTCHA verification failed on Google\'s side'
            });
        }

        const data = await response.json() as CaptchaResponse;
        console.log('reCAPTCHA verification response:', data);

        if (data.success && data.score && data.score >= 0.5) {
            return res.json({ success: true, score: data.score });
        } else {
            console.log('Captcha verification failed:', data['error-codes']);
            return res.json({
                success: false,
                message: 'Captcha verification failed',
                errors: data['error-codes']
            });
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error during reCAPTCHA verification'
        });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        message: 'An unexpected error occurred'
    });
});
