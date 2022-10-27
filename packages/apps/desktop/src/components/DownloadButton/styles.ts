import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 500;
  padding: 0.8rem;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.green10};
  color: white;
  border: 1px solid ${({ theme }) => theme.colors.green7};
  transition: background-color 400ms ease, color 400ms ease,
    box-shadow 400ms ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.colors.mauve1},
      0 0 0 0.4rem ${({ theme }) => theme.colors.green8};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.green8};
  }
`;
