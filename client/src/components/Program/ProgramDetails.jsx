const ProgramDetails = ({ program }) => {
  if (!program) return null;

  return (
    <div className="sm:min-w-[600px] sm:max-w-[800px] max-h-screen bg-lightBlack">
      <img
        src={program.photo}
        alt=""
        className="w-[100%] h-[200px] object-cover"
      />

      <div className="px-8 py-6">
        <p className="text-4xl text-white font-cairo">{program.name}</p>
      </div>
    </div>
  );
};

export default ProgramDetails;
