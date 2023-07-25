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
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3, 23}$/;
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
      </form>
    </section>
  );
};

export default Register;
