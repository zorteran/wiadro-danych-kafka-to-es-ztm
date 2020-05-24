import requests 
import json
import time
from kafka import KafkaProducer

token = 'use your own API Token'
url = 'https://api.um.warszawa.pl/api/action/busestrams_get/'
resource_id = 'f2e5503e927d-4ad3-9500-4ab9e55deb59'
sleep_time = 15

bus_params = {
    'apikey':token,
    'type':1,
    'resource_id': resource_id
    }
tram_params = {
    'apikey':token,
    'type':2,
    'resource_id': resource_id
    }

while True:
    try:
        r = requests.get(url = url, params = bus_params)
        data = r.json() 
        producer = KafkaProducer(bootstrap_servers=['localhost:29092'],
                                value_serializer=lambda x: json.dumps(x).encode('utf-8'),
                                key_serializer=lambda x: x
                                )

        print('Sending records...')
        for record in data['result']:
            #print(record)
            future = producer.send('ztm-input', value=record, key=record["VehicleNumber"].encode('utf-8'))
            result = future.get(timeout=60)
    except:
        print("¯\_(ツ)_/¯")
    time.sleep(sleep_time)
