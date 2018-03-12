"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
/**
 * @module Storage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
var BaseStorage = (function () {
    function BaseStorage() {
    }
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in storage.
     **/
    BaseStorage.prototype.get = function (key) { };
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    BaseStorage.prototype.set = function (key, value, expires) { };
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    BaseStorage.prototype.remove = function (key) { };
    return BaseStorage;
}());
exports.BaseStorage = BaseStorage;
/**
 * @module InternalStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 * This is mainly required because Angular Universal integration.
 * It does inject a CookieStorage instead of LocalStorage.
 **/
var InternalStorage = (function (_super) {
    __extends(InternalStorage, _super);
    function InternalStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalStorage;
}(BaseStorage));
exports.InternalStorage = InternalStorage;
/**
 * @module SDKStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The SDKStorage class is used for dependency injection swapping.
 * It will be provided using factory method according the right environment.
 * This is created for public usage, to allow persisting custom data
 * Into the local storage API.
 **/
var SDKStorage = (function (_super) {
    __extends(SDKStorage, _super);
    function SDKStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SDKStorage;
}(BaseStorage));
exports.SDKStorage = SDKStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5zd2Fwcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JhZ2Uuc3dhcHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQkFBb0I7QUFDcEI7Ozs7Ozs7SUFPSTtBQUNKO0lBQUE7SUEwQkEsQ0FBQztJQXpCQzs7Ozs7O1FBTUk7SUFDSix5QkFBRyxHQUFILFVBQUksR0FBVyxJQUFRLENBQUM7SUFDeEI7Ozs7Ozs7UUFPSTtJQUNKLHlCQUFHLEdBQUgsVUFBSSxHQUFXLEVBQUUsS0FBVSxFQUFFLE9BQWMsSUFBUyxDQUFDO0lBQ3JEOzs7Ozs7UUFNSTtJQUNKLDRCQUFNLEdBQU4sVUFBTyxHQUFXLElBQVMsQ0FBQztJQUM5QixrQkFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksa0NBQVc7QUEyQnhCOzs7Ozs7Ozs7SUFTSTtBQUNKO0lBQXFDLG1DQUFXO0lBQWhEOztJQUFrRCxDQUFDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLEFBQW5ELENBQXFDLFdBQVcsR0FBRztBQUF0QywwQ0FBZTtBQUM1Qjs7Ozs7Ozs7O0lBU0k7QUFDSjtJQUFnQyw4QkFBVztJQUEzQzs7SUFBNkMsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUE5QyxDQUFnQyxXQUFXLEdBQUc7QUFBakMsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG4vKipcclxuICrCoEBtb2R1bGUgU3RvcmFnZVxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICogQGxpY2Vuc2UgTUlUXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBUaGUgSW50ZXJuYWxTdG9yYWdlIGNsYXNzIGlzIHVzZWQgZm9yIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHN3YXBwaW5nLlxyXG4gKiBJdCB3aWxsIGJlIHByb3ZpZGVkIHVzaW5nIGZhY3RvcnkgbWV0aG9kIGZyb20gZGlmZmVyZW50IHNvdXJjZXMuXHJcbiAqKi9cclxuZXhwb3J0IGNsYXNzIEJhc2VTdG9yYWdlIHtcclxuICAvKipcclxuICAgKiBAbWV0aG9kIGdldFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgU3RvcmFnZSBrZXkgbmFtZVxyXG4gICAqIEByZXR1cm4ge2FueX1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGUgZ2V0dGVyIHdpbGwgcmV0dXJuIGFueSB0eXBlIG9mIGRhdGEgcGVyc2lzdGVkIGluIHN0b3JhZ2UuXHJcbiAgICoqL1xyXG4gIGdldChrZXk6IHN0cmluZyk6IGFueSB7fVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgc2V0XHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBTdG9yYWdlIGtleSBuYW1lXHJcbiAgICogQHBhcmFtIHthbnl9IHZhbHVlIEFueSB2YWx1ZVxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhlIHNldHRlciB3aWxsIHJldHVybiBhbnkgdHlwZSBvZiBkYXRhIHBlcnNpc3RlZCBpbiBsb2NhbFN0b3JhZ2UuXHJcbiAgICoqL1xyXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgZXhwaXJlcz86IERhdGUpOiB2b2lkIHt9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCByZW1vdmVcclxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFN0b3JhZ2Uga2V5IG5hbWVcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGEgbG9jYWxTdG9yYWdlIGl0ZW0gZnJvbSB0aGUgY2xpZW50LlxyXG4gICAqKi9cclxuICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHt9XHJcbn1cclxuLyoqXHJcbiAqwqBAbW9kdWxlIEludGVybmFsU3RvcmFnZVxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICogQGxpY2Vuc2UgTUlUXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBUaGUgSW50ZXJuYWxTdG9yYWdlIGNsYXNzIGlzIHVzZWQgZm9yIGRlcGVuZGVuY3kgaW5qZWN0aW9uIHN3YXBwaW5nLlxyXG4gKiBJdCB3aWxsIGJlIHByb3ZpZGVkIHVzaW5nIGZhY3RvcnkgbWV0aG9kIGZyb20gZGlmZmVyZW50IHNvdXJjZXMuXHJcbiAqIFRoaXMgaXMgbWFpbmx5IHJlcXVpcmVkIGJlY2F1c2UgQW5ndWxhciBVbml2ZXJzYWwgaW50ZWdyYXRpb24uXHJcbiAqIEl0IGRvZXMgaW5qZWN0IGEgQ29va2llU3RvcmFnZSBpbnN0ZWFkIG9mIExvY2FsU3RvcmFnZS5cclxuICoqL1xyXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxTdG9yYWdlIGV4dGVuZHMgQmFzZVN0b3JhZ2Uge31cclxuLyoqXHJcbiAqwqBAbW9kdWxlIFNES1N0b3JhZ2VcclxuICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1YmlhcyA8dDogam9obmNhc2FycnViaWFzLCBnaDogbWVhbi1leHBlcnQtb2ZmaWNpYWw+XHJcbiAqIEBsaWNlbnNlIE1JVFxyXG4gKiBAZGVzY3JpcHRpb25cclxuICogVGhlIFNES1N0b3JhZ2UgY2xhc3MgaXMgdXNlZCBmb3IgZGVwZW5kZW5jeSBpbmplY3Rpb24gc3dhcHBpbmcuXHJcbiAqIEl0IHdpbGwgYmUgcHJvdmlkZWQgdXNpbmcgZmFjdG9yeSBtZXRob2QgYWNjb3JkaW5nIHRoZSByaWdodCBlbnZpcm9ubWVudC5cclxuICogVGhpcyBpcyBjcmVhdGVkIGZvciBwdWJsaWMgdXNhZ2UsIHRvIGFsbG93IHBlcnNpc3RpbmcgY3VzdG9tIGRhdGFcclxuICogSW50byB0aGUgbG9jYWwgc3RvcmFnZSBBUEkuXHJcbiAqKi9cclxuZXhwb3J0IGNsYXNzIFNES1N0b3JhZ2UgZXh0ZW5kcyBCYXNlU3RvcmFnZSB7fVxyXG4iXX0=