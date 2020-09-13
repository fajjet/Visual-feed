import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import Styled from "./header.style";
import { State } from "store/initialState";

const Header = () => {
  const user = useSelector((state: State) => state.app.user);

  return (
    <Styled.Root as={"header"}>
      <Styled.Wrapper className={"content-wrapper"}>
        <Styled.Left>
          <Link href={"/"} passHref>
            <Styled.Link as={"a"}>Home</Styled.Link>
          </Link>
          <Link href={"/users"} passHref>
            <Styled.Link as={"a"}>Users</Styled.Link>
          </Link>
        </Styled.Left>
        <Styled.Right>
          {user && (
            <Link href={"/profile"} passHref>
              <Styled.Link as={"a"}>profile</Styled.Link>
            </Link>
          )}
          {!user && (
            <>
              <Link href={"/signup"} passHref>
                <Styled.Link as={"a"}>Sign up</Styled.Link>
              </Link>
              <Link href={"/signin"} passHref>
                <Styled.Link as={"a"}>Sign in</Styled.Link>
              </Link>
            </>
          )}
        </Styled.Right>
      </Styled.Wrapper>
    </Styled.Root>
  );
};

export default React.memo(Header);
