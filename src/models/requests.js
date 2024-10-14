import axios from "axios";

const url = "https://flaskmicro-aeeb2f2bef86.herokuapp.com/";

async function predictCalories(id) {
  try {
    const res = await axios.post(url + "predict", {
      user_id: id,
    });
    console.log(res);
    return res;

    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // const res = await fetch(url + "predict", {
    //   method: "POST",
    //   body: JSON.stringify({ user_id: id }),
    //   headers: myHeaders,
    // });
  } catch (err) {
    console.log(err);
  }
}

// predictCalories("S7Hehcqz6qhhy38ZemmEg2tKPki2").then((a) => console.log(a));

export { predictCalories };
