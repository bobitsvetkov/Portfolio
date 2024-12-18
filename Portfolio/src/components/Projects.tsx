import React from 'react';
import { motion } from 'framer-motion';

type ProjectCardProps = {
    title: string;
    description: string;
    technologies: string[];
    demoLink: string;
    githubLink: string;
    image: string;
};

const projects: ProjectCardProps[] = [
    {
        title: "AI Chatbot (Mimir)",
        description: "An advanced conversational AI with personalized interaction capabilities.",
        technologies: ["React", "TypeScript", "OpenAI", "WebRTC"],
        demoLink: "#",
        githubLink: "#",
        image: "https://via.placeholder.com/400x250",
    },
    {
        title: "Gaming Community Platform",
        description: "Comprehensive platform for gamers to connect, compete, and improve.",
        technologies: ["Next.js", "Tailwind", "Firebase", "GraphQL"],
        demoLink: "#",
        githubLink: "#",
        image: "https://via.placeholder.com/400x250",
    },
    {
        title: "Discord Gamer Assistant",
        description: "AI-powered bot providing game stats, recommendations, and community management.",
        technologies: ["Python", "Discord.py", "Machine Learning"],
        demoLink: "#",
        githubLink: "#",
        image: "https://via.placeholder.com/400x250",
    }
];

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    technologies,
    demoLink,
    githubLink,
    image
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-card overflow-hidden"
        >
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex space-x-4">
                    <a
                        href={demoLink}
                        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
                    >
                        View Demo
                    </a>
                    <a
                        href={githubLink}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects: React.FC = () => {
    return (
        <section id="projects" className="py-20 bg-gray-50">
            <div className="w-full px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold text-center mb-12 text-gray-800"
                >
                    Featured Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;