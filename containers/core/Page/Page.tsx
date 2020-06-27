import React from 'react';

import { Header, Footer } from 'containers';

type Props = {
  children: React.ReactNode;
};

const Page = (props: Props) => {
  return (
    <>
      <Header/>
      <main>
        {props.children}
      </main>
      <Footer/>
    </>
  )
};

export default React.memo(Page);
