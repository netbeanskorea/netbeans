@echo off

echo jsdoc-setup ... copy

xcopy /s /y C:\projects\star\project-workspace\dev-star\ui\web.war\star\lib\@\jsdoc\templates C:\projects\star\jsdoc-toolkit\templates > NUL

rem pause
