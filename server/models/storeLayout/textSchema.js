const textSchema = {
  input: { type: String, default: 'Hello, World!' },
  color: { type: String, default: '#000000' },
  weight: { type: String, default: 'normal' },
  fontSize: { type: String, default: '16px' },
  fontFamily: { type: String, default: 'Arial, sans-serif' },
  fontStyle: { type: String, default: 'normal' },
  lineHeight: { type: String, default: '1.5' },
  letterSpacing: { type: String, default: 'normal' },
  textDecoration: { type: String, default: 'none' },
  textAlign: { type: String, default: 'left' }, 
  textTransform: { type: String, default: 'none' },
  textShadow: { type: String, default: 'none' },
  backgroundColor: { type: String, default: 'transparent' },
}

export default textSchema; 
