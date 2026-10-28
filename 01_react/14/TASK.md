# Функциональные компоненты

Реализуйте и экспортируйте по умолчанию компонент `<Card>` так, чтобы можно было составлять такую структуру:

```js
<Card>
  <Card.Body>
    <Card.Title>Title</Card.Title>
    <Card.Text>Text</Card.Text>
  </Card.Body>
</Card>
```

Получившийся HTML:

```html
<div class="card">
  <div class="card-body">
    <h4 class="card-title">Title</h4>
    <p class="card-text">Text</p>
  </div>
</div>
```
