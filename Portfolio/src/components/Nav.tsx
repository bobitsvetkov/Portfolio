import { useEffect, useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';

const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);

const Nav = () => {
    const activeId = useScrollSpy(SECTION_IDS);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
                scrolled
                    ? 'bg-surface-0/85 backdrop-blur-md border-b border-surface-line'
                    : 'bg-transparent border-b border-transparent'
            }`}
        >
            <nav
                aria-label="Primary"
                className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12"
            >
                {/* Hidden on phones: at 390px it collides with the first nav link. */}
                <a
                    href="#home"
                    className="hidden font-mono text-sm font-medium text-gray-200 transition-colors hover:text-primary-300 sm:block"
                >
                    <span className="text-primary-400">~/</span>borislav
                </a>

                <ul className="flex items-center gap-1 ml-auto sm:gap-2 sm:ml-0">
                    {SECTIONS.map((section) => {
                        const isActive = activeId === section.id;
                        return (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`relative block rounded-md px-2.5 py-2 text-sm transition-colors sm:px-3 ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-gray-400 hover:text-gray-100'
                                    }`}
                                >
                                    {section.label}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute inset-x-2.5 -bottom-px h-px origin-left bg-primary-400 transition-transform duration-300 sm:inset-x-3 ${
                                            isActive ? 'scale-x-100' : 'scale-x-0'
                                        }`}
                                    />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};

export default Nav;
