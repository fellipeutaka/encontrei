import { BiLoaderAlt } from "react-icons/bi";

interface SpinnerLoaderProps {
  size?: number;
}

export function SpinnerLoader({ size }: SpinnerLoaderProps) {
  return (
    <BiLoaderAlt className="text-violet-600 animate-loading" size={size} />
  );
}
