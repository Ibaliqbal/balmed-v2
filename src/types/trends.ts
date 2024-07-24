import { UUID } from "crypto";

export type Trend = {
  id: string | UUID;
  content: string;
  trend_at: Date | string;
  posts: string[];
};
