const drawTriangle = (triangleRef, bottomY, fillColor) => {
  const canvas = triangleRef.current;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = bottomY;

  // Define the points of the triangle
  const width = canvas.width - 17;
  const height = canvas.height;
  const middleX = width / 2;
  // const bottomY = height / 2;

  // Clear the canvas
  ctx.clearRect(0, 0, width, height);

  // Draw the triangle
  ctx.beginPath();
  ctx.moveTo(0, 0); // Left point
  ctx.lineTo(width, 0); // Right point
  ctx.lineTo(middleX, bottomY); // Bottom point
  ctx.closePath();

  // Set line properties and fill the triangle
  ctx.fillStyle = fillColor;
  ctx.fill();
};

export default drawTriangle;
