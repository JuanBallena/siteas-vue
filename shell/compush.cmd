@ECHO OFF

TITLE COMMIT Y PUSH

REM COMMIT & PUSH AUTOMATICALLY

ECHO ==== COMMIT ====
CALL git add .
CALL git commit -m "New shell commit & push"
ECHO:

ECHO ==== PUSH ====
CALL git push origin master
ECHO:

PAUSE