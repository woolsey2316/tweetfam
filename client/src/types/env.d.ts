interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_API_ORIGIN: string;
  readonly VITE_APP_ORIGIN: string;
  // add other environment variables here with their types
}
