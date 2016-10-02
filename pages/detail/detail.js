// detail.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

Page({
  data: {
    title: '话题详情',
    detail: {},
    hidden: false
  },
  onLoad: function (options) {
    this.fetchData(options.id);
  },
  fetchData: function (id) {
    var self = this;
    self.setData({
      hidden: false
    });

    wx.request({
      url: Api.getTopicByID(id, { mdrender: false }),
      success: function (res) {
        console.log(res);
        res.data.topic.create_at = util.getDateDiff(new Date(res.data.topic.create_at));
        self.setData({
          detail: res.data.topic
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });

    wx.request({
      url: Api.getTopicWithReplies(id),
      success: function (res) {
        console.log("评论...", res);
        self.setData({
          replies: res.data.replies
        });
      }
    })
  }
})
