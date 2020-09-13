import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Router from "next/router";

import { TextInput } from "components";
import { normalizeNameInput } from "utils";
import { createUser } from "utils/api";
import Styled from "./sign-up-form.style";
import actions from "store/actions";
import Cookies from "js-cookie";

const SignUpForm = () => {
  const loading = useRef(false);
  const [status, setStatus] = useState<null | number>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = async (e: React.SyntheticEvent) => {
    if (loading.current) return;
    loading.current = true;
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    const res = await createUser(user);
    const response = await res.json();
    if (res.status === 201) {
      const user = response.user;
      Cookies.set("tokenId", response.tokenId || "");
      dispatch(actions.setUser(user));
      toast.success("Your account was successfully created");
      Router.push("/");
    } else {
      const err = response.error || response._message || "Error";
      toast.error(err);
      loading.current = false;
    }
    setStatus(res.status);
  };

  return (
    <Styled.Root as={"form"} name={"signUp"} onSubmit={onSubmit}>
      <Styled.Field>
        <TextInput
          value={firstName}
          label={"First name"}
          onChangeHandler={(value: string) =>
            setFirstName(normalizeNameInput(value))
          }
          type={"text"}
          minLength={2}
          maxLength={30}
          required
        />
      </Styled.Field>
      <Styled.Field>
        <TextInput
          value={lastName}
          label={"Last name"}
          onChangeHandler={(value: string) =>
            setLastName(normalizeNameInput(value))
          }
          type={"text"}
          minLength={2}
          maxLength={30}
          required
        />
      </Styled.Field>
      <Styled.Field>
        <TextInput
          placeholder={"* without confirmation"}
          value={email}
          label={"Email"}
          onChangeHandler={(value: string) => setEmail(value)}
          type={"email"}
          maxLength={100}
          required
        />
      </Styled.Field>
      <Styled.Field>
        <TextInput
          value={password}
          label={"Password"}
          onChangeHandler={(value: string) => setPassword(value)}
          type={"password"}
          minLength={6}
          maxLength={64}
          required
        />
      </Styled.Field>
      <button type={"submit"} disabled={status === 201}>
        Create an account
      </button>
    </Styled.Root>
  );
};

export default React.memo(SignUpForm);
