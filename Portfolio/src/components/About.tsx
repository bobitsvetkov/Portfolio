import { m } from 'motion/react';
import { Brain, Database, Lock } from 'lucide-react';
import {
    DiJavascript1,
    DiPython,
    DiReact,
    DiDatabase,
} from 'react-icons/di';
import {
    BiLogoTypescript,
    BiLogoFirebase,
} from 'react-icons/bi';
import { PiOpenAiLogo } from 'react-icons/pi';
import { SiBmcsoftware } from 'react-icons/si';
import { GiProgression } from 'react-icons/gi';
import { SkillGroup } from '../types/types';

/**
 * Grouped by how often each tool actually gets used, rather than a
 * self-scored percentage. The tiers map to the old 65+/50-64/<50 bands.
 */
const skillGroups: SkillGroup[] = [
    {
        tier: 'Daily',
        blurb: 'Reach for these without thinking.',
        skills: [
            { name: 'JavaScript', icon: <DiJavascript1 className="h-4 w-4" /> },
            { name: 'TypeScript', icon: <BiLogoTypescript className="h-4 w-4" /> },
            { name: 'SQL', icon: <Database className="h-4 w-4" /> },
            { name: 'Remedy', icon: <SiBmcsoftware className="h-4 w-4" /> },
        ],
    },
    {
        tier: 'Comfortable',
        blurb: 'Productive, still sharpening the edges.',
        skills: [
            { name: 'React', icon: <DiReact className="h-4 w-4" /> },
            { name: 'Firebase', icon: <BiLogoFirebase className="h-4 w-4" /> },
        ],
    },
    {
        tier: 'Exploring',
        blurb: 'Actively learning right now.',
        skills: [
            { name: 'Python', icon: <DiPython className="h-4 w-4" /> },
            { name: 'Prompt Engineering', icon: <PiOpenAiLogo className="h-4 w-4" /> },
            { name: 'Neo4j', icon: <DiDatabase className="h-4 w-4" /> },
        ],
    },
];

const philosophy = [
    {
        title: 'AI Integration',
        description:
            'I leverage AI tools like OpenAI and Gemini to create interesting and creative solutions that enhance the user experience. One such solution was creating a faction analysis tool, so that players could see which faction suits their playstyle.',
        icon: <PiOpenAiLogo className="h-5 w-5 text-primary-300" />,
    },
    {
        title: 'Focus on Security',
        description:
            'I treat the client as untrusted: secrets live on the backend, forms are gated behind a captcha, and nothing sensitive ships in the bundle. That discipline came the hard way, after an early project of mine was breached because I left API keys in frontend code.',
        icon: <Lock className="h-5 w-5 text-emerald-400" />,
    },
    {
        title: 'Continuous Learning',
        description:
            "I strive to stay ahead of the curve by continuously exploring new tools and technologies. Every project is an opportunity for growth, whether it's diving deeper into the backend or optimizing existing workflows.",
        icon: <GiProgression className="h-5 w-5 text-accent-400" />,
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
                        Building things, then learning what I got wrong
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-400">
                        I am a full-stack developer specializing in web development.
                        Recently I started exploring backend development and learning how to
                        create my own servers, rather than relying on platforms such as
                        Firebase or Vercel, which made me too focused on frontend.
                        Currently my goal is to become a more well-rounded developer by
                        learning how to further optimize my applications and incorporate AI
                        in interesting and creative ways.
                    </p>
                </m.div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-surface-line bg-surface-3 p-8 lg:col-span-2"
                    >
                        <h3 className="mb-8 flex items-center font-display text-xl font-semibold">
                            <Database className="mr-3 h-5 w-5 text-primary-400" />
                            Technical Skills
                        </h3>

                        <div className="space-y-7">
                            {skillGroups.map((group) => (
                                <div key={group.tier}>
                                    <div className="mb-3">
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

                    <m.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-2xl border border-surface-line bg-surface-3 p-8 lg:col-span-3"
                    >
                        <h3 className="mb-8 flex items-center font-display text-xl font-semibold">
                            <Brain className="mr-3 h-5 w-5 text-primary-400" />
                            How I Work
                        </h3>
                        <ul className="space-y-5">
                            {philosophy.map((approach) => (
                                <li
                                    key={approach.title}
                                    className="flex items-start gap-4 rounded-xl border border-transparent bg-surface-4/50 p-5 transition-colors hover:border-surface-line"
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
                                </li>
                            ))}
                        </ul>
                    </m.div>
                </div>
            </div>
        </section>
    );
};

export default About;
