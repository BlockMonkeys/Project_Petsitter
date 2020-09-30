var mysql = require('mysql');
var db = require('./db.js');

module.exports = {
    HOME:function(){
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PET_Sitter_Home</title>
            <style>
                h1{
                    padding-bottom: 200px;
                    text-align: center;
                }
                .sitter_Pictures{
                    display:flex;
                    justify-content: space-around;
                }
                .sitter_Button{
                    padding-top:10em;
                    display:flex;
                    justify-content: space-around;
                }

            </style>
        </head>
        <body>
            <h1><a href='/'>PET Sitter_홈페이지</a></h1>

            <span class='sitter_Pictures'>
                <div class='column_One'>
                    <a href='/board_Intro'><img src="#" width="150" height="200" alt="sitter_One"></a>
                </div>
                <div class='column_Two'>
                    <a href='/board_Intro'><img src="#" width="150" height="200" alt="sitter_Two"></a>
                </div>
                <div class='column_Three'>
                    <a href='/board_Intro'><img src="#" width="150" height="200" alt="sitter_Three"></a>
                </div>
            </span>

            <span class='sitter_Button'>
                <div class='column_One'>
                    <a href='/board_Write' class="write_Review">리뷰작성</a>
                    <a href="/board_View" class="view_Review">리뷰보기</a>
                </div>
                <div class='column_Two'>
                    <a href='/board_Write' class="write_Review">리뷰작성</a>
                    <a href="/board_View" class="view_Review">리뷰보기</a>
                </div>
                <div class='column_Three'>
                    <a href='/board_Write' class="write_Review">리뷰작성</a>
                    <a href="/board_View" class="view_Review">리뷰보기</a>
                </div>
            </span>

        </body>
        </html>
        `;
        },
    INTRO:function(){
        db.query(`SELECT * FROM siterinfo WHERE id = 1001`, function(err, description){
            if(err){
                throw err;
            }
            var des = description[0].sitter_description;

        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PET_Sitter_Intro</title>
            <style>
            h1{
                text-align: center;
            }
            .sitter_Pictures,.sitter_Description,.sitter_Button{
                display:flex;
                justify-content: center;
            }
            .write_Review{
                padding-right: 1em;
                }
            </style>
        </head>
        <body>
            <h1><a href='/'>PET Sitter_소개</a></h1>
            <span class='sitter_Pictures'>
                <img src="#" width ="250" height="250" alt="petSitterPicture">
            </span>

            <span class='sitter_Description'>
                <p>${des}<p>
            </span>

            <span class='sitter_Button'>
                <a href='/board_Write' class="write_Review">리뷰작성</a>
                <a href="/board_View" class="view_Review">리뷰보기</a>
            </span> 

        </body>
        </html>
        `
        })
    },
    BOARD:function(){
        return`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PET_Sitter_Board</title>
            <style>
            h1{
                text-align: center;
            }
            .sitter_pictures, .sitter_Review_One, .sitter_Review_Two, .sitter_Review_Three{
                display:flex;
                justify-content: center;
            }
            </style>
        </head>
        <body>
            <h1><a href='/'>PET Sitter_리뷰게시판</a></h1>

            <span class='sitter_pictures'>
                <img src="#" width ="250" height="250" alt="sitter_picture">
            </span>

            <div class='sitter_Review_One'>
                <span class='sitter_Review'><p>내용</p></span>
                <a href="/board_Update" class='update_Board'>수정</a>
                <form action="/board_Delete" method="POST">
                    <input type="hidden" name="#" value="#">
                    <input type="submit" value="삭제">
                </form>
            </div>

            <div class='sitter_Review_Two'>
                <span class='sitter_Review'><p>내용</p></span>
                <a href="/board_Update" class='update_Board'>수정</a>
                <form action="/board_Delete" method="POST">
                    <input type="hidden" name="#" value="#">
                    <input type="submit" value="삭제">
                </form>
            </div>

            <div class='sitter_Review_Three'>
                <span class='sitter_Review'><p>내용</p></span>
                <a href="/board_Update" class='update_Board'>수정</a>
                <form action="/board_Delete" method="POST">
                    <input type="hidden" name="#" value="#">
                    <input type="submit" value="삭제">
                </form>
            </div>
        </body>
        </html>
        `
    },
    WRITEBOARD:function(){
        return`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PET_Sitter_Write_Board</title>
            <style>
            h1{
                text-align: center;
            }
            .sitter_pictures{
                display:flex;
                justify-content: center;
            }
            form{
                text-align: center;
            }
            </style>
        </head>
        <body>
            <h1><a href='/'>PET Sitter_리뷰작성</a></h1>

            <span class='sitter_pictures'>
                <img src="#" width ="250" height="250" alt="sitter_picture">
            </span>

            <form action="/board_Create" method="POST">
                <p><input type="text" name="#" placeholder="제목입력" style="width:500px;" ></p>
                <p><textarea cols="80" rows="20" name="#" placeholder="본문입력" style="resize: none;"></textarea></p>
                <p><input type="submit" value="저장"></p>
            </form>
        </body>
        </html>
        `
    },
    UPDATEBOARD:function(){
        return`
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PET_Sitter_Update_Board</title>
            <style>
            h1{
                text-align: center;
            }
            .sitter_pictures{
                display:flex;
                justify-content: center;
            }
            form{
                text-align: center;
            }
            </style>
        </head>
        <body>
            <h1><a href='/'>PET Sitter_리뷰수정</a></h1>

            <span class='sitter_pictures'>
                <img src="#" width ="250" height="250" alt="sitter_picture">
            </span>

            <form action="/update_process" method="POST">
                <input type="hidden" name="#" value="수정전제목">
                <p><input type="text" name="#" placeholder="제목입력" style="width:500px;" ></p>
                <p><textarea cols="80" rows="20" name="#" placeholder="본문입력" style="resize: none;"></textarea></p>
                <p><input type="submit" value="저장"></p>
            </form>
        </body>
        </html>
        `
    }
};
