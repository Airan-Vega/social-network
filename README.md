# Backed of Social Media

## Tools

```
Node JS
Typescript
Prettier
ESLint
MongoDB
Mongoose
Jest
mongodb-memory-server
Husky
Docker + docker-compose
Commitlint
```

## Schema of Database

![Backend schema](./assets/drawDB_Schema.png)

## Schema of Clean Architecture

![Clean architecture schema](./assets/clean-architecture-schema.png)

## Diagram of Clean Architecture

![Clean architecture diagram](./assets/clean-architecture-diagram.png)

## Order in which the layers are processed

### 1º domain

```
1º entities
2º repositories
```

### 2º Application

```
1º dtos
2º services
3º useCases
```

### 3º Infrastructure

```
1º models
2º repositories
3º security
```

### 4º interfaces

```
1º controllers
2º middlewares
3º routes
```

## Tests
```
domain/entities                         → Unit tests          
application/use-cases                   → Unit tests
infrastructure/repositories             → Integration tests with 'mongodb-memory-server' because 'repository' 
                                          interacts with MongoDB
infrastructure/security o services      → Unit tests          
interfaces/controllers                  → Unit tests o E2E    
interfaces/middlewares                  → Unit tests          
interfaces/validators                   → Unit tests          
container                               → No se testea
```