define(['mui', 'formatURL'], function(mui, formatURL) {
    let user = document.getElementById('user');
    let age = document.getElementById('age');
    let tel = document.getElementById('tel');
    let address = document.getElementById('address');
    let card = document.getElementById('card');

    function init() {
        let param = formatURL();
        mui.init();
        addEvent();
        if (param) {
            mui.ajax('/api/getList', {
                data: { _id: param.id },
                success(rs) {
                    if (rs.code) {
                        let item = rs.data[0]
                        user.value = item.name;
                        age.value = item.age;
                        tel.value = item.tel;
                        address.value = item.address;
                        card.value = item.card;
                    }
                }
            });
            let btns = [...document.querySelectorAll('#btnBox>button')];
            btns.forEach(item => {
                item.classList.toggle('show')
            })
        }

    }

    function addEvent() {
        const add = document.querySelector('.add');
        const edit = document.getElementById('edit');
        add.addEventListener('tap', addStudent);
        edit.addEventListener('tap', editStudent);
    }

    function editStudent() {
        console.log(1)
        let id = formatURL().id;
        let userVal = user.value.trim();
        let ageVal = age.value.trim();
        let telVal = tel.value.trim();
        let addressVal = address.value.trim();
        let cardVal = card.value.trim();
        mui.ajax('/api/addList', {
            type: 'post',
            data: {
                _id: id,
                name: userVal,
                age: ageVal,
                tel: telVal,
                address: addressVal,
                card: cardVal,
                Time: new Date()
            },
            success(rs) {
                console.log(rs)
                if (rs.ok) {
                    location.href = '../index.html'
                }
            }
        })
    }

    function addStudent() {
        console.log(document.getElementById('user'))
        let userVal = user.value.trim();
        let ageVal = age.value.trim();
        let telVal = tel.value.trim();
        let addressVal = address.value.trim();
        let cardVal = card.value.trim();
        if (!userVal || !cardVal) {
            alert('信息不完整')
            return;
        }
        mui.ajax('/api/addList', {
            type: "post",
            data: {
                name: userVal,
                age: ageVal,
                tel: telVal,
                address: addressVal,
                card: cardVal,
            },
            success: function(rs) {
                if (rs.code === 1) {
                    alert(rs.msg)
                } else {
                    location.href = "../index.html"
                }
            }
        })
    }
    init();
})