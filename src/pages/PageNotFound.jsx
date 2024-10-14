import EmptyBackground from "../ui/EmptyBackground";
import styled from "styled-components";
import { getFromLocal } from "../helpers/functions";

const StyledContainer = styled.div`
  height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function PageNotFound({ error, resetErrorBoundary }) {
  return (
    <EmptyBackground
      className={`themeContainer ${getFromLocal("themeColor") || "dark"}`}
    >
      <StyledContainer>
        <h1>Error!</h1>
        <br />
        <p>{error?.message}</p>
        <br />
        <a href="/">Go back</a>
      </StyledContainer>
    </EmptyBackground>
  );
}

export default PageNotFound;
