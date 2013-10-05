class Backbone.List
  constructor: (items, options = {}) ->
    @reset items, options
    if not options.noState
      addState @
    @initialize arguments... if _.isFunction @initialize

  unshift: (items...) -> @add item, at: 0 for item in items.reverse()
  push: (items...) -> @add item, at: @length for item in items
  shift: -> @remove null, at: 0
  pop: -> @remove null, at: @length - 1
  empty: -> @splice 0, Infinity

  eventNamespace: 'listItem:'
  bubbleEvents: true

  reset: (items, options = {}) ->
    @splice @length, @length
    @push items...
    @trigger 'reset', @, options unless options.silent

  add: (item, options = {}) ->
    at = options.at ?= @length

    # Bubble events like backbone does
    if @bubbleEvents and item and _.isFunction item.on
      @listenTo item, 'all', (eventName, args...) =>
        if @bubbleEvents
          @trigger "#{@eventNamespace or ''}#{@eventName}", args...

    # Allow models of any type (e.g. a model here can be a view!)
    item = new @model item if @model

    @splice at, null, item
    @trigger 'add', item, @, options unless options.silent

  remove: (item, options = {}) ->
    index = options.at or @indexOf item
    item ?= @[index]
    @splice index, 1
    @trigger 'remove', item, @, options unless options.silent
    item
    @stopListening item

_.extend Backbone.List::, Backbone.Events

for method in ['splice', 'indexOf', 'lastIndexOf', 'join', 'reverse', 'sort',
  'valueOf', 'map', 'forEach', 'every', 'reduce', 'reduceRight', 'filter',
  'some']
  Backbone.List::[method] or= arr[method]

for method in ['each', 'contains', 'find', 'filter', 'reject', 'contains',
  'max', 'min', 'sortBy', 'groupBy', 'sortedIndex', 'shuffle', 'toArray', 'size'
  'first', 'last', 'initial', 'rest', 'without', 'isEmpty', 'chain', 'where',
  'findWhere', 'clone', 'pluck', 'invoke']
  Backbone.List::[method] or= _[method]

# This value is managed by Grunt during builds
Backbone.List.VERSION = '0.0.1'