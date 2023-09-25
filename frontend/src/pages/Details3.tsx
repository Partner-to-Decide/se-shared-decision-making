import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
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
} from '@mui/material'
import Layout from '../components/Layout'
import Button from '../components/Button/Button'
import { CloudUpload } from '@mui/icons-material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  LinkSimpleHorizontal,
  EnvelopeSimple,
  BookmarkSimple,
  Clock,
  Heart,
  CaretRight,
} from '@phosphor-icons/react'
import { Sources } from '../components/AccordionContent/Sources-details'
import './pageStyle/Details.css'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import FirstImg from '../siteImages/pexels-william-fortunato-6392989.png'
import SecondImg from '../siteImages/pexels-william-fortunato-6393368.jpg'
import DottedCircle6 from '../siteImages/DottedCircles/DottedCircle6.png'
import DottedCircle04 from '../siteImages/DottedCircles/DottedCircle04.png'
import DottedCircle22 from '../siteImages/DottedCircles/DottedCircle22.png'
import { Popup } from '../components/Popup'
import {
  details_authors,
  details_buttonset,
  details_content,
  details_grids,
  details_picture,
  details_potential_risk,
  details_section,
  details_subtitle,
  source,
  details_risk_content,
  details_takenotes,
  details_topic,
  details_waiting,
} from '../utils/types'
import { REACT_APP_api_base_url, DEFAULT_LANGUAGE } from '../utils/url_config'
import axios from 'axios'

function Details3() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [anchorElBirth, setAnchorElBirth] = useState<HTMLButtonElement | null>(
    null
  )
  const [anchorElPneu, setAnchorElPneu] = useState<HTMLButtonElement | null>(
    null
  )
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  const handleClickBirth = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElBirth(event.currentTarget)
  }

  const handleCloseBirth = () => {
    setAnchorElBirth(null)
  }
  const openBirth = Boolean(anchorElBirth)

  const handleClickPneu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPneu(event.currentTarget)
  }
  const handleClosePneu = () => {
    setAnchorElPneu(null)
  }
  const openPneu = Boolean(anchorElPneu)

  /* language fetch */

  const [languageState, setLanguageState] = useState('en')
  useEffect(() => {
    window.addEventListener('storage', () => {
      setLanguageState(localStorage.getItem('language') || 'en')
    })
  }, [])

  const [detailsWaitingData, setDetailsWaitingData] =
    useState<details_waiting>()

  const [detailsTopicData, setDetailsTopicData] = useState<details_topic>()

  const [takeNotesData, setTakeNotesData] = useState<details_takenotes>()

  const [detailsAuthorsData, setDetailsAuthorsData] =
    useState<details_authors>()

  const [detailsButtonSetData, setDetailsButtonSetData] =
    useState<details_buttonset>()

  const [detailsContentData, setDetailsContentData] =
    useState<details_content>()

  const [detailsGridsData, setDetailsGridsData] = useState<details_grids>()

  const [detailsPotentialRiskData, setDetailsPotentialRiskData] =
    useState<details_potential_risk>()

  const [riskContentData, setRiskContentData] = useState<details_risk_content>()

  const [detailsSubtitleData, setDetailsSubtitleData] =
    useState<details_subtitle>()

  const [detailsSectionData, setDetailsSectionData] =
    useState<details_section>()

  useEffect(() => {
    const fetchDetailsSectionData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-sections?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setDetailsSectionData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-sections?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setDetailsSectionData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    const fetchDetailsSubtitleData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-subtitles?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setDetailsSubtitleData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-subtitles?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setDetailsSubtitleData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    const fetchRiskContentData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-risk-content?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setRiskContentData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-risk-content?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setRiskContentData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    const fetchTakeNotesData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-take-note?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setTakeNotesData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-take-note?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setTakeNotesData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    const fetchDetailsWaitingData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-waiting?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setDetailsWaitingData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-waiting?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setDetailsWaitingData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    const fetchDetailsTopicData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-topic?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setDetailsTopicData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-topic?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setDetailsTopicData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    const fetchDetailsAuthorsData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-authors?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setDetailsAuthorsData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-authors?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setDetailsAuthorsData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    const fetchDetailsContentData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-contents?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setDetailsContentData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-contents?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setDetailsContentData(result.data)
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
    const fetchDetailsGridsData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-grids?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setDetailsGridsData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-grids?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setDetailsGridsData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    const fetchDetailsPotentialRiskData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/details-potential-risks?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setDetailsPotentialRiskData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/details-potential-risks?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setDetailsPotentialRiskData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    fetchRiskContentData()
    fetchDetailsWaitingData()
    fetchDetailsTopicData()
    fetchDetailsAuthorsData()
    fetchDetailsContentData()
    fetchDetailsButtonSetData()
    fetchDetailsGridsData()
    fetchDetailsPotentialRiskData()
    fetchTakeNotesData()
    fetchDetailsSubtitleData()
    fetchDetailsSectionData()
  }, [languageState])

  return (
    <StyledEngineProvider injectFirst>
      <Layout>
        <div className="root">
          <Container maxWidth="lg">
            <Grid container spacing={2} pt="2rem" pb="3rem">
              <Grid item xs={12} md={7}>
                <Paper elevation={0} className="mainText">
                <Grid container spacing={2} mb="2rem">
                    <Grid item>
                        <Typography textTransform="uppercase" variant="body1" color="#4D4D4D" gutterBottom alignItems="center" sx={{ display: 'flex' }}>
                            <span><Link href="/Home" color="#4D4D4D">Home</Link> <CaretRight size={16} /></span> {detailsWaitingData?.data.attributes.title1}
                        </Typography>
                    </Grid>
                    <Grid item ml='auto'>
                        <Typography textTransform="uppercase" variant="body1" color="#4D4D4D" gutterBottom alignItems="center" sx={{ display: 'flex' }}>
                            <Clock size={20} style={{ marginRight: '5px' }} />
                            {detailsWaitingData?.data.attributes.title2}
                        </Typography>
                    </Grid>
                </Grid>
                 <Typography variant="h2" mb="0.7rem" color="primary.main">
                    {detailsWaitingData?.data.attributes.title3}
                  </Typography>
                  <Typography variant="h4" color="primary.main">
                    {detailsWaitingData?.data.attributes.title4}
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
                  >
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
                    {detailsContentData?.data[0].attributes.content1[0].title}
                  </Typography>
                  <Typography variant="body1" className="bodyText">
                    {
                      detailsContentData?.data[0].attributes.content1[0]
                        .Description
                    }
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h2"
                    className="secondTitle"
                  >
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
                    {detailsContentData?.data[0].attributes.content2[0].title}
                  </Typography>
                  <Typography variant="body1" className="bodyText">
                    {
                      detailsContentData?.data[0].attributes.content2[0]
                        .Description
                    }
                  </Typography>
                  <Typography variant="body1" className="linkText">
                    Learn more about{' '}
                    <Link
                      href="https://example.com"
                      style={{ color: '#00653E', fontWeight: 'bold' }}
                    >
                      starting labor
                    </Link>
                  </Typography>
                  <Avatar
                    alt="Profile Picture"
                    src={SecondImg}
                    sx={{
                      width: '40rem',
                      height: '25rem',
                      borderRadius: '6px',
                      marginBottom: '2rem',
                      marginTop: '3rem',
                    }}
                  />
                  <Typography
                    variant="h4"
                    component="h2"
                    className="secondTitle"
                  >
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
                    {detailsContentData?.data[0].attributes.content3[0].title}
                  </Typography>
                  <Typography variant="body1" className="bodyText">
                    {
                      detailsContentData?.data[0].attributes.content3[0]
                        .Description
                    }
                  </Typography>
                  <Typography variant="body1" className="bodyText" mb="2rem">
                    Compare the differences using{' '}
                    <Link
                      href="https://example.com"
                      style={{ color: '#00653E', fontWeight: 'bold' }}
                    >
                      my choices
                    </Link>
                  </Typography>
                </Paper>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper elevation={0} className="whitePost">
                      <Typography
                        variant="h4" 
                        mb="0.7rem" 
                        color="primary.dark"
                        className="bottomTitle"
                      >
                        {
                          detailsGridsData?.data[0].attributes.Details_Grids1[0]
                            .Title
                        }
                      </Typography>
                      <Typography variant="body1" lineHeight="24px" mb="2rem" color="primary.dark">
                        {
                          detailsGridsData?.data[0].attributes.Details_Grids1[0]
                            .Description
                        }
                      </Typography>
                      <Avatar
                        className="avatar"
                        style={{
                          backgroundColor: '#DFF0D8',
                        }}
                      >
                        <Typography
                          variant="h4"
                          style={{
                            color: '#0C3A25',
                            fontWeight: 'bold',
                            fontSize: '2rem',
                          }}
                        >
                          {
                            detailsGridsData?.data[0].attributes
                              .Details_Grids1[0].range
                          }
                        </Typography>
                        <Typography
                          variant="h4"
                          color="#0C3A25"
                          style={{
                            fontSize: '16px',
                            letterSpacing: '0.25px',
                            textTransform: 'capitalize'
                          }}
                        >
                          {
                            detailsGridsData?.data[0].attributes
                              .Details_Grids1[0].unit
                          }
                        </Typography>
                      </Avatar>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} className="whitePost">
                      <Typography
                        variant="h4" 
                        mb="0.7rem" 
                        color="primary.dark"
                        className="bottomTitle"
                      >
                        {
                          detailsGridsData?.data[0].attributes.Details_Grids2[0]
                            .Title
                        }
                      </Typography>
                      <Typography variant="body1" lineHeight="24px" mb="2rem" color="primary.dark">
                        {
                          detailsGridsData?.data[0].attributes.Details_Grids2[0]
                            .Description
                        }
                      </Typography>
                      <Avatar
                        className="avatar"
                        style={{
                          backgroundColor: '#0C3A25',
                        }}
                      >
                        <Typography
                          variant="h4"
                          style={{
                            color: '#DFF0D8',
                            fontWeight: 'bold',
                            fontSize: '2rem',
                          }}
                        >
                          {
                            detailsGridsData?.data[0].attributes
                              .Details_Grids2[0].range
                          }
                        </Typography>
                        <Typography
                          variant="h4"
                          color="#DFF0D8"
                          style={{
                            fontSize: '16px',
                            letterSpacing: '0.25px',
                            textTransform: 'capitalize'
                          }}
                        >
                          {
                            detailsGridsData?.data[0].attributes
                              .Details_Grids2[0].unit
                          }
                        </Typography>
                      </Avatar>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} className="whitePost">
                      <Typography
                        variant="h4" 
                        mb="0.7rem" 
                        color="primary.dark"
                        className="bottomTitle"
                      >
                        {
                          detailsGridsData?.data[0].attributes.Details_Grids3[0]
                            .Title
                        }
                      </Typography>
                      <Typography variant="body1" lineHeight="24px" mb="2rem" color="primary.dark">
                        {
                          detailsGridsData?.data[0].attributes.Details_Grids3[0]
                            .Description
                        }
                      </Typography>
                      <Avatar
                        className="avatar"
                        style={{
                          background:
                            'linear-gradient(45deg, #0C3A25 30%, #DFF0D8 90%)',
                          marginBottom: '2rem',
                        }}
                      >
                        <Typography
                          variant="h4"
                          style={{
                            color: '#DFF0D8',
                            fontWeight: 'bold',
                            fontSize: '24px',
                          }}
                        >
                          {
                            detailsGridsData?.data[0].attributes
                              .Details_Grids3[0].range
                          }
                        </Typography>
                        <Typography
                          variant="h4"
                          color="#DFF0D8"
                          style={{
                            fontSize: '16px',
                            letterSpacing: '0.25px',
                            textTransform: 'capitalize'
                          }}
                        >
                          {
                            detailsGridsData?.data[0].attributes
                              .Details_Grids3[0].unit
                          }
                        </Typography>
                      </Avatar>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={0} className="whitePost">
                      <Typography 
                        variant="h4" 
                        mb="0.7rem" 
                        color="primary.dark"
                        className="bottomTitle"
                        >
                        {
                          detailsGridsData?.data[0].attributes.Details_Grids4[0]
                            .Title
                        }
                      </Typography>
                      <Typography variant="body1" lineHeight="24px" mb="2rem" color="primary.dark">
                        {
                          detailsGridsData?.data[0].attributes.Details_Grids4[0]
                            .Description
                        }
                      </Typography>
                      <Heart
                        size={90}
                        color="#0C3A25"
                        weight="fill"
                        style={{ margin: '0 auto 1rem', display: 'block' }}
                      />
                      <Typography
                          variant="h4"
                          color="primary.dark"
                          textAlign="center"
                          style={{
                            fontSize: '16px',
                            letterSpacing: '0.25px',
                            textTransform: 'capitalize'
                          }}
                        >
                        {
                          detailsGridsData?.data[0].attributes.Details_Grids4[0]
                            .unit
                        }
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                <Paper className="post1" elevation={0}>
                  <Typography variant="body1" textAlign="center" lineHeight="24px">
                    {detailsSubtitleData?.data[0].attributes.subtitle1} <br />
                    <Link
                      href="https://example.com"
                      style={{ color: '#00653E' }}
                    >
                      {detailsSubtitleData?.data[0].attributes.subtitle2}
                    </Link>
                    .
                  </Typography>
                </Paper>
                <Paper elevation={0}>
                  <Typography
                    variant="h4"
                    component="h2"
                    mt="3rem"
                    mb="0.7rem"
                    className="secondTitle title2"
                  >
                    {
                      detailsSectionData?.data[0].attributes
                        .Details_Section_Data1[0].Title
                    }
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary.dark"
                    mb="2rem"
                  >
                    {
                      detailsSectionData?.data[0].attributes
                        .Details_Section_Data1[0].Content
                    }
                  </Typography>
                  <Accordion elevation={0}>
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon style={{ color: '#FFFFFF' }} />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{
                        backgroundColor: '#A86133',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                      }}
                    >
                      <Typography
                        color="secondary.main"
                        sx={{ 
                            flexGrow: 1, 
                            textAlign: 'center' 
                        }}
                      >
                        {
                          detailsSectionData?.data[0].attributes
                            .Details_Section_Data2[0].Title
                        }
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: '#FAF6ED', padding: '3rem' }}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <Typography variant="h4" fontSize="1.25rem" component="h3" mb="0.7rem">
                            {' '}
                            {
                              detailsPotentialRiskData?.data[0].attributes
                                .risk1[0].title 
                            }
                          </Typography>
                          <Typography variant="body1" lineHeight="24px" color="primary.dark">
                            {
                              detailsPotentialRiskData?.data[0].attributes
                                .risk1[0].content
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h4" fontSize="1.25rem" component="h3" mb="0.7rem">
                            {' '}
                            {
                              detailsPotentialRiskData?.data[0].attributes
                                .risk2[0].title
                            } 6,8
                          </Typography>
                          <Typography variant="body1" lineHeight="24px" color="primary.dark">
                            {
                              detailsPotentialRiskData?.data[0].attributes
                                .risk2[0].content
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <img
                            style={{ marginLeft: '58px', marginTop: '20px' }}
                            width="180.45px"
                            height="239px"
                            src={DottedCircle6}
                            alt="DottedCircle6"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <img
                            style={{ marginLeft: '58px', marginTop: '20px' }}
                            width="180.45px"
                            height="239px"
                            src={DottedCircle04}
                            alt="DottedCircle0.4"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="h4"
                            display="inline-block"
                            fontSize="1.25rem"
                            mb="0.7rem"
                            bgcolor="#dff0d8"
                            onClick={handleClickBirth}
                          >
                            {' '}
                            {
                              detailsPotentialRiskData?.data[0].attributes
                                .risk3[0].title
                            }
                          </Typography>
                          <Popup
                            open={openBirth}
                            anchorEl={anchorElBirth}
                            handleClose={handleCloseBirth}
                            title="Cesarean Birth"
                            text="(or Cesarean section or C-section) is the delivery of
                            a baby through surgical cuts(incisions) made in the pregnant persons abdomen and uterus."
                          />
                          <Typography variant="body1" lineHeight="24px" color="primary.dark">
                            {
                              detailsPotentialRiskData?.data[0].attributes
                                .risk3[0].content
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <img
                            style={{ marginLeft: '58px', marginTop: '20px' }}
                            width="180.45px"
                            height="239px"
                            src={DottedCircle22}
                            alt="DottedCircle22"
                          />
                        </Grid>
                        <Grid item xs={6}></Grid>
                      </Grid>
                    </AccordionDetails>
                    <Grid
                      container
                      className="potential-risks"
                      sx={{ pt: '48px' }}
                    >
                      <Grid height="269px">
                        <Grid
                          item
                          width="649px"
                          height="27px"
                          sx={{ ml: '0px', mr: '114px' }}
                        >
                          <Typography className="potential-risks-small-content">
                            For all three options, there is{' '}
                            <span
                              style={{
                                fontWeight: 'bold',
                              }}
                            >
                              same chance
                            </span>{' '}
                            of the following:
                          </Typography>
                        </Grid>
                        <Grid
                          width="483px"
                          sx={{ ml: '100px', mr: '196px', mt: '24px' }}
                        >
                          <Typography className="potential-risks-foot-content">
                            <FiberManualRecordIcon
                              sx={{ fontSize: 10, pr: '5px' }}
                            />
                            Complications for baby{' '}
                            <Typography
                              display="inline"
                              className="potential-risks-foot-content"
                              bgcolor="#dff0d8"
                              onClick={handleClick}
                            >
                              (seizure
                            </Typography>
                            <Popup
                              open={open}
                              anchorEl={anchorEl}
                              handleClose={handleClose}
                              title="Seizure"
                              text='Infant seizures are bursts of electrical activity in
                        the brain that can cause chewing motions and
                        "bicycling" movements. They can be caused by the
                        baby not getting enough oxygen during the birth
                        process.'
                            />
                            ,{' '}
                            <Typography
                              display="inline"
                              className="potential-risks-foot-content"
                              bgcolor="#dff0d8"
                              onClick={handleClickPneu}
                            >
                              pneumonia
                            </Typography>
                            <Popup
                              open={openPneu}
                              anchorEl={anchorElPneu}
                              handleClose={handleClosePneu}
                              title="Pneumonia"
                              text="Pneumonia is inflammation of the lungs in which tiny air sacs are filled with fluid.
                          It can be caused by bacteria or a virus during the birth process."
                            />
                            , harm to the baby’s body, or problems getting air
                            to baby’s brain.){' '}
                            <Typography
                              display="inline"
                              className="foot-small-number"
                            >
                              6
                            </Typography>
                          </Typography>
                        </Grid>
                        <Grid
                          width="483px"
                          sx={{ ml: '100px', mr: '196px', mt: '16px' }}
                        >
                          <Typography className="potential-risks-foot-content">
                            <FiberManualRecordIcon
                              sx={{ fontSize: 10, pr: '5px' }}
                            />
                            {riskContentData?.data.attributes.content2}{' '}
                            <Typography
                              display="inline"
                              className="foot-small-number"
                            >
                              6
                            </Typography>
                          </Typography>
                        </Grid>
                        <Grid
                          width="483px"
                          sx={{ ml: '100px', mr: '196px', mt: '16px' }}
                        >
                          <Typography className="potential-risks-foot-content">
                            <FiberManualRecordIcon
                              sx={{ fontSize: 10, pr: '5px' }}
                            />
                            {riskContentData?.data.attributes.content3}{' '}
                            <Typography
                              display="inline"
                              className="foot-small-number"
                            >
                              6
                            </Typography>
                          </Typography>
                        </Grid>
                        <Grid
                          width="483px"
                          sx={{ ml: '100px', mr: '196px', mt: '16px' }}
                        >
                          <Typography className="potential-risks-foot-content">
                            <FiberManualRecordIcon
                              sx={{ fontSize: 10, pr: '5px' }}
                            />
                            {riskContentData?.data.attributes.content4}{' '}
                            <Typography
                              display="inline"
                              className="foot-small-number"
                            >
                              6
                            </Typography>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Accordion>
                  <Typography
                    variant="h4"
                    component="h2"
                    mt="3rem"
                    mb="0.7rem"
                    className="secondTitle"
                  >
                    {
                      detailsSectionData?.data[0].attributes
                        .Details_Section_Data3[0].Title
                    }
                  </Typography>
                  <Divider
                    style={{
                      height: '3px',
                      marginBottom: '1rem'
                    }}
                  />
                  <Typography
                    variant="body1"
                    lineHeight='24px'
                  >
                    {
                      detailsSectionData?.data[0].attributes
                        .Details_Section_Data3[0].Content
                    }
                  </Typography>
                  <Link
                    variant="body1"
                    href="https://example.com"
                    style={{
                      color: '#00653E',
                      fontWeight: 'bold',
                      marginBottom: '30px',
                    }}
                  >
                    {
                      detailsSectionData?.data[0].attributes
                        .Details_Section_Data3[0].Link
                    }
                  </Link>
                  <Grid
                    container
                    spacing={0}
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
                    <Grid
                      item
                      xs={2}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      <Avatar alt="Remy Sharp" sx={{ width: 70, height: 70 }} />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          marginTop: '10px',
                        }}
                      >
                        {
                          detailsAuthorsData?.data[0].attributes.authors1[0]
                            .name
                        }
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          fontWeight: 'bold',
                          color: '#4D4D4D',
                        }}
                      >
                        {
                          detailsAuthorsData?.data[0].attributes.authors1[0]
                            .Description
                        }
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <Grid
                      item
                      xs={4}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <Grid
                      item
                      xs={2}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      <Avatar alt="Remy Sharp" sx={{ width: 70, height: 70 }} />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          marginTop: '10px',
                        }}
                      >
                        {
                          detailsAuthorsData?.data[0].attributes.authors2[0]
                            .name
                        }
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          fontWeight: 'bold',
                          color: '#4D4D4D',
                        }}
                      >
                        {
                          detailsAuthorsData?.data[0].attributes.authors2[0]
                            .Description
                        }
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      <Avatar alt="Remy Sharp" sx={{ width: 70, height: 70 }} />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          marginTop: '7px',
                        }}
                      >
                        {
                          detailsAuthorsData?.data[0].attributes.authors3[0]
                            .name
                        }
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          fontWeight: 'bold',
                          color: '#4D4D4D',
                        }}
                      >
                        {
                          detailsAuthorsData?.data[0].attributes.authors3[0]
                            .Description
                        }
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      <Avatar alt="Remy Sharp" sx={{ width: 70, height: 70 }} />
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    >
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          marginTop: '10px',
                        }}
                      >
                        {
                          detailsAuthorsData?.data[0].attributes.authors4[0]
                            .name
                        }
                      </p>
                      <p
                        style={{
                          fontSize: '16px',
                          lineHeight: '20px',
                          fontWeight: 'bold',
                          color: '#4D4D4D',
                        }}
                      >
                        {
                          detailsAuthorsData?.data[0].attributes.authors4[0]
                            .Description
                        }
                      </p>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    />
                    <Grid
                      item
                      xs={4}
                      style={{ marginTop: 10, marginBottom: 10 }}
                    />
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
                  <Typography
                    variant="h4"
                    component="h2"
                    className="secondTitle"
                    style={{
                      marginTop: '50px',
                    }}
                  >
                    {
                      detailsSectionData?.data[0].attributes
                        .Details_Section_Data3[0].textbeforelink
                    }
                  </Typography>
                  <Divider
                    style={{
                      height: '3px',
                      marginBottom: '20px',
                    }}
                  />
                  <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                    <Grid item>
                      <Button sx={{ fontSize: '18px' }}>
                        {
                          detailsButtonSetData?.data[0].attributes.buttonset2[0]
                            .button1
                        }
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button fontSize="18px">
                        {
                          detailsButtonSetData?.data[0].attributes.buttonset2[0]
                            .button2
                        }
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button fontSize="18px">
                        {
                          detailsButtonSetData?.data[0].attributes.buttonset2[0]
                            .button3
                        }
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12} md={1}></Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0} className="post">
                  <Typography
                    variant="h6"
                    component="h3"
                    mb="1rem"
                    className="rightTitle"
                  >
                    {detailsTopicData?.data.attributes.title}
                  </Typography>
                  <Typography variant="body1" mb="1.3rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                    <CaretRight size={16} /> {detailsTopicData?.data.attributes.text1}
                  </Typography>
                  <Typography variant="body1" mb="1.3rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                    <CaretRight size={16} /> {detailsTopicData?.data.attributes.text2}
                  </Typography>
                  <Typography variant="body1" mb="0.8rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                    <CaretRight size={16} /> {detailsTopicData?.data.attributes.text3}
                  </Typography>
                </Paper>
                <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                  <Grid item>
                    <Button>
                      <LinkSimpleHorizontal
                        size={24}
                        style={{ marginRight: '5px' }}
                      />
                      {
                        detailsButtonSetData?.data[0].attributes.buttonset1[0]
                          .button1
                      }
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button>
                      <EnvelopeSimple
                        size={24}
                        style={{ marginRight: '5px' }}
                      />
                      {
                        detailsButtonSetData?.data[0].attributes.buttonset1[0]
                          .button2
                      }
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button>
                      <BookmarkSimple
                        size={24}
                        style={{ marginRight: '5px' }}
                      />
                      {
                        detailsButtonSetData?.data[0].attributes.buttonset1[0]
                          .button3
                      }
                    </Button>
                  </Grid>
                </Grid>
                <Paper elevation={0}>
                  <Typography
                    variant="h4"
                    component="h3"
                    color="primary.main"
                    mb="1rem"
                  >
                    {takeNotesData?.data.attributes.title}
                  </Typography>
                  <Typography variant="body1" className="space">
                    {takeNotesData?.data.attributes.content} 
                    <Link
                    variant="body1"
                    href="https://example.com"
                    style={{
                      color: '#00653E',
                      fontWeight: 'bold',
                      marginBottom: '30px',
                      marginLeft: '5px',
                    }}
                  >
                    {takeNotesData?.data.attributes.link}
                  </Link>
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h3"
                    color="primary.main"
                    mb="1rem"
                    mt="1rem"
                  >
                    {takeNotesData?.data.attributes.question}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Layout>
    </StyledEngineProvider>
  )
}

export default Details3
