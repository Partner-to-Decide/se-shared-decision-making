import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getLanguageKey, language_config} from "../../utils/axios_config";
import { store } from "../../redux/store";
import { useLocation } from 'react-router-dom';
export default function BasicSelect() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedLang = queryParams.get('lang') || 'en';

  const [lang, setlang] = React.useState<string>(selectedLang);

  const handleChange = (event: SelectChangeEvent) => {
    setlang(event.target.value as string);
  };

  //Used for the dropdown button in the navigation menu, to be a trigger for Strapi content, i.e. when Spanish selected, switches to Spanish version, etc.
  
  React.useEffect(() => {
    localStorage.setItem("language", lang!);
    window.dispatchEvent(new Event('storage'))
  }, [lang]);

  React.useEffect(() => {
    if(localStorage.getItem("language") != null){
      console.log("not null")
      setlang(localStorage.getItem("language")!)
    }else{
      console.log("is null")
    }
  },[])

  return (
    <Box sx={{ minWidth: 120 }}>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={lang}
        onChange={handleChange}
      >
        <MenuItem value={"en"}>English</MenuItem>
        <MenuItem value={"es"}>Español</MenuItem>
        <MenuItem value={"bah"}>Kreyòl ayisyen</MenuItem>
        <MenuItem value={"pt-BR"}>Portuguese</MenuItem>
        <MenuItem value={"vi"}>Vietnamese</MenuItem>
        <MenuItem value={"zh"}>Chinese</MenuItem>
        <MenuItem value={"ar"}>Arabic</MenuItem>
      </Select>
    </Box>
  );
}
