import Svg, { Path } from "react-native-svg";

export const ScrollIcon = ({ color }: { color: string }) => (
  <Svg width="20" height="18" viewBox="0 0 20 18" fill="none">
    <Path
      d="M7.85715 6.82932C7.85715 6.63988 7.9324 6.4582 8.06636 6.32424C8.20031 6.19029 8.38199 6.11503 8.57143 6.11503H14.2857C14.4751 6.11503 14.6568 6.19029 14.7908 6.32424C14.9247 6.4582 15 6.63988 15 6.82932C15 7.01876 14.9247 7.20044 14.7908 7.33439C14.6568 7.46835 14.4751 7.5436 14.2857 7.5436H8.57143C8.38199 7.5436 8.20031 7.46835 8.06636 7.33439C7.9324 7.20044 7.85715 7.01876 7.85715 6.82932ZM14.2857 10.4007C14.4751 10.4007 14.6568 10.3255 14.7908 10.1915C14.9247 10.0576 15 9.8759 15 9.68646C15 9.49702 14.9247 9.31534 14.7908 9.18138C14.6568 9.04743 14.4751 8.97217 14.2857 8.97217H8.57143C8.38199 8.97217 8.20031 9.04743 8.06636 9.18138C7.9324 9.31534 7.85715 9.49702 7.85715 9.68646C7.85715 9.8759 7.9324 10.0576 8.06636 10.1915C8.20031 10.3255 8.38199 10.4007 8.57143 10.4007H14.2857ZM20 14.6865C19.9976 15.4435 19.6959 16.1688 19.1605 16.7042C18.6252 17.2395 17.8999 17.5412 17.1428 17.5436H7.14286C6.38583 17.5412 5.66047 17.2395 5.12516 16.7042C4.58985 16.1688 4.28808 15.4435 4.28572 14.6865V3.2579C4.28566 3.0262 4.22923 2.798 4.12132 2.59297C4.01342 2.38794 3.85726 2.21223 3.66631 2.081C3.47537 1.94976 3.25537 1.86694 3.02529 1.83967C2.7952 1.8124 2.56194 1.84151 2.34561 1.92447C2.12928 2.00744 1.93637 2.14178 1.78353 2.3159C1.63068 2.49003 1.52248 2.69872 1.46826 2.92398C1.41403 3.14924 1.41541 3.38431 1.47227 3.60891C1.52914 3.83352 1.63978 4.04093 1.79465 4.21325C1.85686 4.28357 1.90459 4.36547 1.93512 4.45425C1.96565 4.54303 1.97837 4.63697 1.97257 4.73067C1.96676 4.82438 1.94254 4.91602 1.90129 5.00036C1.86004 5.08469 1.80256 5.16007 1.73215 5.22218C1.66258 5.28412 1.58142 5.33167 1.49336 5.36208C1.40531 5.39249 1.31211 5.40515 1.21913 5.39934C1.12615 5.39353 1.03525 5.36936 0.951669 5.32822C0.868086 5.28709 0.79348 5.2298 0.732157 5.15968C0.258953 4.63956 -0.00225569 3.96106 1.46767e-05 3.2579C0.00236939 2.50086 0.304145 1.7755 0.839452 1.24019C1.37476 0.704887 2.10012 0.403112 2.85715 0.400757H15C15.757 0.403112 16.4824 0.704887 17.0177 1.24019C17.553 1.7755 17.8548 2.50086 17.8571 3.2579V12.5436H18.7411C18.841 12.5436 18.9398 12.5652 19.0307 12.6068C19.1216 12.6484 19.2025 12.709 19.2678 12.7847C19.741 13.3048 20.0023 13.9833 20 14.6865ZM8.08929 12.9632C8.1469 12.8386 8.23879 12.733 8.35421 12.6587C8.46963 12.5844 8.60381 12.5445 8.74107 12.5436H16.4286V3.2579C16.4286 2.87902 16.2781 2.51565 16.0101 2.24774C15.7422 1.97984 15.3789 1.82933 15 1.82933H5.33036C5.58075 2.26388 5.71311 2.75637 5.71429 3.2579V14.6865C5.71436 14.9181 5.77078 15.1463 5.87869 15.3514C5.9866 15.5564 6.14276 15.7321 6.3337 15.8633C6.52465 15.9946 6.74465 16.0774 6.97473 16.1047C7.20481 16.1319 7.43808 16.1028 7.65441 16.0199C7.87074 15.9369 8.06364 15.8026 8.21649 15.6284C8.36933 15.4543 8.47753 15.2456 8.53176 15.0204C8.58598 14.7951 8.5846 14.56 8.52774 14.3354C8.47088 14.1108 8.36024 13.9034 8.20536 13.7311C8.11401 13.6279 8.05445 13.5006 8.03386 13.3643C8.01326 13.2281 8.03251 13.0888 8.08929 12.9632ZM18.5714 14.6865C18.573 14.436 18.5083 14.1896 18.3839 13.9722H9.91071C9.97164 14.2053 10.0017 14.4455 10 14.6865C9.99882 15.188 9.86646 15.6805 9.61607 16.115H17.1428C17.5217 16.115 17.8851 15.9645 18.153 15.6966C18.4209 15.4287 18.5714 15.0653 18.5714 14.6865Z"
      fill={color}
    />
  </Svg>
);
