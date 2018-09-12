@echo off
REM ###########################################################
REM ##### Create virtualenv for development.
REM # Virtaulenv needs to be installed for this to work.
REM # If you don't have virtualenv installed please visit
REM # https://pypi.python.org/pypi/virtualenv
REM # for instructions on installing virutalenv.
REM ###########################################################

REM ### Create the virtual environment.
virtualenv bin/venv

echo
echo "------------------------------------------------"
echo "- Virtual environment created in directory 'venv'"
echo "------------------------------------------------"

REM # Activate the virtual environment.
echo
echo "------------------------------------------------"
echo "----- Activating virtual env with command. -----"

CALL bin/venv/Scripts/activate

echo "------------------------------------------------"
echo

REM ###########################################################
REM ##### Install the Leopard package in development mode.
REM ###########################################################
echo
echo "------------------------------------------------"
echo "------ Setting up development environment ------"
echo "------------------------------------------------"

python setup.py develop

REM ###########################################################
REM ##### Install development related packages.
REM ###########################################################
echo
echo "------------------------------------------------"
echo "------- Installing development packages --------"
echo "------------------------------------------------"
echo
pip install -r bin/dev_requirements.txt
