import { parseCSV } from "./basic-parser";
import { z } from "zod";

/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/people.csv"; // update with your actual file name

const PersonRowSchema = z
  .tuple([z.string(), z.coerce.number()])
  .transform((tup) => ({ name: tup[0], age: tup[1] }));

type Person = z.infer<typeof PersonRowSchema>;

async function main() {
  // Because the parseCSV function needs to "await" data, we need to do the same here.
  const results = await parseCSV(DATA_FILE, PersonRowSchema);

  // Notice the difference between "of" and "in". One iterates over the entries,
  // another iterates over the indexes only.
  if (!(results instanceof z.ZodError)) {
    for (const record of results) console.log(record);
    for (const record in results) console.log(record);
  }
}

main();
