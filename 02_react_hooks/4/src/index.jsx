import ReactDOM from 'react-dom/client';
import React from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

import MarkdownEditor from './MarkdownEditor.jsx';

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(<MarkdownEditor onContentChange={console.log} />);
