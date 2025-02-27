
import { useState, useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import contactService from "../services/contactService";
import { ContactForm } from "../lib/types";
import { toast } from "../components/ui/use-toast";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.animate-on-scroll');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('opacity-100', 'translate-y-0');
              el.classList.remove('opacity-0', 'translate-y-8');
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Derecho Penal",
    message: "",
    privacy: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.privacy) {
      toast({
        title: "Error",
        description: "Debe aceptar la política de privacidad",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Preparar datos para el backend
      const contactFormData: ContactForm = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `${formData.subject}: ${formData.message}`
      };
      
      // Enviar al backend
      await contactService.submitContactForm(contactFormData);
      
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Nos pondremos en contacto con usted lo antes posible.",
      });
      
      // Resetear formulario
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Derecho Penal",
        message: "",
        privacy: false
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el formulario. Por favor intente nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute right-0 top-0 w-1/3 h-screen bg-gradient-to-l from-muted/60 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-primary mb-6 tracking-tight">
            Contacto
          </h2>
          <p className="text-secondary text-lg leading-relaxed">
            Estamos a su disposición para atender cualquier consulta o solicitud. No dude en ponerse en contacto con nosotros
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-muted to-muted/50 p-10 rounded-xl shadow-lg animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              <h3 className="text-2xl font-playfair font-bold text-primary mb-8">
                Información de contacto
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-full mr-4">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <span className="block text-primary font-medium mb-1">Dirección</span>
                    <address className="text-secondary not-italic">
                      Av. Libertador 1500, Piso 10, Ciudad
                    </address>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-full mr-4">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <span className="block text-primary font-medium mb-1">Teléfono</span>
                    <a href="tel:+XXXXXXXXXXXX" className="text-secondary hover:text-accent transition-colors">
                      +XX XXX-XXX-XXX
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <span className="block text-primary font-medium mb-1">Email</span>
                    <a href="mailto:contacto@ecen.com" className="text-secondary hover:text-accent transition-colors">
                      contacto@ecen.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-accent/10 p-3 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <span className="block text-primary font-medium mb-1">Horario</span>
                    <span className="text-secondary">
                      Lunes a Viernes de 9:00 a 18:00
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="h-80 bg-gray-200 rounded-xl overflow-hidden shadow-lg animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
              {/* Aquí iría el mapa interactivo */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-200">
                <span className="text-gray-500 font-medium">Mapa interactivo</span>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 delay-300">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg">
              <h3 className="text-2xl font-playfair font-bold text-primary mb-8">
                Envíenos un mensaje
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-primary font-medium mb-2">
                    Nombre y apellido*
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-primary font-medium mb-2">
                    Email*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-primary font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-primary font-medium mb-2">
                    Asunto*
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 bg-white"
                  >
                    <option value="Derecho Penal">Derecho Penal</option>
                    <option value="Derecho Civil">Derecho Civil</option>
                    <option value="Derecho Laboral">Derecho Laboral</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-primary font-medium mb-2">
                  Mensaje*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                ></textarea>
              </div>
              
              <div className="mb-8">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={formData.privacy}
                    onChange={handleCheckboxChange}
                    required
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-secondary">
                    He leído y acepto la <a href="#" className="text-accent hover:text-accent/80 underline transition-colors">política de privacidad</a>*
                  </span>
                </label>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </span>
                  ) : (
                    "Enviar mensaje"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
