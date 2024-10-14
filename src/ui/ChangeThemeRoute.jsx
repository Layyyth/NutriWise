import { Navigate } from "react-router-dom";
import { useTheme } from "../features/themeContext";
import { useEffect } from "react";

function ChangeThemeRoute() {
  const { theme, setTheme } = useTheme();

  useEffect(function () {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }, []);

  return <Navigate to={"/"} />;
}

export default ChangeThemeRoute;
