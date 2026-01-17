import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { Express } from "express";
import YAML from "yamljs";

const adjustReferences = (jsonData: string): { definitions: object } => {
  const jsonString = JSON.stringify(jsonData);
  const adjustedJsonString = jsonString.replace(
    /#\/definitions\//g,
    "#/components/schemas/",
  );
  return JSON.parse(adjustedJsonString);
};

const loadSchemas = () => {
  const filePath = path.resolve(__dirname, "schemas/json-schema.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return adjustReferences(jsonData);
};

const schemas = loadSchemas()?.definitions || {};
const swaggerYamlPath = path.resolve(__dirname, "swagger.yaml");
const swaggerYamlDocs = YAML.load(swaggerYamlPath);

// Merge Prisma schemas with the YAML documentation
const swaggerDocs = {
  ...swaggerYamlDocs,
  components: {
    ...swaggerYamlDocs.components,
    schemas: {
      ...swaggerYamlDocs.components?.schemas,
      // Add Prisma-generated schemas
      ...schemas,
    },
  },
};

// Swagger UI customization options
const swaggerUiOptions = {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info .title { color: #3b82f6 }
  `,
  customSiteTitle: "API Cloud - Documentação",
  customfavIcon: "/favicon.ico",
  explorer: true,
};

export const setupSwagger = (app: Express): void => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));
};
