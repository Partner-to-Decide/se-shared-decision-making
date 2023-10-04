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

function scrollToSection(e, sectionId) {
  e.preventDefault();
  const target = document.querySelector(`#${sectionId}`);
  if (target instanceof HTMLElement) {
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth',
    });
  }
}
function Details() {

  const [isMobile, setIsMobile] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

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
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
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

  useEffect(() => {
    if(width<=768){
      setIsMobile(true)
    }
  }, [width]);

  /* language fetch */

  const [languageState, setLanguageState] = useState('en')
  useEffect(() => {
    window.addEventListener('storage', () => {
      setLanguageState(localStorage.getItem('language') || 'en')
    })
  }, [])

  const { slug } = useParams();

  const [detailsSectionData, setDetailsSectionData] = useState<Details_data>()

  const [detailsButtonSetData, setDetailsButtonSetData] =
    useState<details_buttonset>()

  const [detailsAuthorsData, setDetailsAuthorsData] =
    useState<details_authors>()

  useEffect(() => {

   const fetchDetailsData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
           `/api/choices-detail-pages?filters[slug][$eq]=${slug}&populate=deep&locale=` +
            localStorage.getItem('language')
        )
         const sortedData = result.data.data.sort((a: any, b: any) => {
            return a.id - b.id;
          });
        setDetailsSectionData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              `/api/choices-detail-pages?filters[slug][$eq]=${slug}&populate=deep&locale=` +
              DEFAULT_LANGUAGE
          )
          const sortedData = result.data.data.sort((a: any, b: any) => {
            return a.id - b.id;
          });
         setDetailsSectionData(result.data.data[0].attributes)
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
         const sortedData = result.data.data.sort((a: any, b: any) => {
            return a.id - b.id;
          });
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
   fetchDetailsAuthorsData()
   fetchDetailsButtonSetData()
   fetchDetailsData()
  }, [languageState])


  const DetailsData = detailsSectionData?.data[0]?.attributes;
  const SideTopics  = detailsSectionData?.data[0]?.attributes?.DetailTopics; 
  const details_content = DetailsData?.DetailsContent;
  const details_source = DetailsData?.source?.data?.attributes.source1;
  const details_buttonset = DetailsData?.DetailsButtons;

  return (  
      <StyledEngineProvider injectFirst>
        <Layout>
            <div className="root">
              <Container maxWidth="lg">
                   <Grid container spacing={2} pt="2rem" pb="3rem" alignItems="flex-start">
                      <Grid item xs={12} md={7}>
                          <Paper elevation={0} className="mainText">

                               <Grid container spacing={2} mb={!isMobile ? "2rem" : "1rem"}>
                                  <Grid item>
                                      <Typography textTransform="uppercase" variant="h5" color="#4D4D4D" gutterBottom alignItems="center" sx={{ display: 'flex' }}>
                                          <span style={{ marginRight: '3px' }}><Link href="/Home" color="#4D4D4D" sx={{ textDecoration: 'none' }}>Home</Link> &gt; </span> 
                                           {DetailsData?.Title}
                                      </Typography>
                                  </Grid>
                                  {!isMobile &&
                                    <Grid item ml='auto'>
                                        <Typography textTransform="uppercase" variant="h5" color="#4D4D4D" gutterBottom alignItems="center" sx={{ display: 'flex' }}>
                                            <Clock size={20} style={{ marginRight: '5px' }} />
                                            { DetailsData?.DetailsWaiting?.ReadingTime }
                                        </Typography>
                                    </Grid>
                                  }
                              </Grid>

                               <Typography variant="h2" mb="0.7rem" color="primary.main" className="maintitle2">
                                {DetailsData?.Title}
                              </Typography>
                              <Typography variant="h4" color="primary.main" className="m-font-size-24">
                                { DetailsData?.DetailsWaiting?.title1 }
                              </Typography>

                              {isMobile &&
                                <Grid item mt="1.5rem">
                                    <Typography textTransform="uppercase" variant="body1" color="#4D4D4D" gutterBottom alignItems="center" sx={{ display: 'flex' }}>
                                        <Clock size={20} style={{ marginRight: '5px' }} />
                                        { DetailsData?.DetailsWaiting?.ReadingTime }
                                    </Typography>
                                </Grid>
                              }

                             {isMobile &&
                                <Grid item xs={12} mb="3rem">

                                  { details_content ?
                                    <Paper elevation={0} className="post">
                                      <Typography
                                        variant="h6"
                                        component="h3"
                                        mb="1rem"
                                        className="rightTitle"
                                      >
                                      {SideTopics?.Title}
                                      </Typography>
                                      {details_content?.map((item, index) => (
                                       <Typography key={index} variant="body1" mb="1.5rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                                         <CaretRight key={index} size={16} />
                                         <Link href={'#section' + item.id} onClick={(e) => scrollToSection(e, 'section'+item.id)} sx={{ color: '#4D4D4D', textDecoration: 'none' }}>
                                           { item.title }
                                         </Link>
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
                                }

                              {details_content?.map((item, index) => (
                                <>
                                  {item.image?.data ?
                                    <img
                                    src={(REACT_APP_api_base_url || "") + item.image.data?.attributes?.url}
                                    id={'first-image-'+item.Imagelayout}
                                    className={'imagelayout-'+item.Imagelayout}
                                    alt="firstimg"
                                    style={{ marginBottom: '30px' }}
                                    />
                                  :null }
                              <div id={'section'+item.id}>
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
                                     <div className="bodyText details-content" dangerouslySetInnerHTML={{ __html: item.Description }}></div>
                                  : null }
                                  {item.link?
                                  <Typography variant="body1" className="linkText">
                                   { item.linktitle1?item.linktitle1:null }{' '}
                                    <Link
                                    href={item.link}
                                    style={{ color: '#00653E', fontWeight: 'bold', textTransform: 'capitalize' }}
                                    >
                                   {item.linktitle2? item.linktitle2 :null}
                                    </Link>
                                </Typography>
                               : null }
                              </div>
                          </>))}
                     </Paper>
                {DetailsData?.DetailsGrid?
                 <Grid container spacing={4}>
                   {DetailsData?.DetailsGrid?.map((item, index, array) => (
                      <Grid key={index} item xs={12} md={6}>
                        <Paper elevation={0} className="whitePost">
                          <Typography
                            variant="h4" 
                            mb="0.7rem" 
                            color="primary.dark"
                            className="bottomTitle"
                          >
                            {item.Title}
                            <span>{item.TitleNumber}</span>
                          </Typography>
                          <Typography variant="body1" lineHeight="24px" mb="2rem" color="primary.dark">
                            {item.Description}
                          </Typography>
                          <Grid xs={12} textAlign="center">
                             <img
                                style={{ marginTop: '20px' }}
                                src={(REACT_APP_api_base_url || "") + item.Image.data.attributes.url}
                                alt="DottedCircle6"
                             />
                            {index === array.length - 1 && (
                              <Typography
                                variant="h4"
                                color="#000000"
                                style={{
                                  fontSize: '16px',
                                  letterSpacing: '0.25px',
                                  textTransform: 'capitalize',
                                  marginTop: '1rem'
                                }}
                              >
                               {item.unit}
                            </Typography>
                             )}
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                : null }
                 <Grid className="same-rectangle" item>
                    <Typography display="block" className="same-for-all-opts">
                      {DetailsData?.DetailSubtitle.subtitle1}
                    </Typography>

                    <Typography display="block" className="same-breastfeed">
                      {DetailsData?.DetailSubtitle.subtitle2}
                    </Typography>
                </Grid>

                 <Paper elevation={0}>
                  <Typography
                    variant="h4"
                    component="h2"
                    mt="3rem"
                    mb="0.7rem"
                    className="secondTitle title2 maintitle2"
                  >
                    {
                      DetailsData?.DetailsSection.Title
                    }
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary.dark"
                    mb="2rem"
                    fontSize="14px"
                    lineHeight="20px"
                  >
                    {
                      DetailsData?.DetailsSection.Content
                    }
                  </Typography>
                  <Accordion elevation={0} className="details-accordion">
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon style={{ color: '#FFFFFF' }} />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{
                        backgroundColor: '#A86133',
                        borderRadius: '10px',
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
                             
                            {item?.popuptitle ?
                              <Typography
                                  display="inline"
                                  className="ThreeTagsStyle"
                                  bgcolor="#dff0d8"
                                  onClick={handleClickBirth}
                                  variant="h4"
                                  fontSize="1.25rem"
                                  mb="0.7rem"
                                >
                                {item.title} {item.titlenumber}
                              </Typography>
                              :
                             <Typography variant="h4" fontSize="1.25rem" component="h3" mb="0.7rem">
                                {' '}
                                {item.title} {item.titlenumber}
                              </Typography>
                            }
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
                             {item?.popuptitle ?   
                              <Popup
                                open={openBirth}
                                anchorEl={anchorElBirth}
                                handleClose={handleCloseBirth}
                                title={item?.popuptitle}
                                text={item?.popupcontent}
                              />
                              : null }
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
                            For all three options there is the {' '}
                            <span
                              style={{
                                fontWeight: 'bold',
                              }}
                            >
                              same chance
                            </span>{' '}
                            of breastfeeding.
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
                    className="secondTitle maintitle2"
                  >
                   {detailsAuthorsData?.data[0].attributes?.Heading}
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
                    {detailsAuthorsData?.data[0].attributes?.content}
                  </Typography>
                  <Link
                    variant="body1"
                    href={detailsAuthorsData?.data[0].attributes?.btnlink}
                    style={{
                      color: '#00653E',
                      fontWeight: 'bold',
                      marginBottom: '30px',
                    }}
                  >
                    {detailsAuthorsData?.data[0].attributes?.ButtonText}
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
                      {detailsAuthorsData?.data[0].attributes.authors2[0].name }
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
                  {details_source?
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
                    {details_source?.map((item, index) => (
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
                {details_buttonset &&
                 <>
                  <Typography
                    variant="h4"
                    component="h2"
                    className="secondTitle maintitle2"
                    style={{
                      marginTop: '50px',
                    }}
                  >
                  {details_buttonset?.TopHeading}
                  </Typography>

                  <Divider
                    style={{
                      height: '3px',
                      marginBottom: '20px',
                    }}
                  />

                  <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                    {details_buttonset?.BtnLinks.map((item, index) => (
                      
                    <Grid item>
                      <Button sx={{ fontSize: '18px' }}>
                      {item.ButtonLink ? (
                        <Link href={item.ButtonLink} sx={{ textDecoration: 'none' }}>
                          {item.ButtonText}
                        </Link>
                      ) : (
                        <span>{item.ButtonText}</span>
                      )}
                    </Button>
                    </Grid>
                     
                    ))}
                  </Grid>
                </>}
                </Paper>
              </Grid>

            {!isMobile &&
              <Grid item xs={12} md={1}></Grid>
            }
            {!isMobile &&
              <Grid item xs={12} md={4} className="sidebar-sticky">

             {details_content?
                <Paper elevation={0} className="post">
                  <Typography
                    variant="h6"
                    component="h3"
                    mb="1rem"
                    className="rightTitle"
                  >
                  {SideTopics?.Title}
                  </Typography>
                                
                  {details_content?.map((item, index) => (
                   <Typography key={index} variant="body1" mb="1.5rem" fontSize="1.125rem" color="#4D4D4D" sx={{ display: 'flex' }}>
                     <CaretRight key={index} size={16} />
                     <Link href={'#section' + item.id} onClick={(e) => scrollToSection(e, 'section'+item.id)} sx={{ color: '#4D4D4D', textDecoration: 'none' }}>
                        { item.title }
                     </Link>
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
              }
            </Grid>
          </Container>
       </div>
    </Layout>
</StyledEngineProvider>
  )
}

export default Details
