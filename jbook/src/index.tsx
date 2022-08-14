import {useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: '/esbuild.wasm'
        })
        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()]
        })
        console.log("RESULT", result);

        setCode(result.outputFiles[0].text)
    }
    useEffect(() => {
        startService();
    }, []);
    const onSubmit = async () => {
        if (!ref.current) return;
        console.log("INPUT TYPE", ref.current);
        const result = await ref.current.transform(input, {
            loader: 'jsx',
            target: 'es2015'
        });
        console.log("RESULT", result)
        setCode(result.code)  
    }
    return (
        <div>
            <textarea
                onChange={event => setInput(event.target.value)}
            >

            </textarea>
            <div>
                <button onClick={onSubmit}>Submit</button>
            </div>
            <pre>
                {code}
            </pre>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector("#root"))