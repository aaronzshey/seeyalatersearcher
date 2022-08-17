
//.split(/(?<=1440-0|X)/)
/*
let itemsUsed = [];
itemsUsed.push();
console.log(itemsUsed)
*/


const fs = require("fs");
const craftingCodeListFile = fs.readFileSync("craftingCodeList.json")
const craftingCodeList = JSON.parse(craftingCodeListFile);
const itemListFile = fs.readFileSync("itemList.json");
const itemList = JSON.parse(itemListFile)

let query = "watercan"
let regex = new RegExp(".*" + query + ".*"  , "gi")
//`.*${query}.*`
let results = Object.entries(itemList).filter(([key, value]) => value.name.match(regex))

results.forEach(x => {
  console.log(x[1].name)
  console.log(parseIngredients(x[0]))
  console.log("----------\n")
})


function parseIngredients(recipe) {
  //in comes 128-32
  let ingredientsRaw = Object.entries(craftingCodeList).find(([key, value]) => value == recipe)
  let ingredientsList = ingredientsRaw[0].split(/(?<=-0|-16|-32|X)/gi);
  let final = ingredientsList.map((x, index) => {
    if (x !== "X") {
      return index + 1 + ": " + itemList[x].name
    } else {
      return index + 1 + ": nothing"
    }
  })
  return final;
}