import React, { useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Link,
  Avatar,
  StyledEngineProvider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Box,
} from '@mui/material'
import Layout from '../components/Layout'
import Button from '../components/Button/Button'
import { CloudUpload } from '@mui/icons-material'
import { Sources } from '../components/AccordionContent/Sources-details'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  LinkSimpleHorizontal,
  EnvelopeSimple,
  BookmarkSimple,
  Clock,
  Heart,
  CaretRight,
  XCircle,
  CheckCircle,
} from '@phosphor-icons/react'
import './pageStyle/StartingLabor.css'

import FirstImg from '../siteImages/pexels-william-fortunato-6392989.png'

function StartingLabor() {

  return (  
      <StyledEngineProvider injectFirst>
        <Layout>
            <div className="root">
                <Container maxWidth="lg">
                    <Grid container spacing={2} pt="2rem" pb="3rem" alignItems="flex-start">

                        <Grid item xs={12} md={7}>
                          <Paper elevation={0} className="mainText">
                               <Grid container spacing={2} mb="2rem">
                                    <Grid item>
                                        <Typography textTransform="uppercase" variant="body1" color="#4D4D4D" gutterBottom alignItems="center" sx={{ display: 'flex' }}>
                                            <span><Link href="/Home" color="#4D4D4D">Home</Link> <CaretRight size={16} /></span> STARTING LABOR
                                        </Typography>
                                    </Grid>
                                </Grid>

                               <Typography variant="h2" mb="1rem" color="primary.main">
                                    What Can Help Me Start Labor?
                                </Typography>

                                <Typography textTransform="uppercase" variant="body1" color="#4D4D4D" gutterBottom alignItems="center" sx={{ display: 'flex' }}>
                                    <Clock size={20} style={{ marginRight: '5px' }} />
                                    5 mins read
                                </Typography>

                                <img
                                    src={FirstImg}
                                    id="first-image"
                                    alt="firstimg"
                                    style={{ marginBottom: '30px' }}
                                />

                                <Typography
                                    variant="h4"
                                    component="h2"
                                    className="secondTitle"
                                    style={{
                                      marginTop: '50px',
                                    }}
                                  >
                                    Natural Methods
                                  </Typography>
                                  <Divider
                                    style={{
                                      height: '3px',
                                      marginTop: '10px',
                                      marginBottom: '20px',
                                    }}
                                  />


                                <Grid container spacing={2} mt="2.5rem" mb="3rem">
                                    <Grid item container flexDirection="row" flexWrap="nowrap" md={7}>
                                        <span
                                          style={{
                                            display: 'inline-block',
                                            width: 15,
                                            height: 35,
                                            borderRadius: '0',
                                            backgroundColor: '#DFF0D8',
                                            marginRight: 20,
                                          }}
                                        />

                                        <Box>
                                            <Typography variant="h4" component="h2" color="primary.main" className="labor-block-title">
                                                Nipple Stimulation
                                            </Typography>

                                            <Typography variant="body1" className="labor-block-desc">
                                                Nipple stimulation can be done manually or with a breast pump and may help your labor to begin.
                                            </Typography>

                                            <Accordion className="accordion-details" style={{ marginTop: '50px', boxShadow: '0 0' }}>
                                                <AccordionSummary
                                                  expandIcon={<ExpandMoreIcon />}
                                                  aria-controls="panel1a-content"
                                                  id="panel1a-header"
                                                >
                                                  <Typography
                                                    variant="h4"
                                                    component="h2"
                                                    mb="0.7rem"
                                                    color="primary.main"
                                                >
                                                    Risks and Benefits
                                                </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ padding: 0 }}>
                                                    <Grid item>
                                                        <Typography variant="body1" color="primary.dark" className="labor-acc-text" sx={{ display: 'flex' }}>
                                                            <XCircle size={32} weight="fill" style={{ minWidth: '30px', color: '#A86133', marginRight: '10px' }} />
                                                            Nisl eget sed odio natoque vitae a et tincid lrunt cras.
                                                        </Typography>

                                                        <Typography variant="body1" color="primary.dark" className="labor-acc-text" sx={{ display: 'flex' }}>
                                                            <CheckCircle size={32} weight="fill" style={{ minWidth: '30px', color: '#0C3A25', marginRight: '10px' }} />
                                                            Praesent dictumst tempor elementum feugiat. Leo, vitae, morbi leo facilisis nunc, sed lacus.
                                                        </Typography>

                                                        <Typography variant="body1" color="primary.dark" className="labor-acc-text" sx={{ display: 'flex' }}>
                                                            <CheckCircle size={32} weight="fill" style={{ minWidth: '30px', color: '#0C3A25', marginRight: '10px' }} />
                                                            Praesent dictumst tempor elementum feugiat. Leo, vitae, morbi leo facilisis nunc, sed lacus.
                                                        </Typography>

                                                    </Grid>
                                                  
                                                </AccordionDetails>
                                            </Accordion>
                                        </Box>

                                    </Grid>
                                    <Grid item md={5}>
                                        <img
                                            src={FirstImg}
                                            className="content-block-img"
                                            alt="firstimg"
                                            style={{ marginBottom: '30px' }}
                                        />
                                    </Grid>
                                </Grid>



                                <Accordion className="accordion-details" style={{ marginTop: '50px', boxShadow: '0 0' }}>
                                    <AccordionSummary
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
                                      <Grid>
                                        <Sources
                                          number="6"
                                          text1=" Middleton P, Shepherd E, Morris J, Crowther CA, Gomersall JC. Induction of labour at or beyond 37 weeks’ gestation. Cochrane Database Syst Rev. July 2020. 

                                          doi:10.1002/14651858.CD004945.pub5 *NICU and perinatal death rates calculated using the GRADE system to convert relative risks with the SWEPIS study as the baseline
                          
                                          risk estimates **C-section rate calculated using the GRADE system to convert relative risks with the ARRIVE study as the baseline
                          
                                          risk estimate. The 2020 Cochrane Review includes the ARRIVE trial and the SWEPSIS trial within the findings."
                                          text2="Source"
                                        />
                                      </Grid>
                                      <Grid sx={{ mt: '28px' }}>
                                        <Sources
                                          number="7"
                                          text1="Coates D, Goodfellow A, Sinclair L. Induction of labour: Experiences of care and decision-making of women and clinicians. 
                                          Women and Birth. 2020;33:e1-e14. 8. Sotiriadis A, Petousis S, Thilaganathan B, et al. Maternal and perinatal outcomes after elective induction of labor at 39 weeks in uncomplicated singleton pregnancy: a meta-analysis. Ultrasound Obstet Gynecol. 2019;53(1):26-35. doi:10.1002/UOG.20140. "
                                          text2="Source"
                                        />
                                      </Grid>
                                      <Grid sx={{ mt: '28px' }}>
                                        <Sources
                                          number="8"
                                          text1="C8. Sotiriadis A, Petousis S, Thilaganathan B, et al. Maternal and perinatal outcomes after elective induction of labor at 39 weeks in uncomplicated singleton pregnancy: a meta-analysis. Ultrasound Obstet Gynecol. 2019;53(1):26-35. doi:10.1002/UOG.20140."
                                          text2="Source"
                                        />
                                      </Grid>
                                    </AccordionDetails>
                                  </Accordion>

                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={1}></Grid>
                            
                        <Grid item xs={12} md={4} className="sidebar-sticky">
                            <Paper elevation={0} className="post">
                                  <Typography
                                    variant="h6"
                                    component="h3"
                                    mb="1.5rem"
                                    className="rightTitle"
                                  >
                                  Topics
                                  </Typography>

                                  <Grid xs={12} mb="2rem">
                                      <Typography variant="body1" mb="1.1rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                         Natural Methods
                                      </Typography>

                                      <Typography variant="body1" mb="1.5rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                        <CaretRight size={16} /> Nipple Stimulation
                                      </Typography>
                                      <Typography variant="body1" mb="1.5rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                        <CaretRight size={16} /> Membrane Sweeps
                                      </Typography>
                                      <Typography variant="body1" mb="0.8rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                        <CaretRight size={16} /> Acupuncture
                                      </Typography>
                                  </Grid>

                                  <Grid xs={12}>
                                      <Typography variant="body1" mb="1.1rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                         Medicince and Treatments
                                      </Typography>

                                      <Typography variant="body1" mb="1.5rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                        <CaretRight size={16} /> Prostaglandins
                                      </Typography>
                                      <Typography variant="body1" mb="1.5rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                        <CaretRight size={16} /> Cervical Balloon
                                      </Typography>
                                      <Typography variant="body1" mb="0.8rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                        <CaretRight size={16} /> Pitocin
                                      </Typography>
                                      <Typography variant="body1" mb="0.8rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                        <CaretRight size={16} /> Break the Water
                                      </Typography>
                                  </Grid>

                            </Paper>
                            <Grid container spacing={1} style={{ marginBottom: '20px' }}>
                                  <Grid item>
                                    <Link href="#" className="link-btn">
                                      <LinkSimpleHorizontal
                                        size={24}
                                        style={{ marginRight: '5px' }}
                                      />
                                     Link
                                    </Link>
                                  </Grid>
                                  <Grid item>
                                    <Link href="#" className="link-btn">
                                      <EnvelopeSimple
                                        size={24}
                                        style={{ marginRight: '5px' }}
                                      />
                                      Email
                                    </Link>
                                  </Grid>
                                  <Grid item>
                                    <Link href="#" className="link-btn">
                                      <BookmarkSimple
                                        size={24}
                                        style={{ marginRight: '5px' }}
                                      />
                                      Bookmark
                                    </Link>
                                  </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </Layout>
    </StyledEngineProvider>
  )
}

export default StartingLabor
