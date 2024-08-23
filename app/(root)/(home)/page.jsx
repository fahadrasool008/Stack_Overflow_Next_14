import React from "react";
import { useTheme } from "../../../context/ThemeContext";

const Home = () => {
  const { mode } = useTheme();

  return <div> {mode} Home Page</div>;
};

export default Home;
