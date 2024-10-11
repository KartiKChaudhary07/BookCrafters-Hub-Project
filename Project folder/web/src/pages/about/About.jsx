// About.jsx
import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Welcome to BookCraft</h1>
        <p className={styles.heroSubtitle}>Crafting a better reading experience, one book at a time.</p>
      </section>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>Who We Are</h2>
        <p className={styles.sectionText}>
          BookCraft is an innovative platform that brings readers and authors closer together. Our goal is to create a seamless reading and book creation experience. Whether you’re looking to write a book or find new reads, we’ve got you covered.
        </p>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Our Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Personalized Recommendations</h3>
            <p className={styles.featureText}>
              Get book recommendations based on your interests and previous reads.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Author Collaboration</h3>
            <p className={styles.featureText}>
              Collaborate with authors and bring your story ideas to life.
            </p>
          </div>
          <div className={styles.featureCard}>
            <h3 className={styles.featureTitle}>Online Book Store</h3>
            <p className={styles.featureText}>
              Buy or sell books directly through our secure platform.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p className={styles.sectionText}>
          To foster a global community of readers and authors, where stories can be shared, crafted, and discovered without limitations. We believe in the power of words to inspire, educate, and transform lives.
        </p>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <h2 className={styles.sectionTitle}>Get in Touch</h2>
        <p className={styles.sectionText}>
          Interested in learning more? Reach out to us at <a href="mailto:contact@bookcraft.com">contact@bookcraft.com</a> or follow us on our social media channels.
        </p>
      </section>
    </div>
  );
};

export default About;
