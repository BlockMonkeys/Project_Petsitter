var db = require('./db.js');
var url = require('url');
var template2 = require('./template2.js');
var qs = require('querystring');
var sanitizeHTML = require('sanitize-html');



    exports.home = function(request, response){
        db.query(`SELECT * FROM siterinfo`, function(error, pet){
            var title = `PET Sitter_홈페이지`;
            var body = template2.siterList(pet);
            var HTML = template2.HTML(title, body,
            ``
            );
            response.writeHead(200);
            response.end(HTML);
        });
    }

    exports.page = function(request, response){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
            db.query(`SELECT * FROM siterinfo WHERE id = ${db.escape(queryData.id)}`, function(err, description){
                if(err){
                    throw err;
                }
                var title = `PET Sitter_소개_${sanitizeHTML(description[0].picture_path)}`;
                var body = `${sanitizeHTML(description[0].sitter_description)}`;
                var HTML = template2.HTML(title, body,
                `
                <a href='/create'>리뷰작성</a>
                <a href='/view/?id=${queryData.id}'>리뷰보기</a>
                `
                );
                response.writeHead(200);
                response.end(HTML);    
            });
    }

    exports.board_Create = function(request, response){
        db.query(`SELECT * FROM siterinfo`, function(err, siters){
            if(err){
                throw err;
            }
            var title = `PET Sitter_리뷰게시판`;
            var body = 
            `
            <form action="/create_process" method="POST">
            <p><input type="text" name="title" placeholder="제목을 입력하세요" style="width:500px;"></p>
            <p><textarea cols="80" rows="20"; name="description" placeholder="본문을 입력하세요" style="resize: none;"></textarea></p>
            <p>${template2.siterSelect(siters)}</p>
            <p><input type="submit" value="저장"></p>
            </form>
            `;
            var HTML = template2.HTML(title, body,
            ``);
            response.writeHead(200);
            response.end(HTML);
            }
    )}

    exports.board_Create_Process = function(request, response){
        var body='';
            request.on('data', function(data){
            body = body + data;
            });
            request.on('end', function(){
            var post = qs.parse(body);
            db.query(`
            INSERT INTO community (title, com_description, created, sitter_id) 
            VALUES(?, ?, NOW(), ?)`,
            [post.title, post.description, post.siter],
            function(error, result){
                if(error){
                throw error;
                }
                response.writeHead(302, {Location: `/`});
                response.end();
            }
            )
        });
    }

    exports.board_View_page = function(request, response){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
        db.query(`SELECT * FROM community LEFT JOIN siterinfo ON community.sitter_id=siterinfo.id WHERE community.id = ${db.escape(queryData.id)}`, 
        function(err, des){
            if(err){
                throw err;
            }
            var title = `${sanitizeHTML(des[0].title)}`;
            var body = `${sanitizeHTML(des[0].com_description)} <p>Review for : ${sanitizeHTML(des[0].picture_path)}</p>`;
            var HTML = template2.HTML(title, body,
            `
            <a href='/update?id=${queryData.id}'>리뷰수정</a>
            <form action = "/delete_process" method = "POST" onsubmit="return confirm('정말 삭제하시겠습니까?')">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="리뷰삭제">
            `
            );
            response.writeHead(200);
            response.end(HTML);    
        });
    }

    exports.board_View_Page_SnowWhite = function(request, response){
        db.query(`SELECT * FROM community WHERE sitter_id = ${db.escape('1001')}`, function(err, result_snowWhite){
            var title = `PET Sitter_SnowWhite_리뷰보기`;
            var body = template2.comList_snowWhite(result_snowWhite);
            var HTML = template2.HTML(`${sanitizeHTML(title)}`, `${sanitizeHTML(body)}`,
            ``
            );
            response.writeHead(200);
            response.end(HTML);
        });
    }

    exports.board_View_Page_LionKing = function(request, response){
        db.query(`SELECT * FROM community WHERE sitter_id = ${db.escape('1002')}`, function(err, result_lionKing){      
            var title = `PET Sitter_LionKing_리뷰보기`;
            var body = template2.comList_lionKing(result_lionKing);
            var HTML = template2.HTML(`${sanitizeHTML(title)}`, `${sanitizeHTML(body)}`,
            ``
            );
            response.writeHead(200);
            response.end(HTML);
        });
    }

    exports.board_View_Page_Cinderella = function(request, response){
        db.query(`SELECT * FROM community WHERE sitter_id = ${db.escape('1003')}`, function(err, result_cinderella){
            var title = `PET Sitter_Cinderella_리뷰보기`;
            var body = template2.comList_cinderella(result_cinderella);
            var HTML = template2.HTML(`${sanitizeHTML(title)}`, `${sanitizeHTML(body)}`,
            ``
            );
            response.writeHead(200);
            response.end(HTML);
        });
    }

    exports.board_Update = function(request, response){
        var _url = request.url;
        var queryData = url.parse(_url, true).query;
            db.query(`SELECT * FROM community WHERE id = ${db.escape(queryData.id)}`, function(err, result){
                if(err){
                    throw err;
                }
                db.query(`SELECT * FROM siterinfo`, function(err2, siters){
                    if(err2){
                        throw err2;
                    }
                    var title = `${result[0].title}_수정 게시판`;
                    var body = 
                    `
                    <form action="/update_process" method="POST">
                        <p><input type='hidden' name='id' value='${result[0].id}'></p>
                        <p><input type="text" name="title" placeholder="제목을 입력하세요" value="${result[0].title}" style="width:500px;"></p>
                        <p><textarea cols="80" rows="20"; name="description" placeholder="본문을 입력하세요" style="resize: none;">${result[0].com_description}</textarea></p>
                        <p>${template2.siterSelect(siters, result[0].sitter_id)}
                        <p><input type="submit" value="저장"></p>
                    </form>
                    `
                    var HTML = template2.HTML(title, body, `<a href='/'>취소</a>`);
                    response.writeHead(200);
                    response.end(HTML);
                })
            }
    )}

    exports.board_Update_Process = function(request, response){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query(`UPDATE community SET title=?, com_description=?, sitter_id=? WHERE id=?`,
            [post.title, post.description, post.siter, post.id], 
            function(err, result){
                response.writeHead(302, {Location: `/`});
                response.end();
            })
        })
    }

    exports.board_Delete_Process = function(request, response){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            db.query(`DELETE FROM community WHERE id=${db.escape(post.id)}`, function(err, result){
                if(err){
                    throw err;
                }
                response.writeHead(302, {Location: `/`});
                response.end();
            });
        });
    }