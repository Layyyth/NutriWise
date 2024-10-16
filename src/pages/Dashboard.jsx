import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  tooltipClasses,
  Typography,
} from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import { Icon } from "@iconify/react/dist/iconify.js";
import Stat from "../ui/Stat";
import { predictCalories } from "../models/requests";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    padding: 1rem;
  }

  & .main {
    padding: 1.5rem;
    display: flex;

    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap-reverse;

    max-width: 70rem;
    & .gauge {
      width: 15rem;
      max-width: 20rem;
      & text {
        text-align: center;
      }
    }

    & h5:first-child {
      text-align: center;
    }
    & .nutrisFlex {
      /* width: 1fr; */
      max-width: 30rem;

      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
  }

  & .Allowedmeals {
    background-color: var(--color-grey-100);
    padding: 2rem 1rem;
    text-align: center;
  }

  & .mealsList {
    width: 100%;

    display: flex;
    gap: 1.8rem;
    flex-wrap: wrap;
    justify-content: center;
    & a {
      max-width: 30rem;
      max-height: 15rem;
      display: flex;
      & li {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const size =
  "?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const itemData = [
  {
    img: `https://images.unsplash.com/photo-1551963831-b3b1ca40c98e${size}`,
    title: "Breakfast",
    // author: "6:00 AM - 7:30 AM",
  },
  {
    img: `https://images.unsplash.com/photo-1551782450-a2132b4ba21d${size}`,
    title: "Lunch",
    // author: "6:00 AM - 7:30 AM",
  },
  {
    img: `https://images.unsplash.com/photo-1457518919282-b199744eefd6${size}`,
    title: "Drink",
    // author: "Any",
  },
  {
    img: `https://images.unsplash.com/photo-1577308856961-8e9ec50d0c67${size}`,
    title: "Dinner",
    // author: "6:00 AM - 7:30 AM",
  },
  {
    img: `https://plus.unsplash.com/premium_photo-1715015439618-0732b5925875${size}`,
    title: "Dessert",
    // author: "Any",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.account);
  const [neededCalories, setNeededCalories] = useState(1000);

  useEffect(
    function () {
      if (!user.infoGathered) navigate("/info");
    },
    [user.infoGathered]
  );

  useEffect(function () {
    async function init() {
      // console.log(user.uid);
      const { daily_calories: calories } = await predictCalories(user.uid);
      setNeededCalories(calories);
    }
    init();
  }, []);

  return (
    <StyledContainer>
      <Typography variant="h4">Dashboard</Typography>
      <div className="main">
        <div>
          <Typography variant="h5" paddingBottom={"1rem"}>
            Macronutrients
          </Typography>

          <div className="nutrisFlex">
            <Stat
              title="Protein"
              color="green"
              icon={<Icon icon="material-symbols:egg-outline" />}
              value={400}
            />
            <Stat
              title="Carbs"
              color="yellow"
              icon={<Icon icon="lucide:wheat" />}
              value={120}
            />
            <Stat
              title="Fat"
              color="red"
              icon={<Icon icon="fluent-emoji-high-contrast:peanuts" />}
              value={210}
            />
          </div>
        </div>

        <div className="gauge">
          <Gauge
            value={900}
            valueMax={neededCalories}
            startAngle={-91}
            endAngle={91}
            height={150}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 20,
                transform: "translate(0px, -30px)",
              },
            }}
            text={({ value, valueMax }) => `${value} / ${valueMax} \n Calorie`}
          />
        </div>
      </div>
      <div className="Allowedmeals">
        <Typography variant="h5" paddingBottom={"2rem"}>
          Allowed Meals
        </Typography>

        <ul className="mealsList">
          {itemData.map((item) => (
            <Link key={item.img} to={`/meals/${item.title.toLowerCase()}`}>
              <ImageListItem>
                <img
                  // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.title}
                  // subtitle={item.author}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`info about ${item.title}`}
                    >
                      <Icon icon="cbi:mealie" />
                    </IconButton>
                  }
                />
              </ImageListItem>
            </Link>
          ))}
        </ul>
      </div>
    </StyledContainer>
  );
}

export default Dashboard;
