import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Homepage = ({ bootcamps }) => {
  return (
    <>
      <div className="bg-easyWhite pb-14 grid grid-cols-1">
        {/* title and hammer */}
        <div
          className="top-[70px] w-[100%] sm:hidden border-b-2 border-[#e1e1e1] 
            flex flex-col items-center gap-8 pt-4 sm:pt-12 pb-12"
        >
          <div className="flex flex-col items-center px-8">
            <p className="text-lightBlack text-[50px] text-center">
              Become a Digital
            </p>
            <p className="text-lightBlack  text-[50px] text-center">
              Craftsman.
            </p>
          </div>
          <img
            src="./assets/hammer.png"
            alt="Codemasons Logo"
            className="w-[100px] sm:w-[0px] animate-hammer-swing sm:animate-none"
          />
        </div>

        <div
          className="flex flex-col justify-center sm:flex-row h-auto pt-4 pb-10 sm:pt-0 
          sm:mt-[0px] gap-12 sm:gap-0 border-b-2 border-[#e1e1e1] sm:border-none"
        >
          <div className="flex flex-col items-center px-8 gap-4 justify-end w-[100%] sm:w-[30%]">
            <img
              src="./assets/reviewer1.jpg"
              alt="Reviewier 1"
              className="object-cover h-[125px] w-[125px] rounded-full"
            />
            <p
              className="text-center font-inter text-[14px] sm:text-[12px] 
                      md:text-[13px] lg:text-[14px]"
            >
              "Codemasons gave me the secrets to unlock my greatest and hidden
              potential."
            </p>
            <p
              className="text-center font-inter uppercase text-[#3D3D3D] 
                      text-[12px] sm:text-[10px] md:text-[11px] lg:text-[12px]"
            >
              Jagjit Singh - 3rd Degree Codemason
            </p>
          </div>

          {/* title and hammer */}
          <div
            className="hidden sm:w-auto sm:relative sm:flex flex-col 
            items-center gap-8 sm:gap-16 md:gap-12 lg:gap-8 pt-4 sm:pt-12 
            md:pt-8 lg:pt-4 pb-12 sm:pb-0"
          >
            <div className="flex flex-col items-center px-6 sm:px-0">
              <p className="text-lightBlack  text-[50px] md:text-[60px] lg:text-[80px] text-center">
                Become a Digital
              </p>
              <p className="text-lightBlack  text-[50px] md:text-[60px] lg:text-[80px] text-center">
                Craftsman.
              </p>
            </div>
            <img
              src="./assets/hammer.png"
              alt="Codemasons Logo"
              className="w-[100px] md:w-[115px] lg:w-[130px] animate-hammer-swing"
            />
          </div>

          <div
            className="flex flex-col items-center pl-9 pr-12 gap-4 
            justify-end w-[100%] sm:w-[30%]"
          >
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
              Codemasons. Now, I am a code-magician. I swear, these people
              practice witchcraft."
            </p>
            <p
              className="text-center font-inter uppercase text-[#3D3D3D] 
                      text-[12px] sm:text-[10px] md:text-[11px] lg:text-[12px]"
            >
              Anonymous
            </p>
          </div>
        </div>

        <div className="pt-12 sm:pt-10 px-8 sm:px-0 flex justify-center">
          <div className="sm:w-[45%]">
            <p className="font-inter text-center text-[24px] md:text-[36px] font-medium italic">
              We don't just create programmers, we create{' '}
              <span className="text-themeOrange">digital craftsmen</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black w-[100%] flex items-center flex-col">
        <div className="py-12 max-w-[1000px] flex flex-col items-center px-8">
          <p className="text-center font-kellySlab text-white text-[18px]">
            Codemasons
          </p>
          <p className="font-inter text-4xl text-easyWhite text-center mt-10">
            Our programs equip you with the{' '}
            <span className="text-themeBlue">knowledge</span> and{' '}
            <span className="text-themeBlue">tools</span> to make{' '}
            <span className="text-themeBlue">magic</span> happen...
          </p>

          <div className="grid justify-center lg:grid-cols-2 mt-16 gap-y-14 w-[100%] gap-x-8">
            {bootcamps.map((bootcamp) => (
              <div className="max-w-[450px] h-auto pb-4 bg-white rounded-[25px] border-2 border-[#8c8c8c]">
                <img
                  src={bootcamp.photo}
                  alt="Bootcamp"
                  className="w-[455px] h-[150px] rounded-t-[25px] object-cover"
                />
                <div className="pt-4 px-4">
                  <div className="flex justify-between items-end flex-wrap">
                    <p className="font-cairo font-semibold text-2xl">
                      {bootcamp.name}
                    </p>
                    <p className="font-cairo text-[#505050] text-[15px]">
                      Average Cost: ${bootcamp.averageCost}
                    </p>
                  </div>

                  <p className="font-cairo mt-2">{bootcamp.description}</p>

                  <div className="flex justify-end mt-4">
                    <button
                      className="rounded-[15px] w-[90px] h-[45px] bg-lightBlack 
                      hover:bg-[#383838] flex items-center justify-center"
                    >
                      <p className="text-white uppercase">Details</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white font-kellySlab text-3xl text-center mt-20">
            Start exploring and begin your journey of becoming a{' '}
            <span className="text-themeBlue">Codemason</span>
          </p>

          <div className="flex justify-center mt-12">
            <NavLink to="/programs">
              <button
                className="rounded-lg w-[120px]  h-[55px] bg-white 
                      flex items-center justify-center hover:bg-[#e6e6e6]"
              >
                <p className="text-lightBlack uppercase">Explore</p>
              </button>
            </NavLink>
          </div>
        </div>

        <div
          className="w-[100%] py-10 font-cairo text-[#7d7d7d] text-center 
          text-[14px] font-semibold px-8 border-t-[1px] border-[#292929]"
        >
          <p className="">Copyright @ 2024, Codemasons.</p>
          <p>Codemasons is licensed by the Accepted Rite of Codemasonry.</p>
        </div>
      </div>
    </>
  );
};

export default Homepage;
