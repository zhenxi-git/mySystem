class Vue {
    constructor(options) {
        this.$options = options
        //用来存放发布订阅的事件
        this.$watchEvent = {}

        if (options.beforeCreate.constructor === Function) {
            options.beforeCreate.call(this)
        }
        this.$data = options.data
        //给data中的属性值添加双向绑定
        this.proxyData()
        this.observe()
        if (options.created.constructor === Function) {
            options.created.call(this)
        }
        if (options.beforeMount.constructor === Function) {
            options.beforeMount.call(this)
        }
        this.$el = document.querySelector(options.el)

        if (options.mounted.constructor === Function) {
            options.mounted.call(this)
        }
        // 解析vue模板
        this.compile(this.$el)
    }
    //数据发生改变时用来触发wacth中的update,更新视图
    observe() {
        for (let key in this.$data) {
            let value = this.$data[key]
            let that = this
            Object.defineProperty(that.$data, key, {
                get() {
                    return value
                },
                set(val) {
                    console.log(val, "++++++++++++")
                    value = val
                    //触发watch中的update方法
                    if (that.$watchEvent[key]) {
                        that.$watchEvent[key].forEach(item => {
                            item.update()
                        })
                    }
                }
            })
        }
    }

    compile(node) {
        //获取node的所有字节点
        console.log(node.childNodes)
        node.childNodes.forEach((item, index) => {
            //判断节点类型 1 是元素节点，2是属性节点，3是文本节点
            if (item.nodeType === 1) {
                //递归调用compile方法
                if (item.childNodes.length > 0) {
                    this.compile(item)

                }
                //利用js的hasAttribute方式判断元素节点上是否有“@click”点击事件
                if (item.hasAttribute("@click")) {
                    let fnName = item.getAttribute("@click").trim()
                    //给元素节点绑定点击事件
                    item.addEventListener("click", (e) => {
                        console.log(e, "++++++++++++")
                        this.$options.methods[fnName].bind(this)(e)
                      
                    })

                }
                //v-model
                if (item.hasAttribute("v-model")){
                    let keyValue = item.getAttribute("v-model").trim()
                    item.value=this.$data[keyValue]
                    item.addEventListener("input",(e)=>{
                        this.$data[keyValue]=e.target.value
                    })
                }

            }
            if (item.nodeType === 3) {
                //利用正则匹配{{}}中的内容
                let reg = /\{\{.*?\}\}/g
                //获取文本节点中的文本内容
                let text = item.textContent
                //将data中的数据替换到文本节点中
                item.textContent = text.replace(reg, (match) => {
                    //match是正则匹配到的结果
                    //将匹配到的数据的{{ 和 }}全部替换掉成''并去掉左右空格
                    let data = match.replace(/(\{\{|\}\})/g, '').trim()
                    //将data中的数据取出
                    console.log(match, "****")
                    let watch = new Watch(this, data, item, 'textContent')
                    //判断是否有这个属性----然后订阅更改事件
                    if (this.hasOwnProperty(data)) {
                        if (this.$watchEvent[data]) {
                            this.$watchEvent[data].push(watch)
                        } else {
                            this.$watchEvent[data] = []
                            this.$watchEvent[data].push(watch)

                        }
                    }
                    return this.$data[data]
                })

            }
        })

    }
    proxyData() {
        // 给data中的属性添加get和set方法并复制一份到this上
        for (let key in this.$data) {
            Object.defineProperty(this, key, {
                get() {

                    return this.$data[key]
                },
                set(value) {
                    this.$data[key] = value
                }
            })
        }

    }
}

class Watch {
    //obj当前的vue实例对象，key是data中的属性，node是节点，attr是节点的属性
    constructor(obj, key, node, attr) {
        this.obj = obj
        this.key = key
        this.node = node
        this.attr = attr

    }
    update() {

        //把节点的属性值替换成data中修改后的属性值
        this.node[this.attr] = this.obj[this.key]
    }
}