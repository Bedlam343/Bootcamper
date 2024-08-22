import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import drawTriangle from 'components/utils/drawTriangle';
import clearTriangle from './utils/clearTriangle';

const Homepage = ({ bootcamps }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const triangleSize1Ref = useRef();
  const triangleSize2Ref = useRef();
  const triangleSize3Ref = useRef();
  const triangleSize4Ref = useRef();

  // update state when window size changes
  useEffect(() => {
    const updateWindowWith = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWith);

    return () => window.removeEventListener('resize', updateWindowWith);
  }, []);

  // draw 4 upside-down triangles
  useEffect(() => {
    if (windowWidth < 640) {
      // delete triangles if screen width is small
      clearTriangle(triangleSize1Ref);
      clearTriangle(triangleSize2Ref);
      clearTriangle(triangleSize3Ref);
      clearTriangle(triangleSize4Ref);
      return;
    }

    const drawTriangles = () => {
      drawTriangle(triangleSize1Ref, 500, '#1E1E1E');
      drawTriangle(triangleSize2Ref, 520, '#595959');
      drawTriangle(triangleSize3Ref, 540, '#969696');
      drawTriangle(triangleSize4Ref, 560, '#D6D5D5');
    };

    drawTriangles();
  }, [windowWidth]);

  return (
    <>
      <div className="bg-easyWhite pb-14">
        {/* Upside-down triangles */}
        <div className="border-b-2 border-gray-300 sm:border-none">
          <canvas ref={triangleSize4Ref} className="block absolute" />
          <canvas ref={triangleSize3Ref} className="block absolute" />
          <canvas ref={triangleSize2Ref} className="block absolute" />
          <canvas ref={triangleSize1Ref} className="block absolute" />

          {/* Title and Hammer */}
          <div
            className="sm:absolute sm:w-full flex flex-col items-center gap-8 
            sm:gap-16 md:gap-12 lg:gap-8 pt-4 sm:pt-12 md:pt-8 lg:pt-4 pb-12 sm:pb-0"
          >
            <div className="flex flex-col items-center px-6 sm:px-0">
              <p className="text-lightBlack sm:text-easyWhite text-[50px] md:text-[60px] lg:text-[80px] text-center">
                Become a Digital
              </p>
              <p className="text-lightBlack sm:text-easyWhite text-[50px] md:text-[60px] lg:text-[80px] text-center">
                Craftsman.
              </p>
            </div>
            <img
              src="./assets/hammer.png"
              alt="Codemasons Logo"
              className="w-[100px] md:w-[115px] lg:w-[130px] animate-hammer-swing"
            />
          </div>
        </div>

        {/* Reviews */}
        {windowWidth >= 640 ? (
          <>
            <div className="flex h-[560px]">
              <div className="w-[50%] flex items-center flex-col">
                <div className="h-[50%] w-[100%]" />

                <div className="h-[50%] w-[100%] flex">
                  <div className="w-[60%] flex flex-col items-center px-8 gap-4">
                    <img
                      src="./assets/reviewer1.jpg"
                      alt="Reviewier 1"
                      className="object-cover h-[125px] w-[125px] rounded-full"
                    />
                    <p
                      className="text-center font-inter text-[14px] sm:text-[12px] 
                      md:text-[13px] lg:text-[14px]"
                    >
                      "Codemasons gave me the secrets to unlock my greatest and
                      hidden potential."
                    </p>
                    <p
                      className="text-center font-inter uppercase text-[#3D3D3D] 
                      text-[12px] sm:text-[10px] md:text-[11px] lg:text-[12px]"
                    >
                      Jagjit Singh - 3rd Degree Codemason
                    </p>
                  </div>

                  <div className="w-[40%]" />
                </div>
              </div>

              <div className="w-[50%] flex items-center flex-col">
                <div className="h-[50%] w-[100%]" />

                <div className="h-[50%] w-[100%] flex">
                  <div className="w-[40%]" />
                  <div className="w-[60%] flex flex-col items-center pl-9 pr-12 gap-4">
                    <img
                      src="./assets/reviewer2.png"
                      alt="Reviewier 1"
                      className="object-cover h-[125px] w-[125px] rounded-full"
                    />
                    <p
                      className="text-center font-inter text-[14px] sm:text-[12px] 
                      md:text-[13px] lg:text-[14px]"
                    >
                      "I had almost given up on coding, and then I discovered
                      Codemasons. Now, I am a code-magician. I swear, these
                      people practice witchcraft."
                    </p>
                    <p
                      className="text-center font-inter uppercase text-[#3D3D3D] 
                      text-[12px] sm:text-[10px] md:text-[11px] lg:text-[12px]"
                    >
                      Anonymous
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col py-10 pb-4 gap-8">
            <div className="flex flex-col items-center px-8 gap-4">
              <img
                src="./assets/reviewer1.jpg"
                alt="Reviewier 1"
                className="object-cover h-[125px] w-[125px] rounded-full"
              />
              <p className="text-center font-inter text-[14px] text-lightBlack">
                "Codemasons gave me the secrets to unlock my greatest and hidden
                potential."
              </p>
              <p className="text-center font-inter uppercase text-[#3D3D3D] text-[12px]">
                Jagjit Singh - 3rd Degree Codemason
              </p>
            </div>

            <div className="flex flex-col items-center px-8 gap-6">
              <img
                src="./assets/reviewer2.png"
                alt="Reviewier 1"
                className="object-cover h-[125px] w-[125px] rounded-full"
              />
              <p className="text-center font-inter text-[14px] text-lightBlack">
                "I had almost given up on coding, and then I discovered
                Codemasons. Now, I am a code-magician. I swear, these people
                practice witchcraft."
              </p>
              <p className="text-center font-inter uppercase text-[#3D3D3D] text-[12px]">
                Anonymous
              </p>
            </div>
          </div>
        )}

        <div className="pt-10 px-6 sm:px-0 sm:mt-14 sm:pt-0 flex justify-center">
          <div className="sm:w-[45%]">
            <p className="font-inter text-center text-[24px] md:text-[36px] font-medium italic">
              We don't just create programmers, we create{' '}
              <span className="text-themeOrange">digital craftsmen</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-lightBlack w-[100%] py-12 text-[18px]">
        <p className="text-center font-kellySlab text-white">Codemasons</p>
      </div>
    </>
  );
};

export default Homepage;
