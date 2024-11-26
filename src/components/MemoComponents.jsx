
import React, { useState, useCallback, memo, useEffect } from 'react';
import '../styles/memo-styles.css';


const ChildComponent = memo(({ value, onIncrement }) => {
  console.log("Child Component Rendered");
  return (
    <div className="memo-child">
      <p>Child Value: {value}</p>
      <button onClick={onIncrement}>Increment Child</button>
    </div>
  );
});

const ParentComponent = () => {
  const [parentValue, setParentValue] = useState(0);
  const [childValue, setChildValue] = useState(0);

  
  const handleChildIncrement = useCallback(() => {
    setChildValue(prev => prev + 1);
  }, []);

  return (
    <div className="memo-parent">
      <h3>Parent-Child Memo Example</h3>
      <p>Parent Value: {parentValue}</p>
      <button onClick={() => setParentValue(prev => prev + 1)}>
        Increment Parent
      </button>
      <ChildComponent 
        value={childValue} 
        onIncrement={handleChildIncrement}
      />
    </div>
  );
};


const ListItem = memo(({ item }) => {
  console.log(`ListItem ${item} rendered`);
  return <li className="list-item">{item}</li>;
});

const OptimizedList = memo(({ items }) => {
  console.log("List rendered");
  return (
    <ul className="optimized-list">
      {items.map((item, index) => (
        <ListItem key={index} item={item} />
      ))}
    </ul>
  );
});

const CounterWithList = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(['Item 1', 'Item 2', 'Item 3']);

  return (
    <div className="counter-list">
      <h3>Counter with Optimized List</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment Counter
      </button>
      <OptimizedList items={items} />
    </div>
  );
};


const heavyCalculation = (number) => {
  console.log("Performing heavy calculation");
  
  let result = 0;
  for (let i = 1; i <= number; i++) {
    result += Math.sqrt(i);
  }
  return result.toFixed(2);
};

const HeavyCalculationComponent = memo(({ number }) => {
  const result = heavyCalculation(number);
  
  return (
    <div className="heavy-calc">
      <h3>Heavy Calculation</h3>
      <p>Input Number: {number}</p>
      <p>Result: {result}</p>
    </div>
  );
});


const TodoItem = memo(({ todo, onToggle }) => {
  console.log(`Todo ${todo.id} rendered`);
  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      onClick={() => onToggle(todo.id)}
    >
      <input 
        type="checkbox" 
        checked={todo.completed} 
        readOnly 
      />
      <span>{todo.text}</span>
    </li>
  );
});

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Practice Memo', completed: false },
    { id: 3, text: 'Build Projects', completed: false }
  ]);

  const handleToggle = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  return (
    <div className="todo-container">
      <h3>Memoized Todo List</h3>
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </div>
  );
};


const StaticContent = memo(() => {
  console.log("Static content rendered");
  return (
    <div className="static-content">
      <h3>Static Header</h3>
      <p>This content won't re-render unnecessarily</p>
    </div>
  );
});

const LiveTimeComponent = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="live-time">
      <StaticContent />
      <div className="time-display">
        Current Time: {time.toLocaleTimeString()}
      </div>
    </div>
  );
};


export {
  ParentComponent,
  CounterWithList,
  HeavyCalculationComponent,
  TodoList,
  LiveTimeComponent
};