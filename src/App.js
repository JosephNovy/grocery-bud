import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isediting, setIsediting] = useState(false);
  const [editid, setEditid] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showalert(true, "danger", "please enter value");
    } else if (name && isediting) {
      setList(
        list.map((item) => {
          if (item.id === editid) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditid(null);
      setIsediting(false);
      showalert(true, "success", "value changed");
    } else {
      showalert(true, "success", "item added to the list");
      const newitem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newitem]);
      setName("");
    }
  };

  const showalert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearlist = () => {
    showalert(true, "danger", "empty list");
    setList([]);
  };
  const removeitem = (id) => {
    showalert(true, "danger", "item removed from the list");
    setList(list.filter((item) => item.id !== id));
  };
  const edititem = (id) => {
    const especificitem = list.find((item) => item.id === id);
    setIsediting(true);
    setEditid(id);
    setName(especificitem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removealert={showalert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button type="submit" className="submit-btn">
            {isediting ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeitem={removeitem} edititem={edititem} />
          <button className="clear-btn" onClick={clearlist}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
