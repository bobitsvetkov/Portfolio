import { motion } from 'framer-motion';
import { MilestoneMarker } from './MilestoneMarker';
import { Milestone } from '../../types/types';

interface TimelineProps {
    milestones: Milestone[];
    completedMilestones: number[];
    futureGoalPosition: number;
    lineRef: React.RefObject<HTMLDivElement>;
}

export const Timeline = ({ milestones, completedMilestones, futureGoalPosition, lineRef }: TimelineProps) => (
    <div className="relative mb-20 mt-24 w-full h-96">
        <div ref={lineRef} className="absolute top-1/3 left-0 right-0 h-1 bg-gray-700">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50" />

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

            <div className="timeline-milestones">
                {milestones.map((milestone, index) => {
                    const totalMilestones = milestones.length - 1;
                    const position = `${(index / totalMilestones) * 100}%`;
                    const isEven = index % 2 === 0;

                    return (
                        <MilestoneMarker
                            key={milestone.id}
                            milestone={milestone}
                            position={position}
                            index={index}
                            isEven={isEven}
                            isCompleted={completedMilestones.includes(index)}
                        />
                    );
                })}
            </div>
        </div>
    </div>
);
