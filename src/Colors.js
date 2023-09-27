const RawPalette = {
  Tomato: "#fe4a49",
  TomatoLight: "#ffbab2",
  Moonstone: "#2ab7ca",
  MoonstoneLight: "#a0e7e5",
  Mustard: "#fed766",
  MustardLight: "#ffedc0",
  Platinum: "#e6e6ea",
  "Ghost white": "#f4f4f8",
};

const ComponentsPalette = {
  // Theme
  Primary: { main: RawPalette["Mustard"], light: RawPalette["MustardLight"] },
  Secondary: {
    main: RawPalette["Moonstone"],
    light: RawPalette["MoonstoneLight"],
  },

  // TopBar
  TopBar: RawPalette["Tomato"],

  // ClusterAccordion
  AccordionHeader: "#FFDEE7",
  AccordionBody: RawPalette["Ghost white"],
  ClusterClient: RawPalette["Mustard"],
  ClusterServer: RawPalette["Moonstone"],
};

export { RawPalette, ComponentsPalette };
