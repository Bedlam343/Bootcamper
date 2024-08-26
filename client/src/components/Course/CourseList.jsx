import { useState } from 'react';

const CourseList = ({ courses }) => {
  const [expandedCoursesIds, setExpandedCoursesIds] = useState({});

  const handleCourseClick = (courseId) => {
    setExpandedCoursesIds((expanded) => ({
      ...expanded,
      [courseId]: !expanded[courseId],
    }));
  };

  return (
    <>
      {courses.map((course, index) => (
        <div className="flex w-[100%] gap-4 justify-center items-center">
          <div
            onClick={() => handleCourseClick(course._id)}
            className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center
                    hover:cursor-pointer group"
          >
            <img
              src={`./assets/${
                expandedCoursesIds[course._id] ? 'minus' : 'plus'
              }.png`}
              alt="Plus"
              className="w-[25px] h-[25px] group-hover:w-[30px] group-hover:h-[30px]"
            />
          </div>

          <div
            onClick={() => handleCourseClick(course._id)}
            className={`flex flex-col bg-gray-800 
                    rounded-[10px] flex-1 hover:cursor-pointer ${
                      expandedCoursesIds[course._id]
                        ? 'border-4 border-white'
                        : ''
                    }`}
          >
            <div className="flex justify-between items-center px-4 py-2">
              <p className="text-white">{course.title}</p>
              <div className="bg-white w-[30px] h-[30px] rounded-full flex items-center justify-center">
                {index + 1}
              </div>
            </div>

            {expandedCoursesIds[course._id] && (
              <div className="border-t-2 border-gray-600 px-4 py-6">
                <p className="text-white">{course.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CourseList;
