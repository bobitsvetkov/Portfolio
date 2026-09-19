import { m } from 'motion/react';
import { Brain, Cloud, CloudCog, CreditCard, Database, GitBranch, Layers, Lock, TestTube } from 'lucide-react';
import {
    DiJavascript1,
    DiPython,
    DiReact,
} from 'react-icons/di';
import {
    BiLogoTypescript,
    BiLogoFirebase,
} from 'react-icons/bi';
import { PiOpenAiLogo } from 'react-icons/pi';
import {
    SiFastapi,
    SiPostgresql,
    SiFlutter,
    SiDocker,
    SiKotlin,
    SiGooglecloud,
    SiNeo4J,
} from 'react-icons/si';
import { SkillGroup } from '../types/types';

/**
 * Tiers reflect what ReForge is actually built with day to day, not a
 * self-scored percentage.
 */
const skillGroups: SkillGroup[] = [
    {
        tier: 'Daily',
        blurb: 'What I ship production code in.',
        skills: [
            { name: 'Python', icon: <DiPython className="h-4 w-4" /> },
            { name: 'FastAPI', icon: <SiFastapi className="h-4 w-4" /> },
            { name: 'PostgreSQL', icon: <SiPostgresql className="h-4 w-4" /> },
            { name: 'SQL', icon: <Database className="h-4 w-4" /> },
            { name: 'Flutter / Dart', icon: <SiFlutter className="h-4 w-4" /> },
            { name: 'TypeScript', icon: <BiLogoTypescript className="h-4 w-4" /> },
            { name: 'Docker', icon: <SiDocker className="h-4 w-4" /> },
            { name: 'AWS', icon: <Cloud className="h-4 w-4" /> },
        ],
    },
    {
        tier: 'Comfortable',
        blurb: 'Used in production, reach for the docs occasionally.',
        skills: [
            { name: 'React / Next.js', icon: <DiReact className="h-4 w-4" /> },
            { name: 'JavaScript', icon: <DiJavascript1 className="h-4 w-4" /> },
            { name: 'pytest', icon: <TestTube className="h-4 w-4" /> },
            { name: 'Stripe', icon: <CreditCard className="h-4 w-4" /> },
            { name: 'Firebase', icon: <BiLogoFirebase className="h-4 w-4" /> },
            { name: 'LLM integration', icon: <PiOpenAiLogo className="h-4 w-4" /> },
        ],
    },
    {
        tier: 'Exploring',
        blurb: 'Actively learning right now.',
        skills: [
            { name: 'Kotlin', icon: <SiKotlin className="h-4 w-4" /> },
            { name: 'Azure', icon: <CloudCog className="h-4 w-4" /> },
            { name: 'Google Cloud', icon: <SiGooglecloud className="h-4 w-4" /> },
            { name: 'Neo4j', icon: <SiNeo4J className="h-4 w-4" /> },
        ],
    },
];

const philosophy = [
    {
        title: 'The whole stack, not a slice',
        description:
            'I think one developer should be able to carry a product across frontend, backend, mobile and the infrastructure it runs on. On ReForge that was literal: I wrote the FastAPI service, the Flutter app that talks to it, and the Docker deployment they both live in.',
        icon: <Layers className="h-5 w-5 text-primary-300" />,
    },
    {
        title: 'Architecture from an empty repo',
        description:
            'ReForge outgrew its original Next.js API, so I designed and ported it onto a modular FastAPI service — routers grouped by role, business logic pulled into services, raw asyncpg over an ORM, encrypted PII, Stripe billing, and a test that fails the build if any route ships without an auth dependency.',
        icon: <GitBranch className="h-5 w-5 text-accent-400" />,
    },
    {
        title: 'Currently: depth on cloud',
        description:
            'Knowing enough AWS to deploy is not the same as knowing it well. At SoftwareOne I work on cloud and cost optimisation, which is exactly the gap I wanted to close — the difference between getting something running and running it properly.',
        icon: <Cloud className="h-5 w-5 text-sky-400" />,
    },
    {
        title: 'Security by default',
        description:
            'I treat the client as untrusted: secrets live on the backend, forms are gated behind a captcha, PII is encrypted at rest. That discipline came the hard way, after an early project of mine was breached because I left API keys in frontend code.',
        icon: <Lock className="h-5 w-5 text-emerald-400" />,
    },
];

const About = () => {
    return (
        <section
            id="about"
            className="relative overflow-hidden section-seam bg-surface-1 py-24 text-white"
        >
            <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-12">
                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 max-w-3xl"
                >
                    <p className="mb-3 font-mono text-sm text-primary-400">01 / about</p>
                    <h2 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-section">
                        One developer, the whole stack
                    </h2>
                    <p className="mb-4 text-lg leading-relaxed text-gray-400">
                        I am a full-stack developer, and I mean the whole thing — frontend,
                        backend, mobile and the infrastructure underneath. I co-founded
                        LHBSoft and architected ReForge, a vehicle service platform, taking
                        it from an empty repo to a revenue-generating product on web, iOS
                        and Android.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-400">
                        I have since joined <span className="text-gray-200">SoftwareOne</span>{' '}
                        to go deep on AWS and cloud cost optimisation. Cloud was the one link
                        in that chain where I knew my depth was thinner than the rest, and I
                        would rather fix that deliberately than work around it — the goal is
                        to take a project from architecture to production on my own.
                    </p>
                </m.div>

                {/* Skills run full width: chips flow horizontally, so a narrow
                    column left ~220px of dead space beside the taller prose card. */}
                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 rounded-2xl border border-surface-line bg-surface-3 p-8"
                >
                    <h3 className="mb-7 flex items-center font-display text-xl font-semibold">
                        <Database className="mr-3 h-5 w-5 text-primary-400" />
                        Technical Skills
                    </h3>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {skillGroups.map((group) => (
                            <div key={group.tier}>
                                <div className="mb-3 border-l-2 border-primary-500/40 pl-3">
                                    <h4 className="font-mono text-xs uppercase tracking-widest text-primary-400">
                                        {group.tier}
                                    </h4>
                                    <p className="mt-1 text-sm text-gray-500">{group.blurb}</p>
                                </div>
                                <ul className="flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <li
                                            key={skill.name}
                                            className="flex items-center gap-2 rounded-lg border border-surface-line bg-surface-4 px-3 py-1.5 text-sm text-gray-200"
                                        >
                                            <span className="text-gray-400">{skill.icon}</span>
                                            {skill.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </m.div>

                <m.h3
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="mb-5 flex items-center font-display text-xl font-semibold"
                >
                    <Brain className="mr-3 h-5 w-5 text-primary-400" />
                    How I Work
                </m.h3>

                <div className="grid gap-4 md:grid-cols-2">
                    {philosophy.map((approach, index) => (
                        <m.div
                            key={approach.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.45, delay: (index % 2) * 0.08 }}
                            className="flex items-start gap-4 rounded-2xl border border-surface-line bg-surface-3 p-6 transition-colors hover:border-primary-500/40"
                        >
                            <div className="mt-0.5 shrink-0">{approach.icon}</div>
                            <div>
                                <h4 className="mb-1.5 font-semibold text-white">
                                    {approach.title}
                                </h4>
                                <p className="text-sm leading-relaxed text-gray-400">
                                    {approach.description}
                                </p>
                            </div>
                        </m.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
