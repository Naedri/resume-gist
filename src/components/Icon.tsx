import type { SVGProps, ReactNode } from "react";

type IconType =
  // | "github"
  // | "linkedin"
  "location" | "mail" | "phone" | "redirection" | "user";

interface IconProps extends SVGProps<SVGSVGElement> {
  type: IconType;
}

type IconSize = 16 | 24;
type IconViewBox = Record<IconSize, string>;
type IconDefinition = Record<
  IconType,
  {
    size: IconSize;
    draws: (() => ReactNode)[];
  }
>;

const viewBoxes: IconViewBox = {
  16: "0 0 16 16",
  24: "0 0 24 24"
};

const icons: IconDefinition = {
  redirection: {
    size: 16,
    draws: [
      () => (
        <path
          fillRule="evenodd"
          d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
        />
      ),
      () => (
        <path
          fillRule="evenodd"
          d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
        />
      )
    ]
  },

  location: {
    size: 16,
    draws: [
      () => (
        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
      ),
      () => (
        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      )
    ]
  },

  mail: {
    size: 16,
    draws: [
      () => (
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
      )
    ]
  },

  phone: {
    size: 16,
    draws: [
      () => (
        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
      ),
      () => <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
    ]
  },

  user: {
    size: 16,
    draws: [
      () => (
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
      )
    ]
  }
};

export const Icon = ({ type, ...props }: IconProps) => {
  const { size, draws } = icons[type];
  return (
    <svg
      viewBox={viewBoxes[size]}
      fill="currentColor"
      aria-hidden="true"
      className={`icon icon-${type}`}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {draws.map((Draw, i) => (
        <Draw key={i} />
      ))}
    </svg>
  );
};
