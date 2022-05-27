//import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import { setTok, selectToken } from "../redux/reducer";
import "../css/styles-nav.css";

const Header = ({ posts }) => {
  const slice = useSelector(selectToken);
  const dispatch = useDispatch();
  const log = () => {
    if (!slice) {
      return <Link to="/">Login</Link>;
    }
    return (
      <Link to="/" onClick={tok}>
        Logout
      </Link>
    );
  };

  const tok = () => {
    dispatch(setTok(""));
    localStorage.removeItem("Session");
    return <Redirect to="/" />;
  };

  return (
    <div>
      <nav>
        <label htmlFor="check" className="checkbtn">
          <FontAwesomeIcon icon={faAlignJustify} />
        </label>
        <label className="logo">ChatBot</label>
        <ul>
          <li>
            <a href="/home">HomePage</a>
          </li>
          <li>{log()}</li>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
