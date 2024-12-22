import { ReactNode } from "react";
export interface Milestone {
    id: string;
    title: string;
    date: string;
    icon: ReactNode;
    description: string;
    isCompleted: boolean;
}