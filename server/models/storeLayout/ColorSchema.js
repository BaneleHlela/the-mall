import mongoose from 'mongoose';

const ColorSchema = new mongoose.Schema({
  primary: { type: String, default: '#ffffff' },
  secondary: { type: String, default: '#ead5d5' },
  text: { type: String, default: "#000000"},
  accent: { type: String, default: '#ff8a00' }
});

export default ColorSchema;
