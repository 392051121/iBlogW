<template>
	<div class = "oneArticle">
		<p>{{title}}</p>
		<p>{{creatTime}}</p>
		<p slot="content" v-html = "article"></p>
	</div>
</template>

<script>
	export default {
	    name: 'oneArticle',
		data (){
			return {
				article:'',
				title:'',
				creatTime:''
			}
		},
		mounted:function(){
            this.findOneArticle();
        },
        methods:{
        	findOneArticle(){
        		var _this = this;
        		var articleId = this.$route.query.articleId;
        		if(articleId!== "" && articleId !== null){
        			this.$reqs.post('/articles/searchArticle',
        				{articleId:articleId}
        		   ).then(function(result){
        				_this.article = result.data.article;
        				_this.title = result.data.title;
        				_this.creatTime = result.data.ModifyTime;
        			}).catch(function (error){ 
        				_this.$router.push({path:"/showArticleList"});
                        console.log(error);
        			});
        		}
        	}
        }
    }
</script>

<style>
</style>