@echo off
REM ###########################################################
REM ### Script to make it easier to live as a developer.
REM ###
REM ### The script will add the ./bin directory to your session
REM ### path, so that development scripts can be run by simply
REM ### typing out the command. The script will also activate
REM ### virtualenv.
REM ###
REM ### This script needs to change your current running bash
REM ### session. To do so you need to source execute the
REM ### script. Do this with either of the two following
REM ### commands at the prompt.
REM ###
REM ###   PROJECT_ROOT> . bin/enable_dev.sh
REM ###
REM ### or
REM ###
REM ###   PROJECT_ROOT> source bin/enable_dev.sh
REM ###
REM ###########################################################

REM # if necessary, setup the dev bin scripts
rem add bin to path

rem wil add bin folder to path for current session (not global path variable!)
set PATH=%PATH%;%CD%/bin/

REM # enable the virtual environment
bin/venv/Scripts/activate
