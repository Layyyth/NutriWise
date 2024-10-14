export const DEFAULT_PIC =
  "https://ia801703.us.archive.org/6/items/twitter-default-pfp/e.png";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const LOGO = "https://i.imgur.com/eiMbwdQ.png";

// export const maxLength = 300;
// export const minLength = 70;

// export const maxWeight = 400;
// export const minWeight = 30;

export const allergies = [
  { label: "Dairy Allergy", value: "dairy allergy" },
  { label: "Egg Allergy", value: "egg allergy" },
  { label: "Fish Allergy", value: "fish allergy" },
  { label: "Shellfish Allergy", value: "shellfish allergy" },
  { label: "Peanut Allergy", value: "peanut allergy" },
  { label: "Tree Nuts Allergy", value: "tree nuts allergy" },
  { label: "Wheat/Gluten Allergy", value: "wheat/gluten allergy" },
  { label: "Soy Allergy", value: "soy allergy" },
  { label: "Corn Allergy", value: "corn allergy" },
  { label: "Sesame Allergy", value: "sesame allergy" },
  { label: "Mustard Allergy", value: "mustard allergy" },
  { label: "Lupin Allergy", value: "lupin allergy" },
  { label: "Celery Allergy", value: "celery allergy" },
  { label: "Sulfite Allergy", value: "sulfite allergy" },
  { label: "Legume Allergy", value: "legume allergy" },
  { label: "Seed Allergy", value: "seed allergy" },
  { label: "Mushroom Allergy", value: "mushroom allergy" },
  { label: "Fruit Allergy", value: "fruit allergy" },
  { label: "Banana Allergy", value: "banana allergy" },
  { label: "Strawberry Allergy", value: "strawberry allergy" },
  { label: "Citrus Allergy", value: "citrus  allergy" },
  { label: "Stone Fruit Allergy", value: "stone fruit allergy" },
  { label: "Grape Allergy", value: "grape allergy" },
  { label: "Nightshade Allergy", value: "nightshade allergy" },
  { label: "Cruciferous Allergy", value: "cruciferous allergy" },
  { label: "Allium Family", value: "allium family" },
  { label: "Cucurbit Allergy", value: "cucurbit allergy" },
  { label: "Latex-Fruit Syndrome", value: "latex-fruit syndrome" },
  { label: "Bee Pollen", value: "bee pollen" },
  { label: "Bromelain Allergy", value: "bromelain allergy" },
  { label: "Tannin Sensitivity", value: "tannin sensitivity" },
  { label: "Caffeine Allergy", value: "caffeine allergy" },
  { label: "Alcohol Intolerence  ", value: "alcohol intolerence" },
  { label: "Glutamine Sensitivity", value: "glutamate sensitivity" },
  { label: "Tyramine Sensitivity", value: "tyramine sensitivity" },
  { label: "Fodmap Sensitivity", value: "fodmap sensitivity" },
  { label: "Alpha-Gal Syndrome", value: "alpha-gal syndrome" },
  { label: "Histamine Intolerance", value: "histamine intolerance" },
  { label: "Salicylate Sensitivity", value: "salicylate sensitivity" },
  { label: "Cocoa Allergy", value: "cocoa allergy" },
  { label: "Mint Allergy", value: "mint allergy" },
  { label: "Poultry Allergy", value: "poultry allergy" },
  { label: "Berry Allergy", value: "berry allergy" },
  //{ label: "Aspartame Allergy", value: "Aspartame Allergy" },
  { label: "Spice Allergy", value: "spice allergy" },
  {
    label: "Artificial Food Coloring Allergy",
    value: "artificial food coloring allergy",
  },
  { label: "Yeast Allergy", value: "yeast allergy" },
  { label: "Gelatin Allergy", value: "gelatin allergy" },
];

export const goals = [
  { label: "Lose Weight", value: "lose" },
  { label: "Maintain Weight", value: "maintain" },
  { label: "Gain Weight", value: "gain" },
];

export const diets = [
  { label: "None", value: null },
  { label: "Vegan", value: "vegan" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Keto", value: "keto" },
  { label: "Gluten Free", value: "gluten-free" },
  { label: "Dairy Free", value: "dairy-free" },
  { label: "Paleo", value: "paleo" },
  // { label: "Pescatarian", value: "Pescatarian" },
  // { label: "Low Carb", value: "Low-Carb" },
  // { label: "Intermittent Fasting", value: "Intermittent-Fasting" },
  // { label: "Sugar Free", value: "Sugar-Free" },
  // { label: "High Protein", value: "High-Protein" },
];

export const activites = [
  { label: "Sedentary", value: "sedentary" },
  { label: "Lightly Active", value: "lightly_active" },
  { label: "Moderately Active", value: "moderately_active" },
  { label: "Very Active", value: "very_active" },
  { label: "Super Active", value: "super_active" },
];

export const genders = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];
