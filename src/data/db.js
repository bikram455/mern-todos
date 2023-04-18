import './todo.model';
import './user.model';
import mongoose from "mongoose";
// mongoose.connect('mongodb://root:root@127.0.0.1:27017/first-mern');
mongoose.connect('mongodb+srv://rupture:root@mwa-cluster.fc68xik.mongodb.net/Todos');


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected successfully!');
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected!');
});

process.on('SIGINT', () => {
    console.log('System interrupt received!');
    // mongoose.connection.close();
    // mongoose.connection.close(() => {
    //     console.log('closing mongoose connection!');
    //     process.exit(0);
    // });
    mongoose.disconnect();
});

process.on('SIGTERM', function() {
    console.log('System terminate received!');
    mongoose.connection.close(() => {
        process.exit(0);
    });
});

process.on('SIGUSR2', function() {
    console.log('System restart received!');
    mongoose.connection.close(function() {
        process.exit(0);
    });
});