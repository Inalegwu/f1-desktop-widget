import type { CodegenConfig } from "@graphql-codegen/cli";

export default {
  schema: "http://localhost:3000/graphql",
  documents: ["src/web/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: [],
    },
  },
} satisfies CodegenConfig;
