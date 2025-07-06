import countries from "world-countries"
import type { ICountry } from "./interfaces.util";

const sortData = (data: Array<any>, filter: string = ''): Array<any> => {

    let sorted: Array<any> = [];

    if (filter !== '') {

        sorted = data.sort((a, b) => {
            if (a[filter].toString() < b[filter].toString()) { return -1 }
            else if (a[filter].toString() > b[filter].toString()) { return 1 }
            else { return 0 }
        })
    }

    if (filter === '') {

        sorted = data.sort((a, b) => {
            if (a.toString() < b.toString()) { return -1 }
            else if (a.toString() > b.toString()) { return 1 }
            else { return 0 }
        })
    }

    return sorted;
}


const getCountry = (code: string): ICountry | null => {

    let result: ICountry | null = null;
    const countries: Array<ICountry> = readCountries();

    if (countries.length > 0) {

        const country = countries.find((x) => x.code2 === code);

        if (country) {
            result = country
        }
    }

    return result;

}



const readCountries = (): Array<ICountry> => {
    const result: Array<ICountry> = countries.map((country) => ({
        name: country.name.common,
        code2: country.cca2,
        code3: country.cca3,
        capital: country.capital?.[0] || "",
        region: country.region,
        subregion: country.subregion,
        currencyCode: Object.keys(country.currencies || {})[0] || "",
        currencyImage: "", // set manually or map later
        phoneCode: `${country.idd.root || ''}${country.idd.suffixes?.[0] || ''}`,
        flag: `/images/flags/${country.cca2.toLowerCase()}.svg`
        // flag: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`
    }));

    return sortData(result, 'name');
}

const listCountries = () => {

    let result: Array<{ code: string, name: string, phone: string }> = [];
    const countries: Array<ICountry> = readCountries();

    if (countries.length > 0) {

        result = countries.map((x) => {

            let phone = x.phoneCode ? x.phoneCode : '';
            if(x.phoneCode && x.phoneCode.includes('-')){
                phone = '+' + x.phoneCode.substring(3)
            }

            return {
                code: x.code2,
                name: x.name,
                phone: phone
            }
        })

        result = result.filter((x) => x.phone !== '')

    }

    return result

}

export {
    sortData,
    getCountry,
    readCountries,
    listCountries,
}