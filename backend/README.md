# Estudio ECEN - Backend

Backend API para el sitio web de Estudio ECEN. Esta API proporciona endpoints para manejar:
- Miembros del equipo
- Publicaciones
- Áreas de práctica
- Formularios de contacto

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB (con Mongoose)
- TypeScript
- Express Validator

## Requisitos previos

- Node.js (versión 16 o superior)
- MongoDB (local o remoto)

## Instalación

1. Clona este repositorio
2. Navega a la carpeta del backend: `cd backend`
3. Instala las dependencias: `npm install`
4. Crea un archivo `.env` basado en el archivo `.env.example`
5. Inicia el servidor de desarrollo: `npm run dev`

## Variables de entorno

Para ejecutar este proyecto, necesitarás añadir las siguientes variables de entorno a tu archivo `.env`:

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/estudio-ecen
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_secret_key_change_in_production
```

## Estructura del proyecto

```
backend/
├── src/                      # Código fuente
│   ├── config/               # Configuración
│   ├── controllers/          # Controladores
│   ├── middleware/           # Middleware personalizado
│   ├── models/               # Modelos de Mongoose
│   ├── routes/               # Definiciones de rutas
│   ├── services/             # Servicios
│   ├── utils/                # Utilidades
│   └── index.ts              # Punto de entrada
├── tests/                    # Pruebas
├── .env                      # Variables de entorno
├── .gitignore                # Archivos ignorados por Git
├── package.json              # Dependencias y scripts
├── tsconfig.json             # Configuración de TypeScript
└── README.md                 # Esta documentación
```

## API Endpoints

### Miembros del equipo
- `GET /api/team` - Obtener todos los miembros del equipo
- `GET /api/team/:id` - Obtener un miembro del equipo por ID
- `POST /api/team` - Crear un nuevo miembro del equipo
- `PATCH /api/team/:id` - Actualizar un miembro del equipo
- `DELETE /api/team/:id` - Eliminar un miembro del equipo

### Publicaciones
- `GET /api/publications` - Obtener todas las publicaciones
- `GET /api/publications/:id` - Obtener una publicación por ID o slug
- `POST /api/publications` - Crear una nueva publicación
- `PATCH /api/publications/:id` - Actualizar una publicación
- `DELETE /api/publications/:id` - Eliminar una publicación

### Áreas
- `GET /api/areas` - Obtener todas las áreas
- `GET /api/areas/:id` - Obtener un área por ID
- `POST /api/areas` - Crear una nueva área
- `PATCH /api/areas/:id` - Actualizar un área
- `DELETE /api/areas/:id` - Eliminar un área

### Contacto
- `POST /api/contact` - Enviar un formulario de contacto
- `GET /api/contact` - Obtener todos los mensajes de contacto (protegido)
- `GET /api/contact/:id` - Obtener un mensaje de contacto por ID (protegido)
- `PATCH /api/contact/:id/status` - Actualizar el estado de un mensaje (protegido)
- `DELETE /api/contact/:id` - Eliminar un mensaje de contacto (protegido)

## Scripts

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Inicia el servidor de producción
- `npm test` - Ejecuta las pruebas
- `npm run lint` - Ejecuta el linter

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)