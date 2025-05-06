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
      default: "gooapi.mythumbnail"
    },
    slogan: {
      type: String,
      default: ""
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    operationTimes: {
      alwaysOpen: {
        type: Boolean,
        default: false
      },
      monday: {
        start: { type: String, default: "07:00" },
        end: { type: String, default: "17:00" },
        closed: { type: Boolean, default: false }
      },
      tuesday: {
        start: { type: String, default: "07:00" },
        end: { type: String, default: "17:00" },
        closed: { type: Boolean, default: false }
      },
      wednesday: {
        start: { type: String, default: "07:00" },
        end: { type: String, default: "17:00" },
        closed: { type: Boolean, default: false }
      },
      thursday: {
        start: { type: String, default: "07:00" },
        end: { type: String, default: "17:00" },
        closed: { type: Boolean, default: false }
      },
      friday: {
        start: { type: String, default: "07:00" },
        end: { type: String, default: "17:00" },
        closed: { type: Boolean, default: false }
      },
      saturday: {
        start: { type: String, default: "08:00" },
        end: { type: String, default: "14:00" },
        closed: { type: Boolean, default: false }
      },
      sunday: {
        start: { type: String, default: null },
        end: { type: String, default: null },
        closed: { type: Boolean, default: true }
      }
    }
  },
  {
    timestamps: true,
  }
);

export const Store = mongoose.model('Store', storeSchema);


