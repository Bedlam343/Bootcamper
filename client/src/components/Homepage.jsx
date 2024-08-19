import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import drawTriangle from 'components/utils/drawTriangle';

const Homepage = ({ bootcamps }) => {
  const triangleSize1Ref = useRef();
  const triangleSize2Ref = useRef();
  const triangleSize3Ref = useRef();
  const triangleSize4Ref = useRef();

  useEffect(() => {
    const drawTriangles = () => {
      const height = window.innerHeight;
      const halfway = height / 1.75;
      drawTriangle(triangleSize1Ref, halfway, '#1E1E1E');
      drawTriangle(triangleSize2Ref, halfway + 20, '#595959');
      drawTriangle(triangleSize3Ref, halfway + 40, '#969696');
      drawTriangle(triangleSize4Ref, halfway + 60, '#D6D5D5');
    };

    drawTriangles();

    window.addEventListener('resize', drawTriangles);

    return () => window.removeEventListener('resize', drawTriangles);
  }, []);

  return (
    <div className="bg-easyWhite">
      <canvas ref={triangleSize4Ref} className="block absolute" />
      <canvas ref={triangleSize3Ref} className="block absolute" />
      <canvas ref={triangleSize2Ref} className="block absolute" />
      <canvas ref={triangleSize1Ref} className="block absolute" />
      <div className="absolute w-full flex flex-col items-center gap-8 pt-4">
        <div className="flex flex-col items-center">
          <p className="text-easyWhite text-[80px]">Become a Digital</p>
          <p className="text-easyWhite text-[80px]">Craftsman.</p>
        </div>
        <img
          src="./assets/hammer.png"
          alt="Codemasons Logo"
          className="w-[130px] animate-hammer-swing"
        />
      </div>
    </div>
  );
};

export default Homepage;
