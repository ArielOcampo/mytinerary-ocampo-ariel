import { Error404 } from "../../images/";
import "../../styles/error.css";

export default function Error() {
  return (
    <div className="container-error">
      <img src={Error404} alt="Error page not found" />
    </div>
  );
}
