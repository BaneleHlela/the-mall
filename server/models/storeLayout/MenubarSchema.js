import mongoose from 'mongoose';
import textSchema from './textSchema.js';
import popMenuSchema from "./popMenuSchema.js";
import backgroundSchema from './backgroundSchema.js';

const MenubarSchema = new mongoose.Schema({
  layoutStyle: { type: String, default: 'default' },
  isSticky: { type: Boolean, default: true },
  hasSearchbar: { type: Boolean, default: "false"},
  sellsProducts: { type: Boolean, default: "false"}, /*Store detail*/
  textStyle: textSchema,
  background: backgroundSchema,
  buttonStyle: {
    text: textSchema,
    backgroundSchema: backgroundSchema,
    icon: {
      text: textSchema,
      backgroundSchema: backgroundSchema,
    }
  },
  desktop: {
    itemsLayoutStyle: { type: Array, default: ["logo", "links", "extras"] },
    background: backgroundSchema,
    logoStyle:  {
      text: textSchema,
      background: backgroundSchema,
    },
    linksStyle: {
      background: backgroundSchema,
      links: {
        all: {
          hover: {},
          background: backgroundSchema,
          textStyle: textSchema 
        },
        special: {},
      }
    },
    extras: {
      socialIcons: {
        background: backgroundSchema,
        text: textSchema,
        perIcon: {
          background:backgroundSchema,
        },
        icons: [{
          name: {type: String, required: true},
          redirectTo: {type: String},
        }]
      },
      extraIcons: {
        background: backgroundSchema,
        text: textSchema,
        perIcon: {
          background:backgroundSchema,
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
            text: textSchema,
            background: backgroundSchema
          },
        },
        redirectTo: {type: String},
        style: {
          text: textSchema,
          background: backgroundSchema
        }
      },
    },
  },
  mobile: {
    itemsLayoutStyle: { type: Array, default: ["hamburger", "logo", "extras"] },
    background: backgroundSchema, 
    popMenuStyle: popMenuSchema,
    logoStyle: {
      text: textSchema,
      background: backgroundSchema,
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
    extras: {
      socialIcons: {
        background: backgroundSchema,
        style: {
          text: textSchema,
          background: backgroundSchema,
          single: {
            background:backgroundSchema,
          }
        },
        icons: [{
          name: {type: String, required: true},
          redirectTo: {type: String},
        }]
      },
      extraIcons: {
        background: backgroundSchema,
        style: {
          text:  textSchema,
          background: backgroundSchema
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
            text: textSchema,
            background: backgroundSchema
          },
        },
        redirectTo: {type: String},
        style: {
          text: textSchema,
          background: backgroundSchema
        }
      },
    },
  },
  tablet: {
    itemsLayoutStyle: { type: Array, default: ["logo", "links", "extras"] },
    background: backgroundSchema,
    logoStyle: {
      text: textSchema,
      background: backgroundSchema,
    },
    extras: {
      socialIcons: {
        background: backgroundSchema,
        style: {
          text: textSchema,
          background: backgroundSchema,
          single: {
            background:backgroundSchema,
          }
        },
        icons: [{
          name: {type: String, required: true},
          redirectTo: {type: String},
        }]
      },
      extraIcons: {
        background: backgroundSchema,
        style: {
          text:  textSchema,
          background: backgroundSchema
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
            text: textSchema,
            background: backgroundSchema
          },
        },
        redirectTo: {type: String},
        style: {
          text: textSchema,
          background: backgroundSchema
        }
      },
    },
  },
});

export default MenubarSchema;
