// hooks
import { useRef, useState, useEffect } from "react";
// font awesome icons
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// RegEx
// 複習 看一下怎麼用 跟意思
// USER_REGEX： Start with a-z followed by 3-23 a-z, A-Z, 0-9, -, _
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
// PWD_REGEX： At least 1 lowercase, uppercase, number, special character. 8~24 characters.
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// main
const Register = () => {
  // useRef
  const userRef = useRef();
  const errRef = useRef();

  // useState - user
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  // useState - pwd
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // useState - MatchPwd
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  // errMsg, login success indicator
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect - set focus on username when first load
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect - chk is username valid when username change
  useEffect(() => {
    const result = USER_REGEX.test(user);
    // logging for chking
    console.log(result);
    console.log(user);
    // update validName
    setValidName(result);
  }, [user]);

  // useEffect - chk is pwd valid when pwd or matchPwd change
  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    // logging
    console.log(result);
    console.log(pwd);
    // update validPwd
    setValidPwd(result);
    // update validMatch (is Pwd match MatchPwd)
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  // useEffect - clear out err msg
  useEffect(() => {
    // clear out the err msg whenever followings change
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  return (
    <section>
      {/* display err msg if err msg exist, if not -> offscreen */}
      <p
        ref={errRef}
        className={errMsg ? "errMsg" : "offscreen"}
        // assertive : when focus is set on errMsg, screen reader will announce the err msg
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form>
        {/* Username block */}
        <label htmlFor="username">
          Username:
          {/* V/X indicator */}
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {/* if user is empty -> hide X */}
          {/* if user is not empty, depend on validName */}
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          // disable auto-completion (dont want previous value to show up)
          autoComplete="off"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
          // accessibilities
          // aria-invalid: if name is not valid(validName:false), aria-invalid is true
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => {
            setUserFocus(true);
          }}
          onBlur={() => {
            setUserFocus(false);
          }}
        />
        {/* note for aria-describedby */}
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        {/* password block */}
        <label htmlFor="password">
          Password：
          {/* V/X indicator */}
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {/* if user is empty -> hide X */}
          {/* if user is not empty, depend on validName */}
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          // Note: no ref attribute because dont want focus when page load (should focus on username)
          // autoComplete is not supported in password
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          required
          // accessibilities
          // aria-invalid: if name is not valid(validName:false), aria-invalid is true
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => {
            setPwdFocus(true);
          }}
          onBlur={() => {
            setPwdFocus(false);
          }}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:{" "}
          {/* putting each special character in span with aria-label */}
          {/* so that the screen reader will read it */}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hash tag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        {/* Confirm password block */}
        <label htmlFor="confirm_pwd">
          Confirm Password：
          {/* V/X indicator */}
          {/* Note the differences to username and password */}
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          {/* if user is empty -> hide X */}
          {/* if user is not empty, depend on validName */}
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => {
            setMatchPwd(e.target.value);
          }}
          required
          // accessibilities
          // aria-invalid: if name is not valid(validName:false), aria-invalid is true
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => {
            setMatchFocus(true);
          }}
          onBlur={() => {
            setMatchFocus(false);
          }}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} /> Must match the first password
          input field.
        </p>
      </form>
    </section>
  );
};

export default Register;
