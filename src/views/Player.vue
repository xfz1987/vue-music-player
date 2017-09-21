<template>
	<div class="player-page">
        <h1 class="caption"><router-link to="/list">我的私人音乐坊 &gt;</router-link></h1>
            <div class="mt20 row">
               	<div class="controll-wrapper">
               		<h2 class="music-title">{{ currentMusicItem.title }}</h2>
               		<h3 class="music-artist mt10">{{ currentMusicItem.artist }}</h3>
               		<div class="row mt20">
               			<div class="left-time -col-auto">-{{ leftTime }}</div>
               			<div class="volume-container">
               				<i class="icon-volume rt" style="top:5px;left:-5px;"></i>
               				<div class="volume-wrapper">
				                <music-progress :type="1" :progress="volume" barColor="#aaa" @volumeChange="volumeChange"></music-progress>
               				</div>
               			</div>
               		</div>
               		<div style="height:10px;lineHeight:'10px'">
		                <music-progress :type="0" :progress="progress" @progressChange="progressChange"></music-progress>
               		</div>
               		<div class="mt35 row">
               			<div>
	               			<i class="icon prev" @click="prev"></i>
	               			<i class="icon ml20" :class="{pause:isPlay,play:!isPlay}" @click="play"></i>
	               			<i class="icon next ml20" @click="next"></i>
               			</div>
               			<div class="-col-auto">
               				<i class="icon repeat-cycle"></i>
               			</div>
               		</div>
               	</div>
               	<div class="-col-auto cover">
               		<img :src="currentMusicItem.cover" :alt="currentMusicItem.title"/>
               	</div>
               </div>
           </div>
</template>

<script>
	import MusicProgress from '@/components/MusicProgress';
	export default {
		name: 'player',
		props: ['currentMusicItem'],
		components: {MusicProgress},
		data(){
			return {
				progress: 0,
				volume: 0,
				isPlay: true,
				leftTime: null,
				duration: null
			};
		},
		mounted(){
			this.$nextTick(function(){
				$('#player').bind($.jPlayer.event.timeupdate, (e) => {
					this.duration = e.jPlayer.status.duration;
					this.progress =  Math.round(e.jPlayer.status.currentPercentAbsolute);
					this.volume = e.jPlayer.options.volume * 100;
					this.leftTime = this.formateTime(this.duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100));
				});
			});
		},
		destoryed(){
			$('#player').unbind($.jPlayer.event.timeupdate);
		},
		methods: {
			volumeChange(progress){
				$('#player').jPlayer('volume', progress);
			},
			progressChange(progress){
				$('#player').jPlayer('play', this.duration * progress);
			},
			play(){
				$('#player').jPlayer(this.isPlay ? 'pause' : 'play');
				this.isPlay = !this.isPlay;
			},
			prev(){
				this.$root.eventHub.$emit('PLAY_PN', 'prev');
			},
			next(){
				this.$root.eventHub.$emit('PLAY_PN', 'next');
			},
			formateTime(time){
				time = Math.floor(time);
				let minus = Math.floor(time / 60),
		    		sends = Math.floor(time % 60);
				return `${minus}:${sends < 10 ? `0${sends}` : sends}`;
			}
		}
	}
</script>

<style lang='less' scoped>
.player-page {
	width: 700px;
	margin: auto;
	margin-top: 120px;

	.caption {
		font-size: 16px;
		color: rgb(47, 152, 66);
	}

	.cover {
		width: 180px;
		height: 180px;
		margin-left: 20px;

		img {
			width: 180px;
			height: 180px;
			border-radius: 50%;
		}
	}
	.volume-container {
		position: relative;
		left: 20px;
		top: -3px;
	}
	.volume-container .volume-wrapper {
		opacity: 0;
		transition: opacity .5s linear;
	}
	.volume-container:hover .volume-wrapper {
		opacity: 1;
	}
	.music-title {
	    font-size: 25px;
	    font-weight: 400;
	    color: rgb(3, 3, 3);
	    height: 36px;
	    line-height: 36px;
	}
	.music-artist {
		font-size: 15px;
	    font-weight: 400;
	    color: rgb(74, 74, 74);
    }
    .left-time {
    	font-size: 14px;
    	color: #999;
    	font-weight: 400;
    	width: 40px;
    }
    .icon {
    	cursor: pointer;
    }
    .ml20 {
    	margin-left: 20px;
    }
    .mt35 {
    	margin-top: 35px;
    }
    .volume-wrapper {
    	width: 60px;
    	display: inline-block;
    }
}

</style>