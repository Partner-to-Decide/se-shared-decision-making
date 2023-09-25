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
            {footerState && FooterData?.data[0].attributes.Footer_section_data1[0]?
                <Grid item xs={3}>
                    <Box
                      component="img"
                      alt="Logo"
                      sx={{ mb: 4 }}
                      className="logo" 
                      src={
                          REACT_APP_api_base_url +
                          FooterData?.data[0].attributes.Footer_section_data1[0].Footer_Logo.data[0].attributes.url
                        }
                    />
                   {footerState && FooterData?.data[0].attributes.Footer_section_data1[0].Footer_link?
                    <MenuList className="footer-menu">
                     {FooterData?.data[0].attributes.Footer_section_data1[0].Footer_link.map((item) => (
                        <MenuItem sx={{ mb: 2.5, p: 0 }}><Link href={'/'+item.Link_url} style={{ color: '#fff' }}>{item.Link_Name}</Link></MenuItem>
                       ))}
                    </MenuList>
                    : null }
                      <Link className="btn white-btn" href={FooterData?.data[0].attributes.Footer_section_data1[0].ButtonLink}>{FooterData?.data[0].attributes.Footer_section_data1[0].ButtonText}</Link>
                </Grid>
                 :
                 null
               }
                <Grid item xs={1}></Grid>
                {footerState && FooterData?.data[0].attributes.Footer_Decision_Aid[0]?
                <Grid item xs={3}>
                  <Typography className="footer-title" variant="h4" gutterBottom>{FooterData?.data[0].attributes.Footer_Decision_Aid[0].MenuHeading}</Typography>
                   <MenuList className="footer-menu">
                      {FooterData?.data[0].attributes.Footer_Decision_Aid[0].Footer_link.map((item, index) => (
                        [
                          <MenuItem key={index} sx={{ mb: 2.5, p: 0 }}>
                            <Link href={'/' + item.Link_url} style={{ color: '#fff' }}>
                              {item.Link_Name}
                            </Link>
                          </MenuItem>,
                          item.Divider === true ? (
                            <Divider className="footer-divider" key={`divider-${index}`} sx={{ borderColor: '#DFF0D8' }} />
                          ) : null,
                        ]
                      ))}
                    </MenuList>
                </Grid>
                  :
                 null
               }
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
