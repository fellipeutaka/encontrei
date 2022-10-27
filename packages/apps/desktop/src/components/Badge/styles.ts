import styled from "styled-components";

export const Root = styled.span`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
`;

export const Content = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-weight: 500;
  font-size: 1.2rem;
  min-width: 16px;
  min-height: 16px;
  line-height: 16px;
  padding: 2px 6px;
  border-radius: 22px;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.violet9};
  color: #fff;
  top: 0px;
  right: 0px;
  transform: translate(16%, -16%);
  user-select: none;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
