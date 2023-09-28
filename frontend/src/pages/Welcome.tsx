import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { VscArrowRight } from 'react-icons/vsc'
import './pageStyle/Welcome.css'
import FooterBar from '../components/Footer/FooterBar'
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
import {
  welocome_page,
} from '../utils/types'
import { REACT_APP_api_base_url, DEFAULT_LANGUAGE } from '../utils/url_config'
import axios from 'axios'
const Welcome = () => {
  const navigate = useNavigate()

  const navigateHome = (language) => {
    navigate(`/Home?lang=${language}`)
  }
  const [DetailsWelcomeData, setWelcomeData] =
    useState<welocome_page>()

 const [languageState, setLanguageState] = useState('en')
  useEffect(() => {
    window.addEventListener('storage', () => {
      setLanguageState(localStorage.getItem('language') || 'en')
    })
  }, [])

  useEffect(() => {
    const fetchDetailsWelcomeData = async () => {
      try {
        const result = await axios.get(
          REACT_APP_api_base_url +
            '/api/welcome-page?populate=deep&locale=' +
            localStorage.getItem('language')
        )
        setWelcomeData(result.data)
      } catch (error) {
        console.error('Error fetching learn about data: ', error)
        try {
          const result = await axios.get(
            REACT_APP_api_base_url +
              '/api/welcome-page?populate=deep&locale=' +
              DEFAULT_LANGUAGE
          )
          setWelcomeData(result.data)
        } catch (error) {
          console.error(
            'Error fetching learn about data with default locale: ',
            error
          )
        }
      }
    }
    fetchDetailsWelcomeData()
  }, [languageState])

  const Englangdata = DetailsWelcomeData?.data?.attributes;
  const Otherlangdata = DetailsWelcomeData?.data?.attributes?.localizations.data;
   const sortedData = Otherlangdata?.sort((a: any, b: any) => {
          return a.id - b.id;
        });
  console.log(Otherlangdata);
  return (
      <div>
        <div className="welcome-section">
            <Container maxWidth="sm">
              <div className="allWelcome">

                <p style={{ marginBottom: '1.5rem' }}>Pick one to continue</p>

                <button className="Welcome" onClick={() => navigateHome(`${Englangdata?.locale}`)}>
                  <h1>
                      {Englangdata?.title} <VscArrowRight />
                    {/* arrow icon imported using react icons, for additional standard site icons see https://react-icons.github.io/react-icons */}
                  </h1>
                </button>
                {/* English */}
                <p style={{ marginBottom: '1.5rem' }}>View the site in English</p>


                {Otherlangdata?.map((item, index) => (
                [<>
                <button key={index} className="Welcome" onClick={() => navigateHome(`${item.attributes?.locale}`)}>
                  <h1 key={index}>
                 
                    {item.attributes?.title} <VscArrowRight />
                   </h1>
                </button>
                <p key={index} style={{ marginBottom: '1.5rem' }}>{item.attributes?.welcome_message} </p>
                {/* Spanish */}
               </>]))}
                <div className="skip">
                  <button className="skip" onClick={() => navigateHome('en')}>
                    Skip
                  </button>
                  {/* All navigate home for now, Strapi to connect to different language pages */}
                </div>
              </div>
            </Container>
        </div>
        <div className="footer">
          <FooterBar />
        </div>
   </div>
  )
}
export default Welcome
