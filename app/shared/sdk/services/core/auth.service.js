"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var storage_swaps_1 = require("../../storage/storage.swaps");
var BaseModels_1 = require("../../models/BaseModels");
/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
var LoopBackAuth = (function () {
    /**
     * @method constructor
     * @param {InternalStorage} storage Internal Storage Driver
     * @description
     * The constructor will initialize the token loading data from storage
     **/
    function LoopBackAuth(storage) {
        this.storage = storage;
        /**
         * @type {SDKToken}
         **/
        this.token = new BaseModels_1.SDKToken();
        /**
         * @type {string}
         **/
        this.prefix = '$LoopBackSDK$';
        this.token.id = this.load('id');
        this.token.user = this.load('user');
        this.token.userId = this.load('userId');
        this.token.created = this.load('created');
        this.token.ttl = this.load('ttl');
        this.token.rememberMe = this.load('rememberMe');
    }
    /**
     * @method setRememberMe
     * @param {boolean} value Flag to remember credentials
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    LoopBackAuth.prototype.setRememberMe = function (value) {
        this.token.rememberMe = value;
    };
    /**
     * @method setUser
     * @param {any} user Any type of user model
     * @return {void}
     * @description
     * This method will update the user information and persist it if the
     * rememberMe flag is set.
     **/
    LoopBackAuth.prototype.setUser = function (user) {
        this.token.user = user;
        this.save();
    };
    /**
     * @method setToken
     * @param {SDKToken} token SDKToken or casted AccessToken instance
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    LoopBackAuth.prototype.setToken = function (token) {
        this.token = Object.assign({}, this.token, token);
        this.save();
    };
    /**
     * @method getToken
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials.
     **/
    LoopBackAuth.prototype.getToken = function () {
        return this.token;
    };
    /**
     * @method getAccessTokenId
     * @return {string}
     * @description
     * This method will return the actual token string, not the object instance.
     **/
    LoopBackAuth.prototype.getAccessTokenId = function () {
        return this.token.id;
    };
    /**
     * @method getCurrentUserId
     * @return {any}
     * @description
     * This method will return the current user id, it can be number or string.
     **/
    LoopBackAuth.prototype.getCurrentUserId = function () {
        return this.token.userId;
    };
    /**
     * @method getCurrentUserData
     * @return {any}
     * @description
     * This method will return the current user instance.
     **/
    LoopBackAuth.prototype.getCurrentUserData = function () {
        return (typeof this.token.user === 'string') ? JSON.parse(this.token.user) : this.token.user;
    };
    /**
     * @method save
     * @return {boolean} Whether or not the information was saved
     * @description
     * This method will save in either local storage or cookies the current credentials.
     * But only if rememberMe is enabled.
     **/
    LoopBackAuth.prototype.save = function () {
        if (this.token.rememberMe) {
            var today = new Date();
            var expires = new Date(today.getTime() + (this.token.ttl * 1000));
            this.persist('id', this.token.id, expires);
            this.persist('user', this.token.user, expires);
            this.persist('userId', this.token.userId, expires);
            this.persist('created', this.token.created, expires);
            this.persist('ttl', this.token.ttl, expires);
            this.persist('rememberMe', this.token.rememberMe, expires);
            return true;
        }
        else {
            return false;
        }
    };
    ;
    /**
     * @method load
     * @param {string} prop Property name
     * @return {any} Any information persisted in storage
     * @description
     * This method will load either from local storage or cookies the provided property.
     **/
    LoopBackAuth.prototype.load = function (prop) {
        return this.storage.get("" + this.prefix + prop);
    };
    /**
     * @method clear
     * @return {void}
     * @description
     * This method will clear cookies or the local storage.
     **/
    LoopBackAuth.prototype.clear = function () {
        var _this = this;
        Object.keys(this.token).forEach(function (prop) { return _this.storage.remove("" + _this.prefix + prop); });
        this.token = new BaseModels_1.SDKToken();
    };
    /**
     * @method persist
     * @return {void}
     * @description
     * This method saves values to storage
     **/
    LoopBackAuth.prototype.persist = function (prop, value, expires) {
        try {
            this.storage.set("" + this.prefix + prop, (typeof value === 'object') ? JSON.stringify(value) : value, expires);
        }
        catch (err) {
            console.error('Cannot access local/session storage:', err);
        }
    };
    LoopBackAuth = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(storage_swaps_1.InternalStorage)),
        __metadata("design:paramtypes", [storage_swaps_1.InternalStorage])
    ], LoopBackAuth);
    return LoopBackAuth;
}());
exports.LoopBackAuth = LoopBackAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsc0NBQW1EO0FBQ25ELDZEQUE4RDtBQUM5RCxzREFBbUQ7QUFDbkQ7Ozs7Ozs7O0dBUUc7QUFFSDtJQVNFOzs7OztRQUtJO0lBQ0osc0JBQStDLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBZHZFOztZQUVJO1FBQ0ksVUFBSyxHQUFhLElBQUkscUJBQVEsRUFBRSxDQUFDO1FBQ3pDOztZQUVJO1FBQ00sV0FBTSxHQUFXLGVBQWUsQ0FBQztRQVF6QyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0Q7Ozs7OztRQU1JO0lBQ0csb0NBQWEsR0FBcEIsVUFBcUIsS0FBYztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUNEOzs7Ozs7O1FBT0k7SUFDRyw4QkFBTyxHQUFkLFVBQWUsSUFBUztRQUN0QixJ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QUssT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFHLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBTSxDQUFDLEVBQTVDLENBQTRDLENBQUMsQ0FBQztRQUNoRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUkscUJBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFDRDs7Ozs7UUFLSTtJQUNNLDhCQUFPLEdBQWpCLFVBQWtCLElBQVksRUFBRSxLQUFVLEVBQUUsT0FBYztRQUN4RCxJQUFJLENBQUM7WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDZCxLQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBTSxFQUN2QixDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxFQUMzRCxPQUFPLENBQ1IsQ0FBQztRQUNKLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RCxDQUFDO0lBQ0gsQ0FBQztJQXZKVSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7UUFnQkUsV0FBQSxhQUFNLENBQUMsK0JBQWUsQ0FBQyxDQUFBO3lDQUFvQiwrQkFBZTtPQWY1RCxZQUFZLENBd0p4QjtJQUFELG1CQUFDO0NBQUEsQUF4SkQsSUF3SkM7QUF4Slksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xyXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEludGVybmFsU3RvcmFnZSB9IGZyb20gJy4uLy4uL3N0b3JhZ2Uvc3RvcmFnZS5zd2Fwcyc7XHJcbmltcG9ydCB7IFNES1Rva2VuIH0gZnJvbSAnLi4vLi4vbW9kZWxzL0Jhc2VNb2RlbHMnO1xyXG4vKipcclxuKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0d2l0dGVyOkBqb2huY2FzYXJydWJpYXM+IDxnaXRodWI6QG1lYW4tZXhwZXJ0LW9mZmljaWFsPlxyXG4qIEBtb2R1bGUgU29ja2V0Q29ubmVjdGlvblxyXG4qIEBsaWNlbnNlIE1JVFxyXG4qIEBkZXNjcmlwdGlvblxyXG4qIFRoaXMgbW9kdWxlIGhhbmRsZSBzb2NrZXQgY29ubmVjdGlvbnMgYW5kIHJldHVybiBzaW5nbGV0b24gaW5zdGFuY2VzIGZvciBlYWNoXHJcbiogY29ubmVjdGlvbiwgaXQgd2lsbCB1c2UgdGhlIFNESyBTb2NrZXQgRHJpdmVyIEF2YWlsYWJsZSBjdXJyZW50bHkgc3VwcG9ydGluZ1xyXG4qIEFuZ3VsYXIgMiBmb3Igd2ViLCBOYXRpdmVTY3JpcHQgMiBhbmQgQW5ndWxhciBVbml2ZXJzYWwuXHJcbioqL1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBMb29wQmFja0F1dGgge1xyXG4gIC8qKlxyXG4gICAqIEB0eXBlIHtTREtUb2tlbn1cclxuICAgKiovXHJcbiAgcHJpdmF0ZSB0b2tlbjogU0RLVG9rZW4gPSBuZXcgU0RLVG9rZW4oKTtcclxuICAvKipcclxuICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAqKi9cclxuICBwcm90ZWN0ZWQgcHJlZml4OiBzdHJpbmcgPSAnJExvb3BCYWNrU0RLJCc7XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBjb25zdHJ1Y3RvclxyXG4gICAqIEBwYXJhbSB7SW50ZXJuYWxTdG9yYWdlfSBzdG9yYWdlIEludGVybmFsIFN0b3JhZ2UgRHJpdmVyXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhlIGNvbnN0cnVjdG9yIHdpbGwgaW5pdGlhbGl6ZSB0aGUgdG9rZW4gbG9hZGluZyBkYXRhIGZyb20gc3RvcmFnZVxyXG4gICAqKi9cclxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEludGVybmFsU3RvcmFnZSkgcHJvdGVjdGVkIHN0b3JhZ2U6IEludGVybmFsU3RvcmFnZSkge1xyXG4gICAgdGhpcy50b2tlbi5pZCA9IHRoaXMubG9hZCgnaWQnKTtcclxuICAgIHRoaXMudG9rZW4udXNlciA9IHRoaXMubG9hZCgndXNlcicpO1xyXG4gICAgdGhpcy50b2tlbi51c2VySWQgPSB0aGlzLmxvYWQoJ3VzZXJJZCcpO1xyXG4gICAgdGhpcy50b2tlbi5jcmVhdGVkID0gdGhpcy5sb2FkKCdjcmVhdGVkJyk7XHJcbiAgICB0aGlzLnRva2VuLnR0bCA9IHRoaXMubG9hZCgndHRsJyk7XHJcbiAgICB0aGlzLnRva2VuLnJlbWVtYmVyTWUgPSB0aGlzLmxvYWQoJ3JlbWVtYmVyTWUnKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRSZW1lbWJlck1lXHJcbiAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZSBGbGFnIHRvIHJlbWVtYmVyIGNyZWRlbnRpYWxzXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNldCBhIGZsYWcgaW4gb3JkZXIgdG8gcmVtZW1iZXIgdGhlIGN1cnJlbnQgY3JlZGVudGlhbHNcclxuICAgKiovXHJcbiAgcHVibGljIHNldFJlbWVtYmVyTWUodmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMudG9rZW4ucmVtZW1iZXJNZSA9IHZhbHVlO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIHNldFVzZXJcclxuICAgKiBAcGFyYW0ge2FueX0gdXNlciBBbnkgdHlwZSBvZiB1c2VyIG1vZGVsXHJcbiAgICogQHJldHVybiB7dm9pZH1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHVwZGF0ZSB0aGUgdXNlciBpbmZvcm1hdGlvbiBhbmQgcGVyc2lzdCBpdCBpZiB0aGVcclxuICAgKiByZW1lbWJlck1lIGZsYWcgaXMgc2V0LlxyXG4gICAqKi9cclxuICBwdWJsaWMgc2V0VXNlcih1c2VyOiBhbnkpIHtcclxuICAgIHRoaXMudG9rZW4udXNlciA9IHVzZXI7XHJcbiAgICB0aGlzLnNhdmUoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBzZXRUb2tlblxyXG4gICAqIEBwYXJhbSB7U0RLVG9rZW59IHRva2VuIFNES1Rva2VuIG9yIGNhc3RlZCBBY2Nlc3NUb2tlbiBpbnN0YW5jZVxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzZXQgYSBmbGFnIGluIG9yZGVyIHRvIHJlbWVtYmVyIHRoZSBjdXJyZW50IGNyZWRlbnRpYWxzXHJcbiAgICoqL1xyXG4gIHB1YmxpYyBzZXRUb2tlbih0b2tlbjogU0RLVG9rZW4pOiB2b2lkIHtcclxuICAgIHRoaXMudG9rZW4gPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnRva2VuLCB0b2tlbik7XHJcbiAgICB0aGlzLnNhdmUoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBnZXRUb2tlblxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzZXQgYSBmbGFnIGluIG9yZGVyIHRvIHJlbWVtYmVyIHRoZSBjdXJyZW50IGNyZWRlbnRpYWxzLlxyXG4gICAqKi9cclxuICBwdWJsaWMgZ2V0VG9rZW4oKTogU0RLVG9rZW4ge1xyXG4gICAgcmV0dXJuIDxTREtUb2tlbj50aGlzLnRva2VuO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBAbWV0aG9kIGdldEFjY2Vzc1Rva2VuSWRcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIGFjdHVhbCB0b2tlbiBzdHJpbmcsIG5vdCB0aGUgb2JqZWN0IGluc3RhbmNlLlxyXG4gICAqKi9cclxuICBwdWJsaWMgZ2V0QWNjZXNzVG9rZW5JZCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMudG9rZW4uaWQ7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgZ2V0Q3VycmVudFVzZXJJZFxyXG4gICAqIEByZXR1cm4ge2FueX1cclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgY3VycmVudCB1c2VyIGlkLCBpdCBjYW4gYmUgbnVtYmVyIG9yIHN0cmluZy5cclxuICAgKiovXHJcbiAgcHVibGljIGdldEN1cnJlbnRVc2VySWQoKTogYW55IHtcclxuICAgIHJldHVybiB0aGlzLnRva2VuLnVzZXJJZDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBnZXRDdXJyZW50VXNlckRhdGFcclxuICAgKiBAcmV0dXJuIHthbnl9XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIGN1cnJlbnQgdXNlciBpbnN0YW5jZS5cclxuICAgKiovXHJcbiAgcHVibGljIGdldEN1cnJlbnRVc2VyRGF0YSgpOiBhbnkge1xyXG4gICAgcmV0dXJuICh0eXBlb2YgdGhpcy50b2tlbi51c2VyID09PSAnc3RyaW5nJykgPyBKU09OLnBhcnNlKHRoaXMudG9rZW4udXNlcikgOiB0aGlzLnRva2VuLnVzZXI7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2Qgc2F2ZVxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBpbmZvcm1hdGlvbiB3YXMgc2F2ZWRcclxuICAgKiBAZGVzY3JpcHRpb25cclxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNhdmUgaW4gZWl0aGVyIGxvY2FsIHN0b3JhZ2Ugb3IgY29va2llcyB0aGUgY3VycmVudCBjcmVkZW50aWFscy5cclxuICAgKiBCdXQgb25seSBpZiByZW1lbWJlck1lIGlzIGVuYWJsZWQuXHJcbiAgICoqL1xyXG4gIHB1YmxpYyBzYXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKHRoaXMudG9rZW4ucmVtZW1iZXJNZSkge1xyXG4gICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICBsZXQgZXhwaXJlcyA9IG5ldyBEYXRlKHRvZGF5LmdldFRpbWUoKSArICh0aGlzLnRva2VuLnR0bCAqIDEwMDApKTtcclxuICAgICAgdGhpcy5wZXJzaXN0KCdpZCcsIHRoaXMudG9rZW4uaWQsIGV4cGlyZXMpO1xyXG4gICAgICB0aGlzLnBlcnNpc3QoJ3VzZXInLCB0aGlzLnRva2VuLnVzZXIsIGV4cGlyZXMpO1xyXG4gICAgICB0aGlzLnBlcnNpc3QoJ3VzZXJJZCcsIHRoaXMudG9rZW4udXNlcklkLCBleHBpcmVzKTtcclxuICAgICAgdGhpcy5wZXJzaXN0KCdjcmVhdGVkJywgdGhpcy50b2tlbi5jcmVhdGVkLCBleHBpcmVzKTtcclxuICAgICAgdGhpcy5wZXJzaXN0KCd0dGwnLCB0aGlzLnRva2VuLnR0bCwgZXhwaXJlcyk7XHJcbiAgICAgIHRoaXMucGVyc2lzdCgncmVtZW1iZXJNZScsIHRoaXMudG9rZW4ucmVtZW1iZXJNZSwgZXhwaXJlcyk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgLyoqXHJcbiAgICogQG1ldGhvZCBsb2FkXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgUHJvcGVydHkgbmFtZVxyXG4gICAqIEByZXR1cm4ge2FueX0gQW55IGluZm9ybWF0aW9uIHBlcnNpc3RlZCBpbiBzdG9yYWdlXHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhpcyBtZXRob2Qgd2lsbCBsb2FkIGVpdGhlciBmcm9tIGxvY2FsIHN0b3JhZ2Ugb3IgY29va2llcyB0aGUgcHJvdmlkZWQgcHJvcGVydHkuXHJcbiAgICoqL1xyXG4gIHByb3RlY3RlZCBsb2FkKHByb3A6IHN0cmluZyk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmdldChgJHt0aGlzLnByZWZpeH0ke3Byb3B9YCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgY2xlYXJcclxuICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAqIEBkZXNjcmlwdGlvblxyXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgY2xlYXIgY29va2llcyBvciB0aGUgbG9jYWwgc3RvcmFnZS5cclxuICAgKiovXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgT2JqZWN0LmtleXModGhpcy50b2tlbikuZm9yRWFjaCgocHJvcDogc3RyaW5nKSA9PiB0aGlzLnN0b3JhZ2UucmVtb3ZlKGAke3RoaXMucHJlZml4fSR7cHJvcH1gKSk7XHJcbiAgICB0aGlzLnRva2VuID0gbmV3IFNES1Rva2VuKCk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIEBtZXRob2QgcGVyc2lzdFxyXG4gICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICogQGRlc2NyaXB0aW9uXHJcbiAgICogVGhpcyBtZXRob2Qgc2F2ZXMgdmFsdWVzIHRvIHN0b3JhZ2VcclxuICAgKiovXHJcbiAgcHJvdGVjdGVkIHBlcnNpc3QocHJvcDogc3RyaW5nLCB2YWx1ZTogYW55LCBleHBpcmVzPzogRGF0ZSk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5zdG9yYWdlLnNldChcclxuICAgICAgICBgJHt0aGlzLnByZWZpeH0ke3Byb3B9YCxcclxuICAgICAgICAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JykgPyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkgOiB2YWx1ZSxcclxuICAgICAgICBleHBpcmVzXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Nhbm5vdCBhY2Nlc3MgbG9jYWwvc2Vzc2lvbiBzdG9yYWdlOicsIGVycik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==