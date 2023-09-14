export const api_config = {
    headers: {
        "Authorization": process.env.REACT_APP_api_token
    }
}

export const language_config = {
    English:"en",
    Español:"es",
    bah:"Bahamas Creole English",
    en:"English",
    "es":"Español",
    "bah":"Bahamas Creole English",
}

export const getLanguageKey = (language) => {
    return language_config[`${language}`]
}