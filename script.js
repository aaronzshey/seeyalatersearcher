function createElement(elType, contents, classes) {
  let el = document.createElement(elType)
  let text = document.createTextNode(contents)
  el.appendChild(text)
  el.className = classes
  //document.body.appendChild(el)
  return el;
}

async function getData(uri) {
  let response = await fetch(uri);
  let data = await response.json();
  return data
}

//global variables to increase speed
let craftingCodeList;
let itemList;

async function searchAndRenderItem() {
  console.log("asdfasfafdad")

  //if the data doesn't exist, load it and show the search bar
  if (!craftingCodeList || !itemList) {
    craftingCodeList = await getData("craftingCodeList.json")
    itemList = await getData("itemList.json")
    let searchbar = createElement("input")
    searchbar.setAttribute("onchange", "searchAndRenderItem()")
    searchbar.id = "searchbar"
    searchbar.setAttribute("placeholder", "Type an item name...")
    document.body.appendChild(searchbar)
    document.getElementById("loading").style.display = "none"
  }
  /*
  let container = createElement("div", "", "container");
  while (container.firstChild) { parent.removeChild(parent.firstChild); 
}
*/





function parseIngredients(recipe) {
  let final;
  let ingredientsRaw = Object.entries(craftingCodeList).find(([key, value]) => value == recipe)
  if (ingredientsRaw) {
  let ingredientsList = ingredientsRaw[0].split(/(?<=-0|-16|-32|X)/gi);
   final = ingredientsList.map((x, index) => {
    if (x !== "X") {
      return index + 1 + ": " + itemList[x].name
    } else {
      return index + 1 + ": nothing"
    }
  })
} else {
    final = "No recipe"
}
  return final;
}

  let query = document.getElementById("searchbar").value
  console.log(query)

  //if there's something to parse
  if (query) {
    //remove the old container, if it exists

    if (document.getElementsByClassName("container")[0]) {
      document.getElementsByClassName("container")[0].remove()
    }

    let container = createElement("div", "", "container")


    let regex = new RegExp(".*" + query + ".*", "gi")
    //`.*${query}.*`
    let results = Object.entries(itemList).filter(([key, value]) => value.name.match(regex))

    if (results) {
      results.forEach(x => {
        let name = createElement("p", x[1].name, "bolded")
        container.appendChild(name)
  
          let recipe = createElement("p", parseIngredients(x[0]), "")
          container.appendChild(recipe)
          
        

        if (x[1].effects) {
          let effects = createElement("p", "Effects: " + JSON.stringify(x[1].effects), "")
          container.appendChild(effects)
        }



        console.log(x[1].name)
        console.log(x)
        console.log(parseIngredients(x[0]))
        console.log("----------\n")
        
      })
    }
    document.body.appendChild(container)
  }


}

searchAndRenderItem()


/*
let par = document.createElement("p")
let text = document.createTextNode("asdfasdfsa")
let el = par.appendChild(text)
document.body.appendChild(el)
*/

