# Различия JSX и HTML

Реализуйте и экспортируйте по умолчанию компонент `Progress`, который принимает свойство `percentage` и рисует статический прогрессбар.

Использование:

```js
<Progress percentage={40} />
```

Результат:

```html
<div class="progress">
  <div
    class="progress-bar"
    role="progressbar"
    aria-valuenow="40"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="progressbar"
    style="width: 40%;"
  ></div>
</div>
```

- Стиль `width` – вычисляется динамически исходя из переданного значения `percentage`.
- Аттрибут `aria-valuenow` – вычисляется динамически и равен `percentage`.

## Подсказки

- [Progress](https://getbootstrap.com/docs/5.1/components/progress/)
