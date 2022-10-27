import { TouchableOpacity } from "react-native";

import styled from "styled-components/native";

export const Container = styled(TouchableOpacity)`
  background-color: rgba(
    110,
    86,
    207,
    ${({ disabled }) => (disabled ? 0.2 : 1)}
  );
  border-radius: 99999px;
  width: 100%;
  height: 72px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-weight: 600;
  font-size: 24px;
  color: #fff;
`;
