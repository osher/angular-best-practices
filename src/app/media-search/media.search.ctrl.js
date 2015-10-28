(function() {
    'use strict';

    angular
        .module('media.search')
        .controller('SearchCtrl', SearchCtrl);

    /* @ngInject */
    function SearchCtrl($http, $q, $window, YoutubeSearch) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = 'SearchCtrl';
        vm.params = YoutubeSearch.params;
        vm.resetPageToken = YoutubeSearch.resetPageToken;
        vm.search = YoutubeSearch.search;
        vm.complete = complete;
        vm.updateSearch = updateSearch;

        // activate();

        // function activate() {};

        function updateSearch($item, $model, $label) {
            YoutubeSearch.search();
        }

        function complete (val) {
            var defered = $q.defer();
            $window.handleEchoesSuggest = handleEchoesSuggest;
            
            var config = {
              params: {
                hl: "en",
                ds: "yt",
                // oi: "spell",
                // spell: "1",
                xhr: "t",
                client: "youtube",
                q: val,
                callback: 'handleEchoesSuggest'
              }
            };
            var request = $http
                .jsonp('http://suggestqueries.google.com/complete/search', config);
                
            return defered.promise;

            function handleEchoesSuggest (res) {
                defered.resolve(res[1].map(function(result){
                    return result[0];
                }));
            }
        }
    }
})();