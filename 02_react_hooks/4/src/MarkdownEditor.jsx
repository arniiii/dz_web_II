import React, { useRef, useEffect } from 'react';
import Editor from '@toast-ui/editor';

const MarkdownEditor = ({ onContentChange }) => {
  // BEGIN (write your solution here)
  const container = useRef(null);
  const callback = useRef(onContentChange);
  useEffect(() => { callback.current = onContentChange; }, [onContentChange]);
  useEffect(() => {
    const editor = new Editor({ el: container.current, hideModeSwitch: true });
    editor.addHook('change', () => callback.current(editor.getMarkdown()));
    return () => editor.destroy();
  }, []);
  return <div ref={container} />;
  // END
};

export default MarkdownEditor;
