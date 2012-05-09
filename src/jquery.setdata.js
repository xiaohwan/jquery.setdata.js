/*global jQuery*/
/*jslint browser:true*/

/**
 * jquery.setdata.js
 * Binding data objects to HTML elements;
 * Version 0.6
 * 
 * Usage:
 * In HTML markup, add ATTRIBUTE="data{query[@attribute][;query[@attribute][;...]]}" to elements;
 * In JavaScript, call $(selector).setData(dataObject);
 *
 * See
 *
 * Xiaoxing Wang
 * xiaohwan@gmail.com
 *
 * Versions:
 * v0.51 @ Nov 8, 2011 Supporting customize attribute name;
 * v0.50 @ Nov 7, 2011
 * v0.49 @ Sep 2, 2010 Refactoring
 */
(function($) {
  var ATTR = 'ux:data',
  QUERY_ATTR = 'ux\\:data';

  /**
   * Example 
   * key: a.b(3).c, data: {a: {b: [{}, {}, {}, {c: 'value'}}}, return: 'value';
   */
  function _query(key, data) {
    var keys = key.split(/\./),
    value = data,
    index,
    parts;
    while (keys.length > 0) {
      if (value) {
        index = keys.shift();
        if (index.indexOf('(') >= 0) {
          // NOTE: Parse to get attribute name and index;
          // TODO: strong?
          parts = index.match(/([\$|\w]*)\((\d*)\)/);
          if (value[parts[1]]) {
            value = value[parts[1]][parts[2]];
          } else {
            return null;
          }
        } else {
          value = value[index];
        }
      } else {
        return null;
      }
    }
    return value;
  }
  function getAttributeParser(query, i) {
    return function(index, attr) {
      var exp = query.replace('$', '\\$').replace(/\(/g, '\\(').replace(/\)/g, '\\)') + '[^.|@|;]*([^;|}]*)',
      re = new RegExp(exp, 'g');
      return attr.replace(re, query + '(' + i + ')' + '$1');
    };
  }
  $.setData = function(data) {
    try {
      this.each(function() {
        /**
         * TODO:
         * It's hard to explain all these variables;
         * elem:
         * tag:
         * maps:
         * query:
         * cpTags:
         * parseRel:
         */
        var elem = $(this),
        tag,
        maps,
        map,
        query,
        attr,
        value,
        cpTags,
        i,
        l,
        copiedElem,
        parseRel;
        // NOTE: get setData tag from attribute;
        tag = elem.attr(ATTR).match(/data\{([^\}]*)\}/);
        if (!tag) {
          throw 'jquery.data.js: rel tag is invalid: ' + elem.attr(ATTR);
        }
        // NOTE: use ; to seperate multi mapping;
        // NOTE: app.name@id;app.icon@src
        maps = tag[1].split(';'); // query-attribute maps;
        while (maps.length) {
          // NOTE: use @ to sepearte data query and target attribute;
          // Example: app.name@id
          map = maps.shift().split('@'); // a single map;
          query = map[0]; // data query, a.b(3).c;
          attr = map[1]; // target attribute;
          value = _query(query, data); // value;
          // NOTE: if value is Array, copy element;
          if (value instanceof Array) {
            cpTags = maps.join(';'); // remaining tags in copied elements;
            // NOTE: remove all existing copied elements;
            elem.parent().children('[' + QUERY_ATTR + '="cp{' + cpTags.replace(/\(\d\)/g, '') + '}"]').remove();
            for (i = 0, l = value.length; i < l; i++) {
              copiedElem = elem.clone().show();
              if (typeof(value[i]) == 'object') {
                copiedElem.attr(ATTR, 'data{' + cpTags + '}');
              } else {
                copiedElem.attr(ATTR, 'data{' + query + ';' + cpTags + '}');
              }
              // copiedElem.setData(data);
              // console.log(true, cpTags, data, copiedElem);
              parseRel = getAttributeParser(query, i);
              copiedElem.find('[' + QUERY_ATTR + '^="data{' + query + '"]').add(copiedElem).attr(ATTR, parseRel).setData(data);
              // NOTE: not the last one;
              if (i < l - 1) {
                copiedElem.find('[' + QUERY_ATTR + '*="' + query + '"]').attr(ATTR, null);
              }
              copiedElem.attr(ATTR, 'cp{' + cpTags.replace(/\(\d\)/g, '') + '}');
              elem.before(copiedElem);
            }
            if (copiedElem) {
              copiedElem.attr(ATTR, elem.attr(ATTR));
              elem.remove();
            } else {
              elem.hide();
            }
          }
          if (attr) {
            switch (attr) {
            case 'class':
              elem.addClass(value);
              break;
            case 'html':
              elem.html(value);
              break;
            default:
              elem.attr(attr, value);
            }
          } else {
            elem.text(value);
          }
        }
      });
    } catch(ex) {
      alert(ex);
    }
    return this;
  };
  $.fn.setData = $.setData;
} (jQuery));

