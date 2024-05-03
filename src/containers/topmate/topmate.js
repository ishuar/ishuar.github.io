import React, {useContext, useEffect} from "react";
import {topmateWidget} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

function TopmateWidgetButton() {
  const {isDark} = useContext(StyleContext);

  useEffect(() => {
    if (topmateWidget.display && topmateWidget.userName) {
      const script = document.createElement("script");
      const userName = topmateWidget.userName;
      script.src =
        "https://topmate-embed.s3.ap-south-1.amazonaws.com/v1/topmate-embed.js";
      script.setAttribute(
        "user-profile",
        `https://topmate.io/embed/profile/${userName}?theme=93C5F9`
      );
      script.setAttribute(
        "btn-style",
        '{"backgroundColor":"#1DA1F2","color":"black","border":"1px solid #000"}'
      );

      script.setAttribute("embed-version", "v1");
      script.setAttribute("button-text", "Let's Connect");
      script.setAttribute("position-right", "90px");
      script.setAttribute("position-bottom", "30px");
      script.setAttribute("custom-padding", "0px");
      script.setAttribute("custom-font-size", "16px");
      script.setAttribute("custom-font-weight", "600");
      script.setAttribute("custom-width", "200px");
      script.setAttribute("async", "");
      script.setAttribute("defer", "");

      document.body.appendChild(script);
    }
  }, [topmateWidget.display, topmateWidget.userName]);

  if (!topmateWidget.display || !topmateWidget.userName) {
    console.error("Username or display for Topmate section is missing");
    return null;
  }

  return <div></div>;
}

export default TopmateWidgetButton;
