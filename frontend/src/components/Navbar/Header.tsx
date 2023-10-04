import { Grid, Container, Typography, IconButton, Button, Box } from "@mui/material";
import Logo from "./logoNav.png";
import axios from "axios";
import MenuButton from "../Button/Button";
import { useNavigate,useLocation } from "react-router-dom";
import Select from "../Select/Select";
import './Header.css'
import { Fragment, useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { header_section} from "../../utils/types";
import { REACT_APP_api_base_url } from "../../utils/url_config";
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


const Header = () => {
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedLang = queryParams.get('lang') || 'en';
  const [languageState, setLanguageState] = useState(selectedLang);

  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => () => {
    setOpen(isOpen);
  };

  const [headerState, setHeaderState] = useState(false);
  const [HeaderMenusData, setHeaderMenusData] = useState<header_section>();

  const showHeader = () => {
    setHeaderState(!headerState)
  }
  const navigate = useNavigate();

  const handleLanguageChange = (newLang) => {
    setLanguageState(newLang);
    localStorage.setItem('language', newLang);
    window.dispatchEvent(new Event('storage'));
  };

  useEffect(() => {
    if(width<=768){
      setIsMobile(true)
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener('storage', () => {
       setLanguageState(localStorage.getItem('language') || 'en')   
    });
  }, []);
  
  useEffect(() => {
    axios.get(REACT_APP_api_base_url + '/api/headers?populate=deep&locale=' + localStorage.getItem("language")).then(result => {
      setHeaderMenusData(result.data.data[0].attributes)
      return result;
    })
  }, [languageState]);

  useEffect(() => {
    if(HeaderMenusData){
      setHeaderState(true)
    }
  }, [HeaderMenusData]);

  return (
    <Fragment>
      {!isMobile ?
        <Grid container sx={{ py: 3, boxShadow:'1', background: '#ffffff' }} position="relative" zIndex="1" className="header">
            <Container maxWidth="xl">
                <Grid container spacing={2} sx={{ alignItems: 'center' }} className="responsive">
                    <Grid item className="nav-logo">
                        {HeaderMenusData?
                         <Link href="/Home"> <img className="nav" src={(REACT_APP_api_base_url || "") + HeaderMenusData?.Header_Logo.data[0].attributes.url} alt="Logo" /></Link>
                            :null
                          }
                    </Grid>
                    <Grid item className="nav-list" sx={{ mx: 'auto' }}>

                     { headerState && HeaderMenusData ?(<>
                        {HeaderMenusData?.Header_Link.map(card => {
                            return( 
                                <MenuButton 
                                className="nav-button" 
                                routeName={card.Menu_Link}
                                onClick={() => navigate(`/${card.Menu_Link}`)}
                                data-testid="header-${card.Menu_Link}"
                                >
                                {card.Link_Name}
                              </MenuButton>
                            )
                          }
                        )}
                      </>
                      ):(null)}
                    </Grid>
                    <Grid item className="language-selector">
                      <Select />
                    </Grid>
                </Grid>
            </Container>
        </Grid>
        : 
        <AppBar position="static" sx={{ py: 3, px: 3, boxShadow:'1', background: '#ffffff' }}>
            <Grid container sx={{ alignItems: 'center' }}>
                <Grid className="nav-logo">
                    {HeaderMenusData?
                     <Link href="/Home"> <img className="nav" src={(REACT_APP_api_base_url || "") + HeaderMenusData?.HeaderMobile_Logo.data.attributes.url} alt="Logo" /></Link>
                        :null
                      }
                </Grid>

                <Grid ml="auto">
                    <Button className="menu-btn" onClick={toggleDrawer(true)}>Menu <ExpandMoreIcon /></Button>
                </Grid>

            </Grid>

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                className="toggle-drawer"
            >
                <div
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >

                    <CloseIcon className="cross-icon" onClick={toggleDrawer(false)}/>

                    <Grid item className="nav-list" sx={{ mx: 'auto' }}>

                     { headerState && HeaderMenusData ?(<>
                        {HeaderMenusData?.Header_Link.map(card => {
                            return( 
                                <Box className="menu-list">
                                    <MenuButton 
                                        className="nav-button" 
                                        routeName={card.Menu_Link}
                                        onClick={() => navigate(`/${card.Menu_Link}`)}
                                        data-testid="header-${card.Menu_Link}"
                                        >
                                        {card.Link_Name}
                                    </MenuButton>
                                </Box>
                            )
                          }
                        )}
                      </>
                      ):(null)}
                    </Grid>

                    <Grid item className="language-selector">
                        <Typography textTransform="uppercase" color="#666666" mb='0.4rem'>Languages</Typography>
                        <MenuList className="language-menu">
                            <MenuItem sx={{ mb: 0, p: 0, minHeight: 'auto' }}><Link href="#" onClick={() => handleLanguageChange('en')}>English</Link></MenuItem>
                            <MenuItem sx={{ mb: 0, p: 0, minHeight: 'auto' }}><Link href="#" onClick={() => handleLanguageChange('es')}>Español</Link></MenuItem>
                            <MenuItem sx={{ mb: 0, p: 0, minHeight: 'auto' }}><Link href="#" onClick={() => handleLanguageChange('bah')}>Kreyòl Ayisyen</Link></MenuItem>
                        </MenuList>


                    </Grid>

                </div>
            </Drawer>
        </AppBar>
      }
    </Fragment>
  );
};

export default Header;
