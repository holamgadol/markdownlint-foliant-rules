# validate-internal-links

## Valid links {#valid}

Valid classical link to adjacent [document](adjacent-document.md)

Valid MkDocs link to adjacent [document](../adjacent-document)

Valid classical link to anchor in an adjacent [document](adjacent-document.md#anchor)

Valid MkDocs link to adjacent [document](../adjacent-document#anchor)

Valid classical link to another [document](../topic-B/topic-B-document.md)

Valid MkDocs link to another [document](../../topic-B/topic-B-document)

Valid classical link to anchor in another [document](../topic-B/topic-B-document.md#anchor)

Valid MkDocs link to anchor in another [document](../../topic-B/topic-B-document#anchor)

Valid link to [heading](#valid-links)

Valid classical link to [anchor](#valid)

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

Empty [link]()

Invalid links to images

![red circle](_img/red-circle.png)

![black square](/images/black-square.png)

Sometimes invalid link to external repo [document](/another-project/test-src/topic-A/adjacent-document#anchor)
