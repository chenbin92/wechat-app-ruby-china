// posts.js
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');

Page({
  data: {
    title: '话题列表',
    postsList: [],
    hidden: false,
    offset: 0,
    limit: 20,
    type: 'last_actived'
  },

  onPullDownRefresh: function () {
    this.fetchData();
    console.log('下拉刷新', new Date());
  },

  onLoad: function () {
    this.fetchData();
  },

  onTapTag: function (e) {
    var self = this;
    var type = e.currentTarget.id;
    self.setData({
      type: type
    });
    if (type !== 'last_actived') {
      this.fetchData({type: type});
    } else {
      this.fetchData();
    }
  },

  fetchData: function (data) {
    var self = this;
    self.setData({
      hidden: false
    });
    if (!data) data = {};
    if (!data.offset) data.offset = 0;
    if (data.offset === 0) {
      self.setData({
        postsList: []
      });
    }
    console.log('request...', data);
    wx.request({
      url: Api.getTopics(data),
      success: function (res) {
        console.log(res);
        self.setData({
          postsList: self.data.postsList.concat(res.data.topics.map(function (item) {
            item.last_reply_at = util.getDateDiff(new Date(item.last_reply_at));
            return item;
          }))
        });
        setTimeout(function () {
          self.setData({
            hidden: true
          });
        }, 300);
      }
    });
  },

  redictDetail: function (e) {
    console.log('我要看详情');
    var id = e.currentTarget.id,
        url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },

  lower: function (e) {
    var self = this;
    self.setData({
      offset: self.data.offset + 1
    });
    if (self.data.type !== 'last_actived') {
      this.fetchData({type: self.data.type, offset: self.data.offset});
    } else {
      this.fetchData({offset: self.data.offset});
    }
  }
})
