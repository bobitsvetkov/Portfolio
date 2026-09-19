import { JSX } from 'react';
import { COMMANDS, COMMAND_NAMES, HistoryEntry } from './Commands';

/** Splits `open rome-2` into its command name and arguments. */
const tokenize = (input: string) => {
  const parts = input.trim().split(/\s+/).filter(Boolean);
  return { name: (parts[0] ?? '').toLowerCase(), args: parts.slice(1) };
};

export const processCommand = (
  input: string,
  print: (content: JSX.Element, type?: HistoryEntry['type']) => void,
  clear: () => void
): void => {
  const { name, args } = tokenize(input);

  print(
    <div className="text-gray-400">
      <span className="text-primary-400">$</span> {input}
    </div>,
    'command'
  );

  if (!name) return;

  const command = COMMANDS[name];

  if (!command) {
    const suggestion = COMMAND_NAMES.find(
      (c) => c.startsWith(name[0]) && (c.includes(name) || name.includes(c))
    );
    print(
      <div className="text-red-400">
        Command not recognized: '{name}'.
        {suggestion ? (
          <> Did you mean <span className="text-yellow-400">{suggestion}</span>?</>
        ) : (
          <> Type <span className="text-yellow-400">help</span> to see available commands.</>
        )}
      </div>,
      'error'
    );
    return;
  }

  command.run({ args, print, clear });
};

/**
 * Tab completion. Completes the command name on the first token, then defers
 * to that command's own `argHints` for the argument.
 *
 * Returns the completed line, plus any ambiguous candidates worth displaying.
 */
export const completeInput = (
  input: string
): { completed: string; candidates: string[] } => {
  const endsWithSpace = /\s$/.test(input);
  const parts = input.trimStart().split(/\s+/).filter(Boolean);

  // Completing the command name.
  if (parts.length === 0 || (parts.length === 1 && !endsWithSpace)) {
    const partial = parts[0] ?? '';
    const matches = COMMAND_NAMES.filter((c) => c.startsWith(partial));
    if (matches.length === 0) return { completed: input, candidates: [] };
    if (matches.length === 1) return { completed: matches[0] + ' ', candidates: [] };
    return { completed: commonPrefix(matches), candidates: matches };
  }

  // Completing the first argument.
  const command = COMMANDS[parts[0].toLowerCase()];
  if (!command?.argHints) return { completed: input, candidates: [] };

  const partial = endsWithSpace ? '' : (parts[1] ?? '');
  const matches = command.argHints().filter((h) => h.startsWith(partial));
  if (matches.length === 0) return { completed: input, candidates: [] };
  if (matches.length === 1) return { completed: `${parts[0]} ${matches[0]}`, candidates: [] };
  return { completed: `${parts[0]} ${commonPrefix(matches)}`, candidates: matches };
};

const commonPrefix = (items: string[]): string => {
  if (items.length === 0) return '';
  let prefix = items[0];
  for (const item of items.slice(1)) {
    while (!item.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
};
