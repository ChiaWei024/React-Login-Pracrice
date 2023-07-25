// hooks
import { useRef, useState, useEffect, useReducer } from "react";
// font awesome icons
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { fontAwesomeIcon } from "@fortawesome/react-fontawesome";

// RegEx
// 複習 看一下怎麼用 跟意思
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3, 23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

// main
const Register = () => {
  // useRef
  const userRef = useRef();
  const errRef = uesRef();

  // useState - pwd
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // useState - MatchPwd
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  return <div></div>;
};

export default Register;
