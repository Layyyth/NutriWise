import styled from "styled-components";
import EmptyBackground from "../ui/EmptyBackground";
import { Typography } from "@mui/material";
import { getFromLocal } from "../helpers/functions";

const StyledContainer = styled.div`
  height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function LoadingFullPage() {
  return (
    <EmptyBackground
      className={`themeContainer ${getFromLocal("themeColor") || "dark"}`}
    >
      <StyledContainer>
        <Typography variant="h5">Loading...</Typography>
      </StyledContainer>
    </EmptyBackground>
  );
}

export default LoadingFullPage;
