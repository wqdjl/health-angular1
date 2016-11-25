{
    'use strict'
    angular.module('healthAdmin')
    .constant('healthAdminConstant', {
        pageSize: 10,
        gender: {//性别
            0: "",
            1: "男",
            2: "女"
        },
        doctorTitle: {//医生职称
            0: "",
            1: "住院医师",
            2: "主治医师",
            4: "副主任医师",
            8: "主任医师"
        },
        exchangeStatus: {//提现状态
            10: "待处理",
            20: "待付款",
            23: "支付宝打款中",
            30: "处理成功",
            40: "处理失败",
            50: "拒绝"
        },
        coinDetailType: {
            16: 'VIP会员',
            32: '普通会员',
            64: '加急咨询'
        },
        settlementStatus: {    // 结算状态
            1: "未结算",
            2: "结算中",
            4: "已结算",
            8: "退回",
        },
        orderServiceType: {
            0: "",
            1: "普通会员",
            2: "VIP会员",
            4: "加急服务"
        },
        paymentStatus: {
            0: "",
            1: "待付款",
            2: "已付款",
            4: "已退款"
        },

        exchangePaymentBatchStatus: {   //  兑换批次状态
            10: '待处理',
            20: '支付宝处理中',
            30: '已完成',
            40: '取消'
        },
        consultingStatus: {    //咨询的进度状态
            0:'',
            1: "未回复",
            2: "咨询中",
            4: "结束",
            8: "拒绝",
            16:'超时'
        },
        CType: { //是检查结果反馈还是咨询
            1: '复诊及咨询',
            2: '检查结果反馈'
        },
       serviceType: {
            0: '',
            2: "普通会员",
            4: "VIP会员",
            8: "加急",
        },
        titleGrade: { // 医生头衔
            0: '',
            1: '知名专家'
        }

    });


}