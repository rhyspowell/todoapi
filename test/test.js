const request = require('supertest');
const app = require('../app.js');

let server;

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
            console.log(response.body.todos.length)
            expect(response.body.todos.length).toBe(1);
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
        return request(app).post('/api/v1/todos').send({"title":"title2","description":"added post"}).then(response => {
            expect(response.statusCode).toBe(201);
        });
    });
    test('It should return the new details', () =>{
        return request(app).get('/api/v1/todos/2').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.todo.title).toBe('title2');
        }); 
    });
    test('Original Item should still exist', () => {
        return request(app).get('/api/v1/todos').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.todos[0].title).toBe('lunch');
            expect(response.body.todos.length).toBe(2);
        });
    });
});

describe('Edit item', () => {
    test('It should update the second item in the list', () => {
        return request(app).put('/api/v1/todo/2').send({"title":"title3","description":"edit post"}).then(response => {
            expect(response.statusCode).toBe(200);
        });
    });
    test('It should return the new details', () => {
        return request(app).get('/api/v1/todos/2').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.todo.title).toBe('title3');
            expect(response.body.todo.description).toBe('edit post');
        });
    });
});