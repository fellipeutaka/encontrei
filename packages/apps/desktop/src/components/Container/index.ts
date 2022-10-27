import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    animation: fade 640ms ease forwards;
    opacity: 0;

    @keyframes fade {
      to {
        opacity: 1;
      }
    }

    h1 {
      font-size: 6.4rem;
    }

    div {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      button:last-child {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        background-color: ${({ theme }) => theme.colors.violet9};
        color: white;
        font-weight: 500;
        padding: 0.8rem;
        border-radius: 0.4rem;
        transition: all 400ms ease;

        &:hover {
          background-color: ${({ theme }) => theme.colors.violet10};
        }

        &:focus-visible {
          box-shadow: 0 0 0 0.2rem ${({ theme }) => theme.colors.mauve1},
            0 0 0 0.4rem ${({ theme }) => theme.colors.violet9};
        }
      }
    }
  }
`;
