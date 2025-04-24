import {Types} from "mongoose";

interface LayoutDiv {
  _id: Types.ObjectId;
  content: string;
  styles: Record<string, string>;
  type: "productDisplay" | "saleDiv" | "bookNow" | "testimonial" | "featuredSection" |
        "gallery" | "heroBanner" | "contactForm" | "serviceList" | "aboutUs" |
        "newsletterSignup" | "faq" | "photographer" | "projects" | "articles";
}

export interface Menubar {
  layoutStyle?: "default" | "basic" | "minimal" | "detailed";
  hasSearchbar?: boolean;
  logoStyle?: {
    placement?: {
      isAbsolute?: boolean,
      topMargin?: "",
    },
    height?: string,
    width?: string,
    border?: {
      borderStyle?: string;
      borderWidth?: string;
      borderDirection?: string;
      borderRadius?: string;
      color?: string;
    },
    text: {
      color: string;
      weight: string;
      fontSize: string;
      fontFamily: string;
      fontStyle: string;
      lineHeight: string;
      letterSpacing: string;
      textDecoration: string;
      textAlign: string;
      textTransform: string;
      textShadow: string;
      backgroundColor: string;
    }
  },
  itemsLayoutStyle?: Array<string>;
  background?: {
    color?: string;
    height?: string;
    border?: {
      borderStyle?: string;
      borderWidth?: string;
      borderDirection?: string;
      color?: string;
      borderRadius?: string;
    };
  };
  linksStyle: {
    wide: {
      background: {
          border: {
              borderStyle: string,
              borderWidth: string,
              borderRadius: string,
              borderDirection: 'all' | 'y' | 'x' | 't' | 'b' | 'r' | 'l',
              color: string,
          },
          shadow: {
              addShadow: boolean,
              style: string
          },
          color: string,
          height: string,
          width: string
      },
      links: []
    },
  },
  textColor?: string;
  coverHeader?: boolean;
  isSticky?: boolean;
  popNavWidth?: string;
  marginLeft?: string;
  burstOut?: boolean;
  iconPlacementUp?: boolean;
  linksTextSize?: string;
  shadowSettings?: string;
  popNavLinksWidth?: string;
  navBorder?: string;
  enter?: string;
  exit?: string;
  popNavLayoutStyle?: string;
  menuItems?: Array<string>;
  displayExtraIcon?: boolean;
  navButton?: {
    type?: string;
    style?: string;
  };
  hamburger?: {
    type?: "squash" | "squeeze" | "sling" | "rotate";
    hamburgerStyling?: string;
  };
  iconPlacement?: "Up" | "Down";
}


export interface Layout {
  store?: Types.ObjectId | null,
  _id?: string;
  hero?: string;
  theme?: string;
  menubar?: Menubar,
  divs: LayoutDiv[];
  headerLayout?: string;
  footerLayout?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  footer?: string;
  customCSS?: string;
}

export interface LayoutState {
  layouts: Layout[];
  activeLayout: Layout | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}


