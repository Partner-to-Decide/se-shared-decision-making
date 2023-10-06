import LayoutNested from "../components/LayoutNested";
import "./pageStyle/MyValues.css"
//import "../ClashGrotesk_Complete/Fonts/WEB/css/clash-grotesk.css"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Box, Divider, Grid, Container, ThemeProvider, Typography, Stack, Button } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

export default function MyValues() {
  const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const selectedLang = queryParams.get('lang') || localStorage.getItem('language') || 'en';
let lang = 'en'; 
if (selectedLang === 'en') {
  lang = 'en';
} else if(selectedLang === 'es') {
  lang = 'es';
}else{
  lang = 'bah';
}
const url = `/question/${lang === 'en' ? 1 : lang === 'es' ? 7 : 8}`;
  return (
    <StyledEngineProvider injectFirst>
      <LayoutNested>
        <Grid
            container
            columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            bgcolor="#F4FCF0"
            pt="15rem"
            pb="15rem"
            className="my-value-main"
            >
            <Container maxWidth="sm">
            <Grid className="my-value-content">
                <Typography variant="h2" color="primary.main">
                    Your values, <br/>your choices!
                </Typography>

                <div>
                    <p className="QuizIntro">Reflect on what is most important to you. Answer six short questions and use the to talk to your provider.</p>
                </div>
                <div>
                    <Link to={url} style={{ marginTop: '1rem', display: 'inline-block' }}>
                      <button className="Begin">
                        Begin
                      </button>
                    </Link>
                </div>
                </Grid>
            </Container>
        </Grid>
      </LayoutNested>
    </StyledEngineProvider>
  );
}
