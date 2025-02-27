
import { useEffect, useRef } from "react";
import { Star, Award, Shield, Lightbulb } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0');
          entry.target.classList.remove('translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => observer.observe(el));
    }
    
    return () => observer.disconnect();
  }, []);

  const values = [
    {
      name: "Excelencia",
      description: "Buscamos la máxima calidad en cada servicio",
      icon: Star,
    },
    {
      name: "Compromiso",
      description: "Nos dedicamos plenamente a cada caso",
      icon: Award,
    },
    {
      name: "Ética",
      description: "Actuamos con integridad y transparencia",
      icon: Shield,
    },
    {
      name: "Novedad",
      description: "Nos mantenemos actualizados con las últimas tendencias legales",
      icon: Lightbulb,
    },
  ];

  return (
    <section id="nosotros" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Elementos decorativos asimétricos */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-muted skew-y-12 -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent/5 -translate-x-1/2 translate-y-1/4 rounded-full"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-primary mb-6 tracking-tight">
            Tradición y Excelencia Legal
          </h2>
          <p className="text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            Fundado en 2005, ECEN Abogados ha construido una sólida reputación basada en la excelencia profesional y el compromiso con nuestros clientes. Con más de 15 años de experiencia en el sector legal, nuestro estudio se ha convertido en un referente por su enfoque práctico y resultados consistentes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-100 rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-500">
            <img 
              src="/sala-reuniones.jpg" 
              alt="Equipo ECEN" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-8">
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-200">
              <h3 className="text-3xl font-playfair font-bold text-primary mb-4">
                Nuestra Historia
              </h3>
              <p className="text-secondary leading-relaxed">
                ECEN nació de la visión de tres socios fundadores que buscaban crear un estudio legal diferente, centrado en soluciones eficientes y comunicación clara con los clientes. Lo que comenzó como una pequeña oficina con tres abogados, hoy es un estudio consolidado con un equipo multidisciplinario de profesionales especializados.
              </p>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300">
              <h3 className="text-3xl font-playfair font-bold text-primary mb-6">
                Nuestros Valores
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div 
                    key={value.name} 
                    className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-muted transition-colors duration-300"
                  >
                    <div className="bg-accent/10 p-3 rounded-full group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <value.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg mb-1 group-hover:text-accent transition-colors duration-300">
                        {value.name}
                      </h4>
                      <p className="text-secondary group-hover:text-secondary/80 transition-colors duration-300">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
