const clearTriangle = (triangleRef) => {
  const canvas = triangleRef.current;
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
};

export default clearTriangle;
