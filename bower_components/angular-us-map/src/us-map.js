(function() {
    angular.module('usMap', [])
    .factory('allStates', function() {
        return [
            "AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL",
            "GA","GU","HI","IA","ID","IL","IN","KS","KY","LA",
            "MA","MD","ME","MH","MI","MN","MO","MS","MT","NC",
            "ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR",
            "PA","PR","PW","RI","SC","SD","TN","TX","UT","VA",
            "VI","VT","WA","WI","WV","WY"
        ];
    });
})();

(function(currentScriptPath) {
    angular.module('usMap')
    .directive('usMap', ['allStates', function(allStates) {
        return {
            restrict: 'E',
            scope: {},
            transclude: true,
            templateUrl: currentScriptPath.replace('us-map.js', 'us-map.svg'),
            controllerAs: 'ctrl',
            controller: function() {
                var ctrl = this;

                ctrl.setColor = function(state, color) {
                    ctrl.states[state].attr('fill', color);
                };

                ctrl.getStateElement = function(state) {
                    return ctrl.states[state];
                };
            },
            link: function(scope, elem, attr, ctrl, transcludeFn) {
                scope.ctrl.states = {};
                var svg = elem.find('svg')[0];

                allStates.forEach(function(state) {
                    var st = svg.getElementById(state);
                    var stElem = angular.element(st);
                    scope.ctrl.states[state] = stElem;
                });

                // manually append the transcluded templates
                transcludeFn(function(clone) {
                    elem.append(clone);
                });
            }
        };
    }])
})(
    /*
     * quick hack to get current script path
     * (http://stackoverflow.com/questions/21103724/angular-directive-templateurl-relative-to-js-file)
     */
    (function() {
        var scripts = document.getElementsByTagName("script");
        var currentScriptPath = scripts[scripts.length - 1].src;
        return currentScriptPath;
    })()
);

(function() {
    angular.module('usMap')
    .directive('mapData', function() {
        return {
            restrict: 'E',
            scope: {
                state: '@',
                color: '@',
                hoverData: '@',
                hoverColor: '@', //defaults to #69707a
                hoverBgColor: '@', //defaults to #f5f7fa
                hoverPadding: '@', //defaults to 5px
                hoverTitle: '@', //not used yet
            },
            require: '^^usMap',
            link: function(scope, elem, attr, ctrl) {
                if(!scope.hoverColor) {
                    scope.hoverColor = '#69707a';
                }

                if(!scope.hoverBgColor) {
                    scope.hoverBgColor = '#f5f7fa';
                }

                if(!scope.hoverPadding) {
                    scope.hoverPadding = '5px';
                }

                if(scope.state) {
                    var pre = elem.find('pre');
                    var stElem = ctrl.getStateElement(scope.state);

                    //hack to get the grandfather scope
                    scope.data = scope.$parent.$eval(scope.hoverData);

                    pre.css('position', 'fixed');
                    pre.css('color', scope.hoverColor);
                    pre.css('background-color', scope.hoverBgColor);
                    pre.css('padding', scope.hoverPadding);
                    pre.css('display', 'none');
                    pre.css('z-index', '20');

                    stElem.on('mouseenter', function() {
                        pre.css('display', 'block');
                    });

                    stElem.on('mousemove', function(e) {
                        pre.css('left', e.clientX+'px');
                        pre.css('top', e.clientY+'px');
                    });

                    stElem.on('mouseout', function() {
                        pre.css('display', 'none');
                    });

                    if(scope.color) {
                        ctrl.setColor(scope.state, scope.color);
                    }
                }
            },
            template: '<pre class="us-map-data">{{data}}</pre>'
        };
    });
})();
