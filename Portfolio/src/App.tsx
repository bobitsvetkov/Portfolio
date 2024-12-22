import Hero from './components/Hero Section/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <div>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;
