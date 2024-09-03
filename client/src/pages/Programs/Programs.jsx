import {
  useLoaderData,
  useLocation,
  useNavigate,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom';
import { queryClient } from 'queryClient';
import Filters from 'components/Program/Filters';
import { getBootcamps } from 'service';
import ProgramList from 'components/Program/ProgramList';
import { useCallback, useEffect, useRef, useState } from 'react';
import ProgramDetails from 'components/Program/ProgramDetails';

const Programs = () => {
  const programsDivRef = useRef();
  const filtersDivRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const programs = useLoaderData();

  const [filters, setFilters] = useState({
    jobGuarantee: false,
    jobAssistance: false,
  });
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [programDivHeight, setProgramDivHeight] = useState(645);

  // select program and set program id as hash in the url
  const handleProgramSelection = useCallback(
    (programId) => {
      if (selectedProgram && programId === selectedProgram.id) return;
      setSelectedProgram(programs.find((program) => program.id === programId));
      navigate(`/programs${location.search}#${programId}`);
    },
    [navigate, selectedProgram, programs, location.search]
  );

  // select program on initial page load (does not scroll down on complete re-load)
  useEffect(() => {
    let hash = location.hash?.split('#')[1] || programs[0].id;
    handleProgramSelection(hash);
  }, [programs, location.hash, handleProgramSelection]);

  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', updateWindowHeight);

    return () => window.removeEventListener('resize', updateWindowHeight);
  }, []);

  // update div to extend to the bottom of the page
  useEffect(() => {
    if (!filtersDivRef?.current) return;

    setProgramDivHeight(
      windowHeight - filtersDivRef.current.getBoundingClientRect().bottom - 10
    );
  }, [windowHeight]);

  useEffect(() => {
    const params = {};
    if (filters.jobAssistance) params.jobAssistance = true;
    if (filters.jobGuarantee) params.jobGuarantee = true;
    setSearchParams({ ...params });
  }, [filters, setSearchParams]);

  const handleFilterClick = (filter) => {
    // flip the active status of the filter
    setFilters((filters) => ({ ...filters, [filter]: !filters[filter] }));
  };

  return (
    <div className="">
      <Filters
        filters={filters}
        ref={filtersDivRef}
        onChange={handleFilterClick}
      />
      <div
        ref={programsDivRef}
        style={{ maxHeight: programDivHeight }}
        className="flex justify-center gap-4 py-8"
      >
        <ProgramList
          programs={programs}
          onProgramClick={handleProgramSelection}
          selectedProgramId={selectedProgram?.id}
        />

        <ProgramDetails program={selectedProgram} />
      </div>
    </div>
  );
};

export const loader = async ({ params, request }) => {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());
  console.log('searchParams', searchParams);

  const bootcamps = await queryClient.fetchQuery({
    queryKey: ['bootcamps', { ...searchParams }],
    queryFn: () => getBootcamps({ limit: 10, ...searchParams }),
  });
  return bootcamps;
};

export default Programs;
