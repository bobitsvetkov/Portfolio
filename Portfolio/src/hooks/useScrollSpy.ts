import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently dominant in the viewport.
 *
 * Uses a single IntersectionObserver over several thresholds and picks the
 * most-visible entry, rather than firing on whichever section crosses a line
 * last — that keeps the active state stable when a short section (Contact)
 * follows a tall one (Projects).
 */
export const useScrollSpy = (ids: string[], offset = 80) => {
    const [activeId, setActiveId] = useState<string>(ids[0] ?? '');

    useEffect(() => {
        const ratios = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
                }

                let best = '';
                let bestRatio = 0;
                for (const [id, ratio] of ratios) {
                    if (ratio > bestRatio) {
                        best = id;
                        bestRatio = ratio;
                    }
                }
                if (best) setActiveId(best);
            },
            {
                rootMargin: `-${offset}px 0px 0px 0px`,
                threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
            }
        );

        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ids, offset]);

    return activeId;
};
