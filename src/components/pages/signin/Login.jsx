import React, { useState } from "react";
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

  return (
    <div className="container">
      <div className="bg-image"></div>
      {/* 로그인 폼 */}
      <div className={`card ${!isLoginVisible ? "hidden" : ""}`} id="login">
        <form>
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
          <div className="checkbox-container">
            <div className="remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">기억하기</label>
            </div>
            <div className="forgot">
              <a href="#">비밀번호 찾기</a>
            </div>
          </div>
          <button type="submit">로그인</button>
          <p className="account-check" onClick={toggleForm}>
            회원가입
          </p>
        </form>
      </div>

      {/* 회원가입 폼 */}
      <div className={`card ${isLoginVisible ? "hidden" : ""}`} id="register">
        <form>
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
              className={registerInputs.confirmPassword ? "label-active" : ""}
            >
              비밀번호 확인
            </label>
          </div>
          <button type="submit">회원가입</button>
          <p className="account-check" onClick={toggleForm}>
            로그인
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
