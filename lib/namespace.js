/*
 * namespace
 */

(function () {
	'use strict';
	
	var global = (function () { return this; }()),
		space = {};
	
	function getEnv(name) {
		var env;
		
		if (!name) {
			env = global;
		} else {
			env = space[name];
			
			if (!env) {
				env = {};
				space[name] = env;
			}
		}
		
		return env;
	}
	
	// name - имя приватного окружения, не инклудиться в глобал
	//        доступ можно получать только методами namespace
	function namespace(path, name) {
		var p = path.split('.'),
			i, 
			l, 
			name, 
			space,
			env = getEnv(name);
		
		for (i = 0, l = p.length; l > i; i++) {
			name = p[i];
			
			if ('undefined' === typeof env[name]) {
				env[name] = {};
			}
			
			space = env[name];
			env = space;
		}
		
		return space;
	}
	
	namespace.getGlobal = function () {
		return global;
	};
	
	namespace.getPrivate = function (name) {
		return space[name];
	};
	
	//Подменяем текущее пространство заданным.
	namespace.insert = function (path, newSpace, name) {
		var p = path.split('.'),
			i, j, 
			l, 
			name, 
			space,
			env = getEnv(name);
		
		for (i = 0, l = p.length; l > i; i++) {
			j = i + 1;
			name = p[i];
			
			if ('undefined' === typeof env[name]) {
				
				if (j === l) {
					env[name] = newSpace;
					break;
				} else {
					env[name] = {};
				}				
			} else if (j === l) {
				env[name] = newSpace;
				break;
			}
			
			space = env[name];
			env = space;
		}
		
		return space;
	};
	
	
	global.namespace = namespace;
}());