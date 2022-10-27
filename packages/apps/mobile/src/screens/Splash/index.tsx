import research from "@encontrei/assets/research.json";

import { Container, Lottie } from "./styles";

export default function Splash() {
  return (
    <Container>
      <Lottie
        source={research}
        autoPlay
        resizeMode="contain"
        hardwareAccelerationAndroid
        duration={2500}
      />
    </Container>
  );
}
