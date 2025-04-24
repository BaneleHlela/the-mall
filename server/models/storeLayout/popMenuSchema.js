import backgroundSchema from './backgroundSchema.js';
import textSchema from './textSchema.js';

const popMenuSchema = {
  itemsLayoutStyle: { type: Array, default: ["logo", "links", "extras"] },
  coverHeader: { type: Boolean, default: false },
  logoStyle: {
    text: textSchema,
    background: backgroundSchema,
  },
  background: {backgroundSchema, width: { type: String, default: "100" },},
  //marginLeft: { type: String, default: 0 },
  burstOut: { type: Boolean, default: false },
  //iconPlacementUp: { type: Boolean, default: false },
  links: {
    text: {textSchema},
    background: {backgroundSchema}
  },
  extras: {
    text: {textSchema},
    background: {backgroundSchema}
  },
  transitions:  {
	  enter: { type: String, default: 'translate-x-0' },
  	exit: { type: String, default: 'translate-x-full' },
  }
};

export default popMenuSchema;
