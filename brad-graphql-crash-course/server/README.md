### packages installed
```shell
$ npm i express express-graphql graphql mongoose cors
```

### dev dependencies
```shell
$ npm i nodemon dotenv -D
```

## queries

### get client
```graphql
{
  client(id:"1"){
    name, 
  }
}
```

### get clients
```graphql
{
  clients{
    name, 
  }
}
```

### get project
```graphql
{
  project(id:1){
    name 
    description
    client{
      name
    }
  }
}
```

### get projects
```graphql
{
    projects{
        name
        description
    }
}
```

## mutations

### add client
```graphql
mutation{
  addClient(
    name: "Tony Stark",
    email:"ironman@gmail.com",
    phone:"222-222-2222" 
  ){
    id
    name
    email
    phone
  }
}
```

### delete client
```graphql
mutation{
  deleteClient(
   id:"630c68c363baa157d9b32be5"
  ){
    name
  }
}
```

### add project
```graphql
{
  "data": {
    "addClient": {
      "id": "630c69e463baa157d9b32be9",
      "name": "Peter Parker",
      "email": "peter@gmail.com",
      "phone": "212-122-1122"
    }
  }
}
```