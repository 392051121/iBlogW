<template>
	<div class="layout">
		<Layout :style="{minHeight: '100vh'}">
			<Sider collapsible :collapsed-width="78" v-model="isCollapsed">
				<Menu  v-model="catalogName" theme="dark" width="auto" :class="menuitemClasses">
					<MenuItem v-for = "item in catalogList" :name="item.catalog" :key="item._id">
						<Icon type="ios-navigate"></Icon>
						<span>{{item.catalog}}</span>
					</MenuItem>
				</Menu>
				
			</Sider>
			<Layout>
				<Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
				
				<Content :style="{padding: '0 16px 16px'}">
					<Breadcrumb :style="{margin: '16px 0'}">
						<!--BreadcrumbItem>Home</BreadcrumbItem-->
						<!--BreadcrumbItem>Components</BreadcrumbItem-->
						<!--BreadcrumbItem>Layout</BreadcrumbItem-->
					</Breadcrumb>
					<Card>
						<div style="height: 600px">
							<router-view></router-view>
						</div>
					</Card>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				isCollapsed: false,
				catalogName: '',
				catalogList: ''
			};
		},
		mounted: function() {
			this.getCatalogList();
		},
		methods: {
			test(){
				alert(catalogName);
			},
			getCatalogList() {
				var _this = this;
				this.$reqs.post(
					'/catalogs/catalogAll'
				).then(function(result) {
					//成功
					if(result.data.success === "err") {
						_this.$router.push({
							path: "/"
						});
					} else {
						_this.catalogList = result.data.catalogList;
					}
				}).catch(function(error) {
					//失败
					_this.$router.push({
						path: "/"
					});
					console.log(error);
				})
			}
		},
		computed: {
			menuitemClasses: function() {
				return [
					'menu-item',
					this.isCollapsed ? 'collapsed-menu' : ''
				]
			}
		}
	}
</script>
<style scoped>
	.layout-con {
		height: 100%;
		width: 100%;
	}
	
	.menu-item span {
		display: inline-block;
		overflow: hidden;
		width: 69px;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: bottom;
		transition: width .2s ease .2s;
	}
	
	.menu-item i {
		transform: translateX(0px);
		transition: font-size .2s ease, transform .2s ease;
		vertical-align: middle;
		font-size: 16px;
	}
	
	.collapsed-menu span {
		width: 0px;
		transition: width .2s ease;
	}
	
	.collapsed-menu i {
		transform: translateX(5px);
		transition: font-size .2s ease .2s, transform .2s ease .2s;
		vertical-align: middle;
		font-size: 22px;
	}
</style>