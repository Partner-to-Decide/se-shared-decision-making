import "./pageStyle/Home.scss"
import Layout from "../components/Layout";
import { CardContent, Container, Grid, responsiveFontSizes, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { section_data, home_choice_section, home_info_section, decision_aid_section,home_about_section} from "../utils/types";
import { Box } from "@mui/system";
import Card from '@mui/material/Card';
import { Fragment } from "react";
import Progress from "../components/Graphics/Progress";
import {Accordion, AccordionDetails, AccordionSummary,Link} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { REACT_APP_api_base_url } from "../utils/url_config";

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';

export default function Home() {
  // Home page still requires CSS styling to make responsiveness (ideally using bootsrap of grids), for testing use the Chrome inspection tools for diff devices
  //makes call to Strapi api, however pls check to make sure directory is still accurate
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedLang = queryParams.get('lang') || 'en';

  const [mainSectionData, setMainSectionData] = useState<section_data>();
  const [choiceSectionData, setChoiceSectionData] = useState<home_choice_section>();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [infoSectionData, setInfoSectionData] = useState<home_info_section[]>([]);
  const [selectedInfoSectionData, setSelectedInfoSectionData] = useState<home_info_section>();
  const [infoSectionLoaded, setInfoSectionLoaded] = useState(false);
  const [decisonAidSection, setDecisonAidSection] = useState<decision_aid_section>();
  const [decisionSectionLoaded, setDecisionSectionLoaded] = useState(false);
  const [aboutSection, setAboutSection] = useState<home_about_section>();
  const [aboutSectionLoaded, setAboutSectionLoaded] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [languageState, setLanguageState] = useState(selectedLang);
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);

  useEffect(() => {
    if(width<=768){
      setIsMobile(true)
    }
  }, [width]);

  useEffect(() => {
    // Sets the language at page load. If no language in local storage then uses english by default
    window.addEventListener('storage', () => {
       setLanguageState(localStorage.getItem('language') || 'en')   
    });
  }, []);

  useEffect(() => {

    axios.get(REACT_APP_api_base_url + '/api/homes?populate=deep&locale=' + localStorage.getItem("language")).then(result => {
      setMainSectionData(result.data.data[0].attributes.hero)
      return result;
    })

    axios.get(REACT_APP_api_base_url + '/api/home-choice-sections?populate=deep&locale=' + localStorage.getItem("language")).then(result => {
      setChoiceSectionData(result.data.data[0].attributes)
      return result;
    })

    axios.get(REACT_APP_api_base_url + '/api/decisions-aid-sections?&populate=deep&locale='+localStorage.getItem("language")).then(result => {
      setDecisonAidSection(result.data.data[0].attributes)
    })

    axios.get(REACT_APP_api_base_url + '/api/home-about-sections?&populate=deep&locale='+localStorage.getItem("language")).then(result => {
      setAboutSection(result.data.data[0].attributes)
    })

  }, [languageState]);

  useEffect(() => {

    if(mainSectionData && choiceSectionData){
      setDataLoaded(true);
      axios.get(REACT_APP_api_base_url + '/api/information-sections?&populate=deep&locale=en').then(result => {
        setInfoSectionData(result.data.data[0].attributes.Information_Section_Data);
      })
    }

  }, [mainSectionData, choiceSectionData]);

  useEffect(() => {

    if(infoSectionData.length>0){
      setInfoSectionLoaded(true);
      setSelectedInfoSectionData(infoSectionData[0]);
    }

  }, [infoSectionData]);

  const getSelection = (data:home_info_section[], matchTitle:string):home_info_section => {
    return data.filter((element) => element.Information_Short_Title == matchTitle)[0]
  }

  useEffect(() => {

    if(decisonAidSection){
      setDecisionSectionLoaded(true)
    }

  }, [decisonAidSection]);


  useEffect(() => {
    if(aboutSection){
      setAboutSectionLoaded(true)
    }
  }, [aboutSection]);


  const changeSelection = (title:string) => {
    setSelectedInfoSectionData(getSelection(infoSectionData, title))
  }

  const WhiteStyleButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: '#0C3A25',
    backgroundColor: 'white',
    borderRadius: '20px',
    px: 3,
    py: 1,
    textTransform: 'capitalize', 
    fontSize: '1.125rem',
    '&:hover': {
      backgroundColor: '#F4FCF0',
    },
  }));

  return (
    <Layout>
      <Grid container sx={{minHeight:'100vh'}}>

        {dataLoaded?
          (
            <Fragment>
            {!isMobile?
                <Grid container className="hero_container" sx={{ pt: 10, pb: 10 }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={7} sx={{ position: 'relative' }}>
                                <Box className="textBox" sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', paddingRight: '4rem', paddingTop: '1rem'}}>
                                    <Typography sx={{ fontWeight:500, fontSize:'56px'}} variant="h2" className="title_text" color="primary" gutterBottom>
                                      {mainSectionData?.data.attributes.Hero_Title}
                                    </Typography>
                                    <Typography sx={{width:'60%', alignSelf:'flex-start', fontWeight:400, fontSize:'20px', fontFamily:'Public Sans', lineHeight:'28px'}} className="description_text" color="primary" gutterBottom>
                                      {mainSectionData?.data.attributes.Hero_Description}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                {mainSectionData?
                                    <img className="hero_image" src={(REACT_APP_api_base_url || "") + mainSectionData.data.attributes.Hero_Image.data.attributes.url} alt="" />
                                    :null
                                }
                            </Grid>
                        </Grid>

                    </Container>
                </Grid>
              :
              <Grid className="hero_container" container sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'3rem 1.3rem'}}>
                <Grid container sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
                  <Box className="textBox" sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} component={Container}>
                    <Typography sx={{ fontWeight:500, fontSize:'36px'}} variant="h2" className="title_text" color="primary" gutterBottom>
                        {mainSectionData?.data.attributes.Hero_Title}
                    </Typography>
                    <Typography sx={{ fontWeight:400, fontSize:'16px', fontFamily:'Public Sans', lineHeight:'24px'}} className="description_text" color="primary.dark" gutterBottom>
                      {mainSectionData?.data.attributes.Hero_Description}
                    </Typography>
                  </Box>
                  {mainSectionData?
                      <img className="hero_image" src={(REACT_APP_api_base_url || "") + mainSectionData.data.attributes.Hero_Image.data.attributes.url} alt="" />
                      :null
                  }
                </Grid>
              </Grid>
            }
            </Fragment>
          )
          :null
        }

        {dataLoaded && choiceSectionData?
          (
            <Fragment>
              {!isMobile?
                
                <Grid container sx={{ pt: 10, pb: 10, backgroundColor: '#0C3A25' }}>
                    <Container maxWidth="lg">
                        <Typography data-testid="choice-title" variant="h2" color="primary.contrastText" sx={{ mb: 6 }}>
                            {choiceSectionData?.Title}
                        </Typography>

                        <Grid container spacing={3} sx={{}}>
                          {choiceSectionData?.Fact_Card_Content.map(card => {
                            return(
                                <Grid item xs={4}>
                                  <Card variant="outlined" sx={{background:'#F4FCF0', borderRadius:'12px', padding:'0', height: '100%'}}>
                                    <CardContent sx={{ p: 0, display:"flex", flexDirection:'column', height: '100%' }}>
                                      <Box component={Container} sx={{background:'#DFF0D8', px: 4, py: 2}}>
                                        <Typography sx={{ fontSize: 24, mb: 0}} variant="h5" color="primary.main" gutterBottom data-testid="choice-card-title">
                                            {card.card_title}
                                        </Typography>
                                      </Box>
                                      <Box sx={{px: 4, py: 2, minHeight: '210px'}}>
                                        <Typography sx={{ fontWeight:400, lineHeight:'24px' }} variant="body1" gutterBottom>
                                          {card.card_subtext}
                                        </Typography>
                                      </Box>
                                      <Box sx={{ px: 4, pb: 4, display:"flex", flexDirection:'column', height: '100%' }}>
                                        <Typography sx={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', mb: 2, letterSpacing: 2}} variant="h5" color="primary.main" gutterBottom>
                                          Quick Facts
                                        </Typography>
                                        <Box component={Container} sx={{maxWidth:'100%'}} disableGutters={true}>
                                          {card.fact_point.map(fact => {
                                            return (
                                              <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', padding:'0px', marginBottom:'8px'}}>
                                                <img style={{marginRight:'10px'}} src={REACT_APP_api_base_url + fact.fact_icon.data.attributes.url} width="24" height="24"/>
                                                <Typography sx={{ fontSize: 16, lineHeight:'24px'}} color="primary.main" gutterBottom>
                                                  {fact.fact_body}
                                                </Typography>
                                              </div>
                                            )
                                          })}
                                        </Box>

                                        {card.card_link?
                                            <Box sx={{ mt: 'auto' }}>
                                              <Typography sx={{fontSize:16, fontFamily:'Public Sans', fontWeight: 'bold'}} component="a" href={card.card_link}>
                                                Learn More
                                              </Typography>
                                            </Box>
                                        :
                                        null
                                        }

                                      </Box>
                                    </CardContent>
                                  </Card>
                              </Grid>
                            )
                          })}
                        </Grid>

                    </Container>

                    <Grid item xs={12} textAlign="center" mt="3rem">
                      <WhiteStyleButton variant="contained">Compare All</WhiteStyleButton>
                    </Grid>
                </Grid>

              :
              <Grid container sx={{display:'flex', justifyContent:'center', alignItems:'center', padding:'4rem 1rem 4rem 1rem', flexDirection:'row', width:'100%', backgroundColor:'#0C3A25'}}>
                 <Typography data-testid="choice-title" variant="h2" color="primary.contrastText" sx={{ mb: 3, textAlign: 'center' }}>
                    {choiceSectionData?.Title}
                </Typography>
                <Grid container sx={{display:"flex", flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  {choiceSectionData?.Fact_Card_Content.map(card => {
                    return(
                      <Accordion className="choice-accordion">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{card.card_title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ background:'#F4FCF0', borderBottomLeftRadius:'10px', borderBottomRightRadius:'10px' }}>
                            <CardContent sx={{padding:'0px' }}>
                              <Box sx={{padding:'10px', display:'flex', flexDirection:'column', minHeight:'89px', justifyContent:'flex-start', alignItems:'flex-start'}}>
                                <Typography sx={{ lineHeight:1.5 }} color="text.primary" gutterBottom>
                                  {card.card_subtext}
                                </Typography>
                              </Box>
                              <Box sx={{ padding:'10px', display:"flex", flexDirection:'column', height: '100%' }}>
                                <Typography sx={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', mb: 2, letterSpacing: 2}} variant="h5" color="primary.main" gutterBottom>
                                  Quick Facts
                                </Typography>
                                <Box component={Container} sx={{padding: '0', maxWidth:'100%'}} disableGutters={true}>
                                  {card.fact_point.map(fact => {
                                    return (
                                      <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start', padding:'0px', marginBottom:'8px'}}>
                                        <img style={{marginRight:'10px'}} src={REACT_APP_api_base_url + fact.fact_icon.data.attributes.url} width="24" height="24"/>
                                        <Typography sx={{ fontSize: 16, lineHeight:'24px'}} color="primary.main" gutterBottom>
                                          {fact.fact_body}
                                        </Typography>
                                      </div>
                                    )
                                  })}
                                </Box>

                                {card.card_link?
                                    <Box sx={{ mt: 'auto' }}>
                                      <Typography sx={{fontSize:16, fontFamily:'Public Sans', fontWeight: 'bold'}} component="a" href={card.card_link}>
                                        Learn More
                                      </Typography>
                                    </Box>
                                :
                                null
                                }

                              </Box>
                            </CardContent>
                        </AccordionDetails>
                      </Accordion>
                    )
                  })
                  }
                </Grid>

                <Grid item xs={12} textAlign="center" mt="3rem">
                  <WhiteStyleButton variant="contained">Compare All</WhiteStyleButton>
                </Grid>

              </Grid>
              }
              
            </Fragment>
          )
          :null
        }


        {infoSectionLoaded?
          (
            <Fragment>
              {!isMobile?
                <Grid className="info_section" container sx={{ pt: 7, pb: 12 }}>
                    <Container maxWidth="lg">
                        <Box className="info_nav" component={Container} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px', fontSize: '25px'}}>
                          {infoSectionData.map(data => {
                            return (
                              <Typography variant="h4" sx={{ fontSize: 'inherit', fontWeight: 600 }} id={data.Information_Short_Title} onClick={() => changeSelection(data.Information_Short_Title)} className={`info_nav_text ${data.Information_Short_Title==selectedInfoSectionData?.Information_Short_Title? 'active':null}`}>{data.Information_Short_Title}</Typography>
                            )
                          })}
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Typography sx={{fontSize:'56px', mb: 1, fontWeight: 700, color: '#0C3A25' }} className="info_content_title" variant="h2">{selectedInfoSectionData?.Information_Full_Title}</Typography>
                                <Typography component={'small'} variant="body1">{selectedInfoSectionData?.Information_Caution_Text}</Typography>

                                <Typography sx={{ mt: 4, mb: 1 }} className="info_content_answer" variant="h3" color="primary.main">{selectedInfoSectionData?.Information_Answer}</Typography>
                                <Typography sx={{width: '90%'}} className="info_content_description" variant="body2">{selectedInfoSectionData?.Information_Description}</Typography>
                            </Grid>

                            <Grid item xs={1}></Grid>

                            <Grid container item xs={6} sx={{ alignItems: 'center' }}>
                                <Grid item xs={8} className="info_canvas" sx={{ pt: 5 }}>
                                    <Progress offset={`${selectedInfoSectionData?.Information_Stat_Number}`}></Progress>
                                </Grid>
                                <Grid item xs={4}>
                                    <Container className="stats_text" sx={{marginLeft: '-110px', width:'calc(100% + 110px)'}} maxWidth={false} disableGutters={true}>
                                      <Typography sx={{ fontSize: '72px' }} className="info_stat_number" variant="h1" color="primary.main">{selectedInfoSectionData?.Information_Stat_Number + '%'}</Typography>
                                      <Typography sx={{width:'100%', fontSize: '36px'}} className="info_content_additional" variant="h3" color="primary.main">{selectedInfoSectionData?.Information_Additional_Info}</Typography>
                                    </Container>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Container>
                </Grid>
              :
              <Grid container sx={{pt: 5, pb: 8, display:'flex', flexDirection:'column'}} className="info_section">
                <Container maxWidth={false} className="info_content">
                  <Container className="info_content_left" sx={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <Typography sx={{ mb: 1, fontWeight: 700, color: '#0C3A25', lineHeight: 'inherit' }} textAlign="center" className="info_content_title" variant="h2">{selectedInfoSectionData?.Information_Full_Title}</Typography>
                    <Typography component={'small'} variant="body1" textAlign="center">{selectedInfoSectionData?.Information_Caution_Text}</Typography>

                    <Typography sx={{ mt: 4, mb: 1 }} className="info_content_answer" variant="h2" color="primary.main">{selectedInfoSectionData?.Information_Answer}</Typography>
                    <Typography sx={{width: '90%', lineHeight: 'inherit'}} className="info_content_description" color="primary.dark" variant="body1">{selectedInfoSectionData?.Information_Description}</Typography>

                  </Container>


                    <Box className="info_nav" component={Container} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px', fontSize: '25px'}}>
                      {infoSectionData.map(data => {
                        return (
                          <Typography variant="h4" sx={{ fontSize: 'inherit', fontWeight: 600 }} id={data.Information_Short_Title} onClick={() => changeSelection(data.Information_Short_Title)} className={`info_nav_text ${data.Information_Short_Title==selectedInfoSectionData?.Information_Short_Title? 'active':null}`}>{data.Information_Short_Title}</Typography>
                        )
                      })}
                    </Box>

                    <Grid container item xs={12} sx={{ alignItems: 'center', padding: '20px' }}>
                        <Grid item xs={7} className="info_canvas" sx={{ pt: 3 }}>
                            <Progress offset={`${selectedInfoSectionData?.Information_Stat_Number}`}></Progress>
                        </Grid>
                        <Grid item xs={5}>
                            <Container className="stats_text" sx={{marginLeft: '-80px', width:'calc(100% + 110px)'}} maxWidth={false} disableGutters={true}>
                              <Typography className="info_stat_number" variant="h2" color="primary.main">{selectedInfoSectionData?.Information_Stat_Number + '%'}</Typography>
                              <Typography sx={{width:'100%', fontSize: '24px'}} className="info_content_additional" variant="h4" color="primary.main">{selectedInfoSectionData?.Information_Additional_Info}</Typography>
                            </Container>
                        </Grid>
                    </Grid>
                </Container>
              </Grid>
              }
            </Fragment>
          )
          :null
        }

        {decisionSectionLoaded?
          (
            <Fragment>
            {!isMobile?
                <Grid container sx={{ pt: 7, pb: 12, background:'#FAF6ED' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Typography variant="h2" sx={{ mt: 2 }} color="primary.main" gutterBottom>
                                    {decisonAidSection?.Section_Title}
                                </Typography>
                                <Typography variant="body2" color="primary.main" gutterBottom>
                                    {decisonAidSection?.Section_Description}
                                </Typography>
                                <Button sx={{ px: 3, py: 1, mt: 6, backgroundColor: '#0C3A25', borderRadius: '25px', color: '#fff', textTransform: 'capitalize', fontSize: '1.125rem'}}>{decisonAidSection?.Button_Text}</Button>
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={6}>
                                {decisonAidSection?
                                    <img className="hero_image_decision" src={(REACT_APP_api_base_url || "") + decisonAidSection.Section_Image.data.attributes.url} alt="" />
                                    :null
                                }
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                :
                <Grid container sx={{ pt: 6, pb: 8, pl: 3, pr: 3, background:'#FAF6ED' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                                <Typography variant="h2" sx={{ mt: 2, width: '300px' }} color="primary.main" gutterBottom textAlign="center">
                                    {decisonAidSection?.Section_Title}
                                </Typography>
                                <Typography variant="body2" color="primary.main" gutterBottom sx={{ width: '300px' }}>
                                    {decisonAidSection?.Section_Description}
                                </Typography>
                                <Button sx={{ px: 3, py: 1, mt: 4, backgroundColor: '#0C3A25', borderRadius: '25px', color: '#fff', textTransform: 'capitalize', fontSize: '1.125rem'}}>{decisonAidSection?.Button_Text}</Button>
                            </Grid>
                            <Grid item xs={12}>
                                {decisonAidSection?
                                    <img className="hero_image_decision" src={(REACT_APP_api_base_url || "") + decisonAidSection.Section_Image.data.attributes.url} alt="" />
                                    :null
                                }
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
             }
            </Fragment>
          )
          :
          null
        }

        
         {aboutSectionLoaded?
          (
            <Fragment>
                {!isMobile?
                <Grid className="about-section" container sx={{ pt: 10, pb: 12, backgroundColor:'#ffffff' }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                            <Grid item xs={4}>
                                {aboutSection?
                                    <img className="hero_image_about" src={(REACT_APP_api_base_url || "") + aboutSection.Creator_Image.data.attributes.url} alt="" />
                                    :null
                                }
                                <Typography variant="body2" color="text.primary" gutterBottom sx={{ textAlign: 'center', mb: 4, mt: 4 }}>
                                    {aboutSection?.Creator_Name}
                                </Typography>
                                <Typography variant="body2" color="text.primary" gutterBottom sx={{ textAlign: 'center' }}>
                                     {aboutSection?.Creator_Position}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={7}>
                                {aboutSection?.About_Paras.map(data => {
                                  return (
                                    <div className="aboutSection" style={{ marginBottom: '3rem' }}>
                                        <Typography variant="h2" sx={{ mb: 2 }} color="primary.main" gutterBottom>
                                            {data.Para_Title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2 }} color="primary.dark" gutterBottom>
                                            {data.Para_Description}
                                        </Typography>
                                        <Typography variant="body1" color="primary.dark" sx={{ fontSize: 16 }} >
                                            {data.Para_Link_Filler} <Link color="#00653E" fontWeight="bold" href={data.Para_Link} >{data.Para_Link_Highlight}</Link>
                                        </Typography>
                                    </div>
                                  )
                                })}
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                : 
                    <Grid className="about-section" container sx={{ pt: 8, pb: 10, pl: 3, pr: 3, backgroundColor:'#ffffff' }}>
                        <Container maxWidth="lg">
                            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                                <Grid item xs={12}>
                                    <div className="aboutSection" style={{ marginBottom: '3rem' }}>
                                        <Typography variant="h2" sx={{ mb: 2 }} color="primary.main" gutterBottom>
                                            {aboutSection?.About_Paras['0'].Para_Title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2 }} color="primary.dark" gutterBottom>
                                            {aboutSection?.About_Paras['0'].Para_Description}
                                        </Typography>
                                        <Typography variant="body2" color="#00653E" sx={{ fontSize: 16, fontWeight: 'bold' }} component="a" href={aboutSection?.About_Paras['0'].Para_Link}>
                                            {aboutSection?.About_Paras['0'].Para_Link_Filler} {aboutSection?.About_Paras['0'].Para_Link_Highlight}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sx={{ mb: 4 }}>
                                    {aboutSection?
                                        <img className="hero_image_about" src={(REACT_APP_api_base_url || "") + aboutSection.Creator_Image.data.attributes.url} alt="" />
                                        :null
                                    }
                                    <Typography variant="body1" color="text.primary" gutterBottom sx={{ textAlign: 'center', mb: 1, mt: 2 }}>
                                        {aboutSection?.Creator_Name}
                                    </Typography>
                                    <Typography variant="body1" color="text.primary" gutterBottom sx={{ textAlign: 'center' }}>
                                       {aboutSection?.Creator_Position}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="aboutSection">
                                        <Typography variant="h2" sx={{ mb: 2 }} color="primary.main" gutterBottom>
                                            {aboutSection?.About_Paras['1'].Para_Title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2 }} color="primary.dark" gutterBottom>
                                            {aboutSection?.About_Paras['1'].Para_Description}
                                        </Typography>
                                        <Typography variant="body2" color="#00653E" sx={{ fontSize: 16, fontWeight: 'bold' }} component="a" href={aboutSection?.About_Paras['1'].Para_Link}>
                                            {aboutSection?.About_Paras['1'].Para_Link_Filler} {aboutSection?.About_Paras['1'].Para_Link_Highlight}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                }
            </Fragment>
          )
          :
          null
        }

      </Grid>
    </Layout>
  );
}
