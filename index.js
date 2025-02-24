import Koa from 'koa';
import { koaBody } from 'koa-body';

const app = new Koa();

app.use(koaBody());
const TAB = '  ';

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Logger
 */
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');

  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  if (ctx.request.header) {
    console.log(`${TAB}Header ${JSON.stringify(ctx.request.header)}`);
  }
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
//  await sleep(10000);
  ctx.body = {
    status: 'ok',
    active: true,
    activatedAt: '2024-12-20 13:00:00.459647'
  };
});

const PORT = 48090;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));
