import React from 'react';
import { HistoryEntry } from './Commands';

interface TerminalHeaderProps {
  title?: string;
}

export const TerminalHeader = ({ title = 'route_terminal.sh' }: TerminalHeaderProps) => (
  <div className="flex items-center border-b border-surface-line bg-surface-4/60 px-4 py-2.5">
    <div className="flex space-x-2">
      <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
      <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
      <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
    </div>
    <div className="flex-1 text-center font-mono text-xs text-gray-500">
      {title}
    </div>
  </div>
);

interface CommandPromptProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const CommandPrompt = ({ value, onChange, onKeyDown, inputRef }: CommandPromptProps) => (
  <div className="flex items-center space-x-2">
    <span className="text-primary-400" aria-hidden="true">$</span>
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      aria-label="Terminal command input"
      className="flex-1 bg-transparent text-gray-100 outline-hidden placeholder:text-gray-600"
      placeholder="type 'help'"
      spellCheck="false"
      autoComplete="off"
    />
  </div>
);

export const HistoryList = ({ entries }: { entries: HistoryEntry[] }) => (
  <>
    {entries.map((entry, index) => (
      <div key={index} className="mb-2">
        {entry.content}
      </div>
    ))}
  </>
);
