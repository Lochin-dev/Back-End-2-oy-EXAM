import React from "react";
import "./index.scss";
import Img from "../../assets/Register.png";

const index = () => {
  const getUserInfo = async (e) => {
    try {
      e.preventDefault();

      let { username, email, password, confirmEmail, file } = e.target;
      let data = await fetch("http://localhost:2020/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          confirmEmail: confirmEmail.value,
          password: password.value,
          image: file.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => data);

      alert(data?.msg);

      if (data?.msg === "User registrated") {
        location.href = "/login";
      } else {
        alert(data?.msg);
      }

      username.value = "";
      email.value = "";
      password.value = "";
      confirmEmail.value = "";
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-4">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={(e) => getUserInfo(e)}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 border-bottom">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="username"
                            />
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 border-bottom">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 border-bottom">
                            <input
                              type="text"
                              id="form3Example3c"
                              className="form-control"
                              name="confirmEmail"
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email Cinfirm
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 border-bottom">
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-file fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0 border-bottom">
                            <input
                              type="file"
                              id="form3Example4c"
                              className="form-control"
                              name="file"
                            />
                          </div>
                        </div>

                        <div className="">
                          <p>
                            Not a member? <a href="/login">Login</a>
                          </p>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img className="img-fluid" src={Img} alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
