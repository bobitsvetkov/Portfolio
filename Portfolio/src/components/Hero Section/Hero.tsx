import { useEffect, useState} from 'react';
import { Introduction } from './Introduction';
import Terminal from './Terminal/Terminal';

const Hero = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    const introduction = [
        "Fullstack Developer",
        "AI Enthusiast",
        "IBM BPM Developer",
        "Passionate Gamer"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % introduction.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [introduction.length]);

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col overflow-x-hidden">
            <div className="flex-1 container mx-auto px-4 pt-20 flex flex-col">
                <Introduction
                    name="Borislav"
                    currentWordIndex={currentWordIndex}
                    introduction={introduction}
                />
                <Terminal
                />
            </div>
        </section>
    );
};

export default Hero;
