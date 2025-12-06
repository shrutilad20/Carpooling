import { Link } from "react-router-dom";


const RoleSelection = () => {
  return (
    <div className="role-container">
      <h2>Select Your Role</h2>

      <div className="role-buttons">
        <Link to="/signup?role=passenger">
          <button className="btn-primary">Passenger</button>
        </Link>

        <Link to="/signup?role=driver">
          <button className="btn-secondary">Driver</button>
        </Link>
      </div>
    </div>
  );
};

export default RoleSelection;
