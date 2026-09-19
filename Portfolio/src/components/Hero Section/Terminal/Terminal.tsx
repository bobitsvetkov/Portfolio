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
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-xl border border-surface-line bg-surface-3/80 shadow-2xl shadow-black/40 backdrop-blur-sm">
        <TerminalHeader />

        <div
          ref={terminalContentRef}
          className="h-[380px] overflow-y-auto p-4 font-mono text-sm"
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
