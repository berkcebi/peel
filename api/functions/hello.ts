import { Handler } from "@netlify/functions";

const handler: Handler = async () => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Hello, Peel!" }),
    };
};

export { handler };
