import React, { useEffect } from 'react';
import Head from 'next/head';
import AddressInput from '../components/addressInput';

const Index = () => {
  return (
    <>
      <Head>
      </Head>
      <div>
        <h1>This is the Dashboard...</h1>
        <p>APP: NWowe8ycVV8uJT4hXLOM</p>
        <p>API: do3gLItZqjHxYrA6zsiVajuSI02m6RulkOuY2H2lX1k</p>
        <AddressInput />
      </div>
    </>
  );
};

export default Index;
