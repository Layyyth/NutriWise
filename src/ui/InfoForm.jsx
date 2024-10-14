import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Alert,
  Stack,
  IconButton,
} from "@mui/material";
import { updateData } from "../models/firebase";
import { allergies, goals, diets, activites, genders } from "../helpers/config";
import { logout } from "../features/accountSlice";
import SwitchThemeButton from "./SwitchThemeButton";
import { Icon } from "@iconify/react/dist/iconify.js";

async function takeData(event, selectedAllergiesObjs) {
  const formData = new FormData(event.currentTarget);
  let formJson = Object.fromEntries(formData.entries());

  formJson.age = +formJson.age;
  if (formJson.age < 7) return {};

  formJson.weight = +formJson.weight;
  if (formJson.weight < 30) return {};

  formJson.height = +formJson.height;
  if (formJson.height < 70) return {};

  formJson.allergies = [];
  selectedAllergiesObjs.map((al) => formJson.allergies.push(al.value));

  formJson.goal = goals.find((goal) =>
    goal.label === document.getElementById("goal-tag").value ? goal : null
  )?.value;

  formJson.gender = genders.find((gender) =>
    gender.label === document.getElementById("gender-tag").value ? gender : null
  )?.value;

  formJson.diet = diets.find((diet) =>
    diet.label === document.getElementById("diet-tag").value ? diet : null
  )?.value;

  formJson.activity = activites.find((activity) =>
    activity.label === document.getElementById("activity-tag").value
      ? activity
      : null
  )?.value;

  if (!formJson.diet) formJson.diet = null;

  return formJson;
}

function InfoForm() {
  const { user } = useSelector((store) => store.account);
  const navigate = useNavigate();
  const disptach = useDispatch();
  const [dialogMsg, setDialogMsg] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  useEffect(
    function () {
      if (user?.infoGathered) navigate("/");
    },
    [user?.infoGathered]
  );

  return (
    <Dialog
      open={true}
      PaperProps={{
        style: {
          width: "100%",
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
        },
        component: "form",
        onSubmit: async (e) => {
          e.preventDefault();

          const data = await takeData(e, selectedAllergies);
          if (
            !data.weight ||
            !data.height ||
            !data.goal ||
            !data.activity ||
            !data.age
          ) {
            setDialogMsg("Please fill in the inputs correctly");
            console.log(data);
            return;
          }
          // console.log("done", data);
          // return;
          await updateData("accounts", user.uid, {
            infoGathered: true,
            NutriInfo: data,
          });
          // console.log(data);
          location.reload();
        },
      }}
    >
      <Stack
        display="flex"
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        justifyContent="center"
      >
        <DialogTitle>Gathering your info</DialogTitle>
        <SwitchThemeButton />
      </Stack>

      <DialogContent
        style={{
          display: "grid",
          gap: "1rem",
          maxWidth: "500px",
        }}
      >
        <DialogContentText>
          <strong>
            Please fill in your info to store it in{" "}
            <span style={{ color: "#0369a1" }}>your account</span>
          </strong>
        </DialogContentText>

        <TextField
          autoFocus
          required
          type="number"
          margin="dense"
          id="age"
          name="age"
          label="Age"
          variant="standard"
        />

        <TextField
          autoFocus
          required
          type="number"
          margin="dense"
          id="weight"
          name="weight"
          label="Weight"
          // type="email"
          // fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          type="number"
          margin="dense"
          id="height"
          name="height"
          label="Height"
          // type="email"
          // fullWidth
          variant="standard"
        />

        <Autocomplete
          id="gender-tag"
          options={genders}
          getOptionLabel={(option) => option.label}
          // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
          renderInput={(params) => (
            <TextField {...params} label="Gender" placeholder="Gender" />
          )}
        />

        <Autocomplete
          limitTags={2}
          multiple
          id="allergy-tag"
          options={allergies}
          onChange={(_, v) => setSelectedAllergies(v)} // Updates on select/deselect
          getOptionLabel={(option) => option.label}
          // defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Allergies (optinal)"
              placeholder="Allergies (optinal)"
            />
          )}
        />

        <Autocomplete
          id="goal-tag"
          options={goals}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Goal" placeholder="Goal" />
          )}
        />

        <Autocomplete
          id="diet-tag"
          options={diets}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Diet Prefrences (optinal)"
              placeholder="Diet Prefrences (optinal)"
            />
          )}
        />

        <Autocomplete
          id="activity-tag"
          options={activites}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField {...params} label="Activity" placeholder="Activity" />
          )}
        />

        {dialogMsg && <Alert severity="error">{dialogMsg}</Alert>}
      </DialogContent>
      <DialogActions
        style={{
          display: "flex",
          flexWrap: "wrap-reverse",
          paddingTop: "1rem",
          gap: ".5rem",
          alignItems: "center",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        <IconButton
          color="error"
          variant="contained"
          type="button"
          onClick={() => disptach(logout())}
        >
          <Icon icon="stash:signout-light" width="30px" height="30px" />
        </IconButton>
        <Button
          style={{ margin: 0 }}
          color="success"
          variant="contained"
          type="submit"
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoForm;
