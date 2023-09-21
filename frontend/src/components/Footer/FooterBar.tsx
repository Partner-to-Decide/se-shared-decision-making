import React from 'react'
import './FooterStyles.css'
import LogoDark from './logo.png'
import Link from '@mui/material/Link';
const FooterBar = () => {
  // Footer is still in standard rendered format,
  //   requires proper buttons and routing to
  //appropriate pages, also incorporate download
  //PDF features (using PartnerToDecide originial
  //MyShared Decision PDFs, however must check with client) this link to PDFs in all languages: https://www.partnertodecide.org/decisionaids
  return (
    <div style={{ marginBottom: '100%' }}>
      <div className="allFooter">
        <div id="col1F">
          <ol>
            <img src="https://se-shared-decision-making-production.up.railway.app/uploads/footer_logo_c45b8e39fd.png" alt="Logo" className="logo" />
            <li>
              <button className="leftFooter"><Link href="/" style={{ color: '#fff' }}>Website</Link></button>
            </li>
            <li>
              <button className="leftFooter"><Link href="/" style={{ color: '#fff' }}>Contact Us</Link></button>
            </li>
            <li>
              <button id="srt">Support Us</button>
            </li>
          </ol>
        </div>

        <div id="col2F">
          <ol>
            <h1 className="allFooter">Induction Decision Aid</h1>
            <li>
              <button className="allFooter"><Link href="/Home" style={{ color: '#fff' }}>Home</Link></button>
            </li>
            <li>
              <button className="allFooter"><Link href="/MyChoices" style={{ color: '#fff' }}>My Choices</Link></button>
            </li>
            <li>
              <button className="allFooter"><Link href="/MyValues" style={{ color: '#fff' }}>My Values</Link></button>
            </li>
            <li>
              <button className="allFooter"><Link href="/MyStuff" style={{ color: '#fff' }}>My Stuff</Link></button>
            </li>
            <hr></hr>
            <li>
              <button className="allFooter">Wait for Labor</button>
            </li>
            <li>
              <button className="allFooter">41-42 Week Induction</button>
            </li>
            <li>
              <button className="allFooter">39-41 Week Induction</button>
            </li>
          </ol>
        </div>

        <div id="col3F">
          <ol>
            <h1 className="allFooter">Download a PDF</h1>
            <li>
              <button className="allFooter"><Link href="#" style={{ color: '#fff' }}>English</Link></button>
            </li>
            <li>
              <button className="allFooter"><Link href="#" style={{ color: '#fff' }}>Español</Link></button>
            </li>
            <li>
              <button className="allFooter"><Link href="#" style={{ color: '#fff' }}>Kreyòl Ayisyen</Link></button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
export default FooterBar
