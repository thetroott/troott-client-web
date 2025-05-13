import { useState } from "react";
import type { IPasswordInput } from "../../../utils/interface.util";
import { Link } from "react-router-dom";

const PasswordInputt = (props: IPasswordInput) => {
  const {
    placeholder,
    name,
    id,
    ref,
    hasIcon = false,
    icon = "fe-user",
    defaultValue,
    autoComplete,
    className,
    showFocus,
    onChange,
    error,
    helperText,
    autoFocus = false,
    onFocus,
    onBlur,
    disabled = false,
    readOnly = false,
    borderRadius,
    value,
    label,

  } = props;

  const [passwordType, setPasswordType] = useState<string>("password");
  const [focused, setFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const toggleType = (e?: any) => {
    if (e) {
      e.preventDefault();
    }
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const inputClassNames = [
    "form-group",
    "form-control-lg",
    hasIcon ? "ps-5" : "ps-3",
    "pe-5",
    "shadow-none",
    "border",
    "position-relative",
    disabled ? "disabled bg-light" : "",
    error ? "is-invalid border-danger" : "",
    focused ? "border-primary" : "",
    className || "",
  ].join(" ");

  const labelClassNames = [
    "form-label",
    "mb-1",
    "transition",
    error ? "text-danger" : focused ? "text-primary" : "text-muted",
  ].join(" ");

  return (
    <div className="password-input-wrapper position-relative mb-3">
      {label && (
        <label htmlFor={id} className={labelClassNames}>
          {label}
        </label>
      )}


      <div className="position relative">
        {hasIcon && (
          <span className="position-absolute start-0 top-50 translate-middle-y ps-3 text-muted">
            <i className={`fe ${icon}`}></i>
          </span>
        )}

        <input
          ref={ref}
          id={id || ""}
          name={name || ""}
          type={passwordType}
          placeholder={placeholder || "Type here"}
          defaultValue={defaultValue || ""}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete={autoComplete ? "on" : "off"}
          className={inputClassNames}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          style={{
            borderRadius: borderRadius || "0.5rem",
            transition: "all 0.2s ease-in-out",
            color: props.textColor && props.borderColor,
            fontSize: props.fontSize
          }}
        />

        <Link onClick={(e) => toggleType(e)} to="">
          <span
            className={`fe fe-${
              passwordType === "password" ? "eye" : "eye-off"
            } ui-absolute eye-icon brand-gray`}
          ></span>
        </Link>
      </div>

      {helperText && focused && (
        <div
          className={`form-text small mt-1 ${
            error ? "text-danger" : "text-muted"
          }`}
          role={error ? "alert" : "status"}
        >
          {helperText}
        </div>
      )}

      <style>
        {`
        .password-input-wrapper {
  min-height: 80px;
}

.transition {
  transition: all 0.2s ease-in-out;
}

input.form-control:focus {
          border-color: #1d79ff !important;
          box-shadow: none;
        }

.form-control:focus {
  border-color: var(--bs-primary);
  box-shadow: none;
}

.form-control.is-invalid:focus {
  border-color: var(--bs-danger);
  box-shadow: none;
}


.form-text {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.25rem;
  opacity: 0;
  transition: all 0.2s ease-in-out;
}

.form-text:not(:empty) {
  opacity: 1;
  transform: translateY(0);
}

.eye-icon {
  right: 1.2rem;
  top: 60.5%;

  transform: translateY(-50%);
          cursor: pointer;
          z-index: 2;
}
`}
      </style>

      
    </div>
  );
};

export default PasswordInputt;
