<template>
  <div id="app">
    <music-header></music-header>
    <transition :name="enterType">
      <router-view :musicList="musicList" :currentMusicItem="currentMusicItem"></router-view>
    </transition>
  </div>
</template>

<script>
import MusicHeader from '@/components/MusicHeader';
import { MUSIC_LIST } from '@/data/musicListDate';

export default {
  name: 'app',
  props: ['forward'],
  components: { MusicHeader },
  data(){
    return {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0]
    }
  },
  computed: {
    enterType(){
      return this.forward ? 'slide-left' : 'slide-right';
    }
  },
  created(){
     this.$root.eventHub.$on('PLAY_PN', item => {
        this.playNext(item);
     });
     this.$root.eventHub.$on('PLAY_MUSIC', item => {
        this.playMusic(item);
     });
     this.$root.eventHub.$on('DEL_MUSIC', item => {
        this.delMuisc(item);
     });
  },
  mounted(){
    this.$nextTick(function(){
      //音乐盒插件初始化
      $('#player').jPlayer({
        supplied: "mp3",
        wmode: "window",
        useStateClassSkin: true
      });
      //播放音乐
      this.playMusic(this.currentMusicItem);
      //监听音乐播放完毕
      $('#player').bind($.jPlayer.event.ended, (e) => {
        this.playNext();
      });
    });
  },
  destroyed(){
    $('#player').unbind($.jPlayer.event.ended);
    this.$root.eventHub.$off('PLAY_PN');
    this.$root.eventHub.$off('PLAY_PN');
    this.$root.eventHub.$off('PLAY_MUSIC');
    this.$root.eventHub.$off('DEL_MUSIC');
  },
  methods: {
    playMusic(item){
      $('#player').jPlayer('setMedia', {
        mp3: item.file,
      }).jPlayer('play');
      this.currentMusicItem = item;
    },
    playNext(type = 'next'){
      let index = this.findMusicIndex(this.currentMusicItem),
          len = this.musicList.length,
          newIndex = type == 'next' ? (index + 1) % len : (index - 1 + len) % len;
      this.playMusic(this.musicList[newIndex])
    },
    findMusicIndex(item){
      return this.musicList.indexOf(item);
    },
    delMuisc(item){
      this.musicList = this.musicList.filter(x => x !== item);
    }
  }
}
</script>

<style>
  .slide-left-enter-active,.slide-left-leave-active,.slide-right-enter-active,.slide-right-leave-active{
    transition: transform .3s;
  }
  .slide-left-enter,.slide-right-leave-to{
    transform:translateX(100%);opacity:1;
  }
  .slide-left-enter-to,.slide-left-leave,.slide-right-enter-to,.slide-right-leave{
   transform:translateX(0);opacity:1;
  }
  .slide-left-leave-to,.slide-right-enter{
    transform:translateX(-100%);opacity:1;
  }
</style>
