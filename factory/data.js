//Serverside localStorage using JSON arrays (maybe put this in ng core)
//this is outside of the exports so it will still allow this function
//to go onto the client as well.

var sessionStorage = {}
  , localStorage

try
{
	localStorage = require('../storage.json')
}
catch (e)
{
	localStorage = {}
}

function saveFile(storage)
{
	require('fs').writeFile(__dirname+'/../storage.json', JSON.stringify(storage, null, '   '))
}

module.exports = function($rootScope)
{
	var flashStorage   = {}
	  , nextStorage    = {}

	$rootScope.$on('$routeChangeStart', function()
	{
		flashStorage = nextStorage; nextStorage = {}
	})

	return function(key, value, persist)
	{
		var shorthand = function()
		{
			return {store:value, result:value}
		}
		// If both are arrays concatenate rather than replace avoiding needlessly complicated code:
		// var alerts = data.sess('alerts); alerts.push({new:alert}); data.sess('alerts', alerts)
		// instead we can do this all in one command with data.sess('alerts[]', {new:alert})
		if ('[]' == key.slice(-2))
		{
			key = key.slice(0, -2)

			shorthand = function(current)
			{
				return {store:current.concat(value), result:value}
			}
		}

		var prop = key.split('.')

		if (2 == prop.length)
		{
			key = prop[0]

			shorthand = function(current)
			{
				current[prop[1]] = value

				return {store:current, result:value}
			}
		}

		if ('+' == key.slice(-1) || '-' == key.slice(-1))
		{
			key = key.slice(0, -1)

			shorthand = function(current)
			{
				value *= '-' == key.slice(-1) ? -1 : 1

				value = (current || 0) + value

				return {store:value, result:value}
			}
		}

		var current = ng.fromJson(flashStorage[key] || sessionStorage[key] || localStorage[key])

		if (1 == arguments.length)
		{
			return current
		}

		var storage = sessionStorage

		if (false === persist)
		{
			storage = nextStorage
		}

		if (true === persist)
		{
			storage = localStorage
		}

		value = shorthand(current)

		if (value.store === null || value.store === undefined)
		{
			delete storage[key]
		}
		else
		{
			storage[key] = ng.toJson(value.store)
		}

		persist && ng.isDefined(saveFile) && saveFile(storage)

		return value.result
	}
}