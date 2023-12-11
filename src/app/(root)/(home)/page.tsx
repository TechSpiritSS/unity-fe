import React from 'react';
import Home from './home';
import PageHeader from '@/components/PageHeader';

export async function generateMetadata() {
  const dynamicTitle = 'HackerNews Search';
  const dynamicDescription =
    'A simple search engine for HackerNews built with Next.js and TailwindCSS';

  return {
    title: dynamicTitle,
    description: dynamicDescription,
    openGraph: {
      title: dynamicTitle,
      description: dynamicDescription,
      type: 'website',
      locale: 'en_IE',
      site_name: 'HackerNews Search',
    },
  };
}

const page = () => {
  return (
    <>
      <PageHeader title="Hacker News Search" />
      <Home />
    </>
  );
};

export default page;
