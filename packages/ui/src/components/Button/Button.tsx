import React, { ComponentProps, FC, ReactNode, useMemo } from "react";
import cx from "clsx";
import styles from "./Button.module.scss";
import { Icon } from "../Icon";
import { IconProps, Shape, Size, Variant } from "../types/button";

export interface Props extends ComponentProps<"button"> {
  variant: Variant;
  size: Size;
  icon?: IconProps;
  shape?: Shape;
  wide?: boolean;
  loading?: boolean;
  children?: string | ReactNode | ReactNode[];
  isActive?: boolean;
}

export const Button: FC<Props> = ({
  variant,
  size,
  icon,
  shape = "rectangle",
  children,
  wide = false,
  loading = false,
  className,
  isActive = false,
  ...props
}) => {
  const iconSize = useMemo(() => {
    if (size === "small") {
      return 16;
    } else if (size === "medium") {
      return 20;
    } else {
      // large
      return 24;
    }
  }, [size]);
  return (
    <button
      disabled={loading || props.disabled}
      className={cx(
        styles.button,
        styles[variant],
        styles[size],
        styles[shape],
        {
          [styles.loading]: loading,
          [styles.disabled]: props.disabled,
          [styles.startIcon]: icon && children && icon.placement !== "end",
          [styles.endIcon]: icon && children && icon.placement === "end",
          [styles.iconOnly]: icon && !children,
          [styles.isActive]: isActive,
          [styles.wide]: wide,
        },
        className,
      )}
      {...props}
    >
      {/* placement를 입력하지 않은 경우, start에 위치하도록 적용 */}
      {icon && icon.placement !== "end" && (
        <Icon
          size={iconSize}
          icon={icon.DefaultComponent as any}
          color={icon.color}
        />
      )}
      {children}
      {icon && icon.placement === "end" && (
        <Icon
          size={iconSize}
          icon={icon.DefaultComponent as any}
          color={icon.color}
        />
      )}
    </button>
  );
};
