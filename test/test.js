const request = require('supertest');
const app = require('../app.js');

beforeAll(() => {
    console.log("Starting Jest tests");
});
  
afterAll(() => {
});

describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get('/api/v1/todos').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.todos[0].title).toBe('lunch');
        });
    });
});

describe('Test single item', () => {
    test('It should gather first item in database', () => {
        return request(app).get('/api/v1/todos/1').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.todo.title).toBe('lunch');
        });
    });
});

describe('Add item', () => {
    test('It should add a new item to the database', () => {
        return request(app).post('/api/v1/todos').send({"id":2,"title":"title2","description":"added post"}).then(response => {
            console.log(response)
            expect(response.statusCode).toBe(200);
            expect(response.body.todo.title).toBe('lunch');
        });
    });
});