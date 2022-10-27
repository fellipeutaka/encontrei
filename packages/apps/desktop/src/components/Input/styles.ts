import styled from "styled-components";

export const Container = styled.input`
  padding: 1.2rem 1.6rem;
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.mauve3};
  color: ${({ theme }) => theme.colors.mauve12};
  border-radius: 0.4rem;
  transition: border 400ms ease, box-shadow 400ms ease;
  width: 100%;
  height: 44px;

  &[aria-invalid="true"] {
    border: 2px solid red;

    &:focus-within {
      border-color: transparent;
    }
  }

  &:focus-within {
    box-shadow: ${({ theme }) => theme.colors.violet9} 0 0 0 2px;
  }
`;
