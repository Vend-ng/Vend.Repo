export interface IConfig {
  JWT_ALGORITHM: string;
  JWT_AUDIENCE: string;
  JWT_ISSUER: string;
  JWT_JWKS_URI: string;
  JWT_USERINFO_URI: string;
  S3_ACCESS_KEY_ID: string;
  S3_BUCKET_NAME: string;
  S3_ENDPOINT: string;
  S3_REGION: string;
  S3_SECRET_KEY_ID: string;
  SECRET_APP_KEY: string;
  STRIPE_PRIVATE_TOKEN: string;
  STRIPE_PUBLIC_TOKEN: string;
  STRIPE_WEBHOOK_SECRET: string;
  NODE_ENV: string;
  ext: string;
  host: string;
  port: number;
}

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
export const config: IConfig = {
  JWT_ALGORITHM: "RS256",
  JWT_AUDIENCE: "snackhack.auth0.com",
  JWT_ISSUER: `https://${AUTH0_DOMAIN}/`,
  JWT_JWKS_URI: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  JWT_USERINFO_URI: `https://${AUTH0_DOMAIN}/userinfo`,
  NODE_ENV: process.env.NODE_ENV || "development",
  S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID || "changeme",
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || "2300-game-index",
  S3_ENDPOINT: process.env.S3_ENDPOINT || `https://storage.googleapis.com`,
  S3_REGION: process.env.S3_REGION || "auto",
  S3_SECRET_KEY_ID: process.env.S3_SECRET_KEY_ID || "changeme",
  SECRET_APP_KEY: process.env.SECRET_APP_KEY || "DEV_KEY",
  STRIPE_PRIVATE_TOKEN: process.env.STRIPE_PRIVATE_TOKEN || "DEV_KEY",
  STRIPE_PUBLIC_TOKEN: process.env.STRIPE_PUBLIC_TOKEN || "DEV_KEY",
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "DEV_KEY",
  ext: process.env.NODE_ENV !== "production" ? ".ts" : ".js",
  host: process.env.HOST || "0.0.0.0",
  port: parseInt(process.env.NODE_PORT || "3000", 10)
};
