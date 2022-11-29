import "../todoAction/todoAction.css";

export default function TodoAction(props) {
  return (
    <div>
      <button
        type=""
        className="actionButton"
        onClick={() => props.filter("active")}
      >
        Active task
      </button>
      <button type="" className="actionButton" onClick={() => props.filter("")}>
        All task
      </button>
      <button
        type=""
        className="actionButton"
        onClick={() => props.filter("completed")}
      >
        Completed task
      </button>
    </div>
  );
}
