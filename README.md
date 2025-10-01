# SweepsTouch Backend API

API REST desarrollada con Node.js, Express y MongoDB para gestionar secciones e items de la aplicación SweepsTouch.

## 📋 Requisitos Previos

- Node.js 14+ instalado
- MongoDB instalado localmente o acceso a MongoDB Atlas
- npm o yarn

## 🚀 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
```

3. Editar el archivo `.env` con tus configuraciones:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sweepstouch
ALLOWED_ORIGINS=http://localhost:3000
```

## 🗄️ Base de Datos

### Inicializar con datos de prueba (Seed)

Para poblar la base de datos con datos iniciales:

```bash
npm run seed
```

Este comando insertará las 9 secciones predefinidas con sus respectivos items.

## 🏃 Ejecución

### Modo desarrollo (con auto-reload):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 📚 Endpoints de la API

### Secciones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/sections` | Obtener todas las secciones |
| GET | `/api/sections/:id` | Obtener una sección específica |
| POST | `/api/sections` | Crear nueva sección |
| PUT | `/api/sections/:id` | Actualizar sección |
| DELETE | `/api/sections/:id` | Eliminar sección |

### Items

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/sections/:sectionId/items` | Agregar item a sección |
| PUT | `/api/sections/:sectionId/items/:itemId` | Actualizar item |
| DELETE | `/api/sections/:sectionId/items/:itemId` | Eliminar item |

### Salud del Sistema

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Verificar estado del servidor |

## 📝 Ejemplos de Uso

### Obtener todas las secciones
```bash
curl http://localhost:5000/api/sections
```

### Crear nueva sección
```bash
curl -X POST http://localhost:5000/api/sections \
  -H "Content-Type: application/json" \
  -d '{
    "id": "nueva-seccion",
    "title": "Nueva Sección",
    "description": "Descripción de la sección",
    "icon": "web",
    "link": "",
    "items": []
  }'
```

### Actualizar sección
```bash
curl -X PUT http://localhost:5000/api/sections/nueva-seccion \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Sección Actualizada",
    "description": "Nueva descripción"
  }'
```

### Agregar item a sección
```bash
curl -X POST http://localhost:5000/api/sections/nueva-seccion/items \
  -H "Content-Type: application/json" \
  -d '{
    "id": "nuevo-item",
    "title": "Nuevo Item",
    "description": "Descripción del item",
    "link": "https://example.com"
  }'
```

### Eliminar sección
```bash
curl -X DELETE http://localhost:5000/api/sections/nueva-seccion
```

## 🏗️ Estructura del Proyecto

```
sweepstouch-backend/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de MongoDB
│   ├── controllers/
│   │   └── sectionController.js # Lógica de negocio
│   ├── middleware/
│   │   └── errorHandler.js      # Manejo de errores
│   ├── models/
│   │   └── Section.js           # Modelo de datos
│   ├── routes/
│   │   └── sectionRoutes.js     # Definición de rutas
│   ├── utils/
│   │   └── seed.js              # Script de inicialización
│   └── index.js                 # Punto de entrada
├── .env.example                 # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Configuración de MongoDB

### Opción 1: MongoDB Local

Instalar MongoDB localmente y usar:
```env
MONGODB_URI=mongodb://localhost:27017/sweepstouch
```

### Opción 2: MongoDB Atlas (Cloud)

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster gratuito
3. Obtener la cadena de conexión
4. Configurar en `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweepstouch?retryWrites=true&w=majority
```

## 🌐 Despliegue

### Variables de entorno para producción

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=tu_mongodb_uri_de_produccion
ALLOWED_ORIGINS=https://tu-dominio.com
```

### Plataformas recomendadas

- **Render**: Fácil despliegue con MongoDB Atlas
- **Railway**: Soporte nativo para Node.js y MongoDB
- **Heroku**: Con addon de MongoDB
- **DigitalOcean App Platform**: Despliegue directo desde GitHub

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express**: Framework web
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **CORS**: Manejo de políticas de origen cruzado
- **Morgan**: Logger de peticiones HTTP
- **dotenv**: Gestión de variables de entorno

## 📄 Licencia

ISC
