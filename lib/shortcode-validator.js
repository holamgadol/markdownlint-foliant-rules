module.exports = (params = {}) => {
  let pairedShortcodes = []
  if (params?.config?.pairedShortcodes) {
    pairedShortcodes = params.config.pairedShortcodes
  }
  // Merge defaults with user options
  const PAIRED_SHORTCODES = new Set([
    "section",
    "accordion",
    "highlight",
    ...pairedShortcodes // Allow custom shortcodes
  ]);

  return {
    names: ["hugo-paired-shortcodes"],
    description: "Validates paired Hugo shortcodes",
    tags: ["validation"],
    function: function(params, onError) {
      const stack = [];
      const { lines } = params;

      lines.forEach((line, lineIndex) => {
        const lineNumber = lineIndex + 1;

        // Helper: Check opening tags
        const checkOpenTags = (regex, type) => {
          let match;
          while ((match = regex.exec(line)) !== null) {
            const name = match[1];
            if (PAIRED_SHORTCODES.has(name)) {
              stack.push({ name, line: lineNumber, type });
            }
          }
        };

        // Helper: Check closing tags
        const checkCloseTags = (regex, expectedType) => {
          let match;
          while ((match = regex.exec(line)) !== null) {
            const name = match[1];
            const lastOpened = stack[stack.length - 1];

            if (lastOpened?.name === name && lastOpened.type === expectedType) {
              stack.pop();
            } else if (PAIRED_SHORTCODES.has(name)) {
              onError({
                lineNumber,
                detail: `Mismatched closing tag for '{{${expectedType} ${name}${expectedType}}}'`,
              });
            }
          }
        };

        checkOpenTags(/\{\{<\s*([^\s>\/]+)(?![^>]*\/>)[^>]*>\}\}/g, "<");
        checkOpenTags(/\{\{%\s*([^\s%\/]+)(?![^%]*%\})[^%]*%\}/g, "%");
        checkCloseTags(/\{\{<\s*\/([^\s>]+)[^>]*>\}\}/g, "<");
        checkCloseTags(/\{\{%\s*\/([^\s%]+)[^%]*%\}/g, "%");
      });

      stack.forEach(({ name, line, type }) => {
        onError({
          lineNumber: line,
          detail: `Missing closing tag for '{{${type} ${name}${type}}}'`,
        });
      });
    },
  };
};