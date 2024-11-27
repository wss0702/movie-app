import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast.js";

const Login = () => {
  const { login, register: registerUser } = useAuth();
  const toast = useToast();
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const navigate = useNavigate();

  // 로그인 폼을 위한 useForm
  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm();
  
  // 회원가입 폼을 위한 useForm
  const { register: registerRegister, handleSubmit: handleRegisterSubmit, formState: { errors: registerErrors } } = useForm();

  const toggleForm = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const onLoginSubmit = (data) => {
    try {
      login(data.email, data.password, data.remember);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onRegisterSubmit = (data) => {
    try {
      registerUser(data.email, data.password, data.confirmPassword, data.name);
      toast.success("회원가입 성공");
      toggleForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <div className="bg-image"></div>

      {/* 로그인 폼 */}
      <div className={`card ${!isLoginVisible ? "hidden" : ""}`} id="login">
        <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
          <h1>로그인</h1>
          <div className="input">
            <input
              type="text"
              {...registerLogin("email", { required: true })}
            />
            <label className={watchLogin("password") || loginErrors.password ? "label-active" : ""}>
              이메일
            </label>
          </div>
          <div className="input">
            <input
              type="password"
              {...registerLogin("password", { required: true })}
            />
            <label className={watchLogin("password") || loginErrors.password ? "label-active" : ""}>
              비밀번호
            </label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="remember-me"
              {...registerLogin("remember")}
            />
            <label htmlFor="remember-me" className="checkbox-label">
              아이디와 비밀번호 기억하기
            </label>
          </div>
          <div className="forgot">
            <a href="#">기억하기
            </a>
          </div>
          <button type="submit">로그인</button>
        </form>
        <p className="account-check" onClick={toggleForm}>
          이미 계정이 있으신가요? <span>로그인</span>
        </p>
      </div>

      {/* 회원가입 폼 */}
      <div className={`card ${isLoginVisible ? "hidden" : ""}`} id="register">
        <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
          <h1>회원가입</h1>
          <div className="input">
            <input
              type="text"
              {...registerRegister("name", { required: true })}
            />
            <label className={registerErrors.name ? "label-active" : ""}>
              이름
            </label>
          </div>
          <div className="input">
            <input
              type="email"
              {...registerRegister("email", { required: true })}
            />
            <label className={registerErrors.email ? "label-active" : ""}>
              이메일
            </label>
          </div>
          <div className="input">
            <input
              type="password"
              {...registerRegister("password", { required: true })}
            />
            <label className={registerErrors.password ? "label-active" : ""}>
              비밀번호
            </label>
          </div>
          <div className="input">
            <input
              type="password"
              {...registerRegister("confirmPassword", { required: true })}
            />
            <label className={registerErrors.confirmPassword ? "label-active" : ""}>
              비밀번호 확인
            </label>
          </div>
          <button type="submit">회원가입</button>
        </form>
        <p className="account-check" onClick={toggleForm}>
           계정이 없으신가요? <span>회원가입</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
