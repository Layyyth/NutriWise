import { updateData } from "../models/firebase";

async function clearNutriInfo(id) {
  await updateData("accounts", id, {
    infoGathered: false,
    // NutriInfo: {},
  });
  location.reload();
}

function saveToLocal(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

function getFromLocal(key) {
  const item = JSON.parse(localStorage.getItem(key));
  return item;
}

export { clearNutriInfo, saveToLocal, getFromLocal };
