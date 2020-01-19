import React from 'react';

import Layout from '../components/layout';
import Head from '../components/head';

const ContactPage = () => {
  return (
    <Layout>
      <Head pageTitle="Contact Me" />
      <h1>Contact</h1>
      <p>Reach me via Twitter <a href="https://twitter.com/litesam211" target="_blank" rel="nofollow noopener noreferrer">@litesam211</a></p>
      <p>My Github <a href="https://github.com/litesam" target="_blank" rel="nofollow noopener noreferrer">litesam</a></p>
    </Layout>
  );
}

export default ContactPage;