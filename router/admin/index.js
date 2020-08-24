const Router = require('koa-router')
const router = new Router()
const md5 = require('md5-node')

// 渲染页面
router.get('/login', async ctx => {
    await ctx.render('admin/login',{
        URL_PATH: ctx.config.URL_PATH
    })
})

router.post('/login',async ctx => {
    let {username,password} = ctx.request.body
    password = md5(password)
    console.log(username,password)
    try {
        const data = await ctx.db.query(`SELECT * FROM admin WHERE username = '${username}' AND password = '${password}' LIMIT 1`)
        console.log(data)
        if(data.length > 0 ){
            ctx.body = "登陆成功"
            // ctx.body = {
            //     code: 200,
            //     msg:"登陆成功"
            // }
        }else{
            ctx.body = "查询失败111"
        }
    }catch{
        ctx.body = '查询失败222'
    }
})

module.exports = router.routes()