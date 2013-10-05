# Backbone.List

Evented lists for Backbone! For when you want the power of a Backbone Collection
(classing and subclassing, events and change subscribing, etc) for lists
of non-models (e.g. strings, views, and more!)

```coffeescript

# Class and subclass lists
class List extends Backbone.List
  getActiveItem: ->
    for item in @
      return item if item.active


# Standard invocation
people = new Base.List [ 'john', 'steve', 'mary' ]


# Standart JS Array Methods
people.pop()
people.unshift 'jason'

# Underscore Array Methods
people.find (item) -> item[0] is 'j'
people.sortBy (item) -> item.toLowerCase()
people.contains 'john'

# Event binding
poeple.trigger 'myEvent'
people.on 'myEvent', ->

# Backbone Collection style events
people.on 'add', ->
people.on 'remove', ->
people.on 'reset', ->

# Backbobne.Collection style event bubbling
class ViewManager extends Base.List

view.viewManager = new ViewManager
view.viewManager.add subView
subView.trigger 'rendered' # => This will trigger 'rendered' on view.viewManager

```

Documentation coming soon...