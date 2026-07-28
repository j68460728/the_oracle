import { API_URL } from '../config/env';
import { OracleBriefResponseSchema } from '../types/api/oracle-response';
import { mapOracleResponseToDomain } from '../adapters/oracle.mapper';
import { OracleBriefData } from '../types/domain/oracle';

export async function getOracleBrief(competitionCode: string, homeTeamId: number, awayTeamId: number): Promise<OracleBriefData> {
  const url = `${API_URL}/api/v1/brief/${competitionCode}/${homeTeamId}/${awayTeamId}`;
  
  const response = await fetch(url, {
    // Next.js caching behavior: revalidate every hour or keep fresh based on use case
    next: { revalidate: 3600 } 
  });

  if (!response.ok) {
    throw new Error(`Error fetching Oracle Brief: HTTP ${response.status} - ${response.statusText}`);
  }

  const json = await response.json();
  
  // Runtime validation using Zod
  const parsed = OracleBriefResponseSchema.parse(json);
  
  // Map API response to Frontend Domain type
  return mapOracleResponseToDomain(parsed);
}
