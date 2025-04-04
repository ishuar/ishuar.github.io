import React, {useContext} from "react";
import "./Footer.scss";
import {Fade} from "react-awesome-reveal";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";

export default function Footer() {
  const {isDark} = useContext(StyleContext);
  return (
    <Fade direction="up" triggerOnce distance="5px">
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {emoji(" Made with passion and  ❤️")}{" "}
        </p>
        <p
          className={
            isDark ? "dark-mode footer-text-custom" : "footer-text-custom"
          }
        >
          <i className="fa-regular fa-copyright"></i>
          {""}
          <a href="https://ishan.learndevops.in/"> Ishan Sharma </a> & Theme by{" "}
          {""}
          <a href="https://github.com/saadpasta/developerFolio">
            developerFolio
          </a>
        </p>
      </div>
    </Fade>
  );
}
