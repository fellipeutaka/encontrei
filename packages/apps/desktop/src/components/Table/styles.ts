import styled from "styled-components";

export const Container = styled.div`
  max-height: 80vh;
  overflow-y: auto;
  width: 80%;
  opacity: 0;

  @keyframes animate {
    to {
      margin-top: 3.2rem;
      opacity: 1;
    }
  }
  animation: animate 640ms ease forwards;

  table {
    width: 100%;
    border-collapse: collapse;

    thead tr {
      font-size: 1.8rem;

      th {
        padding-bottom: 3.2rem;
      }
    }

    tbody tr {
      height: 7.6rem;
      font-weight: 500;
      text-align: center;
      transition: background-color 0.3s ease;

      &:nth-child(even) {
        background-color: ${({ theme }) => theme.colors.mauve6};
      }

      &:nth-child(odd) {
        background-color: ${({ theme }) => theme.colors.mauve3};
      }
    }
  }
`;
