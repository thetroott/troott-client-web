import { ITextArea } from "../../utils/interface.util";

const TextArea = (props: ITextArea) => {
  const {
    placeholder,
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
    disabled = false,
    ref,
    rows = 4,
    error = false,
    errorMessage,
    ariaLabel,
    minLength,
    maxLength,
  } = props;

  return (
    <div className="form-group ui-relative mrgb1">
      {hasIcon && (
        <span className={`fe ${icon} ui-absolute input-icon brand-gray`} />
      )}

      <textarea
        id={id || ""}
        ref={ref}
        name={name || ""}
        placeholder={placeholder || "Type here"}
        defaultValue={defaultValue || ""}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        aria-label={ariaLabel || placeholder || name}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete ? "on" : "off"}
        className={`form-control ${showFocus || ""} ${
          hasIcon ? "pdl3" : "pdl2"
        } font-dmsans ${className || ""}`}
        rows={rows} 
      />

      {error && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default TextArea;
