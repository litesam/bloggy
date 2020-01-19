import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';

const NotFound = () => {

  return (
    <Layout>
      <h1>Looks like you come to an place where there is no content!</h1>
      <Link to="/">Click Me to go front</Link>
    </Layout>
  );
}

export default NotFound;