import React from 'react';
import Header from './Header';

const Layout = ({children}) => (
  <main className="layout">
    <Header />
    {children}
  </main>
);

export default Layout;
