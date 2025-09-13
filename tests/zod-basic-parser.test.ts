import { z, ZodError } from "zod";
import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  if (results instanceof ZodError) fail();
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);
  if (results instanceof ZodError) fail();
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

const STUDENTS_CSV_PATH = path.join(__dirname, "../data/students.csv");

test("parseCSV handles emails, spaces within names", async () => {
  const results = await parseCSV(STUDENTS_CSV_PATH);

  if (results instanceof ZodError) fail();
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["Name", "Credits", "Email"]);
  expect(results[1]).toEqual(["Tim Nelson", "10", "Tim_Nelson@brown.edu"]);
  expect(results[2]).toEqual(["Nim Telson", "11", "MYAWESOMEEMAIL"]);
});

const MOVIES_CSV_PATH = path.join(__dirname, "../data/movies.csv");

test("parseCSV handles double quotes", async () => {
  const results = await parseCSV(MOVIES_CSV_PATH);

  if (results instanceof ZodError) fail();
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["username", "movie", "rating"]);
  expect(results[1]).toEqual(["red_skunk", "Schindler's List", "8.5"]);
  expect(results[2]).toEqual(["Ossum-Possum", "It's a Wonderful life", "6"]);
});

const QUOTED_COMMAS_CSV_PATH = path.join(
  __dirname,
  "../data/quoted-commas.csv",
);

test("parseCSV handles commas in double quotes", async () => {
  const results = await parseCSV(QUOTED_COMMAS_CSV_PATH);

  if (results instanceof ZodError) fail();
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["tim", "helloooo, how are you?"]);
  expect(results[1]).toEqual([
    "nim",
    "doing well, could be better, who's asking?",
  ]);
});

const EMPTY_SURROUND_CSV_PATH = path.join(
  __dirname,
  "../data/empty-lines-surround.csv",
);

test("parseCSV empty lines surrounding data", async () => {
  const results = await parseCSV(EMPTY_SURROUND_CSV_PATH);

  if (results instanceof ZodError) fail();
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["Luigi", "Super Smash Bros"]);
  expect(results[1]).toEqual(["Mario", "Mario Kart 64"]);
});

const EMPTY_WITHIN_CSV_PATH = path.join(
  __dirname,
  "../data/empty-lines-within.csv",
);

test("parseCSV empty lines within data", async () => {
  const results = await parseCSV(EMPTY_WITHIN_CSV_PATH);

  if (results instanceof ZodError) fail();
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["name", "shirt-size"]);
  expect(results[1]).toEqual(["helly", "L"]);
  expect(results[2]).toEqual(["mark s.", "XL"]);
});

const MULTI_LINE_CSV_PATH = path.join(__dirname, "../data/multi-line.csv");

test("parseCSV handles multi line fields", async () => {
  const results = await parseCSV(MULTI_LINE_CSV_PATH);

  if (results instanceof ZodError) fail();
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["name", "address", "phone number"]);
  expect(results[1]).toEqual([
    "Josiah Carberry",
    "69 Brown St\nProvidence, RI 02912",
    "401-555-1968",
  ]);
  expect(results[2]).toEqual([
    "Natalie",
    "345 E. Main St\nKier, PE 07452",
    "800-234-3433",
  ]);
});

const EMPTY_FIELDS_CSV_PATH = path.join(__dirname, "../data/empty-fields.csv");

test("parseCSV handles empty fields", async () => {
  const results = await parseCSV(EMPTY_FIELDS_CSV_PATH);

  if (results instanceof ZodError) fail();
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["a world to win tee", "black, white", "30"]);
  expect(results[1]).toEqual(["watts rebellion sweatshirt", "", "20"]);
});

const ESCAPED_QUOTES_CSV_PATH = path.join(
  __dirname,
  "../data/escaped-quotes.csv",
);

test("parseCSV escaped quotes", async () => {
  const results = await parseCSV(ESCAPED_QUOTES_CSV_PATH);

  if (results instanceof ZodError) fail();
  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["tim berners lee", 'hello" world!"']);
  expect(results[1]).toEqual(["einstein", '"e=mc^2"']);
});

const MALFORMED_CSV_PATH = path.join(__dirname, "../data/malformed.csv");

test("parseCSV throws on malformed data", async () => {
  const results = await parseCSV(MALFORMED_CSV_PATH);

  expect(results).toThrow();
});
