/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PEEL_AWS_S3_BUCKET: string;
    readonly VITE_PEEL_AMPLITUDE_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
