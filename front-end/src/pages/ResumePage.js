import { Link } from "react-router-dom";

import Header from "../containers/Header/Header";
import ResumeTable from "../containers/ResumeTable/ResumeTable";
import H1 from "../components/H1/H1";
import Button from "../components/Button/Button";

const ResumePage = ({ resumeList, resumeNum }) => {
  return (
    <section>
      <Header />
      <Link to={"/adding"}>
        <Button className="add-task-button base-button" text="+" />
      </Link>
      <H1 text={`Current Balance: ${resumeNum}`} />
      <ResumeTable resumeList={resumeList} />
    </section>
  );
};

export default ResumePage;
