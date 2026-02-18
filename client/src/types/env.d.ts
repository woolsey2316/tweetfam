interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly API_ORIGIN: string;
  // add other environment variables here with their types
}
