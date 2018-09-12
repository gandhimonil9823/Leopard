@echo off
REM #==================================================
REM ### Script to clean up any build collateral.
REM #==================================================

REM # Remove the code coverage data file created by
REM # the test execution script.
echo 'Removing coverage report.'
del /Q /F .coverage

REM # Remove the BUILD directory which will get filled
REM # with build collateral.
echo 'Removing the BUILD directory.'
rmdir /Q /S BUILD
