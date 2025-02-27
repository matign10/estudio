
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const slides = [
    {
      image: "/interior-oficina.jpg",
      title: "Excelencia Legal para tu Futuro",
      subtitle: "Compromiso y excelencia en el ejercicio del derecho",
    },
    {
      image: "/sala-reuniones.jpg",
      title: "Experiencia y Profesionalismo",
      subtitle: "Soluciones legales integrales para empresas y particulares",
    },
    {
      image: "/fachada-edificio.jpg",
      title: "Tradición y Modernidad",
      subtitle: "Más de 20 años de experiencia con un enfoque innovador",
    },
    {
      image: "/oficina-ventanal.jpg",
      title: "Confianza y Resultados",
      subtitle: "Tu éxito es nuestra prioridad",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 segundos por diapositiva

    // Efecto de paralaje
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background slides with paralaje effect */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: `center ${scrollY * 0.05}px`, // Efecto paralaje sutil
            transform: `scale(${1 + scrollY * 0.0005})`, // Sutil zoom al hacer scroll
          }}
        />
      ))}
      
      {/* Diagonal overlay más asimétrico */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent transform -skew-y-6 origin-left" />
      <div className="absolute inset-0 bg-gradient-to-l from-primary/30 to-transparent transform skew-y-12 origin-right translate-y-32" />
      
      {/* Content */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-4xl ml-0 md:ml-12">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                currentSlide === index
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-4"
              }`}
              style={{ display: currentSlide === index ? "block" : "none" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-white mb-6 leading-tight">
                {slide.title.split(' ').map((word, i) => (
                  <span key={i} className="inline-block animate-fade-down" style={{ animationDelay: `${i * 0.1}s` }}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl animate-fade-up" 
                 style={{ animationDelay: '0.6s' }}>
                {slide.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows con hover effects más sofisticados */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-accent transition-all duration-300 hover:scale-110 z-20"
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 text-white hover:bg-accent transition-all duration-300 hover:scale-110 z-20"
        aria-label="Siguiente diapositiva"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots navigation con mejor diseño */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
