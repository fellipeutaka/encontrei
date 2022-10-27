import { SVGProps } from "react";

export default function Logo({ ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ETEC logo"
      {...rest}
    >
      <circle cx="18" cy="18" r="18" fill="#ddd" />
      <path
        d="M11.4789 7.25354H10.0001L8.87329 12.1127H14.4367L10.0001 29.7183H16.4085L21.0564 12.1127H27.5353L28.662 7.25354H27.0423L26.3381 10.3521H19.7184L14.9296 28.0282H12.2536L16.7606 10.3521H10.8451L11.4789 7.25354Z"
        fill="#4A555B"
      />
      <path
        d="M30.986 10.3522H29.5775L28.662 13.3803H22.1127L17.4648 31.0564H12.9578L12.4648 32.6761H18.8733L23.5212 15.1409H30.0001L30.986 10.3522Z"
        fill="#B33538"
      />
    </svg>
  );
}
