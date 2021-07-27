export interface IRecomendation {
    id?:number;
    name: string;
    youtubeLink: string;
    score?: number;
}
  
export interface IRecommendationSearchParams{ 
    minScore: number;
    maxScore?: number;
    orderBy: string;
}