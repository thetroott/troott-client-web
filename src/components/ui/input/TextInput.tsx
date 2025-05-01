import { useState } from "react";
import { ITextInput } from "../../../utils/interface.util";

const TextInput = (props: ITextInput) => {
  const {
    placeholder,
    type,
    name,
    id,
    hasIcon = false,
    icon,
    defaultValue,
    autoComplete,
    className,
    showFocus,
    onChange,
    readOnly = false,
    error = false,
    helperText = "",
    color = "primary",
    onBlur,
    onFocus,
    variant = "standard",
    label,
    fullWidth = false,
    disabled = false,
    autoFocus = false,
    borderRadius,
    iconPosition,
  } = props;

  const [focused, setFocused] = useState(false);


  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const textInputClassNames = [
    "form-control",
    "border",
    hasIcon ? "pl-5" : "pl-3",
    error ? "is-invalid" : "",
    focused || showFocus ? `focus-${color}` : "",
    disabled ? "disabled" : "",
    fullWidth ? "w-100" : "",
    variant === "outlined" ? "border-2" : "",
    className || "",
  ].join(" ");

  const labelClassNames = [
    "form-label",
    "transition-all",
    "duration-200",
    "pointer-events-none",
    error ? "text-danger" : focused ? `text-${color}` : "text-gray-600",
    variant === "outlined" ? "label-outlined" : "label-standard",
  ].join(" ");

  return (
    <>
      <div
        className={`form-group ui-relative ${fullWidth ? "w-100" : ""} mrgb1`}
      >
        <div className="input-container relative">
          {label && (
            <label htmlFor={id} className={labelClassNames}>
              {label}
            </label>
          )}

          {hasIcon && (
            <span
              className={`fe ${icon}  ui-absolute input-icon brand-gray `}
            />
          )}

          <input
            id={id ? id : ""}
            type={type}
            name={name ? name : ""}
            placeholder={placeholder ? placeholder : "Type here"}
            defaultValue={defaultValue ? defaultValue : ""}
            onChange={onChange}
            autoComplete={autoComplete ? "on" : "off"}
            className={textInputClassNames}
            onFocus={handleFocus}
            onBlur={handleBlur}
            readOnly={readOnly}
            disabled={disabled}
            autoFocus={autoFocus}
            aria-describedby={helperText ? `${id}-helper-text` : undefined}
            style={{
              borderRadius: borderRadius,
            }}
          />
        </div>
        {helperText && focused && (
          <small
            id={`${id}-helper-text`}
            className="form-text text-muted"
            role={error ? "alert" : "status"}
          >
            {helperText}
          </small>
        )}
      </div>
    </>
  );
};

export default TextInput;
