
if(process.env.NODE_ENV === 'development'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}
else if (process.env.NODE_ENV === 'production'){
    process.env.PORT = 8080;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}
