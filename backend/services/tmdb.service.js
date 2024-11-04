import axios from "axios";

export const fetchFromTMDB = async (url) =>{
  const options = {
    method: "GET",
    url: url,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    if(response.status !== 200){
      throw new Error (`Failed to fetch data from api ${response.statusText}`);
    }
    // return the response
    return response.data;
  } catch (error) {
    console.log(`Error fetching data from TMDB api: ${error.message}`);
  } 
};