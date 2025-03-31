let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let input = document.querySelector("input");
let btn = document.querySelector("#btn");
let list = document.querySelector("#list");

btn.addEventListener("click", async () => {
  list.innerHTML = "";
  let search = input.value;
  let res = await findMeaning(search);
  if (typeof res == "object") {
    for (const mean of res) {
      let li = document.createElement("li");
      li.innerText = mean;
      li.classList.add("listyle");
      list.appendChild(li);
    }
  } else {
    let li = document.createElement("li");
    li.innerText = "Word Not Found";
    list.appendChild(li);
  }
});

async function findMeaning(word) {
  try {
    let response = await fetch(url + word);
    let result = await response.json();
    let meanings = [];
    for (const meaning of result[0].meanings[0].definitions) {
      meanings.push(meaning.definition);
    }
    return meanings;
  } catch (error) {
    return "Word Not Found";
  }
}
