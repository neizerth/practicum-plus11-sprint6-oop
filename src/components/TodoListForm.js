import { EventEmitter } from "./EventEmitter";

export class TodoListForm extends EventEmitter {
  static _template = document.querySelector('#todolist-form-template').content;

  constructor(api) {
    super();
    this._api = api;
    this._createTaskListeners = [];
  }

  _submitHandler = (evt) => {
    evt.preventDefault();
    const input = this._view.querySelector('.todolist-form_input');
    const name = input.value;
    input.value = '';
    this._api
      .createTask({
        name
      })
      .then((res) => {
        this._emit('createTask', res);
      })
      .catch((err) => {
        console.log('Ошибка при создании задания', err);
      });
  };

  render = (container) => {
    this._view = TodoListForm._template.cloneNode(true).children[0];
    this._view.addEventListener('submit', this._submitHandler);
    container.append(this._view);
  };
}
