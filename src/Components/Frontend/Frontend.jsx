import React, { useState } from 'react';
import './Frontend.css';
import AboutMe from '../About/AboutMe';
import Experience from '../Experience/Experience';
import Recomendation from '../Recomendation/Recomendation';

const Frontend = () => {
  const [activeSection, setActiveSection] = useState('AboutMe');
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the index of the first visible image

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then((loadedImages) => {
      setImages((prevImages) => [...prevImages, ...loadedImages]);
    });
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'AboutMe':
        return <AboutMe />;
      case 'Experience':
        return <Experience />;
      case 'Recomendation':
        return <Recomendation />;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentIndex + 3 < images.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className='front-end-development'>
      <div className="container" style={{ height: '42rem', width: '51rem', display: 'flex', left: '21rem', position: 'relative', top: '1rem', justifyContent: 'center' }}>
        <div className="down-container">
          <div className="first-container" style={{ height: '18rem', width: '47rem' }}>
            <div className="ul-list" style={{ display: 'flex', justifyContent: 'center', background: 'black', borderRadius: '1rem', zIndex: '1' }}>
              <div className="ul1">
                <ul
                  className={`inner-ul ${activeSection === 'AboutMe' ? 'active' : ''}`}
                  onClick={() => setActiveSection('AboutMe')}
                  style={{ background: activeSection === 'AboutMe' ? '#303134' : 'black',boxShadow:'1px 1px 10px #303134' }} >
                  About Me
                </ul>
              </div>
              <div className="ul2">
                <ul
                  className={`inner-ul ${activeSection === 'Experience' ? 'active' : ''}`}
                  onClick={() => setActiveSection('Experience')}
                  style={{ background: activeSection === 'Experience' ? '#303134' : 'black',boxShadow:'1px 1px 10px #303134' }}
                >
                  Experience
                </ul>
              </div>
              <div className="ul3">
                <ul
                  className={`inner-ul ${activeSection === 'Recomendation' ? 'active' : ''}`}
                  onClick={() => setActiveSection('Recomendation')}
                  style={{ background: activeSection === 'Recomendation' ? '#303134' : 'black',boxShadow:'1px 1px 10px #303134' }}
                >
                  Recomendation
                </ul>
              </div>
            </div>
            {renderActiveSection()}
          </div>
          <hr className='hr-second-class' style={{ width: '44rem', background: 'grey' }} />
          <div className="second-container" style={{ height: '18rem', width: '47rem' }}>
            <div className="ul-list-second" style={{ display: 'flex', position: 'relative', top: '1rem' }}>
              <div className="gallery" style={{ position: 'relative', left: '2rem' }}>
                <ul style={{ color: 'white' }}>Gallery</ul>
              </div>
              <div className="gallery">
                <ul className='gallery-active'
                  style={{ position: 'relative', left: '10rem', color: 'white', background: 'rgb(46, 46, 46)', boxShadow: 'rgb(0 0 0 / 70%) 1px 1px 10px' }}
                  onClick={triggerFileInput}
                >
                  + ADD IMAGES
                </ul>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="fileInput" multiple />
                <div className="btn">
                  <button className="two-btn" onClick={handlePrev}>←</button>
                  <button className="two-btn" onClick={handleNext}>→</button>
                </div>
              </div>
            </div>
            <div className="gallery-image" style={{ display: 'flex', flexWrap: 'nowrap', gap: '10px', overflow: 'hidden' }}>
              {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
                <div key={index} className="image-list" style={{ height: '10rem', width: '13rem', position: 'relative', borderRadius: '1rem', left: '3rem', marginTop: '2rem' }}>
                  <img src={image} alt="Gallery" style={{ height: '100%', width: '100%', borderRadius: '1rem' }} />
                </div>
              ))}
            </div>
          </div>
          <hr className='hr-second-class' style={{ width: '44rem', background: 'grey' }} />
        </div>
      </div>
    </div>
  );
}

export default Frontend;
