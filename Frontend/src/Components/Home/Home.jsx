import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';
import './Home.css'; // Import your custom CSS file for additional styling
import HomeCard from './HomeCard';
import HomeCard2 from './HomeCard2';


export default function Home() {

  return (
    <>

      <HomeCard />
      <div className="carousel-container" style={{ maxWidth: '90%', margin: '0 auto' }}>
        <MDBCarousel className="custom-carousel"  showIndicators touch={false} showControls fade interval={2500}>
          <MDBCarouselItem itemId={1}>
            <img src='./Images/Img3.jpg' className='d-block w-100' alt='...' style={{ maxHeight: '520px', width: 'auto' }} />
            {/* <MDBCarouselCaption>
              <h5>First slide label</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </MDBCarouselCaption> */}
          </MDBCarouselItem>
          <MDBCarouselItem itemId={2}>
            <img src='./Images/Img4.jpg' className='d-block w-100' alt='...' style={{ maxHeight: '520px', width: 'auto' }} />
            {/* <MDBCarouselCaption>
              <h5>Second slide label</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </MDBCarouselCaption> */}
          </MDBCarouselItem>
          <MDBCarouselItem itemId={3}>
            <img src='./Images/Img5.jpg' className='d-block w-100' alt='...' style={{ maxHeight: '520px', width: 'auto' }} />
            {/* <MDBCarouselCaption>
              <h5>Third slide label</h5>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </MDBCarouselCaption> */}
          </MDBCarouselItem>
        </MDBCarousel>
      </div>
      <HomeCard2 />
    </>
  );
}
