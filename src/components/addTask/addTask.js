import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "./addTask.css";

export default function AddTesk(props) {
  const [textTesk, setTextTesk] = useState("");

  function addNewTesk() {
    if (textTesk.length !== 0) {
      fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
          title: textTesk,
          completed: false,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          props.onAdd(data);
        });
      setTextTesk("");
    }
  }
  return (
    <div className="addTeskContainer">
      <input
        type="text"
        className="inputAddNewTask"
        placeholder="write a new task..."
        value={textTesk}
        onChange={(e) => setTextTesk(e.target.value)}
      />
      <FontAwesomeIcon
        className="iconPlus"
        icon={faPlusCircle}
        onClick={addNewTesk}
      />
    </div>
  );
}
