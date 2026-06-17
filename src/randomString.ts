import { randomBytes } from "crypto";

export const randomString = () => randomBytes(32).toString("hex");
