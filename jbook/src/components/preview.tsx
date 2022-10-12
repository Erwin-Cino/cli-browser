import { useEffect, useRef } from "react";
import './preview.css';

interface PreviewProps {
  code: string;
}

const html = `
        <html>
            <head></head>
            <body>
                <div id='root'></div>
                <script>
                    window.addEventListener('message', (event) => {
                        console.log(event.data);
                        try {
                            eval(event.data);   
                        } catch (err) {
                            const root = document.querySelector('#root');
                            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                            console.error(err); 
                        }
                    }, false)
                </script>
            </body>
        </html>
    `;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();
  useEffect(() => {
    iframeRef.current.srcdoc = html;
    iframeRef.current.contentWindow.postMessage(code, "*");
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="title"
        ref={iframeRef}
        srcDoc={code}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
