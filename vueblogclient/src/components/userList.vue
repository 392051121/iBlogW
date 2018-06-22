<template>
	<div class="userList main">
    <div class="input_box">
    	    <input v-model="user.id" class="" type="hidden"/>
            <input v-model="user.username" class="myinput" type="text" placeholder="用户名" />
            <input v-model="user.password" class="myinput" type="password" placeholder="密码" />
            <button  class="btn" @click="addUser"><i class="fa fa-plus" aria-hidden="true"></i>添加</button>
            <button  class="btn" @click="saveEditUser"><i class="fa fa-save" aria-hidden="true"></i>保存</button>
            <button  class="btn" @click="getUserList(1)"><i class="fa fa-search" aria-hidden="true"></i>查询</button>
            <button style="opacity: 0.8;"  class="btn" @click="emptyUser"><i class="fa fa fa-times-circle-o" aria-hidden="true"></i>取消</button>
        </div>
        <grid 
            :listData="listData"
            :theadData="theadData"
            :ifEdit="true"
            :ifDelete="true"
            :ifpage="true"
            :pageInfo="pageInfo"
            @on-delete="deleteAdmin"
            @on-edit="editUser"
            @on-gopage="gopage"
        ></grid>
  </div>
</template>

<script>
	var theadData = [
        {
            title:"用户名",
            keyname:"Username"
        },{
            title:"密码",
            keyname:"Password"
        }
    ];
    import grid from './grid.vue'
    export default {
        name: 'userList',
        data () {
            return {
                listData:[],
                theadData:theadData,
                user:{ //用户信息
                    id:"",
                    username:"",
                    password:""
                },
                editUserObj:null,  //用于存放正在编辑的用户
                pageInfo:{}
            }
        },
        mounted:function(){
            this.getUserList(1);
        },
        methods:{
            getUserList(page){
                var _this = this;
                if(this.user.username === null){
                    this.user.username = "";
                }
                this.$reqs.post('/users/userList',{
                    page:page,
                    username : this.user.username
                }).then(function(result){ 
                    //成功
                    if(result.data.success === "err"){
                    	_this.$router.push({path:"/"});
                    }else{
                    	_this.listData = result.data.userList;
                    	_this.pageInfo.allpage = Math.ceil( result.data.count/5 );
                    }
                }).catch(function (error) {
                    //失败
                    _this.$router.push({path:"/"});
                    console.log(error);
                });
            },
            addUser(){ //添加用户
                if(!this.user.username || !this.user.password){
                    alert("不能为空");
                    return false;
                }
                this.$reqs.post('/users/add',this.user)
                .then((result)=>{
                    //成功
                    this.pageInfo.current = this.pageInfo.allpage;
                    this.getUserList(this.pageInfo.allpage);
                    this.emptyUser();  
                }).catch(function (error) {
                    //失败
                    console.log(error);
                });
                
            },
            searchUser(){
            	var _this = this;
            	if(!this.user.username){
                    alert("不能为空");
                    return false;
                }
            	this.$reqs.post('/users/search',this.user
               ).then((result)=>{
            		_this.listData = result.data;
                    //_this.pageInfo.allpage = Math.ceil( result.data.length/5 );
            		this.emptyUser();
                }).catch(function(error){
            		console.log(error);
                });
            },
            editUser(item){ //编辑用户
                this.editUserObj = item;
                this.user.id = item["_id"];
                this.user.username = item["Username"];
                this.user.password = item["Password"];
                //this.user = JSON.parse(JSON.stringify(item));
            },
            saveEditUser(){
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
            emptyUser(){ //清空输入框（多次使用，所以封装到这里）
                this.user.username = "";
                this.user.password = "";
            },
            deleteAdmin(item){
                this.$reqs.post('/users/delete',item)
                .then((result)=>{
                    //成功
                    this.gopage(this.pageInfo.current);
                    this.emptyAdmin();
                }).catch(function (error) {
                    //失败
                console.log(error)
                });
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