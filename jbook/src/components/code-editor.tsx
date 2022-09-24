import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { useState } from 'react';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {
    const [input, setInput] = useState('');
    const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue())
        })

        monacoEditor.getModel()?.updateOptions({tabSize: 2});
    }
    return (
        <MonacoEditor
            editorDidMount={onEditorDidMount}
            value={initialValue}
            language='javascript' 
            height="500px"
            theme="vs-dark"
            options={{
                wordWrap: 'on',
                minimap: { enabled: false },
                folding: false,
                showUnused: false,
                lineNumbersMinChars: 3,
                fontSize: 16,
                scrollBeyondLastLine: false,
                automaticLayout: true
            }}
            // ref={editorRef}
        />
    )
    
}

export default CodeEditor;