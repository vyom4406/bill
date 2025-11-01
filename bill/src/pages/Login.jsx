import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await loginUser({ email, password }).unwrap();
      if (response.token) {
        dispatch(setCredentials({ token: response.token }));
        navigate("/invoice");
      } else {
        setErrorMsg("Invalid email or password");
      }
    } catch (err) {
      setErrorMsg("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "24rem", borderRadius: "12px" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Welcome Back</h2>
        <p className="text-center text-muted mb-4">Sign in to continue</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <div className="alert alert-danger py-2" role="alert">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">Forgot your password?</small>
        </div>
      </div>
    </div>
  );
}
