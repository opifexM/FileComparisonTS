[![Node CI](https://github.com/opifexM/FileComparisonTS/actions/workflows/nodejs.yml/badge.svg)](https://github.com/opifexM/FileComparisonTS/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/276d32d1437742970de0/maintainability)](https://codeclimate.com/github/opifexM/FileComparisonTS/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/276d32d1437742970de0/test_coverage)](https://codeclimate.com/github/opifexM/FileComparisonTS/test_coverage)

# File Comparison

File Comparison is a robust command-line utility engineered to detect differences between two configuration files. Developed using JavaScript and Node.js, the application supports both JSON and YAML file formats, making it versatile and applicable to a variety of use cases.

## Description

FileComparison analyzes two configuration files and generates a detailed report outlining the differences.
This utility leverages the power of the Commander npm package to facilitate the handling of command-line inputs.

The solution employs a set of purpose-built functions to deliver this functionality:
The output is customizable, allowing users to select from three distinct report formats: `stylish`, `plain`, and `json`.
The `stylish` format is the default, presenting data like a JSON object with nested fields represented through indentation.
The `plain` format delivers the results in straightforward sentences, while the `json` format presents the difference report as a JSON object.

## Usage

Use the following command format to execute the utility:

`gendiff [options] <filepath1> <filepath2>`

Options:

-   `-V, --version`: Output the version number
-   `-f, --format [type]`: Specify the output format (options: "stylish", "plain", "json"; default: "stylish")
-   `-h, --help`: Display command help

stylish:
```bash
tsx bin/gendiff.ts -f stylish file1.json file2.json
```

plain:
```bash
tsx bin/gendiff.ts -f plain file1.json file2.json
```

json:
```bash
tsx bin/gendiff.ts -f json file1.json file2.json
```

## Technologies Used

FileComparison is built with a stack of powerful technologies:

-   **JavaScript and Node.js**: The backbone of the application, providing the runtime environment.
-   **TypeScript**: Enhances code quality and reliability.
-   **Node.js**: Provides the runtime environment.
-   **Commander.js**: Manages CLI inputs.
-   **Lodash**: Facilitates data manipulation.
-   **js-yaml**: Allows for YAML parsing.

On the development side, the project utilizes:

-   **Vitest**: Offers a powerful testing framework.
-   **ESLint**: Ensures code consistency.
-   **Various ESLint plugins**: Enhance code analysis and quality

## License

FileComparison is licensed under the ISC license.