const mongoose = require('mongoose');

const SectionItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    default: '',
    trim: true
  }
}, { _id: false });

const SectionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  link: {
    type: String,
    default: '',
    trim: true
  },
  items: {
    type: [SectionItemSchema],
    default: []
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Índices para mejorar el rendimiento
SectionSchema.index({ id: 1 });
SectionSchema.index({ 'items.id': 1 });

module.exports = mongoose.model('Section', SectionSchema);
