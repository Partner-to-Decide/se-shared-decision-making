import { Box, Divider, Grid, Container, ThemeProvider, Typography, Stack, Button,Card } from "@mui/material";
import Layout from "../components/Layout";
import "../components/NoteModal/Note.css";
import Note from "../components/NoteModal/Note";
import NewNote from "../components/NoteModal/NewNoteModal";
import React, { useRef,useState, useEffect, Fragment } from "react";
import Checklist from "../components/checklists/Checklist";
import ChecklistQues from "../components/checklists/ChecklistQues";
import "./pageStyle/MyStuff.css";
import html2pdf from 'html2pdf.js';
import {
  mystuff_page_title_subtitles,
  mystuff_page_questions_list,
} from "../utils/types";
import EnvelopeIcon from '../siteImages/icons/envelope-icon.svg';
import DownloadIcon from '../siteImages/icons/download-icon.svg';
import { REACT_APP_api_base_url, DEFAULT_LANGUAGE } from "../utils/url_config";
import jsPDF from "jspdf";
import axios from "axios";
import {
  Clock,
} from '@phosphor-icons/react'
import html2canvas from "html2canvas";
import { StyledEngineProvider } from "@mui/material/styles";
import Loading from '../components/Loading';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { useNavigate, useLocation } from 'react-router-dom';
import PageBreak from '../components/PageBreak/PageBreak';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="box-wrapper" sx={{ pt: 3, px: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function MyStuff() {
  const lightGreen = '#dff0d8';
  const [sameSection, setSameSection] = useState<mystuff_page_questions_list>();
  const [pageTitlesData, setPageTitlesData] =
    useState<mystuff_page_title_subtitles>();
  const [notes, setNote] = useState([""]);
  const [modalShow, setModalShow] = useState(false);
  const [noteIndex, setIndex] = useState(0);
  const summaryGridRef = useRef<HTMLDivElement | null>(null);
  const [isPdfGeneration, setIsPdfGeneration] = useState(false);
  const [isloading, setLoading] = useState(false);
  const [languageState, setLanguageState] = useState("en");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if(width<=768){
      setIsMobile(true)
    }
  }, [width]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(`/MyStuff?tab=${newValue}`);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabValue = params.get('tab');
    if (tabValue) {
      setValue(Number(tabValue));
    }
  }, [location.search]);

  const addNote = function (value: string) {
    return setNote((notes) => [...notes, value]);
  };
  const deleteNote = (index: any) => {
    notes.splice(index, 1);
    setNote((notes) => [...notes]);
  };
  //note is deleted using splice feature, splice returns orifinal notes index, prior to addition
  const editNote = (value: string) => {
    notes.splice(noteIndex, 1);
    setNote((notes) => [...notes, value]);
  };
  //using feature, edits previousy created notes, and pushes new notes (from index where edits happened) to notes array
  const editNoteIndex = (index: any) => {
    setIndex(index);
  };

  useEffect(() => {
    window.addEventListener("storage", () => {
      setLanguageState(localStorage.getItem("language") || "en");
    });
  }, []);
    // todo: can not download
  const downloadSummary = () => {
    setIsPdfGeneration(true);
    setLoading(true);
    const element = document.getElementById('pdf-page'); // Get the container element by its ID
    var options = {
      margin: 0, // [top, right, bottom, left]
      enableLinks: true,
      filename: 'Quiz-result.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      css: 'custom-styles',
      html2canvas: { scale: 2 },
      jsPDF: {
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4', 
      }
    };
    window.setTimeout(() => {
        html2pdf().set(options).from(element).save().then(() => {
            setIsPdfGeneration(false);
            setLoading(false);
        });
    }, 500);
  };
  useEffect(() => {
  const fetchPageTitlesData = async () => {
      try {
        const result = await axios.get( REACT_APP_api_base_url +
          "/api/my-stuff-page-title?populate=deep&locale=" +
            localStorage.getItem("language")
        );
        setPageTitlesData(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get( REACT_APP_api_base_url +
            "/api/my-stuff-page-title?populate=deep&locale=" +
              DEFAULT_LANGUAGE
          );
          setPageTitlesData(result.data);
        } catch (error) {
          console.error(
            "Error fetching learn about data with default locale: ",
            error
          );
        }
      }
    };
    const fetchSameSection = async () => {
      try {
        const result = await axios.get( REACT_APP_api_base_url +
          "/api/my-stuff-questions?populate=deep&locale=" +
            localStorage.getItem("language")
        );
         const sortedData = result.data.data.sort((a: any, b: any) => {
            return a.id - b.id;
          });
        setSameSection(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get( REACT_APP_api_base_url +
            "/api/my-stuff-questions?populate=deep&locale=/api/my-choices-same?populate=deep&locale=" +
              DEFAULT_LANGUAGE
          );
          setSameSection(result.data);
        } catch (error) {
          console.error(
            "Error fetching learn about data with default locale: ",
            error
          );
        }
      }
    };
    fetchSameSection();
    fetchPageTitlesData();
  }, [languageState]);

  const storedRating = localStorage.getItem('QuizQuestions')|| '';
  let rating;
  if(storedRating){
    rating = JSON.parse(storedRating);
  }

  const renderArray = (arr: string[]) => {
    if (arr.length === 0) {
      return;
    }
    return arr.map((item, index) => (
      <React.Fragment key={index}>
        <span>{item}</span>
        {index !== arr.length - 1 && <span style={{ margin: "0 20px" }}></span>}
      </React.Fragment>
    ));
  };

  const choiceArray = {
    choiceOne: "Wait for spontaneous labor past 42 weeks",
    choiceTwo: "Schedule induction at or around 42 weeks",
    choiceThree: "Schedule induction sometime between 41 and 42 weeks",
    choiceFour: "Schedule induction at or around 41 weeks",
    choiceFive: "Request induction between 39-41 weeks"
  };
 
  const handleEmailSend = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_api_base_url}/api/email/send`,
        {
          email: 'recipienttesting@yopmail.com',
          subject: 'Test Hello Email',
          text: 'This is a test email',
          file:"https://se-shared-decision-making-production.up.railway.app/uploads/mobile_logo_9c5fb223f4.svg",
        }
        );
      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  //returns index of where edit occurs
  return (
    <StyledEngineProvider injectFirst>
      {isloading == true &&
        <Loading />
      }
      <Layout>
        <div>
          <Grid container columns={{ xl: 12, lg: 12, md: 12 }} item xl={12} lg={12} md={12}
            sx={{
              backgroundColor: "#FAF6ED", direction: "column",
              mt: 0, pt: 8, pb: 0, display: "flex", alignItems: "center", justifyContent: "center"
            }} >
                <Grid item xs={12}>
                    <Container maxWidth="md">
                      <Box>
                          <Tabs className="tabs-head" value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Saved" {...a11yProps(0)} />
                            <Tab label="Checklist" {...a11yProps(1)} />
                          </Tabs>
                      </Box>
                    </Container>

                    <div id="pdf-page" ref={summaryGridRef} style={{ backgroundColor: '#FAF6ED', width: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
                      {isPdfGeneration == true &&
                      <>
                          <Grid item xs={12} pl={!isMobile ? "0rem" : ""} pr={!isMobile ? "0rem"  : ""} sx={{ alignItems: "center" }}>

                              {rating &&
                                  <Grid
                                      container
                                      columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                                    >
                                      <div className="summary-grid" >
                                        {rating.mostImportant.length > 0 &&
                                          <div className="summary-box most-important">
                                            <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                              Most Important
                                            </Typography>
                                            <Stack direction="row" flexWrap="wrap">
                                              {rating.mostImportant.map((cur, index) => {
                                                return (
                                                  <Grid item width='158px' sx={{ p: 2 }} textAlign="center">
                                                     {cur['icon']?
                                                        <Box className="icon-shape">
                                                           <img className="values-icon" style={{width:50}} src={(REACT_APP_api_base_url || "") + cur['icon']} alt="" />
                                                        </Box>
                                                    :null}
                                                    <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                      {cur['text']}
                                                    </Typography>
                                                  </Grid>
                                                )
                                              })}
                                            </Stack>
                                          </div>
                                        }
                                        {rating.important.length > 0 &&
                                          <div className="summary-box important">
                                            <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                              Important
                                            </Typography>
                                            <Stack direction="row" flexWrap="wrap">
                                              {rating.important.map((cur, index) => {
                                                return (
                                                  <Grid item width='158px' sx={{ p: 2 }} textAlign="center">
                                                    {cur['icon']?
                                                        <Box className="icon-shape">
                                                           <img className="values-icon" style={{width:50}} src={(REACT_APP_api_base_url || "") + cur['icon']} alt="" />
                                                        </Box>
                                                    :null}
                                                    <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                       {cur['text']}
                                                    </Typography>
                                                  </Grid>
                                                )
                                              })}
                                            </Stack>
                                          </div>
                                        }
                                        {rating.lessImportant.length > 0 &&
                                          <div className="summary-box less-important">
                                            <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                              Less Important
                                            </Typography>
                                            <Stack direction="row" flexWrap="wrap">
                                              {rating.lessImportant.map((cur, index) => {
                                                return (
                                                  <Grid item width='158px' sx={{ p: 2 }} textAlign="center">
                                                     {cur['icon']?
                                                        <Box className="icon-shape">
                                                           <img className="values-icon" style={{width:50}} src={(REACT_APP_api_base_url || "") + cur['icon']} alt="" />
                                                        </Box>
                                                    :null}
                                                    <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                      {cur['text']}
                                                    </Typography>
                                                  </Grid>
                                                )
                                              })}
                                            </Stack>
                                          </div>
                                        }
                                        {rating.leastImportant.length > 0 &&
                                          <div className="summary-box least-important">
                                            <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                              Least Important
                                            </Typography>
                                            <Stack direction="row" flexWrap="wrap">
                                              {rating.leastImportant.map((cur, index) => {
                                                return (
                                                  <Grid item width='158px' sx={{ p: 2 }} textAlign="center">
                                                  {cur['icon']?
                                                    <Box className="icon-shape">
                                                       <img className="values-icon" style={{width:50}} src={(REACT_APP_api_base_url || "") + cur['icon']} alt="" />
                                                    </Box>
                                                    :null}
                                                    <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                      {cur['text']}
                                                    </Typography>
                                                  </Grid>
                                                )
                                              })}
                                            </Stack>
                                          </div>
                                        }
                                      </div>

                                      <div className="summary-box choice-ques stuff-value">
                                          <Container maxWidth="md">
                                              {rating.choiceOne.length > 0 &&
                                                <>
                                                  <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                                  Right now I’m leaning towards
                                                  </Typography>
                                                      <Stack direction="row" spacing={4} justifyContent="center">
                                                            <Grid item width='148px' textAlign="center">
                                                              <Box className="icon-shape">
                                                                <Clock size={32} weight="light" />
                                                              </Box>
                                                              <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                              {choiceArray.choiceOne}
                                                              </Typography>
                                                            </Grid>
                                                      </Stack>
                                                </>}
                                              {rating.choiceTwo.length > 0 &&
                                                <>
                                                <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                                Right now I’m leaning towards
                                                </Typography>
                                                    <Stack direction="row" spacing={4} justifyContent="center">
                                                          <Grid item width='148px' textAlign="center">
                                                            <Box className="icon-shape">
                                                              <Clock size={32} weight="light" />
                                                            </Box>
                                                            <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                            {choiceArray.choiceTwo}
                                                            </Typography>
                                                          </Grid>
                                                    </Stack>
                                              </>}
                                              {rating.choiceThree.length > 0 &&
                                                <>
                                                <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                                Right now I’m leaning towards
                                                </Typography>
                                                    <Stack direction="row" spacing={4} justifyContent="center">
                                                          <Grid item width='148px' textAlign="center">
                                                            <Box className="icon-shape">
                                                              <Clock size={32} weight="light" />
                                                            </Box>
                                                            <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                            {choiceArray.choiceThree}
                                                            </Typography>
                                                          </Grid>
                                                    </Stack>
                                              </>}
                                              {rating.choiceFour.length > 0 &&
                                                <>
                                                <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                                Right now I’m leaning towards
                                                </Typography>
                                                    <Stack direction="row" spacing={4} justifyContent="center">
                                                          <Grid item width='148px' textAlign="center">
                                                            <Box className="icon-shape">
                                                              <Clock size={32} weight="light" />
                                                            </Box>
                                                            <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                            {choiceArray.choiceFour}
                                                            </Typography>
                                                          </Grid>
                                                    </Stack>
                                              </>}
                                              {rating.choiceFive.length > 0 &&
                                                <>
                                                <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                                Right now I’m leaning towards
                                                </Typography>
                                                    <Stack direction="row" spacing={4} justifyContent="center">
                                                          <Grid item width='148px' textAlign="center">
                                                            <Box className="icon-shape">
                                                              <Clock size={32} weight="light" />
                                                            </Box>
                                                            <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                            {choiceArray.choiceFive}
                                                            </Typography>
                                                          </Grid>
                                                    </Stack>
                                              </>

                                              }
                                          
                                          </Container>
                                        </div>

                                    </Grid>
                              }
                          </Grid>

                          <PageBreak key="break" />

                          <div style={{ backgroundColor: '#FAF6ED', height: '286mm' }}>
                            <Grid container item xl={12} lg={12} md={12} sx={{ alignItems: "center", justifyContent: "center", pt: 0, pb: 8 }}>
                              <Grid container item xs={12} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                               {sameSection?.data != null ? (
                                    <ChecklistQues quiz={sameSection} isPdfGeneration={isPdfGeneration} isloading={isloading} />  
                                ) : null}
                              </Grid>
                            </Grid>
                          </div>

                      </>}
                      </div>


                    <CustomTabPanel value={value} index={0}>
                        <Grid item xs={12} pl={!isMobile ? "0rem" : ""} pr={!isMobile ? "0rem"  : ""} sx={{ alignItems: "center" }}>
                            
                            <Container maxWidth="md">
                              <Typography variant="h3" color="primary.main" fontSize="2.25rem" fontWeight="500" style={{ marginBottom: '1rem' }}>
                                  Values Summary
                              </Typography>
                            </Container>
                            {rating &&
                                <Grid
                                    container
                                    columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                                  >
                                    <div className="summary-grid" >
                                      {rating.mostImportant.length > 0 &&
                                        <div className="summary-box most-important">
                                          <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                            Most Important
                                          </Typography>
                                          <Stack direction="row" flexWrap="wrap">
                                            {rating.mostImportant.map((cur, index) => {
                                              return (
                                                <Grid item width='158px' sx={{ p: 2 }} textAlign="center">
                                                   {cur['icon']?
                                                      <Box className="icon-shape">
                                                         <img className="values-icon" style={{width:50}} src={(REACT_APP_api_base_url || "") + cur['icon']} alt="" />
                                                      </Box>
                                                  :null}
                                                  <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                    {cur['text']}
                                                  </Typography>
                                                </Grid>
                                              )
                                            })}
                                          </Stack>
                                        </div>
                                      }
                                      {rating.important.length > 0 &&
                                        <div className="summary-box important">
                                          <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                            Important
                                          </Typography>
                                          <Stack direction="row" flexWrap="wrap">
                                            {rating.important.map((cur, index) => {
                                              return (
                                                <Grid item width='158px' sx={{ p: 2 }} textAlign="center">
                                                  {cur['icon']?
                                                      <Box className="icon-shape">
                                                         <img className="values-icon" style={{width:50}} src={(REACT_APP_api_base_url || "") + cur['icon']} alt="" />
                                                      </Box>
                                                  :null}
                                                  <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                     {cur['text']}
                                                  </Typography>
                                                </Grid>
                                              )
                                            })}
                                          </Stack>
                                        </div>
                                      }
                                      {rating.lessImportant.length > 0 &&
                                        <div className="summary-box less-important">
                                          <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                            Less Important
                                          </Typography>
                                          <Stack direction="row" flexWrap="wrap">
                                            {rating.lessImportant.map((cur, index) => {
                                              return (
                                                <Grid item width='158px' sx={{ p: 2 }} textAlign="center">
                                                   {cur['icon']?
                                                      <Box className="icon-shape">
                                                         <img className="values-icon" style={{width:50}} src={(REACT_APP_api_base_url || "") + cur['icon']} alt="" />
                                                      </Box>
                                                  :null}
                                                  <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                    {cur['text']}
                                                  </Typography>
                                                </Grid>
                                              )
                                            })}
                                          </Stack>
                                        </div>
                                      }
                                      {rating.leastImportant.length > 0 &&
                                        <div className="summary-box least-important">
                                          <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                            Least Important
                                          </Typography>
                                          <Stack direction="row" flexWrap="wrap">
                                            {rating.leastImportant.map((cur, index) => {
                                              return (
                                                <Grid item width='158px' sx={{ p: 2 }} textAlign="center">
                                                {cur['icon']?
                                                  <Box className="icon-shape">
                                                     <img className="values-icon" style={{width:50}} src={(REACT_APP_api_base_url || "") + cur['icon']} alt="" />
                                                  </Box>
                                                  :null}
                                                  <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                    {cur['text']}
                                                  </Typography>
                                                </Grid>
                                              )
                                            })}
                                          </Stack>
                                        </div>
                                      }
                                    </div>

                                    <div className="summary-box choice-ques stuff-value">
                                        <Container maxWidth="md">
                                            {rating.choiceOne.length > 0 &&
                                              <>
                                                <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                                Right now I’m leaning towards
                                                </Typography>
                                                    <Stack direction="row" spacing={4} justifyContent="center">
                                                          <Grid item width='148px' textAlign="center">
                                                            <Box className="icon-shape">
                                                              <Clock size={32} weight="light" />
                                                            </Box>
                                                            <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                            {choiceArray.choiceOne}
                                                            </Typography>
                                                          </Grid>
                                                    </Stack>
                                              </>}
                                            {rating.choiceTwo.length > 0 &&
                                              <>
                                              <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                              Right now I’m leaning towards
                                              </Typography>
                                                  <Stack direction="row" spacing={4} justifyContent="center">
                                                        <Grid item width='148px' textAlign="center">
                                                          <Box className="icon-shape">
                                                            <Clock size={32} weight="light" />
                                                          </Box>
                                                          <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                          {choiceArray.choiceTwo}
                                                          </Typography>
                                                        </Grid>
                                                  </Stack>
                                            </>}
                                            {rating.choiceThree.length > 0 &&
                                              <>
                                              <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                              Right now I’m leaning towards
                                              </Typography>
                                                  <Stack direction="row" spacing={4} justifyContent="center">
                                                        <Grid item width='148px' textAlign="center">
                                                          <Box className="icon-shape">
                                                            <Clock size={32} weight="light" />
                                                          </Box>
                                                          <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                          {choiceArray.choiceThree}
                                                          </Typography>
                                                        </Grid>
                                                  </Stack>
                                            </>}
                                            {rating.choiceFour.length > 0 &&
                                              <>
                                              <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                              Right now I’m leaning towards
                                              </Typography>
                                                  <Stack direction="row" spacing={4} justifyContent="center">
                                                        <Grid item width='148px' textAlign="center">
                                                          <Box className="icon-shape">
                                                            <Clock size={32} weight="light" />
                                                          </Box>
                                                          <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                          {choiceArray.choiceFour}
                                                          </Typography>
                                                        </Grid>
                                                  </Stack>
                                            </>}
                                            {rating.choiceFive.length > 0 &&
                                              <>
                                              <Typography variant="h3" fontSize="2.25rem" mb="2.4rem" color="primary.main">
                                              Right now I’m leaning towards
                                              </Typography>
                                                  <Stack direction="row" spacing={4} justifyContent="center">
                                                        <Grid item width='148px' textAlign="center">
                                                          <Box className="icon-shape">
                                                            <Clock size={32} weight="light" />
                                                          </Box>
                                                          <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                                                          {choiceArray.choiceFive}
                                                          </Typography>
                                                        </Grid>
                                                  </Stack>
                                            </>

                                            }
                                        
                                        </Container>
                                      </div>

                                  </Grid>
                            }
                        </Grid>
                        
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                      <Container maxWidth="md">
                        <Grid xs={12} pl={!isMobile ? "1.5rem" : ""} pr={!isMobile ? "1.5rem"  : ""}>
                            <Grid item xs={12} sx={{ alignItems: "center" }}>
                              {pageTitlesData?.data.attributes.Title != null ? (
                                <Typography variant="h3" color="primary.main" fontSize="2.25rem" fontWeight="500" style={{ marginBottom: '1rem' }}>
                                  {pageTitlesData?.data.attributes.Title}
                                </Typography>
                              ) : null}
                              {pageTitlesData?.data.attributes.Description != null ? (
                                <Typography gutterBottom style={{ width: '100%', height: 'auto', fontSize: 16, fontWeight:400, lineHeight:'24px', fontFamily:'Public Sans' }} color="text.primary">
                                  {pageTitlesData?.data.attributes.Description}
                                </Typography>
                              ) : null}
                            </Grid>
                            <Grid container item xl={12} lg={12} md={12} sx={{ alignItems: "center", justifyContent: "center", pt: 6, pb: 8 }}>
                              <Grid container item xs={12} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                               {sameSection?.data != null ? (
                                    <ChecklistQues quiz={sameSection} isPdfGeneration={isPdfGeneration} isloading={isloading} />  
                                ) : null}
                              </Grid>
                            </Grid>
                            <Grid container item xl={12} lg={12} md={12} sx={{ alignItems: "center", justifyContent: "center", pt: 6, pb: 3 }}>
                              <Grid container item xs={12} sx={{ alignItems: "center", justifyContent: "center" }}>
                                <Typography variant="h3" fontSize="2.25rem" color="primary.main" fontWeight="500">Save Your Questions</Typography>
                              </Grid>
                            </Grid>
                            <Grid container item xl={12} lg={12} md={12} sx={{ alignItems: "center", justifyContent: "center", pt: 0, pb: 8 }}>
                              <Grid container item xs={12} sx={{ alignItems: "center", justifyContent: "center" }}>
                                 <Stack spacing={2} direction="row">
                                  <Button className="save-ques-btn" onClick={handleEmailSend} variant="outlined"><img src={EnvelopeIcon} alt="Envelope Icon" />Email</Button>
                                  <Button className="save-ques-btn" variant="outlined" onClick={downloadSummary} ><img src={DownloadIcon} alt="Download Icon"  />Download</Button>
                                </Stack>
                              </Grid>
                            </Grid>
                        </Grid>
                      </Container>
                    </CustomTabPanel>
                </Grid>
          </Grid>
        </div>
      </Layout>
    </StyledEngineProvider>
  );
}