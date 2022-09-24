import MonacoEditor from '@monaco-editor/react';
import { SetStateAction, useState, useRef } from 'react';
import { EditorOptions } from 'typescript';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue, onChange}) => {
    const [input, setInput] = useState('');
    console.log('input editor', input)
    const editorRef = useRef();
    const onEditorDidMount = (getValue: () => string, monacoEditor:any) => {
        monacoEditor.onDidChangeModelContent(() => {
            onChange(getValue())
        })
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