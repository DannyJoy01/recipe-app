import Recipe from "../../models/recipe/recipe.js";
import httpStatus from "http-status";

// function to delete recipe
export const deleteRecipe = async (req, res) => {
    try {
        // get the id of the recipe from the request parameter
        const { id } = req.params;
        // find recipe by id
        let recipe;
        recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(httpStatus.NOT_FOUND).json({
                status: "Not Found",
                message: "No Recipe Found",
            });
        }
        recipe = await Recipe.findByIdAndDelete(id);
        res.status(httpStatus.OK).json({
            status: "Success",
            message: `Recipe with id: ${id} deleted`,
        });
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Error",
            message: "An error occured while deleting recipe",
        });
    }
};
