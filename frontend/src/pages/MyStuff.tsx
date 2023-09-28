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
        <Box sx={{ py: 3, px: 3 }}>
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
  const handleClick = () => {
    setOpen(!open);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
              mt: 0, pt: 8, pb: 8, display: "flex", alignItems: "center", justifyContent: "center"
            }} >
                <Container maxWidth="md">
                    <Box>
                        <Tabs className="tabs-head" value={value} onChange={handleChange} aria-label="basic tabs example">
                          <Tab label="Saved" {...a11yProps(0)} />
                          <Tab label="Checklist" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Grid item xs={12} pl="1.5rem" pr="1.5rem" sx={{ alignItems: "center" }}>
                          
                            <Typography variant="h3" color="primary.main" fontSize="2.25rem" fontWeight="500" style={{ marginBottom: '1rem' }}>
                                Values Summary
                            </Typography>
                            {rating &&
                                <Card className="value-summmary-card">
                                    {rating.mostImportant.length > 0 &&
                                        <Grid mb="3.4rem">
                                            <Typography variant="h3" color="primary.main" textAlign="center" fontSize="2.25rem" fontWeight="500" style={{ marginBottom: '2rem' }}>
                                                Most Important
                                            </Typography>
                                            <Grid container spacing={5}>
                                               {rating.mostImportant.map((cur, index) => {
                                                    return (
                                                        <Grid item md={4} textAlign="center">
                                                             <Box className="icon-shape">
                                                                <Clock size={32} weight="light" />
                                                            </Box>
                                                            <Typography variant="body1">
                                                                {cur}
                                                            </Typography>
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        </Grid>
                                    }
                                    {rating.important.length > 0 &&
                                        <Grid mb="3.4rem">
                                            <Typography variant="h3" color="primary.main" textAlign="center" fontSize="2.25rem" fontWeight="500" style={{ marginBottom: '2rem' }}>
                                                Important
                                            </Typography>
                                            <Grid container spacing={5}>
                                                {rating.important.map((cur, index) => {
                                                    return (
                                                        <Grid item md={4} textAlign="center">
                                                             <Box className="icon-shape">
                                                                <Clock size={32} weight="light" />
                                                            </Box>
                                                            <Typography variant="body1">
                                                                {cur}
                                                            </Typography>
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        </Grid>
                                    }
                                    {rating.lessImportant.length > 0 &&
                                        <Grid mb="3.4rem">
                                            <Typography variant="h3" color="primary.main" textAlign="center" fontSize="2.25rem" fontWeight="500" style={{ marginBottom: '2rem' }}>
                                                Less Important
                                            </Typography>
                                            <Grid container spacing={5}>
                                                {rating.lessImportant.map((cur, index) => {
                                                    return (
                                                        <Grid item md={4} textAlign="center">
                                                             <Box className="icon-shape">
                                                                <Clock size={32} weight="light" />
                                                            </Box>
                                                            <Typography variant="body1">
                                                                {cur}
                                                            </Typography>
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        </Grid>
                                    }
                                    
                                    {rating.leastImportant.length > 0 &&<>
                                        <Grid>
                                            <Typography variant="body1" onClick={handleClick} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', cursor: 'pointer' }}>
                                                View all {open ? <ExpandLess /> : <ExpandMore />}
                                            </Typography>
                                        </Grid>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            
                                            <Grid mb="2rem">
                                                <Typography variant="h3" color="primary.main" textAlign="center" fontSize="2.25rem" fontWeight="500" style={{ marginBottom: '2rem' }}>
                                                   Least Important
                                                </Typography>
                                                <Grid container spacing={5}>

                                                    {rating.leastImportant.map((cur, index) => {
                                                        return (
                                                            <Grid item md={4} textAlign="center">
                                                                 <Box className="icon-shape">
                                                                    <Clock size={32} weight="light" />
                                                                </Box>
                                                                <Typography variant="body1">
                                                                    {cur}
                                                                </Typography>
                                                            </Grid>
                                                        )
                                                    })}
                                                
                                                </Grid>
                                            </Grid>
                                        </Collapse>
                                    </>}
                                </Card>
                            }
                        </Grid>
                        
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        <Grid xs={12} pl="1.5rem" pr="1.5rem">
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
                                  <div id="pdf-page" ref={summaryGridRef} style={isPdfGeneration == true ? { backgroundColor: '#FAF6ED', width: '100%', height: '296mm', paddingLeft: '1rem', paddingRight: '1rem' } : { backgroundColor: '#FAF6ED', width: '100%' }}>
                                    <ChecklistQues quiz={sameSection} isPdfGeneration={isPdfGeneration} isloading={isloading} />  
                                  </div>
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
                                  <Button className="save-ques-btn" variant="outlined"><img src={EnvelopeIcon} alt="Envelope Icon" />Email</Button>
                                  <Button className="save-ques-btn" variant="outlined" onClick={downloadSummary} ><img src={DownloadIcon} alt="Download Icon"  />Download</Button>
                                </Stack>
                              </Grid>
                            </Grid>
                        </Grid>
                    </CustomTabPanel>
                </Container>
          </Grid>
        </div>
      </Layout>
    </StyledEngineProvider>
  );
}