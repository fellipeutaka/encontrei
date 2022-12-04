import { BiLoaderAlt } from "react-icons/bi";

type SpinnerLoaderProps = {
  size?: number;
}

export function SpinnerLoader({ size }: SpinnerLoaderProps) {
  return (
    <BiLoaderAlt className="text-violet-600 animate-loading" size={size} />
  );
}
