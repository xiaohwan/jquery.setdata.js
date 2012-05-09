Template plugin for jQuery
==========================

Xiaoxing Wang (xiaohwan@gmail.com)

# Data Binding Syntax
<TAG ... ATTR="data{VALUE[@ATTRIBUTE][;VALUE[@ATTRIBUTE]]*}">...</TAG>

ATTR is a configurable attribute that keeps the data binding in the HTML document.
VALUE will be set to ATTRIBUTE. If ATTRIBUTE is not specified, VALUE will be set to the textnode.
When VALUE is an array, the current element will be repeated using each of array items as data source of one new element.
More than one binding can be used on the same element.

# Usage
## Basic: fill data of a book to HTML tags
```html
<!-- Markup -->
<div ux:data="data{book1.id@id}" class="book">
  <p><span>Name:</span><span ux:data="data{book1.name}"></span></p>
  <p><span>Author:</span><span ux:data="data{book1.author}"></span></p>
  <p><span>Price:</span><span ux:data="data{book1.price}"></span></p>
</div>
<!-- Result
  <div id="1">
    <p><span>Name:</span><span>Steve Jobs</span></p>
    <p><span>Author:</span><span>Walter Isaacson</span></p>
    <p><span>Price:</span><span>17.88</span></p>
  </div>
-->
<script>
// Preparing data object:
var book1 = {
  id: 1,
  name: 'Steve Jobs',
  author: 'Walter Isaacson',
  price: '17.88'
};
// Call setData:
$('[ux\\:data^="data{book1"]').setData{
  book1: book1
});
</script>
```
## Loop: make a book list
```html
<!-- Markup -->
<ul>
  <li ux:data="data{books;books.id@id}">
    <p><span>Name:</span><span ux:data="data{books.name}"></span></p>
    <p><span>Author:</span><span ux:data="data{books.author}"></span></p>
    <p><span>Price:</span><span ux:data="data{books.price}"></span></p>
  </li>
</ul>
<!-- Results
<ul>
  <li id="1">
    <p><span>Name:</span><span>Steve Jobs</span></p>
    <p><span>Author:</span><span>Walter Isaacson</span></p>
    <p><span>Price:</span><span>17.88</span></p>
  </li>
  <li id="2">
    <p><span>Name:</span><span>Einstein: His Life and Universe</span></p>
    <p><span>Author:</span><span>Walter Isaacson</span></p>
    <p><span>Price:</span><span>12.21</span></p>
  </li>
</ul>
-->
<script>
// Preparing data:
var book1 = {
  id: 1,
  name: 'Steve Jobs',
  author: 'Walter Isaacson',
  price: '17.88'
}, book2 = {
  id: 2,
  name: 'Einstein: His Life and Universe',
  author: 'Walter Isaacson',
  price: '12.21'
}
var books = [book1, book2];
// Call setData:
$('[ux\\:data^="data{books"]').setData({
  books: books
});
</script>
```
## See test/index.html for more examples.
