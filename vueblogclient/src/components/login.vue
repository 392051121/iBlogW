<template>
	<div class="backlogin">
		<div>
			<div>后台登陆</div>
			<div>
				<input type="text" placeholder="用户名" v-model="username"/>
			</div>
			<div>
				<input type="password" placeholder="密码" v-model="password" />
			</div>
			<button @click="login">登陆</button>
		</div>
	</div>
</template>

<script>
	export default{
		name : "backlogin",
		data(){
			return{
				username : '',
				password : ''
			}
		},
		methods:{
			login(){
				var _this = this;
				this.$reqs.post("/users/login",
					{
						username : this.username,
						password : this.password
					}
			    ).then(
			    	function(result){
			    		if(result.data.err){
			    			alert(result.data.err);
			    		}else{
			    			_this.$router.push({path:"/backManager/userList"});
			    		}
			    	}
			    ).catch(

			    )
			}
		}
	}
</script>

<style>
</style>