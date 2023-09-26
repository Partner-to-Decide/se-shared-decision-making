export const api_config = {
    headers: {
        "Authorization": process.env.REACT_APP_api_token
    }
}

export const language_config = {
    English:"en",
    Español:"es",
    bah:"Kreyòl ayisyen",
    bah:"Portuguese",
    vi:"Vietnamese",
    zh:"Chinese",
    ar:"Arabic",
    en:"English",
    "es":"Español",
    "bah":"Kreyòl ayisyen",
    "es":"Portuguese",
    "vi":"Vietnamese",
    "zh":"Chinese",
    "ar":"Arabic",
    
}

export const getLanguageKey = (language) => {
    return language_config[`${language}`]
}