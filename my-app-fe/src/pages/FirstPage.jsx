import ToLogin from "../components/ToLogin";
import ToRegistration from "../components/ToRegistration";
import { useEffect } from "react";
import { logout } from "../services/authService";

function FirstPage(props) {
  useEffect(() => {
    logout();
    props.setAuthStatus(false);
  }, []);

  return (
    <div className="row mb-3 align-items-center">
        <ToRegistration />
        <ToLogin />
    </div>
  );
}

export default FirstPage;