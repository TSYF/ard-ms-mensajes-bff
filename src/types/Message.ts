import { Matcher } from "@/utils";

export interface Message {
    id?: number,
    name: string,
    email: string,
    message: string,
}

export const messageMatcher: Matcher = {
    name: "string",
    email: "string",
    message: "string",
};