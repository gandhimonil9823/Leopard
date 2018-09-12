REM ###########################################################
REM ### Script to execute unit tests.
REM ###########################################################
REM #
REM # This script is to be run from the project root directory with the command:
REM #   <project_root>$ bin/run_test.sh
REM #
REM # The command will create an html coverage report in the directory
REM # <project_root>/BUILD/COVERAGE_REPORT.
REM #
REM 
REM # Remove pyc files that may cause false results.
for %%i in (*.pyc) do echo "%%~xi"

REM # Remove the current coverage collection file
del /Q /F .coverage
rmdir /Q /S BUILD/COVERAGE_REPORT

REM # Execute the tests as per the given config.
nosetests -c bin/nose.cfg
