import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], // Optional
  },
  color: {
    type: String,
  },
  brand: {
    type: String,
    required: true,
    // enum: ['Apple', 'Samsung', 'Lenovo'] // Uncomment if needed
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  ratings: [
    {
      star: { type: Number },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      review: { type: String },
    },
  ],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  // owners: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'User',
  //     required: true,
  //   },
  // ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Generate slug from title
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 100);
}

productSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = createSlug(this.title);
  }
  next();
});

// Optional: virtual discounted price
productSchema.virtual('discountedPrice').get(function () {
  return this.price - (this.price * this.discountPercentage) / 100;
});

const Product = mongoose.model('Product', productSchema);
export default Product;
