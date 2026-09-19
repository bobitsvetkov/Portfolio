import React, { useState, useEffect } from 'react';
import { FileText, ArrowUpRight, Send } from 'lucide-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { m } from 'motion/react';
import emailjs from '@emailjs/browser';

declare global {
    interface Window {
        grecaptcha: {
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
            ready: (callback: () => void) => void;
        };
    }
}

const cv = `${import.meta.env.BASE_URL}BorislavTsvetkovResume.pdf`;

const fieldClass =
    'w-full rounded-lg border border-surface-line bg-surface-4/60 px-4 py-2.5 text-gray-100 placeholder:text-gray-600 transition-colors focus:border-primary-500 focus:outline-hidden focus:ring-1 focus:ring-primary-500';

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-400';

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
        const loadRecaptcha = () => {
            window.grecaptcha?.ready(() => {
                console.log('reCAPTCHA v3 ready');
            });
        };
        loadRecaptcha();
    }, []);

    const socialLinks = [
        {
            icon: <BsLinkedin className="h-5 w-5" />,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/borislav-tsvetkov-818397198/',
        },
        {
            icon: <BsGithub className="h-5 w-5" />,
            label: 'GitHub',
            href: 'https://github.com/bobitsvetkov',
        },
        {
            icon: <FileText className="h-5 w-5" />,
            label: 'Resume',
            href: cv,
        }
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSending(true);
        setError('');

        try {
            if (typeof window.grecaptcha === 'undefined') {
                setError('reCAPTCHA is not loaded yet.');
                return;
            }
            const token = await window.grecaptcha.execute(
                import.meta.env.VITE_RECAPTCHA_SITE_KEY,
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
                    import.meta.env.VITE_EMAIL_JS_SERVICE_KEY,
                    import.meta.env.VITE_EMAIL_JS_TEMPLATE_KEY,
                    formData,
                    import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
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
        <footer
            id="contact"
            className="relative section-seam bg-surface-0 pb-10 pt-24 text-white"
        >
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="mb-14 max-w-3xl"
                >
                    <p className="mb-3 font-mono text-sm text-primary-400">03 / contact</p>
                    <h2 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-section">
                        Let&apos;s build something
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-400">
                        I&apos;m always interested in hearing about new opportunities and
                        collaborations.
                    </p>
                </m.div>

                <div className="mb-16 grid gap-10 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <h3 className="mb-4 font-display text-xl font-semibold">Find me online</h3>
                        <p className="mb-6 text-gray-400">
                            If you want to chat, collaborate, or just say hi, feel free to
                            reach out. My resume is below if you&apos;re considering working
                            with me.
                        </p>

                        <ul className="flex flex-col gap-2">
                            {socialLinks.map((social, index) => (
                                <m.li
                                    key={social.label}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.07 }}
                                >
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center gap-3 rounded-xl border border-surface-line bg-surface-3 px-4 py-3 text-gray-300 transition-colors hover:border-primary-500/40 hover:text-white"
                                    >
                                        <span className="text-gray-500 transition-colors group-hover:text-primary-300">
                                            {social.icon}
                                        </span>
                                        <span className="text-sm font-medium">{social.label}</span>
                                        <ArrowUpRight className="ml-auto h-4 w-4 text-gray-600 transition-colors group-hover:text-primary-300" />
                                    </a>
                                </m.li>
                            ))}
                        </ul>
                    </div>

                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-surface-line bg-surface-3 p-6 lg:col-span-3 lg:p-8"
                    >
                        <h3 className="mb-6 font-display text-xl font-semibold">Send me a message</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className={labelClass}>Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={fieldClass}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className={labelClass}>Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={fieldClass}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className={labelClass}>Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={fieldClass}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className={labelClass}>Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className={`${fieldClass} resize-none`}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-500 focus:outline-hidden focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 focus:ring-offset-surface-3 disabled:cursor-not-allowed disabled:opacity-60"
                                disabled={isSending}
                            >
                                {isSending ? 'Sending...' : <><Send className="h-4 w-4" /> Send Message</>}
                            </button>

                            <p aria-live="polite" className="min-h-5 text-center text-sm">
                                {isSent && <span className="text-emerald-400">Message sent successfully!</span>}
                                {error && <span className="text-red-400">{error}</span>}
                            </p>
                        </form>
                    </m.div>
                </div>

                <div className="border-t border-surface-line pt-8 text-center">
                    <p className="font-mono text-xs text-gray-600">
                        © {new Date().getFullYear()} Borislav Tsvetkov
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
