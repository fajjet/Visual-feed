import React from 'react';
import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  children?: any;
}

const Helmet = (props: Props) => {
  const { title, description, keywords, children } = props;
  return (
    <Head>
      {title && <title>{title} - Mern app by fajjet</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="Keywords" content={keywords} />}
      {children}
    </Head>
  );
};

export default Helmet;
