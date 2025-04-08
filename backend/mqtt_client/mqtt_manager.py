# backend/mqtt_client/mqtt_manager.py
import paho.mqtt.client as mqtt
from database.database_manager import DatabaseManager

class MQTTManager:
    def __init__(self, broker, port, topics, db_manager):
        self.client = mqtt.Client()
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.broker = broker
        self.port = port
        self.topics = topics
        self.db_manager = db_manager

    def on_connect(self, client, userdata, flags, rc):
        print("Connected with result code "+str(rc))
        for topic in self.topics:
            client.subscribe(topic)

    def on_message(self, client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        # Processar mensagem e salvar no banco de dados
        data = self.process_message(msg)
        self.db_manager.insert_sensor_data(data)

    def process_message(self, msg):
        # Implementar lógica de parsing da mensagem MQTT
        pass

    def start(self):
        self.client.connect(self.broker, self.port, 60)
        self.client.loop_forever()