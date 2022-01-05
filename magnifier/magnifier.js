//封装函数，返回id对应的DOM对象
function $(id) {
    return document.getElementById(id)
}


//页面完全加载完成后执行脚本代码
window.onload = function () {

    //获取展示的大图/中图/小图选项卡/遮罩层对应的DOM对象
    let big = $("big").querySelector("img")
    let middle = $("show").querySelector("img")
    let tabs = $("list").querySelectorAll("li")
    let shadow = $("shadow")

    //遍历小图选项卡，为每个选项卡中的图片添加鼠标进入移出事件
    for (let i = 0; i < tabs.length; i++) {
        let cur_img = tabs[i].querySelector("img")
        cur_img.onmouseenter = () => {
            cur_img.className = "current"
            middle.src = "images3/middle" + (i + 1) + ".jpg"
            big.src = "images3/large" + (i + 1) + ".jpg"
        }
        cur_img.onmouseleave = () => {
            cur_img.className = ""
        }
    }

    //为中图添加鼠标进入事件，鼠标进入时大图和遮罩层显示
    middle.onmouseenter = () => {
        big.style.display = "block"
        shadow.style.display = "block"
    }
    //为中图添加鼠标进入事件，鼠标移出时大图和遮罩层隐藏
    middle.onmouseleave = () => {
        big.style.display = "none"
        shadow.style.display = "none"
    }

    //为中图添加鼠标移动事件
    //鼠标移动时保证遮罩层也随之移动，遮罩层移动原理：获取鼠标位置，遮罩层的top/left值应等于鼠标的坐标减去遮罩层宽高的一半
    //鼠标移动时大图也随之移动，大图移动原理：获取鼠标位置，
    //该法已弃用 middle.onmousemove = () => { let ev = event || window.event }
    middle.addEventListener("mousemove", (event) => {
        //遮罩层现在距离中图左侧/上侧的距离
        let curLeft = event.offsetX - shadow.offsetWidth / 2
        let curTop = event.offsetY - shadow.offsetHeight / 2;
        //立即执行函数，遮罩层移动函数
        (function () {
            //遮罩层能向右/下移动的最大距离
            let leftMax = middle.offsetWidth - shadow.offsetWidth
            let topMax = middle.offsetHeight - shadow.offsetHeight
            shadow.style.left = curLeft + "px"
            shadow.style.top = curTop + "px"
            //遮罩层的四角边界值限定
            if (curLeft < 0) {
                shadow.style.left = "0"
                curLeft = 0
            }
            if (curTop < 0) {
                shadow.style.top = "0"
                curTop = 0
            }
            if (curLeft > leftMax) {
                shadow.style.left = leftMax + "px"
                curLeft = leftMax
            }
            if (curTop > topMax) {
                shadow.style.top = topMax + "px"
                curTop = topMax
            }
        })();
        //立即执行函数，大图移动函数
        //大图移动原理：遮罩层的左上角和中图的比例应等于大图显示的左上角和整个大图的比例，即curTop/middle.offsetHeight=大图.top/大图.高度
        //所以 大图.top = curTop * 大图.高度  /middle.offsetHeight，left值同理
        (function () {
            big.style.top = -curTop * big.offsetHeight / middle.offsetHeight + "px"
            big.style.left = -curLeft * big.offsetWidth / middle.offsetWidth + "px"
        })()
    })
}