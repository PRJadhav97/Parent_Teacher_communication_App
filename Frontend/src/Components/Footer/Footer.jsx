import React from 'react';

function Footer() {
  return (
    <footer className="text-center text-lg-start text-dark" style={{ backgroundColor: '#ECEFF1', width: '100%' }}>
      {/* Section: Social media */}
      <section className="d-flex justify-content-between text-white" style={{ height:"60px",backgroundImage:"linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}>
        {/* Left */}
        <div className="me-5">
          <span>Get connected with us on social networks:</span>
        </div>
        {/* Left */}

        {/* Right */}
        {/* <div>
          <a href="" className="text-dark me-4">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="text-dark me-4">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="text-dark me-4">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="text-dark me-4">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="text-dark me-4">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="text-dark me-4">
            <i className="fab fa-github"></i>
          </a>
        </div> */}
        {/* Right */}
      </section>
      {/* Section: Social media */}

      {/* Section: Links  */}
      <section style={{height:"auto"}}>
        <div className="container text-center text-md-start " style={{height:"250px"}} >
          {/* Grid row */}
          <div className="row mt-3" >
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto ">
              {/* Content */}
              <h6 className="text-uppercase fw-bold">COMMUNICA</h6>
              <hr className=" mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
              <p>
              Our App is joining the family to advance our shared mission of driving student success through communication and engagement.
              </p>
            </div>
        
            {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto">
              
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
              <p>
                <a href="#!" className="text-dark">About Us</a>
              </p>
              <p>
                <a href="#!" className="text-dark">Careers</a>
              </p>
              <p>
                <a href="#!" className="text-dark">Partners</a>
              </p>
              <p>
                <a href="#!" className="text-dark">Terms & Conditions</a>
              </p>
            </div> */}
       
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">Contact</h6>
              <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
              <p><i className="fas fa-home mr-3"></i> Mumbai, India</p>
              <p><i className="fas fa-envelope mr-3"></i> info@communication.com</p>
              <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
              <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      {/* Section: Links  */}

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundImage:"linear-gradient(142.4deg, rgb(139, 98, 208) 5%, rgb(126, 124, 223) 28.2%, rgb(109, 207, 236) 62.5%, rgb(176, 239, 244) 89.1%)" }}>
        © 2024 Copyright:
        <a className="text-dark" href="https://mdbootstrap.com/"> communica.com</a>
      </div>
      {/* Copyright */}
    </footer>
    /* Footer */
  );
}

export default Footer;
