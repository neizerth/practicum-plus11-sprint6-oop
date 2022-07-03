import { TodoList } from '../components/TodoList';
import { Api } from '../components/Api';

const config = {
    url: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
};

const page = document.querySelector('.page');
const api = new Api(config);

api.getTasks()
    .then(data => {
        const todoList = new TodoList(data, api);
        todoList.render(page);
    })
    .catch(err => {
        console.log('Ошибка при загрузке карточек', err.message);
    });
