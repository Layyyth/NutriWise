import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import EmptyBackground from "./EmptyBackground";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Avatar, createTheme } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LOGO } from "../helpers/config";
import { useTheme } from "../features/themeContext";

function AppLayout() {
  const { user } = useSelector((store) => store.account);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { theme } = useTheme();

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        navigate(path);
        // setPathname(String(path));
      },
    };
  }, [pathname]);

  const demoTheme = createTheme({
    colorSchemes: { light: theme === "light", dark: theme === "dark" },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 700,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  let navTitle = pathname.slice(1).split("");
  navTitle[0] = navTitle[0]?.toUpperCase();
  navTitle = navTitle.join("");
  const NAVIGATION = [
    {
      kind: "header",
      title: navTitle,
    },
    {
      segment: "dashboard",
      title: "Dashboard",
      icon: (
        <Icon icon="material-symbols:dashboard" width="30px" height="30px" />
      ),
    },
    {
      segment: "meals",
      title: "Meals",
      icon: <Icon icon="cbi:mealie" width="30px" height="30px" />,
      children: [
        {
          segment: "breakfast",
          title: "Breakfast",
          icon: (
            <Icon icon="fluent-mdl2:breakfast" width="30px" height="30px" />
          ),
        },
        {
          segment: "lunch",
          title: "Lunch",
          icon: (
            <Icon
              icon="material-symbols:lunch-dining-outline"
              width="30px"
              height="30px"
            />
          ),
        },
        {
          segment: "drink",
          title: "Drink",
          icon: <Icon icon="tdesign:drink" width="30px" height="30px" />,
        },
        {
          segment: "dinner",
          title: "Dinner",
          icon: (
            <Icon icon="ic:outline-dinner-dining" width="30px" height="30px" />
          ),
        },
        {
          segment: "dessert",
          title: "Dessert",
          icon: <Icon icon="lucide:dessert" width="30px" height="30px" />,
        },
      ],
    },
    {
      segment: "changeTheme",
      title: "Switch Theme",
      icon: (
        <Icon
          icon={
            theme === "light"
              ? "si:light-mode-line"
              : "material-symbols:dark-mode-outline"
          }
          width="30px"
          height="30px"
        />
      ),
    },
    {
      segment: "settings",
      title: user.displayName,
      icon: (
        <Avatar style={{ width: "30px", height: "30px" }} src={user.photoURL} />
      ),
    },
  ];

  return (
    <div className={`themeContainer ${theme}`}>
      <AppProvider
        navigation={NAVIGATION}
        theme={demoTheme}
        router={router}
        branding={{
          logo: <img src={LOGO} width={34} alt="NutriWise logo" />,
          title: "NutriWise",
        }}
      >
        <DashboardLayout>
          <EmptyBackground>
            <Outlet />
          </EmptyBackground>
        </DashboardLayout>
      </AppProvider>
    </div>
  );
}

export default AppLayout;
