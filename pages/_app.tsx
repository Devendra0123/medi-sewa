import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { StateContext } from '../context/StateContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </GoogleOAuthProvider>
  )
}

export default MyApp
