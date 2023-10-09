const router = require("express").Router();
const moviesController = require("../controller/movies.controller");
const charactersController = require("../controller/characters.controller");

router
  .get("/movies", moviesController.getAll)
  .get("/movies/:id", moviesController.getById)
  .post("/movies", moviesController.create)
  .put("/movies/:id", moviesController.update)
  .patch("/movies/:id", moviesController.patch)
  .delete("/movies/:id", moviesController.remove)
  .get("/movies/:id/characters", charactersController.getAll)
  .get("/movies/:id/characters/:characterId", charactersController.getById)
  .post("/movies/:id/characters", charactersController.create)
  .put("/movies/:id/characters/:characterId", charactersController.update)
  .patch("/movies/:id/characters/:characterId", charactersController.patch)
  .delete("/movies/:id/characters/:characterId", charactersController.remove);

module.exports = router;
