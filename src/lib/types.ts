/**
 * Core domain model for a user prediction.
 * Replace the fields/types here if the schema changes.
 */
export interface Prediction {
  email: string;
  teamA: number;
  teamB: number;
  createdAt: string; // ISO-8601 string
}
