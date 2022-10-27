import { Feather, Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import {
  Container,
  DetailsButton,
  InfoContainer,
  Location,
  LocationContainer,
  Photo,
  TextContainer,
  Title,
} from "./styles";

interface ItemProps {
  photoUrl: string;
  title: string;
  location: string;
  onPress: () => void;
  rightIcon?: JSX.Element;
}

export default function Item({
  title,
  location,
  photoUrl,
  onPress,
  rightIcon,
}: ItemProps) {
  const theme = useTheme();

  return (
    <Container>
      <InfoContainer>
        <Photo
          source={{
            uri: photoUrl,
          }}
        />
        <TextContainer>
          <Title>{title}</Title>
          <LocationContainer>
            <Ionicons
              name="location-outline"
              size={16}
              color={theme.colors.mauve12}
            />
            <Location>{location}</Location>
          </LocationContainer>
        </TextContainer>
      </InfoContainer>
      <DetailsButton onPress={onPress}>
        {rightIcon || (
          <Feather name="eye" size={24} color={theme.colors.mauve12} />
        )}
      </DetailsButton>
    </Container>
  );
}
