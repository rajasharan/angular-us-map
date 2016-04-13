# angular-us-map
An angular module to show data while hovering over different states.

### [Live demo link](https://rajasharan.github.io/angular-us-map)
 
## Usage
#### Import module as dependency
```js
angular.module('myApp', [us-map]);
```

#### Pass raw strings surrounded by single quotes
```html
<us-map>
    <map-data state="VA" color="red" hover-data=" 'Virginia' "></map-data>
    <map-data state="WV" color="blue" hover-data=" 'West\nVirginia' "  hover-padding="20px" hover-bg-color="grey" hover-color="yellow"></map-data>
</us-map>
```

#### Pass any js object from your own controller
```html
<div ng-controller="TestController as ctrl">
    <us-map>
        <map-data state="CA" color="#345" hover-data="ctrl.data | json"></map-data>
        <map-data state="NY" color="" hover-data="ctrl.data | json"></map-data>
    </us-map>
</div>
```

## [License](/LICENSE)
    The MIT License (MIT)
    
## Attribution
[us-map.svg](https://commons.wikimedia.org/wiki/File:Blank_US_Map_(states_only).svg) is licensed under [Attribution-Share Alike 3.0 Unported](https://creativecommons.org/licenses/by-sa/3.0/deed.en)
