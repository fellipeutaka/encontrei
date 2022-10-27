import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(187, 187, 187, 0.25);
  height: 76px;
`;

export const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const OptionInfo = styled.View`
  flex-direction: row;
`;

export const OptionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.mauve12};
  font-size: 16px;
  margin-left: 12px;
`;
