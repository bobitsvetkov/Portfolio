import { useState, useEffect, useRef, JSX } from 'react';
import { HistoryEntry } from '../components/Hero Section/Terminal/Commands';
import { processCommand, completeInput } from '../components/Hero Section/Terminal/CommandHandler';

const WELCOME: HistoryEntry = {
  type: 'system',
  content: (
    <div className="text-green-400">
      Welcome. Type <span className="text-yellow-400">help</span> to get started, or{' '}
      <span className="text-yellow-400">ls</span> to see what I have built.
    </div>
  )
};

export const useTerminal = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([WELCOME]);
  const [currentInput, setCurrentInput] = useState('');
  // Commands the user actually ran, newest last; -1 means "editing a fresh line".
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState(-1);
  const [draft, setDraft] = useState('');

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the prompt in view as output accumulates.
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ block: 'nearest' });
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  const print = (content: JSX.Element, type: HistoryEntry['type'] = 'output') => {
    setHistory(prev => [...prev, { type, content }]);
  };

  const clearTerminal = () => setHistory([]);

  const runCommand = (input: string) => {
    processCommand(input, print, clearTerminal);
    setCommandLog(prev => (prev[prev.length - 1] === input ? prev : [...prev, input]));
    setLogIndex(-1);
    setDraft('');
  };

  const recall = (direction: -1 | 1) => {
    if (commandLog.length === 0) return;

    if (direction === -1) {
      // Stepping back into history; stash the in-progress line first.
      const next = logIndex === -1 ? commandLog.length - 1 : Math.max(0, logIndex - 1);
      if (logIndex === -1) setDraft(currentInput);
      setLogIndex(next);
      setCurrentInput(commandLog[next]);
      return;
    }

    if (logIndex === -1) return;
    const next = logIndex + 1;
    if (next >= commandLog.length) {
      setLogIndex(-1);
      setCurrentInput(draft);
      return;
    }
    setLogIndex(next);
    setCurrentInput(commandLog[next]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (currentInput.trim() === '') return;
      runCommand(currentInput);
      setCurrentInput('');
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      recall(-1);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      recall(1);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const { completed, candidates } = completeInput(currentInput);
      setCurrentInput(completed);
      if (candidates.length > 1) {
        print(
          <div className="flex flex-wrap gap-x-4 text-gray-500">
            {candidates.map(c => (
              <span key={c} className="text-yellow-400/70">{c}</span>
            ))}
          </div>
        );
      }
      return;
    }

    // Ctrl+L clears, Ctrl+C abandons the current line — both as in a real shell.
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      clearTerminal();
      return;
    }

    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      print(
        <div className="text-gray-600">
          <span className="text-primary-400">$</span> {currentInput}^C
        </div>,
        'command'
      );
      setCurrentInput('');
      setLogIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
    setLogIndex(-1);
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
