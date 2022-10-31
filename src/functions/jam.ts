import {
    HeadObjectCommand,
    NotFound,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { Handler, HandlerResponse } from "@netlify/functions";
import crypto from "crypto";
import Jam, { JamSchema } from "../types/Jam";

const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
};
const CONTENT_TYPE_HEADERS = { "Content-Type": "application/json" };
const HASH_LENGTH = 7;
const AWS_ACCESS_KEY_ID = process.env.PEEL_AWS_ACCESS_KEY_ID || "";
const AWS_SECRET_ACCESS_KEY = process.env.PEEL_AWS_SECRET_ACCESS_KEY || "";
const S3_REGION = "us-east-1";
const S3_BUCKET = process.env.VITE_PEEL_AWS_S3_BUCKET || "";

const handler: Handler = async (event) => {
    switch (event.httpMethod) {
        case "POST": {
            let jam: Jam;
            try {
                const jamObject = JSON.parse(event.body || "");
                jam = JamSchema.parse(jamObject);
            } catch (error) {
                console.error("Parsing jam failed", error);

                return response(400, { message: "Parsing jam failed" });
            }

            const jamJSONString = JSON.stringify(jam);
            const jamHash = crypto
                .createHash("md5")
                .update(jamJSONString)
                .digest("hex")
                .substring(0, HASH_LENGTH);
            const key = `jams/${jamHash}`;

            const client = new S3Client({
                region: S3_REGION,
                credentials: {
                    accessKeyId: AWS_ACCESS_KEY_ID,
                    secretAccessKey: AWS_SECRET_ACCESS_KEY,
                },
            });

            const headObjectCommand = new HeadObjectCommand({
                Bucket: S3_BUCKET,
                Key: key,
            });

            try {
                await client.send(headObjectCommand);
            } catch (error) {
                if (!(error instanceof NotFound)) {
                    console.error("Looking for jam failed", error);

                    return response(500, { message: "Looking for jam failed" });
                }

                const putObjectCommand = new PutObjectCommand({
                    Body: jamJSONString,
                    Bucket: S3_BUCKET,
                    Key: key,
                });

                try {
                    await client.send(putObjectCommand);
                } catch (error) {
                    console.error("Saving jam failed", error);

                    return response(500, { message: "Saving jam failed" });
                }
            }

            return response(200, { hash: jamHash });
        }
        case "OPTIONS": {
            return response(200);
        }
        default: {
            return response(405, { message: "Method not allowed" });
        }
    }
};

function response(statusCode: number, jsonObject?: unknown): HandlerResponse {
    const response = {
        statusCode,
        headers: CORS_HEADERS,
    };

    if (!jsonObject) {
        return response;
    }

    return {
        ...response,
        headers: { ...response.headers, ...CONTENT_TYPE_HEADERS },
        body: JSON.stringify(jsonObject),
    };
}

export { handler };
