define(['mui'], function(mui) {
    function init() {
        mui.init();
        getInfo();
        addEvent();
    }
    //初始化渲染
    function getInfo() {
        mui.ajax('/api/list', {
            data: { page: 1 },
            success: function(rs) {
                let list = document.querySelector('.list');
                let html = '';
                rs.data.map(function(item) {
                    html += ` <li class="mui-table-view-cell">${item.name}
                    		<span class="mui-badge cha"  data-id="${item._id}">查看</span>
                    <span class="mui-badge shanchu"  data-id="${item._id}">删除</span>
                    </li>`
                })
                list.innerHTML += html;

            }
        })
    }
    //点击查看 和删除
    function addEvent() {
        mui('.list').on('tap', 'span', (e) => {
            let tar = e.target;
            if (tar.classList.contains('cha')) { //查看
                showInfo(tar)
            } else { //删除
                delInfo(tar)
            }
        })
    }

    //显示学生信息
    function showInfo(tar) {
        location.href = 'add.html?id=' + tar.getAttribute('data-id');
    }

    function delInfo(tar) {
        //获取当前点击的id
        let id = tar.getAttribute('data-id');
        //获取当前点击的父节点
        let delDom = tar.parentNode;

        //ajax请求从数据库删除
        mui.ajax('/api/delList', {
            data: { _id: id },
            success: function(rs) {
                if (rs.code) {
                    //从父节点删除当前这个
                    delDom.parentNode.removeChild(delDom)
                }
            }
        })
    }
    init();
})