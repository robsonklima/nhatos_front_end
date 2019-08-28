export class Recommendation {
  recommendationId: number;
  requirementAId: number;
  projectAId: number;
  projectAName: string;
  requirementADescription: string;
  requirementBId: number;
  projectBId: number;
  projectBName: string;
  requirementBDescription: string;
  distance: number;
  createdAt: string;
  createdAtDays: number;
  accepted: number;
}