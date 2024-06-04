import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    HOST: get("HOST").asString(),
    MESSAGE_ENDPOINT: get("MESSAGE_ENDPOINT").required().asUrlString(),
    DEFAULT_API_PREFIX: get("DEFAULT_API_PREFIX").required().asString(),
}