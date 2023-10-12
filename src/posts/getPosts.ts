export async function getPosts() {  const response = await fetch(    process.env.REACT_APP_API_URL!  );  const body = await response.json()  return body;}
