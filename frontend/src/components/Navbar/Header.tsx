import { Grid, Container, Typography, IconButton } from "@mui/material";
import Logo from "./logoNav.png";
import axios from "axios";
import MenuButton from "../Button/Button";
import { useNavigate,useLocation } from "react-router-dom";
import Select from "../Select/Select";
import './Header.css'
import { Fragment, useState,useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { header_section} from "../../utils/types";
import { REACT_APP_api_base_url } from "../../utils/url_config";
import Link from '@mui/material/Link';
const Header = () => {
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedLang = queryParams.get('lang') || 'en';
  const [languageState, setLanguageState] = useState(selectedLang);

  const [headerState, setHeaderState] = useState(false);
  const [HeaderMenusData, setHeaderMenusData] = useState<header_section>();
  const showHeader = () => {
    setHeaderState(!headerState)
  }
  const navigate = useNavigate();

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
      <Grid container sx={{ py: 3, boxShadow:'1', background: '#ffffff' }} position="relative" zIndex="1" className="header">
          <Container maxWidth="xl">
              <Grid container spacing={2} sx={{ alignItems: 'center' }} className="responsive">
                  <Grid item className="nav-logo">
                      {HeaderMenusData?
                       <Link href="/Home"> <img className="nav" src={(REACT_APP_api_base_url || "") + HeaderMenusData?.Header_Logo.data[0].attributes.url} alt="Logo" /></Link>
                          :null
                        }
                  </Grid>
                  <Grid item  className="nav-list" sx={{ mx: 'auto' }}>

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
    </Fragment>
  );
};

export default Header;
