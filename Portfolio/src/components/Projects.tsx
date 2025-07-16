import React from 'react';
import { motion } from 'framer-motion';
import {
    Code,
    Rocket
} from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import TotalWarWebsiteImage from "../assets/Screenshot 2024-12-21 002032.png"
import DiscordBotImage from "../assets/6PQtKYb - Imgur.png"
import { ProjectCardProps } from '../types/types';

const projects: ProjectCardProps[] = [
    {
        title: "Connectify",
        description: "Advanced conversational AI with personalized interaction capabilities. Built with state-of-the-art language models and real-time communication.",
        technologies: ["React", "TypeScript", "OpenAI API", "Agora", "Redux"],
        demoLink: "https://connectify-telerikproject.vercel.app/",
        githubLink: "https://github.com/bobitsvetkov/Connectify",
        image: "https://raw.githubusercontent.com/bobitsvetkov/Connectify/main/Connectify/src/assets/images/Landing1.png",
    },
    {
        title: "Total War Community Hub",
        description: "Comprehensive platform for Total War gamers to connect, compete, and strategize.",
        technologies: ["React", "Tailwind", "Firebase", "Google Gemini API", "Typescript", "ChakraUI"],
        demoLink: "https://tw-website.vercel.app/",
        githubLink: "https://github.com/bobitsvetkov/tw-website",
        image: TotalWarWebsiteImage,
    },
    {
        title: "Thracian Noble",
        description: "AI-powered bot providing game stats, recommendations, and community management.",
        technologies: ["Python", "Discord.py", "Prompt Engineering", "OpenAI API", "Firebase"],
        demoLink: "https://discord.gg/K9GU6VzrmK",
        githubLink: "https://github.com/bobitsvetkov/Total-War-Bot",
        image: DiscordBotImage,
    }
];

const Projects: React.FC = () => {
    return (
        <section
            id="projects"
            className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[length:40px_40px] bg-grid-white/[0.03]
                    [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]">
                </div>
            </div>

            <div className="w-full px-4 md:px-8 lg:px-16 max-w-screen-xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center space-x-4 mb-6">
                        <Rocket className="w-12 h-12 text-primary-400" />
                        <h2 className="text-5xl font-bold text-white">Featured Projects</h2>
                        <Code className="w-12 h-12 text-accent-400" />
                    </div>
                    <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
                        A showcase of my technical projects, featuring web applications,
                        AI integrations, and innovative solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: projects.indexOf(project) * 0.2 }}
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