import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Medisewa Store</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className="main-container">
        {children}

        <div>
          <MessengerCustomerChat
            pageId={process.env.NEXT_PUBLIC_FB_PAGE_ID}
            appId={process.env.NEXT_PUBLIC_FB_APP_ID}
          />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout