const formStyle = {
  boxBig: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "700px",
    padding: "5%",
    marginTop: "40px",
    marginBottom: "40px",
    marginLeft: "auto",
    marginRight: "auto",
    gap: "40px",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: 3,
    borderRadius: 2,
    backgroundColor: "#ffffff",
  },
  boxSmall: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    maxWidth: "400px",
    padding: 4,
    marginTop: "60px",
    marginBottom: "60px",
    marginLeft: "auto",
    marginRight: "auto",
    gap: "24px",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: 3,
    borderRadius: 2,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  input: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#D6F9FA",
      borderRadius: "5px",
      "& fieldset": {
        borderRadius: "5px",
        border: "1px solid #a3bebf",
      },
      "&:hover fieldset": {
        border: "1px solid #a3bebf",
      },
      "&.Mui-focused fieldset": {
        border: "2px solid #40c9d0",
      },
    },
    "& .MuiInputBase-input": {
      color: "#000000",
    },
    "& .MuiFormHelperText-root": {
      backgroundColor: "transparent",
    },
    "& .MuiInputLabel-asterisk": {
      color: "red",
    },
  },

  inputSmall: {
    width: "45%",
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#D6F9FA",
      borderRadius: "5px",
      "& fieldset": {
        borderRadius: "5px",
      },
    },
    "& .MuiInputBase-input": {
      color: "#000000",
    },
    "& .MuiFormHelperText-root": {
      backgroundColor: "transparent",
    },
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
  buttonMiddle: {
    width: "50%",
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
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
  },
  card: {
    boxShadow: 2,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
};

export default formStyle;
