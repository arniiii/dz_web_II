import fs from "fs";
import path from "path";
import build from "../server/server.js";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

let app;

const getFixturePath = (filename) => path.join("__fixtures__", filename);
const readFixture = (filename) =>
  fs.readFileSync(getFixturePath(filename), "utf-8").trim();

beforeAll(async () => {
  app = await build();
  await app.listen(8080);
});

afterAll(async () => {
  await app.close();
});

test("get private with api key", async () => {
  const command = fs.readFileSync("solution", "utf-8").toString().trim();
  const { stdout } = await execPromise(command);
  const actual = stdout.trim();
  const expected = readFixture("private.txt");
  expect(actual).toEqual(expected);
});
