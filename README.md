# pagination-js-pure
##How to use:

<span>HTML</span>
<br/>
```html
<div class="paginator">
    <ul id="container">
        <li>Post 1</li>
        <li>Post 2</li>
        <li>Post 3</li>
        <li>Post 4</li>
        <li>Post 5</li>
        <li>Post 6</li>
        <li>Post 7</li>
        <li>Post 8</li>
        <li>Post 9</li>
        <li>Post 10</li>
    </ul>
</div>
```

<br/>
<span>Javascript:</span>
<br/>

```html
    <script src="./Pagination.js"></script>
    <script>
      const pagination = new Pagination({
          listID: '#container',
          perPage: 5,
          maxPagesButtons: 5
      });
    </script>
```
