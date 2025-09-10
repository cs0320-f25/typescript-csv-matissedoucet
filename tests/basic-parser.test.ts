import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

const STUDENTS_CSV_PATH = path.join(__dirname, "../data/students.csv");

test("parseCSV handles emails, spaces within names", async () => {
  const results = await parseCSV(STUDENTS_CSV_PATH);

  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["Name", "Credits", "Email"]);
  expect(results[1]).toEqual(["Tim Nelson", "10", "Tim_Nelson@brown.edu"]);
  expect(results[2]).toEqual(["Nim Telson", "11", "MYAWESOMEEMAIL"]);
});

const MOVIES_CSV_PATH = path.join(__dirname, "../data/movies.csv");

test("parseCSV handles double quotes", async () => {
  const results = await parseCSV(MOVIES_CSV_PATH);

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

  expect(results).toHaveLength(2);
  expect(results[0]).toEqual(["tim", "helloooo, how are you?"]);
  expect(results[1]).toEqual([
    "nim",
    "doing well, could be better, who's asking?",
  ]);
});
