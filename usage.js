(function() {
    angular.module('myApp', ['usMap'])
    .controller('TestController', function() {
        var ctrl = this;

        ctrl.data = [ 
            {
                st: 'CO',
                state: 'Colorado',
                total: 66,
                clinton: 28,
                sanders: 38
            },
            {
                st: 'TX',
                state: 'Texas',
                total: 222,
                clinton: 147,
                sanders: 75
            },
            {
                st: 'IA',
                state: 'Iowa',
                total: 44,
                clinton: 23,
                sanders: 21
            },
            {
                st: 'NH',
                state: 'New Hampshire',
                total: 24,
                clinton: 9,
                sanders: 15
            },
            {
                st: 'NV',
                state: 'Nevada',
                total: 35,
                clinton: 20,
                sanders: 14
            },
            {
                st: 'SC',
                state: 'South Carolina',
                total: 53,
                clinton: 39,
                sanders: 14
            },
            {
                st: 'AL',
                state: 'Alabama',
                total: 53,
                clinton: 44,
                sanders: 9
            },
            {
                st: 'AR',
                state: 'Arkansas',
                total: 32,
                clinton: 22,
                sanders: 10
            },
            {
                st: 'GA',
                state: 'Georgia',
                total: 102,
                clinton: 73,
                sanders: 29
            },
            {
                st: 'MA',
                state: 'Massachusetts',
                total: 91,
                clinton: 46,
                sanders: 45
            },
            {
                st: 'MN',
                state: 'Minnesota',
                total: 77,
                clinton: 31,
                sanders: 46
            },
            {
                st: 'OK',
                state: 'Oklahoma',
                total: 38,
                clinton: 17,
                sanders: 21
            },
            {
                st: 'TN',
                state: 'Tennessee',
                total: 67,
                clinton: 44,
                sanders: 23
            },
            {
                st: 'VT',
                state: 'Vermont',
                total: 16,
                clinton: 0,
                sanders: 16
            },
            {
                st: 'VA',
                state: 'Virginia',
                total: 95,
                clinton: 62,
                sanders: 33
            },
            {
                st: 'KS',
                state: 'Kansas',
                total: 33,
                clinton: 10,
                sanders: 23
            },
            {
                st: 'LA',
                state: 'Louisiana',
                total: 51,
                clinton: 37,
                sanders: 14
            },
            {
                st: 'NE',
                state: 'Nebraska',
                total: 25,
                clinton: 10,
                sanders: 15
            },
            {
                st: 'ME',
                state: 'Maine',
                total: 25,
                clinton: 9,
                sanders: 16
            },
            {
                st: 'MI',
                state: 'Michigan',
                total: 130,
                clinton: 67,
                sanders: 63
            },
            {
                st: 'MS',
                state: 'Mississippi',
                total: 36,
                clinton: 32,
                sanders: 4
            },
            {
                st: 'OH',
                state: 'Ohio',
                total: 143,
                clinton: 81,
                sanders: 62
            },
            {
                st: 'FL',
                state: 'Florida',
                total: 214,
                clinton: 141,
                sanders: 73
            },
            {
                st: 'IL',
                state: 'Illinois',
                total: 156,
                clinton: 76,
                sanders: 73
            },
            {
                st: 'MO',
                state: 'Missouri',
                total: 71,
                clinton: 36,
                sanders: 35
            },
            {
                st: 'NC',
                state: 'North Carolina',
                total: 107,
                clinton: 59,
                sanders: 45
            },
            {
                st: 'AZ',
                state: 'Arizona',
                total: 75,
                clinton: 42,
                sanders: 33
            },
            {
                st: 'ID',
                state: 'Idaho',
                total: 23,
                clinton: 5,
                sanders: 18
            },
            {
                st: 'UT',
                state: 'Utah',
                total: 33,
                clinton: 6,
                sanders: 27
            },
            {
                st: 'AK',
                state: 'Alaska',
                total: 16,
                clinton: 3,
                sanders: 13
            },
            {
                st: 'HI',
                state: 'Hawaii',
                total: 25,
                clinton: 8,
                sanders: 17
            },
            {
                st: 'WA',
                state: 'Washington',
                total: 101,
                clinton: 9,
                sanders: 25
            },
            {
                st: 'WI',
                state: 'Wisconsin',
                total: 86,
                clinton: 38,
                sanders: 48
            },
            {
                st: 'WY',
                state: 'Wyoming',
                total: 14,
                clinton: 7,
                sanders: 7
            }
        ];

        ctrl.lines = [
            '<us-map>',
            '  <map-data state="{{ctrl.state}}" color="{{ctrl.color}}">',
            '    <div class="message">',
            '      <div class="message-header">',
            '        {{ctrl.stateName}} ({{ctrl.total}} delegates)',
            '      </div>',
            '      <div class="message-body">',
            '        <div class="columns">',
            '          <div class="column">',
            '            {{ctrl.winnerName}} <br>',
            '            {{ctrl.winnerCount}} <i class="fa fa-flag"></i>',
            '          </div>',
            '          <div class="column">',
            '            {{ctrl.looserName}} <br>',
            '            {{ctrl.looserCount}}',
            '          </div>',
            '        </div>',
            '      </div>',
            '    </div>',
            '  </map-data>',
            '</us-map>'
        ];

        ctrl.color = function(obj) {
            if(obj.sanders >= obj.clinton) {
                return "#127ED6";
            }
            else {
                return "#0350A2";
            }
        };

        ctrl.winnerName = generator(greaterEqual, "name");
        ctrl.winnerCount = generator(greaterEqual, 1);

        ctrl.looserName = generator(lessThan, "name");
        ctrl.looserCount = generator(lessThan, 1);

        function lessThan(a, b) {
            return a < b;
        }
        function greaterEqual(a, b) {
            return a >= b;
        }

        function generator(predicateFn, s) {
            return function(obj) {
                if(predicateFn(obj.sanders, obj.clinton)) {
                    return typeof(s) === "string"? "Sanders": obj.sanders;
                }
                else {
                    return typeof(s) === "string"? "Clinton": obj.clinton;
                }
            };
        }
    });
})();
