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
from pymongo import MongoClient

from leopard.template.jinja_template import Jinja
from leopard.query.query import Query
from ontic.ontic_type import OnticType
from ontic.ontic_type import validate_object
from ontic.schema_type import SchemaType
import gevent
import pyramid.httpexceptions as exc
import random
from query.recipients_query import QueryRecipients
import smtplib
from email.mime.text import MIMEText
from leopard.template.email_template import JinjaEmail
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


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
        self.jinja = request.jinja
        self.client = MongoClient('mongodb://127.0.0.1:27017')
        self.db = self.client["XenioDatabase"]

    @view_config(route_name='query', request_method='POST')
    def query(self):
        notify_request = NotifyRequest(self.request.json_body)
        self.log.debug('send - json_body: %s', notify_request)

        app_id = self.request.json_body['application_id']
        customer_id = self.request.json_body["customer_id"]
        notify_id = self.request.json_body["notification_id"]
        paramters_arr = self.request.json_body["parameters"]

        template = self.jinja.generate_param_body(paramters_arr)

        self.log.debug(template)

        errors = validate_object(notify_request, raise_validation_exception=False)
        if errors:
            raise exc.HTTPBadRequest("Please enter valid application_id, customer_id and noification_id")

        gevent.spawn(self.query_database_call,app_id,customer_id,notify_id)

    def query_database_call(self,app_id,customer_id,notif_id):
        self.query.database_query(app_id,customer_id,notif_id)
        self.log.debug(json_spawn)

    @view_config(route_name='create', request_method='POST')
    def create(self):

        app_id = self.request.json_body['application_id']
        customer_id = self.request.json_body["customer_id"]
        notify_id = random.randrange(1, 100)
        template = self.request.json_body["Template"]

        self.log.debug(self.query.create_document_template(app_id, customer_id, notify_id, template))

        return notify_id

    @view_config(route_name='list', request_method='POST')
    def list(self):
        app_id = self.request.json_body['application_id']
        customer_id = self.request.json_body["customer_id"]
        return_obj = self.query.list_all(customer_id, app_id)
        self.log.debug(return_obj)
        return return_obj

    @view_config(route_name='delete', request_method='POST')
    def delete(self):
        app_id = self.request.json_body['application_id']
        customer_id = self.request.json_body["customer_id"]
        return self.query.delete_one_document(app_id, customer_id)

    @view_config(route_name='update', request_method='POST')
    def update(self):

        app_id = self.request.json_body['application_id']
        customer_id = self.request.json_body["customer_id"]
        template = self.request.json_body["Template"]
        return self.query.update_document(app_id, customer_id, template)



    @view_config(route_name='update', request_method='POST')
    def email(self):
        customer_id = self.request.json_body["customer_id"]
        notify_id = self.request.json_body["notification_id"]
        paramters_arr = self.request.json_body["parameters"]

        s = smtplib.SMTP(host='your_host_address_here', port="port here")

        notifier_instance = EmailNotifier(s, self.db)
        notifier_instance.send_email(notify_id, customer_id,paramters_arr)


class EmailNotifier(object):
    def __init__(self, email_connection, db_connection):
        self.db_connection = db_connection
        self.email_connection = email_connection

    def send_email(self, notification_id, notification_type, customer_id, params):
        # get template
        template_config = self.db_connection["Notification"]

        document = template_config.find({"customer_id": customer_id, "_id": notification_id, "Notification_Type" : notification_type})
        subject = document["Template_Subject"]
        body = document["Template_Body"]

        recipients = self.db_connection["Recipients"]
        if recipients.find({"Notification_id": notification_id}) is None:
            self.single_user(notification_id, notification_type, customer_id, params, subject, body)
        else:
            for document in recipients.find({"Notification_id": notification_id}):
                recipient_email = document["Recipients_Email"]

                msg = MIMEMultipart()

                msg['Subject'] = 'Dear %s' % params["Name"] + subject
                msg['From'] = "gandhimonil.2008@gmail.com"
                msg['To'] = recipient_email

                msg.attach(MIMEText(body, 'plain'))

                self.email_connection.send(msg)

    def single_user(self,notification_id, notification_type, customer_id, params, subject, body):
        customer_config = self.db_connection["Customer"]

        document = customer_config.find(
            {"customer_id": customer_id})

        customer_email = document["Email"]

        msg = MIMEMultipart()

        msg['Subject'] = 'Dear %s' % params["Name"] + subject
        msg['From'] = "gandhimonil.2008@gmail.com"
        msg['To'] = customer_email

        msg.attach(MIMEText(body, 'plain'))

        self.email_connection.send(msg)


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
        self.template_handler = Jinja()

    def run(self):
        config = Configurator()
        # ===================================================================  #
        # Static file configuration.
        #
        # For url pattern matching see:
        # https://docs.pylonsproject.org/projects/pyramid/en/latest/narr/urldispatch.html
        #`
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
        config.add_route('query', '/query')
        config.add_route('create', '/create')
        config.add_route('list', '/list')
        config.add_route('delete', '/delete')
        config.add_route('update', '/update')




        # =================================================================== #

        # =================================================================== #
        # Adding properties to request service class.
        # In the current configuration, it applies to all service classes.
        # Adding logging object.
        config.add_request_method((lambda _: self.log), 'log', reify=True)
        config.add_request_method((lambda _: self.query_handle), 'query', reify=True)
        config.add_request_method((lambda _: self.template_handler), 'jinja', reify=True)


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
