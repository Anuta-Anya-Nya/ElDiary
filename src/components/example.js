import { useState } from "react";

const Child = ({ isDone, editIsDone }) => {
  return (
    <div>
      <label>{isDone.text}</label>
      <input
        type="checkbox"
        checked={isDone.isDone}
        onChange={() => {
          editIsDone(isDone.id);
        }}
      />
    </div>
  );
};

function Example() {
  const [isDone, setIsDone] = useState([
    { id: 1, text: "1", isDone: false },
    { id: 2, text: "2", isDone: true },
  ]);
  const editIsDone = (idForEdit) => {
    const newISDone = [...isDone];
    console.log(newISDone);
    const index = newISDone.findIndex((el, ind) => el.id === idForEdit);
    console.log(index);
    console.log(newISDone[index].isDone);
    newISDone[index].isDone = !newISDone[index].isDone;
    setIsDone(newISDone);
  };

  return (
    <div>
      <p>Example</p>
      {isDone.map((el, ind) => (
        <Child isDone={el} editIsDone={editIsDone} key={ind} />
      ))}
    </div>
  );
}

export default Example;
