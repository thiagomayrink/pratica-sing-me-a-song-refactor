import express from "express";
import cors from "cors";

import * as recommendationController from "./controllers/recommendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationController.postRecommendation);
app.post(
  "/recommendations/:id/upvote",
  recommendationController.upvoteRecommendation
);
app.post(
  "/recommendations/:id/downvote",
  recommendationController.downvoteRecommendation
);

app.get(
  "/recommendations/random",
  recommendationController.getRandomRecommendations
);

export default app;
