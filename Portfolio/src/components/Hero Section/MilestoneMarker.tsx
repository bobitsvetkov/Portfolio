import { motion } from 'framer-motion';
import { Milestone } from '../../types/types';

interface MilestoneMarkerProps {
    milestone: Milestone;
    position: string;
    index: number;
    isEven: boolean;
    isCompleted: boolean;
}

export const MilestoneMarker = ({ milestone, position, index, isEven, isCompleted }: MilestoneMarkerProps) => (
    <div className="absolute" style={{ left: position }}>
        <div
            className="absolute left-1/2 w-px bg-gray-600"
            style={{
                height: '64px',
                top: isEven ? '8px' : '-72px',
                transform: 'translateX(-50%)',
            }}
        />

        <div
            className="absolute"
            style={{
                left: '50%',
                top: '0',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <motion.div
                className={`w-8 h-8 rounded-full p-1 ${isCompleted ? 'border-4 border-green-500' : 'border-2 border-gray-500'
                    }`}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    {milestone.icon}
                </div>
            </motion.div>
        </div>

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