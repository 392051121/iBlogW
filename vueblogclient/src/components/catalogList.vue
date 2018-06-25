<template>
	<div class="catalogList main">
    <div class="input_box">
    	    <input v-model="catalog.id" class="" type="hidden"/>
            <input v-model="catalog.catalog" class="myinput" type="text" placeholder="目录名称" />
            <!--input v-model="user.password" class="myinput" type="password" placeholder="密码" /-->
            <button  class="btn" @click="addCatalog"><i class="fa fa-plus" aria-hidden="true"></i>添加</button>
            <button  class="btn" @click="saveEditCatalog"><i class="fa fa-save" aria-hidden="true"></i>保存</button>
            <button  class="btn" @click="getCatalogList(1)"><i class="fa fa-search" aria-hidden="true"></i>查询</button>
            <button style="opacity: 0.8;"  class="btn" @click="emptyCatalog"><i class="fa fa fa-times-circle-o" aria-hidden="true"></i>取消</button>
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
        name: 'catalogList',
        data () {
            return {
                listData:[],
                theadData:theadData,
                catalog:{ //用户信息
                    id:"",
                    catalog:""
                },
                editUserObj:null,  //用于存放正在编辑的用户
                pageInfo:{}
            }
        },
        mounted:function(){
            this.getCatalogList(1);
        },
        methods:{
            getCatalogList(page){
                var _this = this;
                if(this.catalog.catalog === null){
                    this.catalog.catalog = "";
                }
                this.$reqs.post('/catalogs/catalogList',{
                    page:page,
                    catalog : this.catalog.catalog
                }).then(function(result){ 
                    //成功
                    if(result.data.success === "err"){
                    	_this.$router.push({path:"/"});
                    }else{
                    	_this.listData = result.data.catalogList;
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
                    this.pageInfo.current = this.pageInfo.allpage;
                    this.getUserList(this.pageInfo.allpage);
                    this.emptyCatalog();  
                }).catch(function (error) {
                    //失败
                    console.log(error);
                });
                
            },
            editCatalog(item){ //编辑用户
                this.editUserObj = item;
                this.user.id = item["_id"];
                this.user.username = item["Username"];
                this.user.password = item["Password"];
                //this.user = JSON.parse(JSON.stringify(item));
            },
            saveEditCatalog(){
            	var _this = this;
                if(!this.user.username || !this.user.password){
                    alert("不能为空");
                    return false;
                }
                this.$reqs.post('/users/update', this.user)
                .then((result)=>{
                    //成功
                    _this.emptyUser();
                    _this.listData = result.data;
            		_this.pageInfo.allpage = 1;
                    //this.gopage(this.pageInfo.current);
                    _this.editUserObj = null;
                }).catch(function (error) {
                    //失败
                console.log(error)
                });     
            },
            cancelEditAdmin(){
                this.editUserObj = null;
                this.emptyAdmin();
            },
            emptyCatalog(){ //清空输入框（多次使用，所以封装到这里）
                this.catalog.catalog = "";
            },
            deleteCatalog(item){
            	if(confirm("确定删除此条记录？")){
            		this.$reqs.post('/users/delete',{'id':item["_id"]})
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
                this.getUserList(index) 
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