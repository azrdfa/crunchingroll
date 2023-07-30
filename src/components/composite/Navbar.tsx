import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { Heading } from "../basic";

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  z-index: 9999;
`;

const StyledLi = styled.li`
  float: left;
`;

const StyledLink = styled(NavLink)`
  display: block;
  color: #464646;
  text-align: center;
  padding: 24px 16px;
  text-decoration: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TopContainer = styled.div`
  width: 80vw;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Navbar = () => {
  return (
    <TopContainer>
      <Heading>Crunchingroll</Heading>
      <Container>
        <StyledUl>
          <StyledLi>
            <StyledLink to="/">Anime</StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="/collection">Collection</StyledLink>
          </StyledLi>
        </StyledUl>
      </Container>
    </TopContainer>
  );
};

export default Navbar;
