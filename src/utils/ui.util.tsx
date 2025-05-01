import { ChangeEvent } from "react";


export interface IPasswordField {
    label?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    autoComplete?: string;
    placeholder?: string;
    autoFocus?: boolean;
    fullWidth?: boolean;
    borderRadius?: string | number;
    color?: string;
    [key: string]: any; 
  }

  export interface IEmailField {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    fullWidth?: boolean;
    borderRadius?: string | number;
    color?: string;
    [key: string]: any; // allows extension
  }
  