import { Box, Divider, Grid, ThemeProvider, Typography, Stack, Button } from "@mui/material";
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
import html2canvas from "html2canvas";
export default function MyStuff() {
  const darkGreen = "#0c3a25";
  const lightGreen = '#dff0d8';
  const [sameSection, setSameSection] = useState<mystuff_page_questions_list>();
  const [pageTitlesData, setPageTitlesData] =
    useState<mystuff_page_title_subtitles>();
  const [notes, setNote] = useState([""]);
  const [modalShow, setModalShow] = useState(false);
  const [noteIndex, setIndex] = useState(0);
  const summaryGridRef = useRef<HTMLDivElement | null>(null);
const [isPdfGeneration, setIsPdfGeneration] = useState(false);
  const [languageState, setLanguageState] = useState("en");
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
    // setLoading(true);
      const element = document.getElementById('pdf-page'); // Get the container element by its ID
    var orientation = 'portrait';
    var options = {
      margin: [0, 0, 0, 0], // [top, right, bottom, left]
      enableLinks: true,
      filename: 'Quiz-result.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      css: 'custom-styles',
      html2canvas: {
        scale: 2.0, 
                scrollX: 0, 
                scrollY:0, 
        letterRendering: true
      },
      jsPDF: {
        orientation: 'portrait', 
        unit: 'pt', 
        format: 'letter', 
        compressPDF: true,
        pagebreak: { mode: ['css', 'legacy'], before: '.before', after: '.after', avoid: '.avoid' }
      }
    };
    window.setTimeout(() => {
        html2pdf().set(options).from(element).save().then(() => {
            setIsPdfGeneration(false);
            // setLoading(false);
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
  //returns index of where edit occurs
  return (
    <Layout>
      <div >
        <Grid container columns={{ xl: 12, lg: 12, md: 12 }} item xl={12} lg={12} md={12}
          sx={{
            backgroundColor: "#FAF6ED", direction: "column",
            mt: 0, pt: 8, pb: 8, display: "flex", alignItems: "center", justifyContent: "center"
          }} >
          {/* Main title */}
          <Grid item xl={5} lg={5} md={5} sx={{ alignItems: "center" }}>
            {pageTitlesData?.data.attributes.Title != null ? (
              <Typography variant="h4" color={darkGreen} fontWeight="500" style={{ marginBottom: '1rem' }}>
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
            <Grid container item xl={5} lg={5} md={5} sx={{ alignItems: "center", justifyContent: "space-between" }}>
             {sameSection?.data != null ? (
                <div id="pdf-page" ref={summaryGridRef} style={{ width: '100%', height: '100%', paddingLeft: '1rem', paddingRight: '1rem' }}>
                  <ChecklistQues quiz={sameSection} isPdfGeneration={isPdfGeneration} />  
                </div>
              ) : null}
            </Grid>
          </Grid>
          <Grid container item xl={12} lg={12} md={12} sx={{ alignItems: "center", justifyContent: "center", pt: 6, pb: 3 }}>
            <Grid container item xl={5} lg={5} md={5} sx={{ alignItems: "center", justifyContent: "center" }}>
              <Typography variant="h4" color={darkGreen} fontWeight="500">Save Your Questions</Typography>
            </Grid>
          </Grid>
          <Grid container item xl={12} lg={12} md={12} sx={{ alignItems: "center", justifyContent: "center", pt: 0, pb: 8 }}>
            <Grid container item xl={5} lg={5} md={5} sx={{ alignItems: "center", justifyContent: "center" }}>
               <Stack spacing={2} direction="row">
                <Button className="save-ques-btn" variant="outlined"><img src={EnvelopeIcon} alt="Envelope Icon" />Email</Button>
                <Button className="save-ques-btn" variant="outlined" onClick={downloadSummary} ><img src={DownloadIcon} alt="Download Icon"  />Download</Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}