import TotalWarWebsiteImage from "../assets/total-war-hub.webp";
import DiscordBotImage from "../assets/thracian-noble.webp";
import FloorTechsImage from "../assets/floor-techs.webp";
import RandomGeneratorImage from "../assets/rome-2-matchup-generator.webp";
import PredictPerformanceImage from "../assets/predict-player-performance.webp";
import ReForgeImage from "../assets/reforge.webp";
import { ProjectCardProps } from "../types/types";

/**
 * Single source of truth for project data: the Projects section renders these
 * as cards, and the terminal's `ls` / `open` commands resolve against the same
 * list, so the two can never drift apart.
 *
 * `outcome` is optional and intentionally unset — add one line per project
 * (users reached, rows processed, problem solved) and the card renders it.
 */
export const projects: ProjectCardProps[] = [
    {
        slug: "reforge",
        title: "ReForge",
        role: "Co-founder & architect · LHBSoft",
        outcome: "Architected from an empty repo to a revenue-generating product.",
        description:
            "A commercial SaaS platform connecting car repair shops, vehicle owners and mechanics on shared live data — jobs, scheduling, parts inventory, invoicing, quotes and financial reporting, with a realtime chat and notification layer across web, iOS and Android. I designed the architecture and built the Python/FastAPI backend and the Flutter app, including the migration of the API off Next.js.",
        technologies: [
            "Python", "FastAPI", "PostgreSQL", "asyncpg", "Flutter", "Dart",
            "Next.js", "TypeScript", "Docker", "AWS EC2", "Stripe", "WebSockets", "pytest",
        ],
        demoLink: "https://lhbsoft.com",
        appStoreLink: "https://apps.apple.com/us/app/reforge-by-lhbsoft/id6766107569",
        playStoreLink: "https://play.google.com/store/apps/details?id=com.lhb.reforge",
        privateSource: true,
        image: ReForgeImage,
        featured: true,
    },
    {
        slug: "predict-player-performance",
        title: "Predict Player Performance",
        outcome: "Sparked renewed activity in the player base, which fed more match data back in.",
        description:
            "A web application that predicts player performance using clustering and regression techniques. I used my Discord bot to gather the data behind the dataset — and the interest the tool generated produced more of it, which gave me a richer set to keep exploring machine learning with.",
        technologies: ["Python", "Streamlit", "Pandas", "NumPy", "Scikit-learn", "json"],
        demoLink: "https://predict-player-performance.streamlit.app/",
        githubLink: "https://github.com/bobitsvetkov/Predict-Player-Performance",
        image: PredictPerformanceImage,
    },
    {
        slug: "rome-2-matchup-generator",
        title: "Rome 2 Matchup Generator",
        description:
            "A web application that generates random faction matchups for Total War: Rome 2.",
        technologies: ["Typescript", "React", "json"],
        demoLink: "https://bobitsvetkov.github.io/Rome-2-Random-Matchup-Generator/",
        githubLink: "https://github.com/bobitsvetkov/Rome-2-Random-Matchup-Generator",
        image: RandomGeneratorImage,
    },
];

export const legacyProjects: ProjectCardProps[] = [
    {
        slug: "total-war-hub",
        title: "Total War Community Hub",
        description:
            "Comprehensive platform for Total War gamers to connect, compete, and strategize.",
        technologies: ["React", "Tailwind", "Firebase", "Google Gemini API", "Typescript", "ChakraUI", "Vercel"],
        githubLink: "https://github.com/bobitsvetkov/tw-website",
        image: TotalWarWebsiteImage,
        isLegacy: true,
    },
    {
        slug: "thracian-noble",
        title: "Thracian Noble",
        description:
            "AI-powered Discord bot providing game stats, recommendations, and community management.",
        technologies: ["Python", "Discord.py", "Google Gemini API", "pytest", "Docker", "Youtube API", "json"],
        githubLink: "https://github.com/bobitsvetkov/Total-War-Bot",
        image: DiscordBotImage,
        isLegacy: true,
    },
    {
        slug: "floor-techs",
        title: "Floor-techs",
        description:
            "A website for a flooring company, showcasing their services and portfolio.",
        technologies: ["React", "Typescript", "Emailjs", "Tailwind", "Recaptcha", "Vercel"],
        githubLink: "https://github.com/bobitsvetkov/floortechs-website",
        image: FloorTechsImage,
        isLegacy: true,
    },
];

export const allProjects: ProjectCardProps[] = [...projects, ...legacyProjects];

export const findProject = (slug: string) =>
    allProjects.find((p) => p.slug === slug.toLowerCase());
