import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTvShows(req, res) {
  try {
    const url = `https://api.themoviedb.org/3/trending/tv/day`;
    const data = await fetchFromTMDB(url);

    if (data.results && data.results.length > 0) {
      const randomMovieIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomMovieIndex];
      return res.status(200).json({ success: true, content: randomMovie });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No trending movies found" });
    }
  } catch (error) {
    console.error(`Error fetching trending movies: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getTvShowTrailers(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}/videos`;
    const data = await fetchFromTMDB(url);
    res.json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.error(`Error fetching movie trailers: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getTvShowDetails(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}`;
    const data = await fetchFromTMDB(url);
    res.json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.error(`Error fetching movie details: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getSimilarTvShows(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}/similar`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.error(`Error fetching movies: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

export async function getTvShowsByCategory(req, res) {
  try {
    const { category } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${category}`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.error(`Error fetching movies: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
