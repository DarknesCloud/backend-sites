require('dotenv').config();
const mongoose = require('mongoose');
const Section = require('../models/Section');

const sectionsData = [
  {
    id: 'sweepstouch',
    title: 'SweepsTouch',
    description: 'Plataforma principal de concursos y sorteos',
    icon: 'business',
    link: '',
    items: [
      {
        id: 'sitio-web-principal',
        title: 'Sitio Web Principal',
        description: 'Portal principal de la plataforma',
        link: '',
      },
      {
        id: 'panel-control',
        title: 'Panel de Control',
        description: 'Administración centralizada',
        link: '',
      },
      {
        id: 'merchant',
        title: 'Merchant',
        description: 'Área de comerciantes',
        link: '',
      },
    ],
  },
  {
    id: 'jobs',
    title: 'Jobs',
    description: 'Portal de empleos y oportunidades',
    icon: 'work',
    link: '',
    items: [
      {
        id: 'busqueda-empleos',
        title: 'Búsqueda de Empleos',
        description: 'Encuentra oportunidades laborales',
        link: '',
      },
      {
        id: 'publicar-ofertas',
        title: 'Publicar Ofertas',
        description: 'Publica ofertas de trabajo',
        link: '',
      },
    ],
  },
  {
    id: 'programa-impulsadoras',
    title: 'Programa de impulsadoras',
    description: 'Portal de empleos y oportunidades laborales',
    icon: 'person',
    link: '',
    items: [
      {
        id: 'registro-impulsadoras',
        title: 'Registro de Impulsadoras',
        description: 'Únete al programa',
        link: '',
      },
      {
        id: 'capacitacion',
        title: 'Capacitación',
        description: 'Programas de entrenamiento',
        link: '',
      },
    ],
  },
  {
    id: 'kiosko',
    title: 'Kiosko',
    description: 'Marketplace digital y tienda online',
    icon: 'storefront',
    link: '',
    items: [
      {
        id: 'productos-digitales',
        title: 'Productos Digitales',
        description: 'Catálogo de productos',
        link: '',
      },
      {
        id: 'gestion-inventario',
        title: 'Gestión de Inventario',
        description: 'Control de stock',
        link: '',
      },
    ],
  },
  {
    id: 'work-sweepstouch',
    title: 'Work Sweepstouch',
    description: 'Plataforma de trabajo y colaboración',
    icon: 'work',
    link: '',
    items: [
      {
        id: 'proyectos',
        title: 'Proyectos',
        description: 'Gestión de proyectos',
        link: '',
      },
      {
        id: 'equipos',
        title: 'Equipos',
        description: 'Colaboración en equipo',
        link: '',
      },
    ],
  },
  {
    id: 'panel',
    title: 'Panel',
    description: 'Panel de administración general',
    icon: 'dashboard',
    link: '',
    items: [
      {
        id: 'analytics',
        title: 'Analytics',
        description: 'Métricas y estadísticas',
        link: '',
      },
      {
        id: 'configuracion',
        title: 'Configuración',
        description: 'Ajustes del sistema',
        link: '',
      },
    ],
  },
  {
    id: 'modulos-usuario',
    title: 'Módulos de Usuario',
    description: 'Sistema de autenticación unificado',
    icon: 'person',
    link: '',
    items: [
      {
        id: 'perfil-usuario',
        title: 'Perfil de Usuario',
        description: 'Gestión de perfil',
        link: '',
      },
      {
        id: 'configuracion-usuario',
        title: 'Configuración',
        description: 'Preferencias personales',
        link: '',
      },
    ],
  },
  {
    id: 'giveaway',
    title: 'Giveaway',
    description: 'Herramientas para sorteos y concursos',
    icon: 'gift',
    link: '',
    items: [
      {
        id: 'crear-sorteo',
        title: 'Crear Sorteo',
        description: 'Configura nuevos sorteos',
        link: '',
      },
      {
        id: 'gestionar-participantes',
        title: 'Gestionar Participantes',
        description: 'Administra participantes',
        link: '',
      },
    ],
  },
  {
    id: 'sweepstakes',
    title: 'Sweepstakes',
    description: 'Herramientas para sorteos y concursos',
    icon: 'gift',
    link: '',
    items: [
      {
        id: 'sorteos-activos',
        title: 'Sorteos Activos',
        description: 'Sorteos en curso',
        link: '',
      },
      {
        id: 'historial',
        title: 'Historial',
        description: 'Sorteos anteriores',
        link: '',
      },
    ],
  },
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');
    
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Conectado a MongoDB');

    // Limpiar colección existente
    await Section.deleteMany({});
    console.log('🗑️  Colección limpiada');

    // Insertar datos iniciales
    const sections = await Section.insertMany(sectionsData);
    console.log(`✅ ${sections.length} secciones insertadas exitosamente`);

    // Mostrar resumen
    sections.forEach(section => {
      console.log(`   - ${section.title} (${section.items.length} items)`);
    });

    console.log('\n🎉 Seed completado exitosamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  }
};

seedDatabase();
