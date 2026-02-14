import Layout from '../components/Layout';
import Header from '../components/Header';
import Footer from '../components/Footer';

const siteSettings = {
  name: 'CoViPeL',
};

const Index = () => {

  return (
    <Layout
      slug="/welcome"
      siteName={siteSettings.name}
    >
      <Header siteSettings={siteSettings} showHomeLink />
      <div className="w-full py-16 bg-primary h-full text-center">
        <div className="text-large max-w-screen-lg md:mx-auto justify-center">
          <h1 className="h2">Welcome to CoViPeL!</h1>
        </div>
        <div className="py-16">
          <p className="p-2"> Get started by installing and exploring the CoViPeL client.</p>
          <button type="button" className="rounded border border-black bg-white p-1"><a target="_blank" rel="noreferrer" href="https://github.com/CoViPeL/covipel-docs" className="p-2">Explore CoViPeL</a></button>
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
