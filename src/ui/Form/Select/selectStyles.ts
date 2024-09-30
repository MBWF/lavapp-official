import { StylesConfig } from "react-select";

export const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    border: "none",
    borderRadius: "0.25rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Roboto Slab', sans-serif",
    minWidth: "200px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    svg: {
      color: "#0A3440",
    },
  }),
  menu: (styles) => ({
    ...styles,
    fontFamily: "'Roboto Slab', sans-serif",
    zIndex: 2,
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: "0.688rem 1rem",
  }),
  input: (styles) => ({
    ...styles,
    fontSize: "1rem",
    lineHeight: "1.125rem",
    height: "16px",
    fontWeight: "400",
    "::placeholder": {
      color: "#757575",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "24px",
    },
  }),
  placeholder: (styles) => ({
    fontWeight: "400",
    fontSize: "15px",
    lineHeight: "16px",
    ...styles,
  }),
  menuList: (styles) => ({
    ...styles,
    zIndex: 2,
  }),
};
