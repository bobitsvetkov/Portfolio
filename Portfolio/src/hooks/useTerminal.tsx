import { useState, useEffect, useRef } from 'react';
import { HistoryEntry } from '../components/Hero Section/Terminal/Commands';
import { processCommand } from '../components/Hero Section/Terminal/CommandHandler';

export const useTerminal = () => {
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

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const terminalContent = terminalContentRef.current;
    if (terminalContent) {
      terminalContent.addEventListener('click', focusInput);
      return () => {
        terminalContent.removeEventListener('click', focusInput);
      };
    }
  }, []);

  const addToHistory = (entry: HistoryEntry) => {
    setHistory(prev => [...prev, entry]);
  };

  const clearTerminal = () => {
    setHistory([{
      type: 'system',
      content: (
        <div className="text-green-400">
          Terminal cleared. Type 'help' to see available commands.
        </div>
      )
    }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim() !== '') {
      processCommand(currentInput, addToHistory, clearTerminal);
      setCurrentInput('');
      e.preventDefault();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  return {
    history,
    currentInput,
    terminalEndRef,
    terminalContentRef,
    inputRef,
    handleKeyDown,
    handleInputChange,
    focusInput
  };
};