import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

const AboutPage = () => {
  return (
    <Layout>
      <h1>About</h1>
      <p>I am Sam and I build for the web.</p>
      <p>The things that we learn today may be <em>useless</em> in 10 years and things can be learned by <em>anyone.</em></p>
      <p>The things that last are not complete, they are <em>in porgress.</em> So wat I <em>will</em> tell you is that I am <em>in porgress.</em></p>
      <p>I hold on to my methods <em>losely,</em> embrace <em>flexibility</em> and <em>modularity.</em></p>
      <p>So need a developer? <Link to="/contact">Say Hi to me.</Link></p>
    </Layout>
  );
}

export default AboutPage;