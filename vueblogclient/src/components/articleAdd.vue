<template>
	<div class="articleAdd main">
		<div>
			<Input class="inputname" placeholder="文章标题" clearable></Input>
			<Col span="12" style="margin: 5px 5px 5px 200px;width: 60%;">
                <Select v-model="model11" filterable>
                	<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            	</Select>
            </Col >
            <div class="editor">
    			<editor :value = "value"></editor>
  			</div>
		</div>		    
		<div class="btndiv">
			<button  class="btn" @click="test"><i class="fa fa-save" aria-hidden="true"></i>保存</button>
		    <button  class="btn" @click="test"><i class="fa fa-check" aria-hidden="true"></i>发布</button>
		</div>
	</div>
</template>

<script>
	import editor from './editor'
	export default {
		name: 'articleAdd',
		data () {
            return {
            	value:'请输入内容1',
      			model11:'',
      			cityList:''
            }
        },
        methods:{
       	   test(){
       	   	  alert(this.value);
       	   }
        },
        components:{  
            'editor':editor  
        } 
	}
</script>

<style>
	.main{
        border-radius: 4px;
        margin-top: 10px;
        background: #f8f8f9;
    }
    .input_box{
        padding: 0 10px;
    }
    .input_box .myinput{
        width: 25%;
    }
    .inputname{
    	margin: 5px 5px 5px 200px;
    	width: 60%;
    }
    .editor{
    	margin: 50px 5px 5px 200px;
    	width: 60%;
    }
    .btndiv{
    	width: 300px;
    	left: 50%;
    	margin: auto;
    }
</style>