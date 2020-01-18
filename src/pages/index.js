import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <h1>Hello.</h1>
      <h2>I'm Sam</h2>
      <p>Read about my content here, You sure get to read a lot about what do I do and what runs inside my mind.</p>
      <p>As a wise man once said visit <Link to="/blog">Bloggy</Link></p>
    </Layout>
  );
}

export default IndexPage;