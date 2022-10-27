import { Text } from "react-native";

import styled from "styled-components/native";

export const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.mauve12};
  align-self: flex-start;
`;
