import React from "react";

const SvgIcon = ({ data, size = {width: 32, height: 32}, color, className, style, ...props }) => {
  if (!data) return null;

  return React.cloneElement(data, {
    width: size.width,
    height: size.height,
    fill: color || "currentColor",
    className: className,
    style: { ...style },
    ...props,
  });
};

export default SvgIcon;