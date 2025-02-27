
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const Publications = () => {
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
          const articles = entry.target.querySelectorAll('.article-card');
          articles.forEach((article, index) => {
            setTimeout(() => {
              article.classList.add('opacity-100', 'translate-y-0');
              article.classList.remove('opacity-0', 'translate-y-8');
            }, index * 150);
          });
          
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const articles = [
    {
      title: "Cambios recientes en la legislación penal: Implicaciones prácticas",
      author: "Dr. Carlos Martínez",
      date: "Julio 2024",
      excerpt: "Un análisis de las modificaciones legislativas más relevantes en materia penal y cómo estas afectan a la práctica jurídica cotidiana.",
    },
    {
      title: "Nuevas tendencias en contratos digitales: Desafíos y oportunidades",
      author: "Dra. Elena Torres",
      date: "Mayo 2024",
      excerpt: "Exploramos el marco legal aplicable a los smart contracts y otros contratos digitales, analizando sus ventajas e inconvenientes.",
    },
    {
      title: "El impacto de la reforma laboral en las pequeñas y medianas empresas",
      author: "Dr. Javier Rodríguez",
      date: "Marzo 2024",
      excerpt: "Una guía práctica sobre cómo las PyMEs pueden adaptarse a las recientes modificaciones de la normativa laboral.",
    },
    {
      title: "Claves para prevenir litigios en operaciones inmobiliarias",
      author: "Dra. Laura Gómez",
      date: "Febrero 2024",
      excerpt: "Recomendaciones para mitigar riesgos legales en transacciones inmobiliarias complejas.",
    },
  ];

  return (
    <section id="publicaciones" ref={sectionRef} className="py-24 bg-muted relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-accent/5 rounded-full translate-x-1/3"></div>
      <div className="absolute bottom-40 left-0 w-48 h-48 bg-primary/5 rounded-full -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-primary mb-6 tracking-tight">
            Publicaciones
          </h2>
          <p className="text-secondary text-lg leading-relaxed">
            Compartimos conocimiento legal actualizado a través de artículos especializados redactados por nuestros profesionales
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {articles.map((article, index) => (
            <div
              key={index}
              className="article-card opacity-0 translate-y-8 transition-all duration-700 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex-grow">
                  <div className="text-accent text-sm mb-3 font-medium">
                    {article.date} • {article.author}
                  </div>
                  <h3 className="text-xl font-playfair font-bold text-primary mb-3 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-secondary mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <a 
                  href="#" 
                  className="inline-flex items-center text-accent hover:text-accent/80 font-medium transition-colors group"
                >
                  Leer más <ArrowRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
