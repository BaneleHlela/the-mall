import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Store name is required"],
    },
    type: {
      type: String, /*ref: "StoreTypes", or enum*/
      required: [true, "Store type is required"], // e.g., furniture, doctor surgery, etc.
    },
    layouts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "StoreLayout"
    }],
    description: {
      type: String,
      required: [true, "Store description is required"],
    },
    owners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    businessType: {
      type: String,
      enum: ['sole', 'partnership', 'company', 'corporation', 'LLC', 'non-profit', 'franchise'],
      default: 'sole',
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    logo: {
      url: {
        type: String,
        default: "",
      },
      text: {
        type: String,
        default: "",
      },
    },
    thumbnail:{
      type:String,
      required:true
    },
    // isBlocked: {
    //   type: Boolean,
    //   required: true
    // },
    // isPublished: {
    //   type: Boolean,
    //   required: true
    // }
  },
  {
    timestamps: true,
  }
);

export const Store = mongoose.model('Store', storeSchema);


