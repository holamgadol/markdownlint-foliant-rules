# Markdownlint Foliant rules

Custom [`markdownlint`](https://github.com/DavidAnson/markdownlint) rules
for [Foliant](https://foliant-docs.github.io/docs/)-projects.

## Rules

### [_indented-fence_](./lib/indented-fence.js)

Fenced code block should be indented by 4 spaces at least.

This rule is triggered when there are fenced code blocks indented by 1 to 3 spaces.

Example:

~~~md
   ```bash
   fenced code block [indented by 3 spaces]
   ```
~~~

Correct example:

~~~md
```bash
fenced code block [indented by 0 spaces]
```
~~~

Rationale: Violations of this rule can lead to improperly rendered content.

### [_non-literal-fence-label_](./lib/non-literal-fence-label.js)

The Language label of fenced code block shouldn't contain non-literal symbols.

This rule is triggered when there are fenced code blocks with a label containing non-literal symbols.

Example:

~~~md
```json{
    "name": "markdownlint-rules-foliant",
    "version": "0.0.1",
    "description": "Markdownlint rules for Foliant projects",
    "license": "MIT"
}
```
~~~

Correct example:

~~~md
```json
{
    "name": "markdownlint-rules-foliant",
    "version": "0.0.1",
    "description": "Markdownlint rules for Foliant projects",
    "license": "MIT"
}
```
~~~

Rationale: Violations of this rule can lead to improperly rendered content.

### [_fenced-code-in-quote_](./lib/fenced-code-in-quote.js)

Quotes shouldn't contain fenced code blocks.

This rule is triggered when there are fenced code blocks indented by 0 to 4 spaces from quote sign `>`.

Example:

~~~md
>  ```python
>  import print
>  print("backtick fenced code block with lang label")
>  ```
~~~

Correct example:

~~~md
>     ```python
>     import print
>     print("backtick fenced code block with lang label")
>     ```
~~~

Rationale: Violations of this rule can lead to improperly rendered content.

### [_typograph_](./lib/typograph.js)

Checks for typographical errors.

Fixable: Most violations can be fixed by tooling

This rule is triggered when one of the following cases is detected.

#### Hyphen instead of dash

Example

```md
physics - science
```

Corrected example:

```md
physics – science
```

#### Dash instead of hyphen

Example:

```md
semi–final
```

Corrected example:

```md
semi-final
```

Rationale: Violations of this rule can lead to an improperly typed text.


### [_validate-internal-links_](./lib/validate-internal-links.js)

Validates local links according to a common foliant-project structure.

Parameters: src, project

This rule is triggered when a local link without a proper reference is found.

#### Configuration

_validate-internal-links_ takes two optional arguments. You can specify the source directory and name of the project.
It can be useful in case of linting inside a docker-container.



```bash
{
  "customRules": [
    "validate-internal-links"
  ],
  "config": {
    "validate-internal-links": {
    "src": "./src",
    "project": "markdownlint-foliant-rules"
    }
  }
}
```

Rationale: Violations of this rule can lead to broken links.


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
    "markdownlint-rules-foliant/lib/indented-fence",
    "markdownlint-rules-foliant/lib/non-literal-fence-label",
    "markdownlint-rules-foliant/lib/fenced-code-in-quote",
    "markdownlint-rules-foliant/lib/typograph",
    "markdownlint-rules-foliant/lib/validate-internal-links"
  ],
  "config": {
    "default": false,
    "indented-fence": true,
    "non-literal-fence-label": true,
    "fenced-code-in-quote": true,
    "typograph": true,
    "validate-internal-links": true
  }
}
```

Run _markdownlint-cli2_ for all markdown files in `src` directory and check results

```bash
$ npx markdownlint-cli2 "src/**/*.md"

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

_npx_ is needed if _markdownlint-cli2_ is not installed globally. Otherwise, you may run _markdownlint-cli2_ without
additional tools.

### Fixing errors

Run _markdownlint-cli2-fix_ for all markdown files in `src` directory and check changed files

```bash
npx markdownlint-cli2-fix "src/**/*.md"
```

### Visual Studio Code integration

Install the [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) extension
for better interactive linting.
