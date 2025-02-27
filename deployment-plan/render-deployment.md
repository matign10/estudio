# Despliegue del Backend en Render

## Paso 1: Preparar el proyecto para producción

1. Cambia a Node.js v18 (LTS) para mejor compatibilidad:
   ```bash
   # Actualiza el backend/package.json para especificar Node.js v18
   ```

2. Asegúrate de que el script de compilación esté configurado:
   - El script `build` en package.json debe estar definido como `tsc`
   - El script `start` debe ejecutar `node dist/index.js`
   - Ambos están correctamente configurados en tu proyecto

3. Crea un archivo `render.yaml` en la raíz del proyecto para simplificar el despliegue:

```yaml
services:
  - type: web
    name: estudio-ecen-api
    env: node
    buildCommand: cd backend && npm install && npm run build
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGO_URI
        sync: false
      - key: PORT
        value: 10000
      - key: JWT_SECRET
        sync: false
      - key: CORS_ORIGIN
        value: "https://estudio-ecen.onrender.com"  # Cambiar por la URL de tu frontend
```

## Paso 2: Crear una cuenta en Render

1. Regístrate o inicia sesión en [Render](https://render.com/).
2. Conecta tu cuenta de GitHub o GitLab donde esté alojado tu proyecto.

## Paso 3: Desplegar el servicio Web

1. Desde el Dashboard de Render, haz clic en "New +" y selecciona "Web Service".
2. Elige el repositorio de tu proyecto.
3. Configura el servicio:
   - Nombre: estudio-ecen-api
   - Root Directory: backend
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. Configura las variables de entorno:
   - NODE_ENV: production
   - MONGO_URI: [String de conexión de MongoDB Atlas]
   - PORT: 10000 (Render asignará automáticamente un puerto)
   - JWT_SECRET: [Genera una cadena segura aleatoria]
   - CORS_ORIGIN: URL de tu frontend (opcional si es desde el mismo dominio)

5. Elige el plan gratuito para empezar.
6. Haz clic en "Create Web Service".

## Paso 4: Verificar el despliegue

1. Render desplegará automáticamente tu servicio. Puedes ver los logs para asegurarte de que todo esté funcionando correctamente.
2. Una vez que el despliegue esté completo, Render proporcionará una URL para tu servicio (algo como `https://estudio-ecen-api.onrender.com`).
3. Prueba la URL añadiendo `/health` al final para verificar que la API esté funcionando: `https://estudio-ecen-api.onrender.com/health`

## Consideraciones adicionales

- **Optimización para el plan gratuito**: Render suspende los servicios gratuitos después de 15 minutos de inactividad. La primera solicitud después de un periodo de inactividad tomará más tiempo.
- **Auto-deploy**: Por defecto, Render despliega automáticamente cada vez que se hace un push a la rama principal de tu repositorio.
- **Logs**: Render proporciona logs en tiempo real que puedes ver en el dashboard para depurar problemas.