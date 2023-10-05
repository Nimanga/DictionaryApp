const express = require("express");
const router = express.Router();
const dictionaryControllers = require("../controllers/dictionaryControllers");

router.get("/en2sn", dictionaryControllers.dictionaryEnglish);
router.get("/sn2en", dictionaryControllers.dictionarySinahala);
router.get("/version", dictionaryControllers.getVersion);
router.post("/versionAdd", dictionaryControllers.addVersion);
router.post("/enAdd", dictionaryControllers.addEnglish);
router.post("/snAdd", dictionaryControllers.addSinhala);
router.put("/versionUpdate/:id", dictionaryControllers.updateVersions);

module.exports = router;
