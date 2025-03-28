const formStyle = {
  boxBig: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "700px",
    padding: "5%",
    marginTop: "80px",
    marginBottom: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    gap: "40px",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: 3,
    borderRadius: 2,
    backgroundColor: "#fdfdfd",
  },
  boxSmall: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "400px",
    padding: "5%",
    marginTop: "120px",
    marginLeft: "auto",
    marginRight: "auto",
    gap: "40px",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: 3,
    borderRadius: 2,
    backgroundColor: "#fdfdfd",
  },
  input: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#D6F9FA",
      borderRadius: "8px",
      "& fieldset": {
        borderRadius: "8px",
      },
    },
    "& .MuiInputBase-input": {
      color: "#000000",
    },
    "& .MuiFormHelperText-root": {
      backgroundColor: "transparent",
    },
  },

  inputSmall: {
    width: "45%",
    borderRadius: "8px",
  },
  buttonWide: {
    width: "100%",
    borderRadius: "10px",
    mt: 2,
  },
  buttonSmall: {
    width: "200px",
    borderRadius: "10px",
    mt: 2,
  },
  boxForSmallFields: {
    display: "flex",
    width: "100%",
    gap: "10%",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "divider",
  },
  listItem: {
    display: "flex",
    position: "relative",
    gap: "20px",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    borderBottomWidth: "2px",
    borderColor: "#47CAD1",
  },
};

export default formStyle;
