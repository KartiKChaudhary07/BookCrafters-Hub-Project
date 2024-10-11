import "./landingPage.css";

import CommonHeader from "@/Components/Header";

const LandingPage = () => {
  return (
    <main className="landingPage">
      <div className="hero">
        <div className="heroContent">
          <h1>GLA + IntegraMinds</h1>
          <p>Crafting seamless and innovative digital solutions.</p>
        </div>
      </div>

      <section id="services" className="services">
        <h2>Our Services</h2>
        <div className="services">
          <div className="serviceCard">
            <h3>Frontend Development</h3>
            <p>Modern and responsive web interfaces using React, JavaScript.</p>
          </div>
          <div className="serviceCard">
            <h3>Backend Development</h3>
            <p>Powerful server-side logic and APIs with Python and Flask.</p>
          </div>
          <div className="serviceCard">
            <h3>Database Management</h3>
            <p>Efficient and secure data storage solutions using MongoDB.</p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <p>
          We are a team of experienced full-stack developers dedicated to
          bringing your ideas to life. With expertise in both frontend and
          backend technologies, we deliver high-quality solutions that meet your
          needs.
        </p>
      </section>

      <footer id="contact" className="footer">
        <h2>Contact Us</h2>
        <div className="socialLinks">
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
