import { ReactNode } from 'react';
import { Command, HelpCircle, Code, Briefcase, GraduationCap } from 'lucide-react';

export interface CommandInfo {
  desc: string;
  icon: ReactNode;
}

export interface HistoryEntry {
  type: 'system' | 'command' | 'output' | 'error';
  content: JSX.Element;
}

export const COMMANDS: Record<string, CommandInfo> = {
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