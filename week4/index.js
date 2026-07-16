import { program } from "commander";
import fs from "fs";

program
  .argument("<file>", "path to the file")
  .parse();

const file = program.args[0];

const content = fs.readFileSync(file, "utf8");

const wordCount = content
  .trim()
  .split(/\s+/)
  .filter(word => word.length > 0).length;

console.log(`Word count: ${wordCount}`);