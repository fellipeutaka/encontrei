import { Link } from "react-router-dom";

import styled, { css } from "styled-components";

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 5.6rem;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.mauve2};
  border-right: 1px solid ${({ theme }) => theme.colors.mauve6};
  padding: 1.6rem 0.8rem;
  position: absolute;
  top: 0;
  left: -6.4rem;
  transition: background-color 0.3s ease, color 0.3s ease,
    border-right 0.3s ease;
  animation: sidebarEntrance 320ms ease forwards;

  @keyframes sidebarEntrance {
    to {
      left: 0;
    }
  }
`;

export const Options = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
`;

export const Button = styled(Link)`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.gray10};
  background-color: transparent;
  font-size: 2rem;
  font-weight: 600;
  outline: none;
  transition: all 0.3s ease;

  ${(props) =>
    props["aria-checked"] &&
    css`
      background-color: ${({ theme }) => theme.colors.gray6};
      color: ${({ theme }) => theme.colors.gray12};
    `}

  &:hover, &:focus-visible {
    background-color: ${({ theme }) => theme.colors.gray5};
    color: ${({ theme }) => theme.colors.gray11};
  }
`;

export const LeaveButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.red9};
  background-color: transparent;
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.red10};
  }
`;

export const ThemeButton = styled.button`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.gray11};
  background-color: transparent;
  font-size: 2rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  transition: all 0.3s ease;
  margin-bottom: 0.8rem;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.gray5};
    color: ${({ theme }) => theme.colors.gray11};
  }
`;
