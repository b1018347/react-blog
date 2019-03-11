import LightTheme from "themes/light";
import DarkTheme from "themes/dark";

function getTheme() {
  const theme = localStorage.getItem("theme");
  return theme || "light";
}

function setTheme(theme) {
  localStorage.setItem("theme", theme);
}

export { LightTheme, DarkTheme, getTheme, setTheme };
