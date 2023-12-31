import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Bing map src doc
 */
var BingMap = /** @class */ (function () {
    function BingMap(maps) {
        this.maps = maps;
    }
    BingMap.prototype.getBingMap = function (tile, key, type, language, imageUrl, subDomains) {
        var quadKey = '';
        var maxZoom = Math.min(this.maps.tileZoomLevel, parseInt(this.maxZoom, 10));
        for (var i = maxZoom; i > 0; i--) {
            var digit = 0;
            var mask = 1 << (i - 1);
            if ((tile.x & mask) !== 0) {
                digit++;
            }
            if ((tile.y & mask) !== 0) {
                digit += 2;
            }
            quadKey = quadKey + '' + digit;
        }
        if (!isNullOrUndefined(subDomains)) {
            var subDomain = subDomains[Math.min(parseInt(quadKey.substr(quadKey.length - 1, 1), 10), subDomains.length)];
            imageUrl = imageUrl.replace('{quadkey}', quadKey).replace('{subdomain}', subDomain);
            return imageUrl += '&mkt=' + language + '&ur=IN&Key=' + key;
        }
        else {
            return '';
        }
    };
    /**
     * @returns {void}
     * @private
     */
    BingMap.prototype.destroy = function () {
        this.maps = null;
        this.subDomains = [];
    };
    return BingMap;
}());
export { BingMap };
