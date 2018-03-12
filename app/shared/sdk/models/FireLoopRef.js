"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
require("rxjs/add/observable/merge");
var Subject_1 = require("rxjs/Subject");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/merge");
/**
 * @class FireLoopRef<T>
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * This class allows to create FireLoop References which will be in sync with
 * Server. It also allows to create FireLoop Reference Childs, that allows to
 * persist data according the generic model relationships.
 **/
var FireLoopRef = (function () {
    /**
    * @method constructor
    * @param {any} model The model we want to create a reference
    * @param {SocketConnection} socket Socket connection to handle events
    * @param {FireLoopRef<any>} parent Parent FireLoop model reference
    * @param {string} relationship The defined model relationship
    * @description
    * The constructor will receive the required parameters and then will register this reference
    * into the server, needed to allow multiple references for the same model.
    * This ids are referenced into this specific client connection and won't have issues
    * with other client ids.
    **/
    function FireLoopRef(model, socket, parent, relationship) {
        if (parent === void 0) { parent = null; }
        if (relationship === void 0) { relationship = null; }
        this.model = model;
        this.socket = socket;
        this.parent = parent;
        this.relationship = relationship;
        // Reference ID
        this.id = this.buildId();
        // Model Childs
        this.childs = {};
        // Disposable Events
        this.disposable = {};
        this.socket.emit("Subscribe." + (!parent ? model.getModelName() : parent.model.getModelName()), { id: this.id, scope: model.getModelName(), relationship: relationship });
        return this;
    }
    /**
    * @method dispose
    * @return {void}
    * @description
    * This method is super important to avoid memory leaks in the server.
    * This method requires to be called on components destroy
    *
    * ngOnDestroy() {
    *  this.someRef.dispose()
    * }
    **/
    FireLoopRef.prototype.dispose = function () {
        var _this = this;
        var subscription = this.operation('dispose', {}).subscribe(function () {
            Object.keys(_this.disposable).forEach(function (channel) {
                _this.socket.removeListener(channel, _this.disposable[channel]);
                _this.socket.removeAllListeners(channel);
            });
            subscription.unsubscribe();
        });
    };
    /**
    * @method upsert
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for upsert function.
    **/
    FireLoopRef.prototype.upsert = function (data) {
        return this.operation('upsert', data);
    };
    /**
    * @method create
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for create function.
    **/
    FireLoopRef.prototype.create = function (data) {
        return this.operation('create', data);
    };
    /**
    * @method remove
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for remove function.
    **/
    FireLoopRef.prototype.remove = function (data) {
        return this.operation('remove', data);
    };
    /**
    * @method remote
    * @param {string} method Remote method name
    * @param {any[]=} params Parameters to be applied into the remote method
    * @param {boolean} broadcast Flag to define if the method results should be broadcasted
    * @return {Observable<any>}
    * @description
    * This method calls for any remote method. It is flexible enough to
    * allow you call either built-in or custom remote methods.
    *
    * FireLoop provides this interface to enable calling remote methods
    * but also to optionally send any defined accept params that will be
    * applied within the server.
    **/
    FireLoopRef.prototype.remote = function (method, params, broadcast) {
        if (broadcast === void 0) { broadcast = false; }
        return this.operation('remote', { method: method, params: params, broadcast: broadcast });
    };
    /**
    * @method onRemote
    * @param {string} method Remote method name
    * @return {Observable<any>}
    * @description
    * This method listen for public broadcasted remote method results. If the remote method
    * execution is not public only the owner will receive the result data.
    **/
    FireLoopRef.prototype.onRemote = function (method) {
        var event = 'remote';
        if (!this.relationship) {
            event = this.model.getModelName() + "." + event;
        }
        else {
            event = this.parent.model.getModelName() + "." + this.relationship + "." + event;
        }
        return this.broadcasts(event, {});
    };
    /**
    * @method on
    * @param {string} event Event name
    * @param {LoopBackFilter} filter LoopBack query filter
    * @return {Observable<T>}
    * @description
    * Listener for different type of events. Valid events are:
    *   - change (Triggers on any model change -create, update, remove-)
    *   - value (Triggers on new entries)
    *   - child_added (Triggers when a child is added)
    *   - child_updated (Triggers when a child is updated)
    *   - child_removed (Triggers when a child is removed)
    **/
    FireLoopRef.prototype.on = function (event, filter) {
        if (filter === void 0) { filter = { limit: 100, order: 'id DESC' }; }
        if (event === 'remote') {
            throw new Error('The "remote" event is not allowed using "on()" method, use "onRemote()" instead');
        }
        var request;
        if (!this.relationship) {
            event = this.model.getModelName() + "." + event;
            request = { filter: filter };
        }
        else {
            event = this.parent.model.getModelName() + "." + this.relationship + "." + event;
            request = { filter: filter, parent: this.parent.instance };
        }
        if (event.match(/(value|change|stats)/)) {
            return Observable_1.Observable.merge(this.pull(event, request), this.broadcasts(event, request));
        }
        else {
            return this.broadcasts(event, request);
        }
    };
    /**
    * @method stats
    * @param {LoopBackFilter=} filter LoopBack query filter
    * @return {Observable<T>}
    * @description
    * Listener for real-time statistics, will trigger on every
    * statistic modification.
    * TIP: You can improve performance by adding memcached to LoopBack models.
    **/
    FireLoopRef.prototype.stats = function (filter) {
        return this.on('stats', filter);
    };
    /**
    * @method make
    * @param {any} instance Persisted model instance reference
    * @return {Observable<T>}
    * @description
    * This method will set a model instance into this a new FireLoop Reference.
    * This allows to persiste parentship when creating related instances.
    *
    * It also allows to have multiple different persisted instance references to same model.
    * otherwise if using singleton will replace a previous instance for a new instance, when
    * we actually want to have more than 1 instance of same model.
    **/
    FireLoopRef.prototype.make = function (instance) {
        var reference = new FireLoopRef(this.model, this.socket);
        reference.instance = instance;
        return reference;
    };
    /**
    * @method child
    * @param {string} relationship A defined model relationship
    * @return {FireLoopRef<T>}
    * @description
    * This method creates child references, which will persist related model
    * instances. e.g. Room.messages, where messages belongs to a specific Room.
    **/
    FireLoopRef.prototype.child = function (relationship) {
        // Return singleton instance
        if (this.childs[relationship]) {
            return this.childs[relationship];
        }
        // Try to get relation settings from current model
        var settings = this.model.getModelDefinition().relations[relationship];
        // Verify the relationship actually exists
        if (!settings) {
            throw new Error("Invalid model relationship " + this.model.getModelName() + " <-> " + relationship + ", verify your model settings.");
        }
        // Verify if the relationship model is public
        if (settings.model === '') {
            throw new Error("Relationship model is private, cam't use " + relationship + " unless you set your model as public.");
        }
        // Lets get a model reference and add a reference for all of the models
        var model = this.model.models.get(settings.model);
        model.models = this.model.models;
        // If everything goes well, we will store a child reference and return it.
        this.childs[relationship] = new FireLoopRef(model, this.socket, this, relationship);
        return this.childs[relationship];
    };
    /**
    * @method pull
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This method will pull initial data from server
    **/
    FireLoopRef.prototype.pull = function (event, request) {
        var sbj = new Subject_1.Subject();
        var that = this;
        var nowEvent = event + ".pull.requested." + this.id;
        this.socket.emit(event + ".pull.request." + this.id, request);
        function pullNow(data) {
            if (that.socket.removeListener) {
                that.socket.removeListener(nowEvent, pullNow);
            }
            sbj.next(data);
        }
        ;
        this.socket.on(nowEvent, pullNow);
        return sbj.asObservable();
    };
    /**
    * @method broadcasts
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This will listen for public broadcasts announces and then request
    * for data according a specific client request, not shared with other clients.
    **/
    FireLoopRef.prototype.broadcasts = function (event, request) {
        var sbj = new Subject_1.Subject();
        var channels = {
            announce: event + ".broadcast.announce." + this.id,
            broadcast: event + ".broadcast." + this.id
        };
        var that = this;
        // Announces Handler
        this.disposable[channels.announce] = function (res) {
            that.socket.emit(event + ".broadcast.request." + that.id, request);
        };
        // Broadcasts Handler
        this.disposable[channels.broadcast] = function (data) {
            sbj.next(data);
        };
        this.socket.on(channels.announce, this.disposable[channels.announce]);
        this.socket.on(channels.broadcast, this.disposable[channels.broadcast]);
        return sbj.asObservable();
    };
    /**
    * @method operation
    * @param {string} event Event name
    * @param {any} data Any type of data sent to the server
    * @return {Observable<T>}
    * @description
    * This internal method will run operations depending on current context
    **/
    FireLoopRef.prototype.operation = function (event, data) {
        if (!this.relationship) {
            event = this.model.getModelName() + "." + event + "." + this.id;
        }
        else {
            event = this.parent.model.getModelName() + "." + this.relationship + "." + event + "." + this.id;
        }
        var subject = new Subject_1.Subject();
        var config = {
            data: data,
            parent: this.parent && this.parent.instance ? this.parent.instance : null
        };
        this.socket.emit(event, config);
        var resultEvent = '';
        if (!this.relationship) {
            resultEvent = this.model.getModelName() + ".value.result." + this.id;
        }
        else {
            resultEvent = this.parent.model.getModelName() + "." + this.relationship + ".value.result." + this.id;
        }
        this.socket.on(resultEvent, function (res) {
            if (res.error) {
                subject.error(res);
            }
            else {
                subject.next(res);
            }
        });
        if (event.match('dispose')) {
            setTimeout(function () { return subject.next(); });
        }
        // This event listener will be wiped within socket.connections
        this.socket.sharedObservables.sharedOnDisconnect.subscribe(function () { return subject.complete(); });
        return subject.asObservable().catch(function (error) { return Observable_1.Observable.throw(error); });
    };
    /**
    * @method buildId
    * @return {number}
    * @description
    * This internal method build an ID for this reference, this allows to have
    * multiple references for the same model or relationships.
    **/
    FireLoopRef.prototype.buildId = function () {
        return Date.now() + Math.floor(Math.random() * 100800) *
            Math.floor(Math.random() * 100700) *
            Math.floor(Math.random() * 198500);
    };
    return FireLoopRef;
}());
exports.FireLoopRef = FireLoopRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlyZUxvb3BSZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGaXJlTG9vcFJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9CQUFvQjtBQUNwQixxQ0FBbUM7QUFDbkMsd0NBQXVDO0FBQ3ZDLDhDQUE2QztBQUM3QyxtQ0FBaUM7QUFHakM7Ozs7Ozs7O0lBUUk7QUFDSjtJQVNFOzs7Ozs7Ozs7OztPQVdHO0lBQ0gscUJBQ1UsS0FBVSxFQUNWLE1BQXdCLEVBQ3hCLE1BQStCLEVBQy9CLFlBQTJCO1FBRDNCLHVCQUFBLEVBQUEsYUFBK0I7UUFDL0IsNkJBQUEsRUFBQSxtQkFBMkI7UUFIM0IsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUNWLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQy9CLGlCQUFZLEdBQVosWUFBWSxDQUFlO1FBeEJyQyxlQUFlO1FBQ1AsT0FBRSxHQUFXLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUdwQyxlQUFlO1FBQ1AsV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUN6QixvQkFBb0I7UUFDWixlQUFVLEdBQTJCLEVBQUUsQ0FBQztRQW1COUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2QsZ0JBQWEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUUsRUFDM0UsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLFlBQVksRUFBRSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FDekUsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0Q7Ozs7Ozs7Ozs7T0FVRztJQUNJLDZCQUFPLEdBQWQ7UUFBQSxpQkFRQztRQVBDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFF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QUFLLE9BQUEsdUJBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ssNkJBQU8sR0FBZjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDO1lBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBdFRELElBc1RDO0FBdFRZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cclxuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL21lcmdlJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL21lcmdlJztcclxuaW1wb3J0IHsgTG9vcEJhY2tGaWx0ZXIsIFN0YXRGaWx0ZXIgfSBmcm9tICcuL2luZGV4JztcclxuaW1wb3J0IHsgU29ja2V0Q29ubmVjdGlvbiB9IGZyb20gJy4uL3NvY2tldHMvc29ja2V0LmNvbm5lY3Rpb25zJztcclxuLyoqXHJcbiAqIEBjbGFzcyBGaXJlTG9vcFJlZjxUPlxyXG4gKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzIDx0OiBqb2huY2FzYXJydWJpYXMsIGdoOiBtZWFuLWV4cGVydC1vZmZpY2lhbD5cclxuICogQGxpY2Vuc2UgTUlUXHJcbiAqIEBkZXNjcmlwdGlvblxyXG4gKiBUaGlzIGNsYXNzIGFsbG93cyB0byBjcmVhdGUgRmlyZUxvb3AgUmVmZXJlbmNlcyB3aGljaCB3aWxsIGJlIGluIHN5bmMgd2l0aFxyXG4gKiBTZXJ2ZXIuIEl0IGFsc28gYWxsb3dzIHRvIGNyZWF0ZSBGaXJlTG9vcCBSZWZlcmVuY2UgQ2hpbGRzLCB0aGF0IGFsbG93cyB0b1xyXG4gKiBwZXJzaXN0IGRhdGEgYWNjb3JkaW5nIHRoZSBnZW5lcmljIG1vZGVsIHJlbGF0aW9uc2hpcHMuXHJcbiAqKi9cclxuZXhwb3J0IGNsYXNzIEZpcmVMb29wUmVmPFQ+IHtcclxuICAvLyBSZWZlcmVuY2UgSURcclxuICBwcml2YXRlIGlkOiBudW1iZXIgPSB0aGlzLmJ1aWxkSWQoKTtcclxuICAvLyBNb2RlbCBJbnN0YW5jZSAoRm9yIGNoaWxkIHJlZmVyZW5jZXMsIGVtcHR5IG9uIHJvb3QgcmVmZXJlbmNlcylcclxuICBwcml2YXRlIGluc3RhbmNlOiBhbnk7XHJcbiAgLy8gTW9kZWwgQ2hpbGRzXHJcbiAgcHJpdmF0ZSBjaGlsZHM6IGFueSA9IHt9O1xyXG4gIC8vIERpc3Bvc2FibGUgRXZlbnRzXHJcbiAgcHJpdmF0ZSBkaXNwb3NhYmxlOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIGNvbnN0cnVjdG9yXHJcbiAgKiBAcGFyYW0ge2FueX0gbW9kZWwgVGhlIG1vZGVsIHdlIHdhbnQgdG8gY3JlYXRlIGEgcmVmZXJlbmNlXHJcbiAgKiBAcGFyYW0ge1NvY2tldENvbm5lY3Rpb259IHNvY2tldCBTb2NrZXQgY29ubmVjdGlvbiB0byBoYW5kbGUgZXZlbnRzXHJcbiAgKiBAcGFyYW0ge0ZpcmVMb29wUmVmPGFueT59IHBhcmVudCBQYXJlbnQgRmlyZUxvb3AgbW9kZWwgcmVmZXJlbmNlXHJcbiAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25zaGlwIFRoZSBkZWZpbmVkIG1vZGVsIHJlbGF0aW9uc2hpcFxyXG4gICogQGRlc2NyaXB0aW9uXHJcbiAgKiBUaGUgY29uc3RydWN0b3Igd2lsbCByZWNlaXZlIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIGFuZCB0aGVuIHdpbGwgcmVnaXN0ZXIgdGhpcyByZWZlcmVuY2VcclxuICAqIGludG8gdGhlIHNlcnZlciwgbmVlZGVkIHRvIGFsbG93IG11bHRpcGxlIHJlZmVyZW5jZXMgZm9yIHRoZSBzYW1lIG1vZGVsLlxyXG4gICogVGhpcyBpZHMgYXJlIHJlZmVyZW5jZWQgaW50byB0aGlzIHNwZWNpZmljIGNsaWVudCBjb25uZWN0aW9uIGFuZCB3b24ndCBoYXZlIGlzc3Vlc1xyXG4gICogd2l0aCBvdGhlciBjbGllbnQgaWRzLlxyXG4gICoqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBtb2RlbDogYW55LFxyXG4gICAgcHJpdmF0ZSBzb2NrZXQ6IFNvY2tldENvbm5lY3Rpb24sXHJcbiAgICBwcml2YXRlIHBhcmVudDogRmlyZUxvb3BSZWY8YW55PiA9IG51bGwsXHJcbiAgICBwcml2YXRlIHJlbGF0aW9uc2hpcDogc3RyaW5nID0gbnVsbFxyXG4gICkge1xyXG4gICAgdGhpcy5zb2NrZXQuZW1pdChcclxuICAgICAgYFN1YnNjcmliZS4keyFwYXJlbnQgPyBtb2RlbC5nZXRNb2RlbE5hbWUoKSA6IHBhcmVudC5tb2RlbC5nZXRNb2RlbE5hbWUoKX1gLFxyXG4gICAgICB7IGlkOiB0aGlzLmlkLCBzY29wZTogbW9kZWwuZ2V0TW9kZWxOYW1lKCksIHJlbGF0aW9uc2hpcDogcmVsYXRpb25zaGlwIH1cclxuICAgICk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIGRpc3Bvc2VcclxuICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgKiBAZGVzY3JpcHRpb25cclxuICAqIFRoaXMgbWV0aG9kIGlzIHN1cGVyIGltcG9ydGFudCB0byBhdm9pZCBtZW1vcnkgbGVha3MgaW4gdGhlIHNlcnZlci5cclxuICAqIFRoaXMgbWV0aG9kIHJlcXVpcmVzIHRvIGJlIGNhbGxlZCBvbiBjb21wb25lbnRzIGRlc3Ryb3lcclxuICAqXHJcbiAgKiBuZ09uRGVzdHJveSgpIHtcclxuICAqICB0aGlzLnNvbWVSZWYuZGlzcG9zZSgpIFxyXG4gICogfVxyXG4gICoqL1xyXG4gIHB1YmxpYyBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3Vic2NyaXB0aW9uID0gdGhpcy5vcGVyYXRpb24oJ2Rpc3Bvc2UnLCB7fSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5kaXNwb3NhYmxlKS5mb3JFYWNoKChjaGFubmVsOiBzdHJpbmcpID0+IHtcclxuICAgICAgICB0aGlzLnNvY2tldC5yZW1vdmVMaXN0ZW5lcihjaGFubmVsLCB0aGlzLmRpc3Bvc2FibGVbY2hhbm5lbF0pO1xyXG4gICAgICAgIHRoaXMuc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycyhjaGFubmVsKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogQG1ldGhvZCB1cHNlcnRcclxuICAqIEBwYXJhbSB7VH0gZGF0YSBQZXJzaXN0ZWQgbW9kZWwgaW5zdGFuY2VcclxuICAqIEByZXR1cm4ge09ic2VydmFibGU8VD59XHJcbiAgKiBAZGVzY3JpcHRpb25cclxuICAqIE9wZXJhdGlvbiB3cmFwcGVyIGZvciB1cHNlcnQgZnVuY3Rpb24uXHJcbiAgKiovXHJcbiAgcHVibGljIHVwc2VydChkYXRhOiBUKTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5vcGVyYXRpb24oJ3Vwc2VydCcsIGRhdGEpO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgY3JlYXRlXHJcbiAgKiBAcGFyYW0ge1R9IGRhdGEgUGVyc2lzdGVkIG1vZGVsIGluc3RhbmNlXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxyXG4gICogQGRlc2NyaXB0aW9uXHJcbiAgKiBPcGVyYXRpb24gd3JhcHBlciBmb3IgY3JlYXRlIGZ1bmN0aW9uLlxyXG4gICoqL1xyXG4gIHB1YmxpYyBjcmVhdGUoZGF0YTogVCk6IE9ic2VydmFibGU8VD4ge1xyXG4gICAgcmV0dXJuIHRoaXMub3BlcmF0aW9uKCdjcmVhdGUnLCBkYXRhKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIHJlbW92ZVxyXG4gICogQHBhcmFtIHtUfSBkYXRhIFBlcnNpc3RlZCBtb2RlbCBpbnN0YW5jZVxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAqIEBkZXNjcmlwdGlvblxyXG4gICogT3BlcmF0aW9uIHdyYXBwZXIgZm9yIHJlbW92ZSBmdW5jdGlvbi5cclxuICAqKi9cclxuICBwdWJsaWMgcmVtb3ZlKGRhdGE6IFQpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbigncmVtb3ZlJywgZGF0YSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogQG1ldGhvZCByZW1vdGVcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgUmVtb3RlIG1ldGhvZCBuYW1lXHJcbiAgKiBAcGFyYW0ge2FueVtdPX0gcGFyYW1zIFBhcmFtZXRlcnMgdG8gYmUgYXBwbGllZCBpbnRvIHRoZSByZW1vdGUgbWV0aG9kXHJcbiAgKiBAcGFyYW0ge2Jvb2xlYW59IGJyb2FkY2FzdCBGbGFnIHRvIGRlZmluZSBpZiB0aGUgbWV0aG9kIHJlc3VsdHMgc2hvdWxkIGJlIGJyb2FkY2FzdGVkXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKiBAZGVzY3JpcHRpb25cclxuICAqIFRoaXMgbWV0aG9kIGNhbGxzIGZvciBhbnkgcmVtb3RlIG1ldGhvZC4gSXQgaXMgZmxleGlibGUgZW5vdWdoIHRvXHJcbiAgKiBhbGxvdyB5b3UgY2FsbCBlaXRoZXIgYnVpbHQtaW4gb3IgY3VzdG9tIHJlbW90ZSBtZXRob2RzLlxyXG4gICpcclxuICAqIEZpcmVMb29wIHByb3ZpZGVzIHRoaXMgaW50ZXJmYWNlIHRvIGVuYWJsZSBjYWxsaW5nIHJlbW90ZSBtZXRob2RzXHJcbiAgKiBidXQgYWxzbyB0byBvcHRpb25hbGx5IHNlbmQgYW55IGRlZmluZWQgYWNjZXB0IHBhcmFtcyB0aGF0IHdpbGwgYmVcclxuICAqIGFwcGxpZWQgd2l0aGluIHRoZSBzZXJ2ZXIuXHJcbiAgKiovXHJcbiAgcHVibGljIHJlbW90ZShtZXRob2Q6IHN0cmluZywgcGFyYW1zPzogYW55W10sIGJyb2FkY2FzdDogYm9vbGVhbiA9IGZhbHNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLm9wZXJhdGlvbigncmVtb3RlJywgeyBtZXRob2QsIHBhcmFtcywgYnJvYWRjYXN0IH0pO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2Qgb25SZW1vdGVcclxuICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2QgUmVtb3RlIG1ldGhvZCBuYW1lXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbiAgKiBAZGVzY3JpcHRpb25cclxuICAqIFRoaXMgbWV0aG9kIGxpc3RlbiBmb3IgcHVibGljIGJyb2FkY2FzdGVkIHJlbW90ZSBtZXRob2QgcmVzdWx0cy4gSWYgdGhlIHJlbW90ZSBtZXRob2RcclxuICAqIGV4ZWN1dGlvbiBpcyBub3QgcHVibGljIG9ubHkgdGhlIG93bmVyIHdpbGwgcmVjZWl2ZSB0aGUgcmVzdWx0IGRhdGEuXHJcbiAgKiovXHJcbiAgcHVibGljIG9uUmVtb3RlKG1ldGhvZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGxldCBldmVudDogc3RyaW5nID0gJ3JlbW90ZSc7XHJcbiAgICBpZiAoIXRoaXMucmVsYXRpb25zaGlwKSB7XHJcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHtldmVudH1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZXZlbnQgPSBgJHt0aGlzLnBhcmVudC5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHt0aGlzLnJlbGF0aW9uc2hpcH0uJHtldmVudH1gO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuYnJvYWRjYXN0cyhldmVudCwge30pO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2Qgb25cclxuICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCBFdmVudCBuYW1lXHJcbiAgKiBAcGFyYW0ge0xvb3BCYWNrRmlsdGVyfSBmaWx0ZXIgTG9vcEJhY2sgcXVlcnkgZmlsdGVyXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxyXG4gICogQGRlc2NyaXB0aW9uXHJcbiAgKiBMaXN0ZW5lciBmb3IgZGlmZmVyZW50IHR5cGUgb2YgZXZlbnRzLiBWYWxpZCBldmVudHMgYXJlOlxyXG4gICogICAtIGNoYW5nZSAoVHJpZ2dlcnMgb24gYW55IG1vZGVsIGNoYW5nZSAtY3JlYXRlLCB1cGRhdGUsIHJlbW92ZS0pXHJcbiAgKiAgIC0gdmFsdWUgKFRyaWdnZXJzIG9uIG5ldyBlbnRyaWVzKVxyXG4gICogICAtIGNoaWxkX2FkZGVkIChUcmlnZ2VycyB3aGVuIGEgY2hpbGQgaXMgYWRkZWQpXHJcbiAgKiAgIC0gY2hpbGRfdXBkYXRlZCAoVHJpZ2dlcnMgd2hlbiBhIGNoaWxkIGlzIHVwZGF0ZWQpXHJcbiAgKiAgIC0gY2hpbGRfcmVtb3ZlZCAoVHJpZ2dlcnMgd2hlbiBhIGNoaWxkIGlzIHJlbW92ZWQpXHJcbiAgKiovXHJcbiAgcHVibGljIG9uKGV2ZW50OiBzdHJpbmcsIGZpbHRlcjogTG9vcEJhY2tGaWx0ZXIgPSB7IGxpbWl0OiAxMDAsIG9yZGVyOiAnaWQgREVTQycgfSk6IE9ic2VydmFibGU8VCB8IFRbXT4ge1xyXG4gICAgaWYgKGV2ZW50ID09PSAncmVtb3RlJykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBcInJlbW90ZVwiIGV2ZW50IGlzIG5vdCBhbGxvd2VkIHVzaW5nIFwib24oKVwiIG1ldGhvZCwgdXNlIFwib25SZW1vdGUoKVwiIGluc3RlYWQnKTtcclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0OiBhbnk7XHJcbiAgICBpZiAoIXRoaXMucmVsYXRpb25zaGlwKSB7XHJcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHtldmVudH1gO1xyXG4gICAgICByZXF1ZXN0ID0geyBmaWx0ZXIgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5wYXJlbnQubW9kZWwuZ2V0TW9kZWxOYW1lKCl9LiR7dGhpcy5yZWxhdGlvbnNoaXB9LiR7ZXZlbnR9YDtcclxuICAgICAgcmVxdWVzdCA9IHsgZmlsdGVyLCBwYXJlbnQ6IHRoaXMucGFyZW50Lmluc3RhbmNlIH07XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQubWF0Y2goLyh2YWx1ZXxjaGFuZ2V8c3RhdHMpLykpIHtcclxuICAgICAgcmV0dXJuIE9ic2VydmFibGUubWVyZ2UoXHJcbiAgICAgICAgdGhpcy5wdWxsKGV2ZW50LCByZXF1ZXN0KSxcclxuICAgICAgICB0aGlzLmJyb2FkY2FzdHMoZXZlbnQsIHJlcXVlc3QpXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy5icm9hZGNhc3RzKGV2ZW50LCByZXF1ZXN0KTtcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIHN0YXRzXHJcbiAgKiBAcGFyYW0ge0xvb3BCYWNrRmlsdGVyPX0gZmlsdGVyIExvb3BCYWNrIHF1ZXJ5IGZpbHRlclxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAqIEBkZXNjcmlwdGlvblxyXG4gICogTGlzdGVuZXIgZm9yIHJlYWwtdGltZSBzdGF0aXN0aWNzLCB3aWxsIHRyaWdnZXIgb24gZXZlcnlcclxuICAqIHN0YXRpc3RpYyBtb2RpZmljYXRpb24uXHJcbiAgKiBUSVA6IFlvdSBjYW4gaW1wcm92ZSBwZXJmb3JtYW5jZSBieSBhZGRpbmcgbWVtY2FjaGVkIHRvIExvb3BCYWNrIG1vZGVscy5cclxuICAqKi9cclxuICBwdWJsaWMgc3RhdHMoZmlsdGVyPzogU3RhdEZpbHRlcik6IE9ic2VydmFibGU8VCB8IFRbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMub24oJ3N0YXRzJywgZmlsdGVyKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIG1ha2VcclxuICAqIEBwYXJhbSB7YW55fSBpbnN0YW5jZSBQZXJzaXN0ZWQgbW9kZWwgaW5zdGFuY2UgcmVmZXJlbmNlXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxyXG4gICogQGRlc2NyaXB0aW9uXHJcbiAgKiBUaGlzIG1ldGhvZCB3aWxsIHNldCBhIG1vZGVsIGluc3RhbmNlIGludG8gdGhpcyBhIG5ldyBGaXJlTG9vcCBSZWZlcmVuY2UuXHJcbiAgKiBUaGlzIGFsbG93cyB0byBwZXJzaXN0ZSBwYXJlbnRzaGlwIHdoZW4gY3JlYXRpbmcgcmVsYXRlZCBpbnN0YW5jZXMuXHJcbiAgKlxyXG4gICogSXQgYWxzbyBhbGxvd3MgdG8gaGF2ZSBtdWx0aXBsZSBkaWZmZXJlbnQgcGVyc2lzdGVkIGluc3RhbmNlIHJlZmVyZW5jZXMgdG8gc2FtZSBtb2RlbC5cclxuICAqIG90aGVyd2lzZSBpZiB1c2luZyBzaW5nbGV0b24gd2lsbCByZXBsYWNlIGEgcHJldmlvdXMgaW5zdGFuY2UgZm9yIGEgbmV3IGluc3RhbmNlLCB3aGVuXHJcbiAgKiB3ZSBhY3R1YWxseSB3YW50IHRvIGhhdmUgbW9yZSB0aGFuIDEgaW5zdGFuY2Ugb2Ygc2FtZSBtb2RlbC5cclxuICAqKi9cclxuICBwdWJsaWMgbWFrZShpbnN0YW5jZTogYW55KTogRmlyZUxvb3BSZWY8VD4ge1xyXG4gICAgbGV0IHJlZmVyZW5jZTogRmlyZUxvb3BSZWY8VD4gPSBuZXcgRmlyZUxvb3BSZWY8VD4odGhpcy5tb2RlbCwgdGhpcy5zb2NrZXQpO1xyXG4gICAgcmVmZXJlbmNlLmluc3RhbmNlID0gaW5zdGFuY2U7XHJcbiAgICByZXR1cm4gcmVmZXJlbmNlO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgY2hpbGRcclxuICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbnNoaXAgQSBkZWZpbmVkIG1vZGVsIHJlbGF0aW9uc2hpcFxyXG4gICogQHJldHVybiB7RmlyZUxvb3BSZWY8VD59XHJcbiAgKiBAZGVzY3JpcHRpb25cclxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgY2hpbGQgcmVmZXJlbmNlcywgd2hpY2ggd2lsbCBwZXJzaXN0IHJlbGF0ZWQgbW9kZWxcclxuICAqIGluc3RhbmNlcy4gZS5nLiBSb29tLm1lc3NhZ2VzLCB3aGVyZSBtZXNzYWdlcyBiZWxvbmdzIHRvIGEgc3BlY2lmaWMgUm9vbS5cclxuICAqKi9cclxuICBwdWJsaWMgY2hpbGQ8VD4ocmVsYXRpb25zaGlwOiBzdHJpbmcpOiBGaXJlTG9vcFJlZjxUPiB7XHJcbiAgICAvLyBSZXR1cm4gc2luZ2xldG9uIGluc3RhbmNlXHJcbiAgICBpZiAodGhpcy5jaGlsZHNbcmVsYXRpb25zaGlwXSkgeyByZXR1cm4gdGhpcy5jaGlsZHNbcmVsYXRpb25zaGlwXTsgfVxyXG4gICAgLy8gVHJ5IHRvIGdldCByZWxhdGlvbiBzZXR0aW5ncyBmcm9tIGN1cnJlbnQgbW9kZWxcclxuICAgIGxldCBzZXR0aW5nczogYW55ID0gdGhpcy5tb2RlbC5nZXRNb2RlbERlZmluaXRpb24oKS5yZWxhdGlvbnNbcmVsYXRpb25zaGlwXTtcclxuICAgIC8vIFZlcmlmeSB0aGUgcmVsYXRpb25zaGlwIGFjdHVhbGx5IGV4aXN0c1xyXG4gICAgaWYgKCFzZXR0aW5ncykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgbW9kZWwgcmVsYXRpb25zaGlwICR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0gPC0+ICR7cmVsYXRpb25zaGlwfSwgdmVyaWZ5IHlvdXIgbW9kZWwgc2V0dGluZ3MuYCk7XHJcbiAgICB9XHJcbiAgICAvLyBWZXJpZnkgaWYgdGhlIHJlbGF0aW9uc2hpcCBtb2RlbCBpcyBwdWJsaWNcclxuICAgIGlmIChzZXR0aW5ncy5tb2RlbCA9PT0gJycpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWxhdGlvbnNoaXAgbW9kZWwgaXMgcHJpdmF0ZSwgY2FtJ3QgdXNlICR7cmVsYXRpb25zaGlwfSB1bmxlc3MgeW91IHNldCB5b3VyIG1vZGVsIGFzIHB1YmxpYy5gKTtcclxuICAgIH1cclxuICAgIC8vIExldHMgZ2V0IGEgbW9kZWwgcmVmZXJlbmNlIGFuZCBhZGQgYSByZWZlcmVuY2UgZm9yIGFsbCBvZiB0aGUgbW9kZWxzXHJcbiAgICBsZXQgbW9kZWw6IGFueSA9IHRoaXMubW9kZWwubW9kZWxzLmdldChzZXR0aW5ncy5tb2RlbCk7XHJcbiAgICBtb2RlbC5tb2RlbHMgPSB0aGlzLm1vZGVsLm1vZGVscztcclxuICAgIC8vIElmIGV2ZXJ5dGhpbmcgZ29lcyB3ZWxsLCB3ZSB3aWxsIHN0b3JlIGEgY2hpbGQgcmVmZXJlbmNlIGFuZCByZXR1cm4gaXQuXHJcbiAgICB0aGlzLmNoaWxkc1tyZWxhdGlvbnNoaXBdID0gbmV3IEZpcmVMb29wUmVmPFQ+KG1vZGVsLCB0aGlzLnNvY2tldCwgdGhpcywgcmVsYXRpb25zaGlwKTtcclxuICAgIHJldHVybiB0aGlzLmNoaWxkc1tyZWxhdGlvbnNoaXBdO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgcHVsbFxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcclxuICAqIEBwYXJhbSB7YW55fSByZXF1ZXN0IFR5cGUgb2YgcmVxdWVzdCwgY2FuIGJlIExCLW9ubHkgZmlsdGVyIG9yIEZMK0xCIGZpbHRlclxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAqIEBkZXNjcmlwdGlvblxyXG4gICogVGhpcyBtZXRob2Qgd2lsbCBwdWxsIGluaXRpYWwgZGF0YSBmcm9tIHNlcnZlclxyXG4gICoqL1xyXG4gIHByaXZhdGUgcHVsbChldmVudDogc3RyaW5nLCByZXF1ZXN0OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcclxuICAgIGxldCBzYmo6IFN1YmplY3Q8VD4gPSBuZXcgU3ViamVjdDxUPigpO1xyXG4gICAgbGV0IHRoYXQ6IEZpcmVMb29wUmVmPFQ+ID0gdGhpcztcclxuICAgIGxldCBub3dFdmVudDogYW55ID0gYCR7ZXZlbnR9LnB1bGwucmVxdWVzdGVkLiR7dGhpcy5pZH1gO1xyXG4gICAgdGhpcy5zb2NrZXQuZW1pdChgJHtldmVudH0ucHVsbC5yZXF1ZXN0LiR7dGhpcy5pZH1gLCByZXF1ZXN0KTtcclxuICAgIGZ1bmN0aW9uIHB1bGxOb3coZGF0YTogYW55KSB7XHJcbiAgICAgIGlmICh0aGF0LnNvY2tldC5yZW1vdmVMaXN0ZW5lcikge1xyXG4gICAgICAgIHRoYXQuc29ja2V0LnJlbW92ZUxpc3RlbmVyKG5vd0V2ZW50LCBwdWxsTm93KTtcclxuICAgICAgfVxyXG4gICAgICBzYmoubmV4dChkYXRhKTtcclxuICAgIH07XHJcbiAgICB0aGlzLnNvY2tldC5vbihub3dFdmVudCwgcHVsbE5vdyk7XHJcbiAgICByZXR1cm4gc2JqLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuICAvKipcclxuICAqIEBtZXRob2QgYnJvYWRjYXN0c1xyXG4gICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcclxuICAqIEBwYXJhbSB7YW55fSByZXF1ZXN0IFR5cGUgb2YgcmVxdWVzdCwgY2FuIGJlIExCLW9ubHkgZmlsdGVyIG9yIEZMK0xCIGZpbHRlclxyXG4gICogQHJldHVybiB7T2JzZXJ2YWJsZTxUPn1cclxuICAqIEBkZXNjcmlwdGlvblxyXG4gICogVGhpcyB3aWxsIGxpc3RlbiBmb3IgcHVibGljIGJyb2FkY2FzdHMgYW5ub3VuY2VzIGFuZCB0aGVuIHJlcXVlc3RcclxuICAqIGZvciBkYXRhIGFjY29yZGluZyBhIHNwZWNpZmljIGNsaWVudCByZXF1ZXN0LCBub3Qgc2hhcmVkIHdpdGggb3RoZXIgY2xpZW50cy5cclxuICAqKi9cclxuICBwcml2YXRlIGJyb2FkY2FzdHMoZXZlbnQ6IHN0cmluZywgcmVxdWVzdDogYW55KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBsZXQgc2JqOiBTdWJqZWN0PFQ+ID0gbmV3IFN1YmplY3Q8VD4oKTtcclxuICAgIGxldCBjaGFubmVsczogeyBhbm5vdW5jZTogc3RyaW5nLCBicm9hZGNhc3Q6IHN0cmluZyB9ID0ge1xyXG4gICAgICBhbm5vdW5jZTogYCR7ZXZlbnR9LmJyb2FkY2FzdC5hbm5vdW5jZS4ke3RoaXMuaWR9YCxcclxuICAgICAgYnJvYWRjYXN0OiBgJHtldmVudH0uYnJvYWRjYXN0LiR7dGhpcy5pZH1gXHJcbiAgICB9O1xyXG4gICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgLy8gQW5ub3VuY2VzIEhhbmRsZXJcclxuICAgIHRoaXMuZGlzcG9zYWJsZVtjaGFubmVscy5hbm5vdW5jZV0gPSBmdW5jdGlvbiAocmVzOiBUKSB7XHJcbiAgICAgIHRoYXQuc29ja2V0LmVtaXQoYCR7ZXZlbnR9LmJyb2FkY2FzdC5yZXF1ZXN0LiR7dGhhdC5pZH1gLCByZXF1ZXN0KVxyXG4gICAgfTtcclxuICAgIC8vIEJyb2FkY2FzdHMgSGFuZGxlclxyXG4gICAgdGhpcy5kaXNwb3NhYmxlW2NoYW5uZWxzLmJyb2FkY2FzdF0gPSBmdW5jdGlvbiAoZGF0YTogYW55KSB7XHJcbiAgICAgIHNiai5uZXh0KGRhdGEpO1xyXG4gICAgfTtcclxuICAgIHRoaXMuc29ja2V0Lm9uKGNoYW5uZWxzLmFubm91bmNlLCB0aGlzLmRpc3Bvc2FibGVbY2hhbm5lbHMuYW5ub3VuY2VdKTtcclxuICAgIHRoaXMuc29ja2V0Lm9uKGNoYW5uZWxzLmJyb2FkY2FzdCwgdGhpcy5kaXNwb3NhYmxlW2NoYW5uZWxzLmJyb2FkY2FzdF0pO1xyXG4gICAgcmV0dXJuIHNiai5hc09ic2VydmFibGUoKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgKiBAbWV0aG9kIG9wZXJhdGlvblxyXG4gICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IEV2ZW50IG5hbWVcclxuICAqIEBwYXJhbSB7YW55fSBkYXRhIEFueSB0eXBlIG9mIGRhdGEgc2VudCB0byB0aGUgc2VydmVyXHJcbiAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPFQ+fVxyXG4gICogQGRlc2NyaXB0aW9uXHJcbiAgKiBUaGlzIGludGVybmFsIG1ldGhvZCB3aWxsIHJ1biBvcGVyYXRpb25zIGRlcGVuZGluZyBvbiBjdXJyZW50IGNvbnRleHQgXHJcbiAgKiovXHJcbiAgcHJpdmF0ZSBvcGVyYXRpb24oZXZlbnQ6IHN0cmluZywgZGF0YTogYW55KTogT2JzZXJ2YWJsZTxUPiB7XHJcbiAgICBpZiAoIXRoaXMucmVsYXRpb25zaGlwKSB7XHJcbiAgICAgIGV2ZW50ID0gYCR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHtldmVudH0uJHt0aGlzLmlkfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBldmVudCA9IGAke3RoaXMucGFyZW50Lm1vZGVsLmdldE1vZGVsTmFtZSgpfS4ke3RoaXMucmVsYXRpb25zaGlwfS4ke2V2ZW50fS4ke3RoaXMuaWR9YDtcclxuICAgIH1cclxuICAgIGxldCBzdWJqZWN0OiBTdWJqZWN0PFQ+ID0gbmV3IFN1YmplY3Q8VD4oKTtcclxuICAgIGxldCBjb25maWc6IHsgZGF0YTogYW55LCBwYXJlbnQ6IGFueSB9ID0ge1xyXG4gICAgICBkYXRhLFxyXG4gICAgICBwYXJlbnQ6IHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50Lmluc3RhbmNlID8gdGhpcy5wYXJlbnQuaW5zdGFuY2UgOiBudWxsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5zb2NrZXQuZW1pdChldmVudCwgY29uZmlnKTtcclxuICAgIGxldCByZXN1bHRFdmVudDogc3RyaW5nID0gJyc7XHJcbiAgICBpZiAoIXRoaXMucmVsYXRpb25zaGlwKSB7XHJcbiAgICAgIHJlc3VsdEV2ZW50ID0gYCR7dGhpcy5tb2RlbC5nZXRNb2RlbE5hbWUoKX0udmFsdWUucmVzdWx0LiR7dGhpcy5pZH1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0RXZlbnQgPSBgJHt0aGlzLnBhcmVudC5tb2RlbC5nZXRNb2RlbE5hbWUoKX0uJHt0aGlzLnJlbGF0aW9uc2hpcH0udmFsdWUucmVzdWx0LiR7dGhpcy5pZH1gO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zb2NrZXQub24ocmVzdWx0RXZlbnQsIChyZXM6IGFueSkgPT4ge1xyXG4gICAgICBpZiAocmVzLmVycm9yKSB7XHJcbiAgICAgICAgc3ViamVjdC5lcnJvcihyZXMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1YmplY3QubmV4dChyZXMpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChldmVudC5tYXRjaCgnZGlzcG9zZScpKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3ViamVjdC5uZXh0KCkpO1xyXG4gICAgfVxyXG4gICAgLy8gVGhpcyBldmVudCBsaXN0ZW5lciB3aWxsIGJlIHdpcGVkIHdpdGhpbiBzb2NrZXQuY29ubmVjdGlvbnNcclxuICAgIHRoaXMuc29ja2V0LnNoYXJlZE9ic2VydmFibGVzLnNoYXJlZE9uRGlzY29ubmVjdC5zdWJzY3JpYmUoKCkgPT4gc3ViamVjdC5jb21wbGV0ZSgpKTtcclxuICAgIHJldHVybiBzdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLmNhdGNoKChlcnJvcjogYW55KSA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yKSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICogQG1ldGhvZCBidWlsZElkXHJcbiAgKiBAcmV0dXJuIHtudW1iZXJ9XHJcbiAgKiBAZGVzY3JpcHRpb25cclxuICAqIFRoaXMgaW50ZXJuYWwgbWV0aG9kIGJ1aWxkIGFuIElEIGZvciB0aGlzIHJlZmVyZW5jZSwgdGhpcyBhbGxvd3MgdG8gaGF2ZVxyXG4gICogbXVsdGlwbGUgcmVmZXJlbmNlcyBmb3IgdGhlIHNhbWUgbW9kZWwgb3IgcmVsYXRpb25zaGlwcy5cclxuICAqKi9cclxuICBwcml2YXRlIGJ1aWxkSWQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBEYXRlLm5vdygpICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwODAwKSAqXHJcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMDcwMCkgKlxyXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxOTg1MDApO1xyXG4gIH1cclxufVxyXG4iXX0=