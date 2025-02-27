
import { useEffect, useRef, useState } from "react";
import areaService from "../services/areaService";
import { Area } from "../lib/types";
import { toast } from "../components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Areas = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [areas, setAreas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await areaService.getAllAreas();
        if (data && data.length > 0) {
          setAreas(data);
        } else {
          // Si no hay datos, usar los predeterminados
          setAreas(sampleAreas);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las áreas de práctica. Usando datos de muestra.",
          variant: "destructive"
        });
        // Usar datos de muestra en caso de error
        setAreas(sampleAreas);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAreas();
  }, []);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '50px', // Aumentamos el margen para detectar mejor
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Aseguramos que los elementos existan antes de intentar animarlos
          const elements = entry.target.querySelectorAll('.observe-element');
          if (elements.length > 0) {
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.remove('opacity-0');
                el.classList.add('opacity-100', 'translate-y-0');
              }, index * 200);
            });
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Aseguramos que el elemento existe antes de observarlo
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, [areas]);

  // Datos de muestra como respaldo
  const sampleAreas = [
    {
      title: "Derecho Penal",
      description: "Defensa penal, compliance y asesoramiento en procesos penales",
      // Primer icono: balanza de justicia
      icon: "M12,1 L8,5 L2,5 C1.448,5 1,5.448 1,6 L1,18 C1,18.552 1.448,19 2,19 L22,19 C22.552,19 23,18.552 23,18 L23,6 C23,5.448 22.552,5 22,5 L16,5 L12,1 Z M12,3.414 L14.586,6 L9.414,6 L12,3.414 Z M3,7 L21,7 L21,17 L3,17 L3,7 Z M15,11 L9,11 C8.448,11 8,11.448 8,12 C8,12.552 8.448,13 9,13 L15,13 C15.552,13 16,12.552 16,12 C16,11.448 15.552,11 15,11 Z",
      details: [
        "Defensa penal en todas las instancias",
        "Querellas criminales",
        "Delitos económicos y corporativos",
        "Representación de víctimas",
        "Compliance penal empresarial"
      ],
      caseStudy: "Conseguimos la absolución de un cliente en un complejo caso de presunta administración desleal, mediante una estrategia de defensa basada en pericias contables y financieras exhaustivas."
    },
    {
      title: "Derecho Civil",
      description: "Asesoramiento en contratos, responsabilidad civil y derecho de familia",
      // Primer icono: código o ley para derecho civil
      icon: "M20.59 12l-3.3-3.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4l3.3-3.3zM3.4 12l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L3.4 12zm7.56 8.24a1 1 0 0 1-1.94-.48l4-16a1 1 0 1 1 1.94.48l-4 16z",
      details: [
        "Contratos y obligaciones",
        "Responsabilidad civil",
        "Derecho inmobiliario",
        "Sucesiones y herencias",
        "Derecho de familia",
        "Mediación y resolución alternativa de conflictos"
      ],
      caseStudy: "Resolvimos favorablemente una compleja disputa inmobiliaria entre coherederos, logrando un acuerdo que evitó años de litigio y preservó el valor patrimonial."
    },
    {
      title: "Derecho Laboral",
      description: "Relaciones laborales, convenios colectivos y seguridad social",
      // Primer icono: personas para derecho laboral
      icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m12-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm5 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm1 2h4v3h-4z",
      details: [
        "Contratos laborales",
        "Negociaciones colectivas",
        "Despidos y desvinculaciones",
        "Accidentes laborales",
        "Reorganizaciones empresariales",
        "Auditorías laborales preventivas"
      ],
      caseStudy: "Asesoramos a una empresa internacional en su proceso de reestructuración, garantizando el cumplimiento de la normativa laboral y minimizando los riesgos legales asociados."
    },
  ];

  return (
    <section id="areas" ref={sectionRef} className="py-24 bg-muted relative overflow-hidden">
      {/* Elementos decorativos asimétricos */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full"></div>
      <div className="absolute bottom-12 -left-24 w-64 h-64 bg-primary/5 rounded-full"></div>
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto observe-element opacity-0 transition-all duration-700">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-primary mb-6 tracking-tight">
            Áreas de Práctica
          </h2>
          <p className="text-secondary text-lg leading-relaxed">
            Nuestro equipo de abogados especializados ofrece asesoramiento legal integral en las principales áreas del derecho
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-secondary">Cargando áreas de práctica...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-24">
            {areas.map((area, index) => (
              <div
                key={area._id || area.title}
                className={`observe-element opacity-0 transition-all duration-700 flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 lg:gap-16`}
              >
                {/* Icono estilizado */}
                <div className={`w-full md:w-2/5 p-12 ${
                  index % 2 === 0 ? 'md:-mr-8' : 'md:-ml-8'
                } z-10 rounded-lg ${
                  index === 0 ? 'bg-primary/10' : index === 1 ? 'bg-accent/10' : 'bg-primary/5'
                } flex items-center justify-center`}>
                  <div className="relative w-full aspect-square flex items-center justify-center">
                    <svg 
                      viewBox="0 0 24 24" 
                      className={`w-full h-full ${
                        index === 0 ? 'text-primary' : index === 1 ? 'text-accent' : 'text-primary'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={area.icon} />
                    </svg>
                    
                    {/* Elementos decorativos alrededor del icono */}
                    <div className="absolute inset-0 border-2 border-dashed border-current opacity-20 rounded-full animate-spin-slow"></div>
                  </div>
                </div>
                
                {/* Contenido */}
                <div className="w-full md:w-3/5 bg-white rounded-lg shadow-xl p-8 md:p-10 lg:p-12">
                  <h3 className="text-2xl md:text-3xl font-playfair font-bold text-primary mb-4">
                    {area.title}
                  </h3>
                  <p className="text-accent mb-6 text-lg">
                    {area.description}
                  </p>
                  
                  {area.details && (
                    <div className="mb-8">
                      <h4 className="text-lg font-medium text-primary mb-4">Servicios</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {Array.isArray(area.details) ? area.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-accent mr-2 text-xl">•</span>
                            <span className="text-secondary">{detail}</span>
                          </li>
                        )) : (
                          <li className="flex items-start">
                            <span className="text-accent mr-2 text-xl">•</span>
                            <span className="text-secondary">{area.description}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                  
                  {area.caseStudy && (
                    <div>
                      <h4 className="text-lg font-medium text-primary mb-3">Caso de Éxito</h4>
                      <div className="relative">
                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-accent"></div>
                        <p className="text-secondary italic pl-6 leading-relaxed">
                          "{area.caseStudy}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default Areas;
