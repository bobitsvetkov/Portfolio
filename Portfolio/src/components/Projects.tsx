import React from 'react';
import { m } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import TotalWarWebsiteImage from "../assets/total-war-hub.webp"
import DiscordBotImage from "../assets/thracian-noble.webp"
import FloorTechsImage from "../assets/floor-techs.webp"
import RandomGeneratorImage from "../assets/rome-2-matchup-generator.webp"
import PredictPerformanceImage from "../assets/predict-player-performance.webp"
import { ProjectCardProps } from '../types/types';

// `outcome` is optional and intentionally unset — add one line per project
// (users reached, rows processed, problem solved) and the card renders it.
const projects: ProjectCardProps[] = [
    {
        title: "Predict Player Performance",
        description: "A web application that predicts player performance using clustering and regression techniques. I used my Discord bot to gather the data behind the dataset.",
        technologies: ["Python", "Streamlit", "Pandas", "NumPy", "Scikit-learn", "json"],
        demoLink: "https://predict-player-performance.streamlit.app/",
        githubLink: "https://github.com/bobitsvetkov/Predict-Player-Performance",
        image: PredictPerformanceImage,
        featured: true,
    },
    {
        title: "Rome 2 Matchup Generator",
        description: "A web application that generates random faction matchups for Total War: Rome 2.",
        technologies: ["Typescript", "React", "json"],
        demoLink: "https://bobitsvetkov.github.io/Rome-2-Random-Matchup-Generator/",
        githubLink: "https://github.com/bobitsvetkov/Rome-2-Random-Matchup-Generator",
        image: RandomGeneratorImage,
    }
];

const legacyProjects: ProjectCardProps[] = [
    {
        title: "Total War Community Hub",
        description: "Comprehensive platform for Total War gamers to connect, compete, and strategize.",
        technologies: ["React", "Tailwind", "Firebase", "Google Gemini API", "Typescript", "ChakraUI", "Vercel"],
        githubLink: "https://github.com/bobitsvetkov/tw-website",
        image: TotalWarWebsiteImage,
        isLegacy: true,
    },
    {
        title: "Thracian Noble",
        description: "AI-powered Discord bot providing game stats, recommendations, and community management.",
        technologies: ["Python", "Discord.py", "Google Gemini API", "pytest", "Docker", "Youtube API", "json"],
        githubLink: "https://github.com/bobitsvetkov/Total-War-Bot",
        image: DiscordBotImage,
        isLegacy: true,
    },
    {
        title: "Floor-techs",
        description: "A website for a flooring company, showcasing their services and portfolio.",
        technologies: ["React", "Typescript", "Emailjs", "Tailwind", "Recaptcha", "Vercel"],
        githubLink: "https://github.com/bobitsvetkov/floortechs-website",
        image: FloorTechsImage,
        isLegacy: true,
    }
];

const Projects: React.FC = () => {
    return (
        <section
            id="projects"
            className="relative overflow-hidden section-seam bg-surface-2 py-24 text-white"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
            />

            <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="mb-14 max-w-3xl"
                >
                    <p className="mb-3 font-mono text-sm text-primary-400">02 / work</p>
                    <h2 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-section">
                        Things I have built
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-400">
                        Web applications, AI integrations, and data tooling — mostly grown
                        out of problems I ran into myself.
                    </p>
                </m.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <m.div
                            key={project.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={project.featured ? 'md:col-span-2' : ''}
                        >
                            <ProjectCard {...project} />
                        </m.div>
                    ))}
                </div>

                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 mt-20 flex flex-col gap-3 border-t border-surface-line pt-12 sm:flex-row sm:items-end sm:justify-between"
                >
                    <div>
                        <h3 className="font-display text-2xl font-semibold text-gray-300">
                            Legacy Projects
                        </h3>
                        <p className="mt-2 max-w-2xl text-gray-500">
                            No longer maintained. The live deployments are retired, but the
                            source is still on GitHub.
                        </p>
                    </div>
                </m.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {legacyProjects.map((project, index) => (
                        <m.div
                            key={project.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProjectCard {...project} />
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
