import axios from "axios";

const url = "https://flaskmicro-aeeb2f2bef86.herokuapp.com/";

async function predictCalories(id) {
  try {
    // Send a GET request with user_id as a query parameter
    const res = await axios.get(url + "predict", {
      params: {
        user_id: id,
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}

// Example usage:
// predictCalories("S7Hehcqz6qhhy38ZemmEg2tKPki2").then((a) => console.log(a));

export { predictCalories };
