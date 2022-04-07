# validate-internal-links

## Valid links {#valid}

Valid classical link to adjacent [document](adjacent-document.md)

Valid MkDocs link to adjacent [document](../adjacent-document)

Valid classical link to anchor in adjacent [document](adjacent-document.md#anchor)

Valid MkDocs link to adjacent [document](../adjacent-document#anchor)

Valid classical link to another [document](../topic-B/topic-B-document.md)

Valid MkDocs link to another [document](../../topic-B/topic-B-document)

Valid classical link to anchor in another [document](../topic-B/topic-B-document.md#anchor)

Valid MkDocs link to anchor in another [document](../../topic-B/topic-B-document#anchor)

Valid link to [heading](#valid-links)

Valid classical link to [anchor](#valid)

Valid MkDoca link to [anchor](./#valid)

Internet link to [example](https://example.com/)

## Invalid links {#invalid}

Invalid classical link to adjacent [document](adjacent-document)

Invalid classical link to adjacent [document](adjacent-documen.md)

Invalid MkDocs link to adjacent [document](../adjacent-document.md)

Invalid MkDocs link to adjacent [document](../../adjacent-document)

Invalid MkDocs link to adjacent [document](/adjacent-document)

Invalid classical link to anchor in adjacent [document](adjacent-document#anchor)

Invalid classical link to anchor in adjacent [document](adjacent-document.md#anchors)

Invalid MkDocs link to adjacent [document](../adjacent-document#ancho)

Invalid classical link to another [document](/topic-B/topic-B-document.md)

Invalid classical link to another [document](./topic-B/topic-B-document.md)

Invalid MkDocs link to another [document](../topic-B/topic-B-document)

Invalid classical link to anchor in another [document](../topic-B/topic-B-document.md#ancho)

Invalid MkDocs link to anchor in another [document](../topic-B/topic-B-document#anchor)

Invlid link to extenral repo [document](/external-project/document)

Invalid link to [heading](#invalids)

Invalid link to [heading](invalid)
