import { z } from "zod";

export const BriefMetadataSchema = z.object({
  generated_at: z.string(),
  provider: z.string(),
  cache: z.string(),
  version: z.string(),
  algorithm_version: z.string(),
});

export const MatchInfoSchema = z.object({
  competition: z.string(),
  matchday: z.string().nullable(),
  date: z.string().nullable(),
  time: z.string().nullable(),
  stadium: z.string().nullable(),
  city: z.string().nullable(),
  weather: z.record(z.unknown()).nullable(),
});

export const BriefSummarySchema = z.object({
  home_strength_score: z.number(),
  away_strength_score: z.number(),
  edge: z.string(),
  confidence: z.string(),
  analysis: z.string(),
});

export const TeamIdentitySchema = z.object({
  id: z.number(),
  name: z.string(),
  short_name: z.string(),
  logo_url: z.string(),
});

export const LeaguePerformanceSchema = z.object({
  played: z.number(),
  points: z.number(),
  goals_for: z.number(),
  goals_against: z.number(),
  goal_difference: z.number(),
  points_per_game: z.number(),
  position: z.number().nullable(),
});

export const RecentMatchSchema = z.object({
  opponent: z.string(),
  crest: z.string(),
  result: z.string(),
  score: z.string(),
});

export const RecentFormSchema = z.object({
  form_array: z.array(z.string()),
  recent_matches: z.array(RecentMatchSchema),
});

export const TeamBriefSchema = z.object({
  identity: TeamIdentitySchema,
  league: LeaguePerformanceSchema,
  form: RecentFormSchema,
  attack: z.record(z.unknown()).nullable(),
  defense: z.record(z.unknown()).nullable(),
  key_player: z.record(z.unknown()).nullable(),
});

export const MatchHistorySchema = z.object({
  date: z.string(),
  home_team: z.string(),
  home_crest: z.string(),
  away_team: z.string(),
  away_crest: z.string(),
  home_score: z.number(),
  away_score: z.number(),
});

export const HeadToHeadSummarySchema = z.object({
  home_wins: z.number(),
  draws: z.number(),
  away_wins: z.number(),
});

export const HeadToHeadBriefSchema = z.object({
  matches: z.array(MatchHistorySchema),
  summary: HeadToHeadSummarySchema,
});

export const ContextFactorSchema = z.object({
  type: z.string(),
  title: z.string(),
  home_text: z.string().nullable(),
  away_text: z.string().nullable(),
  text: z.string().nullable(),
});

export const BriefContextSchema = z.object({
  stadium: z.string().nullable(),
  weather: z.string().nullable(),
  home_advantage: z.string().nullable(),
  rest_days: z.string().nullable(),
  competition_stage: z.string().nullable(),
  kickoff_local: z.string().nullable(),
  factors: z.array(ContextFactorSchema),
});

export const OracleBriefResponseSchema = z.object({
  metadata: BriefMetadataSchema,
  header: MatchInfoSchema,
  summary: BriefSummarySchema,
  home_team: TeamBriefSchema,
  away_team: TeamBriefSchema,
  head_to_head: HeadToHeadBriefSchema,
  context: BriefContextSchema,
});

export type OracleBriefResponse = z.infer<typeof OracleBriefResponseSchema>;
