import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // CSS 파일을 import합니다.

const Login = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [loginInputs, setLoginInputs] = useState({ email: "", password: "" });
  const [registerInputs, setRegisterInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginInputs((prev) => ({ ...prev, [name]: value }));
    } else if (formType === "register") {
      setRegisterInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = registerInputs;

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.email === email);

    if (userExists) {
      setError("이미 존재하는 사용자입니다.");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setError(null);
    toggleForm();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginInputs;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setError(null);
      navigate("/"); // 로그인 성공 시 홈 화면으로 이동
    } else {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="container">
      <div className="bg-image"></div>

      {/* 로그인 폼 */}
      <div className={`card ${!isLoginVisible ? "hidden" : ""}`} id="login">
        <form onSubmit={handleLogin}>
          <h1>로그인</h1>
          <div className="input">
            <input
              type="text"
              name="email"
              value={loginInputs.email}
              onChange={(e) => handleInputChange(e, "login")}
              required
            />
            <label className={loginInputs.email ? "label-active" : ""}>
              이메일
            </label>
          </div>
          <div className="input">
            <input
              type="password"
              name="password"
              value={loginInputs.password}
              onChange={(e) => handleInputChange(e, "login")}
              required
            />
            <label className={loginInputs.password ? "label-active" : ""}>
              비밀번호
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="checkbox">
            <div className="remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">아이디와 비밀번호 기억하기</label>
            </div>
            <div className="forgot">
              <a href="#">비밀번호 찾기</a>
            </div>
          </div>
          <button type="submit">로그인</button>
        </form>
        {/* .account-check 요소를 폼 외부로 이동 */}
        <p className="account-check" onClick={toggleForm}>
          이미 계정이 있으신가요? <span>로그인</span>
        </p>
      </div>

      {/* 회원가입 폼 */}
      <div className={`card ${isLoginVisible ? "hidden" : ""}`} id="register">
        <form onSubmit={handleRegister}>
          <h1>회원가입</h1>
          <div className="input">
            <input
              type="text"
              name="name"
              value={registerInputs.name}
              onChange={(e) => handleInputChange(e, "register")}
              required
            />
            <label className={registerInputs.name ? "label-active" : ""}>
              이름
            </label>
          </div>
          <div className="input">
            <input
              type="email"
              name="email"
              value={registerInputs.email}
              onChange={(e) => handleInputChange(e, "register")}
              required
            />
            <label className={registerInputs.email ? "label-active" : ""}>
              이메일
            </label>
          </div>
          <div className="input">
            <input
              type="password"
              name="password"
              value={registerInputs.password}
              onChange={(e) => handleInputChange(e, "register")}
              required
            />
            <label className={registerInputs.password ? "label-active" : ""}>
              비밀번호
            </label>
          </div>
          <div className="input">
            <input
              type="password"
              name="confirmPassword"
              value={registerInputs.confirmPassword}
              onChange={(e) => handleInputChange(e, "register")}
              required
            />
            <label
              className={
                registerInputs.confirmPassword ? "label-active" : ""
              }
            >
              비밀번호 확인
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">회원가입</button>
        </form>
        {/* .account-check 요소를 폼 외부로 이동 */}
        <p className="account-check" onClick={toggleForm}>
           계정이 없으신가요? <span>회원가입</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
