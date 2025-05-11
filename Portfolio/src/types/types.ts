import { ReactNode } from "react";
export interface Milestone {
    id: string;
    title: string;
    date: string;
    icon: ReactNode;
    description: string;
    isCompleted: boolean;
}

export interface ProjectCardProps {
    title: string;
    description: string;
    technologies: string[];
    demoLink: string;
    githubLink: string;
    image: string;
}
export interface IntroductionProps {
    name: string;
    currentWordIndex: number;
    introduction: string[];
}