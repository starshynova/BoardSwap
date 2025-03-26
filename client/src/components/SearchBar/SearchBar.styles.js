import { InputBase, styled, Button } from "@mui/material";

export const SearchContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  border: "1.5px solid ",
  borderColor: theme.palette.secondary.main,
  flex: 1,
}));

export const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  width: "100%",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.secondary.main,
  backgroundColor: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
}));

export const StyledInputBase = styled(InputBase)({
  color: "gray",
  flex: 1,
});
