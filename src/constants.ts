import dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT!, 27) || 8080;
export const BEARER_TOKEN: string = process.env.TWITTER_BEARER_TOKEN!;
