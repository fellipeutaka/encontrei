import { Dimensions } from "react-native";

import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.mauve1};
`;

export const Scroll = styled.ScrollView``;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 46px;
  left: 12px;
  z-index: 999;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Image = styled.ImageBackground`
  width: ${Dimensions.get("screen").width}px;
  height: ${Dimensions.get("screen").width}px;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-between;

  padding-top: 36px;
  padding-bottom: 32px;
`;

export const Info = styled.View`
  width: 80%;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 32px;
`;

export const TitleAndCategory = styled.View``;

export const Row = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const GroupTitleAndDescription = styled.View``;

export const DateTimeAndLocation = styled.View`
  position: absolute;
  right: 0;
`;

export const Description = styled.View`
  margin-top: 48px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.mauve12};
  font-size: 24px;
  font-weight: 700;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.mauve11};
  margin-left: 6px;
`;

export const DescriptionContent = styled.Text`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.mauve11};
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.mauve11};
  margin-left: 6px;
`;
