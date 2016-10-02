// API resources: https://github.com/ruby-china/ruby-china/blob/master/app/controllers/api/v3

'use strict';
var HOST_URI = 'https://ruby-china.org/api/v3';
var GET_TOPICS = '/topics';
var GET_TOPIC_BY_ID = '/topics/';

var oauthConfig = {
    baseUrl: 'https://ruby-china.org',
    authorizePath: 'https://ruby-china.org/oauth/authorize',
    grantPath: '/oauth/token',
    revokePath: '/oauth/revoke',
    clientId: 'cb9e91e5',
    clientSecret: 'e62b7195c579f25f194aaa0804a6220647101795777710523db7f434096fc2e0'
}

function obj2uri (obj) {
    return Object.keys(obj).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
}

module.exports = {
    // 获取话题列表
    getTopics: function (obj) {
        return HOST_URI + GET_TOPICS + '?' + obj2uri(obj);
    },
    // 获取话题详情（不含回帖）
    getTopicByID: function (id, obj) {
        return HOST_URI + GET_TOPIC_BY_ID + id + '?' + obj2uri(obj);
    },
    // 获取话题的回帖列表
    getTopicWithReplies: function (id) {
        return HOST_URI + GET_TOPIC_BY_ID + id + '/replies';
    },
    // 登录
    login: function () {
        return oauthConfig.authorizePath + '?' + 'client_id=' + oauthConfig.clientId + "&response_type=code"
    }
};
