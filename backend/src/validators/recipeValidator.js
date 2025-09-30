import Joi from "joi"


const createRecipeSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    ingredients: Joi.string().min(5).required(),
    instructions: Joi.string().min(10).required(),
    videoUrl: Joi.string().required(),
});

const updateRecipeSchema = Joi.object({
    title: Joi.string().min(3).max(100),
    ingredients: Joi.string().required(),
    instructions: Joi.string().min(10),
    videoUrl: Joi.string().required(),
});

export {createRecipeSchema, updateRecipeSchema};