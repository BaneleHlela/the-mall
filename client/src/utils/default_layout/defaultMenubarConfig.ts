export const borderFill = {
  borderStyle: "none",
  borderWidth: "1",
  borderRadius: "",
  borderDirection: "all",
  color: "#000000"
}

export const backgroundFill = {
  padding: {
    left: "auto",
    right: "auto",
    top: "auto",
    bottom: "auto",
  },
  margin: {
    left: "auto",
    right: "auto",
    top: "auto",
    bottom: "auto",
  },
  border: borderFill,
  shadow: {
    addShadow: false,
    style: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
  },
  color: "#ffffff",
  height: "auto",
  width: "auto",
}
export const textFill =  {
  color: "#000000",
  weight: "normal",
  fontSize: "auto",
  fontFamily: "Arial, sans-serif",
  fontStyle: "normal",
  lineHeight: "1.5",
  letterSpacing: "normal",
  textDecoration: "none",
  textAlign: "",
  textTransform: "none",
  textShadow: "none",
  backgroundColor: "transparent",
}


const defaultMenubarConfig = {
  layoutStyle: ["logo", "links", "extras"],
  isSticky: true,
  hasSearchbar: false,
  sellsProducts: false,
  textStyle: textFill,
  background: { ...backgroundFill, height: "10vh" },
  buttonStyle: {
    text: textFill,
    background: backgroundFill,
    icon: {
      text: textFill,
      background: backgroundFill
    }
  },
  desktop: {
    itemsLayoutStyle: ["logo", "links", "extras"],
    background: backgroundFill,
    logoStyle: {
      text: textFill,
      background: backgroundFill
    },
    linksStyle: {
      background: backgroundFill,
      textStyle: textFill,
      links: {
        all: {
          hover: "default",
          background: backgroundFill
        },
        special: {}
      }
    },
    extras: {
      socialIcons: {
        background: backgroundFill,
        style: {
          text: textFill,
          background: backgroundFill,
          single: {
            background: backgroundFill
          }
        },
        icons: [
          { name: "X", redirectTo: "https://x.com/home" },
          { name: "LinkedIn", redirectTo: "https://www.linkedin.com/in/giza-hlela-64a299318" },
          { name: "Instagram", redirectTo: "https://www.instagram.com/explore/" },
          { name: "WhatsApp", redirectTo: "https://web.whatsapp.com/" }
        ]
      },
      extraIcons: {
        background: backgroundFill,
        style: {
          text: textFill,
          background: backgroundFill
        },
        icons: [
          { name: "ShoppingCartOutlined", redirectTo: "/cart" },
          { name: "FavoriteBorderOutlined", redirectTo: "/wishlist" }
        ]
      },
      button: {
        display: false,
        icon: {
          display: false,
          name: "CallIcon",
          style: {
            text: textFill,
            background: backgroundFill
          }
        },
        redirectTo: "call?",
        style: {
          text: textFill,
          background: backgroundFill
        }
      }
    }
  },
  mobile: {
    itemsLayoutStyle: ["hamburger", "logo", "extras"],
    background: backgroundFill,
    popMenuStyle: {
      links: {
        border: {
          borderStyle: "double",
          borderWidth: "2",
          borderRadius: "",
          borderDirection: "b",
          color: "#ff0000"
        },
        width: "auto",
        height: "auto"
      },
      transitions: {
        enter: "translate-x-0",
        exit: "translate-x-full"
      },
      itemsLayoutStyle: ["logo", "links", "extras"],
      coverHeader: false,
      width: "100",
      marginLeft: "0",
      burstOut: false,
      iconPlacementUp: false
    },
    logoStyle: {
      text: textFill,
      background: backgroundFill
    },
    hamburger: {
      Type: "squash",
      hamburgerStyle: {
        text: { fontSize: "32" },
        background: backgroundFill
      }
    },
    extras: {
      socialIcons: {
        background: backgroundFill,
        style: {
          text: textFill,
          background: backgroundFill,
          single: { background: backgroundFill }
        },
        icons: [
          { name: "X", redirectTo: "https://x.com/home" },
          { name: "LinkedIn", redirectTo: "https://www.linkedin.com/in/giza-hlela-64a299318" },
          { name: "Instagram", redirectTo: "https://www.instagram.com/explore/" },
          { name: "WhatsApp", redirectTo: "https://web.whatsapp.com/" }
        ]
      },
      extraIcons: {
        background: backgroundFill,
        style: { text: textFill, background: backgroundFill },
        icons: [
          { name: "ShoppingCartOutlined", redirectTo: "/cart" },
          { name: "FavoriteBorderOutlined", redirectTo: "/wishlist" }
        ]
      },
      button: {
        display: false,
        icon: {
          display: false,
          name: "CallIcon",
          style: { text: textFill, background: backgroundFill }
        },
        redirectTo: "call?",
        style: { text: textFill, background: backgroundFill }
      }
    }
  },
  tablet: {
    itemsLayoutStyle: ["logo", "links", "extras"],
    background: backgroundFill,
    logoStyle: {
      text: textFill,
      background: backgroundFill
    },
    extras: {
      socialIcons: {
        background: backgroundFill,
        style: {
          text: textFill,
          background: backgroundFill,
          single: { background: backgroundFill }
        },
        icons: [
          { name: "X", redirectTo: "https://x.com/home" },
          { name: "LinkedIn", redirectTo: "https://www.linkedin.com/in/giza-hlela-64a299318" },
          { name: "Instagram", redirectTo: "https://www.instagram.com/explore/" },
          { name: "WhatsApp", redirectTo: "https://web.whatsapp.com/" }
        ]
      },
      extraIcons: {
        background: backgroundFill,
        style: { text: textFill, background: backgroundFill },
        icons: [
          { name: "ShoppingCartOutlined", redirectTo: "/cart" },
          { name: "FavoriteBorderOutlined", redirectTo: "/wishlist" }
        ]
      },
      button: {
        display: false,
        icon: {
          display: false,
          name: "CallIcon",
          style: { text: textFill, background: backgroundFill }
        },
        redirectTo: "call?",
        style: { text: textFill, background: backgroundFill }
      }
    }
  }
};


export default defaultMenubarConfig;