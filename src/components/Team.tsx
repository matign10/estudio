
import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin } from "lucide-react";
import teamService from "../services/teamService";
import { TeamMember } from "../lib/types";
import { toast } from "../components/ui/use-toast";

const Team = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const data = await teamService.getAllTeamMembers();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los miembros del equipo. Usando datos de muestra.",
          variant: "destructive"
        });
        // Usar datos de muestra en caso de error
        setTeamMembers(sampleTeamMembers);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, []);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get all the team member cards
          const cards = entry.target.querySelectorAll('.team-card');
          // Animate each card with a delay
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('opacity-100', 'translate-y-0');
              card.classList.remove('opacity-0', 'translate-y-12');
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
  }, [teamMembers]);

  // Datos de muestra como respaldo en caso de error
  const sampleTeamMembers: TeamMember[] = [
    {
      name: "Dr. Carlos Martínez",
      position: "Socio Director - Especialista en Derecho Penal",
      bio: "Licenciado en Derecho por la Universidad Nacional, con Maestría en Derecho Penal. Con más de 20 años de experiencia, ha participado en algunos de los casos penales más relevantes del país. Profesor universitario y autor de diversas publicaciones especializadas.",
      imageUrl: "/placeholder.svg",
    },
    {
      name: "Dra. Elena Torres",
      position: "Socia - Especialista en Derecho Civil",
      bio: "Doctora en Derecho por la Universidad Central. Su práctica se centra en litigios civiles complejos y derecho inmobiliario. Con 15 años de trayectoria, es reconocida por su capacidad analítica y enfoque estratégico.",
      imageUrl: "/placeholder.svg",
    },
    {
      name: "Dr. Javier Rodríguez",
      position: "Socio - Especialista en Derecho Laboral",
      bio: "Abogado con especialización en Relaciones Laborales. Con más de 18 años de experiencia asesorando a empresas nacionales e internacionales. Experto en negociaciones colectivas y reestructuraciones corporativas.",
      imageUrl: "/placeholder.svg",
    },
    {
      name: "Dra. Laura Gómez",
      position: "Asociada Senior - Derecho Civil y Comercial",
      bio: "Licenciada en Derecho con Maestría en Derecho de los Negocios. Se especializa en contratos complejos y litigios comerciales. Forma parte del equipo desde 2012.",
      imageUrl: "/placeholder.svg",
    },
    {
      name: "Dr. Miguel Sánchez",
      position: "Asociado - Derecho Penal Económico",
      bio: "Especialista en delitos económicos y compliance. Incorporado al estudio en 2015, ha desarrollado programas de prevención para diversas compañías nacionales.",
      imageUrl: "/placeholder.svg",
    },
  ];

  return (
    <section id="profesionales" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-muted to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-primary mb-6 tracking-tight">
            Nuestros Profesionales
          </h2>
          <p className="text-secondary text-lg leading-relaxed">
            Contamos con un equipo de abogados altamente cualificados y con amplia experiencia en sus respectivas áreas de especialización
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {teamMembers.map((member) => (
              <div
                key={member._id || member.name}
                className="team-card opacity-0 translate-y-12 transition-all duration-700 group"
              >
                <div className="relative mb-6 overflow-hidden rounded-xl shadow-xl">
                  <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex space-x-3">
                          {member.socialLinks?.email && (
                            <a 
                              href={`mailto:${member.socialLinks.email}`} 
                              className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                              aria-label={`Email ${member.name}`}
                            >
                              <Mail className="w-5 h-5 text-white" />
                            </a>
                          )}
                          {member.socialLinks?.linkedin && (
                            <a 
                              href={member.socialLinks.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                              aria-label={`LinkedIn de ${member.name}`}
                            >
                              <Linkedin className="w-5 h-5 text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-playfair font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-accent text-sm mb-3">{member.position}</p>
                <p className="text-secondary text-sm line-clamp-4 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
