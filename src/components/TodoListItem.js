import {EventEmitter} from "./EventEmitter";

export class TodoListItem extends EventEmitter {
  static _template = document.querySelector('#todolist-item-template').content;

  constructor(todo, api) {
    super();
    this._todo = todo;
    this._createTaskListeners = [];
    this._api = api;
  }

  onCreateTask(fn) {
    this._createTaskListeners.push(fn);
  }

  _delClickHandler = () => {
    this._api
      .deleteTask(this._todo.id)
      .then(() => {
        this._view.remove();
      })
      .catch((err) => {
        console.log('Ошибка при удалении задания', err);
      });
  };

  _copyClickHandler = () => {
    this._api
      .createTask({
        name: this._todo.name,
      })
      .then((res) => {
        this._emit('createTask', res);
      })
      .catch((err) => {
        console.log('Ошибка при копировании задания', err);
      });
  };

  render = (container) => {
    this._view = TodoListItem._template.cloneNode(true).children[0];
    const todoText = this._view.querySelector('.todolist-item__text');
    todoText.textContent = this._todo.name;
    todoText.dataset.todoId = this._todo.id;
    this._view.querySelector('.todolist-item__del').addEventListener('click', this._delClickHandler);
    this._view.querySelector('.todolist-item__copy').addEventListener('click', this._copyClickHandler);
    container.append(this._view);
  };
}
