import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 64px 0;
  animation: signInEntrance 640ms ease;

  @keyframes signInEntrance {
    from {
      opacity: 0;
      padding-right: 12.8rem;
    }
    to {
      opacity: 1;
      padding-right: 0;
    }
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 7.2rem;
  line-height: 8.4rem;
`;

export const Form = styled.form`
  width: 512px;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 3rem;
  line-height: 3.6rem;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  svg {
    position: absolute;
    left: 12px;
  }
`;

export const Input = styled.input`
  width: 51.2rem;
  height: 6.4rem;
  border: 1px solid ${({ theme }) => theme.colors.gray7};
  color: ${({ theme }) => theme.colors.gray12};
  background-color: transparent;
  border-radius: 0.4rem;
  outline: none;
  padding: 0 4.8rem;
  font-size: 1.6rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.violet8};
    box-shadow: 0 0 4px ${({ theme }) => theme.colors.violet8};
  }
`;

export const Button = styled.button`
  width: 32rem;
  height: 7.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.violet9};
  color: white;
  font-weight: 600;
  font-size: 3rem;
  border-radius: 0.8rem;
  margin-top: 3.2rem;
  align-self: center;
  transition: background-color 0.3s ease, opacity 0.3s ease;

  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.colors.violet10};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
