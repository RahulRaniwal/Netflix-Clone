import { fetchFromTMDB } from "../services/tmdb.service.js";
import User from "../models/user.model.js";
export async function searchPerson(req  , res){

  const {query} = req.params;
  try {
    const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;
    const response = await fetchFromTMDB(url);
    if (!response.results || response.results.length === 0) {
      return res.status(404).send(null);
    }

    const userId = req.user._id;
    const searchEntry = {id: response.results[0].id , image: response.results[0].profile_path , title: response.results[0].name, searchType: "person" ,  timestamp: new Date()};

    await User.findByIdAndUpdate(
      userId,
      { 
        $push: { searchHistory: searchEntry },
        $slice: {searchHistory: -10} // ensure last 10 entries are retained
      },
      {new: true , upsert: true}
    );

    res.status(200).json({success: true , content: response.results});
  } catch (error) {
    console.log(`Error in search person controller: ${error.message}`);
    res.status(500).json({success: false , message: 'Internal server error'});
  }
}

export async function searchMovie(req , res){
  const {query} = req.params;

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
      const response = await fetchFromTMDB(url);
      if (!response.results || response.results.length === 0) {
        return res.status(404).send(null);
      }

      const userId = req.user._id;
      const searchEntry = {
        id: response.results[0].id,
        image: response.results[0].poster_path,
        title: response.results[0].title,
        searchType: "movie",
        timestamp: new Date(),
      };

      await User.findByIdAndUpdate(
        userId,
        {
          $push: { searchHistory: searchEntry },
          $slice: { searchHistory: -10 }, // ensure last 10 entries are retained
        },
        { new: true, upsert: true }
      );

      res.status(200).json({ success: true, content: response.results });
    } catch (error) {
      console.log(`Error in search movie controller: ${error.message}`);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
}

export async function searchTvShow(req , res){
  const {query} = req.params;

    try {
      const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
      const response = await fetchFromTMDB(url);
      if (!response.results || response.results.length === 0) {
        return res.status(404).send(null);
      }

      const userId = req.user._id;
      const searchEntry = {
        id: response.results[0].id,
        image: response.results[0].poster_path,
        title: response.results[0].name,
        searchType: "tv",
        timestamp: new Date(),
      };

      await User.findByIdAndUpdate(
        userId,
        {
          $push: { searchHistory: searchEntry },
          $slice: { searchHistory: -10 }, // ensure last 10 entries are retained
        },
        { new: true, upsert: true }
      );

      res.status(200).json({ success: true, content: response.results });
    } catch (error) {
      console.log(`Error in search tv shows controller: ${error.message}`);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
}

export async function getSearchHistory(req , res){
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    res.status(500).json({success: false, message: "Internal server error" });
  }
}

export async function removeFromHistory(req , res){
  let {id} = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id , {
      $pull: {
        searchHistory: {id: id},
      }
    });
    res.status(200).json({ success: true, message: "Search entry removed successfully" });
  } catch (error) {
    console.log('Error in removeFromHistory controller: ' , error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}