import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { predictMeal, unsplashImages } from "../models/requests";
import { useDispatch, useSelector } from "react-redux";
import { updateMeals } from "../features/nutriSlice";

function Meals() {
  const dispatch = useDispatch();
  const { type } = useParams();
  const { user } = useSelector((store) => store.account);
  const { downloadedMeals } = useSelector((store) => store.nutri);

  useEffect(
    function () {
      async function init() {
        if (!downloadedMeals[type]) return;
        if (downloadedMeals[type].length) return;

        const res = await predictMeal(user.uid, type);
        dispatch(updateMeals({ key: type, val: res.safe_meals }));

        //  TO GET PICTURES FROM UNSPLASH:
        // const res = await predictMeal(user.uid, type);
        // let newMealsObjs = [];

        // res?.safe_meals?.map((meal, i) => {
        //   // if (i < 50) {
        //   return newMealsObjs.push({
        //     name: meal, //.replaceAll("-", " "),
        //   });
        //   // }
        // });

        // await Promise.all(
        //   newMealsObjs.map(async (meal, i) => {
        //     let url = await unsplashImages(meal.name);
        //     url = url?.[0]?.urls.regular;
        //     newMealsObjs[i] = { ...newMealsObjs[i], url };
        //   })
        // );
        // dispatch(updateMeals({ key: type, val: newMealsObjs }));
      }
      init();
    },
    [dispatch, updateMeals, type]
  );

  if (!downloadedMeals[type]) return <Navigate to="/" />;
  console.log(downloadedMeals[type]);
  return (
    <div>
      {type}
      <br />

      {!downloadedMeals[type].length ? (
        <p>loading...</p>
      ) : (
        downloadedMeals[type].map((meal) => (
          <div key={meal}>
            <p>{meal}</p>
            {/* <img src={meal.url} alt={meal.name} height={"200px"} /> */}
          </div>
        ))
      )}
    </div>
  );
}

export default Meals;
