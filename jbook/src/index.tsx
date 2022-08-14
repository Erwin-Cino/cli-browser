import {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('')
    const onSubmit = () => {
        console.log("INPUT TYPE", input)
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