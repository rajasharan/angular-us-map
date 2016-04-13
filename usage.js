(function() {
    angular.module('myApp', ['usMap'])
    .controller('TestController', function() {
        var ctrl = this;

        ctrl.data = {
            CA: {
                Capital: 'Sacramento',
                Population: '38.8 million (2014)',
                Attractions: ['Disneyland', 'Universal Studios Hollywood', 'Golden Gate Bridge']
            },
            WA: {
                Capital: 'Olympia',
                Population: '7.062 million (2014)',
                Universities: ['University of Washington', 'Washington State University'],
                Attractions: ['Space Needle', 'Olympic National Park', 'Mount Rainier']
            }
        };
    });
})();
