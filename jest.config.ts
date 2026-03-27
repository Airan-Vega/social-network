import path from "node:path";
import fs from "node:fs";
import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";

// Read tsconfig.json
const tsconfigPath = path.resolve("./tsconfig.json");
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
const compilerOptions = tsconfig.compilerOptions;

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],

  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default config;
