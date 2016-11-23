var express 	= require('express');
var user        = require('./user')
var moment      = require('./moment');
var ingredient  = require('./ingredient');
var recipe      = require('./recipe');
var comment     = require('./comment');
var upload      = require('./upload');

var routes = express.Router();

routes.post("/register", user.register);
routes.post("/authenticate", user.authenticate);

// =================================================================
// authenticated routes ============================================
// =================================================================
routes.use(user.tokenMiddleware);
routes.get("/", function(req, res) { res.json({message: 'Hi ' + req.user.login}); }); // Say hi to the authenticate user

routes.get("/users",            user.getUsers);             // Get all the users
routes.get("/user",             user.getUser);              // Get the current authentified user data
routes.get("/user/:id",         user.getUserById);          // Get user by them id
routes.post("/user",            user.postAvatar);           // Upload a avatar then next() to the update user route to update the avatar url
routes.post("/user",            user.updateUser);           // Update user informations
routes.get("/user/:id/moments", moment.getMomentByOwner);   // Get all moments of a user with his id
routes.get("/user/:id/recipes", recipe.getRecipeByOwner);   // Get all recipes of a user with his id
routes.get("/user/:id/ingredients", ingredient.getIngredientsByOwner);   // Get all ingredients of a user with his id
//routes.post("/moment/:id/comment", ingredient.postComment);   // Get all ingredients of a user with his id

routes.get("/moments",          moment.getMoments);         // Get all moments
routes.get("/moment/:id",       moment.getMomentById);      // Get a moment by id
routes.post("/moment",          moment.postMoment);         // Post a new moment

routes.get("/ingredients",      ingredient.getIngredients); // Get all ingredients
routes.get("/ingredient/:id",   ingredient.getIngredientById);// Get ingredient by them id
routes.post("/ingredient",      ingredient.postIngredient); // Post a new ingredient

routes.get("/recipes",      recipe.getRecipes);             // Get all recipes
routes.get("/recipe/:id",   recipe.getRecipeById);          // Get recipe by them id
routes.post("/recipe",      recipe.postRecipe);             // Post a new recipe

routes.post("/recipe/:id/comment",     comment.commentRecipe);             // Post a new comment
routes.post("/moment/:id/comment",     comment.commentMoment);             // Post a new comment
routes.get("/recipe/:id/comments",     comment.getCommentByRecipe);             // get comments of a recipe
routes.get("/moment/:id/comments",     comment.getCommentByMoment);             // get comments of a moment


routes.post("/upload", upload.upload);   // Upload all kind of image and save it. It will copy a thumbnail of it too.

module.exports = routes;