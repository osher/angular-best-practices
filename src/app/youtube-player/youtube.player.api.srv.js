(function() {
    'use strict';

    angular
        .module('youtube.player')

        /* @ngInject */
        .factory('youtubePlayerApi', youtubePlayerApi);

        function youtubePlayerApi ($rootScope, $window, $q){
            /*jshint validthis: true */
            var that = this;
            var deferred = $q.defer();
            var service = {
                ready: deferred.promise
            };
            // service.ready = false;
            // this.created = false;
            // this.isReady = function(){
            //     return that.ready;
            // };
            // Inject YouTube's iFrame API
            (function () {
                var validProtocols = ['http:', 'https:'];
                var url = '//www.youtube.com/iframe_api';

                // We'd prefer a protocol relative url, but let's
                // fallback to `http:` for invalid protocols
                if (validProtocols.indexOf(window.location.protocol) < 0) {
                    url = 'http:' + url;
                }
                var tag = document.createElement('script');
                tag.src = url;
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }());

            // Youtube callback when API is ready
            $window.onYouTubeIframeAPIReady = function () {
                // that.ready = true;
                // $rootScope.$apply(function () {
                //     console.log('api ready');
                // });
                deferred.resolve();
            };

            return service;
        }

})();