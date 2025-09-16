import CookieService from "../services/cookie";
import IdempotentService  from "../services/idempotent";
import { HeaderType } from "./enums.util";
import type { IStorage } from "./interfaces.util";

const storeAuth = (token: string, id: string) => {
    
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);

    CookieService.setData({
        key: 'token',
        payload: token,
        expireAt: new Date( Date.now() + 24 * 60 * 60 * 1000 ),
        path: '/'
    })

    CookieService.setData({
        key: 'userId',
        payload: id,
        expireAt: new Date( Date.now() + 24 * 60 * 60 * 1000 ),
        path: '/'
    })
}

const checkToken = () => {
    return localStorage.getItem('token') ? true : false;
}

const getToken = () => {
    return localStorage.getItem('token');
}

const checkUserID = () => {
    return localStorage.getItem('userId') ? true : false;
}

const getUserID = () => {
    const uid = localStorage.getItem('userId');
    return uid ? uid : '';
}

const checkUserEmail = () => {
    return localStorage.getItem('user-email') ? true : false;
}

const getUserEmail = () => {
    return localStorage.getItem('user-email');
}

const getConfig = () => {

    const config = {
        headers: {
            "Content-Type": 'application/json',
            lg: 'en',
            ch: 'web'
        }
    }

    return config;

}

const getConfigWithBearer = () => {

    const config: any = {
        headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${getToken()}`,
            lg: 'en',
            ch: 'web'
        }
    }

    config.headers[HeaderType.IDEMPOTENT] = IdempotentService .getRequestKey();

    return config;

}

const clearAuth = () => {
    
    if(checkToken() && checkUserID()){
        localStorage.clear();
        CookieService.removeData({ key: 'token' });
        CookieService.removeData({ key: 'userId' })
        CookieService.removeData({ key: 'userType' })
    }
}

const keep = (key: string, data: any) => {

    if(data && data !== undefined && data !== null){
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }else{
        return false
    }
    
}

const keepLegacy = (key: string, data: any) => {

    if(data){
        localStorage.setItem(key, data);
        return true;
    }else{
        return false
    }
    
}

const fetch = (key: string) => {

    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

const fetchLegacy = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? data : null;
}

const deleteItem = (key: string, legacy: boolean = false) => {
    
    let data; 

    if(legacy && legacy === true){
        data = localStorage.getItem(key);
    }else{
        data = fetch(key);
    }

    if(data && data !== null && data !== undefined){
        localStorage.removeItem(key)
        return true;
    }else{
        return false;
    }
}

const trimSpace = (str: string) => {
    return str.replace(/\s/g, '');
}

const copyCode = (code: string) => {
    
    if(code !== '' && code !== undefined && typeof(code) === 'string'){
        navigator.clipboard.writeText(code);
        return true;
    }else{
        return false;
    }
}

const storage: IStorage = {

    storeAuth: storeAuth,
    checkToken: checkToken,
    getToken: getToken,
    checkUserID: checkUserID,
    getUserID: getUserID,
    checkUserEmail: checkUserEmail,
    getUserEmail: getUserEmail,
    getConfig: getConfig,
    getConfigWithBearer: getConfigWithBearer,
    clearAuth: clearAuth,
    keep: keep,
    keepLegacy: keepLegacy,
    fetch: fetch,
    fetchLegacy: fetchLegacy,
    deleteItem: deleteItem,
    trimSpace: trimSpace,
    copyCode: copyCode

}

export default storage;