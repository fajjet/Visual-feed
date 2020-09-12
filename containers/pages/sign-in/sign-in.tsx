import React from "react";

import { SignInForm } from "containers";
import Styled from "./sign-in.style";

interface Props {}

const SignIn = (props: Props) => {
  return (
    <Styled.Root>
      <div className={"content-wrapper"}>
        <h2>Sign in</h2>
        <SignInForm />
      </div>
    </Styled.Root>
  );
};

export default React.memo(SignIn);
