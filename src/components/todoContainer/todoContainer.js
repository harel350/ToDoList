import { useState, useEffect } from "react";
import AddTesk from "../addTask/addTask";
import ToDoTesk from "../todoTask/todoTask";
import TodoAction from "../todoAction/todoAction";

import "../todoContainer/todoContainer.css";

export default function ToDoContainer(props) {
  const [itemsData, setItemsData] = useState([]);
  const [filter, setFilter] = useState(""); // option : all, active, completed
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((resData) => resData.json())
      .then((data) => {
        data.splice(10, data.length);
        console.log(data);
        setItemsData(data);
      });
  }, []);
  function onAddHandle(newTesk) {
    let lastIdExsist = itemsData.reduce(
      (a, b) => {
        return Math.max(a, b.id);
      },
      [1]
    );
    newTesk.id = lastIdExsist + 1;
    let newItemsData = [...itemsData];
    newItemsData.push(newTesk);
    setItemsData(newItemsData);
    console.log(newTesk);
  }
  function onDeleteHandle(itemToDelete) {
    let deletedItemsData = [...itemsData];
    fetch(`https://jsonplaceholder.typicode.com/todos/${itemToDelete.id}`, {
      method: "DELETE",
    }).then(() => {
      deletedItemsData = deletedItemsData.filter(
        (item) => item.id !== itemToDelete.id
      );
      setItemsData(deletedItemsData);
    });
  }
  function onCompletedHandle(itemCompleted) {
    let allTeskItem = [...itemsData];
    let indexOfNewTaskCompleted = allTeskItem.findIndex(
      (item) => item.id === itemCompleted.id
    );
    allTeskItem[indexOfNewTaskCompleted].completed =
      !allTeskItem[indexOfNewTaskCompleted].completed;
  }
  function onChangeFilterHandle(filterName) {
    setFilter(filterName);
  }

  return (
    <div>
      <div className="container">
        <div className="todoContainer">
          <div className="headerContainer">
            <h1>To-Do-List</h1>
            <i>{props.theam}</i>
          </div>
          <div className="addNewTaskContainer">
            <AddTesk onAdd={onAddHandle} />
          </div>
          <div className="listTaskContainer">
            {itemsData
              .filter((item) => {
                if (filter === "") return item;
                if (filter === "active") return !item.completed;
                if (filter === "completed") return item.completed;
                return false;
              })
              .map((item) => {
                return (
                  <ToDoTesk
                    key={item.id}
                    data={item}
                    onCompleted={() => onCompletedHandle(item)}
                    onDelete={() => onDeleteHandle(item)}
                  />
                );
              })}
          </div>
          <div className="actionlistContainer">
            <TodoAction filter={onChangeFilterHandle} />
          </div>
        </div>
      </div>
    </div>
  );
}
