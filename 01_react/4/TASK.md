# Работа с коллекциями

В этом задании необходимо создать компонент, выводящий список определений.

`dl` – тег, который используется при создании списков определений. Совместно с этим тегом используется тег `dt` (содержит название определения) и `dd` (описание определения):

```html
<dl>
  <dt>Coffee</dt>
  <dd>Black hot drink</dd>
  <dt>Milk</dt>
  <dd>White cold drink</dd>
</dl>
```

## Задание

Реализуйте и экспортируйте по умолчанию компонент `DefinitionsList`, который принимает свойство `data` следующей структуры:

```js
const definitions = [
  { dt: 'one', dd: 'two', id: 1 },
  { dt: 'another term', dd: 'another description', id: 2 },
];
 
<DefinitionsList data={definitions} />;
```

Результатом должен быть следующий вывод:

```html
<dl>
  <dt>one</dt>
  <dd>two</dd>
  <dt>another term</dt>
  <dd>another description</dd>
</dl>
```

Если `data` — это пустой массив, то ничего не должно рендериться.