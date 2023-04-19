import { React, useState } from "react";

const index = () => {
  const [load, setload] = useState(false);
  const [Update, setUpdate] = useState({
    bool: false,
  });

  const updateFunc = async (e, id) => {
    e.preventDefault();
    let { title, price } = e.target;
    await fetch(`http://localhost:2020/courses/${id}`, {
      method: "PUT",
      headers: {
        "Copntent-Type": "application/json",
        token: localStorage.getItem("token"),
        title: title.value,
        price: price.value,
      },
      body: JSON.stringify({
        title: title.value,
        price: price.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.msg);
        setload(!load);
        setUpdate(!Update.bool);
      });
    (title.value = ""), (price.value = "");
  };

  const OnValue = (e) => {
    setUpdate({ ...Update, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Update
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={(e) => updateFunc(e, Update.id)}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0 border-bottom">
                            <input
                              onChange={OnValue}
                              type="text"
                              name="title"
                              class="form-control"
                              value={Update.title}
                            />
                            <label className="form-label" for="form3Example1c">
                              Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0 border-bottom">
                            <input
                              onChange={OnValue}
                              type="text"
                              name="price"
                              class="form-control"
                              value={Update.price}
                            />
                            <label className="form-label" for="form3Example3c">
                              Price
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            onClick={() => (location.href = "/courses")}
                          >
                            Update
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
      </section>
    </>
  );
};

export default index;
