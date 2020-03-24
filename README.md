# use-refimmer

A hook to use [immer](https://github.com/mweststrate/immer) with React.useRef.

# Installation

`npm install immer use-refimmer`

# API

## useRefImmer

`useRefImmer(initialState)` 可以帮助你缓存当前的值

Example: https://codesandbox.io/s/react-typescript-3ls8r?fontsize=14&hidenavigation=1&theme=dark

```javascript
import React from "react";
import { useImmer } from "use-immer";

function App() {
  const [usersRef, setUsers] = useRefImmer([]);

  React.useEffect(() => {
    const handleClick = () => {
      const ramdomId = parseInt(String(Math.random() * 10), 10);
      const mockPerson = {
        name: "foo" + ramdomId,
        id: ramdomId
      };

      const index = usersRef.current.findIndex(
        (user: UserType) => user.id === mockPerson.id
      );
      if (index < 0) {
        setUsers((draft: Array<UserType>) => {
          draft.push(mockPerson);
        });
      } else {
        setUsers((draft: Array<UserType>) => {
          draft[index] = mockPerson;
        });
      }
    };
    const btn = document.getElementById("btn2");
    if (btn) {
      btn.addEventListener("click", handleClick);
    }
  },[]);

  return (
    <div>
      <button id="btn2">Add user</button>
      {usersRef.current.map((item: UserType) => (
        <div id={String(item.id)} key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```