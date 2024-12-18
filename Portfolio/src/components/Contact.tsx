import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted', { name, email, message });
    };

    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="w-screen max-w-screen px-4 md:px-8 lg:px-16">
                {/* Contact Header */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-xl mx-auto mb-12"
                >
                    <h2 className="text-4xl font-bold mb-4 text-gray-800">Get in Touch</h2>
                    <p className="text-gray-600">
                        Have a project in mind or just want to say hello? Feel free to reach out,
                        and I'll get back to you as soon as possible.
                    </p>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-card"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="your.email@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Your message here..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center space-x-6 mt-12"
                >
                    {['GitHub', 'LinkedIn', 'Twitter'].map((platform, index) => (
                        <a
                            key={platform}
                            href="#"
                            className="text-gray-600 hover:text-primary-500 transition-colors"
                        >
                            {platform}
                        </a>
                    ))}
                </motion.div>

                {/* Donation Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="max-w-md mx-auto mt-12 bg-white p-6 rounded-xl shadow-card text-center"
                >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Support My Work</h3>
                    <p className="text-gray-600 mb-6">
                        If you'd like to support my work, you can donate using the options below. Thank you for your generosity!
                    </p>
                    <div className="flex justify-center space-x-4">
                        {/* PayPal Donation Button */}
                        <a
                            href="https://www.paypal.com/donate?hosted_button_id=YOUR_PAYPAL_ID"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors duration-300"
                        >
                            Donate with PayPal
                        </a>
                        {/* Revolut Donation Button */}
                        <a
                            href="https://revolut.me/YOUR_REVOLUT_LINK"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors duration-300"
                        >
                            Donate with Revolut
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
