# Markdownlint Foliant rules

Custom [`markdownlint`](https://github.com/DavidAnson/markdownlint) rules for [Foliant](https://foliant-docs.github.io/docs/)-projects.


## Rules

- [_indented-fence_](./lib/indented-fence.js) – indented code block should be indeted by 4 spaces at least
- [_non-literal-fence-label_](./lib/non-literal-fence-label.js) – language label of fenced code block shouldn't contain non-literal symbols
- [_fenced-code-in-quote_](./lib/fenced-code-in-quote.js) – quotes shouldn't contain fenced code blocks
- [_validate-internal-links_](./lib/validate-internal-links.js) – validates local links according to a common foliant-project structure
