const mongoose = require("mongoose");
const En2Sn = require("../models/en2snModels.js");
const Sn2En = require("../models/sn2enModels.js");
const Version = require("../models/versionModels.js");

// add English tables data
const addEnglish = async (req, res) => {
  // return console.log("add english", req.body); this is for check get method

  const word = req.body.word;
  const definitions = req.body.definitions;

  const newEn2Sn = new En2Sn({ word, definitions });
  try {
    await newEn2Sn.save();
    res.status(201).json(newEn2Sn);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//add Sinahala tables data
const addSinhala = async (req, res) => {
  const word = req.body.word;
  const definitions = req.body.definitions;

  const newSn2En = new Sn2En({ word, definitions });

  try {
    await newSn2En.save();
    res.status(201).json(newSn2En);
  } catch (error) {
    res.stats(404).json({ message: error.message });
  }
};

// add version
const addVersion = async (req, res) => {
  const version = Number(req.body.version);

  const newVersion = new Version({ version });

  try {
    await newVersion.save();
    res.status(200).json(newVersion);
  } catch (error) {
    res.stats(404).json({ message: error.message });
  }
};

// get Version
const getVersion = async (req, res) => {
  try {
    const getVersion = await Version.find();
    res.status(200).json(getVersion);
  } catch (error) {
    console.log("Error getting data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get English table data
const dictionaryEnglish = async (req, res) => {
  try {
    const en2sn = await En2Sn.find();
    res.status(200).json(en2sn);
  } catch (error) {
    console.log("Error getting data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get Sinahala table data
const dictionarySinahala = async (req, res) => {
  try {
    const sn2en = await Sn2En.find();
    res.status(200).json(sn2en);
  } catch (error) {
    console.log("Error getting Sinhala data", error);
    res.status(500).json({ message: " Internal sever Error" });
  }
};

module.exports = {
  dictionaryEnglish,
  dictionarySinahala,
  addEnglish,
  addSinhala,
  addVersion,
  getVersion,
};
