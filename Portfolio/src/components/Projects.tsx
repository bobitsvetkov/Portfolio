import React from 'react';
import { motion } from 'framer-motion';
import {
    Code,
    Rocket
} from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import TotalWarWebsiteImage from "../assets/Screenshot 2024-12-21 002032.png"
import DiscordBotImage from "../assets/6PQtKYb - Imgur.png"
import FloorTechsImage from "../assets/Screenshot 2025-08-02 151349.png"
import RandomGeneratorImage from "../assets/Screenshot 2025-08-02 204152.png"
import PredictPerformanceImage from "../assets/Screenshot 2025-08-02 204541.png"
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
        technologies: ["React", "Tailwind", "Firebase", "Google Gemini API", "Typescript", "ChakraUI", "Vercel"],
        demoLink: "https://tw-website.vercel.app/",
        githubLink: "https://github.com/bobitsvetkov/tw-website",
        image: TotalWarWebsiteImage,
    },
    {
        title: "Thracian Noble",
        description: "AI-powered bot providing game stats, recommendations, and community management.",
        technologies: ["Python", "Discord.py", "Google Gemini API", "pytest", "Docker", "Youtube API", "json"],
        demoLink: "https://discord.gg/K9GU6VzrmK",
        githubLink: "https://github.com/bobitsvetkov/Total-War-Bot",
        image: DiscordBotImage,
    },
    {
        title: "Floor-techs",
        description: "A website for a flooring company, showcasing their services and portfolio.",
        technologies: ["React", "Typescript", "Emailjs", "Tailwind", "Recaptcha", "Vercel"],
        demoLink: "https://floor-techs.com/",
        githubLink: "https://github.com/bobitsvetkov/floortechs-website",
        image: FloorTechsImage,
    },
    {
        title: "Rome-2-Random-Matchup-Generator",
        description: "A simple web application that generates random matchups for the game Rome 2.",
        technologies: ["Typescript", "React", "json"],
        demoLink: "https://bobitsvetkov.github.io/Rome-2-Random-Matchup-Generator/",
        githubLink: "https://github.com/bobitsvetkov/Rome-2-Random-Matchup-Generator",
        image: RandomGeneratorImage,
    },
    {
        title: "Predict Player Performance",
        description: "My most recent project, a web application that predicts player performance using clustering and regression techniques. I also used my discord bot to gather data for my dataset.",
        technologies: ["Python", "Streamlit", "Pandas", "NumPy", "Scikit-learn", "json"],
        demoLink: "https://predict-player-performance.streamlit.app/",
        githubLink: "https://github.com/bobitsvetkov/Predict-Player-Performance",
        image: PredictPerformanceImage,
    }
];

const Projects: React.FC = () => {
    return (
        <section
            id="projects"
            className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden"
        >
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