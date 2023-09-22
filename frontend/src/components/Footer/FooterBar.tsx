import React from 'react'
import axios from "axios";
import './FooterStyles.css'
import LogoDark from './logo.png'
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Fragment, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { footer_section} from "../../utils/types";
import { REACT_APP_api_base_url } from "../../utils/url_config";
const FooterBar = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedLang = queryParams.get('lang') || 'en';
  const [lang, setlang] = React.useState<string>(selectedLang);

  const [footerState, setFooterState] = useState(false);
  const [FooterData, setFooterData] = useState<footer_section>();

  const handleLanguageChange = (newLang) => {
    setlang(newLang);
    localStorage.setItem('language', newLang);
    window.dispatchEvent(new Event('storage'));
  };

  React.useEffect(() => {
    localStorage.setItem("language", lang!);
    window.dispatchEvent(new Event('storage'))
    console.log(localStorage.getItem("language"))
  }, [lang]);

  React.useEffect(() => {
    if(localStorage.getItem("language") != null){
      console.log("not null")
      setlang(localStorage.getItem("language")!)
    }else{
      console.log("is null")
    }
  },[])

  useEffect(() => {
    axios.get(REACT_APP_api_base_url + '/api/footers?populate=deep&locale=' + localStorage.getItem("language")).then(result => {
      console.log(result.data,'result.data')
      setFooterData(result.data)
      return result;
    })
  }, [lang]);

  useEffect(() => {
    if(FooterData){
      setFooterState(true)
    }
  }, [FooterData]);

  return (
    <div>
      <div className="allFooter">
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Box
                      component="img"
                      alt="Logo"
                      sx={{ mb: 4 }}
                      className="logo" 
                      src="https://se-shared-decision-making-production.up.railway.app/uploads/footer_logo_c45b8e39fd.png"
                    />
                    <MenuList className="footer-menu">
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href="/" style={{ color: '#fff' }}>Website</Link></MenuItem>
                        <MenuItem sx={{ mb: 4, p: 0 }}><Link href="/" style={{ color: '#fff' }}>Contact Us</Link></MenuItem>
                    </MenuList>
                    <Button sx={{ background: 'white', fontSize: '18px', borderRadius: '30px', padding: '0.7rem 1.3rem', textTransform: 'inherit' }}>Support Us</Button>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <Typography className="footer-title" variant="h4" gutterBottom>Induction Decision Aid</Typography>
                    <MenuList className="footer-menu">
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href="/Home" style={{ color: '#fff' }}>Home</Link></MenuItem>
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href="/MyChoices" style={{ color: '#fff' }}>My Choices</Link></MenuItem>
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href="/MyValues" style={{ color: '#fff' }}>My Values</Link></MenuItem>
                        <MenuItem sx={{ mb: 3, p: 0 }}><Link href="/MyStuff" style={{ color: '#fff' }}>My Stuff</Link></MenuItem>
                        <Divider sx={{ borderColor: '#DFF0D8'}} />
                        <MenuItem sx={{ mt: 3, mb: 2.5, p: 0 }}><Link href="/" style={{ color: '#fff' }}>Wait for Labor</Link></MenuItem>
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href="/" style={{ color: '#fff' }}>41-42 Week Induction</Link></MenuItem>
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href="/" style={{ color: '#fff' }}>39-41 Week Induction</Link></MenuItem>
                    </MenuList>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={3}>
                    <Typography className="footer-title" variant="h4" gutterBottom>Download a PDF</Typography>
                    <MenuList className="footer-menu">
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href="#" style={{ color: '#fff' }} onClick={() => handleLanguageChange('en')}>English</Link></MenuItem>
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href="#" style={{ color: '#fff' }} onClick={() => handleLanguageChange('es')}>Español</Link></MenuItem>
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href="#" style={{ color: '#fff' }} onClick={() => handleLanguageChange('bah')}>Kreyòl Ayisyen</Link></MenuItem>
                    </MenuList>
                </Grid>
            </Grid>       
        </Container>
      </div>
    </div>
  )
}
export default FooterBar
