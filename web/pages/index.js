import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const indexData = {
  pageTitle: 'CoViPeL - Computational Vision and Perception Lab',
  siteSettings: {
    name: 'CoViPeL',
    seoDescription: 'CoViPeL - Computational Vision and Perception Lab',
    seoImage: null,
  },
};

const Index = () => {
  const {
    pageTitle,
    siteSettings,
  } = indexData;

  return (
    <Layout
      slug=""
      title={pageTitle}
      description={siteSettings.seoDescription}
      image={siteSettings.seoImage}
      siteName={siteSettings.name}
    >
      <Header siteSettings={siteSettings} showSignup />
      <div className="p-4 md:p-12 relative w-full min-h-screen" />
      <Footer siteSettings={siteSettings} />
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      indexData,
    },
    revalidate: 3600,
  };
}

export default Index;
