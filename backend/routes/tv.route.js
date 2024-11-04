import express from 'express';
import {
  getTrendingTvShows,
  getTvShowTrailers,
  getTvShowDetails,
  getSimilarTvShows,
  getTvShowsByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTvShows);
router.get("/:id/trailers", getTvShowTrailers);
router.get("/:id/details", getTvShowDetails);
router.get("/:id/similar", getSimilarTvShows);
router.get("/:category", getTvShowsByCategory);

export default router;