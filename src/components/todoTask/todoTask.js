import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./todoTask.css";

export default function ToDoTesk(props) {
  const { data } = props;
  const [checked, setChecked] = useState(data.completed);

  function onCheckCompleted() {
    props.onCompleted();
    setChecked(!checked);
  }
  return (
    <div className="taskContainer">
      
        <input
          type="checkbox"
          name=""
          value={checked}
          onChange={onCheckCompleted}
          checked={checked}
        />
        <p style={{ textDecoration: checked ? "line-through" : "none",textAlign:'start' }}>
          {data.title}
        </p>
     

      <FontAwesomeIcon className="iconTrash" icon={faTrash} onClick={() => props.onDelete()} />
    </div>
  );
}
