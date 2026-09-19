import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import Nav from './components/Nav';
import Hero from './components/Hero Section/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    // `strict` forbids the heavyweight `motion.*` components, so every
    // animated element must use `m.*` and the full bundle stays out.
    // `reducedMotion="user"` makes every m.* element honour the OS setting.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <Nav />

        <main id="main">
          <Hero />
          <About />
          <Projects />
        </main>

        <Contact />
      </MotionConfig>
    </LazyMotion>
  );
};

export default App;
