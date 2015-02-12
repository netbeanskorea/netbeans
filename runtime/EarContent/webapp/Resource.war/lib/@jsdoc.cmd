@echo off

set java=\projects\star\jdk160\bin\java
set jsdoc=\projects\star\jsdoc-toolkit
set source=\projects\star\project-workspace\dev-star\ui\web.war\star\lib
set target=\projects\star\project-workspace\dev-star\ui\web.war\star\lib\@doc
set work=\projects\star\project-workspace\dev-star\ui\web.war\star\lib\@doc
set template=\projects\star\project-workspace\dev-star\ui\web.war\star\lib\@\jsdoc\jsdoc-setup.cmd

call %template%

echo jsdoc ... clean

rem del /f /s /q %target% > NUL
rem del /f /s /q %work% > NUL

mkdir %target% > NUL 2> NUL
mkdir %work% > NUL 2> NUL

echo jsdoc ... prepare

rem copy %source%\star-doc.js %work%\star-001.js > NUL
copy %source%\star.js     %work%\star-002.js > NUL

cd %jsdoc%

echo jsdoc ... doc

rem  -D="noGlobal:true"
%java% -jar jsrun.jar app/run.js -a -d=%target% -D="title:STAR" -s -t=templates/WouterBos-Codeview -x=js %work%

pause
