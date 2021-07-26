const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3500;

app.listen(PORT, ()=>{
    console.log(`server running at http://127.0.0.1:${PORT}`);
})