import { useEffect, useState } from 'react';
import { Introduction } from './Introduction';
import Terminal from './Terminal/Terminal';

const INTRODUCTION = [
    "Fullstack Developer",
    "Frontend · Backend · Mobile · DevOps",
    "Going deep on AWS",
    "Passionate Gamer"
];

const Hero = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % INTRODUCTION.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="home"
            className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-surface-0 text-white"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_50%_35%,black_20%,transparent_75%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-[32rem] w-[52rem] -translate-x-1/2 rounded-full bg-primary-600/12 blur-[110px]"
            />

            <div className="relative flex flex-1 flex-col container mx-auto px-4 pb-24 pt-28">
                <Introduction
                    name="Borislav"
                    currentWordIndex={currentWordIndex}
                    introduction={INTRODUCTION}
                />
                <Terminal />
            </div>
        </section>
    );
};

export default Hero;
