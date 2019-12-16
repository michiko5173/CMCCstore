// pages/logs/logs.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const db = wx.cloud.database()
    db.collection('CMCC')
      .get({
        success: res2 => {
          let queryResult = []
          for (var i = 0; i < 20; i++) {
            queryResult.push({
              UPDATE_TIME: res2.data[i].UPDATE_TIME,
              STATUS: res2.data[i].STATUS,
              STORAGE: res2.data[i].STORAGE,
              OPERATOR: res2.data[i].OPERATOR,
              SITE_ID: res2.data[i].SITE_ID,
              SITE_NAME: res2.data[i].SITE_NAME,
              CARD_NAME: res2.data[i].CARD_NAME,
              SPEC_INFO: res2.data[i].SPEC_INFO,
            })
          }
          this.setData({
            queryResult: queryResult
          })
          console.log(queryResult)
          console.log(queryResult[0].UPDATE_TIME)
        },

      })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})