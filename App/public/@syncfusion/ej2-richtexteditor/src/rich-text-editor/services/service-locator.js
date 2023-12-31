import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * ServiceLocator
 *
 * @hidden

 */
var ServiceLocator = /** @class */ (function () {
    function ServiceLocator() {
        this.services = {};
    }
    /* eslint-disable */
    /**
     * register method
     *
     * @param {string} name - specifies the name.
     * @param {T} type - specifies the type.
     * @returns {void}
     * @hidden

     */
    /* eslint-enable */
    ServiceLocator.prototype.register = function (name, type) {
        if (isNullOrUndefined(this.services["" + name])) {
            this.services["" + name] = type;
        }
    };
    /**
     * getService method
     *
     * @param {string} name - specifies the name.
     * @returns {void}
     * @hidden

     */
    ServiceLocator.prototype.getService = function (name) {
        if (isNullOrUndefined(this.services["" + name])) {
            // eslint-disable-next-line
            throw "The service " + name + " is not registered";
        }
        return this.services["" + name];
    };
    return ServiceLocator;
}());
export { ServiceLocator };
