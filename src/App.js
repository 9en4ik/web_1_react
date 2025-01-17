import React from "react";
import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/layout/header";
import AddTodo from "./components/addTodo";

class App extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        title: "Вынести мусор",
        completed: false
      },
      {
        id: 2,
        title: "Встреча с родственниками",
        completed: true
      },
      {
        id: 3,
        title: "Совещание на работе",
        completed: false
      }
    ]
  };
  // Toggle complete
  markComplete = id => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };

  delTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    });
  };

  addTodo = (title, duration) => {
    if ((title === "") | (duration === "")) {
      alert("Enter todo");
    } else {
      const len = this.state.todos.length;
      const newTodo = {
        id: len + 1,
        title: title,
        duration: duration,
        completed: false
      };
      this.setState(
        {
          todos: [...this.state.todos, newTodo].sort((a, b) =>
            a.duration > b.duration ? 1 : -1
          )
        },
        () => {
          this.todosCopy = this.state.todos;
          localStorage.setItem("List", JSON.stringify(this.state.todos));
        }
      );
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
