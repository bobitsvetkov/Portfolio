import { useEffect, useState, useRef } from 'react';
import { Code, Laptop, Users, GraduationCap, Bot, Target } from 'lucide-react';
import { FaTwitch } from 'react-icons/fa';
import { BsBank } from 'react-icons/bs';
import { Introduction } from './Introduction';
import { Timeline } from './Timeline';
import { Milestone } from '../../types/types';
import { BsTerminal } from 'react-icons/bs';

const Hero = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [completedMilestones, setCompletedMilestones] = useState<number[]>([]);
    const lineRef = useRef<HTMLDivElement>(null);
    const [lineWidth, setLineWidth] = useState(0);

    const introduction = [
        "Fullstack Developer",
        "AI Enthusiast",
        "IBM BPM Developer",
        "Passionate Gamer"
    ];

    const milestones: Milestone[] = [
        { id: 'start-coding', title: 'Start Coding', date: '2022', icon: <Code className="w-6 h-6" />, description: 'Beginning of the journey', isCompleted: true },
        { id: 'first-project', title: 'First Project', date: '2022', icon: <Laptop className="w-6 h-6" />, description: 'Solo project milestone', isCompleted: true },
        { id: 'bootcamp', title: 'Telerik Academy JS Program Start', date: '2023', icon: <BsTerminal className="w-6 h-6" />, description: 'Learning journey begins', isCompleted: true },
        { id: 'team-project', title: 'Connectify', date: '2023', icon: <Users className="w-6 h-6" />, description: 'Collaborative development', isCompleted: true },
        { id: 'graduate', title: 'Telerik Academy JS Program End', date: '2023', icon: <GraduationCap className="w-6 h-6" />, description: 'Achievement unlocked', isCompleted: true },
        { id: 'interview', title: 'Grinding Leetcode', date: '2023', icon: <GraduationCap className="w-6 h-6" />, description: 'Achievement unlocked', isCompleted: true },
        { id: 'work', title: 'Start working at DSK Bank', date: '2023', icon: <BsBank className="w-6 h-6" />, description: 'Achievement unlocked', isCompleted: true },
        { id: 'twitch-website', title: 'Twitch Streamer Community Website', date: '2024', icon: <FaTwitch className="w-6 h-6" />, description: 'Community platform', isCompleted: true },
        { id: 'discord-bot', title: 'Discord Community AI Bot', date: '2024', icon: <Bot className="w-6 h-6" />, description: 'Automation project', isCompleted: true },
        { id: 'future', title: 'Future Goals', date: '2025+', icon: <Target className="w-6 h-6" />, description: 'Upcoming challenges', isCompleted: false }
    ];

    useEffect(() => {
        if (lineRef.current) {
            setLineWidth(lineRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % introduction.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [introduction.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCompletedMilestones((prevMilestones) => {
                const nextMilestoneIndex = prevMilestones.length;
                if (nextMilestoneIndex < milestones.length - 1) {
                    return [...prevMilestones, nextMilestoneIndex];
                }
                return prevMilestones;
            });
        }, 500);
        return () => clearInterval(interval);
    }, [milestones.length]);

    const futureGoalIndex = milestones.findIndex((m) => m.id === 'future');
    const futureGoalPosition = (futureGoalIndex / (milestones.length - 1)) * lineWidth;

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col overflow-x-hidden">
            <div className="flex-1 container mx-auto px-4 pt-20 flex flex-col">
                <Introduction
                    name="Borislav"
                    currentWordIndex={currentWordIndex}
                    introduction={introduction}
                />
                <Timeline
                    milestones={milestones}
                    completedMilestones={completedMilestones}
                    futureGoalPosition={futureGoalPosition}
                    lineRef={lineRef}
                />
            </div>
        </section>
    );
};

export default Hero;
