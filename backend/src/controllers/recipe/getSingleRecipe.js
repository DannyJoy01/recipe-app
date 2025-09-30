import Recipe from '../../models/recipe/recipe.js';
import httpStatus from 'http-status';


export async function getSingleRecipe (req, res) {
  try {
    // destructure the id from the request parameters
    const { id } = req.params;
    // check if the id is passed as a parameter in the endpoint
    if (!id) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "NOT_FOUND",
        message: "Please provide a valid id",
      });
    }
    let recipe;
    recipe = await Recipe.findById(id);
    // check if the recipe exists
    if (!recipe) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: "NOT_FOUND",
        message: "Recipe not found",
      });
    } else {
      return res.status(httpStatus.OK).json({
        status: "Success",
        message: "Recipe details retrieved successfully",
        recipeDetails: recipe,
      });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: "ERROR",
      message: error.message,
    });
  }
}