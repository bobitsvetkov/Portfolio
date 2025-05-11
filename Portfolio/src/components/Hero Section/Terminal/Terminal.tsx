import { TerminalHeader, CommandPrompt, HistoryList } from './TerminalUI';
import { useTerminal } from '../../../hooks/useTerminal';

const Terminal = () => {
  const {
    history,
    currentInput,
    terminalEndRef,
    terminalContentRef,
    inputRef,
    handleKeyDown,
    handleInputChange,
    focusInput
  } = useTerminal();

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700">
        <TerminalHeader />

        <div 
          ref={terminalContentRef} 
          className="p-4 font-mono h-[400px] overflow-y-auto" 
          onClick={focusInput}
        >
          <HistoryList entries={history} />

          <CommandPrompt
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
          
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Terminal;