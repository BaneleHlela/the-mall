import { Storage } from "@google-cloud/storage";
import path from "path";

const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket("banele_first_bucket");

export default bucket;