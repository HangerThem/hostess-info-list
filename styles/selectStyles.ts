export const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    width: "300px",
    height: "40px",
    fontFamily: "var(--font-mono)",
    backgroundColor: "#3e3e3e",
    color: "#fff",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    fontFamily: "var(--font-mono)",
    color: "#fff",
    backgroundColor:
      state.isSelected || state.isFocused ? "#2d2d2d" : "#3e3e3e",
    cursor: state.isSelected ? "default" : "pointer",
  }),
  menu: (provided: any) => ({
    ...provided,
    fontFamily: "var(--font-mono)",
    backgroundColor: "#3e3e3e",
    color: "#fff",
  }),
  menuList: (provided: any) => ({
    ...provided,
    scrollbarWidth: "thin",
    scrollbarColor: "#555 transparent",
    borderRadius: "5px",
    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontFamily: "var(--font-mono)",
    color: "#fff",
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontFamily: "var(--font-mono)",
    color: "#989898",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#fff",
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#aaa",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    "&:hover": {
      color: "#fff",
    },
  }),
  clearIndicator: (provided: any) => ({
    ...provided,
    color: "#aaa",
    "&:hover": {
      color: "#fff",
    },
  }),
}
