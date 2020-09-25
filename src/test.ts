<template>
  <div>
  <el-breadcrumb separator = "/" class="custom-breadcrumb" >
    <el-breadcrumb - item : to = "{ path: '/packagelist' }"
      > 批次列表 < /el-breadcrumb-item
      >
      <el-breadcrumb - item
        : to = "{
path: '/assesslist',
  query: {
  packageNo: this.$route.query.packageNo,
    mid: this.$route.query.mid
}
        }"
  > 评估列表 < /el-breadcrumb-item
  >
  <el-breadcrumb - item > 评估详情 < /el-breadcrumb-item>
  < /el-breadcrumb>

  < div class="project-list" >
    <div class="page-title" >
      <span>评估详情 < /span>
      < /div>
      < div class="page-show" v - loading="loadingFlag" >
        <div class="assess-con-body" v -if= "Object.keys(assessDetail).length" >
          <!--评估试题 -->
            <div v -if= "assessDetail.type == 'tid'" class="cont-left" >
              <div class="left-title" > 题目：</div>
                < div
class="task-item-question"
              : style = "assessDetail.question === '' ? 'height:50px' : ''"
v - html="assessDetail.question"
  > </div>
  < div class="left-title" > 解答：</div>
    < div
class="task-item-question"
              : style = "assessDetail.answer === '' ? 'height:50px' : ''"
v - html="assessDetail.answer"
  > </div>
  < /div>
  < !--评估试卷 -->
    <div
            v -if= "assessDetail.type === 'exam' && assessDetail.examInfo"
            class="cont-left"
  >
  <p class="" > {{ assessDetail.examInfo.title }}</p>
    < section >
    <p class="paper-title" >
      {{ assessDetail.examInfo.content[0].item }}
</p>
  < ul
style = "height:400px; padding:10px;border:1px solid #ccc; overflow:auto;"
  >
  <li
                  class=""
v -for= "(item, index) in assessDetail.examInfo.content[0]
  .itemDetail"
                  : key = "index"
    >
    <div class="left-title" > 题目：</div>
      < div
class="task-item-question"
                    : style = "item.question === '' ? 'height:50px' : ''"
v - html="item.question"
  > </div>
  < div class="left-title" > 解答：</div>
    < div
class="task-item-question"
                    : style = "item.answer === '' ? 'height:50px' : ''"
v - html="item.answer"
  > </div>
  < /li>
  < /ul>
  < /section>
  < /div>
  < div class="cont-right" >
    <div class="right-title" >
      {{ assessDetail.assessCriteria.title }}：
</div>
  < div
class="right-group"
v -for= "(key, index) in assessDetail.assessCriteria.assessList"
              : key = "index"
    >
    <span class="right-group-title" > {{ key.title }}</span>
      < table >
      <tr v -for= "(item, dex) in key.display" : key = "dex" >
        <td v -if= "item.score" > {{ item.score }}</td>
          < td v -if= "item.desc" > {{ item.desc }}</td>
            < /tr>
            < /table>

            < div class="score" >
              <div class="scoretitle" >
                <span class="redstar" >* </span>评分：
                  < /div>
                  < ul >
                  <li v -for= "(item, inde) in key.score.list" : key = "inde" >
                    <span
                      class="scorebtn"
                      : class="{
addscore: item.flag == 1,
  notallowed: !isSubmit
                      }"
@click="markscore(key.key, item.key, index)"
  > {{ item.value }}</span
    >
    </li>
    < /ul>
    < !-- < div class="scoreplaceholder" > {{ key.score.desc }}</div> -->
      < /div>
      < /div>
      < div class="note-group" >
        <div class="notebox" >
          <div class="note-title left" >
            {{ assessDetail.note.title }}：
</div>
  < el - input
ref = "textarea"
class="notebody left"
type = "textarea"
                  : rows = "5"
                  : readonly = "!isSubmit"
maxlength = "200"
show - word - limit
v - model="assessText"
  >
  </el-input>
  < /div>
  < el - button
v -if= "isSubmit"
                size = "small"
type = "primary"
@click="saveAssess"
  > {{ assessTYPE }}</el-button
    >
    <el-button
v -if= "!isSubmit"
                size = "small"
type = "primary"
@click="fixAssess"
  > 修改 < /el-button
  >
  </div>
  < /div>
  < /div>
  < /div>
  < /div>
  < !--弹框组件 -->
    <el-dialog
id = "dialog-yzj-log"
title = "温馨提示"
      : visible.sync = "dialogVisible"
width = "30%"
  >
  <span style="word-break: break-all;" > {{ dialogContent }}</span>
    < div slot = "footer" class="dialog-footer" >
      <div>
      <el-button size = "small" type = "primary" @click="dialogVisible = false"
        > 取消 < /el-button
        >
        <el-button size = "small" type = "primary" @click="handledialog"
          > 确认 < /el-button
          >
          </div>
          < /div>
          < /el-dialog>
          < /div>
          < /template>

          < script lang = "ts" >
import { Component, Prop, Vue } from 'vue-property-decorator';
import $http from '@/api/api';
// require('!style-loader!css-loader!less-loader!../../../assets/mathstyles/mathStyles.less');

@Component({
  name: 'AssessDetail',
  components: {}
})
export default class PackageList extends Vue {
  tableData: object[] = [];
  tableTitle: object[] = [];
  total: number = 0;
  loadingFlag: boolean = false;

  assessDetail: any = {}; //评估详情信息
  assessText: string = ''; // 备注信息
  assessSubmitParams: any = { score_a: 0, score_b: 0, score_c: 0 }; // 计算分数要的参数
  assessTYPE: string = '提交';
  isSubmit: boolean = true;
  dialogVisible: boolean = false;
  dialogContent: string = '';
  handletype: string = 'ssss';

  //获取数据列表
  getAssessDetail(id?: number): void {
    let queryid: any = this.$route.query.id;
    let Id: number = 0;
    if (id) {
      Id = id;
    } else Id = parseInt(queryid, 10);
    this.loadingFlag = true;
    $http
      .assessdetail({ data: { id: Id } })
      .then((res: any) => {
        this.assessDetail = res;
        this.assessText = !this.assessDetail.note.value
          ? ''
          : this.assessDetail.note.value;
        this.assessTYPE =
          this.assessDetail.button.value === '提交' ? '提交' : '保存';
        this.isSubmit =
          this.assessDetail.button.value === '提交' ? true : false;
        this.loadingFlag = false;
        this.translateData();
      })
      .catch((err: any) => {
        this.loadingFlag = false;
      });
  }
  // 数据加载后对latex进行渲染
  translateData() {
    this.$nextTick(() => {
      let win: any = window;
      win.MathJax.Hub.Queue(['Typeset', win.MathJax.Hub, this.$el]);
    });
  }

  fixAssess() {
    this.isSubmit = true;
  }
  markscore(keyword, score, index) {
    if (!this.isSubmit) return false;
    this.assessSubmitParams[keyword] = Number(score);
    let list = this.assessDetail.assessCriteria.assessList[index].score.list;
    Object.keys(list).forEach((item) => {
      if (list[item].key == score) {
        list[item].flag = 1;
      } else {
        list[item].flag = 0;
      }
    });
  }

  //保存评估
  saveAssess() {
    // console.log('提交')
    let list = this.assessDetail.assessCriteria.assessList;
    //使用try/catch跳出foreach循环
    try {
      Object.keys(list).forEach((item) => {
        var newArr = list[item].score.list.filter((value) => {
          return value.flag == 0; //根据判断为true来遍历循环添加进新数组
        });
        if (newArr.length == list[item].score.list.length) {
          this.$message({
            message: '请对' + list[item].title + '>评分',
            type: 'error',
            duration: 1500
          });
          throw new Error('ending'); //报错，就跳出循环
        }
      });
    } catch (e) {
      return false;
    }
    this.assessSubmitParams.note = this.assessText;
    this.assessSubmitParams.id = this.assessDetail.id;
    // 显示提示框
    this.handletype = 'submitassess';
    this.dialogContent = `您确定${this.assessTYPE}本次评估吗？`;
    this.dialogVisible = true;
  }

  handledialog() {
    //关闭提示框
    this.dialogVisible = false;
    // 动态调用函数
    this[this.handletype]();
  }

  submitassess() {
    $http.submitassess({ data: this.assessSubmitParams }).then((res) => {
      if (res.id) {
        this.getAssessDetail(res.id);
      } else {
        this.handletype = 'toAssessList';
        // 显示提示框
        this.dialogContent = `暂无可评估试题，确定返回上一页？`;
        this.dialogVisible = true;
      }
      //用完删掉两个参数
      delete this.assessSubmitParams.note;
      delete this.assessSubmitParams.id;
    });
  }
  toAssessList() {
    this.$router.push({
      path: '/assessList',
      query: {
        packageNo: this.$route.query.packageNo,
        mid: this.$route.query.mid
      }
    });
  }

  mounted() {
    this.getAssessDetail();
  }
}
</script>
  < style lang = "less" scoped >
@import '../../../assets/style/variable.less';
.custom - breadcrumb {
  padding: 0 0 19px 0;
}
.project - list {
  background - color: @color-white;
  min - height: 600px;
  min - width: 1060px;
  .page - title {
    height: 48px;
    line - height: 48px;
    padding - left: 16px;
    color: @color-qgl - title;
    font - weight: 500;
    font - size: @font-16;
    border - bottom: 1px solid @color-btn - hover;
  }
  .page - show {
    padding: 16px;
    .table - style {
      margin - top: 15px;
    }
    // 评估内容区域
    .assess - con - body {
      display: flex;
      justify - content: flex - start;
      .cont - left {
        width: 500px;
        margin: 0 25px 15px 0;
        p {
          padding: 5px;
          font - size: 18px;
        }
        .paper - title {
          font - weight: bolder;
        }
        ul {
          height: 400px;
          padding: 10px;
          border: 1px solid #e1e2e6;
          border - radius: 2px;
          margin - top: 10px;
          overflow: auto;
        }
        .left - title {
          font - weight: bold;
          font - size: 14px;
          margin: 0 0 10px 0;
        }
        .task - item - question {
          width: 100 %;
          height: 200px;
          margin: 0 0 20px 0;
          border: 1px solid #ccc;
          padding: 10px;
          box - sizing: border - box;
          overflow: auto;
        }
      }

      .cont - right {
        width: 500px;
        font - size: 14px;
        color: #333;
        .right - title {
          font - weight: bold;
          font - size: 14px;
          margin: 0 0 10px 0;
        }
        .right - group {
          margin: 0 0 15px 0;
          .right - group - title {
            display: inline - block;
            height: 20px;
            line - height: 20px;
            color: #06c;
            border - bottom: 2px solid #06c;
            margin: 0 0 10px 0;
          }
          table {
            border - collapse: collapse;
            width: 100 %;
            text - align: center;
            margin: 0 0 10px 0;
            tr {
              padding: 5px 0;
              border - left: none;
              border - right: none;
              &: not(: last - child) {
                border: dashed 1px #ccc;
                border - left: none;
                border - right: none;
              }
              &: first - child {
                border - top: 1px solid #ccc;
              }
              &: last - child {
                border - bottom: 1px solid #ccc;
              }
              td {
                height: 30px;
                line - height: 30px;
              }
            }
          }
          .score {
            overflow: hidden;
            ul {
              float: left;
              li {
                float: left;
                margin: 0 10px 0 0;
                .scorebtn {
                  display: inline - block;
                  width: 60px;
                  height: 30px;
                  line - height: 28px;
                  text - align: center;
                  border: 1px solid #797979;
                  box - sizing: border - box;
                  cursor: pointer;
                }
                .addscore {
                  color: #ff9a17;
                  border: 2px solid #ff9a17!important;
                  font - weight: bold;
                }
                .notallowed {
                  cursor: not - allowed!important;
                }
              }
            }
            .scoretitle,
            .scoreresult,
            .scoreplaceholder {
              float: left;
              height: 30px;
              line - height: 30px;
            }
            .scoretitle {
              .redstar {
                display: inline - block;
                height: 30px;
                line - height: 30px;
                color: red;
              }
            }
            .scoreresult {
              margin: 0 10px 0 0;
            }
            .scoreplaceholder {
              color: #ccc;
              margin: 0 0 0 5px;
            }
          }
        }
        .note - group {
          border - top: 1px solid #333;
          padding: 10px 0 0 0;
          .notebox {
            overflow: hidden;
            margin - bottom: 10px;
            .note - title {
              margin: 10px 0 0 0;
            }
            .notebody {
              width: 490px;
              margin - top: 10px;
            }
            /deep/.el - textarea.el - input__count {
              color: #909399;
            }
          }
          // .assesssubmit {
          // width: 100px;
          // height: 30px;
          // line-height: 30px;
          // margin: 0 auto;
          // background: #06c;
          // text-align: center;
          // border-radius: 4px;
          // color: #fff;
          // background-color: @color-menu-bg-active;
          // transition: 0.5s;
          // cursor: pointer;
          // &:hover {
          //   background-color: @color-menu-bg-active;
          // }
          // }
        }
      }
    }
  }
}
</style>
