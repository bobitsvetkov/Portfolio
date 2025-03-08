import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink, Send } from 'lucide-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import cv from '../public/BorislavTsvetkovResume.pdf';

declare global {
    interface Window {
        grecaptcha: {
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
            ready: (callback : () => void) => void;
        };
    }
}

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadRecaptcha = async () => {
            await window.grecaptcha?.ready(() => {
                console.log('reCAPTCHA v3 ready');
            });
        };

        loadRecaptcha();
    }, []);

    const socialLinks = [
        {
            icon: <BsLinkedin className="w-6 h-6" />,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/borislav-tsvetkov-818397198/',
            color: 'hover:text-blue-500'
        },
        {
            icon: <BsGithub className="w-6 h-6" />,
            label: 'GitHub',
            href: 'https://github.com/bobitsvetkov',
            color: 'hover:text-purple-500'
        },
        {
            icon: <FileText className="w-6 h-6" />,
            label: 'Resume',
            href: cv,
            color: 'hover:text-green-500'
        }
    ];
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);

        try {

            if (typeof window.grecaptcha === 'undefined') {
                setError('reCAPTCHA is not loaded yet.');
                return;
            }
            console.log("RECAPTCHA_SITE_KEY = ", import.meta.env.VITE_RECAPTCHA_SITE_KEY || process.env.RECAPTCHA_SITE_KEY);
            const token = await window.grecaptcha.execute(
                import.meta.env.VITE_RECAPTCHA_SITE_KEY || process.env.RECAPTCHA_SITE_KEY,
                { action: 'submit' }
            );

            const verificationResponse = await fetch('https://portfolio-backend-server.azurewebsites.net/verify-captcha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            const verificationResult = await verificationResponse.json();

            if (verificationResult.success) {
                await emailjs.send(
                    import.meta.env.VITE_EMAIL_JS_SERVICE_KEY || process.env.EMAIL_JS_SERVICE_KEY,
                    import.meta.env.VITE_EMAIL_JS_TEMPLATE_KEY || process.env.EMAIL_JS_TEMPLATE_KEY,
                    formData,
                    import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY || process.env.EMAIL_JS_PUBLIC_KEY
                );
                setIsSent(true);
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setError('Captcha verification failed');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
            console.error('Error:', error);
        } finally {
            setIsSending(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <footer id="contact" className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-16 pb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />

            <div className="w-screen max-w-screen px-4 md:px-8 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-6xl mx-auto"
                >
                    <h2 className="text-4xl font-bold text-center mb-4">Let's Connect</h2>
                    <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                        I'm always interested in hearing about new opportunities and collaborations
                    </p>

                    <div className="grid md:grid-cols-2 gap-12 mb-11">
                        {/* Social Links Section */}
                        <div className="space-y-8 mt-12">
                            <div className="prose prose-invert">
                                <h3 className="text-2xl font-semibold mb-5">Find Me Online</h3>
                                <p className="text-gray-400">
                                    If you want to chat, collaborate, or just say hi, feel free to reach out.
                                    In case you are interested in working with me, you can find my resume below.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`flex items-center gap-3 p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/80 ${social.color} transition-all duration-300`}
                                    >
                                        {social.icon}
                                        <span className="text-sm">{social.label}</span>
                                        <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gray-800/50 p-6 rounded-xl"
                        >
                            <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                                    disabled={isSending}
                                >
                                    {isSending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                                </button>
                                {isSent && <p className="text-green-500 mt-2 text-center">Message sent successfully!</p>}
                                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Contact;
