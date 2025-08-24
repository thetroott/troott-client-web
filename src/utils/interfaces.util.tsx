import type { JSX, ReactNode } from "react";
import type {
  LoadingType,
  RouteActionType,
  RouteParamType,
} from "./types.util";

export interface IStorage {
  storeAuth(token: string, id: string): void;
  checkToken(): boolean;
  getToken(): string | null;
  checkUserID(): boolean;
  getUserID(): string;
  checkUserEmail(): boolean;
  getUserEmail(): string | null;
  getConfig(): any;
  getConfigWithBearer(): any;
  clearAuth(): void;
  keep(key: string, data: any): boolean;
  keepLegacy(key: string, data: any): boolean;
  fetch(key: string): any;
  fetchLegacy(key: string): any;
  deleteItem(key: string, legacy?: boolean): void;
  trimSpace(str: string): void;
  copyCode(code: string): void;
}

export type RouteType = {
  path: string;
  element: JSX.Element;
  roles?: string[];
  children?: RouteType[];
};

export interface IFallbackandError {
  element: JSX.Element;
  fallbackUI?: React.ReactNode;
  errorUI?: React.ReactNode;
}

export interface IForm extends React.ComponentProps<"form"> {
  className?: string;
  email?: string;
  onStepChange?: (step: "email" | "otp" | "success") => void;
  onSuccess?: () => void;
  onResend?: () => void;
}
export interface IAuthLayout {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showLogo?: boolean;
  showCopyright?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg";
  backgroundImage?: string;
  className?: string;
  hideHeaderOnSuccess?: boolean;
}

export interface IRegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface ILoginrFormErrors {
  email?: string;
  password?: string;
}

export interface IOtpFormErrors {
  otp?: string;
}

export interface IForgotPwdFormErrors {
  email?: string;
  otp?: string;
}
export interface IResetPwdFormErrors {
  password?: string;
  confirmPassword?: string;
}

export interface IChangePwdFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface ICopyright {
  year?: number;
  company?: string;
  className?: string;
}

export interface IAPIResponse {
  error: boolean;
  errors: Array<any>;
  count?: number;
  total?: number;
  pagination?: IPagination;
  data: any;
  message: string;
  token?: string;
  status: number;
}

export interface IPagination {
  next: { page: number; limit: number };
  prev: { page: number; limit: number };
}

export interface ISetLoading {
  option: LoadingType;
  type?: string;
}

export interface IUserPermission {
  entity: string;
  actions: Array<string>;
}

export interface IUnsetLoading {
  option: LoadingType;
  type?: string;
  message: string;
}

export interface ISidebarProps {
  collapsed: boolean;
  route: IRouteItem;
  inroutes: Array<IInRoute>;
  subroutes: Array<IRouteItem>;
  isOpen: boolean;
}

export interface ISetCookie {
  key: string;
  payload: any;
  expireAt?: Date;
  maxAge?: number;
  path?: string;
}

export interface IGetCookie {
  key: string;
  parse?: boolean;
}

export interface IRemoveCookie {
  key: string;
  parse?: boolean;
}

export interface IRouteParam {
  type: RouteParamType;
  name: string;
  value?: string;
}

export interface IRouteItem {
  name: string;
  title?: string;
  url: string;
  isAuth: boolean;
  iconName?: string;
  action?: RouteActionType;
  content: {
    backButton?: boolean;
    collapsed?: boolean;
  };
  params?: Array<IRouteParam>;
}

export interface IInRoute extends IRouteItem {
  route: string;
  parent: string;
}

export interface IRoute extends IRouteItem {
  subroutes?: Array<IRouteItem>;
  inroutes?: Array<IInRoute>;
}

export interface IState {
  code: string;
  name: string;
  subdivision: string;
}

export interface ITimezone {
  name: string;
  label: string;
  displayName: string;
  countries: Array<string>;
  utcOffset: string;
  utcOffsetStr: string;
  dstOffset: string;
  dstOffsetStr: string;
  aliasOf: string;
}
export interface ICountry {
  name: string;
  code2: string;
  code3: string;
  capital: string;
  region: string;
  subregion: string;
  currencyCode: string;
  currencyImage: string;
  phoneCode: string;
  flag: string;
}
export interface IFileUpload {
  raw: any;
  base64: string;
  parsedSize: number;
  name: string;
  size: number;
  type: string;
  dur: number;
}

export interface IResult {
  error: boolean;
  message: string;
  code: number;
  data: any;
}

export interface IUserLocation {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string | null;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

export interface ILegalNameInput {
  id?: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  label?: string;
  className?: string;
}

export interface IDOBPicker {
  label?: string;
  id?: string;
  className?: string;
}

export interface IOnboarding {
  step?: string
}


export interface IconRadioOption {
  label: string
  value: string
  icon: ReactNode
}

export interface IconRadioGroupProps {
  options: IconRadioOption[]
  value: string
  onChange: (val: string) => void
  className?: string
}

export interface ICountrySelect {
  value?: ICountry | null;
  onChange?: (country: ICountry) => void;
}

// Upload Interfaces
export interface IUploadStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

export interface ISermonUpload {
  file?: File | null;
  title: string;
  description: string;
  tags: string[];
  thumbnail?: File | null;
  thumbnailPreview?: string | null;
  category: string;
  isPublic: boolean;
  scheduledDate?: Date | null;
}

export interface IUploadFormErrors {
  file?: string;
  title?: string;
  description?: string;
  tags?: string;
  thumbnail?: string;
  category?: string;
}

export interface IUploadContext {
  currentStep: string;
  uploadData: ISermonUpload;
  errors: IUploadFormErrors;
  isLoading: boolean;
  progress: number;
  uploadComplete: boolean;
}

export interface IFileUploadZone {
  onFileSelect: (file: File | null) => void;
  acceptedTypes: string[];
  maxSize: number;
  error?: string;
  isLoading?: boolean;
}
