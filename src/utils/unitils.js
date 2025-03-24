//模拟后端返回路由 
export const getRouterJosn =(userName)=>{
    return new Promise((resolve) => {
        if(userName == 'admin'){
            resolve({
                code: 200,
                data: {
                    name: 'admin',
                    token: generateToken(),
                    roles: ['admin'],
                    routerList:[
                        {
                            path: '/home',
                            name: 'Home',
                            component: '/home.vue',
                            meta: { title: '系统首页', icon: 'dashboard' }
                        },
                        {
                            path: '/home/page1',
                            name: 'Page1',
                            component: '/page1.vue',
                            meta: { title: '表格', icon: 'table' }
                        },
                        {
                            path: '/home/page2',
                            name: 'Page2',
                            component: '/page2.vue',
                            meta: { title: '表单', icon: 'form' }
                        },
                        {
                            path: '/home/page3',
                            name: 'Page3',
                            component: '/page3.vue',
                            meta: { title: '个人中心', icon: 'user' }
                        }
                    ]
                }
            })
        }else{
            resolve({
                code: 200,
                data: {
                    name: 'user',
                    token: generateToken(),
                    roles: ['user'],
                    routerList:[
                        {
                            path: '/home',
                            name: 'Home',
                            component: '/home.vue',
                            meta: { title: '系统首页', icon: 'dashboard' }
                        },
                        {
                            path: '/page1',
                            name: 'Page1',
                            component: '/page1.vue',
                            meta: { title: '表格', icon: 'table' }
                        },
                        {
                            path: '/page2',
                            name: 'Page2',
                            component: '/page2.vue',
                            meta: { title: '表单', icon: 'form' }
                        },
                        {
                            path: '/page3',
                            name: 'Page3',
                            component: '/page3.vue',
                            meta: { title: '个人中心', icon: 'user' }
                        }
                    ]
                }
            })
        }


    })
}
//模拟生产随机Token
function generateToken(length = 32) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


