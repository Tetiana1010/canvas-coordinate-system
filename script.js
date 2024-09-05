const coordinates = {
  'A': { x: 1, y: 5 },
  'B': { x: 3, y: -2 },
  'C': { x: 2, y: -1 }
};

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const spacing = 37.795;
const textOffset = -2.5;

const drawAxes = () => {
  ctx.strokeStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2); // X-axis
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0); // Y-axis
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
};

const drawGrid = () => {
  ctx.strokeStyle = '#ddd';
  
  // Vertical lines (right of y-axis)
  for (let x = canvas.width / 2; x < canvas.width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Vertical lines (left of y-axis)
  for (let x = canvas.width / 2; x > 0; x -= spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  // Horizontal lines (below x-axis)
  for (let y = canvas.height / 2; y < canvas.height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Horizontal lines (above x-axis)
  for (let y = canvas.height / 2; y > 0; y -= spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
};

const plotPoints = (coord) => {
  ctx.font = '12px Arial';
  ctx.fillStyle = '#000';

  ctx.fillText('0', canvas.width / 2 + textOffset, canvas.height / 2 - textOffset);

  for (const label in coord) {
    const point = coord[label];
    const xPos = canvas.width / 2 + spacing * point.x;
    const yPos = canvas.height / 2 - spacing * point.y;
    
    ctx.beginPath();
    ctx.arc(xPos, yPos, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillText(label, xPos + 5, yPos - 5);
  }
};

const drawCoordinatePlane = () => {
  drawAxes();
  drawGrid();
  plotPoints(coordinates);
};

drawCoordinatePlane();

const form = document.querySelector('#form');

const validateForm = (e) => {
  e.preventDefault();

  const coordinate = document.querySelector('#coord').value.toUpperCase();
  const xValue = Number(document.querySelector('#xCoord').value);
  const yValue = Number(document.querySelector('#yCoord').value);

  coordinates[coordinate] = {
    x: xValue,
    y: yValue
  };

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCoordinatePlane();
};

form.addEventListener("submit", validateForm);

const addCoord = (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top;
  
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, 2 * Math.PI);
  ctx.fill();
}

canvas.addEventListener("click", addCoord);

