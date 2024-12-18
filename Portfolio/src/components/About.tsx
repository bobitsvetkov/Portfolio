import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { name: 'React', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'Machine Learning', level: 75 },
    { name: 'Node.js', level: 70 },
    { name: 'Docker', level: 65 },
];

const About: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-white w-full">
            <div className="w-full">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">About Me</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-12">
                        I'm a passionate full-stack developer with a keen interest in AI and innovative technologies.
                        My journey involves creating scalable, user-centric solutions that push the boundaries of web development.
                        I thrive on challenging projects that require creative problem-solving and continuous learning.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Skills Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Technical Skills</h3>
                        {skills.map((skill, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-700">{skill.name}</span>
                                    <span className="text-gray-700">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-primary-500 h-2.5 rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Experience/Philosophy Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-50 p-6 rounded-xl"
                    >
                        <h3 className="text-2xl font-semibold mb-6 text-gray-800">My Approach</h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Continuous learning and staying ahead of technological trends</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Focusing on clean, maintainable, and efficient code</span>
                            </li>
                            <li className="flex items-start">
                                <svg className="w-6 h-6 text-primary-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>Collaborative problem-solving and innovative thinking</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
