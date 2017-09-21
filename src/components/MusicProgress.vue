<template>
	<div class="component-progress" ref="progressBar" @click="changeProgress">
		<!-- <div class="progress" :style="progressStye"></div> -->
		<div class="progress" :style="{width:`${progress}%`,backgroundColor:`${barColor?barColor:'#ff0000'}`}"></div>
	</div>
</template>

<script>
	export default {
		name: 'musicprogress',
		props: ['progress','barColor','type'],
		computed: {
			progressStye(){
				return {
					width: `${this.progress}%`,
					backgroundColor: this.barColor?this.barColor:'#ff0000'
				};
			}
		},
		methods: {
			changeProgress(e){
				let bar = this.$refs.progressBar,
		    		pro = (e.clientX - bar.getBoundingClientRect().left) / bar.clientWidth;
		    	this.$emit(this.type==0?'progressChange':'volumeChange', pro);
			}
		}
	}
</script>

<style lang='less' scoped>
	.component-progress{
		margin-top: 20px;width: 100%;height: 3px;background-color: #ddd;cursor: pointer;
		.progress{
			width: 0;height: 3px;background-color: #ff0000;
		}
	}
</style>