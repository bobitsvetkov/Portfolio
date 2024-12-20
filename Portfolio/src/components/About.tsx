import { motion } from 'framer-motion';
import {
    Database,
    Brain,
    Lock,
    Search,
} from 'lucide-react';
import {
    DiJavascript1,
    DiPython,
    DiReact,
    DiDatabase,
} from 'react-icons/di';
import {
    BiLogoTypescript,
    BiLogoFirebase,
} from 'react-icons/bi';
import { PiOpenAiLogo } from 'react-icons/pi';
import { SiBmcsoftware } from 'react-icons/si';

const skills = [
    { name: 'React', level: 90, icon: <DiReact className="w-6 h-6" /> },
    { name: 'Firebase', level: 100, icon: <BiLogoFirebase className="w-6 h-6" /> },
    { name: 'TypeScript', level: 75, icon: <BiLogoTypescript className="w-6 h-6" /> },
    { name: 'Javascript', level: 90, icon: <DiJavascript1 className="w-6 h-6" /> },
    { name: 'Python', level: 70, icon: <DiPython className="w-6 h-6" /> },
    { name: 'Prompt Engineering', level: 60, icon: <PiOpenAiLogo className="w-6 h-6" /> },
    { name: 'SQL', level: 70, icon: <Database className="w-6 h-6" /> },
    { name: 'Remedy', level: 65, icon: <SiBmcsoftware className="w-6 h-6" /> },
    { name: 'Neo4j', level: 30, icon: <DiDatabase className="w-6 h-6" /> },
];

const About = () => {
    return (
        <section
            id="about"
            className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[length:40px_40px] bg-grid-white/[0.03] 
                    [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]">
                </div>
            </div>

            {/* Content Container */}
            <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">About Me</h2>
                    <p className="max-w-3xl mx-auto text-lg lg:text-xl text-gray-300">
                        I am a full-stack developer specializing in modern web development
                        and AI integration. With expertise in React, TypeScript, and various
                        databases, I craft scalable and efficient applications. My work
                        spans creating web platforms, developing Discord bots, and building
                        AI-driven solutions.
                    </p>
                </motion.div>

                {/* Skills and Expertise Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Technical Skills Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-900/80 backdrop-blur-lg rounded-xl p-8 shadow-lg"
                    >
                        <h3 className="text-2xl font-semibold mb-6 flex items-center text-gradient">
                            <Database className="mr-3 w-8 h-8" /> Technical Skills
                        </h3>
                        {skills.map((skill, index) => (
                            <div key={index} className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center space-x-3">
                                        {skill.icon}
                                        <span className="text-white text-lg">{skill.name}</span>
                                    </div>
                                    <span className="text-primary font-bold">{skill.level}%</span>
                                </div>
                                <div className="relative h-2 bg-gray-700 rounded-full">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Development Philosophy Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-900/80 backdrop-blur-lg rounded-xl p-8 shadow-lg"
                    >
                        <h3 className="text-2xl font-semibold mb-6 flex items-center text-gradient">
                            <Brain className="mr-3 w-8 h-8" /> Development Philosophy
                        </h3>
                        <ul className="space-y-6">
                            {[
                                {
                                    title: "AI Integration Specialist",
                                    description:
                                        "Implementing AI solutions through OpenAI and Gemini APIs, focusing on efficiency and practical use cases.",
                                    icon: <PiOpenAiLogo className="w-6 h-6 text-blue-400" />,
                                },
                                {
                                    title: "Database Architecture",
                                    description:
                                        "Experience with SQL, Firebase, and Neo4j, leveraging the right database for the task at hand.",
                                    icon: <Database className="w-6 h-6 text-green-400" />,
                                },
                                {
                                    title: "Security-First Approach",
                                    description:
                                        "Ensuring security best practices in handling sensitive data and API configurations.",
                                    icon: <Lock className="w-6 h-6 text-red-400" />,
                                },
                                {
                                    title: "Continuous Learning",
                                    description:
                                        "Exploring new technologies to stay ahead in modern web development and AI trends.",
                                    icon: <Search className="w-6 h-6 text-yellow-400" />,
                                },
                            ].map((approach, index) => (
                                <li
                                    key={index}
                                    className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg hover:shadow-lg transition"
                                >
                                    <div className="flex-shrink-0">{approach.icon}</div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-white">
                                            {approach.title}
                                        </h4>
                                        <p className="text-gray-300">{approach.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
