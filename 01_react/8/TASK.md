# Состояние

Реализуйте компонент `BtnGroup`, который отрисовывает две кнопки. Нажатие на любую из кнопок делает ее активной, а другую неактивной. При первой загрузке ни одна из кнопок не нажата.

Пример использования:

```js
<BtnGroup />
```

Результат:

```html
<div class="btn-group" role="group">
  <button type="button" class="btn btn-secondary left">Left</button>
  <button type="button" class="btn btn-secondary right">Right</button>
</div>
```

После нажатия на левую кнопку добавляется класс `active`. В результате список классов выглядит так: `btn btn-secondary left active`. У правой кнопки поведение соответствующее.

## Подсказки

- [Button Group](https://getbootstrap.com/docs/5.1/components/button-group/)
