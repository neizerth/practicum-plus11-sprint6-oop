import { TodoListItem } from "./TodoListItem";
import {TodoListForm} from "./TodoListForm";

export class TodoList {
  static _template = document.querySelector('#todolist-template').content;

  constructor(items, api) {
    this._api = api;
    this._form = new TodoListForm(this._api);
    this._items = items;
  }

  _createItem(data) {
    const item = new TodoListItem(data, this._api);
    item.render(this._view);
    item.on('createTask', task => {
      this._createItem(task);
    });
  }

  render(container) {
    this._view = TodoList._template.cloneNode(true).children[0];

    this._form.on('createTask', task => {
      this._createItem(task);
    });

    this._form.render(this._view);

    this._items.forEach((item) => {
      this._createItem(item)
    });

    container.append(this._view);
  };
}
