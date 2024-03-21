jQuery(document).ready(function() {
  //Fabrx Stacked Columns Script
  Highcharts.chart('FabrxAreaChartOne', {
    chart: {
      type: 'areaspline',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      lineWidth: 1,
      lineColor: '#3F3B3B',
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    tooltip: {
      pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}',
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
      areaspline: {
        pointStart: 0,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          }
        }
      }
    },
    series: [{
      name: 'Legend',
      data: [0, 568, 985, 1023, 1230, 652, 1456, 456, 2340, 1865, 1455, 2300],
      color: '#97C3FF',
    }]
  });
});

jQuery(document).ready(function() {
  //Fabrx Single Bar Script
  Highcharts.chart('FabrxAreaChartTwo', {
    chart: {
      type: 'areaspline',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      lineWidth: 1,
      lineColor: '#3F3B3B',
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    tooltip: {
      pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}',
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
      areaspline: {
        pointStart: 0,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          }
        }
      }
    },
    series: [{
      name: 'Legend',
      color: '#006EFF',
      data: [0, 17, 899, 50, 55, 66, 76, 86, 96, 1420, 74, 84],
    },
    {
      name: 'Legend',
      color: '#97C3FF',
      data: [0, 8, 15, 785, 596, 33, 38, 43, 48, 28, 37, 42],
    },]
  });
});

jQuery(document).ready(function() {
  //Fabrx Stacked Bar Script
  Highcharts.chart('FabrxPointsChartOne', {
    chart: {
      type: 'line',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
      lineWidth: 1,
      lineColor: '#3F3B3B',
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    plotOptions: {
      line: {
        marker: {
          lineWidth: 0,
          enabledThreshold: 0,
          symbol: false,
        },
      },
      series: {
        lineWidth: 1,
      },
    },
    series: [{
      name: 'Legend',
      color: '#006EFF',
      data: [450, 586, 1155, 800, 456, 1456, 1869, 2356, 1750, 1560, 865, 423],
    }]
  });
});

jQuery(document).ready(function() {
  //Fabrx Multiple Bar Script
  Highcharts.chart('FabrxPointsChartTwo', {
    chart: {
      type: 'line',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      lineWidth: 1,
      lineColor: '#3F3B3B',
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    plotOptions: {
      series: {
        lineWidth: 1,
      },
    },
    series: [{
      name: 'Legend',
      color: '#006EFF',
      data: [0, 980, 550, 1500, 1000, 1950, 1300, 1850, 1450, 456, 1860, 850],
    },
    {
      name: 'Legend',
      color: '#97C3FF',
      data: [1300, 500, 950, 1450, 1580, 1180, 650, 1000, 850, 450, 452, 1890],
    }]
  });
});

jQuery(document).ready(function() {
  //Fabrx Single Line Chart Script
  Highcharts.chart('FabrxMultipleColumnsChartOne', {
    chart: {
      type: 'column',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      title: {
        text: '',
      },
      lineWidth: 1,
      lineColor: '#3F3B3B',
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    plotOptions: {
      series: {
        lineWidth: 1,
      },
      column: {
        pointPadding: 0.17,
        borderWidth: 0,
      },
    },
    series: [{
      name: 'Legend',
      color: '#006EFF',
      data: [350, 1856, 876, 963, 856, 456, 750, 2156, 1489, 876, 456, 1150],
    },
    {
      name: 'Legend',
      color: '#97C3FF',
      data: [465, 1236, 700, 356, 513, 654, 458, 1456, 956, 1321, 789, 1585],
    }]
  });
});

jQuery(document).ready(function() {
  //Fabrx Double Line Chart Script
  Highcharts.chart('FabrxStackedChartOne', {
    chart: {
      type: 'column',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
      lineWidth: 1,
      lineColor: '#3F3B3B',
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    plotOptions: {
      series: {
        lineWidth: 1,
      },
      column: {
        pointPadding: 0,
        borderWidth: 0,
        stacking: 'normal',
      },
    },
    series: [{
      name: 'Legend',
      color: '#006EFF',
      data: [256, 632, 120, 230, 200, 542, 653, 450, 236, 759, 1352, 1230],
      stack: 'male',
    },
    {
      name: 'Legend',
      color: '#97C3FF',
      data: [152, 546, 1590, 546, 1800, 1653, 1450, 450, 236, 759, 356, 756],
      stack: 'male',
    }]
  });
});

jQuery(document).ready(function() {
  //Fabrx Curved Line Chart Script
  Highcharts.chart('FabrxStackedChartTwo', {
    chart: {
      type: 'column',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      tickLength: 0,
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
      lineWidth: 1,
      lineColor: '#3F3B3B',
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    plotOptions: {
      series: {
        lineWidth: 1,
      },
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    series: [{
      name: 'Legend',
      color: '#006EFF',
      data: [0, 480, 850, 1345, 1675, 2340, 524, 1450, 1856, 956, 775, 1240],
      stack: 'male',
    },
    {
      name: 'Legend',
      color: '#97C3FF',
      data: [0, 480, 850, 1345, 1675, 2340, 524, 1450, 1856, 956, 775, 1240],
      stack: 'male',
    }]
  });
});

jQuery(document).ready(function() {
  //Fabrx Dot Plots Chart Chart Script
  Highcharts.chart('FabrxStackedChartThree', {
    chart: {
      type: 'column',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      title: {
        text: '',
      },
      labels: {
        enabled: true,
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
      lineWidth: 1,
      lineColor: '#3F3B3B',
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    plotOptions: {
      series: {
        lineWidth: 1,
      },
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    series: [{
      name: 'Legend',
      color: '#006EFF',
      data: [450, 652, 785, 986, 1023, 1356, 1562, 1763, 1950, 2100, 1600, 1789, 1235, 1020, 850, 650, 350, 950, 1562, 1950, 250],
      stack: 'male',
    },
    {
      name: 'Legend',
      color: '#97C3FF',
      data: [450, 652, 785, 986, 1023, 1356, 1562, 1763, 1950, 2100, 1600, 1789, 1235, 1020, 850, 650, 350, 950, 1562, 1950, 250],
      stack: 'male',
    }]
  });
});

jQuery(document).ready(function() {
  //Fabrx Stacked Area Chart Script
  Highcharts.chart('Fabrx3dBubbleChartOne', {
    chart: {
      borderWidth: 0,
      type: 'bubble',
      zoomType: 'xy',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      lineWidth: 1,
      lineColor: '#3F3B3B',
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    series: [{
        data: [[9, 81, 15.2], [98, 5, 15], [51, 50, 15], [41, 22, 15], [58, 24, 15], [78, 37, 15], [55, 56, 15.2], [18, 45, 15], [42, 44, 15], [3, 52, 15], [31, 18, 15.2], [79, 91, 15], [93, 23, 15], [44, 83, 15], [42, 38, 15]],
        marker: {
          lineWidth: 0,
          fillColor: {
            radialGradient: {
              cx: 0.4, cy: 0.3, r: 0.7,
            },
            stops: [[0, '#006EFF']]
          }
        }
      }]
  });
});

jQuery(document).ready(function() {
  //Fabrx Area Chart Chart Script
  Highcharts.chart('FabrxSplineChartOne', {
    chart: {
      type: 'spline',
      animation: Highcharts.svg,
      backgroundColor: null,
      events: {
        load: function () {
          var series = this.series[0];
          setInterval(function () {
          var x = (new Date()).getTime(),
          y = Math.random();
          series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: '#3F3B3B',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        enabled: false,
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    yAxis: {
      gridLineColor: '#3F3B3B',
      lineWidth: 1,
      lineColor: '#3F3B3B',
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#959393',
          fontSize: '12px',
          fontFamily: "'Roboto', sans-serif",
        },
      },
    },
    legend: {
      itemStyle: {
        color: '#959393',
        fontSize: '12px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#959393'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 9,
      symbolHeight: 9,
      itemDistance: 30,
      symbolPadding: 10,
    },
    time: {
      useUTC: false
    },
    accessibility: {
      announceNewData: {
        enabled: true,
        minAnnounceInterval: 2500,
        announcementFormatter: function (allSeries, newSeries, newPoint) {
          if (newPoint) {
            return 'New point added. Value: ' + newPoint.y;
          }
          return false;
        }
      }
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false,
        },
      },
    },
    series: [{
      color: '#006EFF',
      name: 'Legend',
      data: (function () {
        var data = [],
        time = (new Date()).getTime(),
        i;
        for (i = -19; i <= 0; i += 1) {
          data.push ({
            x: time + i * 1000,
            y: Math.random()
          });
        }
        return data;
      }())
    }]
  });
});

jQuery(document).ready(function() {
  //Fabrx Pie Chart Script
  Highcharts.chart('FabrxPieChartOne', {
    chart: {
      type: 'pie',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: 'transparent',
      tickLength: 0,
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      gridLineColor: 'transparent',
      title: {
        text: '',
      },
      labels: {
        enabled: false,
      },
    },
    legend: {
      itemStyle: {
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: '500',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#ffffff'
      },
      margin: 30,
      padding: 0,
      symbolWidth: 11,
      symbolHeight: 11,
      itemDistance: 30,
      symbolPadding: 10,
    },
    plotOptions: {
      pie: {
        size: 230,
        borderWidth: 0,
        allowPointSelect: true,
      },
      series: {
        lineWidth: 1,
      },
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '%',
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    series: [{
      innerSize: '70%',
      dataLabels: [{
        enabled: false,
      }],
      name: 'Browsers',
      showInLegend: true,
      data: [
        {name: '$986.27', y: 20, color: '#97C3FF',},
        {name: '$67.70', y: 15, color: '#5FDD97',},
        {name: '$361.12', y: 15, color: '#F46363',},
        {name: '$678.81', y: 10, color: '#FF9138',},
        {name: '$818.12', y: 5, color: '#605F5F',}],
      }
    ],
  });
});

jQuery(document).ready(function() {
  //Fabrx Pie Chart Script
  Highcharts.chart('FabrxPieChartTwo', {
    chart: {
      type: 'pie',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    legend: {
        symbolWidth: 11,
        symbolHeight: 11,
        itemDistance: 30,
        itemMarginTop: 7,
        itemMarginBottom: 7,
        itemStyle: {
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'normal',
          fontFamily: "'Roboto', sans-serif",
        },
        itemHoverStyle: {
          color: '#ffffff'
        },
    },
    responsive: {  
      rules: [{  
        condition: {  
          minWidth: 500  
        },  
        chartOptions: {  
          legend: {  
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical', 
          },
        },
      }],
    },
    xAxis: {
      lineColor: 'transparent',
      tickLength: 0,
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      gridLineColor: 'transparent',
      title: {
        text: '',
      },
      labels: {
        enabled: false,
      },
    },
    plotOptions: {
      pie: {
        size: 230,
        borderWidth: 0,
        allowPointSelect: true,
      },
      showInLegend: true,
      series: {
        lineWidth: 1,
      },
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: '%',
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
    series: [{
      dataLabels: [{
        enabled: false,
      }],
      name: 'Browsers',
      showInLegend: true,
      data: [
        {name: '$1,079.41', y: 28, color: '#97C3FF',},
        {name: '$435.61', y: 20, color: '#F46363',},
        {name: '$424.01', y: 10, color: '#FF9138',}],
      }
    ],
  });
});

jQuery(document).ready(function() {
  //Fabrx Pie Chart Script
  Highcharts.Legend.prototype.colorizeItem = function(item, visible) {
    //item.legendGroup[visible ? 'removeClass' : 'addClass']('highcharts-legend-item-hidden');
    if (!this.chart.styledMode) {
      var legend = this,
        options = legend.options,
        legendItem = item.legendItem,
        legendLine = item.legendLine,
        legendSymbol = item.legendSymbol,
        hiddenColor = legend.itemHiddenStyle.color,
        textColor = visible ?
        options.itemStyle.color :
        hiddenColor,
        symbolColor = visible ?
        (item.color || hiddenColor) :
        hiddenColor,
        markerOptions = item.options && item.options.marker,
        symbolAttr = {
          fill: symbolColor
        };
      if (legendSymbol) {
        // Apply marker options
        if (markerOptions) { // #585

          symbolAttr = item.pointAttribs();
          if (!visible) {
            // #6769
            symbolAttr.stroke = symbolAttr.fill = hiddenColor;
          }
        }
        legendSymbol.attr(symbolAttr);
      }
    }
    Highcharts.fireEvent(this, 'afterColorizeItem', {
      item: item,
      visible: visible
    });
  }
});

jQuery(document).ready(function() { 
  Highcharts.chart('FabrxPieChartThree', {
    chart: {
      type: 'solidgauge',
      height: '65%',
      backgroundColor: null,
    },
    title: {
      text: '',
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
      symbolWidth: 11,
      symbolHeight: 11,
      itemDistance: 30,
      itemMarginTop: 7,
      itemMarginBottom: 7,
      itemStyle: {
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'normal',
        fontFamily: "'Roboto', sans-serif",
      },
      itemHoverStyle: {
        color: '#ffffff'
      },
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [{
        outerRadius: '95%',
        innerRadius: '88%',
        backgroundColor: '#F5F5F5',
        borderWidth: 0
      },
      {
        outerRadius: '70%',
        innerRadius: '63%',
        backgroundColor: '#F5F5F5',
        borderWidth: 0
      },
      {
        outerRadius: '45%',
        innerRadius: '38%',
        backgroundColor: '#F5F5F5',
        borderWidth: 0
      }]
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: []
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false
        },
        linecap: 'round',
        stickyTracking: false,
        rounded: true,
        showInLegend: true
      }
    },
    series: [{
      name: '$425.48',
      marker: {
        fillColor: '#006EFF',
      },
      data: [{
        color: '#006EFF',
        radius: '95%',
        innerRadius: '88%',
        y: 62
      }]
    },
    {
      name: '$582.64',
      marker: {
        fillColor: '#59A0FF',
      },
      data: [{
        color: '#59A0FF',
        radius: '70%',
        innerRadius: '63%',
        y: 75
      }]
    },
    {
      name: '$65.04',
      marker: {
        fillColor: '#97C3FF',
      },
      data: [{
        color: '#97C3FF',
        radius: '45%',
        innerRadius: '38%',
        y: 75
      }]
    }]
  });
});