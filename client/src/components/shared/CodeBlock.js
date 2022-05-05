import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock = {
  code({ node, inline, className, children, ...props }) {
    return (
      <SyntaxHighlighter
        style={dracula}
        language="javascript"
        className={className}
        showLineNumbers
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    );
  },
};

export default CodeBlock;
