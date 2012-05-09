$(document).ready(function() {
  var book1 = {
    id: 1,
    name: 'Steve Jobs',
    author: 'Walter Isaacson',
    price: '17.88',
    stores: [{
      name: 'Xinhua'
    },
    {
      name: 'Zhongguancun'
    }]
  },
  book2 = {
    id: 2,
    name: 'Einstein: His Life and Universe',
    author: 'Walter Isaacson',
    price: '12.21',
    stores: [{
      name: 'Xinhua'
    },
    {
      name: 'Zhongguancun'
    }]

  },
  book3 = {
    id: 3,
    name: 'The Presentation Secrets of Steve Jobs',
    author: 'Carmine Gallo',
    price: '13.31',
    stores: [{
      name: 'Xinhua'
    },
    {
      name: 'Xisi'
    }]

  },
  book4 = {
    id: 4,
    name: 'The Innovation Secrets of Steve Jobs',
    author: 'Carmine Gallo',
    price: '14.75',
    stores: [{
      name: 'Xinhua'
    },
    {
      name: 'Wangfujing'
    }]
  }

  var books = [book1, book2];
  var authors = [{
    name: 'Walter Isaacson',
    books: [book1, book2]
  },
  {
    name: 'Carmine Gallo',
    books: [book3, book4]
  }];
  var stores = ['Xinhua', 'Wangfujing', 'Zhongguancun']
  $(document).ready(function() {
    $('[ux\\:data^="data{book1"]').setData({
      book1: book1
    });
    $('[ux\\:data^="data{books"]').setData({
      books: books
    });
    $('[ux\\:data^="data{authors"]').setData({
      authors: authors
    });
    /**
     * Testing bug 1: incorrect re-rendering.
     */
    setTimeout(function() {
      $('[ux\\:data^="data{authors"]').setData({
        authors: authors
      });
    },
    5000);
    /**
     * Testing bug 2 when:
     * 1. data is an array with simple values (like strings).
     * 2. have multiple binding like {value;value@name};
     * In this situation, only the first binding to the textnode works.
     * Fixed @ r20997
     */
    $('[ux\\:data^="data{stores"]').setData({
      stores: stores
    });
  });
});

