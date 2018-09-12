import logging
import unittest

import mock
from pyramid import testing

from leopard import web_service

log = logging.getLogger()


class WebServiceTest(unittest.TestCase):
    def setUp(self):
        self.config = testing.setUp()

    def tearDown(self):
        testing.tearDown()

    # def test_ping(self):
    #     request = testing.DummyRequest()
    #     request.log = log
    #     request.ingestion = mock.Mock()
    #     request.redis_query = mock.Mock()
    #     Leopard_service = web_service.LeopardServices(request)
    #     result = Leopard_service.ping()
    #     expected_result = {'response': 'pong'}
    #     self.assertEqual(result, expected_result)

    def test_echo(self):
        request = testing.DummyRequest(json_body={"application_id": "some_app" ,"customer_id": "some_customer","notification_id": "some_notification"})
        request.log = log
        Leopard_service = web_service.LeopardServices(request)
        result = Leopard_service.send()
        expected_result = {"application_id": "some_app" ,"customer_id": "some_customer","notification_id": "some_notification"}
        self.assertEqual(result, expected_result)


    # def test_query(self):
    #     request = testing.DummyRequest(json_body={'query': 'ping'})
    #     request.log = log
    #     request.ingestion = mock.Mock()
    #     request.redis_query = mock.Mock()
    #     Leopard_service= web_service.LeopardServices(request)
    #     result = Leopard_service.query()
    #     expected_result = {
    #         "message": "PONG",
    #         "response": "ok"
    #     }
    #     self.assertEqual(result, expected_result)