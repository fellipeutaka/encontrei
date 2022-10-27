import { Dimensions } from "react-native";

import LottieView from "lottie-react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mauve1};
`;

export const Lottie = styled(LottieView)`
  width: ${Dimensions.get("window").width / 2}px;
  height: ${Dimensions.get("window").width / 2}px;
`;
