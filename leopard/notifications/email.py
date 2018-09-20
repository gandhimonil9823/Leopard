import json
import pymongo
from cognate import ComponentCore
from pyramid.config import Configurator
from pyramid.view import view_config, view_defaults
from leopard.template.email_template import JinjaEmail
import smtplib
from email.mime.text import MIMEText


class Email(object):

    def __init__(self):
        self.email_template = JinjaEmail

    #Still have'nt taken the two cases on the specs into consideration
    def create_message_send(self, sender, recipient_list, subject, email_body):

        template = self.email_template.generate_param_body()

        s = smtplib.SMTP(host='your_host_address_here', port="port here")
        msg = MIMEText(template)

        msg['Subject'] = subject
        msg['From'] = sender
        msg['To'] = recipient_list








