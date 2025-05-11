import { motion, AnimatePresence } from 'framer-motion';
import { IntroductionProps } from '../../types/types';

export const Introduction = ({ name, currentWordIndex, introduction }: IntroductionProps) => (
    <div className="text-center mb-8">
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-7xl font-bold mb-4"
        >
            Hello World, I'm{' '}
            <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
                {name.split('').map((letter, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.05,
                            duration: 0.3,
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.span>
        </motion.h1>

        <AnimatePresence mode="wait">
            <motion.p
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ opacity: { duration: 0.5 }, y: { duration: 0.5 } }}
                className="text-xl text-gray-300"
            >
                {introduction[currentWordIndex]}
            </motion.p>
        </AnimatePresence>
    </div>
);