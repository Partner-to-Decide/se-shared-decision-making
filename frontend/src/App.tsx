import { Routes, Route } from 'react-router-dom'
import './App.css'
// import React from "react";
// import FooterBar from './components/Footer/FooterBar'
// import Welcome from './pages/Welcome';

import Welcome from './pages/Welcome'
import Home from './pages/Home_New'
import MyStuff from './pages/MyStuff'
import MyValues from './pages/MyValues'
import MyChoices from './pages/MyChoices'
import Details from './pages/Details'
import Question from './components/Questions/Question'
import QuizResult from './components/Questions/QuizResult'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material'
import Article from './pages/Article'

//navigation bar styling, please do not remove
const majorTheme = createTheme({
  palette: {
    secondary: {
      main: '#FFFFFF',
      contrastText: '#0c3a25',
    },
    primary: {
      main: '#0C3A25',
      dark: '#000000',
      contrastText: '#fff',
    }
  },
  typography: {
    fontFamily: [
      'ClashGrotesk-Medium',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    button: {
      fontFamily: 'Public Sans',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'ClashGrotesk-Medium';
        src: local('ClashGrotesk-Medium'), local('ClashGrotesk-Medium'), url('./ClashGrotesk_Complete/ClashGrotesk_Complete/Fonts/WEB/fonts/ClashGrotesk-Medium.woff') format('woff'), url(./ClashGrotesk_Complete/ClashGrotesk_Complete/Fonts/WEB/fonts/ClashGrotesk-Medium.woff2) format('woff2');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }`,
    },
  },
})

majorTheme.typography.h2 = {
  fontSize: '3.5rem',
  fontWeight: 'normal',
  fontFamily: 'ClashGrotesk-Medium',
  lineHeight: 1,
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
    fontFamily: 'ClashGrotesk-Medium',
    fontWeight: 'normal',
    lineHeight: 1,
  },
  [majorTheme.breakpoints.up('md')]: {
    fontSize: '3.5rem',
    fontWeight: 'normal',
    fontFamily: 'ClashGrotesk-Medium',
    lineHeight: 1,
  },
};

majorTheme.typography.h3 = {
  fontSize: '2.5rem',
  fontWeight: 'normal',
  fontFamily: 'ClashGrotesk-Medium',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
    fontFamily: 'ClashGrotesk-Medium',
    fontWeight: 'normal',
  },
  [majorTheme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
    fontWeight: 'normal',
    fontFamily: 'ClashGrotesk-Medium',
  },
};

majorTheme.typography.body1 = {
  color: '#0C3A25',
  fontSize: '1rem',
  fontFamily: 'Public Sans',
}

majorTheme.typography.body2 = {
  color: '#0C3A25',
  fontSize: '1.25rem',
  lineHeight: 'initial',
  fontFamily: 'Public Sans',
}

//Routing, i.e. directing to other pages on the website, using page components and useNavigate to achieve
const Main = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={majorTheme}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Article/:id" element={<Article />} />
          <Route path="/Home/WaitingForLabor" />
          <Route path="/MyChoices" element={<MyChoices />} />
          <Route path="/MyStuff" element={<MyStuff />} />
          <Route path="/MyValues" element={<MyValues />} />
          <Route path="/question/:id" element={<Question />} />
          <Route path="/QuizResult" element={<QuizResult />} />
          <Route path="/Details" element={<Details />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}
export default Main
