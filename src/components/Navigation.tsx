
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Nosotros", href: "#nosotros" },
    { name: "Áreas de Práctica", href: "#areas" },
    { name: "Profesionales", href: "#profesionales" },
    { name: "Publicaciones", href: "#publicaciones" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-playfair font-bold text-primary tracking-wider hover:text-accent transition-colors">
              ECEN
            </a>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-secondary hover:text-accent transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
            <div className="border-l border-gray-200 pl-6 ml-2 flex items-center space-x-2">
              <button className="text-secondary hover:text-accent font-medium">ES</button>
              <span className="text-gray-300">|</span>
              <button className="text-gray-400 hover:text-accent font-medium">EN</button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-accent hover:bg-muted transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-secondary hover:text-accent transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex space-x-4 px-3 py-2">
              <button className="text-secondary hover:text-accent font-medium">ES</button>
              <span className="text-gray-300">|</span>
              <button className="text-gray-400 hover:text-accent font-medium">EN</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
