import type { JSX } from "react";
import type { LoadingType, RouteActionType, RouteParamType } from "./types.util";


export interface IStorage {
    storeAuth(token: string, id: string): void,
    checkToken(): boolean,
    getToken(): string | null,
    checkUserID(): boolean,
    getUserID(): string,
    checkUserEmail(): boolean,
    getUserEmail(): string | null,
    getConfig(): any,
    getConfigWithBearer(): any,
    clearAuth(): void,
    keep(key: string, data: any): boolean,
    keepLegacy(key: string, data: any): boolean,
    fetch(key: string): any,
    fetchLegacy(key: string): any,
    deleteItem(key: string, legacy?: boolean): void,
    trimSpace(str: string): void,
    copyCode(code: string): void
}

export type RouteType = {
    path: string;
    element: JSX.Element;
    roles?: string[];
    children?: RouteType[]
  };

  export interface IFallbackandError {
    element: JSX.Element
    fallbackUI?: React.ReactNode;
    errorUI?: React.ReactNode; 
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

export interface IAPIResponse {
    error: boolean,
    errors: Array<any>,
    count?: number,
    total?: number,
    pagination?: IPagination,
    data: any,
    message: string,
    token?: string,
    status: number
}



export interface IPagination {
    next: { page: number, limit: number },
    prev: { page: number, limit: number },
}



export interface ISetLoading {
    option: LoadingType,
    type?: string
}

export interface IUserPermission {
    entity: string,
    actions: Array<string>
}

export interface IUnsetLoading {
    option: LoadingType,
    type?: string,
    message: string
}

export interface ISidebarProps {
    collapsed: boolean,
    route: IRouteItem,
    inroutes: Array<IInRoute>,
    subroutes: Array<IRouteItem>,
    isOpen: boolean
}


export interface ISetCookie {
    key: string,
    payload: any,
    expireAt?: Date,
    maxAge?: number,
    path?: string
}

export interface IGetCookie {
    key: string,
    parse?: boolean
}

export interface IRemoveCookie {
    key: string,
    parse?: boolean
}

export interface IRouteParam {
    type: RouteParamType,
    name: string,
    value?: string
}

export interface IRouteItem {
    name: string,
    title?: string,
    url: string,
    isAuth: boolean,
    iconName?: string,
    action?: RouteActionType,
    content: {
        backButton?: boolean,
        collapsed?: boolean
    }
    params?: Array<IRouteParam>
}

export interface IInRoute extends IRouteItem {
    route: string,
    parent: string,
}

export interface IRoute extends IRouteItem {
    subroutes?: Array<IRouteItem>
    inroutes?: Array<IInRoute>
}


export interface IFileUpload {
    raw: any,
    base64: string,
    parsedSize: number,
    name: string,
    size: number,
    type: string,
    dur: number
}