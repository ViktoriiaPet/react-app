export async function getData() {

    const isEnter = localStorage.getItem("words");
    let endPoint = null;
    if (isEnter){
        endPoint = isEnter
    } else {
        endPoint = '?limit=20&offset=20'
    }
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
   // console.log("Abilities:", json.results.map((item: { name: string }) => item.name));
    return json;
  } catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Unknown error", error);
  }
}
}