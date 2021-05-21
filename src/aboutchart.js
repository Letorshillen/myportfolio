import Chart from "chart.js/auto";

const canvas = document.querySelector(".about__chart");

const ctx = canvas.getContext("2d");

let gradient = ctx.createLinearGradient(80, 0, 0, 0);
gradient.addColorStop(0, "#ffb0c8");
gradient.addColorStop(1, "#3a75f0");

const data = {
  labels: ["Arbeit", "Coden", "Sport", "Wandern"],
  datasets: [
    {
      label: "Dataset 1",
      data: [8, 3, 1, 1],
      backgroundColor: ["#141414", gradient, "#ffb0c8", "#3a75f0"],
    },
  ],
};

function handleHover(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach(
    (color, index, colors) => {
      colors[index] =
        index === item.index || color.length === 9 ? color : color + "4D";
    }
  );
  legend.chart.update();
}

function handleLeave(evt, item, legend) {
  legend.chart.data.datasets[0].backgroundColor.forEach(
    (color, index, colors) => {
      colors[index] = color.length === 9 ? color.slice(0, -2) : color;
    }
  );
  legend.chart.update();
}

const config = {
  type: "doughnut",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        onHover: handleHover,
        onLeave: handleLeave,
        position: "bottom",
        display: false,
      },
      title: {
        display: false,
        text: "what i do in a day",
      },
    },
  },
};

const myChart = new Chart(canvas, config);
