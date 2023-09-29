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

import {
  Labor_data,
  details_buttonset,
  Labor_Topics,
} from '../utils/types'

import { useNavigate, useParams } from "react-router-dom";
import { REACT_APP_api_base_url, DEFAULT_LANGUAGE } from '../utils/url_config'
import axios from 'axios'
import FirstImg from '../siteImages/pexels-william-fortunato-6392989.png'

function scrollToSection(e, sectionId) {
  e.preventDefault();
  const target = document.querySelector(`#${sectionId}`);
  if (target instanceof HTMLElement) { // Assert the type
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth',
    });
  }
}
function StartingLabor() {


const [detailsLaborData, setLaborDetailsData] = useState<Labor_data>()
const [LaborTopicsData, setLaborTopicsData] = useState<Labor_Topics>()
const [detailsButtonSetData, setDetailsButtonSetData] = useState<details_buttonset>()
const [languageState, setLanguageState] = useState('en')

const { slug } = useParams()

  useEffect(() => {
    window.addEventListener('storage', () => {
      setLanguageState(localStorage.getItem('language') || 'en')
    })
  }, [])

  useEffect(() => {

      const fetchLaborDetailsData = async () => {
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
            `/api/starting-labor-pages/?filters[slug][$eq]=${slug}&populate=deep&locale=` +
            localStorage.getItem('language')
            )
          setLaborDetailsData(result.data)
        } catch (error) {
          console.error('Error fetching learn about data: ', error)
          try {
            const result = await axios.get(
              REACT_APP_api_base_url +
              `/api/starting-labor-pages/?filters[slug][$eq]=${slug}&populate=deep&locale=` +
              DEFAULT_LANGUAGE
              )
            setLaborDetailsData(result.data.data[0].attributes)
          } catch (error) {
            console.error(
              'Error fetching learn about data with default locale: ',
              error
              )
          }
        }
      }

      const fetchLaborTopics = async () => {
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
            '/api/starting-labor-topics?populate=deep&locale=' +
            localStorage.getItem('language')
            )
          setLaborTopicsData(result.data)
        } catch (error) {
          console.error('Error fetching learn about data: ', error)
          try {
            const result = await axios.get(
              REACT_APP_api_base_url +
              '/api/details-button-sets?populate=deep&locale=' +
              DEFAULT_LANGUAGE
              )
            setLaborTopicsData(result.data)
          } catch (error) {
            console.error(
              'Error fetching learn about data with default locale: ',
              error
              )
          }
        }
      }

      const fetchDetailsButtonSetData = async () => {
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
            '/api/details-button-sets?populate=deep&locale=' +
            localStorage.getItem('language')
            )
          setDetailsButtonSetData(result.data)
        } catch (error) {
          console.error('Error fetching learn about data: ', error)
          try {
            const result = await axios.get(
              REACT_APP_api_base_url +
              '/api/details-button-sets?populate=deep&locale=' +
              DEFAULT_LANGUAGE
              )
            setDetailsButtonSetData(result.data)
          } catch (error) {
            console.error(
              'Error fetching learn about data with default locale: ',
              error
              )
          }
        }
      }
      fetchLaborTopics()
      fetchLaborDetailsData()
      fetchDetailsButtonSetData()
  }, [languageState])

  const LaborsData = detailsLaborData?.data[0].attributes;
  const source     = LaborsData?.source?.data?.attributes.source1;
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
                                            <span><Link href="/Home" color="#4D4D4D">Home</Link> <CaretRight size={16} /></span> {LaborsData?.Title}
                                        </Typography>
                                    </Grid>
                                </Grid>

                               <Typography variant="h2" mb="1rem" color="primary.main">
                                  {LaborsData?.PageTitle}
                                </Typography>

                                <Typography textTransform="uppercase" variant="body1" color="#4D4D4D" gutterBottom alignItems="center" sx={{ display: 'flex' }}>
                                    <Clock size={20} style={{ marginRight: '5px' }} />
                                   {LaborsData?.WaitTime}
                                </Typography>

                              {LaborsData?.FeaturedImage?
                               <img
                                    src={(REACT_APP_api_base_url || "") + LaborsData?.FeaturedImage?.data?.attributes?.url}
                                    id="first-image"
                                    alt="firstimg"
                                    style={{ marginBottom: '30px' }}
                                />
                                : null }
                            {LaborTopicsData?.data?.map((topics, index) => ([ <>
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    className="secondTitle"
                                    style={{
                                      marginTop: '50px',
                                    }}
                                  >
                                  {topics?.attributes?.Heading}
                                  </Typography>
                                  <Divider
                                    style={{
                                      height: '3px',
                                      marginTop: '10px',
                                      marginBottom: '20px',
                                    }}
                                  />

                               
                              {topics?.attributes?.LaborTopics.map((item, index) => ([ 
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
                                    
                                        <Box id={'section'+item.id}>
                                            <Typography variant="h4" component="h2" color="primary.main" className="labor-block-title">
                                              {item.SectionHeading}
                                            </Typography>

                                            <Typography variant="body1" className="labor-block-desc">
                                               {item.Content}
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
                                                {item.PotentialBenefits?
                                                <AccordionDetails sx={{ padding: 0 }}>
                                                    <Grid item>
                                                    {item?.PotentialBenefits?.map((benefits, index) => ([
                                                        <Typography key={index} variant="body1" color="primary.dark" className="labor-acc-text" sx={{ display: 'flex' }}>
                                                           <CheckCircle size={32} weight="fill" style={{ minWidth: '30px', color: '#0C3A25', marginRight: '10px' }} />
                                                           {benefits.Content}
                                                        </Typography>
                                                      ]))}

                                                      {item?.PotentialRisks?.map((risk, index) => ([
                                                        <Typography key={index} variant="body1" color="primary.dark" className="labor-acc-text" sx={{ display: 'flex' }}>
                                                           <XCircle size={32} weight="fill" style={{ minWidth: '30px', color: '#A86133', marginRight: '10px' }} />
                                                           {risk.Content}
                                                        </Typography>
                                                      ]))}
                                                   </Grid>
                                                 </AccordionDetails>
                                                : null }
                                            </Accordion>
                                        </Box>
                                      </Grid>
                                    {item?.RightImage?
                                     <Grid item md={5}>
                                        <img
                                            src={(REACT_APP_api_base_url || "") + item?.RightImage?.data?.attributes?.url}
                                            className="content-block-img"
                                            alt="firstimg"
                                            style={{ marginBottom: '30px' }}
                                        />
                                    </Grid>
                                    : null }
                                </Grid>
                              ]))}
                             </> 
                             ]
                            ))}
                
                          {source?
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
                                {source?.map((item, index) => (
                                [
                                    <Grid>
                                      <Sources
                                        number={item.SourceNumber}
                                        text1={item.sourcecontent}
                                        text2={item.link}
                                      />
                                    </Grid>
                                  ] 
                                 ))}
                              </AccordionDetails>
                            </Accordion>
                            : null }
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
                                  {LaborTopicsData?.data?.map((topics, index) => ([
                                  <Grid xs={12} key={index} className="side-topics">
                                      <Typography variant="body1" mb="1.1rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                        {topics?.attributes?.Heading}
                                      </Typography>
                                      {topics?.attributes?.LaborTopics.map((item, index) => ([ 
                                        <Link href={'#section' + item.id} onClick={(e) => scrollToSection(e, 'section'+item.id)}>
                                         <Typography key={index} variant="body1" mb="1.5rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                           <CaretRight size={16} /> {item.SectionHeading}
                                        </Typography>
                                      </Link>
                                      ]))}
                                  </Grid>
                                ]))}
                            </Paper>

                            <Grid container spacing={1} style={{ marginBottom: '20px' }}>
                                  <Grid item>
                                    <Link href="#" className="link-btn">
                                      <LinkSimpleHorizontal
                                        size={24}
                                        style={{ marginRight: '5px' }}
                                      />
                                      {
                                        detailsButtonSetData?.data[0].attributes.buttonset1[0]
                                          .button1
                                      }
                                    </Link>
                                  </Grid>
                                  <Grid item>
                                    <Link href="#" className="link-btn">
                                      <EnvelopeSimple
                                        size={24}
                                        style={{ marginRight: '5px' }}
                                      />
                                      {
                                        detailsButtonSetData?.data[0].attributes.buttonset1[0]
                                          .button2
                                      }
                                    </Link>
                                  </Grid>
                                  <Grid item>
                                    <Link href="#" className="link-btn">
                                      <BookmarkSimple
                                        size={24}
                                        style={{ marginRight: '5px' }}
                                      />
                                       {
                                          detailsButtonSetData?.data[0].attributes.buttonset1[0]
                                            .button3
                                        }
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
