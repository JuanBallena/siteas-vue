@ECHO OFF

REM AGREGAR EN EL PATH DEL S.O. C:\Program Files\Git\cmd
REM AGREGAR EN EL PATH DEL S.O. C:\Program Files\Git\bin\git.exe

TITLE AUTOMATICALLY DEPLOY TO AWS

CALL pull.cmd
ECHO:

REM COMPILAR VUEJS
ECHO ==== COMPILE VUEJS ====
CALL npm run build
ECHO:

REM DEPLOY VUEJS HACIA AWS-S3
ECHO ==== AWS-DEPLOY ====
CALL npm run aws-deploy
ECHO:

PAUSE


