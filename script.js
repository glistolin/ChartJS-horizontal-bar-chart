
var dataBar = {
  labels: [
    "Consent for third party marketing",
    "Consent for partnership program"
  ],
  datasets: [
    {
      label: "Consents",
      data: [100, 75],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 99, 132)"]
      //hoverBackgroundColor: []
    },
    {
      label: "Data Subjects",
      data: [80, 25],
      backgroundColor: []
    }
  ]
};

var jsonData = [
  {
    label: "Obavješćivanje o novim uslugama iz paketa e-Građani",
    Valid_From: "Oct 5 2017  1:44PM",
    NumberOfOptIn: 25,
    NumberOfOptOut: 5
  },
  {
    label:
      "Suglasnost za korištenje osobnih podataka u svrhu ostvarenja mirovine",
    Valid_From: "Oct 10 2017  1:44PM",
    NumberOfOptIn: 44,
    NumberOfOptOut: 16
  },
  {
    Valid_From: "Oct 16 2017  1:44PM",
    NumberOfOptIn: 3,
    NumberOfOptOut: 35
  },
  {
    Valid_From: "Oct 23 2017 12:00AM",
    NumberOfOptIn: 11,
    NumberOfOptOut: 6
  },
  {
    Valid_From: "Oct 25 2017 12:00AM",
    NumberOfOptIn: 1,
    NumberOfOptOut: 68
  }
];

var Context = document.getElementById("bar").getContext("2d");
var BarChart = new Chart(Context, {
  type: "horizontalBar",
  data: dataBar,
  options: {
    onClick: function(evt) {
      var activePoints = BarChart.getElementsAtEvent(evt);

      if (activePoints[0]) {
        var chartData = activePoints[0]["_chart"].config.data;
        var idx = activePoints[0]["_index"];

        var value = chartData.datasets[0].data[idx];

        console.log(value);
        myLineChart.update();
      }
    },
    elements: {
      rectangle: {
        borderWidth: 2
      }
    },
    responsive: true,
    legend: {
      position: "right"
    },
    title: {
      display: true,
      text: "Consents/Data Subjects"
    }
  }
});

var labels = [];
var dates = [];
var NumberOfOptIn = [];
var NumberOfOptOut = [];

for (var key in jsonData) {
  console.log(key, jsonData[key]);
  labels.push(jsonData[key].label);
  dates.push(jsonData[key].Valid_From);
  NumberOfOptIn.push(jsonData[key].NumberOfOptIn);
  NumberOfOptOut.push(jsonData[key].NumberOfOptOut);
}

var ctx = document.getElementById("line").getContext("2d");
var data = {
  labels: dates,
  datasets: [
    {
      label: "Opt In",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: NumberOfOptIn
    },
    {
      label: "Opt Out",
      fillColor: "rgba(151,187,205,0.2)",
      strokeColor: "rgba(151,187,205,1)",
      pointColor: "rgba(151,187,205,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(151,187,205,1)",
      data: NumberOfOptOut
    }
  ]
};

var myLineChart = Chart.Line(ctx, {
  data: data,
  options: {
    responsive: true,
    hoverMode: "index",
    stacked: false,
    title: {
      display: true,
      text:
        "GDPR - Opt In / Opt out for Suglasnost za korištenje osobnih podataka u svrhu ostvarenja mirovine "
    },
    scales: {
      yAxes: [
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "left",
          id: "y-axis-1"
        },
        {
          type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
          display: true,
          position: "right",
          id: "y-axis-2"
        }
      ]
    }
  }
});
