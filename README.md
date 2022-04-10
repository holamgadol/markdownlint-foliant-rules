# Markdownlint Foliant rules

Custom [`markdownlint`](https://github.com/DavidAnson/markdownlint) rules for [Foliant](https://foliant-docs.github.io/docs/)-projects.


## Rules

- [_indented-fence_](./lib/indented-fence.js) – indented code block should be indented by 4 spaces at least
- [_non-literal-fence-label_](./lib/non-literal-fence-label.js) – language label of fenced code block shouldn't contain non-literal symbols
- [_fenced-code-in-quote_](./lib/fenced-code-in-quote.js) – quotes shouldn't contain fenced code blocks
- [_validate-internal-links_](./lib/validate-internal-links.js) – validates local links according to a common foliant-project structure

## Install

Locate your Foliant-project directory

```bash
cd my-awesome-foliant-project
```

Install _markdownlint-rules-foliant_ from npm

```bash
npm i markdownlint-rules-foliant
```

## Usage

Create config file `.markdownlint-cli2.jsonc` for _markdownlint-cli2_ in the project root

```yaml
{
  "customRules": [
    "./node_modules/markdownlint-rules-foliant/lib/indented-fence",
    "./node_modules/markdownlint-rules-foliant/lib/non-literal-fence-label",
    "./node_modules/markdownlint-rules-foliant/lib/fenced-code-in-quote",
    "./node_modules/markdownlint-rules-foliant/lib/typograph",
    "./node_modules/markdownlint-rules-foliant/lib/validate-internal-links"
  ],
  "config": {
    "default": false,
    "indented-fence": true,
    "non-literal-fence-label": true,
    "fenced-code-in-quote": true,
    "blank-around-indented-code-blocks": true,
    "typograph": true,
    "validate-internal-links": true
  }
}
```

Run _markdownlint-cli2_ for all markdown files in `src` directory and check results

```bash
$ ./node_modules/.bin/markdownlint-cli2 "src/**/*.md"

markdownlint-cli2 v0.4.0 (markdownlint v0.25.1)
Finding: test/test-src/**/*.md
Linting: 9 file(s)
Summary: 5 error(s)
src/fenced-code-in-quote.md:3 fenced-code-in-quote Fenced code shouldn't be in quote
src/indented-fence.md:8 indented-fence Fenced code shouldn't be indented by 1 to 3 spaces [Context: " ```python"]
src/non-literal-fence-label.md:3 non-literal-fence-label Invalid language label in fenced code block
src/topic-A/validate-internal-links.md:39 validate-internal-links Broken link [file does not exist] [Context: "adjacent-document"]
src/typograph.md:9:5 typograph typograph error [dash instead of hyphen]
```

### Visual Studio Code integration

Install the [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) extension for better interactive linting.

