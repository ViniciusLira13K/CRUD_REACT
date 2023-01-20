const express = require('express');
const cors = require('cors');
const todosRoutes = require('./todos.routes');
const productRoutes = require('./controller/product.routes');
const userRoutes = require('./controller/user.routes');
const saleRoutes = require('./controller/sale.routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(todosRoutes);
app.use(productRoutes);
app.use(userRoutes);
app.use(saleRoutes);

app.get('/health', (req, res) => {
    return res.json('up');
});

app.listen(3333, () => console.log('Server up in 3333'));
