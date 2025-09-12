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

## 1340 Supplement

## Reflection

### 1. Correctness

### 2. Random, On-Demand Generation

### 3. Overall experience, Bugs encountered and resolved

### Hand-in

#### Errors/Bugs:
#### Tests:
#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):
#### Total estimated time it took to complete project:
#### Link to GitHub Repo:  
