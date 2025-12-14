import React, { forwardRef } from "react";
import styles from "./TextField.module.scss";
import cx from "clsx";
import { HelperText } from "../HelperText";
import { DefaultTextFieldProps } from "./DefaultTextFieldProps";
import { Textarea, TextareaFieldProps } from "../Textarea";
import { Typography } from "@ui/components/Typography";

export type MultilineTextFieldProps = DefaultTextFieldProps &
  TextareaFieldProps;

export const MultilineTextField = forwardRef(
  (
    {
      helperMessage,
      errorMessage,
      error,
      labelComponent,
      classes,
      ...props
    }: MultilineTextFieldProps,
    ref: any,
  ) => {
    return (
      <div
        className={cx(
          styles.container,
          styles.multilineTextfield,
          props.className,
        )}
      >
        <Textarea
          {...props}
          name={props.name}
          value={props.value}
          className={classes?.input}
          error={error}
          ref={ref}
        />

        {(labelComponent || helperMessage || (error && errorMessage)) && (
          <div
            className={cx(styles.label, { [styles.flexEnd]: !labelComponent })}
          >
            <Typography
              variant="b14-bold"
              color="gray-5"
              className={styles.label}
            >
              {labelComponent}
            </Typography>
            {((error && errorMessage) || helperMessage) && (
              <HelperText
                placement="bottom"
                error={error}
                message={error && errorMessage ? errorMessage : helperMessage}
              />
            )}
          </div>
        )}
      </div>
    );
  },
);
