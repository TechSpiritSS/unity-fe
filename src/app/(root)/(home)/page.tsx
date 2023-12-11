import React from 'react';
import Home from './home';
import PageHeader from '@/components/PageHeader';

const page = () => {
  return (
    <>
      <PageHeader title="Hacker News Search" />
      <Home />
    </>
  );
};

export default page;
