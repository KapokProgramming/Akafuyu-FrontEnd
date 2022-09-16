import React from "react";

const defaultContext = {
  markdownText: "",
  setMarkdownText: (text:string):void => {}
};

export default React.createContext(defaultContext);