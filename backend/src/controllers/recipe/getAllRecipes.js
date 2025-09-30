import Recipe from "../../models/recipe/recipe.js";
import httpStatus, { status } from "http-status";


// controller function to get all recipes;
const getRecipes = async (req, res) =>{
    try{
        const recipes = await Recipe.find({})
        if(recipes){
            return res.status(httpStatus.OK).json({
                status: "Success",
                recipeDetails: recipes
            })
        }
            return res.status(httpStatus.NOT_FOUND).json({
                status: "Not Found",
                message: "No recipe found!"
            })
    }catch (error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Error",
            message: error.message,
        });
    }
}

export {getRecipes};