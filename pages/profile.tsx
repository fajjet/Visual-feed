import React from "react";
import Cookies from "js-cookie";

import { Profile } from "containers";
import { Helmet } from "components";
import { CustomNextPageContext } from "types";

interface Props {
  pageProps: {
    tokenId: string;
  };
}

const ProfilePage = (props: Props) => {
  const { tokenId } = props.pageProps || {};
  return (
    <>
      <Helmet title={"Profile"} />
      <Profile tokenId={tokenId} />
    </>
  );
};

ProfilePage.getInitialProps = async (context: CustomNextPageContext) => {
  let tokenId = "";
  if (context.req) {
    tokenId = context.req?.cookies?.tokenId;
  } else {
    tokenId = Cookies.get("tokenId") || "";
  }
  return {
    tokenId,
  };
};

export default ProfilePage;
