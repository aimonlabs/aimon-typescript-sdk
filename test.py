from aimon import Client, DatasetRecord

aimon_client = Client(api_key="cfc819b4d923f5d86fb344655efac1cea0f0a247819716ad50c9b837fd188683", email="mansi@aimon.ai")

list_model_types = aimon_client.list_model_types()
print(list_model_types)