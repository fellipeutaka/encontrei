import styled from "styled-components";

import { ButtonProps } from ".";

export const Container = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.violet9};
  color: white;
  font-weight: 500;
  padding: 1.6rem 1.2rem;
  font-size: 1.6rem;
  gap: 0.8rem;
  border-radius: 0.4rem;
  cursor: pointer;
  width: 100%;
  transition: all 400ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.violet10};
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.colors.mauve1},
      0 0 0 0.4rem ${({ theme }) => theme.colors.violet9};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    ${({ isLoading }) => isLoading && "animation: spinner 1s linear infinite"};
  }

  @keyframes spinner {
    from {
      rotate: 0deg;
    }
    to {
      rotate: 360deg;
    }
  }
`;
