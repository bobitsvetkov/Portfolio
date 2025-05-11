import { HistoryEntry } from './Commands';
import { HelpCommandOutput } from './TerminalUI';

export type CommandHandler = (
  addToHistory: (entry: HistoryEntry) => void,
  clearTerminal: () => void
) => void;

const navigateToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ 
    behavior: "smooth", 
    block: "start" 
  });
};

export const commandHandlers: Record<string, CommandHandler> = {
  help: (addToHistory) => {
    addToHistory({
      type: 'output',
      content: <HelpCommandOutput />
    });
  },
  
  skills: () => {
    navigateToSection("about");
  },
  
  projects: () => {
    navigateToSection("projects");
  },
  
  contact: () => {
    navigateToSection("contact");
  },
  
  clear: (_, clearTerminal) => {
    clearTerminal();
  }
};

export const processCommand = (
  cmd: string,
  addToHistory: (entry: HistoryEntry) => void,
  clearTerminal: () => void
): void => {
  const commandInput = cmd.toLowerCase().trim();
  
  addToHistory({
    type: 'command',
    content: <div>{`$ ${cmd}`}</div>
  });
  
  const handler = commandHandlers[commandInput];
  
  if (handler) {
    handler(addToHistory, clearTerminal);
  } else {
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