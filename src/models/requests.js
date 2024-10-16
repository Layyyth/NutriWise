import axios from "axios";

const url = "https://flaskmicro-aeeb2f2bef86.herokuapp.com/";

async function predictCalories(id) {
  try {
    // Send a GET request with user_id as a query parameter and custom headers
    const res = await axios.post(url + "predict", {
      params: {
        user_id: id,
      },
      headers: {
        "Content-Type": "application/json", // Ensures the request is JSON format
        Accept: "application/json", // Informs server to respond with JSON
        "Access-Control-Allow-Origin": "*", // Allows CORS, but this is typically set by the server
      },
    });

    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching calorie prediction:", err.message);
  }
}

// Example usage:
// predictCalories("S7Hehcqz6qhhy38ZemmEg2tKPki2").then((a) => console.log(a));

export { predictCalories };
