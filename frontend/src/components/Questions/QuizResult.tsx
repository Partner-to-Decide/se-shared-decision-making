import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LayoutNested from "../LayoutNested";
import { RootState } from "../../redux/store";
import "../../pages/pageStyle/MyValues.css"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { StyledEngineProvider } from "@mui/material/styles";
import { Box, Divider, Grid, Container, ThemeProvider, Typography, Stack, Button, Link } from "@mui/material";
import {
  EnvelopeSimple,
  DownloadSimple,
  PushPinSimple,
  Clock,
} from '@phosphor-icons/react'

import FirstImg from '../../siteImages/pexels-william-fortunato-6392989.png'


const QuizResult = () => {
  //const rating = useSelector((state: RootState) => state.rating);
  //const storedRating = localStorage.getItem('QuizQuestions');

  const [width, setWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  const storedRating = localStorage.getItem('QuizQuestions')|| '';
  let rating;
  if(storedRating){
    rating = JSON.parse(storedRating);
  }

   useEffect(() => {
    if (width <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  //console.log('rating', rating);
  //if (rating.lessImportant.length > 0) {
  //localStorage.setItem('QuizQuestions', JSON.stringify(rating));
  //}
  const summaryGridRef = useRef<HTMLDivElement>(null);

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

  // todo: can not download
  const downloadSummary = async () => {
    console.log("download")
    if (!summaryGridRef.current) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const canvas = await html2canvas(summaryGridRef.current, {
      backgroundColor: null,
    });
    const imgData = canvas.toDataURL("image/png");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("summary.pdf");
  };


  return (
    <StyledEngineProvider injectFirst>
      <LayoutNested>
        <div ref={summaryGridRef}>
          <Grid
            container
            columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            pt="3rem"
            pb="4rem"
            className="hero-results-section"
          >
            <Container maxWidth="md">
             {!isMobile ? (
                ""
              ) : (<> 
                <Typography variant="h2" mb="1rem" color="primary.main" textAlign="center">
                  All Done!
                </Typography>
                <Typography variant="h3" color="primary.main" textAlign="center">
                  Here is a summary of what matters most to you.
                </Typography>
              </>)}
            </Container>
          </Grid>

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
                        <Grid item width='148px' textAlign="center">
                          <Box className="icon-shape">
                            <Clock size={32} weight="light" />
                          </Box>
                          <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                            {cur}
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
                        <Grid item width='148px' textAlign="center">
                          <Box className="icon-shape">
                            <Clock size={32} weight="light" />
                          </Box>
                          <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                            {cur}
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
                        <Grid item width='148px' textAlign="center">
                          <Box className="icon-shape">
                            <Clock size={32} weight="light" />
                          </Box>
                          <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                            {cur}
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
                        <Grid item width='148px' textAlign="center">
                          <Box className="icon-shape">
                            <Clock size={32} weight="light" />
                          </Box>
                          <Typography variant="body1" fontSize="0.875rem" lineHeight="20px">
                            {cur}
                          </Typography>
                        </Grid>
                      )
                    })}
                  </Stack>
                </div>
              }
            </div>

            <div className="summary-box choice-ques">
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


          <Grid
            container
            columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
            pb="5rem"
          >
            <Container maxWidth="xl">

              <Grid container>

                <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
                  <Typography variant="h3" fontSize="2.25rem" mb="1.4rem" color="primary.main">
                    What's Next?
                  </Typography>

                  <Typography variant="body1" lineHeight="24px" mb={!isMobile ? "3.5rem" : "1.3rem"}>
                    Use this summary to share what is important to you with your provider. Ask your care provider questions you have and tell them what you choose.
                  </Typography>

                  <Typography variant="h3" fontSize="2.25rem" mb="1.4rem" color="primary.main">
                    Save Your Summary
                  </Typography>

                  <Grid container spacing={1} style={{ marginBottom: '20px' }}>
                    <Grid item>
                      <Link href="#" className="link-btn" style={{ fontSize: '18px' }}>
                        <EnvelopeSimple
                          size={24}
                          style={{ marginRight: '5px' }}
                        />
                        Email
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" className="link-btn" onClick={downloadSummary} style={{ fontSize: '18px' }}>
                        <DownloadSimple
                          size={24}
                          style={{ marginRight: '5px' }}
                        />
                        Download
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/MyStuff" className="link-btn" style={{ fontSize: '18px' }}>
                        <PushPinSimple
                          size={24}
                          style={{ marginRight: '5px' }}
                        />
                        My Stuff
                      </Link>
                    </Grid>
                  </Grid>

                </Grid>

                <Grid item xs={12} md={4}></Grid>

                <Grid item xs={12} md={4} mt={!isMobile ? "" : "1.3rem"} sx={{ position: 'relative' }}>
                  <Typography variant="h3" fontSize="2.25rem" mb="1.4rem" color="primary.main">
                    Don’t Know What to Ask?
                  </Typography>
                  <Typography variant="body1" lineHeight="24px">
                    See suggested questions and add to them.
                  </Typography>

                  <Button sx={{ px: 3, py: 1, mt: 6, backgroundColor: '#0C3A25', borderRadius: '25px', color: '#fff', textTransform: 'capitalize', fontSize: '1.125rem' }}>
                     <Link href="/MyStuff" style={{ fontSize: '18px', color: '#fff' }}> View Questions </Link>
                  </Button>
                  <Grid item mt="3rem">
                    <img className="view-question-bottom-img" src={FirstImg} alt="" />
                  </Grid>
                </Grid>
              </Grid>

            </Container>
          </Grid>
        </div>
      </LayoutNested>
    </StyledEngineProvider >
  );
};

export default QuizResult;
