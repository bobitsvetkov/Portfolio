import React from 'react';
import { m } from 'motion/react';
import { ArrowUpRight, Lock } from 'lucide-react';
import { BsGithub, BsApple, BsGooglePlay } from 'react-icons/bs';
import { ProjectCardProps } from '../types/types';

const iconLink =
    'rounded-lg p-2 text-gray-400 transition-colors hover:bg-surface-4 hover:text-primary-300';

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    technologies,
    demoLink,
    githubLink,
    image,
    isLegacy = false,
    outcome,
    featured = false,
    role,
    appStoreLink,
    playStoreLink,
    privateSource = false,
}) => {
    return (
        <m.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-line bg-surface-3 transition-colors hover:border-primary-500/40"
        >
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={`Screenshot of ${title}`}
                    loading="lazy"
                    decoding="async"
                    className={`w-full object-cover transition-all duration-500 ${
                        featured ? 'h-56 lg:h-72' : 'h-44'
                    } ${
                        isLegacy
                            ? 'opacity-40 grayscale group-hover:opacity-65'
                            : 'opacity-80 group-hover:scale-[1.03] group-hover:opacity-100'
                    }`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-3 via-surface-3/20 to-transparent" />

                <div className="absolute right-4 top-4 flex gap-2">
                    {isLegacy && (
                        <span className="rounded-full border border-surface-line bg-surface-0/80 px-3 py-1 text-xs font-medium text-gray-400 backdrop-blur-xs">
                            Archived
                        </span>
                    )}
                    {featured && (
                        <span className="rounded-full border border-primary-500/40 bg-primary-600/20 px-3 py-1 text-xs font-medium text-primary-200 backdrop-blur-xs">
                            Featured
                        </span>
                    )}
                </div>
            </div>

            <div className="flex flex-grow flex-col p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                    <div>
                        <h3
                            className={`font-display font-semibold text-white ${
                                featured ? 'text-2xl' : 'text-xl'
                            }`}
                        >
                            {title}
                        </h3>
                        {role && (
                            <p className="mt-1 font-mono text-xs text-gray-500">{role}</p>
                        )}
                    </div>
                    <div className="flex shrink-0 gap-1">
                        {demoLink && (
                            <a
                                href={demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${title}`}
                                className={iconLink}
                            >
                                <ArrowUpRight className="h-5 w-5" />
                            </a>
                        )}
                        {appStoreLink && (
                            <a
                                href={appStoreLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${title} on the App Store`}
                                className={iconLink}
                            >
                                <BsApple className="h-5 w-5" />
                            </a>
                        )}
                        {playStoreLink && (
                            <a
                                href={playStoreLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${title} on Google Play`}
                                className={iconLink}
                            >
                                <BsGooglePlay className="h-5 w-5" />
                            </a>
                        )}
                        {githubLink && (
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View the source of ${title} on GitHub`}
                                className={iconLink}
                            >
                                <BsGithub className="h-5 w-5" />
                            </a>
                        )}
                        {privateSource && (
                            <span
                                title="Commercial project — source is closed"
                                className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs text-gray-600"
                            >
                                <Lock className="h-4 w-4" />
                                Closed source
                            </span>
                        )}
                    </div>
                </div>

                {outcome && (
                    <p className="mb-3 flex items-start gap-2 text-sm font-medium text-primary-300">
                        <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-400" />
                        {outcome}
                    </p>
                )}

                <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-400">
                    {description}
                </p>

                <ul className="mt-auto flex flex-wrap gap-1.5">
                    {technologies.map((tech) => (
                        <li
                            key={tech}
                            className="rounded-md border border-surface-line bg-surface-4 px-2.5 py-1 font-mono text-xs text-gray-400"
                        >
                            {tech}
                        </li>
                    ))}
                </ul>
            </div>
        </m.article>
    );
};
