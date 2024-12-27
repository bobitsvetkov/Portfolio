import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';

interface CaptchaResponse {
    success: boolean;
    score?: number;
    'error-codes'?: string[];
}

export default async (req: VercelRequest, res: VercelResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Only POST requests are allowed' });
    }

    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is required' });
    }

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        });

        const data = await response.json() as CaptchaResponse;

        if (data.success && data.score && data.score >= 0.5) {
            return res.json({ success: true, score: data.score });
        } else {
            return res.json({ success: false, message: 'Captcha verification failed' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
