var express = require('express');
var router = express.Router();
const curd = require('../mongo/mongo');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// 查询接口
router.get('/api/list', function(req, res, next) {
    let { page } = req.query;
    if (!page) {
        return res.send({ code: 2, msg: "参数不完整" });
    };
    curd.connect({
        type: 'find',
        query: {},
        cb: function(rs) {
            if (rs.length) {
                let len = rs.length;
                curd.connect({
                    type: 'find',
                    skip: (page - 1) * 5,
                    limit: 5,
                    sort: { Time: -1 },
                    cb: function(rs) {
                        if (rs.length) {
                            res.send({ code: 1, data: rs, total: len });
                        } else {
                            res.send({ code: 0, msg: "没有查询到相关信息" });
                        }
                    }
                });
            } else {
                res.send({ code: 0, msg: "没有查询到相关信息" });
            }
        }
    });
});
// 添加接口
router.post('/api/addList', function(req, res, next) {
    let { name, age, card, _id } = req.body;
    if (!name || !age) {
        return res.send({ code: 3, msg: "参数不完整" })
    }
    if (_id) {
        delete req.body._id;
        req.body.Time = new Date();
        curd.connect({
            cb: function(rs) {
                res.send(rs);
            },
            type: 'updateOne',
            changeData: { $set: req.body },
            query: { _id: curd.toObjectId(_id) }
        });
    } else {
        req.body.Time = new Date();
        curd.connect({
            type: 'find',
            query: { card: card },
            cb: function(rs) {
                if (rs.length) {
                    res.send({ code: 1, msg: "用户存在" });
                } else {
                    curd.connect({
                        type: 'insertOne',
                        query: req.body,
                        cb: function(rs) {
                            res.send(rs);
                        }
                    });
                }
            }
        });
    }


});
// 删除接口
router.get('/api/delList', function(req, res, next) {
    let { _id } = req.query;
    if (!_id) {
        return res.send({ code: 3, msg: "参数不完整" })
    }
    curd.connect({
        cb: function(rs) {
            if (rs.result.n) {
                res.send({ code: 1, msg: "success" })
            } else {
                res.send({ code: 0, msg: "error" })
            }
        },
        type: 'deleteMany',
        query: { _id: curd.toObjectId(_id) }
    });
});
// 查询个人
router.get('/api/getList', function(req, res, next) {
    let { _id } = req.query;
    if (!_id) {
        return res.send({ code: 3, msg: "参数不完整" })
    }
    curd.connect({
        type: 'find',
        query: { _id: curd.toObjectId(_id) },
        cb: function(rs) {
            if (rs.length) {
                res.send({ code: 1, data: rs });
            } else {
                res.send({ code: 0, msg: "没有查询到相关信息" });
            }
        }
    });
});
module.exports = router;