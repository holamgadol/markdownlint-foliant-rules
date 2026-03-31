# typograph

## Hyphen instead of dash

физика - наука

## Dash instead of hyphen

ковёр–самолёт

## Wrong–header and other basic elements

### Code blocks

```markdown
физика - наука
```

    ковёр–самолёт

Indentation using a tab character:

	физика - наука

### Lists and quotes

- ковёр–самолёт
    - физика - наука
    - текст

- ковёр–самолёт
	- физика - наука
	- текст

1. ковёр–самолёт
	1. физика - наука
	2. текст

1. ковёр–самолёт
    1. физика - наука
    2. текст

> ковёр–самолёт
> текст

text

> - first item
> - second item

### Table

| #   | Текст         |
| --- | ------------- |
| 1   | текст         |
| 2   | физика - наука|
| 3   | ковёр–самолёт |

## Admonitions

!!! note "Text and code blocks"

    физика - наука

    ```markdown
    физика - наука
    ```

        ковёр–самолёт

??? note "Lists and quotes"

    - ковёр–самолёт
        - физика - наука
        - текст

    1. ковёр–самолёт
        1. физика - наука
        2. текст

    > ковёр–самолёт
    > текст

    > - first item
    > - second item

???+ note "Table and tabs"

    | #   | Текст         |
    | --- | ------------- |
    | 1   | текст         |
    | 2   | физика - наука|
    | 3   | ковёр–самолёт |

    === "Tab 1"

        физика - наука

    === "Tab 2"

        ковёр–самолёт
        текст

### Lists with admonitions

The list is indented by 2 spaces

- List item 1
- List item 2

  !!! note "text"

      физика - наука
      ковёр–самолёт

The list is indented by 4 spaces

- List item 1
- List item 2

    !!! note "test"

        физика - наука
        ковёр–самолёт

- List item 3

### Indentation using a tab character in admonitions

!!! note "Text and code blocks"

	физика - наука

	```markdown
	физика - наука
	```

		ковёр–самолёт

??? note "Lists and quotes"

	- ковёр–самолёт
		- физика - наука
		- текст

	1. ковёр–самолёт
		1. физика - наука
		2. текст

	> ковёр–самолёт
	> текст

	> - first item
	> - second item

???+ note "Table and tabs"

	| #   | Текст         |
	| --- | ------------- |
	| 1   | текст         |
	| 2   | физика - наука|

	=== "Tab 1"

		физика - наука

	=== "Tab 2"

		ковёр–самолёт
		текст

- List item 1
- List item 2

	!!! note "test"

		физика - наука
		ковёр–самолёт

- List item 3

## Tabs

=== "Text and code blocks"

    физика - наука

    ```markdown
    физика - наука
    ```

        ковёр–самолёт

=== "Lists and quotes"

    - ковёр–самолёт
        - физика - наука
        - текст

    1. ковёр–самолёт
        1. физика - наука
        2. текст

    > ковёр–самолёт
    > текст

    > - first item
    > - second item

=== "Table and admonitions"

    | #   | Текст         |
    | --- | ------------- |
    | 1   | текст         |
    | 2   | физика - наука|
    | 3   | ковёр–самолёт |

    !!! note "Note 1"

        физика - наука

    ??? note "Note 2"

        ковёр–самолёт
        текст

### Indentation using a tab character in tabs

=== "Text and code blocks"

	физика - наука

	```markdown
	физика - наука
	```

		ковёр–самолёт

=== "Lists and quotes"

	- ковёр–самолёт
		- физика - наука
		- текст

	1. ковёр–самолёт
		1. физика - наука
		2. текст

	> ковёр–самолёт
	> текст

	> - first item
	> - second item

=== "Table and admonitions"

	| #   | Текст         |
	| --- | ------------- |
	| 1   | текст         |
	| 2   | физика - наука|

	!!! note "Note 1"

		физика - наука

	??? note "Note 2"

		ковёр–самолёт
		текст
