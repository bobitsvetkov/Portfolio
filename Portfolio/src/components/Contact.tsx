import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { m } from 'motion/react';

const cv = `${import.meta.env.BASE_URL}BorislavTsvetkovResume.pdf`;
const EMAIL = 'borislav.tsvetkov02@gmail.com';

interface ContactLink {
    icon: React.ReactNode;
    label: string;
    detail: string;
    href: string;
    /** Same-tab for mailto and the resume; new tab for external profiles. */
    external?: boolean;
}

const links: ContactLink[] = [
    {
        icon: <Mail className="h-5 w-5" />,
        label: 'Email',
        detail: EMAIL,
        href: `mailto:${EMAIL}`,
    },
    {
        icon: <BsLinkedin className="h-5 w-5" />,
        label: 'LinkedIn',
        detail: 'borislav-tsvetkov',
        href: 'https://www.linkedin.com/in/borislav-tsvetkov-818397198/',
        external: true,
    },
    {
        icon: <BsGithub className="h-5 w-5" />,
        label: 'GitHub',
        detail: 'bobitsvetkov',
        href: 'https://github.com/bobitsvetkov',
        external: true,
    },
    {
        icon: <FileText className="h-5 w-5" />,
        label: 'Resume',
        detail: 'PDF, one page',
        href: cv,
    },
];

const Contact = () => {
    return (
        <footer
            id="contact"
            className="relative section-seam bg-surface-0 pb-10 pt-24 text-white"
        >
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
                <m.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 max-w-3xl"
                >
                    <p className="mb-3 font-mono text-sm text-primary-400">03 / contact</p>
                    <h2 className="mb-6 font-display text-4xl font-bold tracking-tight md:text-section">
                        Let&apos;s build something
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-400">
                        I&apos;m always interested in hearing about new opportunities and
                        collaborations. Email is the fastest way to reach me.
                    </p>
                </m.div>

                <ul className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {links.map((link, index) => (
                        <m.li
                            key={link.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.07 }}
                        >
                            <a
                                href={link.href}
                                {...(link.external
                                    ? { target: '_blank', rel: 'noopener noreferrer' }
                                    : {})}
                                className="group flex h-full flex-col gap-3 rounded-2xl border border-surface-line bg-surface-3 p-5 transition-colors hover:border-primary-500/40"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 transition-colors group-hover:text-primary-300">
                                        {link.icon}
                                    </span>
                                    <ArrowUpRight className="h-4 w-4 text-gray-600 transition-colors group-hover:text-primary-300" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">{link.label}</p>
                                    <p className="mt-0.5 break-all font-mono text-xs text-gray-500">
                                        {link.detail}
                                    </p>
                                </div>
                            </a>
                        </m.li>
                    ))}
                </ul>

                <div className="border-t border-surface-line pt-8 text-center">
                    <p className="font-mono text-xs text-gray-600">
                        © {new Date().getFullYear()} Borislav Tsvetkov
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
