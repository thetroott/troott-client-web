import { IStorage,} from "./interface.util";

const keep = (key: string, data: any | string ) => {
    
    let result: string = '';

    if(typeof(data) == 'object'){
        result = JSON.stringify(data)
    } else {
        result = data
    }

    localStorage.setItem(key, result)
}


const fetch = (key: string): string | null => {
    
    const data = localStorage.getItem(key)
    return data ? data : null

}




const storage: IStorage = {
    keepData: keep,
    fetchData: fetch
}

export default storage