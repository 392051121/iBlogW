<template>
  <div class="articleAdd main">
    <div>
      <Input v-model="title" class="inputname" placeholder="文章标题" clearable></Input>
      <Col span="12" style="margin: 5px 5px 5px 200px;width: 60%;">
        <Select v-model="catalogName" filterable>
          <Option v-for="item in catalogList" :value="item.catalog" :key="item._id">{{ item.catalog }}</Option>
        </Select>
      </Col>
      <div class="editor">
        <editor></editor>
      </div>
    </div>
    <div class="btndiv">
      <button class="btn" @click="saveArticle"><i class="fa fa-save" aria-hidden="true"></i>保存</button>
      <button class="btn" @click=""><i class="fa fa-check" aria-hidden="true"></i>发布</button>
    </div>
  </div>
</template>

<script>
  import editor from './editor'

  export default {
    name: 'articleAdd',
    data() {
      return {
        title: '',
        //content1: '请输入内容',
        catalogName: '',
        catalogList: ''
      }
    },
    mounted: function () {
      this.addArticle();
      this.getCatalogList();
    },
    methods: {
      addArticle() {
        var _this = this;
        this.$reqs.post('/articles/createArticle'
        ).then(function (result) {
          //成功
          if (result.data.success === "err") {
            _this.$router.push({path: "/"});
          } else if (result.success === "success") {
            _this.$router.push({path: "/backManager/articleAdd"});
          }
        }).catch(function (error) {
          //失败
          _this.$router.push({path: "/"});
          console.log(error);
        });
      },
      getCatalogList() {
        var _this = this;
        this.$reqs.post(
          '/catalogs/catalogAll'
        ).then(function (result) {
          //成功
          if (result.data.success === "err") {
            _this.$router.push({path: "/"});
          } else {
            _this.catalogList = result.data.catalogList;
          }
        }).catch(function (error) {
          //失败
          _this.$router.push({path: "/"});
          console.log(error);
        })
      },
      saveArticle() {
        var _this = this;
        var val = tinyMCE.activeEditor.getContent();
        if (_this.title === '') {
          this.$Message.error('标题为空');
        } else if (_this.catalogName === '') {
          this.$Message.error('标签为空');
        }else if(val ==='请输入内容'){
         this.$Message.error('内容为空');
        }
        else {
          
          this.$reqs.post(
            '/articles/saveArticle', {title: _this.title, catalog: _this.catalogName, article: val}
          ).then(function (result) {
            if (result.data.success === "添加成功") {
            	//tinyMCE.activeEditor.setContent("添加成功");
              _this.$router.push({path: "/backManager/articleList"});
            }
          }).catch(function (error) {
            _this.$router.push({path: "/backManager/articleAdd"});
            console.log(error);
          });
        }
      }
    },
    components: {
      'editor': editor
    }
  }
</script>

<style>
  .main {
    border-radius: 4px;
    margin-top: 10px;
    background: #f8f8f9;
  }

  .input_box {
    padding: 0 10px;
  }

  .input_box .myinput {
    width: 25%;
  }

  .inputname {
    margin: 5px 5px 5px 200px;
    width: 60%;
  }

  .editor {
    margin: 50px 5px 5px 200px;
    width: 60%;
  }

  .btndiv {
    width: 300px;
    left: 50%;
    margin: auto;
  }
</style>
