# Configuración MongoDB Atlas

## Paso 1: Crear cuenta y clúster
1. Visita [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) y regístrate o inicia sesión.
2. Crea un nuevo proyecto llamado "estudio-ecen".
3. Crea un clúster gratuito (shared tier):
   - Selecciona el proveedor (AWS, Google Cloud o Azure)
   - Elige la región más cercana a tus usuarios (probablemente en Sudamérica)
   - Mantén la configuración por defecto para el nivel gratuito

## Paso 2: Configurar acceso a la base de datos
1. En la sección "Database Access", crea un nuevo usuario para la base de datos:
   - User: estudio_ecen_admin
   - Password: [Genera una contraseña segura y guárdala]
   - Permisos: Read and Write to any database

2. En la sección "Network Access", configura el acceso a la red:
   - Opción 1 (desarrollo): Añade tu IP actual
   - Opción 2 (producción): Permite acceso desde cualquier lugar (0.0.0.0/0) o específica la IP del servidor de Render/Railway/Heroku

## Paso 3: Obtener string de conexión
1. Vuelve al Dashboard de Clusters y haz clic en "Connect"
2. Elige "Connect your application"
3. Selecciona "Node.js" como driver y la versión más reciente
4. Copia el string de conexión. Será algo como:
   ```
   mongodb+srv://estudio_ecen_admin:<password>@cluster0.xxxxx.mongodb.net/estudio-ecen?retryWrites=true&w=majority
   ```
5. Reemplaza `<password>` con la contraseña que creaste

Este string de conexión lo utilizarás en las variables de entorno de tu aplicación desplegada.