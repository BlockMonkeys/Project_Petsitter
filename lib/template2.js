var sanitizeHTML = require('sanitize-html');

module.exports = {
      HTML:function(title, body, buttons){
        return `
        <!doctype html>
        <html>
        <head>
          <title>${sanitizeHTML(title)}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">${title}</a></h1>
          <p>${body}</p>
          ${buttons}
        </body>
        </html>
        `;
      },
      siterList:function(pet){
        var list = '<ul>';
        var i = 0;
        while(i < pet.length){
          list = list + `<li><a href=?id=${pet[i].id}>${pet[i].picture_path}</a></li>`;
          i++;
        }
        list = list +'</ul>';
        return list;
      },
      comList:function(result){
        var list = '<ul>';
        var i = 0;
        while(i < result.length){
          list = list + `<li><a href=?id=${result[i].id}>${sanitizeHTML(result[i].title)}</a></li>`;
          i++;
        }
        list = list +'</ul>';
        return list;
      },
      // comList_upgrade:function(result, result_snowWhite, result_lionKing, result_cinderella){
      //   var list = '<ul>';
      //   var i = 0;
      //   while(i < result.length){
      //     if (result[i].sitter_id === '1001'){
      //       list = list + `<li><a href=?id=${result[i].id}>${result_snowWhite[i].title}</a></li>`;
      //       i++;
      //     } else if (result[i].sitter_id === '1002'){
      //       list = list + `<li><a href=?id=${result[i].id}>${result_lionKing[i].title}</a></li>`;
      //       i++;
      //     } else if (result[i].sitter_id === '1003') {
      //       list = list + `<li><a href=?id=${result[i].id}>${result_cinderella[i].title}</a></li>`;
      //       i++;
      //     } else {
      //       console.log(`error`);
      //     }
      //   }
      //       list = list +'</ul>';
      //       return list;
      // },

      comList_snowWhite:function(result_snowWhite){
        var list = '<ul>';
        var i = 0;
        while(i < result_snowWhite.length){
          list = list + `<li><a href=?id=${result_snowWhite[i].id}>${sanitizeHTML(result_snowWhite[i].title)}</a></li>`;
          i++;
        }
        list = list +'</ul>';
        return list;
      },

      comList_lionKing:function(result_lionKing){
        var list = '<ul>';
        var i = 0;
        while(i < result_lionKing.length){
          list = list + `<li><a href=?id=${result_lionKing[i].id}>${sanitizeHTML(result_lionKing[i].title)}</a></li>`;
          i++;
        }
        list = list +'</ul>';
        return list;
      },

      comList_cinderella:function(result_cinderella){
        var list = '<ul>';
        var i = 0;
        while(i < result_cinderella.length){
          list = list + `<li><a href=?id=${result_cinderella[i].id}>${sanitizeHTML(result_cinderella[i].title)}</a></li>`;
          i++;
        }
        list = list +'</ul>';
        return list;
      },

      siterSelect:function(siter, sitter_id){
        var tag = '';
        var i = 0;
        while (i < siter.length){
          var selected = '';
          if(siter[i].id === sitter_id){
            selected = ' selected';
          }
          tag += `<option value="${siter[i].id}"${selected}>${siter[i].picture_path}</option>`
          i++
        }
        return `<select name = "siter">${tag}</select>`
      }
    };
