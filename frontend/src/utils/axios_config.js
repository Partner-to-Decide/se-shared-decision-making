export const api_config = {
    headers: {
        "Authorization": process.env.REACT_APP_api_token
    }
}

export const language_config = {
    English:"en",
    Español:"es",
    bah:"Kreyòl ayisyen",
    en:"English",
    "es":"Español",
    "bah":"Kreyòl ayisyen",
}

export const getLanguageKey = (language) => {
    return language_config[`${language}`]
}