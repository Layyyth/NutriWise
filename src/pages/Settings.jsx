import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/accountSlice";
import { clearNutriInfo } from "../helpers/functions";
import { Fragment, useEffect } from "react";
import {
  Avatar,
  Button,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 1rem;
  .settings {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

function Settings() {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.account);

  useEffect(
    function () {
      if (!user.infoGathered) navigate("/info");
    },
    [user.infoGathered]
  );

  return (
    <StyledContainer>
      <Typography variant="h5">Settings</Typography>
      <div className="settings">
        <br />
        <Stack
          display={"flex"}
          direction={"row"}
          gap={".8rem"}
          alignItems={"center"}
        >
          <Avatar src={user.photoURL} alt={user.displayName} />
          <Typography variant="h6">{user.displayName}</Typography>
        </Stack>
        <br />

        <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
          <Table aria-label="simple table">
            <TableBody>
              {Object.entries(user.NutriInfo).map(([name, value]) => {
                let betterName = [...name];
                betterName[0] = betterName[0].toUpperCase();

                let betterValue = value;
                if (typeof value === "string") {
                  betterValue = [...value];
                  betterValue[0] = betterValue[0].toUpperCase();
                  betterValue = betterValue.join("");
                  betterValue = betterValue.replaceAll("_", " ");
                  betterValue = betterValue.replaceAll("-", " ");
                }

                if (name === "allergies") return;

                return (
                  <TableRow
                    key={name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {betterName}
                    </TableCell>
                    <TableCell align="right">{betterValue || "-"}</TableCell>
                  </TableRow>
                );
              })}

              {/* ///// */}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Allergies
                </TableCell>
                <TableCell align="right">
                  {user.NutriInfo.allergies.map((allergy) => {
                    let betterName = [...allergy];
                    betterName[0] = betterName[0].toUpperCase();

                    return (
                      <Fragment key={allergy}>
                        {betterName}
                        <Divider
                          orientation="vertical"
                          variant="middle"
                          flexItem
                        />
                      </Fragment>
                    );
                  })}
                  {!user.NutriInfo.allergies.length && "-"}
                </TableCell>
              </TableRow>
              {/* ///// */}
            </TableBody>
          </Table>
        </TableContainer>

        <br />
        <Stack gap={"1rem"} display={"flex"} direction={"row"}>
          <Button
            onClick={() => disptach(logout())}
            variant="outlined"
            size="medium"
          >
            Sign out
          </Button>
          <Button
            onClick={() => clearNutriInfo(user.uid)}
            variant="outlined"
            color="error"
          >
            Edit your NutriInfo
          </Button>
        </Stack>
      </div>
    </StyledContainer>
  );
}

export default Settings;
