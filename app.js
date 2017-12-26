const Koa = require('koa');

const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const controller = require('./controller');
const cors = require('koa-cors')

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(cors())
// parse request body:
app.use(bodyParser());


// add controller:
app.use(controller());
app.use(serve(__dirname + '/dist'));

app.listen(3000);
console.log('app started at port 3000...');
