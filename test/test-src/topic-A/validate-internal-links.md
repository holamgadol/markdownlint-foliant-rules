# validate-internal-links

## Valid links {#valid}

Valid classical link to adjacent [document](adjacent-document.md)

Valid MkDocs link to adjacent [document](../adjacent-document)

Valid classical link to anchor in an adjacent [document](adjacent-document.md#anchor)

**Text for anchor link** <anchor>anchor_link</anchor>

Valid MkDocs link to adjacent [document](../adjacent-document#anchor)

Valid classical link to another [document](../topic-B/topic-B-document.md)

Valid MkDocs link to another [document](../../topic-B/topic-B-document)

Valid classical link to anchor in another [document](../topic-B/topic-B-document.md#anchor)

Valid MkDocs link to anchor in another [document](../../topic-B/topic-B-document#anchor)

Valid link to [heading](#valid-links)

Valid classical link to [anchor](#valid)

Valid [anchor link](#anchor_link)

Valid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_link)

Valid MkDocs link to anchor in another [document](../../topic-B/topic-B-document#external_anchor_link)

Valid MkDoca link to [anchor](./#valid)

Internet link to [example](https://example.com/)

Valid links to images

![red circle](../_img/red-circle.png)

![black square](images/black-square.png)

![black square](./images/black-square.png)

## Invalid links {#invalid}

Invalid classical link to adjacent [document](adjacent-document)

Invalid classical link to adjacent [document](adjacent-documen.md)

Invalid MkDocs link to adjacent [document](../adjacent-document.md)

Invalid MkDocs link to adjacent [document](../../adjacent-document)

Invalid MkDocs link to adjacent [document](/adjacent-document)

Invalid classical link to anchor in an adjacent [document](adjacent-document#anchor)

Invalid classical link to anchor in an adjacent [document](adjacent-document.md#anchors)

Invalid MkDocs link to adjacent [document](../adjacent-document#ancho)

Invalid classical link to another [document](/topic-B/topic-B-document.md)

Invalid classical link to another [document](./topic-B/topic-B-document.md)

Invalid MkDocs link to another [document](../topic-B/topic-B-document)

Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)

Invalid MkDocs link to anchor in another [document](../topic-B/topic-B-document#anchor)

Invalid link to external repo [document](/external-project/document)

Sometimes invalid link to external repo [document](/markdownlint-foliant-rules/test-src/topic-A/adjacent-document#anchor)

Invalid link to [heading](#invalids)

Invalid link to [heading](invalid)

Invalid [anchor link](#anchor_lin)

Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_lin)

Invalid MkDocs link to anchor in another [document](../../topic-B/topic-B-document#external_anchor_lin)

Empty [link]()

Invalid links to images

![red circle](_img/red-circle.png)

![black square](/images/black-square.png)

Sometimes invalid link to external repo [document](/another-project/test-src/topic-A/adjacent-document#anchor)

## Links in different elements

### Code blocks

```markdown
Invalid classical link to adjacent [document](adjacent-document)
```

    Invalid classical link to adjacent [document](adjacent-documen.md)

Indentation using a tab character:

	Invalid MkDocs link to adjacent [document](../adjacent-document.md)

### Lists and quotes

- Invalid MkDocs link to adjacent [document](../../adjacent-document)
    - Invalid MkDocs link to adjacent [document](/adjacent-document)
    - Valid MkDocs link to adjacent [document](../adjacent-document)

- Valid classical link to anchor in an adjacent [document](adjacent-document.md#anchor)
	- Invalid classical link to anchor in an adjacent [document](adjacent-document#anchor)
	- Valid classical link to anchor in an adjacent [document](adjacent-document.md#anchor)

1. Invalid classical link to anchor in an adjacent [document](adjacent-document.md#anchors)
	1. Valid classical link to anchor in an adjacent [document](adjacent-document.md#anchor)
	2. Invalid MkDocs link to adjacent [document](../adjacent-document#ancho)

1. Valid classical link to another [document](../topic-B/topic-B-document.md)
    1. Invalid classical link to another [document](/topic-B/topic-B-document.md)
    2. Valid classical link to another [document](../topic-B/topic-B-document.md)

> Invalid classical link to another [document](./topic-B/topic-B-document.md)
> Valid classical link to another [document](../topic-B/topic-B-document.md)

### Table

| #   | Текст                                                                   |
| --- | ----------------------------------------------------------------------- |
| 1   | Invalid MkDocs link to another [document](../topic-B/topic-B-document)  |
| 2   | Valid MkDocs link to another [document](../../topic-B/topic-B-document) |

## Admonitions

!!! note "Text and code blocks"

    Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)
    Valid classical link to anchor in an adjacent [document](adjacent-document.md#anchor)

    ```markdown
    Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)
    ```

        Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)

??? note "Lists and quotes"

    - Invalid MkDocs link to anchor in another [document](../topic-B/topic-B-document#anchor)
        - Invalid link to external repo [document](/external-project/document)
        - Valid MkDocs link to anchor in another [document](../../topic-B/topic-B-document#anchor)

    1. Invalid link to [heading](#invalids)
        1. Invalid link to [heading](invalid)
        2. Valid link to [heading](#valid-links)

    > Invalid [anchor link](#anchor_lin)
    > Valid [anchor link](#anchor_link)

???+ note "Table and tabs"

    | #   | Текст                             |
    | --- | --------------------------------- |
    | 1   | Invalid [anchor link](#anchor_lin)|
    | 2   | Valid [anchor link](#anchor_link) |

    === "Tab 1"

        Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_lin)

    === "Tab 2"

        Valid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_link)

### Lists with admonitions

The list is indented by 2 spaces

- List item 1
- List item 2

  !!! note "text"

      Invalid classical link to adjacent [document](adjacent-document)
      text
      Valid classical link to adjacent [document](adjacent-document.md)

The list is indented by 4 spaces

- List item 1
- List item 2

    !!! note "test"

        Invalid classical link to adjacent [document](adjacent-document)
        text
        Valid classical link to adjacent [document](adjacent-document.md)

- List item 3

### Indentation using a tab character in admonitions

!!! note "Text and code blocks"

	Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)

	```markdown
	Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)
	```

		Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)

??? note "Lists and quotes"

	- Invalid MkDocs link to anchor in another [document](../topic-B/topic-B-document#anchor)
		- Invalid link to external repo [document](/external-project/document)
		- Valid MkDocs link to anchor in another [document](../../topic-B/topic-B-document#anchor)

	1. Invalid link to [heading](#invalids)
		1. Invalid link to [heading](invalid)
		2. Valid link to [heading](#valid-links)

	> Invalid [anchor link](#anchor_lin)
	> Valid [anchor link](#anchor_link)

???+ note "Table and tabs"

	| #   | Текст                             |
	| --- | --------------------------------- |
	| 1   | Invalid [anchor link](#anchor_lin)|
	| 2   | Valid [anchor link](#anchor_link) |

	=== "Tab 1"

		Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_lin)

	=== "Tab 2"

		Valid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_link)

- List item 1
- List item 2

	!!! note "test"

		Invalid classical link to adjacent [document](adjacent-document)
		text
		Valid classical link to adjacent [document](adjacent-document.md)

- List item 3

## Tabs

=== "Text and code blocks"

    Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)
    
    ```markdown
    Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)
    ```
    
        Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)

=== "Lists and quotes"

    - Invalid MkDocs link to anchor in another [document](../topic-B/topic-B-document#anchor)
        - Invalid link to external repo [document](/external-project/document)
        - Valid MkDocs link to anchor in another [document](../../topic-B/topic-B-document#anchor)

    1. Invalid link to [heading](#invalids)
        1. Invalid link to [heading](invalid)
        2. Valid link to [heading](#valid-links)

    > Invalid [anchor link](#anchor_lin)
    > Valid [anchor link](#anchor_link)

=== "Table and admonitions"

    | #   | Текст                             |
    | --- | --------------------------------- |
    | 1   | Invalid [anchor link](#anchor_lin)|
    | 2   | Valid [anchor link](#anchor_link) |

    !!! note "Note 1"

        Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_lin)

    ??? note "Note 2"

        Valid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_link)

### Indentation using a tab character in tabs

=== "Text and code blocks"

	Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)

	```markdown
	Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)
	```

		Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)

=== "Lists and quotes"

	- Invalid MkDocs link to anchor in another [document](../topic-B/topic-B-document#anchor)
		- Invalid link to external repo [document](/external-project/document)
		- Valid MkDocs link to anchor in another [document](../../topic-B/topic-B-document#anchor)

	1. Invalid link to [heading](#invalids)
		1. Invalid link to [heading](invalid)
		2. Valid link to [heading](#valid-links)

	> Invalid [anchor link](#anchor_lin)
	> Valid [anchor link](#anchor_link)

=== "Table and admonitions"

	| #   | Текст                             |
	| --- | --------------------------------- |
	| 1   | Invalid [anchor link](#anchor_lin)|
	| 2   | Valid [anchor link](#anchor_link) |

	!!! note "Note 1"

		Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_lin)

	??? note "Note 2"

		Valid classical link to anchor in another [document](../topic-B/topic-B-document.md#external_anchor_link)
