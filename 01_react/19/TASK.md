# Refs

## src/MarkdownEditor.jsx

Реализуйте компонент `<MarkdownEditor />`, который является React-оберткой плагина [@toast-ui/editor](https://github.com/nhn/tui.editor/tree/master/apps/editor). Этот плагин позволяет встроить в страницу Markdown-редактор.

```js
const editor = new Editor({
  el: element,
  hideModeSwitch: true,
});

editor.addHook("change", () => {
  const content = editor.getMarkdown();
  // код который будет вызван при изменении содержимого редактора
});
```

Компонент принимает на вход функцию как свойство `onContentChange`, которая вызывается при каждом изменении в редакторе. Функция принимает на вход содержимое редактора. Её использование видно в файле `src/index.jsx`.

Посмотреть пример работы редактора можно на [странице документации](https://nhn.github.io/tui.editor/latest/tutorial-example02-editor-with-horizontal-previewss).
