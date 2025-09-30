import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({

    title:{
        type:String,
        required:true,
        trim: true,
    },
    ingredients: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    videoUrl :{
        type: String,  
        required: true,
    },
    instructions:{
        type: String,
        required: true,
    },
},
{
    Timestamps: true,
}
);


const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;