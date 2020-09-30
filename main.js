var http = require('http');
var url = require('url');
var db = require('./lib/db');
var template2 = require('./lib/template2');
var pet = require('./lib/pet');


var app = http.createServer(function(request, response){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        var pathname = url.parse(_url, true).pathname;

        if(pathname === '/'){
                if(queryData.id === undefined){
                        pet.home(request, response);
                } 
                else {
                        pet.page(request, response);
                }

                } else if(pathname === '/create') {
                        pet.board_Create(request, response);
                
                } else if(pathname === '/create_process'){
                        pet.board_Create_Process(request, response);

                } else if(queryData.id === '1001'){
                        pet.board_View_Page_SnowWhite(request, response);
               
                } else if(queryData.id === '1002'){
                        pet.board_View_Page_LionKing(request, response);
              
                } else if(queryData.id === '1003'){
                        pet.board_View_Page_Cinderella(request, response);
                
                } else if(pathname === '/update'){
                        pet.board_Update(request, response);
                
                } else if(pathname === '/update_process'){
                        pet.board_Update_Process(request, response);
                
                } else if(pathname === '/delete_process'){
                        pet.board_Delete_Process(request, response);
                
                } else if(queryData.id > '2000'){
                        pet.board_View_page(request, response);
                
                } else {
                response.writeHead(404);
                response.end('NOT FOUND');
                }
        })


    

app.listen(3000);

