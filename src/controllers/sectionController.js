const Section = require('../models/Section');

// Obtener todas las secciones
exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find().sort({ createdAt: 1 });
    res.json(sections);
  } catch (error) {
    console.error('Error al obtener secciones:', error);
    res.status(500).json({ 
      message: 'Error al obtener las secciones',
      error: error.message 
    });
  }
};

// Obtener una sección por ID
exports.getSectionById = async (req, res) => {
  try {
    const section = await Section.findOne({ id: req.params.id });
    
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }
    
    res.json(section);
  } catch (error) {
    console.error('Error al obtener sección:', error);
    res.status(500).json({ 
      message: 'Error al obtener la sección',
      error: error.message 
    });
  }
};

// Crear nueva sección
exports.createSection = async (req, res) => {
  try {
    const { id, title, description, icon, link, items } = req.body;

    // Validar campos requeridos
    if (!id || !title || !description || !icon) {
      return res.status(400).json({ 
        message: 'Faltan campos requeridos: id, title, description, icon' 
      });
    }

    // Verificar si ya existe una sección con ese ID
    const existingSection = await Section.findOne({ id });
    if (existingSection) {
      return res.status(409).json({ 
        message: 'Ya existe una sección con ese ID' 
      });
    }

    const newSection = new Section({
      id,
      title,
      description,
      icon,
      link: link || '',
      items: items || []
    });

    const savedSection = await newSection.save();
    res.status(201).json(savedSection);
  } catch (error) {
    console.error('Error al crear sección:', error);
    res.status(500).json({ 
      message: 'Error al crear la sección',
      error: error.message 
    });
  }
};

// Actualizar sección
exports.updateSection = async (req, res) => {
  try {
    const { title, description, icon, link } = req.body;
    
    const section = await Section.findOne({ id: req.params.id });
    
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }

    // Actualizar solo los campos proporcionados
    if (title !== undefined) section.title = title;
    if (description !== undefined) section.description = description;
    if (icon !== undefined) section.icon = icon;
    if (link !== undefined) section.link = link;

    const updatedSection = await section.save();
    res.json(updatedSection);
  } catch (error) {
    console.error('Error al actualizar sección:', error);
    res.status(500).json({ 
      message: 'Error al actualizar la sección',
      error: error.message 
    });
  }
};

// Eliminar sección
exports.deleteSection = async (req, res) => {
  try {
    const section = await Section.findOneAndDelete({ id: req.params.id });
    
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }
    
    res.json({ message: 'Sección eliminada exitosamente', section });
  } catch (error) {
    console.error('Error al eliminar sección:', error);
    res.status(500).json({ 
      message: 'Error al eliminar la sección',
      error: error.message 
    });
  }
};

// Agregar item a una sección
exports.addItemToSection = async (req, res) => {
  try {
    const { id, title, description, link } = req.body;

    // Validar campos requeridos
    if (!id || !title || !description) {
      return res.status(400).json({ 
        message: 'Faltan campos requeridos: id, title, description' 
      });
    }

    const section = await Section.findOne({ id: req.params.sectionId });
    
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }

    // Verificar si ya existe un item con ese ID
    const existingItem = section.items.find(item => item.id === id);
    if (existingItem) {
      return res.status(409).json({ 
        message: 'Ya existe un item con ese ID en esta sección' 
      });
    }

    const newItem = {
      id,
      title,
      description,
      link: link || ''
    };

    section.items.push(newItem);
    const updatedSection = await section.save();
    
    res.status(201).json(updatedSection);
  } catch (error) {
    console.error('Error al agregar item:', error);
    res.status(500).json({ 
      message: 'Error al agregar el item',
      error: error.message 
    });
  }
};

// Actualizar item de una sección
exports.updateItemInSection = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    
    const section = await Section.findOne({ id: req.params.sectionId });
    
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }

    const item = section.items.find(item => item.id === req.params.itemId);
    
    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }

    // Actualizar solo los campos proporcionados
    if (title !== undefined) item.title = title;
    if (description !== undefined) item.description = description;
    if (link !== undefined) item.link = link;

    const updatedSection = await section.save();
    res.json(updatedSection);
  } catch (error) {
    console.error('Error al actualizar item:', error);
    res.status(500).json({ 
      message: 'Error al actualizar el item',
      error: error.message 
    });
  }
};

// Eliminar item de una sección
exports.deleteItemFromSection = async (req, res) => {
  try {
    const section = await Section.findOne({ id: req.params.sectionId });
    
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }

    const itemIndex = section.items.findIndex(item => item.id === req.params.itemId);
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }

    const deletedItem = section.items[itemIndex];
    section.items.splice(itemIndex, 1);
    
    const updatedSection = await section.save();
    
    res.json({ 
      message: 'Item eliminado exitosamente', 
      deletedItem,
      section: updatedSection 
    });
  } catch (error) {
    console.error('Error al eliminar item:', error);
    res.status(500).json({ 
      message: 'Error al eliminar el item',
      error: error.message 
    });
  }
};
