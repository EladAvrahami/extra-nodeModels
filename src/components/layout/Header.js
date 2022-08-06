import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { LogOutAuthAction } from "../../redux/actions/AuthAction";
import ErrorHandler from "../error/ErrorHandler";

function Header(props) {
  const { auth, logout, errorHandler } = props;
  const history = useHistory();
  return (
    <div className="header d-flex justify-content-center py-3 shadow-sm">
      <ErrorHandler
        errorHandler={errorHandler || { hasError: false, message: "" }}
      />
      <Link to="/">
        <h3 className=" logo font-weight-bold text-primary mx-3">Coupon System</h3>
      </Link>
      <div className="ml-auto d-flex">
        {!auth.isLoggedIn ? (
          <React.Fragment>
            <Link to="./login">
              <button className="btn btn-primary btn-s mx-2">Login</button>
            </Link>
            <Link to="./register">
              <button className="btn btn-primary btn-s mr-3">SignUp</button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h5>{auth.user.name}</h5>
            <button
              className="btn btn-danger btn-sm mx-2"
              onClick={() => {
                logout(history);
              }}
            >
              Log Out
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => {
      dispatch(LogOutAuthAction(history));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
