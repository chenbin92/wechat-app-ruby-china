//profile.js
var Api = require('../../utils/api.js');

Page({
  data: {
    content: "个人页面"
  },
  onLoad: function () {
    console.log("进入个人页面...");
  },

  onTapTag: function () {
    var self = this;
    console.log("click login...");
    console.log(Api.login());
    wx.request({
      url: 'https://ruby-china.org/oauth/authorize',
      success: function (res) {
        console.log(res);
      }
    });
  }
})