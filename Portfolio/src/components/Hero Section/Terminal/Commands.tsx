import { ReactNode, JSX } from 'react';
import {
  Command,
  HelpCircle,
  Code,
  Briefcase,
  Mail,
  User,
  FileText,
  FolderOpen,
  ExternalLink,
} from 'lucide-react';
import { projects, legacyProjects, allProjects, findProject } from '../../../data/projects';
import { Row, ProjectList, HelpCommandOutput } from './TerminalOutputs';

export interface HistoryEntry {
  type: 'system' | 'command' | 'output' | 'error';
  content: JSX.Element;
}

export interface CommandContext {
  args: string[];
  print: (content: JSX.Element, type?: HistoryEntry['type']) => void;
  clear: () => void;
}

export interface CommandInfo {
  desc: string;
  icon: ReactNode;
  usage?: string;
  /** Completions for the first argument, used by Tab. */
  argHints?: () => string[];
  run: (ctx: CommandContext) => void;
}

const scrollTo = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const COMMANDS: Record<string, CommandInfo> = {
  help: {
    desc: 'Display available commands',
    icon: <HelpCircle className="h-4 w-4" />,
    run: ({ print }) => print(<HelpCommandOutput entries={helpEntries()} />),
  },

  whoami: {
    desc: 'Who is behind this site',
    icon: <User className="h-4 w-4" />,
    run: ({ print }) =>
      print(
        <div className="space-y-1">
          <Row label="name">Borislav Tsvetkov</Row>
          <Row label="role">Backend &amp; mobile engineer</Row>
          <Row label="now">SoftwareOne — cloud &amp; AWS cost optimisation</Row>
          <Row label="before">LHBSoft (co-founder) — architected ReForge</Row>
          <Row label="stack">Python · FastAPI · Postgres · Flutter · Docker · AWS</Row>
          <Row label="location">Bulgaria</Row>
          <p className="pt-2 text-gray-500">
            Run <span className="text-yellow-400">cat about.md</span> for the long version.
          </p>
        </div>
      ),
  },

  ls: {
    desc: 'List projects',
    icon: <FolderOpen className="h-4 w-4" />,
    usage: 'ls [projects|legacy|all]',
    argHints: () => ['projects', 'legacy', 'all'],
    run: ({ args, print }) => {
      const what = (args[0] ?? 'projects').toLowerCase();
      if (!['projects', 'legacy', 'all'].includes(what)) {
        print(
          <span className="text-red-400">
            ls: cannot access '{what}': try projects, legacy, or all
          </span>,
          'error'
        );
        return;
      }
      print(
        <div>
          {(what === 'projects' || what === 'all') && (
            <ProjectList items={projects} heading="active/" />
          )}
          {(what === 'legacy' || what === 'all') && (
            <ProjectList items={legacyProjects} heading="legacy/ (archived)" />
          )}
          <p className="text-gray-500">
            Run <span className="text-yellow-400">open &lt;name&gt;</span> to launch one.
          </p>
        </div>
      );
    },
  },

  open: {
    desc: 'Open a project demo or repo',
    icon: <ExternalLink className="h-4 w-4" />,
    usage: 'open <project>',
    argHints: () => allProjects.map((p) => p.slug),
    run: ({ args, print }) => {
      const slug = args[0];
      if (!slug) {
        print(<span className="text-red-400">open: missing project name. Try `ls`.</span>, 'error');
        return;
      }
      const project = findProject(slug);
      if (!project) {
        print(
          <span className="text-red-400">
            open: no project named '{slug}'. Run `ls all` to see options.
          </span>,
          'error'
        );
        return;
      }
      const target = project.demoLink ?? project.githubLink ?? project.appStoreLink;
      if (!target) {
        print(
          <span className="text-red-400">open: '{project.title}' has no public link.</span>,
          'error'
        );
        return;
      }
      const kind = project.demoLink
        ? 'site'
        : project.githubLink
          ? 'repo (no live demo — archived)'
          : 'app listing';
      print(
        <span className="text-gray-300">
          Opening {kind} for <span className="text-yellow-400">{project.title}</span>…
        </span>
      );
      window.open(target, '_blank', 'noopener,noreferrer');
    },
  },

  cat: {
    desc: 'Print a file',
    icon: <FileText className="h-4 w-4" />,
    usage: 'cat about.md',
    argHints: () => ['about.md', 'resume.pdf'],
    run: ({ args, print }) => {
      const file = (args[0] ?? '').toLowerCase();
      if (file === 'about.md') {
        print(
          <div className="space-y-2 text-gray-300">
            <p className="text-gray-500"># about.md</p>
            <p>
              Full-stack developer — frontend, backend, mobile and the infrastructure
              underneath. I co-founded LHBSoft and architected ReForge, taking it from
              an empty repo to a revenue-generating product on web, iOS and Android.
            </p>
            <p>
              Now at SoftwareOne, going deep on AWS and cloud cost optimisation. Cloud
              was the thinnest link in my chain, so I am fixing it deliberately — the
              goal is to take a project from architecture to production on my own.
            </p>
            <p className="text-gray-500">
              Jump to the full section with <span className="text-yellow-400">about</span>.
            </p>
          </div>
        );
        return;
      }
      if (file === 'resume.pdf') {
        print(<span className="text-gray-300">Opening resume…</span>);
        window.open(`${import.meta.env.BASE_URL}BorislavTsvetkovResume.pdf`, '_blank', 'noopener,noreferrer');
        return;
      }
      print(
        <span className="text-red-400">
          cat: {file || '<no file>'}: No such file. Try about.md or resume.pdf
        </span>,
        'error'
      );
    },
  },

  resume: {
    desc: 'Open my resume',
    icon: <FileText className="h-4 w-4" />,
    run: ({ print }) => {
      print(<span className="text-gray-300">Opening resume…</span>);
      window.open(`${import.meta.env.BASE_URL}BorislavTsvetkovResume.pdf`, '_blank', 'noopener,noreferrer');
    },
  },

  about: {
    desc: 'Jump to the About section',
    icon: <User className="h-4 w-4" />,
    run: () => scrollTo('about'),
  },

  skills: {
    desc: 'Jump to skills',
    icon: <Code className="h-4 w-4" />,
    run: () => scrollTo('about'),
  },

  projects: {
    desc: 'Jump to the Projects section',
    icon: <Briefcase className="h-4 w-4" />,
    run: () => scrollTo('projects'),
  },

  contact: {
    desc: 'Jump to contact',
    icon: <Mail className="h-4 w-4" />,
    run: () => scrollTo('contact'),
  },

  clear: {
    desc: 'Clear terminal',
    icon: <Command className="h-4 w-4" />,
    run: ({ clear }) => clear(),
  },

  sudo: {
    desc: 'Elevate privileges',
    icon: <Command className="h-4 w-4" />,
    run: ({ print }) =>
      print(
        <span className="text-gray-400">
          Nice try. This incident has been reported to the Senate.
        </span>
      ),
  },
};

export const COMMAND_NAMES = Object.keys(COMMANDS);

const helpEntries = () =>
  Object.entries(COMMANDS)
    .filter(([name]) => name !== 'sudo')
    .map(([name, info]) => ({ name, desc: info.desc, icon: info.icon, usage: info.usage }));

