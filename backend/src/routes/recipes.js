import express from "express";
import {createRecipe} from "../controllers/recipe/createRecipe.js";
import {getSingleRecipe} from "../controllers/recipe/getSingleRecipe.js";
import {getRecipes} from "../controllers/recipe/getAllRecipes.js";
import {deleteRecipe} from "../controllers/recipe/deleteRecipe.js";
import {updateRecipe} from "../controllers/recipe/updateRecipe.js";
import upload from "../middleware/upload.js";

// configure express route
const router = express.Router();

// define route 
router.post('/create-recipe', upload.single("image"), createRecipe); 
router.get('/recipe-details/:id', getSingleRecipe);
router.get('/all-recipes', getRecipes);
router.delete('/delete-recipe/:id', deleteRecipe);
router.patch('/update-recipe/:id', updateRecipe);  


export default router;