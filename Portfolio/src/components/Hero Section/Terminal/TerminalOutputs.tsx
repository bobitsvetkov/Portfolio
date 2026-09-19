import { ReactNode } from 'react';
import { ProjectCardProps } from '../../../types/types';

/**
 * Presentational pieces the commands render. Kept separate from the command
 * registry so that file exports only data — otherwise Fast Refresh warns about
 * mixing component and constant exports.
 *
 * Nothing here imports the registry; `HelpCommandOutput` takes the command
 * table as a prop instead, which keeps the dependency one-directional.
 */

export const Row = ({ label, children }: { label: string; children: ReactNode }) => (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
        <span className="w-24 shrink-0 text-gray-500">{label}</span>
        <span className="text-gray-300">{children}</span>
    </div>
);

export const ProjectList = ({
    items,
    heading,
}: {
    items: ProjectCardProps[];
    heading: string;
}) => (
    <div className="mb-3">
        <p className="mb-1 text-gray-500">{heading}</p>
        {items.map((p) => (
            <div key={p.slug} className="flex flex-col sm:flex-row sm:gap-3">
                <span className="w-56 shrink-0 text-yellow-400">{p.slug}</span>
                <span className="text-gray-400">{p.title}</span>
            </div>
        ))}
    </div>
);

export interface HelpEntry {
    name: string;
    desc: string;
    icon: ReactNode;
    usage?: string;
}

export const HelpCommandOutput = ({ entries }: { entries: HelpEntry[] }) => (
    <div className="mt-1">
        <p className="mb-2 text-green-400">Available commands:</p>
        {entries.map((entry) => (
            <div key={entry.name} className="mb-1 flex items-start gap-2">
                <span className="mt-0.5 text-primary-400">{entry.icon}</span>
                <span className="w-56 shrink-0 text-yellow-400">{entry.usage ?? entry.name}</span>
                <span className="text-gray-500">{entry.desc}</span>
            </div>
        ))}
        <p className="mt-3 text-gray-600">
            Tab completes · ↑ ↓ recalls history · Ctrl+L clears
        </p>
    </div>
);
