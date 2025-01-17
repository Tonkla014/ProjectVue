<template>
    <div>
        <apexchart width="500" type="radialBar" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            chartOptions: {
                chart: {
                    id: "vuechart-example",
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -90,
                        endAngle: 90,
                        track: {
                            background: '#333',
                            startAngle: -90,
                            endAngle: 90,
                        },
                        dataLabels: {
                            name: {
                                show: false,
                            },
                            value: {
                                fontSize: "30px",
                                show: true
                            }
                        }
                    }
                }
            },
            series: [
                50
            ],

        };
    },
};
</script>