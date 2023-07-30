/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

// Keyframes for the spin animation
const spinAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// CSS-in-JS styles using emotion
const loaderStyles = css`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #4caf50;
  width: 120px;
  height: 120px;
  animation: ${spinAnimation} 2s linear infinite;
`;

// Usage of the loaderStyles
const Loader = () => {
  return <div css={loaderStyles} />;
};

export default Loader;
