//index.js
//获取应用实例
const app = getApp()
wx.cloud.init()
// 扫描类型
const scanType = {
  'WX_CODE': '微信小程序',
  'QR_CODE': '二维码',
  'EAN_8': '条形码（EAN_8）',
  'EAN_13': '条形码（EAN_13）',
  'UPC_A': '条形码（UPC_A）',
  'UPC_E': '条形码（UPC_E）',
  'CODE_25': '条形码（CODE_25）',
  'CODE_39': '条形码（CODE_39）',
  'CODE_128': '条形码（CODE_128）',
  
}

Page({
  data: {
    scanResult: {
      isShow: false,
      type: '',
      text: '',
      openid: '',
    },
  },


  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },
  onLoad() {

  },
  onScan() {
    wx.scanCode({
      success: (res) => {
        const db = wx.cloud.database()
        db.collection('CMCC').orderBy('UPDATE_TIME', 'desc').where({
          SERIAL_NUM: res.result
        })
          .get({
            success: res2 => {
              let queryResult=[]
              for (var i = 0; i < res2.data.length; i++) {
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
              // console.log('[数据库] [查询记录] 成功: ', res2)
              // for (var i = 0; i < res2.data.length; i++) {

              // console.log(res2.data[i].UPDATE_TIME)
              // }
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
              console.error('[数据库] [查询记录] 失败：', err)
            }
          })
        // let msg = '';
        // if (res.scanType === 'WX_CODE' && res.result === '') {
        //   msg = '宝宝心里苦，但宝宝不说...'
        // }
        this.setData({
          scanResult: {
            isShow: true,
            type: scanType[res.scanType],
            text: res.result,
            // msg,
           
          },
        });

        // 存入Storage
        if (this.data.scanResult.text !== '') {
          wx.getStorage({
            key: 'scanLogs',
            complete: (res) => {
              console.log(res);
              let scanLogs = res.data || [];
              this.data.scanResult.date = Date.now();
              scanLogs.unshift(this.data.scanResult);
              wx.setStorageSync('scanLogs', scanLogs);
            }
          })
        }
      }
    })
  },
  onCopy() {
    // 复制到剪贴板
    wx.setClipboardData({
      data: this.data.scanResult.text,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
})