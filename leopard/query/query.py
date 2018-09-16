
from pymongo import MongoClient
import json
import pymongo
from cognate import ComponentCore
from pyramid.config import Configurator
from pyramid.view import view_config, view_defaults

from bson.json_util import dumps

class Query(object):

    def __init__(self):
        self.client = MongoClient('mongodb://127.0.0.1:27017')
        self.db = self.client["XenioDatabase"]
        self.table = self.db["notify"]

    def database_query(self, application_id, notification_id, customer_id):
        for document in self.table.find(
                {"application_id": application_id, "customer_id": customer_id, "notification_id": notification_id}):
            self.log(str(document["Template"]))

    def create_document_template(self, application_id, customer_id, notify_id, template):
        self.table.insert(
            {
                "application_id":  application_id,
                "customer_id": customer_id,
                "notification_id": notify_id,
                "Template": template
            })

    def list_all(self, customer_id, application_id):
        notification_arr = []
        return_document = self.table.find({"application_id": application_id, "customer_id": customer_id})

        for document in return_document:
            notification_arr.append(dumps(document))

        return notification_arr

    def delete_one_document(self, customer_id, application_id):
        deleted = self.table.delete_one({"customer_id": customer_id, "application_id": application_id})
        return deleted.raw_result

    def update_document(self, customer_id, application_id, template):
        deleted = self.table.update_one({"application_id": application_id, "customer_id": customer_id}, {"$set": {"Template": template}})
        return deleted.raw_result









