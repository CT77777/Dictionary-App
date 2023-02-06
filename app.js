https = require("node:https");
http = require("node:http");
require("dotenv").config();

// API Key
const Elementary_API_Key = process.env.Elementary_API_Key;

// get data by API
function lookDefinition(vocabulary) {
  try {
    const request = https.get(
      `https://www.dictionaryapi.com/api/v3/references/sd2/json/${vocabulary}?key=${Elementary_API_Key}`,
      (response) => {
        // check protocol if valid
        console.log(response.statusCode);
        if (response.statusCode == 200) {
          let content = "";

          response.on("data", (data) => {
            content += data.toString();
          });

          response.on("end", () => {
            try {
              const Word = JSON.parse(content)[0].meta.id;
              const Definition = JSON.parse(content)[0].shortdef;
              console.log(Word + ":\n" + Definition);
            } catch (error) {
              console.log("The vocabulary doesn't exist.");
            }
          });
        } else {
          console.log(
            `The request get errors.(${
              http.STATUS_CODES[response.statusCode]
            },${response.statusCode})`
          );
        }
      }
    );

    //check address if exist
    request.on("error", (error) => {
      console.log(error.meesage);
    });
  } catch (error) {
    console.error(error.message);
  }
}

// look up by command line inputs
const vocabularies = process.argv.slice(2);
vocabularies.forEach(lookDefinition);
