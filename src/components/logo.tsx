import React from "react";

type LogoProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export const Logo = (props: LogoProps) => {
  return (
    <div>
      <img src="/logo.png" alt="Miniature cms logo" {...props} />
    </div>
  );
};
