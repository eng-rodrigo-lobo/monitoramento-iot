# IoT Monitoring System

<!-- Adicione uma imagem depois ![Dashboard Preview](docs/dashboard-preview.png) -->

Sistema completo de monitoramento IoT com coleta de dados via MQTT, armazenamento em banco de dados MySQL, visualização em dashboard web e geração de relatórios.

## ⚙️ Funcionalidades

- **Coleta de dados** via protocolo MQTT
- **Armazenamento** em banco de dados MySQL
- **Dashboard web** com visualização em tempo real
- **Geração de relatórios** periódicos
- **Sistema de alarmes** baseado em thresholds
- **Acesso remoto** via servidor web

## 🛠️ Tecnologias Utilizadas

- **Backend**: Python 3 (paho-mqtt, SQLAlchemy, FastAPI)
- **Frontend**: HTML5, CSS3, JavaScript (Chart.js)
- **Banco de Dados**: MySQL
- **MQTT Broker**: Mosquitto
- **Versionamento**: Git/GitHub

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Python 3.8+
- MySQL Server
- Mosquitto MQTT Broker
- Node.js (para o frontend)

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/iot-monitoring-system.git
   cd iot-monitoring-system
