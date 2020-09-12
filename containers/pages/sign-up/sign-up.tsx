import React from "react";

import { SignUpForm } from "containers";
import Styled from "./sign-up.style";

interface Props {}

const SignUp = (props: Props) => {
  return (
    <Styled.Root>
      <div className={"content-wrapper"}>
        <h2>Sign up</h2>
        <SignUpForm />
      </div>
    </Styled.Root>
  );
};

export default React.memo(SignUp);
