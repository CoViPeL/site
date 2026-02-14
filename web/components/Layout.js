import Head from 'next/head';

const Layout = ({
  slug,
  title = '',
  description = '',
  image,
  siteName,
  children,
}) => {
  const siteTitle = siteName || process.env.NEXT_PUBLIC_PROJECT_NAME || '';

  const fullTitle = title || siteTitle;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta property="og:title" key="og_title" content={fullTitle} />
        {description && (
          <>
            <meta name="description" key="description" content={description} />
            <meta property="og:description" key="og_description" content={description} />
          </>
        )}
        {image && (
          <meta property="og:image" content={image} />
        )}
      </Head>
      <div className="w-full flex flex-col items-center h-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;
