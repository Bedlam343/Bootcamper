import { NavLink } from "react-router-dom";

import Background from "../util/UI/Background";
import Card from "../util/UI/Card";
import Button from "../util/UI/Button";
import classes from "./WelcomePage.module.css";

const WelcomePage = () => {
  return (
    <Background>
      <h1 className={classes.title}>
        Welcome to <span>SkilledCoders</span>
      </h1>
      <div className={classes.top}>
        <Card>
          <div className={classes.mission}>
            <h2>Our Mission:</h2>
            <h3>
              To help coders across the globe flourish by providing them{" "}
              <span>easy</span> and
              <span> affordable</span> access to new knowledge.
            </h3>
          </div>
        </Card>
      </div>
      <div className={classes.featureContainer}>
        <h2>
          Classes are <span>online</span> and <span>self-paced</span>.
        </h2>
        <div className={classes.features}>
          <div className={classes.feature}>
            <img
              src="/assets/images/programmingLanguages.jpg"
              alt=""
              className={classes.image}
            />
            <h4>Choose a topic of your interest.</h4>
          </div>
          <div className={classes.feature}>
            <img
              src="/assets/images/workFromHome.jpg"
              alt=""
              className={classes.image}
            />
            <h4>Learn on your own schedule.</h4>
          </div>
          <div className={classes.feature}>
            <img
              src="/assets/images/collaborate.png"
              alt=""
              className={classes.image}
            />
            <h4>Collaborate with other students.</h4>
          </div>
          <div className={classes.feature}>
            <div className={classes.certifiedContainer}>
              <img
                src="/assets/images/certify.jpg"
                alt=""
                className={classes.certified}
              />
            </div>
            <h4>Get Certified!</h4>
          </div>
        </div>
      </div>
      <div className={classes.bottom}>
        <h2>Explore our bootcamps.</h2>
        <NavLink to="/bootcamps">
          <Button>Explore</Button>
        </NavLink>
      </div>
    </Background>
  );
};

export default WelcomePage;
