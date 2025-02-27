# Mejora y Despliegue del Frontend

## Parte 1: Mejoras al Frontend Actual

El frontend actual es una página HTML simple que podemos mejorar con las siguientes adiciones:

### 1. Mejoras en el Diseño

1. **Agregar un sistema de diseño más moderno**:
   - Implementar Bootstrap, Tailwind CSS o incluso Material Design Lite para un mejor aspecto visual
   - Mejorar la responsividad para dispositivos móviles

2. **Mejorar la navegación**:
   - Agregar una barra de navegación fija
   - Implementar un menú para móviles
   - Agregar un pie de página con información de contacto y enlaces legales

3. **Recursos visuales**:
   - Incorporar imágenes de stock o personalizadas para representar un bufete de abogados
   - Añadir iconos para las áreas de práctica
   - Incluir un logotipo para el estudio (puede ser un texto estilizado temporalmente)

### 2. Mejoras en la Funcionalidad

1. **Formulario de contacto mejorado**:
   - Validación de formularios en el lado del cliente
   - Mensaje de carga durante el envío
   - Feedback más detallado después del envío

2. **Características adicionales**:
   - Sección de FAQ (preguntas frecuentes)
   - Testimonios de clientes
   - Sección de artículos recientes o novedades jurídicas

### 3. Ejemplo de Código para Bootstrap

Actualización de la página actual usando Bootstrap:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estudio ECEN - Asesoría Legal</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        .hero-section {
            padding: 5rem 0;
            background-color: #f8f9fa;
        }
        .section {
            padding: 4rem 0;
        }
        .team-card {
            transition: transform 0.3s;
        }
        .team-card:hover {
            transform: translateY(-5px);
        }
        footer {
            background-color: #343a40;
            color: white;
            padding: 2rem 0;
        }
    </style>
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div class="container">
            <a class="navbar-brand" href="#">ESTUDIO ECEN</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#inicio">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#nosotros">Nosotros</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#areas">Áreas de Práctica</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#contacto">Contacto</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="inicio" class="hero-section">
        <div class="container text-center">
            <h1 class="display-4 mb-4">Asesoría Legal Especializada</h1>
            <p class="lead mb-5">Brindamos soluciones legales eficientes y personalizadas para proteger sus intereses.</p>
            <a href="#contacto" class="btn btn-primary btn-lg">Contáctenos</a>
        </div>
    </section>

    <!-- Team Section -->
    <section id="nosotros" class="section bg-light">
        <div class="container">
            <h2 class="text-center mb-5">Nuestro Equipo</h2>
            <div class="row" id="team-container">
                <!-- Team members will load here -->
                <p class="text-center">Haga clic en el botón para cargar nuestro equipo de profesionales.</p>
            </div>
            <div class="text-center mt-4">
                <button id="load-team" class="btn btn-outline-primary">Ver Nuestro Equipo</button>
            </div>
        </div>
    </section>

    <!-- Practice Areas Section -->
    <section id="areas" class="section">
        <div class="container">
            <h2 class="text-center mb-5">Áreas de Práctica</h2>
            <div class="row" id="areas-container">
                <!-- Practice areas will load here -->
                <p class="text-center">Haga clic en el botón para ver nuestras áreas de especialización.</p>
            </div>
            <div class="text-center mt-4">
                <button id="load-areas" class="btn btn-outline-primary">Ver Áreas de Práctica</button>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contacto" class="section bg-light">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <h2 class="text-center mb-5">Contáctenos</h2>
                    <div class="card shadow">
                        <div class="card-body p-4">
                            <form id="contact-form">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Nombre</label>
                                    <input type="text" class="form-control" id="name" name="name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" name="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="phone" class="form-label">Teléfono</label>
                                    <input type="tel" class="form-control" id="phone" name="phone">
                                </div>
                                <div class="mb-4">
                                    <label for="message" class="form-label">Mensaje</label>
                                    <textarea class="form-control" id="message" name="message" rows="4" required></textarea>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                                </div>
                                <div id="form-message" class="mt-3"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="mt-5">
        <div class="container">
            <div class="row">
                <div class="col-md-4 mb-4 mb-md-0">
                    <h5>Estudio ECEN</h5>
                    <p>Asesoría legal especializada con más de 10 años de experiencia en el sector.</p>
                </div>
                <div class="col-md-4 mb-4 mb-md-0">
                    <h5>Contacto</h5>
                    <p><i class="bi bi-geo-alt"></i> Av. Principal 123, Ciudad</p>
                    <p><i class="bi bi-telephone"></i> +123 456 7890</p>
                    <p><i class="bi bi-envelope"></i> info@estudioecen.com</p>
                </div>
                <div class="col-md-4">
                    <h5>Síguenos</h5>
                    <div class="d-flex gap-3 fs-4">
                        <a href="#" class="text-white"><i class="bi bi-facebook"></i></a>
                        <a href="#" class="text-white"><i class="bi bi-twitter"></i></a>
                        <a href="#" class="text-white"><i class="bi bi-linkedin"></i></a>
                    </div>
                </div>
            </div>
            <hr class="my-4 bg-light">
            <div class="text-center">
                <p class="mb-0">© 2023 Estudio ECEN. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // API base URL - Este es un ejemplo, se debe actualizar en función del despliegue
        const API_URL = 'https://estudio-ecen-api.onrender.com/api';

        // Function to load team members
        document.getElementById('load-team').addEventListener('click', async () => {
            try {
                const response = await fetch(`${API_URL}/team`);
                const data = await response.json();
                
                const teamContainer = document.getElementById('team-container');
                teamContainer.innerHTML = '';
                
                if (data.data && data.data.length > 0) {
                    data.data.forEach(member => {
                        const memberElement = document.createElement('div');
                        memberElement.className = 'col-md-4 mb-4';
                        memberElement.innerHTML = `
                            <div class="card team-card h-100 shadow-sm">
                                <div class="card-body text-center">
                                    <h4 class="card-title">${member.name}</h4>
                                    <p class="text-muted">${member.position}</p>
                                    <p class="card-text">${member.bio}</p>
                                </div>
                            </div>
                        `;
                        teamContainer.appendChild(memberElement);
                    });
                } else {
                    // Load sample data if API returns empty
                    const sampleMembers = [
                        {
                            name: "Dr. Carlos Martínez",
                            position: "Socio Director - Especialista en Derecho Penal",
                            bio: "Licenciado en Derecho por la Universidad Nacional, con Maestría en Derecho Penal."
                        },
                        {
                            name: "Dra. Elena Torres",
                            position: "Socia - Especialista en Derecho Civil",
                            bio: "Doctora en Derecho por la Universidad Central. Su práctica se centra en litigios civiles complejos."
                        },
                        {
                            name: "Dr. Javier Mendoza",
                            position: "Socio - Especialista en Derecho Laboral",
                            bio: "Abogado con más de 15 años de experiencia en asuntos laborales y de seguridad social."
                        }
                    ];
                    
                    sampleMembers.forEach(member => {
                        const memberElement = document.createElement('div');
                        memberElement.className = 'col-md-4 mb-4';
                        memberElement.innerHTML = `
                            <div class="card team-card h-100 shadow-sm">
                                <div class="card-body text-center">
                                    <h4 class="card-title">${member.name}</h4>
                                    <p class="text-muted">${member.position}</p>
                                    <p class="card-text">${member.bio}</p>
                                </div>
                            </div>
                        `;
                        teamContainer.appendChild(memberElement);
                    });
                }
            } catch (error) {
                console.error('Error fetching team members:', error);
                document.getElementById('team-container').innerHTML = 
                    '<div class="col-12 alert alert-danger">Error al cargar el equipo. Verifica que el backend esté funcionando.</div>';
            }
        });

        // Function to load practice areas
        document.getElementById('load-areas').addEventListener('click', async () => {
            try {
                const response = await fetch(`${API_URL}/areas`);
                const data = await response.json();
                
                const areasContainer = document.getElementById('areas-container');
                areasContainer.innerHTML = '';
                
                if (data.data && data.data.length > 0) {
                    data.data.forEach(area => {
                        const areaElement = document.createElement('div');
                        areaElement.className = 'col-md-4 mb-4';
                        areaElement.innerHTML = `
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h4 class="card-title">${area.title}</h4>
                                    <p class="card-text">${area.description}</p>
                                </div>
                            </div>
                        `;
                        areasContainer.appendChild(areaElement);
                    });
                } else {
                    // Load sample data if API returns empty
                    const sampleAreas = [
                        {
                            title: "Derecho Penal",
                            description: "Defensa penal, compliance y asesoramiento en procesos penales para personas físicas y jurídicas."
                        },
                        {
                            title: "Derecho Civil",
                            description: "Asesoramiento en contratos, responsabilidad civil, sucesiones y derecho de familia."
                        },
                        {
                            title: "Derecho Laboral",
                            description: "Relaciones laborales, convenios colectivos, despidos y seguridad social."
                        },
                        {
                            title: "Derecho Mercantil",
                            description: "Constitución de sociedades, fusiones, adquisiciones y asesoramiento empresarial."
                        },
                        {
                            title: "Derecho Administrativo",
                            description: "Recursos administrativos, contratación pública y relaciones con la administración."
                        },
                        {
                            title: "Arbitraje y Mediación",
                            description: "Resolución alternativa de conflictos mediante procesos eficientes y especializados."
                        }
                    ];
                    
                    sampleAreas.forEach(area => {
                        const areaElement = document.createElement('div');
                        areaElement.className = 'col-md-4 mb-4';
                        areaElement.innerHTML = `
                            <div class="card h-100 shadow-sm">
                                <div class="card-body">
                                    <h4 class="card-title">${area.title}</h4>
                                    <p class="card-text">${area.description}</p>
                                </div>
                            </div>
                        `;
                        areasContainer.appendChild(areaElement);
                    });
                }
            } catch (error) {
                console.error('Error fetching areas:', error);
                document.getElementById('areas-container').innerHTML = 
                    '<div class="col-12 alert alert-danger">Error al cargar las áreas. Verifica que el backend esté funcionando.</div>';
            }
        });

        // Function to submit contact form
        document.getElementById('contact-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formMessage = document.getElementById('form-message');
            formMessage.innerHTML = '<div class="alert alert-info">Enviando mensaje...</div>';
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            try {
                const response = await fetch(`${API_URL}/contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    formMessage.innerHTML = '<div class="alert alert-success">Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.</div>';
                    document.getElementById('contact-form').reset();
                } else {
                    formMessage.innerHTML = `<div class="alert alert-danger">Error: ${data.message || 'Error al enviar el mensaje'}</div>`;
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formMessage.innerHTML = '<div class="alert alert-danger">Error al conectar con el servidor. Verifica que el backend esté funcionando.</div>';
            }
        });
    </script>
</body>
</html>
```

## Parte 2: Despliegue del Frontend en Render

Render también es excelente para desplegar frontends estáticos:

1. **Preparar los archivos estáticos**:
   - Asegúrate de que todos los archivos del frontend mejorado estén en una carpeta (como `/simple-frontend`).
   - Actualiza la URL de la API en el frontend para apuntar a tu backend desplegado.

2. **Desplegar como Static Site**:
   - En el Dashboard de Render, haz clic en "New +" y selecciona "Static Site".
   - Conecta con tu repositorio de GitHub/GitLab.
   - Configura el servicio:
     - Nombre: estudio-ecen
     - Root Directory: `simple-frontend` (o la carpeta donde está tu frontend)
     - Build Command: Déjalo en blanco si es HTML puro. Si usas un framework, añade el comando de build correspondiente.
     - Publish Directory: `.` (o la carpeta donde se genera el sitio tras el build)

3. **Verificar el despliegue**:
   - Render proporcionará una URL para tu sitio (como `https://estudio-ecen.onrender.com`).
   - Visita la URL para verificar que todo funcione correctamente.

## Parte 3: Dominio Personalizado (Opcional)

Si tienes un dominio personalizado:

1. **Configurar el dominio en Render**:
   - En la configuración de tu sitio estático, ve a la sección "Custom Domain".
   - Haz clic en "Add Custom Domain" e ingresa tu dominio.
   - Sigue las instrucciones para configurar los registros DNS con tu proveedor de dominio.

2. **Configurar SSL**:
   - Render proporciona certificados SSL gratuitos a través de Let's Encrypt.
   - Una vez configurados los registros DNS, el certificado se generará automáticamente.