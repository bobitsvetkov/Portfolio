import { motion } from 'framer-motion';

interface Milestone {
    id: string;
    title: string;
    date: string;
    icon: React.ReactNode;
    description: string;
    isCompleted: boolean;
}

interface RoadmapProps {
    milestones: Milestone[];
    completedMilestones: number[];
    lineWidth: number;
    futureGoalPosition: number;
}

const Roadmap = ({
    milestones = [],
    completedMilestones = [],
    futureGoalPosition = 0
}: RoadmapProps) => {
    return (
        <div className="relative h-96 mb-20 w-full mt-24">
            <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-700">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50" />

                {/* Traversing element */}
                <motion.div
                    className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"
                    initial={{ x: 0 }}
                    animate={{
                        x: futureGoalPosition,
                        scale: [1, 1.2, 1],
                        backgroundColor: ["#3B82F6", "#A855F7"],
                    }}
                    transition={{
                        duration: 5,
                        ease: "linear",
                    }}
                    style={{
                        top: '50%',
                    }}
                />

                {/* Milestones section */}
                {milestones.map((milestone, index) => {
                    const totalMilestones = milestones.length - 1;
                    const position = `${(index / totalMilestones) * 100}%`;
                    const isEven = index % 2 === 0;

                    return (
                        <div key={milestone.id} className="absolute" style={{ left: position }}>
                            {/* Milestone Vertical line */}
                            <div
                                className="absolute left-1/2 w-px bg-gray-600"
                                style={{
                                    height: '64px',
                                    top: isEven ? '8px' : '-72px',
                                    transform: 'translateX(-50%)',
                                }}
                            />

                            {/* Milestone completed check */}
                            <div
                                className="absolute"
                                style={{
                                    left: '50%',
                                    top: '0',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <motion.div
                                    className={`w-8 h-8 rounded-full p-1 ${completedMilestones.includes(index)
                                            ? 'border-4 border-green-500'
                                            : 'border-2 border-gray-500'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                >
                                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                                        {milestone.icon}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Content */}
                            <motion.div
                                className={`absolute left-1/2 w-48 ${isEven ? 'top-20' : 'bottom-20'}`}
                                style={{ transform: 'translateX(-50%)' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <p className="text-center font-medium">{milestone.title}</p>
                                <p className="text-center text-sm text-gray-400">{milestone.date}</p>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Roadmap;