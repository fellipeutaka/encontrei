import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 92px;
  border: 2px solid ${({ theme }) => theme.colors.mauve7};
  border-radius: 8px;
  padding: 0 14px;
  margin: 14px 0;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  margin-left: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.mauve12};
  font-size: 20px;
  max-width: 160px;
`;

export const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Location = styled.Text`
  color: ${({ theme }) => theme.colors.mauve12};
`;

export const Photo = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

export const DetailsButton = styled.TouchableOpacity``;
