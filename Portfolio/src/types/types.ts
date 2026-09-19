import { ReactNode } from "react";

export interface Skill {
    name: string;
    icon: ReactNode;
}

export interface SkillGroup {
    tier: string;
    blurb: string;
    skills: Skill[];
}

export interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    demoLink?: string;
    githubLink: string;
    image: string;
    isLegacy?: boolean;
    /**
     * One line on what the project actually achieved — users reached, data
     * processed, problem solved. Rendered above the description when set,
     * omitted entirely when not.
     */
    outcome?: string;
    /** Renders wider and taller in the grid. Use on at most one project. */
    featured?: boolean;
}

export interface IntroductionProps {
    name: string;
    currentWordIndex: number;
    introduction: string[];
}
