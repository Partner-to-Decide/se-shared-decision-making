import React from 'react';
import './FooterStyles.css'
import './logo.png'
  
const FooterBar = () => {
  return (
    <div>
    <div className = 'allFooter'>
    <div id = 'col1F'>
    <ol >
      <img src={'logo.png'} alt="Logo" />;
     <li><button className = 'allFooter'>Website</button></li>
     <li><button className = 'allFooter'>Contact Us</button></li>
     <button id = 'srt'>Support Us</button>
    </ol>
    </div>

    <div id = 'col2F'>
    <ol >
    <h1 className = 'allFooter'>Induction Decision Aid</h1>
    <li><button className = 'allFooter'>Home</button></li>
    <li><button className = 'allFooter'>My Choices</button></li>
    <li><button className = 'allFooter'>My Values</button></li>
    <li><button className = 'allFooter'>My Stuff</button></li>
    <hr></hr>
    <li><button className = 'allFooter' >Wait for Labor</button></li>
    <li><button className = 'allFooter'>41-42 Week Induction</button></li>
    <li><button className = 'allFooter'>39-41 Week Induction</button></li>
    </ol>
    </div>

    <div id = 'col3F'>
    <ol >
    <h1 className = 'allFooter'>Download a PDF</h1>
    <li><button className = 'allFooter'>English</button></li>
    <li><button className = 'allFooter'>Español</button></li>
    <li><button className = 'allFooter'>Kreyòl Ayisyen</button></li>
    </ol>
    </div>
    </div>
    </div>
    
  );
};
export default FooterBar;