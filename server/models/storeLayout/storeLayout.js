import mongoose from 'mongoose';
import ColorSchema from './ColorSchema.js';
import MenubarSchema from "./MenubarSchema.js";
import textSchema from './textSchema.js';

const layoutSchema = new mongoose.Schema({
  store: { type: mongoose.Schema.Types.ObjectId, ref: "Store", default: null },
  menubar: {
    layoutStyle: { type: Array, default: ["logo", "links", "extras"] },
    isSticky: { type: Boolean, default: true },
    hasSearchbar: { type: Boolean, default: "false"},
    sellsProducts: { type: Boolean, default: "false"}, /*Store detail*/
    textStyle: {},
    background: {},
    buttonStyle: {
      text: {},
      background: {},
      icon: {
        text: {},
        background: {},
      }
    },
    desktop: {
      itemsLayoutStyle: { type: Array, default: ["logo", "links", "extras"] },
      background: {},
      logoStyle:  {
        text: {},
        background: {},
      },
      linksStyle: {
        background: {},
        links: {
          all: {
            hover: {},
            background: {},
            textStyle: {} 
          },
          special: {},
        }
      },
      extras: {
        socialIcons: {
          background: {},
          text: {},
          perIcon: {
            background:{},
          },
          icons: [{
            name: {type: String, required: true},
            redirectTo: {type: String},
          }]
        },
        extraIcons: {
          background: {},
          text: {},
          perIcon: {
            background:{},
          },
          icons: [{
            name: {type: String, required: true},
            redirectTo: {type: String},
          }]
        },
        button: {
          display: { type: Boolean, default: false},
          icon: {
            display: { type: Boolean, default: false},
            name: {type: String, default: "CallIcon"},
            style: { 
              text: {},
              background: {}
            },
          },
          redirectTo: {type: String},
          style: {
            text: {},
            background: {}
          }
        },
      },
    },
    mobile: {
      itemsLayoutStyle: { type: Array, default: ["hamburger", "logo", "extras"] },
      background: {}, 
      popMenuStyle: {},
      logoStyle: {
        text: {},
        background: {},
      },
      hamburger: {
        Type: { type: String, enum: ["squash", "squeeze", "sling", "rotate"], default: "squash" },
        hamburgerStyle: {
          text: {
            fontSize: { type: String, default: '32' },
          },
          background: {}
        }
      },
      cartAndWishlist: {
        isDisplayed: {type: Boolean, default: false},
        display: {},
        text: {},
        background: {},
        cartIcon: {
          name: { type: String, default: "ShoppingBagCartIcon"},
          background: {}
        },
        cartCount: {
          text: {},
          background: {}
        },
        wishlistIcon: {
          isDisplayed: {type: Boolean, default: false},
          name: { type: String, default: "GrFavorite"},
          background: {}
        },
      },
      extras: {
        socialIcons: {
          background: {},
          style: {
            text: {},
            background: {},
            single: {
              background:{},
            }
          },
          icons: [{
            name: {type: String, required: true},
            redirectTo: {type: String},
          }]
        },
        extraIcons: {
          background: {},
          style: {
            text:  {},
            background: {}
          },
          icons: [{
            name: {type: String, required: true},
            redirectTo: {type: String},
          }]
        },
        button: {
          display: { type: Boolean, default: false},
          icon: {
            display: { type: Boolean, default: false},
            name: {type: String, default: "CallIcon"},
            style: {
              text: {},
              background: {}
            },
          },
          redirectTo: {type: String},
          style: {
            text: {},
            background: {}
          }
        },
      },
    },
    tablet: {
      itemsLayoutStyle: { type: Array, default: ["logo", "links", "extras"] },
      background: {},
      logoStyle: {
        text: {},
        background: {},
      },
      extras: {
        socialIcons: {
          background: {},
          style: {
            text: {},
            background: {},
            single: {
              background:{},
            }
          },
          icons: [{
            name: {type: String, required: true},
            redirectTo: {type: String},
          }]
        },
        extraIcons: {
          background: {},
          style: {
            text:  {},
            background: {}
          },
          icons: [{
            name: {type: String, required: true},
            redirectTo: {type: String},
          }]
        },
        button: {
          display: { type: Boolean, default: false},
          icon: {
            display: { type: Boolean, default: false},
            name: {type: String, default: "CallIcon"},
            style: {
              text: {},
              background: {}
            },
          },
          redirectTo: {type: String},
          style: {
            text: {},
            background: {}
          }
        },
      },
    },
  },
  hero: {
    type: String,
    default: "basic"
  },
  theme: { type: String, default: 'default' },
  divs: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    content: { type: String, default: '' },
    styles: { type: Object, default: {} },
    type: {
      type: String,
      enum: [
        "productDisplay", "saleDiv", "bookNow", "testimonial", "featuredSection",
        "gallery", "contactForm", "serviceList", "aboutUs", "newsletterSignup",
        "faq", "qualifications", "projects", "photographer", "articles"
      ],
      required: true
    }
  }],
  footer: {
    type: Object,
    default: { type: 'basic', theme: 'default' }
  },
  colors: ColorSchema,
  textStyle: textSchema,
  customCSS: { type: String, default: '' },
  externalLinks: {

  },
  pages: {
    type: Object,
    default: { }
  }
});

export default mongoose.model('StoreLayout', layoutSchema);
