import Link from 'next/link';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const siteSettings = {
  name: 'CoViPeL',
};

const Index = () => {

  return (
    <Layout
      slug="/login-failed"
      siteName={siteSettings.name}
    >
      <Header siteSettings={siteSettings} showHomeLink />
      <div className="w-full py-16 bg-primary h-full text-center">
        <div className="text-large max-w-screen-lg md:mx-auto justify-center">
          <h1 className="h2">Login Failed</h1>
        </div>
        <div className="py-16">
          <p className="p-2"> This could occur if your session has expired or if you have not agreed to the terms of use.</p>
          <button type="button" className="rounded border border-black bg-white p-1"><Link target="_blank" rel="noreferrer" href="/" className="p-2">Back to Home</Link></button>
        </div>

      </div>
      <Footer siteSettings={siteSettings} />

    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600,
  };
}

export default Index;
