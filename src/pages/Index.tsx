
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Areas from "@/components/Areas";
import Team from "@/components/Team";
import Publications from "@/components/Publications";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Areas />
      <Team />
      <Publications />
      <Contact />
    </div>
  );
};

export default Index;
