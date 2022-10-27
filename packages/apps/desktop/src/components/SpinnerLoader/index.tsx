import { Spinner } from "./styles";

interface SpinnerLoaderProps {
  size?: number;
}

export function SpinnerLoader({ size }: SpinnerLoaderProps) {
  return <Spinner size={size} />;
}
