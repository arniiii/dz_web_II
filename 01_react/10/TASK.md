# Автоматное программирование

Реализуйте компонент `<Collapse>`, который по клику на ссылке отображает или скрывает свое содержимое. Если содержимое скрыто, то клик раскрывает его. И наоборот – если содержимое отображается, то клик скрывает контент. Содержимое передается в компонент через свойство `text`. За начальное состояние открытости отвечает свойство `opened`, которое по умолчанию равно `true`.

![](./images/example.gif)

```js
const text = "collapse me";
<Collapse text={text} opened={false} />;
```

```html
<div>
  <p>
    <a
      class="btn btn-primary"
      data-bs-toggle="collapse"
      href="#"
      role="button"
      aria-expanded="false"
      >Link with href</a
    >
  </p>
  <div class="collapse">
    <div class="card card-body">collapse me</div>
  </div>
</div>
```

После клика по классу `collapse` элемента `<div>` добавляется класс `show`, а значение атрибута `aria-expanded` меняется на `true`.

## Подсказки

- [Collapse](https://getbootstrap.com/docs/5.1/components/collapse/)
