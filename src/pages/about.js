import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import aboutStyles from './about.module.css';

const AboutPage = () => {
  return (
    <Layout>
      <h1>About</h1>
      <p>I am Sam and I build for the web.</p>
      <p className={aboutStyles.about}>
        <Link to="/contact">Say Hi to me.</Link>
      </p>
    </Layout>
  );
}

export default AboutPage;