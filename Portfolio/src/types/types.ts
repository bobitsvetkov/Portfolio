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
    /** Stable kebab-case id used by the terminal's `ls` and `open` commands. */
    slug: string;
    title: string;
    description: string;
    technologies: string[];
    demoLink?: string;
    /** Omitted for commercial work whose source is closed. */
    githubLink?: string;
    appStoreLink?: string;
    playStoreLink?: string;
    /** Shows a "Closed source" note in place of a repo link. */
    privateSource?: boolean;
    image: string;
    isLegacy?: boolean;
    /** Short line under the title, e.g. the company or context. */
    role?: string;
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
