/* backbone.list.js v0.0.3 (coffeescript output) */ 

(function() {
  var method, _base, _base1, _i, _j, _len, _len1, _ref, _ref1,
    __slice = [].slice;

  Backbone.List = (function() {
    function List(items, options) {
      if (options == null) {
        options = {};
      }
      this.reset(items, options);
      if (!options.noState) {
        addState(this);
      }
      if (_.isFunction(this.initialize)) {
        this.initialize.apply(this, arguments);
      }
    }

    List.prototype.unshift = function() {
      var item, items, _i, _len, _ref, _results;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref = items.reverse();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        _results.push(this.add(item, {
          at: 0
        }));
      }
      return _results;
    };

    List.prototype.push = function() {
      var item, items, _i, _len, _results;
      items = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _results.push(this.add(item, {
          at: this.length
        }));
      }
      return _results;
    };

    List.prototype.shift = function() {
      return this.remove(null, {
        at: 0
      });
    };

    List.prototype.pop = function() {
      return this.remove(null, {
        at: this.length - 1
      });
    };

    List.prototype.empty = function() {
      return this.splice(0, Infinity);
    };

    List.prototype.eventNamespace = 'listItem:';

    List.prototype.bubbleEvents = true;

    List.prototype.reset = function(items, options) {
      if (options == null) {
        options = {};
      }
      this.splice(this.length, this.length);
      this.push.apply(this, items);
      if (!options.silent) {
        return this.trigger('reset', this, options);
      }
    };

    List.prototype.add = function(item, options) {
      var at,
        _this = this;
      if (options == null) {
        options = {};
      }
      at = options.at != null ? options.at : options.at = this.length;
      if (this.bubbleEvents && item && _.isFunction(item.on)) {
        this.listenTo(item, 'all', function() {
          var args, eventName;
          eventName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          if (_this.bubbleEvents) {
            return _this.trigger.apply(_this, ["" + (_this.eventNamespace || '') + _this.eventName].concat(__slice.call(args)));
          }
        });
      }
      if (this.model) {
        item = new this.model(item);
      }
      this.splice(at, null, item);
      if (!options.silent) {
        return this.trigger('add', item, this, options);
      }
    };

    List.prototype.remove = function(item, options) {
      var index;
      if (options == null) {
        options = {};
      }
      index = options.at || this.indexOf(item);
      if (item == null) {
        item = this[index];
      }
      this.splice(index, 1);
      if (!options.silent) {
        this.trigger('remove', item, this, options);
      }
      item;
      return this.stopListening(item);
    };

    return List;

  })();

  _.extend(Backbone.List.prototype, Backbone.Events);

  _ref = ['splice', 'indexOf', 'lastIndexOf', 'join', 'reverse', 'sort', 'valueOf', 'map', 'forEach', 'every', 'reduce', 'reduceRight', 'filter', 'some'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    method = _ref[_i];
    (_base = Backbone.List.prototype)[method] || (_base[method] = arr[method]);
  }

  _ref1 = ['each', 'contains', 'find', 'filter', 'reject', 'contains', 'max', 'min', 'sortBy', 'groupBy', 'sortedIndex', 'shuffle', 'toArray', 'size', 'first', 'last', 'initial', 'rest', 'without', 'isEmpty', 'chain', 'where', 'findWhere', 'clone', 'pluck', 'invoke'];
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    method = _ref1[_j];
    (_base1 = Backbone.List.prototype)[method] || (_base1[method] = _[method]);
  }

  Backbone.List.VERSION = '0.0.3';

}).call(this);
