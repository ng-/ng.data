# ng.data: simple getter/setter for data persistence
ng.data aims to make it dead simple to persist data

## API
ng.data has a very simple API
```javascript
ng.data = function(key, value, persist)
{

}
```

## Get/Set
ng.data is just a getter/setter
```javascript
module('example').controller('ctrl', function(data)
{
	var val = 'Hello!'

	//Store the value under key
	data('key', val)

	//Get the value: logs Hello!
	console.log(data('key'))

	//Delete the value
	data('key', undefined)
})
```

## Persistance

If persist is truthy, data is persisted until deleted. On the client this is done with localStorage, on the server this is done with a JSON object.

If persist is undefined, data is persisted in memory only.  On the client this is done with sessionStorage, on the server this is done with memory (until server restart).

If persist is falsey (but not undefined), data is stored as flash data.  It will be available on the next location path change and then will be erased (this is great for alert messages)

## Shorthand
Sometimes getters/setters can be annoying if you only want to manipulate data.
```javascript
module('example').controller('ctrl', function(data)
{
  //needlessly verbose incrementing
  var count = data('count')

  count += 5

  data('count', count)

  //needlessly verbose decrementing
  var count = data('count')

  count -= 5

  data('count', count)

  //needlessly verbose push
  var arr = data('arr')

  arr.push('Hello!')

  data('arr', arr)

  //needlessly verbose property
  var obj = data('obj')

  obj.prop = 'Hello!'

  data('obj', obj)
})
```

ng.data has shorthand for these common manipulations
```javascript
module('example').controller('ctrl', function(data)
{
  //incrementing shorthand
  data('count+', 5)

  //decrementing shorthand
  data('count-', 5)

  //push shorthand, note: this only works if arr is already an array
  data('arr[]', 'Hello!')

  //property shorthand, note: this only works if obj is already an object
  data('obj.prop', 'Hello!')
})
```


## changelog
#### 0.0.0-rc1
- Initial commit

## todos
- Environment based Config
- Documentation: explain Global ng Var
- Duplication detection before overwrite
- Use fs.watch to do automatic reloads
- Use the cluster module to run multi-thread

## related projects
- [ng](https://github.com/ng-/ng): angular reimagined
- [ng.seed](https://github.com/ng-/ng.seed): create a modular ng application using npm packages
- ng.cql: realtime cassandra database syncing
- [ng.auth](https://github.com/ng-/ng.auth): example authentication using ng interceptors
- [ng.crud](https://github.com/ng-/ng.crud): example demonstrating a simple crud application using ng.seed
- [ng.style](https://github.com/ng-/ng.style): beautiful html using twitter bootstrap
