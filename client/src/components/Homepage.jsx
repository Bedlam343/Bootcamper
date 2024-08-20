import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import drawTriangle from 'components/utils/drawTriangle';

const Homepage = ({ bootcamps }) => {
  const triangleSize1Ref = useRef();
  const triangleSize2Ref = useRef();
  const triangleSize3Ref = useRef();
  const triangleSize4Ref = useRef();

  // draw 4 upside-down triangles
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
      <div
        style={{
          height: window.innerHeight / 1.75 + 60,
        }}
        className="flex w-screen"
      >
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

        <div className="w-[50%] flex items-center flex-col">
          <div className="h-[50%] w-[100%]" />

          <div className="h-[50%] w-[100%] flex">
            <div className="w-[60%] flex flex-col items-center px-8 gap-4">
              <img
                src="./assets/reviewer1.jpg"
                alt="Reviewier 1"
                className="object-cover h-[125px] w-[125px] rounded-full"
              />
              <p className="text-center font-inter text-[14px]">
                "Codemasons gave me the secrets to unlock my greatest and hidden
                potential."
              </p>
              <p className="text-center font-inter uppercase text-[#3D3D3D] text-[12px]">
                Jagjit Singh - 3rd Degree Codemason
              </p>
            </div>

            <div className="w-[40%]" />
          </div>
        </div>

        <div className="w-[50%]">
          <div className="h-[50%] w-[100%]" />

          <div className="h-[50%] w-[100%] flex">
            <div className="w-[40%]" />
            <div className="w-[60%] flex flex-col items-center px-8 gap-4">
              <img
                src="./assets/reviewer2.png"
                alt="Reviewier 1"
                className="object-cover h-[125px] w-[125px] rounded-full"
              />
              <p className="text-center font-inter text-[14px]">
                "I had almost given up on coding, and then I discovered
                Codemasons. Now, I am am a master. I swear, these people
                practice witchcraft"
              </p>
              <p className="text-center font-inter uppercase text-[#3D3D3D] text-[12px]">
                Anonymous
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
