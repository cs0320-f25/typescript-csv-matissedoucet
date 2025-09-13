# Sprint 1: TypeScript CSV

## Task B: Proposing Enhancement

### Step 1: Brainstorm on your own.

Functionality

- Handles empty fields and empty lines incorrectly
- Doesn't handle escaped double quotes
- Doesn't handle multi-line data
- Doesn't support data containing commas
- Doesn't catch uneven rows

Extensibility

- Make it easier to validate data (emails, phone numbers, numbers
- Option to handle tab separated values and other delimiters
- Option to trim headers or footers from the data
- Selecting certain columns and not others
- Option to not trim spaces
- Option to use custom string delimiter other than double quotes

### Step 2: Use an LLM to help expand your perspective.

Deepseek offered the following suggestions:

Functionality

- Support for quoted commas
- Support for line breaks
- Use of double double quotes for escaping double quotes
- Handling malformed CSV data
    - Catching uneven rows
    - Unclosed quotes at end of row
- Proper handling for different line break standards
    - `\r` vs `\r\n` vs `\n`
- Correctly handling byte order mark (`\uFEFF`)

Extensibility

- Alternate delimiters such as `|` or tab separated values
- Option to enable or disable whitespace trimming
- Option to handle empty lines in different ways
- Flexibility in input options
    - CSV loaded as a string instead of in a file
    - Support for processing streams for large files
    - Using an options object instead of fixed position arguments
- Flexibility in output representation
    - Array of array of strings
    - Array of objects
    - Inclusion of metadata about how the CSV was processed
    - Use of a mapping function for a specific typed object
- Option for a strict or non-strict mode to choose whether to throw an error on parsing issues or to keep going
- Use of descriptive error messages, including line number, specific problem, etc.

Trying again yielded similar suggestions about

- Allowing variety of input methods
- Customizing delimiters, quote
- Handling header rows
- Configurable outputs, with emphasis on use of a row transformation function
- Strict vs lax parsing modes
- Descriptive error reporting

Differed in

- Suggesting different ways to escape double quotes, use of custom double quotes
- Automatic type casting, intelligently trying to cast strings to numbers, booleans, or dates
- Handling empty files or empty strings
- Different encodings other than UTF-8
- Options for handling header duplicates

### Step 3: Propose enhancements in your project README file

> Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition.

#### Edge cases

As a developer using this CSV parser, I can see whether my CSV file is formatted correctly so that I don't end up with unexpected results.
- If the data is formatted properly, the parser should return the expected result
- If the CSV is malformed, the parser should return a useful error, letting the user where the error occurred and what failed in the parsing

As a user of this library, I can parse complex inputs and expect them to work so I can represent the data in the way I want.
- The parser should have proper support for complex data inputs, such as quotes, commas, and line breaks in fields.

#### Enhancements

As a developer using this library, I can process and validate my data beyond having an array of strings so I can start using the data I import in my code without having to manually cast types.
- The parser should make it easy to validate data in columns, such as emails, numbers, dates, etc.
- The parser should give the developer agency in what the output looks like (array of array of strings, array of objects, or something else entirely)

As a user of this CSV parser, I can easily pass in the specific options I need so I can configure the input and outputs the way I want with ease.
- The parser should have sensible defaults and allow the user to change the specific options they want

> Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.) 

I think most of these are solid suggestions. I'd say there is solid overlap in terms of functionality and edge cases we came up with, though filled in some important edge cases, such as different line break format. Since it has a lot of CSV parsers in its dataset, it came up with some solid suggestions of nice features to improve the developer experience. Most notably use of an options object allowing flexibility in how the dev should specify its options, and offering flexibility in input and output methods, such as using streams or csv data in a string for input. One suggestion which I'm not sure about implementing is the use of a lax vs strict mode, which allows parsing to continue even after detecting malformed data.

## Design Choices

In case of errors, I chose to return the existing `ZodError` type, rather than try to make my own error type, since this is the only kind of error that can really be raised during this sprint. However, in the future, it might make more sense to create a custom error type to catch malformed inputs such as too many columns in a row, or escaping double-quotes improperly.

## 1340 Supplement

## Reflection

### 1. Correctness

> What makes a CSV parser “correct”? We're not asking for additional input-output pairs here, but fairly precise, natural-language descriptions. Put another way, what kinds of general properties should your tests be checking about your CSV parser?

- Rows are separated by a line break, and columns within a row separated by commas
- All the rows have the same amount of columns
    - There should be a consistent amount of commas not within double quotes
- All double quotes should have matching, non-escaped double quotes
- Escaped double quotes (two consecutive double quotes) should be contained in another set of double quotes

### 2. Random, On-Demand Generation

> Suppose we gave you a function that randomly produced CSV data on demand. You could then call this class from your testing code. How might you use this source of random data to expand the power of your testing?

I could use this source of random data to ensure that my CSV parser works on a wide variety of correct CSV files. Additionally, I could manipulate this data to produce different and interesting kinds of malformed data to see if my parser can catch these errors.

### 3. Overall experience, Bugs encountered and resolved

> In what ways did this sprint differ from prior programming assignments you’ve done? Did anything surprise you? Did you encounter any bugs during your work on this sprint? If yes, what were they and how did you fix them? If not, how do you think that you managed to avoid them? 

More so than other programming assignments, this sprint involved trying to tease out what the user of this library would want in a parser, and what potential enhancements and edge cases they would come across. I did encounter some bugs, mainly around edge cases which the parser doesn't handle yet. I haven't fixed most of them yet since that comes in the next sprint, but I was able to fix errors concerning validation.

### Hand-in

#### Errors/Bugs:

- Doesn't support multi-line correctly (try parsing `./data/multi-line.csv`)
- Doesn't throw or catch on uneven columns (`./data/malformed.csv`)
- Doesn't handle escaped quotes properly (`./data/escaped-quotes.csv`)

#### Tests:

- Types are validated correctly on Zod types
- Multi line fields are handled correctly
- Commas inside double quotes aren't treated as different columns
- Two consecutive double quotes treated as an escaped double quote

#### How To…

Install npm packages

```bash
> npm install
```

Run sample parser use

```bash
> npm run run
```

Run tests

```bash
> npm test
```

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):

Deepseek AI helped generate some ideas for edge cases and enhancements, and helped get me familiar with Typescript syntax.

#### Total estimated time it took to complete project:

15 hours

#### Link to GitHub Repo:

https://github.com/cs0320-f25/typescript-csv-matissedoucet
