import {
  Button,
  Divider,
  Grid,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useState, useEffect, Fragment } from "react";
import Layout from "../components/Layout";
import { StyledEngineProvider } from "@mui/material/styles";
import "./pageStyle/MyChoices.scss";
import "./pageStyle/MyChoices.css";
import { Sources } from "../components/AccordionContent/Sources";
import { Popup } from "../components/Popup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Link } from "react-router-dom";
import {
  mychoices_page_title_subtitles,
  mychoices_page_learn_about,
  mychoices_page_risks_accordion,
  mychoices_same,
  mychoices_risk_forall,
  mychoices_source_data,
  mychoices_sections,
  mychoices_needhelp,
} from "../utils/types";
import { Container } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { REACT_APP_api_base_url, DEFAULT_LANGUAGE } from "../utils/url_config";
import axios from "axios";

const MyChoices = () => {
  const darkGreen = "#0c3a25";
  const lightGreen = "#dff0d8";
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorCesarElBirth, setAnchorElCesarBirth] = useState<HTMLButtonElement | null>(null);
  const [anchorElPneu, setAnchorElPneu] = useState<HTMLButtonElement | null>(
    null
  );
    const [anchorElBirth, setAnchorElBirth] = useState<HTMLButtonElement | null>(
    null
  )
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleClickPneu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPneu(event.currentTarget);
  };
  const handleClosePneu = () => {
    setAnchorElPneu(null);
  };
 const handleCloseBirth = () => {
    setAnchorElBirth(null)
  }
   const handleCloseCesarBirth = () => {
    setAnchorElCesarBirth(null)
  }
   const handleClickBirth = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElBirth(event.currentTarget)
  }

  const handleClickCesarBirth = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorElCesarBirth(event.currentTarget)
  }
  
  const openBirth = Boolean(anchorElBirth)
  const openPneu = Boolean(anchorElPneu);
  const openCesarBirth = Boolean(anchorCesarElBirth);


  const [languageState, setLanguageState] = useState("en");
  const [pageTitlesData, setPageTitlesData] =
    useState<mychoices_page_title_subtitles>();
  const [learnAboutData, setLearnAboutData] =
    useState<mychoices_page_learn_about>();
  const [risksAccordionTitle, setRisksAccordionTitle] =
    useState<mychoices_page_risks_accordion>();
  const [sameSection, setSameSection] = useState<mychoices_same>();
  const [forAll, setForAll] = useState<mychoices_risk_forall>();
  const [sourceData, setSourceData] = useState<mychoices_source_data>();
  const [sectionsData, setSectionsData] = useState<mychoices_sections>();
  const [needHelpData, setNeedHelpData] = useState<mychoices_needhelp>();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  useEffect(() => {
    if (width <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener("storage", () => {
      setLanguageState(localStorage.getItem("language") || "en");
    });
  }, []);

  useEffect(() => {
    const fetchPageTitlesData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            "/api/my-choices-page-title?populate=deep&locale=" +
            localStorage.getItem("language")
        );
        setPageTitlesData(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              "/api/my-choices-page-title?populate=deep&locale=" +
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
    const fetchLearnAboutData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            "/api/my-choices-learn-about?populate=deep&locale=" +
            localStorage.getItem("language")
        );
        setLearnAboutData(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              "/api/my-choices-learn-about?populate=deep&locale=en"
          );
          setLearnAboutData(result.data);
        } catch (error) {
          console.error(
            "Error fetching learn about data with default locale: ",
            error
          );
        }
      }
    };

    const fetchRisksAccordionTitle = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            "/api/my-choices-risks-accordion-title?populate=deep&locale=" +
            localStorage.getItem("language")
        );
        setRisksAccordionTitle(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              "/api/my-choices-risks-accordion-title?populate=deep&locale=en"
          );
          setRisksAccordionTitle(result.data);
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
        const result = await axios.get(
          REACT_APP_api_base_url +
            "/api/my-choices-same?populate=deep&locale=" +
            localStorage.getItem("language")
        );
         const sortedData = result.data.data.sort((a: any, b: any) => {
          return a.id - b.id;
        });
        setSameSection(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              "/api/my-choices-same?populate=deep&locale=" +
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
    const fetchForAll = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            "/api/my-choices-risks-foralls?populate=content&locale=" +
            localStorage.getItem("language")
        );
        const sortedData = result.data.data.sort((a: any, b: any) => {
          return a.id - b.id;
        });
        setForAll(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              "/api/my-choices-risks-foralls?populate=content&locale=" +
              DEFAULT_LANGUAGE
          );
          setForAll(result.data);
        } catch (error) {
          console.error(
            "Error fetching learn about data with default locale: ",
            error
          );
        }
      }
    };
    const fetchSourceData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            "/api/my-choices-source-accordions?populate=deep&locale=" +
            localStorage.getItem("language")
        );
         const sortedData = result.data.data.sort((a: any, b: any) => {
          return a.id - b.id;
        });
        setSourceData(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              "/api/my-choices-source-accordions?populate=deep&locale=" +
              DEFAULT_LANGUAGE
          );
          setSourceData(result.data);
        } catch (error) {
          console.error(
            "Error fetching learn about data with default locale: ",
            error
          );
        }
      }
    };
    const fetchSectionData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            "/api/my-choices-sections?populate[title][populate]=*&populate[content1][populate]=*&populate[content2][populate]=*&populate[content3][populate]=*&locale=" +
            localStorage.getItem("language") +"&_sort=createdAt:ASC" // Add the sorting parameter here
        );
        const sortedData = result.data.data.sort((a: any, b: any) => {
          return a.id - b.id;
        });
        setSectionsData(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              "/api/my-choices-sections?populate[title][populate]=*&populate[content1][populate]=*&populate[content2][populate]=*&populate[content3][populate]=*&locale=" +
              DEFAULT_LANGUAGE
          );
          setSectionsData(result.data);
        } catch (error) {
          console.error(
            "Error fetching learn about data with default locale: ",
            error
          );
        }
      }
    };
    const fetchNeedHelpData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            "/api/my-choices-need-help?populate=*&locale=" +
            localStorage.getItem("language")
        );
        setNeedHelpData(result.data);
      } catch (error) {
        console.error("Error fetching learn about data: ", error);
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              "/api/my-choices-need-help?populate=*&locale=" +
              DEFAULT_LANGUAGE
          );
          setNeedHelpData(result.data);
        } catch (error) {
          console.error(
            "Error fetching learn about data with default locale: ",
            error
          );
        }
      }
    };
    fetchPageTitlesData();
    fetchLearnAboutData();
    fetchRisksAccordionTitle();
    fetchSameSection();
    fetchForAll();
    fetchSourceData();
    fetchSectionData();
    fetchNeedHelpData();
  }, [languageState]);
  return (
    <StyledEngineProvider injectFirst>
      <Layout>
        {/* Main title */}
        <Grid
          container
          columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            direction: "column",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            sx={{
              mb: !isMobile ? "2rem" : "",
              mt: !isMobile ? "5.1rem" : "2.5rem" ,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            {/* mt:"81px" */}
            {pageTitlesData?.data.attributes.pageTitle != null ? (
              <Typography variant="h2" color="primary" sx={{ textAlign: 'center', mb: 6 }}>
                {pageTitlesData?.data.attributes.pageTitle}
              </Typography>
            ) : null}
          </Grid>
          {/* Sub title */}
          {!isMobile ? (
           <>
            {pageTitlesData?.data.attributes != null ? (
              <Container maxWidth="lg">
                  <Grid container spacing={2} justifyContent="center">
                      <Grid item xs={4}>
                          <Typography sx={{ fontSize: 24, mb: 0}} variant="h5" color="primary.main">
                              {pageTitlesData?.data.attributes.subTitle1}
                          </Typography>
                      </Grid>
                  
                  
                      <Grid item xs={4}>
                          <Typography sx={{ fontSize: 24, mb: 0}} variant="h5" color="primary.main">
                              {pageTitlesData?.data.attributes.subTitle2}
                          </Typography>
                      </Grid>
                  
                  
                      <Grid item xs={4}>
                          <Typography sx={{ fontSize: 24, mb: 0}} variant="h5" color="primary.main">
                              {pageTitlesData?.data.attributes.subTitle3}
                          </Typography>
                      </Grid>
                  </Grid>
              </Container>
            ) : null}
          </>) : (
            ""
          )}

          {/* Details Part */}
          {/* section Timing */}
          <Grid
            container
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            sx={{ alignItems: "center", justifyContent: "center", mt: "6rem" }}
            className="TimeBlock"
          > 
          <Container maxWidth="lg">
                {sectionsData?.data[0].attributes.title != null ? (
                    <Grid container>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Typography sx={{ fontSize: 36, mb: 0}} variant="h5" color={!isMobile ? "primary.main" : "primary.dark" }>
                            {" "}
                            {sectionsData?.data[0].attributes.title.title}
                          </Typography>
                        </Grid>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Typography variant="body1" className="four-tags-subtitle">
                            {" "}
                            {sectionsData?.data[0].attributes.title.description}
                          </Typography>
                        </Grid>
                        {/* line */}
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Divider sx={{ mt: "1rem" }} className="vector" />
                        </Grid>
                    </Grid>
                ) : null}
                {/* section of data (and circles) */}
                <Grid
                  className="TimeBlock-content"
                  container
                  sx={{
                    mt: "4rem",
                    justifyContent: "space-between",
                  }}
                >
                  {sectionsData?.data[0].attributes.content1[0].picture1.data
                     != null ? (
                    <Grid item xs={6} sm={4} textAlign="center" >
                      <img
                        src={
                          REACT_APP_api_base_url +
                          sectionsData?.data[0].attributes.content1[0].picture1.data
                            .attributes.url
                        }
                      />
                    </Grid>
                  ) : null}
                  {sectionsData?.data[0].attributes.content2[0].picture1.data
                      !=
                  null ? (
                    <Grid item xs={6} sm={4} textAlign="center">
                    {sectionsData?.data[0].attributes.content2[0].picture1.data &&
                      <img
                        src={
                          REACT_APP_api_base_url +
                          sectionsData?.data[0].attributes.content2[0].picture1.data
                            .attributes.url
                        }
                      />}
                    </Grid>
                  ) : null}
                  { sectionsData?.data[0].attributes.content3[0].picture1.data
                     !=
                    null && !isMobile ? (
                    <Grid item xs={6} sm={4} textAlign="center">
                      <img
                        src={
                          REACT_APP_api_base_url +
                          sectionsData?.data[0].attributes.content3[0].picture1.data
                            .attributes.url
                        }
                      />
                    </Grid>
                  ) : null}
                </Grid>
            </Container>
          </Grid>
          {/* section Labor Time */}
          <Grid
            className="TimeBlock"
            container
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            sx={{ alignItems: "center", justifyContent: "center", mt: "6rem" }}
          >
            <Container maxWidth="lg">
                {sectionsData?.data[1].attributes.title != null ? (
                  <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontSize: 36, mb: 0}} variant="h5" color={!isMobile ? "primary.main" : "primary.dark" }>
                        {" "}
                        {sectionsData?.data[1].attributes.title.title}
                      </Typography>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Typography variant="body1" className="four-tags-subtitle">
                        {" "}
                        {sectionsData?.data[1].attributes.title.description}
                      </Typography>
                    </Grid>
                    {/* line */}
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Divider sx={{ mt: "1rem" }} className="vector" />
                    </Grid>
                  </Grid>
                ) : null}
                {/* section of data (and circles) */}
                <Grid
                  className="TimeBlock-content"
                  container
                  sx={{
                    mt: "4rem",
                    justifyContent: "space-between",
                  }}
                >
                  {sectionsData?.data[1].attributes != null ? (
                    <Fragment>
                      <Grid item xs={4} textAlign="center">
                      {sectionsData?.data[1].attributes.content1[0].picture1
                              .data !=null &&
                        <img
                          src={
                            REACT_APP_api_base_url +
                            sectionsData?.data[1].attributes.content1[0].picture1
                              .data.attributes.url
                          }
                        />}
                      </Grid>
                      <Grid item xs={4} textAlign="center">
                       {sectionsData?.data[1].attributes.content1[0].picture1
                              .data !=null &&
                        <img
                          src={
                            REACT_APP_api_base_url +
                            sectionsData?.data[1].attributes.content2[0].picture1
                              .data.attributes.url
                          }
                        />}
                      </Grid>
                      {!isMobile ? (
                        <Grid item xs={4} textAlign="center">
                          {sectionsData?.data[1].attributes.content3[0].picture1
                                .data &&
                          <img
                            src={
                              REACT_APP_api_base_url +
                              sectionsData?.data[1].attributes.content3[0].picture1
                                .data.attributes.url
                            }
                          />
                        }
                        </Grid>
                      ) : null}
                    </Fragment>
                  ) : null}
                </Grid>
            </Container>
          </Grid>
          {/* Experience Section */}
          <Grid
            className="TimeBlock"
            container
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            sx={{ alignItems: "center", justifyContent: "center", mt: "6rem" }}
          >
            <Container maxWidth="lg">
                {sectionsData?.data[2].attributes.title != null ? (
                  <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontSize: 36, mb: 0}} variant="h5" color={!isMobile ? "primary.main" : "primary.dark" } display="inline">
                        {" "}
                        {sectionsData?.data[2].attributes.title.title}
                      </Typography>
                      <Typography display="inline" className="experience-7">
                        {sectionsData?.data[2].attributes.title.titleNumber}
                      </Typography>
                    </Grid>

                    {/* line */}
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Divider sx={{ mt: "1rem" }} className="vector" />
                    </Grid>
                  </Grid>
                ) : null}
                {/* section of data (and circles) */}
                <Grid
                  container
                  sx={{
                    mt: "4rem",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Grid item container xl={5} lg={5} md={5} sm={5} xs={5} justifyContent="center">
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} textAlign="center">
                      {sectionsData?.data[2].attributes.content1[0].picture1.data
                           !=
                      null ? (
                        <img
                          src={
                            REACT_APP_api_base_url +
                            sectionsData?.data[2].attributes.content1[0].picture1
                              .data.attributes.url
                          }
                        />
                      ) : null}
                    </Grid>
                    <Grid
                      item
                      width="10.6875rem"
                      height="4.5625rem"
                      sx={{
                        mt: "2rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {sectionsData?.data[2].attributes.content1[0].content1 !=
                      null ? (
                        <Typography className="experience-body-content">
                          {sectionsData?.data[2].attributes.content1[0].content1}
                        </Typography>
                      ) : null}
                    </Grid>
                  </Grid>

                  {!isMobile ? (
                    <Grid container item xl={7} lg={7} md={7} sm={7} xs={7} justifyContent="center">
                      {/* {REACT_APP_api_base_url +
                      sectionsData?.data[2].attributes.content2[0].picture1.data
                        .attributes.url !=
                    null ? ( */}
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} textAlign="center">
                      {sectionsData?.data[2].attributes.content2[0].picture1
                              .data !=null &&
                        <img
                          src={
                            REACT_APP_api_base_url +
                            sectionsData?.data[2].attributes.content2[0].picture1
                              .data.attributes.url
                          }
                        /> } 
                      </Grid>
                      {/* ) : null} */}
                      <Grid
                        item
                        width="12rem"
                        height="4.5625rem"
                        sx={{
                            mt: "2rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                      >
                        {sectionsData?.data[2].attributes.content2[0].content1 !=
                        null ? (
                          <Typography className="experience-body-content">
                            {sectionsData?.data[2].attributes.content2[0].content1}
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                      {/* {REACT_APP_api_base_url +
                      sectionsData?.data[2].attributes.content2[0].picture1.data
                        .attributes.url !=
                    null ? ( */}
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className="w-full"
                          src={
                            REACT_APP_api_base_url +
                            sectionsData?.data[2].attributes.content2[0].picture1
                              .data.attributes.url
                          }
                        />
                      </Grid>

                      {/* ) : null} */}
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        width="10.6875rem"
                        height="4.5625rem"
                        sx={{
                          mt: "2rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {sectionsData?.data[2].attributes.content2[0].content1 !=
                        null ? (
                          <Typography
                            className="experience-body-content"
                            textAlign="center"
                          >
                            {sectionsData?.data[2].attributes.content2[0].content1}
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>
                  )}
                </Grid>
            </Container>
          </Grid>
          {/* Pain Medication Section */}
          <Grid
            className="TimeBlock"
            container
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={8}
            sx={{ alignItems: "center", justifyContent: "center", mt: "6rem" }}
          >
            <Container maxWidth="lg">
                {sectionsData?.data[3].attributes.title != null ? (
                  <Grid container>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Typography sx={{ fontSize: 36, mb: 0}} variant="h5" color={!isMobile ? "primary.main" : "primary.dark" } display="inline">
                        {" "}
                        {sectionsData?.data[3].attributes.title.title}
                      </Typography>
                      <Typography display="inline" className="experience-7">
                        {" "}
                        {sectionsData?.data[3].attributes.title.titleNumber}
                      </Typography>
                    </Grid>

                    {/* line */}
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Divider sx={{ mt: "1rem" }} className="vector" />
                    </Grid>
                  </Grid>
                ) : null}
                {/* section of data (and circles) */}
                <Grid
                  className="TimeBlock-content"
                  container
                  item
                  sx={{
                    mt: "4rem",
                    justifyContent: "space-between",
                  }}
                >
                  <Grid container item xl={5} lg={5} md={5} sm={5} xs={5} flexDirection="column">
                    {sectionsData?.data[3].attributes.content1[0].picture1.data
                         !=
                    null ? (
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        width="10rem"
                        height="10rem"
                      >
                        {!isMobile ? (
                          <img
                            src={
                              REACT_APP_api_base_url +
                              sectionsData?.data[3].attributes.content1[0].picture1
                                .data.attributes.url
                            }
                          />
                        ) : (
                          <img
                            src={
                              REACT_APP_api_base_url +
                              sectionsData?.data[3].attributes.content1[0].picture1
                                .data.attributes.url
                            }
                          />
                        )}
                      </Grid>
                    ) : null}
                  </Grid>

                  <Grid container item xl={7} lg={7} md={7} sm={7} xs={7} flexDirection="row" justifyContent="center">
                    {
                      sectionsData?.data[3].attributes.content2[0].picture1.data
                        !=
                    null ? (
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        width="27.5625rem"
                        height="10rem"
                        textAlign="center"
                      >
                        {!isMobile ? (
                          <img
                            src={
                              REACT_APP_api_base_url +
                              sectionsData?.data[3].attributes.content2[0].picture1
                                .data.attributes.url
                            }
                          />
                        ) : (
                          <img
                            src={
                              REACT_APP_api_base_url +
                              sectionsData?.data[3].attributes.content2[0].picture1
                                .data.attributes.url
                            }
                          />
                        )}
                      </Grid>
                    ) : null}
                    {sectionsData?.data[3].attributes.content2[0].content1 !=
                    null ? (
                      <Grid
                        item
                        xl={7}
                        lg={7}
                        md={7}
                        sm={7}
                        xs={7}
                        sx={{
                          mt: "3rem",
                        }}
                      >
                        {!isMobile ? (
                          <Typography className="no-difference">
                            {sectionsData?.data[3].attributes.content2[0].content1}
                          </Typography>
                        ) : null}
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
            </Container>
          </Grid>
          {/* Same */}
          {sameSection?.data.attributes != null ? (
            <Grid container sx={{ justifyContent: "center" }}>
              <Grid
                className="quote-box"
                item
                sx={{
                  mt: "5rem",
                }}
              >
                {!isMobile ? (
                  <Grid className="same-rectangle" item>
                    <Typography display="inline" className="same-for-all-opts">
                      {sameSection?.data.attributes.content1}
                    </Typography>
                    <Typography display="inline" className="same-breastfeed">
                      {sameSection?.data.attributes.content2}
                    </Typography>
                    <Typography display="inline" className="same-for-all-opts">
                      {sameSection?.data.attributes.number}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid
                    className="same-rectangle"
                    item
                    sx={{ width: "20.75rem" }}
                  >
                    <Typography display="inline" className="same-for-all-opts">
                      {sameSection?.data.attributes.content1}
                    </Typography>
                    <Typography display="inline" className="same-breastfeed">
                      {sameSection?.data.attributes.content2}
                    </Typography>
                    <Typography display="inline" className="same-for-all-opts">
                      {sameSection?.data.attributes.number}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          ) : null}
          {/* Potential Risks Section */}
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Container maxWidth="lg">
                {/* title */}
                {sectionsData?.data[4].attributes.title != null ? (
                  <Grid
                   className="Risks-section"
                    container
                    item
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      mt: "6rem",
                    }}
                  >
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Typography
                        sx={{ fontSize: 36, mb: 0}}
                        display="inline"
                        variant="h5"
                        className="secondTitle title2"
                      >
                        {sectionsData?.data[4].attributes.title.title}
                      </Typography>
                      {sectionsData?.data[4].attributes.title.titleNumber &&
                        <Typography display="inline" className="potential-risks-6">
                          {" "}
                          {sectionsData?.data[4].attributes.title.titleNumber}
                        </Typography>
                      }
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Typography className="potential-risks-subtitle">
                        {" "}
                        {sectionsData?.data[4].attributes.title.description}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : null}

                {/* view risks */}

                <Grid
                className="viewrisks"
                  container
                  item
                  sx={{
                    mt: "2rem",
                  }}
                >
                  <Accordion className="view-risks-accordion-main details-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className="expandIcon" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className="view-risks-accordion"
                    >
                      {risksAccordionTitle?.data.attributes.title != null ? (
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography
                            className="view-risks-title"
                            sx={{ flexGrow: 1, textAlign: "center" }}
                          >
                            {risksAccordionTitle?.data.attributes.title}
                          </Typography>
                        </Grid>
                      ) : null}
                    </AccordionSummary>
                    <AccordionDetails className="view-risks-details" sx={{ py: 3 }}>
                      <Grid
                        container
                        sx={{
                          mt: "4.5rem",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Grid
                          container
                          item
                          xl={11}
                          lg={11}
                          md={11}
                          sm={11}
                          xs={11}
                          sx={{ alignItems: "center", justifyContent: "center" }}
                        >
                          {sectionsData?.data[5].attributes.title != null ? (
                            <Grid container>
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Typography
                                  display="inline"
                                  className="FourTagsStyle test"
                                  bgcolor={lightGreen}
                                  onClick={handleClickCesarBirth}
                                >
                                  {" "}
                                  {sectionsData?.data[5].attributes.title.title}
                                </Typography>
                                <Typography
                                  sx={{ ml: "0.25rem" }}
                                  display="inline"
                                  className="cesarean-birth-8"
                                >
                                  {
                                    sectionsData?.data[5].attributes.title
                                      .titleNumber
                                  }
                                </Typography>
                             {sectionsData?.data[5].attributes.title.description?   
                              <Popup
                                open={openCesarBirth}
                                anchorEl={anchorCesarElBirth}
                                handleClose={handleCloseCesarBirth}
                                title={sectionsData?.data[5].attributes.title.title}
                                text={sectionsData?.data[5].attributes.title.description}
                              />
                              : null }
                              </Grid>

                              {/* line */}
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Divider
                                  sx={{ mt: "0.75rem" }}
                                  className="vector-risks"
                                />
                              </Grid>
                            </Grid>
                          ) : null}
                          
                          {!isMobile ? (
                            <Grid
                              container
                              item
                              xl={10}
                              lg={10}
                              md={10}
                              sm={10}
                              xs={10}
                              sx={{
                                mt: "4rem",
                              }}
                              justifyContent="space-between"
                            >
                              <Fragment>
                                <Grid item>
                                  {sectionsData?.data[5].attributes.content1[0]
                                    .picture1.data != null ? (
                                    <img
                                      width="180.45px"
                                      height="243px"
                                      src={
                                        REACT_APP_api_base_url +
                                        sectionsData?.data[5].attributes.content1[0]
                                          .picture1.data.attributes.url
                                      }
                                    />
                                  ) : null}
                                </Grid>
                                <Grid item>
                                  {sectionsData?.data[5].attributes.content2[0]
                                      .picture1.data !=
                                  null ? (
                                    <img
                                      width="180.45px"
                                      height="243px"
                                      src={
                                        REACT_APP_api_base_url +
                                        sectionsData?.data[5].attributes.content2[0]
                                          .picture1.data.attributes.url
                                      }
                                    />
                                  ) : null}
                                </Grid>
                                <Grid item>
                                  {sectionsData?.data[5].attributes.content3[0]
                                      .picture1.data !=
                                  null ? (
                                    <img
                                      width="180.45px"
                                      height="283px"
                                      src={
                                        REACT_APP_api_base_url +
                                        sectionsData?.data[5].attributes.content3[0]
                                          .picture1.data.attributes.url
                                      }
                                    />
                                  ) : null}
                                </Grid>
                              </Fragment>
                            </Grid>
                            ) : (
                              <Grid
                                container
                                item
                                xs={12}
                                spacing={2}
                                sx={{
                                  mt: "2rem",
                                }}
                                justifyContent="space-between"
                              >
                                <Grid item xs={6} sx={{ mb: "2rem" }}>
                                  <img
                                    className="w-max-full"
                                    src={
                                      REACT_APP_api_base_url +
                                        sectionsData?.data[5].attributes.content1[0]
                                          .picture1.data.attributes.url
                                    }
                                  />
                                </Grid>
                                <Grid item xs={6} sx={{ mb: "2rem" }}>
                                  <img
                                    className="w-max-full"
                                    src={
                                      REACT_APP_api_base_url +
                                        sectionsData?.data[5].attributes.content2[0]
                                          .picture1.data.attributes.url
                                    }
                                  />
                                </Grid>
                            </Grid>
                            )}
                        </Grid>
                        <Grid
                          container
                          item
                          xl={11}
                          lg={11}
                          md={11}
                          sm={11}
                          xs={11}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: "1.5rem",
                          }}
                        >
                          {sectionsData?.data[6].attributes.title != null ? (
                            <Grid container>
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Typography
                                  display="inline"
                                  className="FourTagsStyle"
                                >
                                  {" "}
                                  {sectionsData?.data[6].attributes.title.title}
                                </Typography>
                                <Typography
                                  sx={{ ml: "0.25rem" }}
                                  display="inline"
                                  className="cesarean-birth-8"
                                >
                                  {
                                    sectionsData?.data[6].attributes.title
                                      .titleNumber
                                  }
                                </Typography>
                              </Grid>

                              {/* line */}
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Divider
                                  sx={{ mt: "0.75rem" }}
                                  className="vector-risks"
                                />
                              </Grid>
                            </Grid>
                          ) : null}

                          {!isMobile ? (
                            <Grid
                              container
                              item
                              xl={10}
                              lg={10}
                              md={10}
                              sm={10}
                              xs={10}
                              sx={{
                                mt: "4rem",
                              }}
                              justifyContent="space-between"
                            >
                              <Fragment>
                                <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                  <Grid
                                    item
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                  >
                                    {sectionsData?.data[6].attributes.content1[0]
                                        .picture1.data !=
                                    null ? (
                                      <img
                                        width="180.45px"
                                        height="239px"
                                        src={
                                          REACT_APP_api_base_url +
                                          sectionsData?.data[6].attributes
                                            .content1[0].picture1.data.attributes
                                            .url
                                        }
                                      />
                                    ) : null}
                                  </Grid>
                                  <Grid item>
                                    <Typography className="potential-risks-small-content"></Typography>
                                  </Grid>
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                  <Grid
                                    item
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                  >
                                    {sectionsData?.data[6].attributes.content2[0]
                                        .picture1.data !=
                                    null ? (
                                      <img
                                        width="446px"
                                        height="239px"
                                        src={
                                          REACT_APP_api_base_url +
                                          sectionsData?.data[6].attributes
                                            .content2[0].picture1.data.attributes
                                            .url
                                        }
                                      />
                                    ) : null}
                                  </Grid>
                                  <Grid
                                    item
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                  >
                                    <Grid
                                      item
                                      xl={8}
                                      lg={8}
                                      md={8}
                                      sm={8}
                                      xs={8}
                                      sx={{
                                        mt: "2rem",
                                        ml: "6.3rem",
                                      }}
                                    >
                                      {sectionsData?.data[6].attributes.content2[0]
                                        .content1 != null ? (
                                        <Typography className="potential-risks-small-content">
                                          {
                                            sectionsData?.data[6].attributes
                                              .content2[0].content1
                                          }
                                        </Typography>
                                      ) : null}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Fragment>
                            </Grid>
                            ) : (
                              <Grid
                                container
                                item
                                xs={12}
                                spacing={2}
                                sx={{
                                  mt: "2rem",
                                }}
                                justifyContent="space-between"
                              >
                                <Grid item xs={6} sx={{ mb: "2rem" }}>
                                  <img
                                    className="w-max-full"
                                    src={
                                      REACT_APP_api_base_url +
                                          sectionsData?.data[6].attributes
                                            .content1[0].picture1.data.attributes
                                            .url
                                    }
                                  />
                                </Grid>
                                <Grid item xs={6} sx={{ mb: "2rem" }}>
                                  <img
                                    className="w-max-full"
                                    src={
                                      REACT_APP_api_base_url +
                                          sectionsData?.data[6].attributes
                                            .content2[0].picture1.data.attributes
                                            .url
                                    }
                                  />
                                </Grid>
                              </Grid>
                            )}
                        </Grid>

                        <Grid
                          container
                          item
                          xl={11}
                          lg={11}
                          md={11}
                          sm={11}
                          xs={11}
                          sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            mt: "1.5rem",
                          }}
                        >
                          {sectionsData?.data[7].attributes.title != null ? (
                            <Grid container>
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Typography
                                  display="inline"
                                  className="FourTagsStyle"
                                >
                                  {" "}
                                  {sectionsData?.data[7].attributes.title.title}
                                </Typography>
                                <Typography
                                  sx={{ ml: "0.25rem" }}
                                  display="inline"
                                  className="cesarean-birth-8"
                                >
                                  {
                                    sectionsData?.data[7].attributes.title
                                      .titleNumber
                                  }
                                </Typography>
                              </Grid>

                              {/* line */}
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Divider
                                  sx={{ mt: "0.75rem" }}
                                  className="vector-risks"
                                />
                              </Grid>
                            </Grid>
                          ) : null}
                          {!isMobile ? (
                            <Grid
                              container
                              item
                              xl={10}
                              lg={10}
                              md={10}
                              sm={10}
                              xs={10}
                              sx={{
                                mt: "4rem",
                              }}
                              justifyContent="space-between"
                            >
                              <Fragment>
                                <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                  <Grid
                                    item
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                  >
                                    {sectionsData?.data[7].attributes.content1[0]
                                        .picture1.data !=
                                    null ? (
                                      <img
                                        width="180.45px"
                                        height="254px"
                                        src={
                                          REACT_APP_api_base_url +
                                          sectionsData?.data[7].attributes
                                            .content1[0].picture1.data.attributes
                                            .url
                                        }
                                      />
                                    ) : null}
                                  </Grid>
                                  <Grid item>
                                    <Typography className="potential-risks-small-content"></Typography>
                                  </Grid>
                                </Grid>
                                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                                  <Grid
                                    item
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                  >
                                    { sectionsData?.data[7].attributes.content2[0]
                                        .picture1.data !=
                                    null ? (
                                      <img
                                        width="449px"
                                        height="264px"
                                        src={
                                          REACT_APP_api_base_url +
                                          sectionsData?.data[7].attributes
                                            .content2[0].picture1.data.attributes
                                            .url
                                        }
                                      />
                                    ) : null}
                                  </Grid>
                                  <Grid
                                    item
                                    xl={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    xs={12}
                                  >
                                    <Grid
                                      item
                                      xl={8}
                                      lg={8}
                                      md={8}
                                      sm={8}
                                      xs={8}
                                      sx={{
                                        mt: "2rem",
                                        ml: "6.3rem",
                                      }}
                                    >
                                      {sectionsData?.data[7].attributes.content2[0]
                                        .content1 != null ? (
                                        <Typography className="potential-risks-small-content">
                                          {
                                            sectionsData?.data[7].attributes
                                              .content2[0].content1
                                          }
                                        </Typography>
                                      ) : null}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Fragment>
                            </Grid>
                            ) : (
                              <Grid
                                container
                                item
                                xs={12}
                                spacing={2}
                                sx={{
                                  mt: "2rem",
                                }}
                                justifyContent="space-between"
                              >
                                <Grid item xs={6} sx={{ mb: "2rem" }}>
                                  <img
                                    className="w-max-full"
                                    src={
                                      REACT_APP_api_base_url +
                                          sectionsData?.data[7].attributes
                                            .content1[0].picture1.data.attributes
                                            .url
                                    }
                                  />
                                </Grid>
                                <Grid item xs={6} sx={{ mb: "2rem" }}>
                                  <img
                                    className="w-max-full"
                                    src={
                                      REACT_APP_api_base_url +
                                          sectionsData?.data[7].attributes
                                            .content2[0].picture1.data.attributes
                                            .url
                                    }
                                  />
                                </Grid>
                              </Grid>
                            )}
                        </Grid>

                        <Grid
                          container
                          item
                          xl={11}
                          lg={11}
                          md={11}
                          sm={11}
                          xs={11}
                          sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            mt: "1.5rem",
                            mb: "1.5rem",
                          }}
                        >
                          {sectionsData?.data[8].attributes.title != null ? (
                            <Grid container>
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Typography
                                  display="inline"
                                  className="FourTagsStyle"
                                >
                                  {" "}
                                  {sectionsData?.data[8].attributes.title.title}
                                </Typography>
                                <Typography
                                  sx={{ ml: "0.25rem" }}
                                  display="inline"
                                  className="cesarean-birth-8"
                                >
                                  {
                                    sectionsData?.data[8].attributes.title
                                      .titleNumber
                                  }
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={12}
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                                sx={{ mt: "0.5rem" }}
                              >
                                <Typography className="four-tags-subtitle">
                                  {" "}
                                  {
                                    sectionsData?.data[8].attributes.title
                                      .description
                                  }
                                </Typography>
                              </Grid>

                              {/* line */}
                              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                <Divider
                                  sx={{ mt: "0.75rem" }}
                                  className="vector-risks"
                                />
                              </Grid>
                            </Grid>
                          ) : null}
                          {!isMobile ? (
                            <Grid
                              container
                              item
                              xl={10}
                              lg={10}
                              md={10}
                              sm={10}
                              xs={10}
                              sx={{
                                mt: "4rem",
                              }}
                              justifyContent="space-between"
                            >
                              <Fragment>
                                <Grid
                                  item
                                  xl={3}
                                  lg={3}
                                  md={3}
                                  sm={3}
                                  xs={3}
                                  sx={{ mt: "4.5rem" }}
                                >
                                  {sectionsData?.data[8].attributes.content1[0]
                                    .content1 != null ? (
                                    <Typography className="potential-risks-small-content">
                                      {
                                        sectionsData?.data[8].attributes.content1[0]
                                          .content1
                                      }
                                    </Typography>
                                  ) : null}
                                </Grid>
                                <Grid item>
                                
                                  {sectionsData?.data[8].attributes.content2[0].picture1.data != null && sectionsData?.data[8].attributes.content2[0].picture1.data.attributes.url != undefined ? (
                                    <img
                                      width="180.45px"
                                      height="243px"
                                      src={
                                        REACT_APP_api_base_url +
                                        sectionsData?.data[8].attributes.content2[0]
                                          .picture1.data.attributes.url
                                      }
                                    />
                                  ) : null}
                                </Grid>

                                <Grid item>
                                {sectionsData?.data[8]?.attributes.content3[0].picture1.data != null ? (
                                    <img
                                      width="180.45px"
                                      height="235.66px"
                                      src={
                                        REACT_APP_api_base_url +
                                        sectionsData?.data[8].attributes.content3[0]
                                          .picture1.data.attributes.url
                                      }
                                    />
                                  ) : null}
                                </Grid>
                              </Fragment>
                            </Grid>
                            ) : (
                              <Grid
                                container
                                item
                                xs={12}
                                spacing={2}
                                sx={{
                                  mt: "2rem",
                                }}
                                justifyContent="space-between"
                              >
                                <Grid item xs={6} sx={{ mb: "2rem" }}>
                                  <img
                                    className="w-max-full"
                                    src={
                                      REACT_APP_api_base_url +
                                        sectionsData?.data[8].attributes.content2[0]
                                          .picture1.data.attributes.url
                                    }
                                  />
                                </Grid>
                                <Grid
                                  item
                                  sm={5}
                                  xs={5}
                                  sx={{
                                    mb: "2rem",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex",
                                  }}
                                >
                                  <Typography className="potential-risks-small-content">
                                    {
                                      sectionsData?.data[8].attributes.content1[0]
                                        .content1
                                    }
                                  </Typography>
                                </Grid>
                              </Grid>
                            )}
                        </Grid>
                      </Grid>

                    </AccordionDetails>
                    {forAll ? (
                      <Grid
                        container
                        className="for-all-rectangle"
                        sx={{
                          pt: "3rem",
                          pb: "2rem",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Grid className="for-all-rectangle-col" item xl={7} lg={7} md={7} sm={7} xs={7}>
                          <Typography className="potential-risks-small-content">
                            {forAll?.data[0].attributes.Callout}
                          </Typography>
                        </Grid>
                        <Grid className="for-all-rectangle-col" item xl={6} lg={6} md={6} sm={6} xs={6}>
                          <Grid container sx={{ mt: "1.5rem" }}>
                            <Typography className="potential-risks-small-content2">

                              <FiberManualRecordIcon
                                sx={{ fontSize: 10, pr: "0.3125rem" }}
                              />
                              Complications for baby {'  '}
                              <Typography
                                display="inline"
                                className="potential-risks-small-content2"
                                bgcolor={lightGreen}
                                onClick={handleClick}
                              >
                             ( Seizure
                              </Typography>

                              <Popup
                                open={open}
                                anchorEl={anchorEl}
                                handleClose={handleClose}
                                title={'Seizure'}
                                text={forAll?.data[0].attributes.content[0].Popup1}
                              />

                              <Typography
                                  display="inline"
                                  className="potential-risks-small-content2"
                                  bgcolor={lightGreen}
                                  onClick={handleClickPneu}
                                >
                               {'  , '} pneumonia
                              </Typography>
                              <Popup
                                open={openPneu}
                                anchorEl={anchorElPneu}
                                handleClose={handleClosePneu}
                                title={'pneumonia'}
                                text={forAll?.data[0].attributes.content[0].Popup2}
                              />
                             {forAll?.data[0].attributes.content[0].Popup2 ?   
                              <Popup
                                open={openBirth}
                                anchorEl={anchorElBirth}
                                handleClose={handleCloseBirth}
                                title={forAll?.data[0].attributes.content[0].Title}
                                text={forAll?.data[0].attributes.content[0].Popup2}
                              />
                              : null }

                              {'  '} {forAll?.data[0].attributes.content[0].Title} {' )'}
                              <Typography
                                display="inline"
                                className="for-all-small-number"
                              >
                              {forAll?.data[0].attributes.content[0].Number}
                              </Typography>
                            </Typography>
                          </Grid>
                          {forAll?.data[0].attributes?.content?.slice(1).map((item, index) => (
                            <Grid key={index} container sx={{ mt: "1rem" }}>
                              <Typography className="potential-risks-small-content2">
                                <FiberManualRecordIcon
                                  sx={{ fontSize: 10, pr: "0.3125rem" }}
                                />
                                {item.Title}
                                <Typography
                                  display="inline"
                                  className="for-all-small-number"
                                >
                                  {item.Number}
                                </Typography>
                              </Typography>
                            </Grid>
                         ))}
                        </Grid>
                      </Grid>
                    ) : null}
                  </Accordion>
                </Grid>
            </Container>
          </Grid>
          {/* Learn about your choices */}
          {learnAboutData ? (
            <Grid
              item
              xl={8}
              lg={8}
              md={8}
              sm={8}
              xs={8}
              sx={{
                mt: "5.4375rem",
              }}
            >
              <Container maxWidth="lg">
                <Typography sx={{ fontSize: 36, mb: 0}} textAlign="center" variant="h5" color="primary.main">
                  {learnAboutData?.data.attributes.title}
                </Typography>
              </Container>
            </Grid>
          ) : null}
          {learnAboutData?.data.attributes ? (
            <Grid
              container
              item
              sx={{ mt: "2.7rem" }}
            >
              <Container maxWidth="lg">
                {!isMobile ? (
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs={6} md={4} textAlign="center">
                      <Typography className="learn-choices-subTitle" mb="1.5rem">
                        {learnAboutData?.data.attributes.subTitle1}
                      </Typography>

                      <Link className="learn-more-button" to={learnAboutData?.data.attributes.link1}>
                          {learnAboutData?.data.attributes.button1}
                      </Link>

                    </Grid>
                    <Grid item xs={6} md={4} textAlign="center">
                      <Typography className="learn-choices-subTitle" mb="1.5rem">
                        {learnAboutData?.data.attributes.subTitle2}
                      </Typography>

                      <Link className="learn-more-button" to={learnAboutData?.data.attributes.link2}>
                        {learnAboutData?.data.attributes.button2}
                      </Link>

                    </Grid>

                    <Grid item xs={6} md={4} textAlign="center">
                      <Typography className="learn-choices-subTitle" mb="1.5rem">
                        {learnAboutData?.data.attributes.subTitle3}
                      </Typography>

                      <Link className="learn-more-button" to={learnAboutData?.data.attributes.link3}>
                        {learnAboutData?.data.attributes.button3}
                      </Link>

                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={6} textAlign="center">
                      <Typography className="learn-choices-subTitle" mb="1.5rem">
                        {learnAboutData?.data.attributes.subTitle1}
                      </Typography>

                      <Link className="learn-more-button" to={learnAboutData?.data.attributes.link1}>
                          {learnAboutData?.data.attributes.button1}
                      </Link>

                    </Grid>
                    <Grid item xs={6} textAlign="center">
                      <Typography className="learn-choices-subTitle" mb="1.5rem">
                        {learnAboutData?.data.attributes.subTitle2}
                      </Typography>

                      <Link className="learn-more-button" to={learnAboutData?.data.attributes.link2}>
                        {learnAboutData?.data.attributes.button2}
                      </Link>

                    </Grid>

                    <Grid item xs={6} textAlign="center">
                      <Typography className="learn-choices-subTitle" mb="1.5rem">
                        {learnAboutData?.data.attributes.subTitle3}
                      </Typography>

                      <Link className="learn-more-button" to={learnAboutData?.data.attributes.link3}>
                        {learnAboutData?.data.attributes.button3}
                      </Link>

                    </Grid>
                  </Grid>
                )}
              </Container>
            </Grid>
          ) : null}
          {/*Sources */}
          {sourceData ? (
            <Grid
              className="source-section"
              container
              item
              xl={8}
              lg={8}
              md={8}
              sm={8}
              xs={8}
              sx={{
                mt: "5.5rem",
              }}
            >
              <Container maxWidth="lg">
                <Accordion className="accordion-details source-accordion" style={{ boxShadow: '0 0' }}>
                  <AccordionSummary
                    className="panel1a-header"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography
                        variant="h4"
                        component="h2"
                        mb="0.7rem"
                        className="secondTitle"
                    >
                      Sources
                    </Typography>

                  </AccordionSummary>
                  <AccordionDetails>
                    {sourceData?.data.map((item) => (
                      <Grid sx={{ mt: "1.75rem" }}>
                        <Sources
                          key={item.id}
                          number={item.attributes.sourceNum}
                          text1={item.attributes.sourceContent}
                          text2={item.attributes.sourceLink}
                          text3={item.attributes.sourceLinkText}
                        />
                      </Grid>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </Container>
            </Grid>
          ) : null}
          {/* need help */}
          {needHelpData ? (
            <Grid
              container
              item
              className="need-help"
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              direction="column"
              sx={{ mt: "5.25rem" }}
            >
              <Grid item width="16.4375rem" height="25.6875rem" className="william-image">
                <img
                  src={
                    REACT_APP_api_base_url +
                    needHelpData?.data.attributes.helpImage.data.attributes.url
                  }
                  id="william-image"
                />
              </Grid>
              <Grid
                className="william-image-content"
                item
                sx={{
                  ml: "3rem",
                  mt: "9.9375rem",
                  width: "23.8125rem",
                }}
              >
                <Typography
                  className="need-help-choosing"
                  sx={{ pb: "0.6rem" }}
                >
                  {needHelpData?.data.attributes.title}
                </Typography>
                <Typography className="need-help-choosing-text">
                  {needHelpData?.data.attributes.content}
                </Typography>
                <Link to="/MyValues">
                  <button className="find-out-button ">
                    {needHelpData?.data.attributes.buttonContent}
                  </button>
                </Link>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Layout>
    </StyledEngineProvider>
  );
};

export default MyChoices;
