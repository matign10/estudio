# Medidas de Seguridad para la Aplicación en Producción

## 1. Configuración de Variables de Entorno

### Secretos y Credenciales
1. **JWT Secret**: Genera un secreto fuerte para los tokens JWT:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Guarda este valor en las variables de entorno como `JWT_SECRET`.

2. **MongoDB URI**: Nunca expongas las credenciales de la base de datos en el código. 
   Usa la variable de entorno `MONGO_URI` con un usuario específico para la aplicación con permisos limitados.

3. **Rotación de Secretos**: Establece un proceso para rotar las claves secretas periódicamente.

## 2. Seguridad de la API

### Implementación de Rate Limiting

Instala y configura el middleware `express-rate-limit` para prevenir ataques de fuerza bruta:

```bash
npm install express-rate-limit --save
```

Implementación en `src/index.ts`:

```typescript
import rateLimit from 'express-rate-limit';

// Limita las solicitudes a 100 por 15 minutos por IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 solicitudes por ventana
  standardHeaders: true, // devuelve información de límite en los headers `RateLimit-*`
  message: {
    status: 'error',
    message: 'Demasiadas solicitudes, por favor intente nuevamente más tarde.'
  }
});

// Aplicar a todas las rutas API
app.use('/api', apiLimiter);
```

### Implementación de Helmet para Headers HTTP Seguros

Instala y configura `helmet` para agregar encabezados HTTP seguros:

```bash
npm install helmet --save
```

Implementación en `src/index.ts`:

```typescript
import helmet from 'helmet';

// Aplicar headers de seguridad
app.use(helmet());
```

## 3. Validación de Datos

### Implementación de Sanitización de Entrada

Mejora la validación de entrada usando `express-validator` (que ya está instalado):

Ejemplo para rutas de contacto en `src/routes/contactRoutes.ts`:

```typescript
import { body, validationResult } from 'express-validator';

router.post(
  '/', 
  [
    body('name').trim().notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
    body('message').trim().notEmpty().withMessage('El mensaje es requerido'),
    body('phone').optional().trim()
  ],
  (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Datos de entrada inválidos',
        errors: errors.array() 
      });
    }
    
    // Continuar con el procesamiento
  }
);
```

## 4. CORS Configuración

Asegúrate de que CORS esté correctamente configurado para permitir solo a los orígenes necesarios:

```typescript
// En src/index.ts
import cors from 'cors';

// Configuración específica de CORS
const corsOptions = {
  origin: config.corsOrigin,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
```

## 5. Monitoreo y Logging

### Implementación de Logging Mejorado

Instala `winston` para un mejor registro de eventos:

```bash
npm install winston --save
```

Crea un módulo de logging en `src/utils/logger.ts`:

```typescript
import winston from 'winston';
import { config } from '../config/config';

const logger = winston.createLogger({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    // En producción, podrías querer agregar transporte a archivo
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' })
  ]
});

export default logger;
```

Usa este logger en lugar de console.log para un mejor seguimiento:

```typescript
import logger from './utils/logger';

// En vez de:
// console.error('MongoDB connection error:', error);

// Usa:
logger.error('MongoDB connection error:', { error: error.message, stack: error.stack });
```

## 6. Seguridad en MongoDB

### Validación de Esquemas en MongoDB

Asegúrate de que todos los modelos de Mongoose tengan validación adecuada:

```typescript
const ContactSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100 
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un email válido']
  },
  // ...
});
```

## 7. Consideraciones Adicionales

### Backup Regular

Configura copias de seguridad regulares de tu base de datos MongoDB Atlas:

1. Utiliza la característica incorporada de backup de MongoDB Atlas.
2. Configura alertas para notificarte si los backups fallan.

### Actualizaciones de Dependencias

Mantén todas las dependencias actualizadas para evitar vulnerabilidades de seguridad:

```bash
npm audit
npm update
```

Considera usar herramientas como Dependabot para mantener las dependencias actualizadas automáticamente.

### SSL/TLS

Asegúrate de que toda la comunicación sea a través de HTTPS. Render proporciona SSL/TLS automáticamente para todos los dominios.

### Preparación para Problemas

Crear un plan de incidentes para problemas de seguridad:
1. Documentar los pasos para mitigar brechas de seguridad
2. Tener un proceso de comunicación claro
3. Mantener una lista de contactos para emergencias