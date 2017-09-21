<template>
	<div class="component-header row">
		<img src="../assets/images/logo.png" height="40" class="-col-auto"/>
		<h1 class="caption">React Music Player</h1>
	</div>
</template>

<script>
	export default {
		name: 'musicheader'
	}
</script>

<style lang='less' scoped>
.component-header{
	box-sizing: border-box;padding: 15px 25px;border-bottom: 1px solid #ccc;background-color: #fff;
	.caption{
		font-size: 20px;text-indent: 20px;
	}
}
</style>