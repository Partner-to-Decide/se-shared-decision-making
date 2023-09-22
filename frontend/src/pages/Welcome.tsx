import { useNavigate } from 'react-router-dom'
import { VscArrowRight } from 'react-icons/vsc'
import './pageStyle/Welcome.css'
import FooterBar from '../components/Footer/FooterBar'
import Layout from '../components/Layout'
import Container from '@mui/material/Container';
const Welcome = () => {
  const navigate = useNavigate()

  const navigateHome = (language) => {
    navigate(`/Home?lang=${language}`)
  }

  return (
      <div>
        <div className="welcome-section">
            <Container maxWidth="sm">
              <div className="allWelcome">
                <p>Pick one to continue</p>

                <button className="Welcome" onClick={() => navigateHome('en')}>
                  <h1>
                    Welcome <VscArrowRight />
                    {/* arrow icon imported using react icons, for additional standard site icons see https://react-icons.github.io/react-icons */}
                  </h1>
                </button>
                {/* English */}
                <p style={{ marginBottom: '1.5rem' }}>View the site in English</p>

                <button className="Welcome" onClick={() => navigateHome('es')}>
                  <h1>
                    Bienvenidos <VscArrowRight />
                  </h1>
                </button>
                <p style={{ marginBottom: '1.5rem' }}>Ver el sitio en español </p>
                {/* Spanish */}

                <button className="Welcome" onClick={() => navigateHome('bah')}>
                  <h1>
                    Akeyi <VscArrowRight />
                  </h1>
                </button>
                <p style={{ marginBottom: '4rem' }}>Gade sit la nan kreyòl ayisyen</p>
                {/* //Haitian Creole */}

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
