import styled from "@emotion/styled";
import { Container } from "@material-ui/core";

import { Colors } from "../theme";
export const ErrorContainer = styled(Container)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));
export const helperStyle = {
  color: Colors.labelError,
  fontSize: "0.75rem",
  lineHeight: "24px",
};
