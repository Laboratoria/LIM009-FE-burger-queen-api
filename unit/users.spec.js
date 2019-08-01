const path = require('path');
const fetch = require('node-fetch');
const config = require('../config');
const port = process.env.PORT || 8888;
const baseUrl = process.env.REMOTE_URL || `http://127.0.0.1:${port}`;
const { requestOfPostUsers, responseOfPostUsers, authorizationAdministrador } = require('../_mocks_/dataUsers')

describe('POST /auth', () => {
        it('debería retornar un token para el administrador ', () => (
            fetch(`${baseUrl}/auth`, {
                method: 'POST',
                body: {
                    email: 'admin@localhost',
                    password: 'changeme',
                }
            })
            .then(resp => {
                console.log(resp.body)
                expect(resp.body).toBe(authorizationAdministrador)
            }).catch((e) => console.log(e))
        ));
        it('debería retornar un token para un usuario  ', () => (
            fetch(`${baseUrl}/auth`, {
                method: 'POST',
                body: {
                    email: 'test@test.test',
                    password: '123456',
                }
            })
            .then(resp => {
                console.log(resp.body)
                expect(resp.body).toBe(authorizationAdministrador)
            }).catch((e) => console.log(e))
        ));
    })
    /* const { Express } = require('jest-express/lib/express');
    const { server } = require('./e2e/globalSetup.js');

    let app;

    describe('Server', () => {
        beforeEach(() => {
            app = new Express();
        });

        afterEach(() => {
            app.resetMocked();
        });

        test('should setup server', () => {
            const options = {
                port: 3000,
            };
            server(app, options);
            expect(app.set).toBeCalledWith('port', options.port);
        });
    }); */

/*     it('should respond with 400 when email is missing', () => (
        fetch('/auth', {
            method: 'POST',
            body: { email: '', password: 'xxxx' },
        })
        .then(resp => expect(resp.status).toBe(400))
    ));

    it('should respond with 400 when password is missing', () => (
        fetch('/auth', {
            method: 'POST',
            body: { email: 'foo@bar.baz' },
        })
        .then(resp => expect(resp.status).toBe(400))
    ));

    it('fail with 404 credentials dont match', () => (
        fetch('/auth', {
            method: 'POST',
            body: { email: `foo-${Date.now()}@bar.baz`, password: 'xxxx' },
        })
        .then(resp => expect(resp.status).toBe(404))
    ));

    it('should create new auth token and allow access using it', () => (
        fetch('/auth', {
            method: 'POST',
            body: { email: config.adminEmail, password: config.adminPassword },
        })
        .then((resp) => {
            expect(resp.status).toBe(200);
            return resp.json();
        })
        .then(({ token }) => fetchWithAuth(token)(`/users/${config.adminEmail}`))
        .then((resp) => {
            expect(resp.status).toBe(200);
            return resp.json();
        })
        .t
        hen(json => expect(json.email).toBe(config.adminEmail))
    )); */