const Tag = ({ text, imgSize = 20, imgSrc, imgAlt = 'None' }) => {
  return (
    <div className="flex gap-x-3 items-center">
      <img
        style={{ width: imgSize, height: imgSize }}
        src={imgSrc}
        alt={imgAlt}
        className="h-[20px] w-[20px]"
      />
      <p className="text-gray-200 font-cairo">{text}</p>
    </div>
  );
};

export default Tag;
