import { ChangeEvent, RefObject } from "react";

export interface IStorage {
  keepData(key: string, data: object | string): void;
  fetchData(key: string): string | null;
  getJSON(key: string): Promise<any | null>;
  exists(key: string): Promise<boolean>;
  updateData(key: string, newData: object | string): Promise<void>;
  mergeData(key: string, newData: object): Promise<void>;
  removeData(key: string): Promise<void>;
  clearAll(): Promise<void>;
  multiKeep(items: { key: string; data: object | string }[]): Promise<void>;
  multiFetch(keys: string[]): Promise<{ [key: string]: any | null }>;
  multiRemove(keys: string[]): Promise<void>;
}

export interface IReview {
  children: React.ReactNode;
}

export interface ITitle {
  text: string;
  size?: string;
  color?: string;
  margin?: {
    top?: string;
    bottom?: string;
  };
}

export interface ITextInput {
  type: "email" | "text" | "number";
  ref?: RefObject<HTMLInputElement>;
  showFocus?: boolean;
  className?: string;
  defaultValue?: string;
  readOnly?: boolean;
  id?: string;
  hasIcon?: boolean;
  icon?: string;
  name?: string;
  placeholder?: string;
  autoComplete?: boolean;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  error?: boolean;
  helperText?: string;
  value?: string;
  color?: "primary" | "secondary"; 
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  variant?: "standard" | "outlined"; 
  label?: string;
  fullWidth?: boolean; 
  disabled?: boolean;
  autoFocus?: boolean;
  borderRadius?: string;
  iconPosition?: "left" | "right"; 
}

export interface IPasswordInput {
  ref?: RefObject<HTMLInputElement>;
  showFocus?: boolean;
  className?: string;
  defaultValue?: string;
  readOnly?: boolean;
  id?: string;
  hasIcon?: boolean;
  icon?: string;
  name?: string;
  placeholder?: string;
  autoComplete?: boolean;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  error?: boolean;
  helperText?: string;
  autoFocus?: boolean;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  borderRadius?: string;
  value?: string;
  label?: string;
  style?: React.CSSProperties;
  textColor?: string;   
  fontSize?: string;
  borderColor?: string;
}

export interface IRadioInput {
  name: string;
  options?: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  className?: string;
  id?: string;
  emailText?: string;
  phoneNumber?: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}
export interface ISelectInput {
  name: string;
  options?: {
    label: string;
    value: string;
  }[];
  defaultValue?: string;
  className?: string;
  id?: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}
export interface ITextArea {
  ref?: RefObject<HTMLTextAreaElement>;
  value?: string;
  defaultValue?: string;
  onChange(e: ChangeEvent<HTMLTextAreaElement>): void;

  placeholder?: string;
  name?: string;
  id?: string;

  rows?: number;
  autoComplete?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  hasIcon?: boolean;
  icon?: string;

  showFocus?: boolean;
  className?: string;

  error?: boolean;
  errorMessage?: string;

  ariaLabel?: string;
  minLength?: number;
  maxLength?: number;
}

export interface IButton {
  text: string;
  onClick(e: any): void;
}

export interface IIconButton {
  width?: string;
  height?: string;
  icon: {
    type: "web" | "image";
    name?: string;
    url?: string;
    width?: string;
    height?: string;
  };
}
