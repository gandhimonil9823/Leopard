"""Module to execute command line processes.

Executing main.py
==================

To execute this command, the helper bash script *./main.sh* may be used. It
simply saves time from having to type:

    > python Leopard/main.py
    instead becomes.
    > ./main.sh

This module relies on the *Cognate* module, documentation for which can be found
at, http://neoinsanity.github.io/cognate/ .

The *Cognate* module provides logging, command line parsing and configuration.
To get the basic feature listing use the help option:

    > ./main.sh -h

The logs for *Leopard* process are output to "BUILD/sideckick.log". the file can
be tailed to view process execution during development. The default log level is
"debug" and silent on the console.

To see logs output on the command line console utilize:

    >./main.sh --verbose

Modifying main.py execution
============================

The method *Leopard.run* is executed after all configuration and bootstrapping
of the *Leopard* instance is done. Modify this method to alter the runtime
behavior of *main.py*.

To alter the command line parameters, see the method *Leopard.cognate_options*.

To configure DB or other post configuration processing and setup that needs to
occur, see *Leopard.cognate_configure*.
"""

import sys
import json
import requests
from cognate import ComponentCore


class Leopard(ComponentCore):
    def __init__(self, **kwargs):
        self.files = []
        super(Leopard, self).__init__(**kwargs)

    def cognate_options(self, arg_parser):
        """Method to configure *ArgParser* arguments.

        Any arguments added here, will be available on the command line.

        See https://docs.python.org/2.7/library/argparse.html#adding-arguments
        for more details on adding arguments.
        """

        arg_parser.add_argument('--files', default=self.files, nargs='+',
                                help='list of files in order of place, zone, position')

    def cognate_configure(self, args):
        """Configuration event hook for signaling post config processing."""

    def run(self):
        """ ! IMPORTANT: This is the method to modify to execute your own code.
        """

        with open(self.files[0]) as f:
            line = f.readline()

            while line:
                temp = json.loads(line)
                requests.put('http://localhost:8000/ingest', json=temp)
                line = f.readline()
            f.close()


if __name__ == '__main__':
    argv = sys.argv
    side_kick = Leopard(argv=argv)
    side_kick.run()
