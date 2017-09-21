<template>
	<li class="row component-listitem" :class="{focus:focus}" @click="playMusic">
    	<p><span class="bold">{{musicItem.title}}</span>  -  {{musicItem.artist}}</p>
        <p class="-col-auto delete" @click="deleteHandler"></p>
    </li>
</template>

<script>
	export default {
		name: 'musicitem',
		props: ['musicItem', 'focus'],
		methods: {
			playMusic(){
				this.$root.eventHub.$emit('PLAY_MUSIC', this.musicItem);
			},
			deleteHandler(e){
				e.stopPropagation();
				this.$root.eventHub.$emit('DEL_MUSIC', this.musicItem);
			}
		}
	}
</script>

<style lang="less" scoped>
	.component-listitem {
		height: 36px;line-height: 36px;border-bottom: 1px solid #ddd;text-indent: 10px;cursor: pointer;
		.delete {
			cursor: pointer;
			height: 30px;
			width: 30px;
			top: 3px;
			position: relative;
			transform: rotate(45deg);
			margin-right: 15px;
			&::before, &::after{
				content: '';
				display: block;
				background: #666;
				position: absolute;
			}
			&::before {
				width: 100%;
				height: 1px;
				top: 14px;
				left: 0;
			}
			&::after {
				height: 100%;
				width: 1px;
				left: 15px;
				top: 0;
			}
		}

		&.focus {
			color: #2f9842;
		}
	}
	.component-listitem:hover {
		background: #eee;
	}
</style>