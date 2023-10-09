import React, { useEffect, useState } from "react";
import axios from "axios";
import "./addDictionary.css";

const AddDictionary = () => {
  const [currentVersion, setCurrentVersion] = useState("");
  const [addCurrentVersion, setAddCurrentVersion] = useState("");

  const getCurentVersion = async () => {
    try {
      const response = await axios.get(
        "https://dictionary-application-z3ox.onrender.com/dictionary/version"
      );
      setCurrentVersion(response.data[0].version);
      setAddCurrentVersion("");
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  };
  const updateVersion = (e) => {
    e.preventDefault();

    const updateVersions = {
      version: Number(addCurrentVersion),
    };

    axios
      .put(
        `https://dictionary-application-z3ox.onrender.com/dictionary/versionUpdate/6514041d34f2e415676cd8e6`,
        updateVersions
      )
      .then((response) => {
        console.log("Version Update successfully", response.data);
        getCurentVersion();
      })
      .catch((error) => {
        console.log("Error updating data", error);
      });
  };

  // console.log(curentVersion);
  console.log(currentVersion);

  useEffect(() => {
    getCurentVersion();
  }, []);

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
      .post(
        "https://dictionary-application-z3ox.onrender.com/dictionary/enAdd",
        newEnData
      )
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
      .post(
        "https://dictionary-application-z3ox.onrender.com/dictionary/snAdd",
        newSnData
      )
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
            <div className="btn">
              <button type="submit">Submit</button>
            </div>
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
            <div className="btn">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>

        <form onSubmit={updateVersion}>
          <div className="sub_head">
            <text style={{ color: "#000000" }}>Version Update</text>
          </div>
          <div className="main_form">
            <h4>Current Version: {currentVersion}</h4>
            <div>
              <label>Version Number : </label>
              <input
                type="text"
                id="version"
                placeholder="Enter the Version number"
                value={addCurrentVersion} // Use currentVersion to update version
                onChange={(e) => {
                  if (e.target.value > currentVersion) {
                    setAddCurrentVersion(e.target.value);
                  } else {
                    setAddCurrentVersion("");
                    alert("Please update new version");
                  }
                }}
              />
            </div>
            <div className="btn">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDictionary;
