
from pymongo import MongoClient
import json
import pymongo
from cognate import ComponentCore
from pyramid.config import Configurator
from pyramid.view import view_config, view_defaults

class Query(object):

    def __init__(self):
        self.client = MongoClient('mongodb://127.0.0.1:27017')


    def database_query(self, application_id, notification_id, customer_id):

        db = self.client["XenioDatabase"]
        table = db["notify"]

        for document in table.find(
                {"application_id": application_id, "customer_id": customer_id, "notification_id": notification_id}):
            self.log(str(document["Template"]))





