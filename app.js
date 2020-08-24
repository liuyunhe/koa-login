const Koa = require('koa')
const Router = require('koa-router')
const body = require('koa-bodyparser')
const ejs = require('koa-ejs')
const static = require('koa-static')
const path = require('path')
const config = require('./config')


const app = new Koa()
app.use(body())

ejs(app,{
    root: path.resolve(__dirname,'template'),
    layout: false,
    viewExt:'ejs',
    cache:false,
    debug:false
})

const router = new Router()


app.context.config = config
app.context.db = require('./libs/database')

router.get('/data', async ctx => {
    // ctx 全局上下文
    // ctx.body = '主页'
    const data = await ctx.db.query('SELECT * FROM websites')
    ctx.body = data
    console.log(data)
})
app.use(router.routes())

router.use('/admin',require('./router/admin'))
router.use('/aaa',require('./router/aaa'))

// 静态资源
app.use(static(path.resolve(__dirname,'./public')))

app.listen(3000)


