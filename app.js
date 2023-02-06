https = require("node:https");
require("dotenv").config();

const Elementary_API_Key = process.env.Elementary_API_Key;

function lookDefinition(vocabulary) {
  const request = https.get(
    `https://www.dictionaryapi.com/api/v3/references/sd2/json/${vocabulary}?key=${Elementary_API_Key}`,
    (response) => {
      // console.dir(response.statusCode);
      let content = "";

      response.on("data", (data) => {
        content += data.toString();
      });

      response.on("end", () => {
        const Word = JSON.parse(content)[0].meta.id;
        const Definition = JSON.parse(content)[0].shortdef;
        console.log(Word + ":\n" + Definition);
      });
    }
  );
}

lookDefinition("apple");
