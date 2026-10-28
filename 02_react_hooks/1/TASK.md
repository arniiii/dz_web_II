# Хук useState

Это задание сделано по мотивам темы «Состояние» из темы по React. Теперь вам нужно реализовать тот же компонент, но используя функциональные компоненты и хуки.

## src/BtnGroup.jsx

Реализуйте компонент `BtnGroup`, который отрисовывает две кнопки. Нажатие на любую из кнопок делает её активной, а другую – неактивной. При первой загрузке ни одна из кнопок не нажата.

Пример использования:

```html
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
