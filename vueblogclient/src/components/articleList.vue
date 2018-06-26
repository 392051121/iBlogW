<template>
	<div class="articleList main">
    <div class="input_box">
    	    <input v-model="article.id" class="" type="hidden"/>
            <input v-model="article.name" class="myinput" type="text" readonly="readonly" placeholder="文章标题" />
            <button  class="btn" @click=""><i class="fa fa-plus" aria-hidden="true"></i>添加</button>
            <button  class="btn" @click=""><i class="fa fa-search" aria-hidden="true"></i>查询</button>
            <button style="opacity: 0.8;"  class="btn" @click=""><i class="fa fa fa-times-circle-o" aria-hidden="true"></i>取消</button>
        </div>
        <grid 
            :listData="listData"
            :theadData="theadData"
            :ifEdit="true"
            :ifDelete="true"
            :ifpage="true"
            :pageInfo="pageInfo"
            @on-delete="deleteCatalog"
            @on-edit="editCatalog"
            @on-gopage="gopage"
        ></grid>
  </div>
</template>

<script>
	var theadData = [
        {
            title:"目录名称",
            keyname:"catalog"
        }
    ];
    import grid from './grid.vue'
    export default {
        name: 'articleList',
        data () {
            return {
                listData:[],
                theadData:theadData,
                article:{ //用户信息
                    id:"",
                    name:""
                },
                editArticleObj:null,  //用于存放正在编辑的用户
                pageInfo:{}
            }
        },
        mounted:function(){
            this.getArticleList(1);
        },
        methods:{
            getArticleList(page){
                var _this = this;
                if(this.article.name === null){
                    this.article.name = "";
                }
                this.$reqs.post('/article/articleList',{
                    page:page,
                    article : this.article.name
                }).then(function(result){ 
                    //成功
                    if(result.data.success === "err"){
                    	_this.$router.push({path:"/"});
                    }else{
                    	_this.listData = result.data.articleList;
                    	_this.pageInfo.allpage = Math.ceil( result.data.count/5 );
                    }
                }).catch(function (error) {
                    //失败
                    _this.$router.push({path:"/"});
                    console.log(error);
                });
            },
            addCatalog(){ //添加用户
                if(!this.catalog.catalog){
                    alert("不能为空");
                    return false;
                }
                this.$reqs.post('/catalogs/add',this.catalog)
                .then((result)=>{
                    //成功
                    this.emptyCatalog();
                    this.pageInfo.current = this.pageInfo.allpage;
                    this.getCatalogList(this.pageInfo.allpage);   
                }).catch(function (error) {
                    //失败
                    console.log(error);
                });
                
            },
            editCatalog(item){ //编辑用户
                this.editCatalogObj = item;
                this.catalog.id = item["_id"];
                this.catalog.catalog = item["catalog"];
                //this.user = JSON.parse(JSON.stringify(item));
            },
            saveEditCatalog(){
            	var _this = this;
                if(!this.catalog.catalog){
                    alert("不能为空");
                    return false;
                }
                this.$reqs.post('/catalogs/update', this.catalog)
                .then((result)=>{
                    //成功
                    _this.emptyCatalog();
                    _this.listData = result.data;
            		_this.pageInfo.allpage = 1;
                    //this.gopage(this.pageInfo.current);
                    _this.editCatalogObj = null;
                }).catch(function (error) {
                    //失败
                console.log(error)
                });     
            },
            cancelEditAdmin(){
                this.editCatalogObj = null;
                this.emptyAdmin();
            },
            emptyCatalog(){ //清空输入框（多次使用，所以封装到这里）
                this.catalog.catalog = "";
            },
            deleteCatalog(item){
            	if(confirm("确定删除此条记录？")){
            		this.$reqs.post('/catalogs/delete',{'id':item["_id"]})
                	.then((result)=>{
                    	//成功
                    	this.gopage(this.pageInfo.current);
                    	this.emptyAdmin();
               		}).catch(function (error) {
                    	//失败
                    	console.log(error);
                	});
            	}
            },
            gopage(index){
                this.pageInfo.current = index;
                //查询数据
                this.getCatalogList(index) 
            }
        },
        components:{grid}
    }
</script>

<style>
	.main{
        border-radius: 4px;
        background: #fff;
        margin-top: 10px;
    }
    .input_box{
        padding: 0 10px;
    }
    .input_box .myinput{
        width: 25%;
    }
</style>