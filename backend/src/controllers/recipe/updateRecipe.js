import Recipe from "../../models/recipe/recipe.js";
import httpStatus from "http-status";

export const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, instructions } = req.body;

  let recipe = await Recipe.findById(id);
  if (!recipe) {
    return res.status(httpStatus.NOT_FOUND).json({
      status: "NOT FOUND",
      message: "Recipe not found",
    });
  }

  const updateData = {
    title: title || recipe.title,
    ingredients: ingredients || recipe.ingredients,
    instructions: instructions || recipe.instructions,
  };

  await Recipe.findByIdAndUpdate(id, updateData, { new: true });

  res.status(httpStatus.OK).json({
    status: "SUCCESS",
    message: "Recipe updated successfully",
  });
};
