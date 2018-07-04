<template>
	<div class = 'showArticleList'>
		<div v-for="item in listData" :name="item.title" :key="item._id">
			<div>
				<p><a href="javascript:void(0)" @click="test(item._id)">{{item.title}}</a></p>
			</div>
			<div>
				<p>发布时间：{{item.ModifyTime}}</p>
			</div>
			
		</div>
		<!--
		<Collapse v-for="item in listData" :name="item.title" :key="item._id">
            <Panel>
                {{item.title}}
                <p slot="content" v-html = "item.article"></p>
            </Panel>
        </Collapse>
       -->
	</div>
</template>

<script>
	export default {
		name: 'showArticleList',
		data (){
			return {
				listData:[]
			}
		},
		mounted:function(){
            this.getArticleList(1);
        },
        methods:{
        	test(val){
        		this.$router.push({path:'/oneArticle',query:{articleId:val}});
        	},
        	getArticleList(page){
                var _this = this;
                this.$reqs.post('/articles/articleList',{
                    page:page,
                    article : ""
                }).then(function(result){
                    //成功
                    if(result.data.success === "err"){
                    	_this.$router.push({path:"/showArticleList"});
                    }else{
                    	_this.listData = result.data.articleList;
                    }
                }).catch(function (error) {
                    //失败
                    _this.$router.push({path:"/showArticleList"});
                    console.log(error);
                });
            }
        }
	}
</script>

<style>
</style>