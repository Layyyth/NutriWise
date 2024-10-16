import axios from "axios";

const NUTRIWISE_API_URL = "https://flaskmicro-aeeb2f2bef86.herokuapp.com/";
const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";

const headers = {
  "Content-Type": "application/json", // Ensures the request is JSON format
  Accept: "application/json", // Informs server to respond with JSON
  "Access-Control-Allow-Origin": "*", // Allows CORS, but this is typically set by the server
};

async function predictCalories(id) {
  try {
    // Send a GET request with user_id as a query parameter and custom headers
    const res = await axios.get(NUTRIWISE_API_URL + "predict", {
      params: {
        user_id: id,
      },
      headers,
    });

    return res.data;
  } catch (err) {
    console.error("Error fetching calorie prediction:", err.message);
  }
}

async function predictMeal(id, type) {
  try {
    // Send a GET request with user_id as a query parameter and custom headers
    const res = await axios.get(NUTRIWISE_API_URL + "predict", {
      params: {
        user_id: id,
        meal_time: type,
      },
      headers,
    });

    return res.data;
  } catch (err) {
    console.error(err.message);
  }
}

async function unsplashImages(search) {
  try {
    // Send a GET request with user_id as a query parameter and custom headers
    const res = await axios.get(UNSPLASH_API_URL, {
      params: {
        client_id: "-YUe2PJrT_SVIc8v4FVRu3jwrvgg_XY9Z0RYlc43jDI",
        query: search,
        // orientation: "landscape",
        per_page: 1,
        page: 1,
      },
      headers,
    });

    return res.data.results;
  } catch (err) {
    console.error(err.message);
  }
}

// Example usage:
// predictCalories("S7Hehcqz6qhhy38ZemmEg2tKPki2").then((a) => console.log(a));

export { predictCalories, predictMeal, unsplashImages };
