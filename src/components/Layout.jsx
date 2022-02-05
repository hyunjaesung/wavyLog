import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';
import Header from './Header';

const Layout = ({children}) => (
  <main className="layout">
    <Helmet>
      <title>Stevy's wavyLog 🌊</title>
    </Helmet>
    <Header />
    {children}
    <Footer />
  </main>
); 

export default Layout;
