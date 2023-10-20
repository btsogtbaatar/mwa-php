const router = require("express").Router();
const { movieController, characterController } = require("./controller");

const movieBaseUrl = "/:id"
const characterBaseUrl = `${movieBaseUrl}/characters`;

router.route("").get(movieController.getAll)
    .post(movieController.create);

router.route(movieBaseUrl)
    .get(movieController.getOne)
    .put(movieController.fullUpdate)
    .patch(movieController.partialUpdate)
    .delete(movieController.remove);

router.route(characterBaseUrl)
    .get(characterController.getAll)
    .post(characterController.create);

router.route(`${characterBaseUrl}/:characterId`)
    .get(characterController.getOne)
    .put(characterController.fullUpdate)
    .patch(characterController.partialUpdate)
    .delete(characterController.remove)

module.exports = router;
