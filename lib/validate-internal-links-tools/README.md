# validate-internal-links-tools

A collection of functions for _validate-internal-links_ rule.

## Overview

_validate-internal-links_ is quite a complex rule, so some functions were put in separate files.

- [foliant-slugger.js](foliant-slugger.js) – slugs headings according to MKDocs rules

    _based and insipred by [github-slugger](https://github.com/Flet/github-slugger)_

- [link-resolver.js](link-resolver.js) – resolves local links according to Folant-project structure
- [find-etxrenal-anchors.js](find-etxrenal-anchors.js) – looking for anchors in external files
  
    _utilizes [find-anchors](find-anchors.js) rule_

