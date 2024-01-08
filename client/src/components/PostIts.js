import classes from "./PostIts.module.css";

const PostIts = ({ defaultValue, values, onRemove }) => {
  const removeCareerHandler = (value) => {
    onRemove(value);
  };

  return (
    <div className={classes.container}>
      {values.length === 0 && <p>{defaultValue}</p>}
      {values.length > 0 && (
        <div className={classes.postIts}>
          {values.map((value) => (
            <div key={value} className={classes.postIt}>
              <p>{value}</p>
              <p
                className={classes.cross}
                onClick={() => removeCareerHandler(value)}
              >
                X
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostIts;
