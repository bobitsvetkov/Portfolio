import express, { Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

interface CaptchaResponse {
    success: boolean;
    score?: number;
    'error-codes'?: string[];
}

interface VerifyRequest extends Request {
    body: {
        token: string;
    }
}

dotenv.config();

const app = express();
app.use(cors({
    origin: 'https://bobi-tsvetkov-portfolio.vercel.app',
    methods: ['GET', 'POST'],
}));
app.use(express.json());

app.post('/verify-captcha', async (req: VerifyRequest, res: Response) => {
    const { token } = req.body;

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        });

        const data = await response.json() as CaptchaResponse;

        if (data.success && data.score && data.score >= 0.5) {
            res.json({ success: true, score: data.score });
        } else {
            res.json({ success: false, message: 'Captcha verification failed' });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));