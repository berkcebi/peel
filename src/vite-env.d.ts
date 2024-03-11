/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PEEL_AWS_S3_BUCKET: string;
    readonly VITE_PEEL_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
