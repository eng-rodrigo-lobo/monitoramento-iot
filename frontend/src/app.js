// Função para buscar dados da API
async function fetchSensorData() {
    try {
        const response = await fetch('http://localhost:8000/api/sensor-data');
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

// Configuração comum para os gráficos
const chartOptions = {
    chart: {
        type: 'line',
        height: 350,
        animations: {
            enabled: true
        },
        toolbar: {
            show: true
        },
        zoom: {
            enabled: true
        }
    },
    stroke: {
        curve: 'smooth',
        width: 3
    },
    markers: {
        size: 5
    },
    tooltip: {
        enabled: true,
        theme: 'dark'
    },
    xaxis: {
        type: 'datetime'
    }
};

// Inicializa todos os gráficos
async function initCharts() {
    const sensorData = await fetchSensorData();
    
    // Gráfico de Temperatura
    const tempChart = new ApexCharts(document.querySelector("#temperatureChart"), {
        ...chartOptions,
        series: [{
            name: 'Temperatura',
            data: sensorData.map(item => ({
                x: new Date(item.timestamp),
                y: item.temperature
            }))
        }],
        colors: ['#FF4560'],
        title: {
            text: 'Temperatura (°C)',
            align: 'center',
            style: {
                fontSize: '16px'
            }
        },
        yaxis: {
            title: {
                text: 'Graus Celsius'
            }
        }
    });
    tempChart.render();
    
    // Gráfico de Umidade
    const humidityChart = new ApexCharts(document.querySelector("#humidityChart"), {
        ...chartOptions,
        series: [{
            name: 'Umidade',
            data: sensorData.map(item => ({
                x: new Date(item.timestamp),
                y: item.humidity
            }))
        }],
        colors: ['#00E396'],
        title: {
            text: 'Umidade Relativa (%)',
            align: 'center',
            style: {
                fontSize: '16px'
            }
        },
        yaxis: {
            title: {
                text: 'Porcentagem'
            }
        }
    });
    humidityChart.render();
    
    // Gráfico Combinado
    const combinedChart = new ApexCharts(document.querySelector("#combinedChart"), {
        ...chartOptions,
        series: [
            {
                name: 'Temperatura',
                data: sensorData.map(item => ({
                    x: new Date(item.timestamp),
                    y: item.temperature
                }))
            },
            {
                name: 'Umidade',
                data: sensorData.map(item => ({
                    x: new Date(item.timestamp),
                    y: item.humidity
                }))
            }
        ],
        colors: ['#FF4560', '#00E396'],
        title: {
            text: 'Temperatura e Umidade',
            align: 'center'
        },
        yaxis: [
            {
                title: {
                    text: 'Temperatura (°C)'
                }
            },
            {
                opposite: true,
                title: {
                    text: 'Umidade (%)'
                }
            }
        ]
    });
    combinedChart.render();
    
    // Atualização periódica
    setInterval(async () => {
        const newData = await fetchSensorData();
        
        tempChart.updateSeries([{
            data: newData.map(item => ({
                x: new Date(item.timestamp),
                y: item.temperature
            }))
        }]);
        
        humidityChart.updateSeries([{
            data: newData.map(item => ({
                x: new Date(item.timestamp),
                y: item.humidity
            }))
        }]);
        
        combinedChart.updateSeries([
            {
                data: newData.map(item => ({
                    x: new Date(item.timestamp),
                    y: item.temperature
                }))
            },
            {
                data: newData.map(item => ({
                    x: new Date(item.timestamp),
                    y: item.humidity
                }))
            }
        ]);
    }, 5000); // Atualiza a cada 5 segundos
}

// Inicia os gráficos quando a página carregar
document.addEventListener('DOMContentLoaded', initCharts);