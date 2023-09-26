import Layout from "../components/Layout";
import "./pageStyle/MyValues.css"
//import "../ClashGrotesk_Complete/Fonts/WEB/css/clash-grotesk.css"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Divider, Grid, Container, ThemeProvider, Typography, Stack, Button } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

export default function MyValues() {
  return (
    <StyledEngineProvider injectFirst>
      <Layout>
        <Grid
            container
            columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            bgcolor="#F4FCF0"
            pt="15rem"
            pb="15rem"
            className="my-value-main"
            >
            <Container maxWidth="sm">
                <Typography variant="h2" color="primary.main">
                    Your values, <br/>your choices!
                </Typography>

                <div>
                    <p className="QuizIntro">Reflect on what is most important to you. Answer six short questions and use the to talk to your provider.</p>
                </div>
                <div>
                    <Link to="/question/1">
                      <button className="Begin">
                        Begin
                      </button>
                    </Link>
                </div>
            </Container>
        </Grid>
      </Layout>
    </StyledEngineProvider>
  );
}
