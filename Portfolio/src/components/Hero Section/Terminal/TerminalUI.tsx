import React from 'react';
import { HistoryEntry, COMMANDS } from './Commands';

interface TerminalHeaderProps {
  title?: string;
}

export const TerminalHeader = ({ title = 'route_terminal.sh' }: TerminalHeaderProps) => (
  <div className="flex items-center px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
    <div className="flex space-x-2">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <div className="flex-1 text-center text-gray-400 text-sm font-mono">
      {title}
    </div>
  </div>
);

interface CommandPromptProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const CommandPrompt = ({ value, onChange, onKeyDown, inputRef }: CommandPromptProps) => (
  <div className="flex items-center space-x-2">
    <span className="text-blue-400">$</span>
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="flex-1 bg-transparent text-white outline-none"
      spellCheck="false"
      autoFocus
    />
  </div>
);

export const HelpCommandOutput = () => (
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