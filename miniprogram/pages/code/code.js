// pages/logs/logs.js
Page({
  data: {
    scanCodeMsg: "",
    gpsMsg: "",
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.showToast({
      title: '成功',
      duration: 1000
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  /**
   * 页面的初始数据
   */

  scanCode: function () {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          scanCodeMsg:res.result,
        
        });
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
 

  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onGPS() {
    wx.showToast({
      title: '定位中',
      icon: 'loading',
      duration: 200
    })
      this.setData({
        gpsMsg: '鹿城移动生成指挥大楼NR_GNODEB',
      })},
 
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})