import './syntax.css'
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import { useState, useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import codeShift from 'jscodeshift';
import MonacoJSXHighlighter, { JSXTypes } from "monaco-jsx-highlighter";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const [input, setInput] = useState("");
  const editorRef = useRef<any>();
  const noop = () => {}
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const highlighter = new MonacoJSXHighlighter(
      // @ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    );
    highlighter.highLightOnDidChangeModelContent(
      noop,
      noop,
      undefined,
      noop
    );
  };

  const onFormatClick = () => {
    console.log(editorRef.current);

    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language="javascript"
        height="500px"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          folding: false,
          showUnused: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        // ref={editorRef}
      />
    </div>
  );
};

export default CodeEditor;
