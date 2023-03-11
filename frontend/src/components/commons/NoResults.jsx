import { NoResultsImage } from "../../images/";
import "../../styles/noresults.css";

const NoResults = () => {
  return (
    <div className="container-noresults">
      <div>
        <p className="text-noresults">Sorry no cities were found</p>
        <img src={NoResultsImage} alt="Not found results" />
      </div>
    </div>
  );
};
export default NoResults;