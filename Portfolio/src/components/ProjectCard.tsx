import React from 'react';
import { motion } from 'framer-motion';
import {
    ExternalLink,
} from 'lucide-react';
import { BsGithub } from 'react-icons/bs';
import { ProjectCardProps } from '../types/types';

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    technologies,
    demoLink,
    githubLink,
    image,
}) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="h-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group flex flex-col"
        >
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                </div>
            </div>

            <div className="p-6 bg-gray-800 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white flex-grow">{title}</h3>
                    <div className="flex space-x-2 ml-4">
                        <a
                            href={demoLink}
                            className="text-white hover:text-primary-400 transition-colors p-2 hover:bg-gray-700 rounded-full"
                            title="View Demo"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                        <a
                            href={githubLink}
                            className="text-white hover:text-primary-400 transition-colors p-2 hover:bg-gray-700 rounded-full"
                            title="GitHub Repository"
                        >
                            <BsGithub className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <p className="text-gray-300 mb-6 flex-grow">{description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-3 bg-gray-700 text-white rounded-full text-xs font-medium hover:bg-gray-600 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};