import React from "react";

const index = () => {
  const getUserToken = async (e) => {
    e.preventDefault();

    let { suppername, password } = e.target;
    console.log(suppername.value);
    let data = await fetch("http://localhost:2020/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        suppername: suppername.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => data);

    data.msg && alert(data.msg);

    if (data?.token) {
      localStorage.setItem("token", data.token)((location.href = "/allcourse"));
    }

    suppername.value = "";
    password.value = "";
  };

  return (
    <>
      <div className="container vh-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100 my-auto">
          <div className="col-lg-12 col-xl-11 ">
            <div className="card text-black ">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <form className="my-auto" onSubmit={(e) => getUserToken(e)}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example1"
                          className="form-control border-bottom"
                          name="suppername"
                        />
                        <label className="form-label" for="form2Example1">
                          Supper name
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example2"
                          className="form-control border-bottom"
                          name="password"
                        />
                        <label className="form-label" for="form2Example2">
                          Password
                        </label>
                      </div>

                      <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                          <div className="form-check ">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="form2Example31"
                              checked
                            />
                            <label
                              className="form-check-label"
                              for="form2Example31"
                            >
                              {" "}
                              Remember me{" "}
                            </label>
                          </div>
                        </div>

                        <div className="col">
                          <a href="#!">Forgot password?</a>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-4"
                      >
                        Sign in
                      </button>

                      <div className="text-center">
                        <p>
                          Not a member? <a href="/">Register</a>
                        </p>
                        <p>or sign up with:</p>
                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-google"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-link btn-floating mx-1"
                        >
                          <i className="fab fa-github"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
