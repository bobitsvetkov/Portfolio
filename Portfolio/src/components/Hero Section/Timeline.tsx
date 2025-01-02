import { useState, useEffect, useRef } from 'react';
import { Command, HelpCircle, Code, Briefcase, GraduationCap } from 'lucide-react';

const COMMANDS = {
    help: {
        desc: 'Display available commands',
        icon: <HelpCircle className="w-4 h-4" />
    },
    skills: {
        desc: 'Show tech stack and skills',
        icon: <Code className="w-4 h-4" />
    },
    projects: {
        desc: 'List all projects',
        icon: <Briefcase className="w-4 h-4" />
    },
    contact: {
        desc: 'Show contact information',
        icon: <GraduationCap className="w-4 h-4" />
    },
    clear: {
        desc: 'Clear terminal',
        icon: <Command className="w-4 h-4" />
    }
};

const Timeline = () => {
    interface HistoryEntry {
        type: string;
        content: JSX.Element;
    }
    const [history, setHistory] = useState<HistoryEntry[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const terminalEndRef = useRef(null);
    const terminalContentRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setHistory([{
            type: 'system',
            content: (
                <div className="text-green-400">
                    Welcome to my Portfolio Website! Type help to get started!
                </div>
            )
        }]);
    }, []);

    // Ensure input is always focused
    const focusInput = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        const terminalContent = terminalContentRef.current;
        if (terminalContent) {
            terminalContent.addEventListener('click', focusInput);
        }

        return () => {
            if (terminalContent) {
                terminalContent.removeEventListener('click', focusInput);
            }
        };
    }, []);

    const executeCommand = (cmd: string) => {
        const commandInput = cmd.toLowerCase().trim();

        addToHistory({
            type: 'command',
            content: <div>{`$ ${cmd}`}</div>
        });

        switch (commandInput) {
            case 'help':
                addToHistory({
                    type: 'output',
                    content: (
                        <div className="mt-2">
                            <p className="text-green-400 mb-2">Available commands:</p>
                            {Object.entries(COMMANDS).map(([cmd, info]) => (
                                <div key={cmd} className="flex items-center space-x-2 mb-1">
                                    <span className="text-blue-400">{info.icon}</span>
                                    <span className="text-yellow-400">{cmd}</span>
                                    <span className="text-gray-400">- {info.desc}</span>
                                </div>
                            ))}
                        </div>
                    )
                });
                break;

            case 'skills':
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
                break;

            case 'projects':
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" });
                break;

            case 'contact':
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                break;

            case 'clear':
                setHistory([{
                    type: 'system',
                    content: (
                        <div className="text-green-400">
                            Terminal cleared. Type 'help' to see available commands.
                        </div>
                    )
                }]);
                break;

            default:
                addToHistory({
                    type: 'error',
                    content: (
                        <div className="text-red-400">
                            Command not recognized: '{cmd}'. Type 'help' to see available commands.
                        </div>
                    )
                });
        }
    };

    const addToHistory = (entry: HistoryEntry) => {
        setHistory(prev => [...prev, entry]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentInput.trim() !== '') {
            executeCommand(currentInput);
            setCurrentInput('');
            e.preventDefault();
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700">
                <div className="flex items-center px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 text-center text-gray-400 text-sm font-mono">
                        route_terminal.sh
                    </div>
                </div>

                <div ref={terminalContentRef} className="p-4 font-mono h-[400px] overflow-y-auto" onClick={focusInput}>
                    {history.map((entry, index) => (
                        <div key={index} className="mb-2">
                            {entry.content}
                        </div>
                    ))}

                    <div className="flex items-center space-x-2">
                        <span className="text-blue-400">$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent text-white outline-none"
                            spellCheck="false"
                            autoFocus
                        />
                    </div>
                    <div ref={terminalEndRef} />
                </div>
            </div>
        </div>
    );
};

export default Timeline;
