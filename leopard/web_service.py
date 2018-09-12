"""Module to instantiate a web service process.

Executing web_service.py
=========================

To execute this command, the helper bash script *./web_service.sh may be used.
It simply saves time from having to type:

    > python leopard/web_service.py
    instead becomes
    > ./web_service.sh

This module relies on the *Cognate* module, documentation for which can be found
at, http://neoinsanity.github.io/cognate/.

The *Cognate* module provides logging, command line parsing and configuration.
To get the basic feature listing use the help option:

    > ./web_service.sh -h

The logs for *Leopard* process are output to "BUILD/leopard.log". The file
can be tailed to view process execution during development. The default log
level is "debug" and silent on the console.

To see logs output on the command line console, utilize:

    > ./web_service.sh --verbose
"""

import sys

from cognate import ComponentCore
from gevent.pywsgi import WSGIServer
from pyramid.config import Configurator
from pyramid.view import view_config, view_defaults

from leopard.query.query import Query
from ontic.ontic_type import OnticType
from ontic.ontic_type import validate_object
from ontic.schema_type import SchemaType
import gevent
import pyramid.httpexceptions as exc


json_spawn = {
    "request_ticket": 101
}
class NotifyRequest(OnticType):
    ONTIC_SCHEMA = SchemaType({

           'application_id': {'type':'int', 'min': 0,'required':True},
           'customer_id': {'type':'int', 'min': 0,'required':True},
           'notification_id': {'type':'int', 'min': 0, 'required':True}
       })


@view_defaults(renderer='json', accept='application/json')
class LeopardServices(object):

    def __init__(self, request):
        self.request = request
        self.log = request.log
        self.query = request.query

    @view_config(route_name='send', request_method='POST')
    def send(self):
        notify_request = NotifyRequest(self.request.json_body)
        self.log.debug('send - json_body: %s', notify_request)

        app_id = self.request.json_body['application_id']
        customer_id = self.request.json_body["customer_id"]
        notify_id = self.request.json_body["notification_id"]

        errors = validate_object(notify_request, raise_validation_exception=False)
        print(errors)
        if errors:
            raise exc.HTTPBadRequest("Please enter valid application_id, customer_id and noification_id")

        gevent.spawn(self.query_database_call,app_id,customer_id,notify_id)

    def query_database_call(self,app_id,customer_id,notif_id):
        self.query.database_query(app_id,customer_id,notif_id)
        print json_spawn


class Application(ComponentCore):

    def __init__(self,
                 host='localhost',
                 port=8000,
                 **kwargs):
        self.host = host
        self.port = port

        super(Application, self).__init__(**kwargs)

    def cognate_options(self, arg_parser):
        arg_parser.add_argument(
            '--host', default=self.host,
            help='Set the host name to utilize for web service connection.')
        arg_parser.add_argument(
            '--port', default=self.port, type=int,
            help='Set the web port for the web service.')

    def cognate_configure(self, args):
        # Configure the ingestion service.
        self.query_handle = Query()

    def run(self):
        config = Configurator()
        # ===================================================================  #
        # Static file configuration.
        #
        # For url pattern matching see:
        # https://docs.pylonsproject.org/projects/pyramid/en/latest/narr/urldispatch.html
        #
        # NOTE: Modify the listing below to add and remove static routes.
        config.add_static_view(name='static', path='static')
        # =================================================================== #

        # =================================================================== #
        # Route configuration.
        #
        # For url pattern matching see:
        # https://docs.pylonsproject.org/projects/pyramid/en/latest/narr/urldispatch.html
        #
        # NOTE: Modify the listing below to add and remove routes.
        config.add_route('send', '/send')

        # =================================================================== #

        # =================================================================== #
        # Adding properties to request service class.
        # In the current configuration, it applies to all service classes.
        # Adding logging object.
        config.add_request_method((lambda _: self.log), 'log', reify=True)
        config.add_request_method((lambda _: self.query_handle), 'query', reify=True)

        # =================================================================== #

        # Scan of Leopard project to configure view_config decorators.
        config.scan('leopard')

        application = config.make_wsgi_app()

        server = WSGIServer((self.host, self.port),
                            application=application,
                            log=self.log,
                            error_log=self.log)
        server.serve_forever()


if __name__ == '__main__':
    argv = sys.argv
    app = Application(argv=argv)
    app.run()
