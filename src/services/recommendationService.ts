import getYouTubeID from "get-youtube-id";
import { IRecomendation, IRecommendationSearchParams } from "../repositories/IRecommendations";

import * as recommendationRepository from "../repositories/recommendationRepository";

export async function saveRecommendation(data:IRecomendation) {
  const {name, youtubeLink} = data;
  const youtubeId = getYouTubeID(youtubeLink);

  if (youtubeId === null) {
    return null;
  }

  const initialScore = 0;
  const recomendation:IRecomendation = {name, youtubeLink, score: initialScore};
  return await recommendationRepository.create(recomendation);
}

export async function upvoteRecommendation(id: number) {
  return await changeRecommendationScore(id, 1);
}

export async function downvoteRecommendation(id: number) {
  const recommendation = await recommendationRepository.findById(id);
  if (recommendation.score === -5) {
    return await recommendationRepository.destroy(id);
  } else {
    return await changeRecommendationScore(id, -1);
  }
}

export async function getRandomRecommendation() {
  const random = Math.random();

  let recommendations: IRecomendation[]|[];
  const orderBy = "RANDOM()";

  if (random > 0.7) {
    const searchParams:IRecommendationSearchParams = {minScore:-5, maxScore: 10,orderBy};
    recommendations = await recommendationRepository.findRecommendations(searchParams);
  } else {
    const searchParams:IRecommendationSearchParams = {minScore:11,orderBy};
    recommendations = await recommendationRepository.findRecommendations(searchParams);
  }

  return recommendations[0];
}

async function changeRecommendationScore(id: number, increment: number) {
  const result = await recommendationRepository.incrementScore(id, increment);
  return result.rowCount === 0 ? null : result;
}
