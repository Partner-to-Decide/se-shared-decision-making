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
  Details_data,
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
import { useNavigate, useParams } from "react-router-dom";
import { REACT_APP_api_base_url, DEFAULT_LANGUAGE } from '../utils/url_config'
import axios from 'axios'

function Details() {
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

  const { slug } = useParams();

  const [detailsSectionData, setDetailsSectionData] = useState<Details_data>()

  useEffect(() => {

   const fetchDetailsData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
           `/api/choices-detail-pages/?filters[slug][$eq]=${slug}&populate=deep&locale=` +
            localStorage.getItem('language')
        )
        setDetailsSectionData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              `/api/choices-detail-pages/?filters[slug][$eq]=${slug}&populate=deep&locale=` +
              DEFAULT_LANGUAGE
          )
         setDetailsSectionData(result.data.data[0].attributes)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
   fetchDetailsData()
  }, [languageState])


  const DetailsData = detailsSectionData?.data[0]?.attributes;
  const SideTopics  = detailsSectionData?.data[0]?.attributes?.DetailTopics; 
  const details_content = DetailsData?.details_content?.data?.attributes.content1;

  console.log('detailsSectionDatatestt',details_content);

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
                                          <span><Link href="/Home" color="#4D4D4D">Home</Link> <CaretRight size={16} /></span> 
                                          {DetailsData?.Title}
                                      </Typography>
                                  </Grid>
                                  <Grid item ml='auto'>
                                      <Typography textTransform="uppercase" variant="body1" color="#4D4D4D" gutterBottom alignItems="center" sx={{ display: 'flex' }}>
                                          <Clock size={20} style={{ marginRight: '5px' }} />
                                          { DetailsData?.DetailsWaiting?.ReadingTime }
                                      </Typography>
                                  </Grid>
                              </Grid>

                               <Typography variant="h2" mb="0.7rem" color="primary.main">
                                {DetailsData?.Title}
                              </Typography>
                              <Typography variant="h4" color="primary.main">
                                { DetailsData?.DetailsWaiting?.title1 }
                              </Typography>

                              {details_content?.map((item, index) => (
                                [<>
                                  {item.image?.data ?
                                    <img
                                    src={(REACT_APP_api_base_url || "") + item.image.data?.attributes?.url}
                                    id={'first-image-'+item.Imagelayout}
                                    className={'imagelayout-'+item.Imagelayout}
                                    alt="firstimg"
                                    style={{ marginBottom: '30px' }}
                                    />
                                  :null }

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
                                  { item.title }
                                  </Typography>
                                  {item.Description ?
                                  <Typography variant="body1" className="bodyText">
                                  {
                                    item.Description
                                  }
                                  </Typography>
                                  : null }

                                  {item.link?
                                  <Typography variant="body1" className="linkText">
                                   { item.linktitle1?item.linktitle1:null }{' '}
                                    <Link
                                    href={item.link}
                                    style={{ color: '#00653E', fontWeight: 'bold' }}
                                    >
                                   {item.linktitle2? item.linktitle2 :null}
                                    </Link>
                              </Typography>
                              : null }
                          </>]))}
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
                          DetailsData?.details_grid.data.attributes.Details_Grids1[0]
                            .Title
                        }
                        {
                          DetailsData?.details_grid.data.attributes.Details_Grids1[0]
                            .TitleNumber
                        }
                      </Typography>
                      <Typography variant="body1" lineHeight="24px" mb="2rem" color="primary.dark">
                        {
                          DetailsData?.details_grid.data.attributes.Details_Grids1[0]
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
                            DetailsData?.details_grid.data.attributes
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
                            DetailsData?.details_grid.data.attributes
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
                          DetailsData?.details_grid.data.attributes.Details_Grids2[0]
                            .Title
                        }

                        {
                          DetailsData?.details_grid.data.attributes.Details_Grids2[0]
                            .TitleNumber
                        }
                      </Typography>
                      <Typography variant="body1" lineHeight="24px" mb="2rem" color="primary.dark">
                        {
                          DetailsData?.details_grid.data.attributes.Details_Grids2[0]
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
                            DetailsData?.details_grid.data.attributes
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
                            DetailsData?.details_grid.data.attributes
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
                          DetailsData?.details_grid.data.attributes.Details_Grids3[0]
                            .Title
                        }

                          {
                          DetailsData?.details_grid.data.attributes.Details_Grids3[0]
                            .TitleNumber
                        }
                      </Typography>
                      <Typography variant="body1" lineHeight="24px" mb="2rem" color="primary.dark">
                        {
                          DetailsData?.details_grid.data.attributes.Details_Grids3[0]
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
                            DetailsData?.details_grid.data.attributes
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
                            DetailsData?.details_grid.data.attributes
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
                          DetailsData?.details_grid.data.attributes.Details_Grids4[0]
                            .Title
                        }
                          {
                          DetailsData?.details_grid.data.attributes.Details_Grids4[0]
                            .TitleNumber
                        }
                      </Typography>
                      <Typography variant="body1" lineHeight="24px" mb="2rem" color="primary.dark">
                        {
                          DetailsData?.details_grid.data.attributes.Details_Grids4[0]
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
                          DetailsData?.details_grid.data.attributes.Details_Grids4[0]
                            .unit
                        }
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
                 <Paper className="post1" elevation={0}>
                  <Typography variant="body1" textAlign="center" lineHeight="24px">
                    {DetailsData?.DetailSubtitle.subtitle1} <br />
                    <Link
                      href={'/'+DetailsData?.DetailSubtitle.subtitle2Link}
                      style={{ color: '#00653E' }}
                    >
                      {DetailsData?.DetailSubtitle.subtitle2}
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
                      DetailsData?.DetailsSection.Title
                    }
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary.dark"
                    mb="2rem"
                  >
                    {
                      DetailsData?.DetailsSection.Content
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
                       View Risks
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails style={{ backgroundColor: '#FAF6ED', padding: '3rem' }}>
                      <Grid container spacing={4}>

                        {DetailsData?.PotentialRisks.map((item, index) => (
                          [
                          <Grid item xs={6}>
                              <Typography variant="h4" fontSize="1.25rem" component="h3" mb="0.7rem">
                                {' '}
                                {item.title}
                                {item.titlenumber}
                              </Typography>
                              <Typography variant="body1" lineHeight="24px" color="primary.dark">
                                 {item.content}
                              </Typography>
                              <img
                                  style={{ marginLeft: '58px', marginTop: '20px' }}
                                  width="180.45px"
                                  height="239px"
                                  src={(REACT_APP_api_base_url || "") + item.image.data.attributes.url}
                                  alt="DottedCircle6"
                               />
                          </Grid>
                          ]
                        ))}
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
                           Severe tear in the vagina.
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
                           Too much bleeding after the birth. {' '}
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
                            Needing help from tools like forceps or a vacuum.{' '}
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
                   Authors
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
                    This decision aid was made by a group of public health and medical experts led by Partner to Decide.
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
                    Led by Partner to Decide
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
                        DetailsData?.details_author.data.attributes.authors1[0]
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
                        DetailsData?.details_author.data.attributes.authors1[0]
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
                      { DetailsData?.details_author.data.attributes.authors2[0].name }
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
                        DetailsData?.details_author.data.attributes.authors2[0]
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
                        DetailsData?.details_author.data.attributes.authors3[0]
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
                        DetailsData?.details_author.data.attributes.authors3[0]
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
                        DetailsData?.details_author.data.attributes.authors4[0]
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
                        DetailsData?.details_author.data.attributes.authors4[0]
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
                    Explore
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
                       Wait for Labor
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button fontSize="18px">
                        41-42 WK Induction
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button fontSize="18px">
                        Compare Choices
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

           <Grid item xs={12} md={1}></Grid>
              <Grid item xs={12} md={4}>

              { SideTopics ?
                <Paper elevation={0} className="post">
                  <Typography
                    variant="h6"
                    component="h3"
                    mb="1rem"
                    className="rightTitle"
                  >
                  {SideTopics?.Title}
                  </Typography>
                  {SideTopics?.SidebarTopics.map((item, index) => (
                   <Typography key={index} variant="body1" mb="1.5rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                     <CaretRight key={index} size={16} />
                     {item.Link ?
                     <Link href={item.Link}>
                       {item.Text}
                     </Link>
                     : item.Text }
                   </Typography>
                  ))}
                </Paper>
                : null }

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

export default Details
