const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const taskSchemaPromise = require('./taskSchema');
const taskResolver = require('./taskResolver');
const app = express();

require('dotenv').config()

async function setupServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        const taskSchema = await taskSchemaPromise;
        app.use(
            '/graphql',
            graphqlHTTP({
                schema: taskSchema,
                rootValue: taskResolver,
                graphiql: true,
            })
        );

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error('Failed to start the GraphQL server:', error);
    }
}

setupServer();
