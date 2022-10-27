import { BiLoaderAlt } from "react-icons/bi";

import styled from "styled-components";

export const Spinner = styled(BiLoaderAlt)`
  opacity: 0;
  animation: loading 1s linear infinite, fade 640ms ease forwards;

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes fade {
    to {
      opacity: 1;
    }
  }
`;
