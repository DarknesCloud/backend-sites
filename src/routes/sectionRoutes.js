const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');

// Rutas de secciones
router.get('/', sectionController.getAllSections);
router.get('/:id', sectionController.getSectionById);
router.post('/', sectionController.createSection);
router.put('/:id', sectionController.updateSection);
router.delete('/:id', sectionController.deleteSection);

// Rutas de items dentro de secciones
router.post('/:sectionId/items', sectionController.addItemToSection);
router.put('/:sectionId/items/:itemId', sectionController.updateItemInSection);
router.delete('/:sectionId/items/:itemId', sectionController.deleteItemFromSection);

module.exports = router;
