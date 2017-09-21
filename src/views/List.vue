<template>
	<ul>
		<music-item v-for="item in musicList" :key="item.id" :musicItem="item" :focus="item === currentMusicItem"></music-item>
	</ul>
</template>

<script>
	import MusicItem from '@/components/MusicItem';
	export default {
		name: 'list',
		props: ['musicList', 'currentMusicItem'],
		components: { MusicItem }
	};
</script>