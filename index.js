import Koa from 'koa';
import { koaBody } from 'koa-body';

const app = new Koa();

app.use(koaBody());
const TAB = '  ';

/**
 * Logger
 */
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');

  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  if (ctx.request.body) {
    console.log(`${TAB}Body ${JSON.stringify(ctx.request.body)}`);
  }
});

/**
 * X-Response-Time
 */
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));
