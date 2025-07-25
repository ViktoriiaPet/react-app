export async function getData() {
  const isEnter = localStorage.getItem('words');
  let endPoint = null;
  if (isEnter) {
    endPoint = `${isEnter}/`;
  } else {
    endPoint = `?offset=0&limit=20`;
  }
  const url = `https://pokeapi.co/api/v2/pokemon/${endPoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Unknown error', error);
    }
  }
}
