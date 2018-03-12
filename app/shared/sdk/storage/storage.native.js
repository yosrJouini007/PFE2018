"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var AppSettings = require("application-settings");
var core_1 = require("@angular/core");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module StorageNative
* @license MIT
* @description
* This module handle localStorage, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/
var StorageNative = (function () {
    function StorageNative() {
    }
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in localStorage.
     **/
    StorageNative.prototype.get = function (key) {
        var data = AppSettings.getString(key);
        return this.parse(data);
    };
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    StorageNative.prototype.set = function (key, value, expires) {
        AppSettings.setString(key, String(typeof value === 'object' ? JSON.stringify(value) : value));
    };
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    StorageNative.prototype.remove = function (key) {
        if (AppSettings.hasKey(key)) {
            AppSettings.remove(key);
        }
        else {
            console.log('Trying to remove unexisting key: ', key);
        }
    };
    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    StorageNative.prototype.parse = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    };
    StorageNative = __decorate([
        core_1.Injectable()
    ], StorageNative);
    return StorageNative;
}());
exports.StorageNative = StorageNative;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5uYXRpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yYWdlLm5hdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9CQUFvQjtBQUNwQixrREFBb0Q7QUFDcEQsc0NBQTJDO0FBQzNDOzs7Ozs7O0dBT0c7QUFFSDtJQUFBO0lBdURBLENBQUM7SUF0REM7Ozs7OztRQU1JO0lBQ0osMkJBQUcsR0FBSCxVQUFJLEdBQVc7UUFDYixJQUFJLElBQUksR0FBVyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDRDs7Ozs7OztRQU9JO0lBQ0osMkJBQUcsR0FBSCxVQUFJLEdBQVcsRUFBRSxLQUFVLEVBQUUsT0FBYztRQUN6QyxXQUFXLENBQUMsU0FBUyxDQUNuQixHQUFHLEVBQ0gsTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUNsRSxDQUFDO0lBQ0osQ0FBQztJQUNEOzs7Ozs7UUFNSTtJQUNKLDhCQUFNLEdBQU4sVUFBTyxHQUFXO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4RCxDQUFDO0lBQ0gsQ0FBQztJQUNEOzs7Ozs7O1FBT0k7SUFDSSw2QkFBSyxHQUFiLFVBQWMsS0FBVTtRQUN0QixJQUFJLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNILENBQUM7SUF0RFUsYUFBYTtRQUR6QixpQkFBVSxFQUFFO09BQ0EsYUFBYSxDQXVEekI7SUFBRCxvQkFBQztDQUFBLEFBdkRELElBdURDO0FBdkRZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0ICogYXMgQXBwU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbi8qKlxyXG4qIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXMgPHR3aXR0ZXI6QGpvaG5jYXNhcnJ1Ymlhcz4gPGdpdGh1YjpAbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiogQG1vZHVsZSBTdG9yYWdlTmF0aXZlXHJcbiogQGxpY2Vuc2UgTUlUXHJcbiogQGRlc2NyaXB0aW9uXHJcbiogVGhpcyBtb2R1bGUgaGFuZGxlIGxvY2FsU3RvcmFnZSwgaXQgd2lsbCBiZSBwcm92aWRlZCB1c2luZyBESSBTd2FwcGluZyBhY2NvcmRpbmcgdGhlXHJcbiogU0RLIFNvY2tldCBEcml2ZXIgQXZhaWxhYmxlIGN1cnJlbnRseSBzdXBwb3J0aW5nIEFuZ3VsYXIgMiBmb3Igd2ViIGFuZCBOYXRpdmVTY3JpcHQgMi5cclxuKiovXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VOYXRpdmUge1xyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZ2V0XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBTdG9yYWdlIGtleSBuYW1lXHJcbiAgICogQHJldHVybiB7YW55fVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIFRoZSBnZXR0ZXIgd2lsbCByZXR1cm4gYW55IHR5cGUgb2YgZGF0YSBwZXJzaXN0ZWQgaW4gbG9jYWxTdG9yYWdlLlxyXG4gICAqKi9cclxuICBnZXQoa2V5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgbGV0IGRhdGE6IHN0cmluZyA9IEFwcFNldHRpbmdzLmdldFN0cmluZyhrZXkpO1xyXG4gICAgcmV0dXJuIHRoaXMucGFyc2UoZGF0YSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgc2V0XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBTdG9yYWdlIGtleSBuYW1lXHJcbiAgICogQHBhcmFtIHthbnl9IHZhbHVlIEFueSB2YWx1ZVxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhlIHNldHRlciB3aWxsIHJldHVybiBhbnkgdHlwZSBvZiBkYXRhIHBlcnNpc3RlZCBpbiBsb2NhbFN0b3JhZ2UuXHJcbiAgICoqL1xyXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHtcclxuICAgIEFwcFNldHRpbmdzLnNldFN0cmluZyhcclxuICAgICAga2V5LFxyXG4gICAgICBTdHJpbmcodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyA/IEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IHZhbHVlKVxyXG4gICAgKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCByZW1vdmVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGEgbG9jYWxTdG9yYWdlIGl0ZW0gZnJvbSB0aGUgY2xpZW50LlxyXG4gICAqKi9cclxuICByZW1vdmUoa2V5OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgaWYgKEFwcFNldHRpbmdzLmhhc0tleShrZXkpKSB7XHJcbiAgICAgIEFwcFNldHRpbmdzLnJlbW92ZShrZXkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coJ1RyeWluZyB0byByZW1vdmUgdW5leGlzdGluZyBrZXk6ICcsIGtleSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgcGFyc2VcclxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWUgSW5wdXQgZGF0YSBleHBlY3RlZCB0byBiZSBKU09OXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHBhcnNlIHRoZSBzdHJpbmcgYXMgSlNPTiBpZiBwb3NzaWJsZSwgb3RoZXJ3aXNlIHdpbGxcclxuICAgKiByZXR1cm4gdGhlIHZhbHVlIGl0c2VsZi5cclxuICAgKiovXHJcbiAgcHJpdmF0ZSBwYXJzZSh2YWx1ZTogYW55KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==