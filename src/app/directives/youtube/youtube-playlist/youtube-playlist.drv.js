(function() {
angular.module('youtube.directives')
.directive('youtubePlaylistItem', YoutubePlaylistItem);
	
function YoutubePlaylistItem() {
	var directive = {
		restrict: 'E',
		templateUrl: 'app/directives/youtube/youtube-playlist/youtube.playlist.tpl.html',
		replace: true,
		scope: {
			onPlay: '&',
			video: '='
		},
		link: link
	};

	return directive;

	function link (scope, element, attrs) {
		scope.isVideoItem = function (video) {
	    	return video.id.kind === 'youtube#video';
	    };

	    scope.isChannelItem = function(video){
	    	return video.id.kind === 'youtube#channel';
	    };

	    scope.playVideo = function(video){
	    	scope.loading = true;
	    	scope.onPlay({
	    		video: video
	    	}).then(function (res) {
	    		scope.loading = false;
	    	});
		};
	}

}

})();