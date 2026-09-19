import { m, AnimatePresence } from 'motion/react';
import { IntroductionProps } from '../../types/types';

export const Introduction = ({ name, currentWordIndex, introduction }: IntroductionProps) => (
    <div className="mb-12 text-center">
        <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-5 font-mono text-sm tracking-tight text-primary-300"
        >
            $ whoami
        </m.p>

        <m.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-5 font-display text-5xl font-bold tracking-tight md:text-display"
        >
            Hello World, I&apos;m{' '}
            <span className="text-gradient">{name}</span>
        </m.h1>

        <div className="flex h-8 items-center justify-center">
            <AnimatePresence mode="wait">
                <m.p
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg text-gray-400 md:text-xl"
                >
                    {introduction[currentWordIndex]}
                </m.p>
            </AnimatePresence>
        </div>
    </div>
);
