import React, { useState } from "react";
import axios from "axios";
import "./addDictionary.css";

const AddDictionary = () => {
  const [enWord, setEnWord] = useState("");
  const [enDefinition, setEnDefinition] = useState("");
  const [snWord, setSnWord] = useState("");
  const [snDefinition, setSnDefinition] = useState("");

  const sendEnData = (e) => {
    e.preventDefault();

    const enDefinitionsArray = enDefinition.trim().split(",");

    const newEnData = {
      word: enWord.toLowerCase(),
      definitions: enDefinitionsArray,
    };

    axios
      .post("http://localhost:8050/dictionary/enAdd", newEnData)
      .then(() => {
        alert("EnWord Added");
      })
      .catch((error) => {
        alert(error);
      });

    setEnWord("");
    setEnDefinition("");
  };

  const sendSnData = (e) => {
    e.preventDefault();

    const snDefinitionsArray = snDefinition.trim().split(",");

    const newSnData = {
      word: snWord.toLowerCase(),
      definitions: snDefinitionsArray,
    };

    axios
      .post("http://localhost:8050/dictionary/snAdd", newSnData)
      .then(() => {
        alert("SnWord Added");
      })
      .catch((error) => {
        alert("Error Adding SnWords", error);
      });

    setSnWord("");
    setSnDefinition("");
  };

  return (
    <>
      <h2 className="header_name">Dictionary App</h2>
      <div className="main_container">
        <form onSubmit={sendEnData}>
          <div className="sub_head">
            <text style={{ color: "#000000" }}>EnWords Insert</text>
          </div>
          <div className="main_form">
            <div>
              <label>EnWord : </label>
              <input
                type="text"
                id="word"
                placeholder="Enter the Word"
                value={enWord}
                onChange={(e) => {
                  setEnWord(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="definition">EnDefinition : </label>
              <input
                type="text"
                id="definition"
                placeholder="Enter definitions"
                value={enDefinition}
                onChange={(e) => {
                  setEnDefinition(e.target.value);
                }}
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>

        <form onSubmit={sendSnData}>
          <div className="sub_head">
            <text style={{ color: "#000000" }}>SnWords Insert</text>
          </div>
          <div className="main_form">
            <div>
              <label>SnWord : </label>
              <input
                type="text"
                id="word"
                placeholder="Enter the Word"
                value={snWord}
                onChange={(e) => {
                  setSnWord(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="definition">SnDefinition : </label>
              <input
                type="text"
                id="definition"
                placeholder="Enter definitions"
                value={snDefinition}
                onChange={(e) => {
                  setSnDefinition(e.target.value);
                }}
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDictionary;
