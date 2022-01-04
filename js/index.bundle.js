/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "4e53ad98bce3f644f6fc";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "index";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/index.js")(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/validator/index.js":
/*!*****************************************!*\
  !*** ./node_modules/validator/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

    "use strict";


    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    
    var _toDate = _interopRequireDefault(__webpack_require__(/*! ./lib/toDate */ "./node_modules/validator/lib/toDate.js"));
    
    var _toFloat = _interopRequireDefault(__webpack_require__(/*! ./lib/toFloat */ "./node_modules/validator/lib/toFloat.js"));
    
    var _toInt = _interopRequireDefault(__webpack_require__(/*! ./lib/toInt */ "./node_modules/validator/lib/toInt.js"));
    
    var _toBoolean = _interopRequireDefault(__webpack_require__(/*! ./lib/toBoolean */ "./node_modules/validator/lib/toBoolean.js"));
    
    var _equals = _interopRequireDefault(__webpack_require__(/*! ./lib/equals */ "./node_modules/validator/lib/equals.js"));
    
    var _contains = _interopRequireDefault(__webpack_require__(/*! ./lib/contains */ "./node_modules/validator/lib/contains.js"));
    
    var _matches = _interopRequireDefault(__webpack_require__(/*! ./lib/matches */ "./node_modules/validator/lib/matches.js"));
    
    var _isEmail = _interopRequireDefault(__webpack_require__(/*! ./lib/isEmail */ "./node_modules/validator/lib/isEmail.js"));
    
    var _isURL = _interopRequireDefault(__webpack_require__(/*! ./lib/isURL */ "./node_modules/validator/lib/isURL.js"));
    
    var _isMACAddress = _interopRequireDefault(__webpack_require__(/*! ./lib/isMACAddress */ "./node_modules/validator/lib/isMACAddress.js"));
    
    var _isIP = _interopRequireDefault(__webpack_require__(/*! ./lib/isIP */ "./node_modules/validator/lib/isIP.js"));
    
    var _isIPRange = _interopRequireDefault(__webpack_require__(/*! ./lib/isIPRange */ "./node_modules/validator/lib/isIPRange.js"));
    
    var _isFQDN = _interopRequireDefault(__webpack_require__(/*! ./lib/isFQDN */ "./node_modules/validator/lib/isFQDN.js"));
    
    var _isBoolean = _interopRequireDefault(__webpack_require__(/*! ./lib/isBoolean */ "./node_modules/validator/lib/isBoolean.js"));
    
    var _isAlpha = _interopRequireWildcard(__webpack_require__(/*! ./lib/isAlpha */ "./node_modules/validator/lib/isAlpha.js"));
    
    var _isAlphanumeric = _interopRequireWildcard(__webpack_require__(/*! ./lib/isAlphanumeric */ "./node_modules/validator/lib/isAlphanumeric.js"));
    
    var _isNumeric = _interopRequireDefault(__webpack_require__(/*! ./lib/isNumeric */ "./node_modules/validator/lib/isNumeric.js"));
    
    var _isPort = _interopRequireDefault(__webpack_require__(/*! ./lib/isPort */ "./node_modules/validator/lib/isPort.js"));
    
    var _isLowercase = _interopRequireDefault(__webpack_require__(/*! ./lib/isLowercase */ "./node_modules/validator/lib/isLowercase.js"));
    
    var _isUppercase = _interopRequireDefault(__webpack_require__(/*! ./lib/isUppercase */ "./node_modules/validator/lib/isUppercase.js"));
    
    var _isAscii = _interopRequireDefault(__webpack_require__(/*! ./lib/isAscii */ "./node_modules/validator/lib/isAscii.js"));
    
    var _isFullWidth = _interopRequireDefault(__webpack_require__(/*! ./lib/isFullWidth */ "./node_modules/validator/lib/isFullWidth.js"));
    
    var _isHalfWidth = _interopRequireDefault(__webpack_require__(/*! ./lib/isHalfWidth */ "./node_modules/validator/lib/isHalfWidth.js"));
    
    var _isVariableWidth = _interopRequireDefault(__webpack_require__(/*! ./lib/isVariableWidth */ "./node_modules/validator/lib/isVariableWidth.js"));
    
    var _isMultibyte = _interopRequireDefault(__webpack_require__(/*! ./lib/isMultibyte */ "./node_modules/validator/lib/isMultibyte.js"));
    
    var _isSurrogatePair = _interopRequireDefault(__webpack_require__(/*! ./lib/isSurrogatePair */ "./node_modules/validator/lib/isSurrogatePair.js"));
    
    var _isInt = _interopRequireDefault(__webpack_require__(/*! ./lib/isInt */ "./node_modules/validator/lib/isInt.js"));
    
    var _isFloat = _interopRequireWildcard(__webpack_require__(/*! ./lib/isFloat */ "./node_modules/validator/lib/isFloat.js"));
    
    var _isDecimal = _interopRequireDefault(__webpack_require__(/*! ./lib/isDecimal */ "./node_modules/validator/lib/isDecimal.js"));
    
    var _isHexadecimal = _interopRequireDefault(__webpack_require__(/*! ./lib/isHexadecimal */ "./node_modules/validator/lib/isHexadecimal.js"));
    
    var _isDivisibleBy = _interopRequireDefault(__webpack_require__(/*! ./lib/isDivisibleBy */ "./node_modules/validator/lib/isDivisibleBy.js"));
    
    var _isHexColor = _interopRequireDefault(__webpack_require__(/*! ./lib/isHexColor */ "./node_modules/validator/lib/isHexColor.js"));
    
    var _isISRC = _interopRequireDefault(__webpack_require__(/*! ./lib/isISRC */ "./node_modules/validator/lib/isISRC.js"));
    
    var _isMD = _interopRequireDefault(__webpack_require__(/*! ./lib/isMD5 */ "./node_modules/validator/lib/isMD5.js"));
    
    var _isHash = _interopRequireDefault(__webpack_require__(/*! ./lib/isHash */ "./node_modules/validator/lib/isHash.js"));
    
    var _isJWT = _interopRequireDefault(__webpack_require__(/*! ./lib/isJWT */ "./node_modules/validator/lib/isJWT.js"));
    
    var _isJSON = _interopRequireDefault(__webpack_require__(/*! ./lib/isJSON */ "./node_modules/validator/lib/isJSON.js"));
    
    var _isEmpty = _interopRequireDefault(__webpack_require__(/*! ./lib/isEmpty */ "./node_modules/validator/lib/isEmpty.js"));
    
    var _isLength = _interopRequireDefault(__webpack_require__(/*! ./lib/isLength */ "./node_modules/validator/lib/isLength.js"));
    
    var _isByteLength = _interopRequireDefault(__webpack_require__(/*! ./lib/isByteLength */ "./node_modules/validator/lib/isByteLength.js"));
    
    var _isUUID = _interopRequireDefault(__webpack_require__(/*! ./lib/isUUID */ "./node_modules/validator/lib/isUUID.js"));
    
    var _isMongoId = _interopRequireDefault(__webpack_require__(/*! ./lib/isMongoId */ "./node_modules/validator/lib/isMongoId.js"));
    
    var _isAfter = _interopRequireDefault(__webpack_require__(/*! ./lib/isAfter */ "./node_modules/validator/lib/isAfter.js"));
    
    var _isBefore = _interopRequireDefault(__webpack_require__(/*! ./lib/isBefore */ "./node_modules/validator/lib/isBefore.js"));
    
    var _isIn = _interopRequireDefault(__webpack_require__(/*! ./lib/isIn */ "./node_modules/validator/lib/isIn.js"));
    
    var _isCreditCard = _interopRequireDefault(__webpack_require__(/*! ./lib/isCreditCard */ "./node_modules/validator/lib/isCreditCard.js"));
    
    var _isIdentityCard = _interopRequireDefault(__webpack_require__(/*! ./lib/isIdentityCard */ "./node_modules/validator/lib/isIdentityCard.js"));
    
    var _isISIN = _interopRequireDefault(__webpack_require__(/*! ./lib/isISIN */ "./node_modules/validator/lib/isISIN.js"));
    
    var _isISBN = _interopRequireDefault(__webpack_require__(/*! ./lib/isISBN */ "./node_modules/validator/lib/isISBN.js"));
    
    var _isISSN = _interopRequireDefault(__webpack_require__(/*! ./lib/isISSN */ "./node_modules/validator/lib/isISSN.js"));
    
    var _isMobilePhone = _interopRequireWildcard(__webpack_require__(/*! ./lib/isMobilePhone */ "./node_modules/validator/lib/isMobilePhone.js"));
    
    var _isCurrency = _interopRequireDefault(__webpack_require__(/*! ./lib/isCurrency */ "./node_modules/validator/lib/isCurrency.js"));
    
    var _isISO = _interopRequireDefault(__webpack_require__(/*! ./lib/isISO8601 */ "./node_modules/validator/lib/isISO8601.js"));
    
    var _isRFC = _interopRequireDefault(__webpack_require__(/*! ./lib/isRFC3339 */ "./node_modules/validator/lib/isRFC3339.js"));
    
    var _isISO31661Alpha = _interopRequireDefault(__webpack_require__(/*! ./lib/isISO31661Alpha2 */ "./node_modules/validator/lib/isISO31661Alpha2.js"));
    
    var _isISO31661Alpha2 = _interopRequireDefault(__webpack_require__(/*! ./lib/isISO31661Alpha3 */ "./node_modules/validator/lib/isISO31661Alpha3.js"));
    
    var _isBase = _interopRequireDefault(__webpack_require__(/*! ./lib/isBase64 */ "./node_modules/validator/lib/isBase64.js"));
    
    var _isDataURI = _interopRequireDefault(__webpack_require__(/*! ./lib/isDataURI */ "./node_modules/validator/lib/isDataURI.js"));
    
    var _isMagnetURI = _interopRequireDefault(__webpack_require__(/*! ./lib/isMagnetURI */ "./node_modules/validator/lib/isMagnetURI.js"));
    
    var _isMimeType = _interopRequireDefault(__webpack_require__(/*! ./lib/isMimeType */ "./node_modules/validator/lib/isMimeType.js"));
    
    var _isLatLong = _interopRequireDefault(__webpack_require__(/*! ./lib/isLatLong */ "./node_modules/validator/lib/isLatLong.js"));
    
    var _isPostalCode = _interopRequireWildcard(__webpack_require__(/*! ./lib/isPostalCode */ "./node_modules/validator/lib/isPostalCode.js"));
    
    var _ltrim = _interopRequireDefault(__webpack_require__(/*! ./lib/ltrim */ "./node_modules/validator/lib/ltrim.js"));
    
    var _rtrim = _interopRequireDefault(__webpack_require__(/*! ./lib/rtrim */ "./node_modules/validator/lib/rtrim.js"));
    
    var _trim = _interopRequireDefault(__webpack_require__(/*! ./lib/trim */ "./node_modules/validator/lib/trim.js"));
    
    var _escape = _interopRequireDefault(__webpack_require__(/*! ./lib/escape */ "./node_modules/validator/lib/escape.js"));
    
    var _unescape = _interopRequireDefault(__webpack_require__(/*! ./lib/unescape */ "./node_modules/validator/lib/unescape.js"));
    
    var _stripLow = _interopRequireDefault(__webpack_require__(/*! ./lib/stripLow */ "./node_modules/validator/lib/stripLow.js"));
    
    var _whitelist = _interopRequireDefault(__webpack_require__(/*! ./lib/whitelist */ "./node_modules/validator/lib/whitelist.js"));
    
    var _blacklist = _interopRequireDefault(__webpack_require__(/*! ./lib/blacklist */ "./node_modules/validator/lib/blacklist.js"));
    
    var _isWhitelisted = _interopRequireDefault(__webpack_require__(/*! ./lib/isWhitelisted */ "./node_modules/validator/lib/isWhitelisted.js"));
    
    var _normalizeEmail = _interopRequireDefault(__webpack_require__(/*! ./lib/normalizeEmail */ "./node_modules/validator/lib/normalizeEmail.js"));
    
    var _toString = _interopRequireDefault(__webpack_require__(/*! ./lib/util/toString */ "./node_modules/validator/lib/util/toString.js"));
    
    function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var version = '10.11.0';
    var validator = {
      version: version,
      toDate: _toDate.default,
      toFloat: _toFloat.default,
      toInt: _toInt.default,
      toBoolean: _toBoolean.default,
      equals: _equals.default,
      contains: _contains.default,
      matches: _matches.default,
      isEmail: _isEmail.default,
      isURL: _isURL.default,
      isMACAddress: _isMACAddress.default,
      isIP: _isIP.default,
      isIPRange: _isIPRange.default,
      isFQDN: _isFQDN.default,
      isBoolean: _isBoolean.default,
      isAlpha: _isAlpha.default,
      isAlphaLocales: _isAlpha.locales,
      isAlphanumeric: _isAlphanumeric.default,
      isAlphanumericLocales: _isAlphanumeric.locales,
      isNumeric: _isNumeric.default,
      isPort: _isPort.default,
      isLowercase: _isLowercase.default,
      isUppercase: _isUppercase.default,
      isAscii: _isAscii.default,
      isFullWidth: _isFullWidth.default,
      isHalfWidth: _isHalfWidth.default,
      isVariableWidth: _isVariableWidth.default,
      isMultibyte: _isMultibyte.default,
      isSurrogatePair: _isSurrogatePair.default,
      isInt: _isInt.default,
      isFloat: _isFloat.default,
      isFloatLocales: _isFloat.locales,
      isDecimal: _isDecimal.default,
      isHexadecimal: _isHexadecimal.default,
      isDivisibleBy: _isDivisibleBy.default,
      isHexColor: _isHexColor.default,
      isISRC: _isISRC.default,
      isMD5: _isMD.default,
      isHash: _isHash.default,
      isJWT: _isJWT.default,
      isJSON: _isJSON.default,
      isEmpty: _isEmpty.default,
      isLength: _isLength.default,
      isByteLength: _isByteLength.default,
      isUUID: _isUUID.default,
      isMongoId: _isMongoId.default,
      isAfter: _isAfter.default,
      isBefore: _isBefore.default,
      isIn: _isIn.default,
      isCreditCard: _isCreditCard.default,
      isIdentityCard: _isIdentityCard.default,
      isISIN: _isISIN.default,
      isISBN: _isISBN.default,
      isISSN: _isISSN.default,
      isMobilePhone: _isMobilePhone.default,
      isMobilePhoneLocales: _isMobilePhone.locales,
      isPostalCode: _isPostalCode.default,
      isPostalCodeLocales: _isPostalCode.locales,
      isCurrency: _isCurrency.default,
      isISO8601: _isISO.default,
      isRFC3339: _isRFC.default,
      isISO31661Alpha2: _isISO31661Alpha.default,
      isISO31661Alpha3: _isISO31661Alpha2.default,
      isBase64: _isBase.default,
      isDataURI: _isDataURI.default,
      isMagnetURI: _isMagnetURI.default,
      isMimeType: _isMimeType.default,
      isLatLong: _isLatLong.default,
      ltrim: _ltrim.default,
      rtrim: _rtrim.default,
      trim: _trim.default,
      escape: _escape.default,
      unescape: _unescape.default,
      stripLow: _stripLow.default,
      whitelist: _whitelist.default,
      blacklist: _blacklist.default,
      isWhitelisted: _isWhitelisted.default,
      normalizeEmail: _normalizeEmail.default,
      toString: _toString.default
    };
    var _default = validator;
    exports.default = _default;
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/alpha.js":
    /*!*********************************************!*\
      !*** ./node_modules/validator/lib/alpha.js ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.commaDecimal = exports.dotDecimal = exports.arabicLocales = exports.englishLocales = exports.decimal = exports.alphanumeric = exports.alpha = void 0;
    var alpha = {
      'en-US': /^[A-Z]+$/i,
      'bg-BG': /^[А-Я]+$/i,
      'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
      'da-DK': /^[A-ZÆØÅ]+$/i,
      'de-DE': /^[A-ZÄÖÜß]+$/i,
      'el-GR': /^[Α-ω]+$/i,
      'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
      'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
      'it-IT': /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
      'nb-NO': /^[A-ZÆØÅ]+$/i,
      'nl-NL': /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
      'nn-NO': /^[A-ZÆØÅ]+$/i,
      'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
      'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
      'pt-PT': /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
      'ru-RU': /^[А-ЯЁ]+$/i,
      'sl-SI': /^[A-ZČĆĐŠŽ]+$/i,
      'sk-SK': /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
      'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
      'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
      'sv-SE': /^[A-ZÅÄÖ]+$/i,
      'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
      'uk-UA': /^[А-ЩЬЮЯЄIЇҐі]+$/i,
      'ku-IQ': /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
      ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
    };
    exports.alpha = alpha;
    var alphanumeric = {
      'en-US': /^[0-9A-Z]+$/i,
      'bg-BG': /^[0-9А-Я]+$/i,
      'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
      'da-DK': /^[0-9A-ZÆØÅ]+$/i,
      'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
      'el-GR': /^[0-9Α-ω]+$/i,
      'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
      'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
      'it-IT': /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
      'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
      'nb-NO': /^[0-9A-ZÆØÅ]+$/i,
      'nl-NL': /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
      'nn-NO': /^[0-9A-ZÆØÅ]+$/i,
      'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
      'pt-PT': /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]+$/i,
      'ru-RU': /^[0-9А-ЯЁ]+$/i,
      'sl-SI': /^[0-9A-ZČĆĐŠŽ]+$/i,
      'sk-SK': /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
      'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
      'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
      'sv-SE': /^[0-9A-ZÅÄÖ]+$/i,
      'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
      'uk-UA': /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
      'ku-IQ': /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
      ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/
    };
    exports.alphanumeric = alphanumeric;
    var decimal = {
      'en-US': '.',
      ar: '٫'
    };
    exports.decimal = decimal;
    var englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];
    exports.englishLocales = englishLocales;
    
    for (var locale, i = 0; i < englishLocales.length; i++) {
      locale = "en-".concat(englishLocales[i]);
      alpha[locale] = alpha['en-US'];
      alphanumeric[locale] = alphanumeric['en-US'];
      decimal[locale] = decimal['en-US'];
    } // Source: http://www.localeplanet.com/java/
    
    
    var arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];
    exports.arabicLocales = arabicLocales;
    
    for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
      _locale = "ar-".concat(arabicLocales[_i]);
      alpha[_locale] = alpha.ar;
      alphanumeric[_locale] = alphanumeric.ar;
      decimal[_locale] = decimal.ar;
    } // Source: https://en.wikipedia.org/wiki/Decimal_mark
    
    
    var dotDecimal = [];
    exports.dotDecimal = dotDecimal;
    var commaDecimal = ['bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'es-ES', 'fr-FR', 'it-IT', 'ku-IQ', 'hu-HU', 'nb-NO', 'nn-NO', 'nl-NL', 'pl-PL', 'pt-PT', 'ru-RU', 'sl-SI', 'sr-RS@latin', 'sr-RS', 'sv-SE', 'tr-TR', 'uk-UA'];
    exports.commaDecimal = commaDecimal;
    
    for (var _i2 = 0; _i2 < dotDecimal.length; _i2++) {
      decimal[dotDecimal[_i2]] = decimal['en-US'];
    }
    
    for (var _i3 = 0; _i3 < commaDecimal.length; _i3++) {
      decimal[commaDecimal[_i3]] = ',';
    }
    
    alpha['pt-BR'] = alpha['pt-PT'];
    alphanumeric['pt-BR'] = alphanumeric['pt-PT'];
    decimal['pt-BR'] = decimal['pt-PT']; // see #862
    
    alpha['pl-Pl'] = alpha['pl-PL'];
    alphanumeric['pl-Pl'] = alphanumeric['pl-PL'];
    decimal['pl-Pl'] = decimal['pl-PL'];
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/blacklist.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/blacklist.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = blacklist;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function blacklist(str, chars) {
      (0, _assertString.default)(str);
      return str.replace(new RegExp("[".concat(chars, "]+"), 'g'), '');
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/contains.js":
    /*!************************************************!*\
      !*** ./node_modules/validator/lib/contains.js ***!
      \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = contains;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _toString = _interopRequireDefault(__webpack_require__(/*! ./util/toString */ "./node_modules/validator/lib/util/toString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function contains(str, elem) {
      (0, _assertString.default)(str);
      return str.indexOf((0, _toString.default)(elem)) >= 0;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/equals.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/equals.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = equals;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function equals(str, comparison) {
      (0, _assertString.default)(str);
      return str === comparison;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/escape.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/escape.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = escape;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function escape(str) {
      (0, _assertString.default)(str);
      return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isAfter.js":
    /*!***********************************************!*\
      !*** ./node_modules/validator/lib/isAfter.js ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isAfter;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _toDate = _interopRequireDefault(__webpack_require__(/*! ./toDate */ "./node_modules/validator/lib/toDate.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isAfter(str) {
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(new Date());
      (0, _assertString.default)(str);
      var comparison = (0, _toDate.default)(date);
      var original = (0, _toDate.default)(str);
      return !!(original && comparison && original > comparison);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isAlpha.js":
    /*!***********************************************!*\
      !*** ./node_modules/validator/lib/isAlpha.js ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isAlpha;
    exports.locales = void 0;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isAlpha(str) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
      (0, _assertString.default)(str);
    
      if (locale in _alpha.alpha) {
        return _alpha.alpha[locale].test(str);
      }
    
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    
    var locales = Object.keys(_alpha.alpha);
    exports.locales = locales;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isAlphanumeric.js":
    /*!******************************************************!*\
      !*** ./node_modules/validator/lib/isAlphanumeric.js ***!
      \******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isAlphanumeric;
    exports.locales = void 0;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isAlphanumeric(str) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
      (0, _assertString.default)(str);
    
      if (locale in _alpha.alphanumeric) {
        return _alpha.alphanumeric[locale].test(str);
      }
    
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    
    var locales = Object.keys(_alpha.alphanumeric);
    exports.locales = locales;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isAscii.js":
    /*!***********************************************!*\
      !*** ./node_modules/validator/lib/isAscii.js ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isAscii;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    /* eslint-disable no-control-regex */
    var ascii = /^[\x00-\x7F]+$/;
    /* eslint-enable no-control-regex */
    
    function isAscii(str) {
      (0, _assertString.default)(str);
      return ascii.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isBase64.js":
    /*!************************************************!*\
      !*** ./node_modules/validator/lib/isBase64.js ***!
      \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isBase64;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var notBase64 = /[^A-Z0-9+\/=]/i;
    
    function isBase64(str) {
      (0, _assertString.default)(str);
      var len = str.length;
    
      if (!len || len % 4 !== 0 || notBase64.test(str)) {
        return false;
      }
    
      var firstPaddingChar = str.indexOf('=');
      return firstPaddingChar === -1 || firstPaddingChar === len - 1 || firstPaddingChar === len - 2 && str[len - 1] === '=';
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isBefore.js":
    /*!************************************************!*\
      !*** ./node_modules/validator/lib/isBefore.js ***!
      \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isBefore;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _toDate = _interopRequireDefault(__webpack_require__(/*! ./toDate */ "./node_modules/validator/lib/toDate.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isBefore(str) {
      var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(new Date());
      (0, _assertString.default)(str);
      var comparison = (0, _toDate.default)(date);
      var original = (0, _toDate.default)(str);
      return !!(original && comparison && original < comparison);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isBoolean.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/isBoolean.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isBoolean;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isBoolean(str) {
      (0, _assertString.default)(str);
      return ['true', 'false', '1', '0'].indexOf(str) >= 0;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isByteLength.js":
    /*!****************************************************!*\
      !*** ./node_modules/validator/lib/isByteLength.js ***!
      \****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isByteLength;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
    /* eslint-disable prefer-rest-params */
    function isByteLength(str, options) {
      (0, _assertString.default)(str);
      var min;
      var max;
    
      if (_typeof(options) === 'object') {
        min = options.min || 0;
        max = options.max;
      } else {
        // backwards compatibility: isByteLength(str, min [, max])
        min = arguments[1];
        max = arguments[2];
      }
    
      var len = encodeURI(str).split(/%..|./).length - 1;
      return len >= min && (typeof max === 'undefined' || len <= max);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isCreditCard.js":
    /*!****************************************************!*\
      !*** ./node_modules/validator/lib/isCreditCard.js ***!
      \****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isCreditCard;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    /* eslint-disable max-len */
    var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;
    /* eslint-enable max-len */
    
    function isCreditCard(str) {
      (0, _assertString.default)(str);
      var sanitized = str.replace(/[- ]+/g, '');
    
      if (!creditCard.test(sanitized)) {
        return false;
      }
    
      var sum = 0;
      var digit;
      var tmpNum;
      var shouldDouble;
    
      for (var i = sanitized.length - 1; i >= 0; i--) {
        digit = sanitized.substring(i, i + 1);
        tmpNum = parseInt(digit, 10);
    
        if (shouldDouble) {
          tmpNum *= 2;
    
          if (tmpNum >= 10) {
            sum += tmpNum % 10 + 1;
          } else {
            sum += tmpNum;
          }
        } else {
          sum += tmpNum;
        }
    
        shouldDouble = !shouldDouble;
      }
    
      return !!(sum % 10 === 0 ? sanitized : false);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isCurrency.js":
    /*!**************************************************!*\
      !*** ./node_modules/validator/lib/isCurrency.js ***!
      \**************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isCurrency;
    
    var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function currencyRegex(options) {
      var decimal_digits = "\\d{".concat(options.digits_after_decimal[0], "}");
      options.digits_after_decimal.forEach(function (digit, index) {
        if (index !== 0) decimal_digits = "".concat(decimal_digits, "|\\d{").concat(digit, "}");
      });
      var symbol = "(\\".concat(options.symbol.replace(/\./g, '\\.'), ")").concat(options.require_symbol ? '' : '?'),
          negative = '-?',
          whole_dollar_amount_without_sep = '[1-9]\\d*',
          whole_dollar_amount_with_sep = "[1-9]\\d{0,2}(\\".concat(options.thousands_separator, "\\d{3})*"),
          valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep],
          whole_dollar_amount = "(".concat(valid_whole_dollar_amounts.join('|'), ")?"),
          decimal_amount = "(\\".concat(options.decimal_separator, "(").concat(decimal_digits, "))").concat(options.require_decimal ? '' : '?');
      var pattern = whole_dollar_amount + (options.allow_decimal || options.require_decimal ? decimal_amount : ''); // default is negative sign before symbol, but there are two other options (besides parens)
    
      if (options.allow_negatives && !options.parens_for_negatives) {
        if (options.negative_sign_after_digits) {
          pattern += negative;
        } else if (options.negative_sign_before_digits) {
          pattern = negative + pattern;
        }
      } // South African Rand, for example, uses R 123 (space) and R-123 (no space)
    
    
      if (options.allow_negative_sign_placeholder) {
        pattern = "( (?!\\-))?".concat(pattern);
      } else if (options.allow_space_after_symbol) {
        pattern = " ?".concat(pattern);
      } else if (options.allow_space_after_digits) {
        pattern += '( (?!$))?';
      }
    
      if (options.symbol_after_digits) {
        pattern += symbol;
      } else {
        pattern = symbol + pattern;
      }
    
      if (options.allow_negatives) {
        if (options.parens_for_negatives) {
          pattern = "(\\(".concat(pattern, "\\)|").concat(pattern, ")");
        } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
          pattern = negative + pattern;
        }
      } // ensure there's a dollar and/or decimal amount, and that
      // it doesn't start with a space or a negative sign followed by a space
    
    
      return new RegExp("^(?!-? )(?=.*\\d)".concat(pattern, "$"));
    }
    
    var default_currency_options = {
      symbol: '$',
      require_symbol: false,
      allow_space_after_symbol: false,
      symbol_after_digits: false,
      allow_negatives: true,
      parens_for_negatives: false,
      negative_sign_before_digits: false,
      negative_sign_after_digits: false,
      allow_negative_sign_placeholder: false,
      thousands_separator: ',',
      decimal_separator: '.',
      allow_decimal: true,
      require_decimal: false,
      digits_after_decimal: [2],
      allow_space_after_digits: false
    };
    
    function isCurrency(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_currency_options);
      return currencyRegex(options).test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isDataURI.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/isDataURI.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isDataURI;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var validMediaType = /^[a-z]+\/[a-z0-9\-\+]+$/i;
    var validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
    var validData = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;
    
    function isDataURI(str) {
      (0, _assertString.default)(str);
      var data = str.split(',');
    
      if (data.length < 2) {
        return false;
      }
    
      var attributes = data.shift().trim().split(';');
      var schemeAndMediaType = attributes.shift();
    
      if (schemeAndMediaType.substr(0, 5) !== 'data:') {
        return false;
      }
    
      var mediaType = schemeAndMediaType.substr(5);
    
      if (mediaType !== '' && !validMediaType.test(mediaType)) {
        return false;
      }
    
      for (var i = 0; i < attributes.length; i++) {
        if (i === attributes.length - 1 && attributes[i].toLowerCase() === 'base64') {// ok
        } else if (!validAttribute.test(attributes[i])) {
          return false;
        }
      }
    
      for (var _i = 0; _i < data.length; _i++) {
        if (!validData.test(data[_i])) {
          return false;
        }
      }
    
      return true;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isDecimal.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/isDecimal.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isDecimal;
    
    var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _includes = _interopRequireDefault(__webpack_require__(/*! ./util/includes */ "./node_modules/validator/lib/util/includes.js"));
    
    var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function decimalRegExp(options) {
      var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(_alpha.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? '' : '?', "$"));
      return regExp;
    }
    
    var default_decimal_options = {
      force_decimal: false,
      decimal_digits: '1,',
      locale: 'en-US'
    };
    var blacklist = ['', '-', '+'];
    
    function isDecimal(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_decimal_options);
    
      if (options.locale in _alpha.decimal) {
        return !(0, _includes.default)(blacklist, str.replace(/ /g, '')) && decimalRegExp(options).test(str);
      }
    
      throw new Error("Invalid locale '".concat(options.locale, "'"));
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isDivisibleBy.js":
    /*!*****************************************************!*\
      !*** ./node_modules/validator/lib/isDivisibleBy.js ***!
      \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isDivisibleBy;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _toFloat = _interopRequireDefault(__webpack_require__(/*! ./toFloat */ "./node_modules/validator/lib/toFloat.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isDivisibleBy(str, num) {
      (0, _assertString.default)(str);
      return (0, _toFloat.default)(str) % parseInt(num, 10) === 0;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isEmail.js":
    /*!***********************************************!*\
      !*** ./node_modules/validator/lib/isEmail.js ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isEmail;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));
    
    var _isByteLength = _interopRequireDefault(__webpack_require__(/*! ./isByteLength */ "./node_modules/validator/lib/isByteLength.js"));
    
    var _isFQDN = _interopRequireDefault(__webpack_require__(/*! ./isFQDN */ "./node_modules/validator/lib/isFQDN.js"));
    
    var _isIP = _interopRequireDefault(__webpack_require__(/*! ./isIP */ "./node_modules/validator/lib/isIP.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var default_email_options = {
      allow_display_name: false,
      require_display_name: false,
      allow_utf8_local_part: true,
      require_tld: true
    };
    /* eslint-disable max-len */
    
    /* eslint-disable no-control-regex */
    
    var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
    var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
    var gmailUserPart = /^[a-z\d]+$/;
    var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
    var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
    var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
    /* eslint-enable max-len */
    
    /* eslint-enable no-control-regex */
    
    function isEmail(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_email_options);
    
      if (options.require_display_name || options.allow_display_name) {
        var display_email = str.match(displayName);
    
        if (display_email) {
          str = display_email[1];
        } else if (options.require_display_name) {
          return false;
        }
      }
    
      var parts = str.split('@');
      var domain = parts.pop();
      var user = parts.join('@');
      var lower_domain = domain.toLowerCase();
    
      if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
        /*
          Previously we removed dots for gmail addresses before validating.
          This was removed because it allows `multiple..dots@gmail.com`
          to be reported as valid, but it is not.
          Gmail only normalizes single dots, removing them from here is pointless,
          should be done in normalizeEmail
        */
        user = user.toLowerCase(); // Removing sub-address from username before gmail validation
    
        var username = user.split('+')[0]; // Dots are not included in gmail length restriction
    
        if (!(0, _isByteLength.default)(username.replace('.', ''), {
          min: 6,
          max: 30
        })) {
          return false;
        }
    
        var _user_parts = username.split('.');
    
        for (var i = 0; i < _user_parts.length; i++) {
          if (!gmailUserPart.test(_user_parts[i])) {
            return false;
          }
        }
      }
    
      if (!(0, _isByteLength.default)(user, {
        max: 64
      }) || !(0, _isByteLength.default)(domain, {
        max: 254
      })) {
        return false;
      }
    
      if (!(0, _isFQDN.default)(domain, {
        require_tld: options.require_tld
      })) {
        if (!options.allow_ip_domain) {
          return false;
        }
    
        if (!(0, _isIP.default)(domain)) {
          if (!domain.startsWith('[') || !domain.endsWith(']')) {
            return false;
          }
    
          var noBracketdomain = domain.substr(1, domain.length - 2);
    
          if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
            return false;
          }
        }
      }
    
      if (user[0] === '"') {
        user = user.slice(1, user.length - 1);
        return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
      }
    
      var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
      var user_parts = user.split('.');
    
      for (var _i = 0; _i < user_parts.length; _i++) {
        if (!pattern.test(user_parts[_i])) {
          return false;
        }
      }
    
      return true;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isEmpty.js":
    /*!***********************************************!*\
      !*** ./node_modules/validator/lib/isEmpty.js ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isEmpty;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var default_is_empty_options = {
      ignore_whitespace: false
    };
    
    function isEmpty(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_is_empty_options);
      return (options.ignore_whitespace ? str.trim().length : str.length) === 0;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isFQDN.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/isFQDN.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isFQDN;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var default_fqdn_options = {
      require_tld: true,
      allow_underscores: false,
      allow_trailing_dot: false
    };
    
    function isFQDN(str, options) {
      (0, _assertString.default)(str);
      options = (0, _merge.default)(options, default_fqdn_options);
      /* Remove the optional trailing dot before checking validity */
    
      if (options.allow_trailing_dot && str[str.length - 1] === '.') {
        str = str.substring(0, str.length - 1);
      }
    
      var parts = str.split('.');
    
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 63) {
          return false;
        }
      }
    
      if (options.require_tld) {
        var tld = parts.pop();
    
        if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
          return false;
        } // disallow spaces
    
    
        if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
          return false;
        }
      }
    
      for (var part, _i = 0; _i < parts.length; _i++) {
        part = parts[_i];
    
        if (options.allow_underscores) {
          part = part.replace(/_/g, '');
        }
    
        if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
          return false;
        } // disallow full-width chars
    
    
        if (/[\uff01-\uff5e]/.test(part)) {
          return false;
        }
    
        if (part[0] === '-' || part[part.length - 1] === '-') {
          return false;
        }
      }
    
      return true;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isFloat.js":
    /*!***********************************************!*\
      !*** ./node_modules/validator/lib/isFloat.js ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isFloat;
    exports.locales = void 0;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _alpha = __webpack_require__(/*! ./alpha */ "./node_modules/validator/lib/alpha.js");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isFloat(str, options) {
      (0, _assertString.default)(str);
      options = options || {};
      var float = new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(options.locale ? _alpha.decimal[options.locale] : '.', "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));
    
      if (str === '' || str === '.' || str === '-' || str === '+') {
        return false;
      }
    
      var value = parseFloat(str.replace(',', '.'));
      return float.test(str) && (!options.hasOwnProperty('min') || value >= options.min) && (!options.hasOwnProperty('max') || value <= options.max) && (!options.hasOwnProperty('lt') || value < options.lt) && (!options.hasOwnProperty('gt') || value > options.gt);
    }
    
    var locales = Object.keys(_alpha.decimal);
    exports.locales = locales;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isFullWidth.js":
    /*!***************************************************!*\
      !*** ./node_modules/validator/lib/isFullWidth.js ***!
      \***************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isFullWidth;
    exports.fullWidth = void 0;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
    exports.fullWidth = fullWidth;
    
    function isFullWidth(str) {
      (0, _assertString.default)(str);
      return fullWidth.test(str);
    }
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isHalfWidth.js":
    /*!***************************************************!*\
      !*** ./node_modules/validator/lib/isHalfWidth.js ***!
      \***************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isHalfWidth;
    exports.halfWidth = void 0;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
    exports.halfWidth = halfWidth;
    
    function isHalfWidth(str) {
      (0, _assertString.default)(str);
      return halfWidth.test(str);
    }
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isHash.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/isHash.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isHash;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var lengths = {
      md5: 32,
      md4: 32,
      sha1: 40,
      sha256: 64,
      sha384: 96,
      sha512: 128,
      ripemd128: 32,
      ripemd160: 40,
      tiger128: 32,
      tiger160: 40,
      tiger192: 48,
      crc32: 8,
      crc32b: 8
    };
    
    function isHash(str, algorithm) {
      (0, _assertString.default)(str);
      var hash = new RegExp("^[a-f0-9]{".concat(lengths[algorithm], "}$"));
      return hash.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isHexColor.js":
    /*!**************************************************!*\
      !*** ./node_modules/validator/lib/isHexColor.js ***!
      \**************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isHexColor;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;
    
    function isHexColor(str) {
      (0, _assertString.default)(str);
      return hexcolor.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isHexadecimal.js":
    /*!*****************************************************!*\
      !*** ./node_modules/validator/lib/isHexadecimal.js ***!
      \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isHexadecimal;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var hexadecimal = /^[0-9A-F]+$/i;
    
    function isHexadecimal(str) {
      (0, _assertString.default)(str);
      return hexadecimal.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isIP.js":
    /*!********************************************!*\
      !*** ./node_modules/validator/lib/isIP.js ***!
      \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isIP;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    var ipv6Block = /^[0-9A-F]{1,4}$/i;
    
    function isIP(str) {
      var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      (0, _assertString.default)(str);
      version = String(version);
    
      if (!version) {
        return isIP(str, 4) || isIP(str, 6);
      } else if (version === '4') {
        if (!ipv4Maybe.test(str)) {
          return false;
        }
    
        var parts = str.split('.').sort(function (a, b) {
          return a - b;
        });
        return parts[3] <= 255;
      } else if (version === '6') {
        var blocks = str.split(':');
        var foundOmissionBlock = false; // marker to indicate ::
        // At least some OS accept the last 32 bits of an IPv6 address
        // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
        // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
        // and '::a.b.c.d' is deprecated, but also valid.
    
        var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
        var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;
    
        if (blocks.length > expectedNumberOfBlocks) {
          return false;
        } // initial or final ::
    
    
        if (str === '::') {
          return true;
        } else if (str.substr(0, 2) === '::') {
          blocks.shift();
          blocks.shift();
          foundOmissionBlock = true;
        } else if (str.substr(str.length - 2) === '::') {
          blocks.pop();
          blocks.pop();
          foundOmissionBlock = true;
        }
    
        for (var i = 0; i < blocks.length; ++i) {
          // test for a :: which can not be at the string start/end
          // since those cases have been handled above
          if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
            if (foundOmissionBlock) {
              return false; // multiple :: in address
            }
    
            foundOmissionBlock = true;
          } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {// it has been checked before that the last
            // block is a valid IPv4 address
          } else if (!ipv6Block.test(blocks[i])) {
            return false;
          }
        }
    
        if (foundOmissionBlock) {
          return blocks.length >= 1;
        }
    
        return blocks.length === expectedNumberOfBlocks;
      }
    
      return false;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isIPRange.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/isIPRange.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isIPRange;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _isIP = _interopRequireDefault(__webpack_require__(/*! ./isIP */ "./node_modules/validator/lib/isIP.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var subnetMaybe = /^\d{1,2}$/;
    
    function isIPRange(str) {
      (0, _assertString.default)(str);
      var parts = str.split('/'); // parts[0] -> ip, parts[1] -> subnet
    
      if (parts.length !== 2) {
        return false;
      }
    
      if (!subnetMaybe.test(parts[1])) {
        return false;
      } // Disallow preceding 0 i.e. 01, 02, ...
    
    
      if (parts[1].length > 1 && parts[1].startsWith('0')) {
        return false;
      }
    
      return (0, _isIP.default)(parts[0], 4) && parts[1] <= 32 && parts[1] >= 0;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isISBN.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/isISBN.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isISBN;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/;
    var isbn13Maybe = /^(?:[0-9]{13})$/;
    var factor = [1, 3];
    
    function isISBN(str) {
      var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      (0, _assertString.default)(str);
      version = String(version);
    
      if (!version) {
        return isISBN(str, 10) || isISBN(str, 13);
      }
    
      var sanitized = str.replace(/[\s-]+/g, '');
      var checksum = 0;
      var i;
    
      if (version === '10') {
        if (!isbn10Maybe.test(sanitized)) {
          return false;
        }
    
        for (i = 0; i < 9; i++) {
          checksum += (i + 1) * sanitized.charAt(i);
        }
    
        if (sanitized.charAt(9) === 'X') {
          checksum += 10 * 10;
        } else {
          checksum += 10 * sanitized.charAt(9);
        }
    
        if (checksum % 11 === 0) {
          return !!sanitized;
        }
      } else if (version === '13') {
        if (!isbn13Maybe.test(sanitized)) {
          return false;
        }
    
        for (i = 0; i < 12; i++) {
          checksum += factor[i % 2] * sanitized.charAt(i);
        }
    
        if (sanitized.charAt(12) - (10 - checksum % 10) % 10 === 0) {
          return !!sanitized;
        }
      }
    
      return false;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isISIN.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/isISIN.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isISIN;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;
    
    function isISIN(str) {
      (0, _assertString.default)(str);
    
      if (!isin.test(str)) {
        return false;
      }
    
      var checksumStr = str.replace(/[A-Z]/g, function (character) {
        return parseInt(character, 36);
      });
      var sum = 0;
      var digit;
      var tmpNum;
      var shouldDouble = true;
    
      for (var i = checksumStr.length - 2; i >= 0; i--) {
        digit = checksumStr.substring(i, i + 1);
        tmpNum = parseInt(digit, 10);
    
        if (shouldDouble) {
          tmpNum *= 2;
    
          if (tmpNum >= 10) {
            sum += tmpNum + 1;
          } else {
            sum += tmpNum;
          }
        } else {
          sum += tmpNum;
        }
    
        shouldDouble = !shouldDouble;
      }
    
      return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isISO31661Alpha2.js":
    /*!********************************************************!*\
      !*** ./node_modules/validator/lib/isISO31661Alpha2.js ***!
      \********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isISO31661Alpha2;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _includes = _interopRequireDefault(__webpack_require__(/*! ./util/includes */ "./node_modules/validator/lib/util/includes.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    // from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    var validISO31661Alpha2CountriesCodes = ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'];
    
    function isISO31661Alpha2(str) {
      (0, _assertString.default)(str);
      return (0, _includes.default)(validISO31661Alpha2CountriesCodes, str.toUpperCase());
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isISO31661Alpha3.js":
    /*!********************************************************!*\
      !*** ./node_modules/validator/lib/isISO31661Alpha3.js ***!
      \********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isISO31661Alpha3;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _includes = _interopRequireDefault(__webpack_require__(/*! ./util/includes */ "./node_modules/validator/lib/util/includes.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    // from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
    var validISO31661Alpha3CountriesCodes = ['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE'];
    
    function isISO31661Alpha3(str) {
      (0, _assertString.default)(str);
      return (0, _includes.default)(validISO31661Alpha3CountriesCodes, str.toUpperCase());
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isISO8601.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/isISO8601.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isISO8601;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    /* eslint-disable max-len */
    // from http://goo.gl/0ejHHW
    var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
    /* eslint-enable max-len */
    
    var isValidDate = function isValidDate(str) {
      // str must have passed the ISO8601 check
      // this check is meant to catch invalid dates
      // like 2009-02-31
      // first check for ordinal dates
      var ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);
    
      if (ordinalMatch) {
        var oYear = Number(ordinalMatch[1]);
        var oDay = Number(ordinalMatch[2]); // if is leap year
    
        if (oYear % 4 === 0 && oYear % 100 !== 0) return oDay <= 366;
        return oDay <= 365;
      }
    
      var match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number);
      var year = match[1];
      var month = match[2];
      var day = match[3];
      var monthString = month ? "0".concat(month).slice(-2) : month;
      var dayString = day ? "0".concat(day).slice(-2) : day; // create a date object and compare
    
      var d = new Date("".concat(year, "-").concat(monthString || '01', "-").concat(dayString || '01'));
      if (isNaN(d.getUTCFullYear())) return false;
    
      if (month && day) {
        return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
      }
    
      return true;
    };
    
    function isISO8601(str, options) {
      (0, _assertString.default)(str);
      var check = iso8601.test(str);
      if (!options) return check;
      if (check && options.strict) return isValidDate(str);
      return check;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isISRC.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/isISRC.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isISRC;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    // see http://isrc.ifpi.org/en/isrc-standard/code-syntax
    var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;
    
    function isISRC(str) {
      (0, _assertString.default)(str);
      return isrc.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isISSN.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/isISSN.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isISSN;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var issn = '^\\d{4}-?\\d{3}[\\dX]$';
    
    function isISSN(str) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _assertString.default)(str);
      var testIssn = issn;
      testIssn = options.require_hyphen ? testIssn.replace('?', '') : testIssn;
      testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, 'i');
    
      if (!testIssn.test(str)) {
        return false;
      }
    
      var digits = str.replace('-', '').toUpperCase();
      var checksum = 0;
    
      for (var i = 0; i < digits.length; i++) {
        var digit = digits[i];
        checksum += (digit === 'X' ? 10 : +digit) * (8 - i);
      }
    
      return checksum % 11 === 0;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isIdentityCard.js":
    /*!******************************************************!*\
      !*** ./node_modules/validator/lib/isIdentityCard.js ***!
      \******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isIdentityCard;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var validators = {
      ES: function ES(str) {
        (0, _assertString.default)(str);
        var DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
        var charsValue = {
          X: 0,
          Y: 1,
          Z: 2
        };
        var controlDigits = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']; // sanitize user input
    
        var sanitized = str.trim().toUpperCase(); // validate the data structure
    
        if (!DNI.test(sanitized)) {
          return false;
        } // validate the control digit
    
    
        var number = sanitized.slice(0, -1).replace(/[X,Y,Z]/g, function (char) {
          return charsValue[char];
        });
        return sanitized.endsWith(controlDigits[number % 23]);
      }
    };
    
    function isIdentityCard(str) {
      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'any';
      (0, _assertString.default)(str);
    
      if (locale in validators) {
        return validators[locale](str);
      } else if (locale === 'any') {
        for (var key in validators) {
          if (validators.hasOwnProperty(key)) {
            var validator = validators[key];
    
            if (validator(str)) {
              return true;
            }
          }
        }
    
        return false;
      }
    
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isIn.js":
    /*!********************************************!*\
      !*** ./node_modules/validator/lib/isIn.js ***!
      \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isIn;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _toString = _interopRequireDefault(__webpack_require__(/*! ./util/toString */ "./node_modules/validator/lib/util/toString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
    function isIn(str, options) {
      (0, _assertString.default)(str);
      var i;
    
      if (Object.prototype.toString.call(options) === '[object Array]') {
        var array = [];
    
        for (i in options) {
          if ({}.hasOwnProperty.call(options, i)) {
            array[i] = (0, _toString.default)(options[i]);
          }
        }
    
        return array.indexOf(str) >= 0;
      } else if (_typeof(options) === 'object') {
        return options.hasOwnProperty(str);
      } else if (options && typeof options.indexOf === 'function') {
        return options.indexOf(str) >= 0;
      }
    
      return false;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isInt.js":
    /*!*********************************************!*\
      !*** ./node_modules/validator/lib/isInt.js ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isInt;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
    var intLeadingZeroes = /^[-+]?[0-9]+$/;
    
    function isInt(str, options) {
      (0, _assertString.default)(str);
      options = options || {}; // Get the regex to use for testing, based on whether
      // leading zeroes are allowed or not.
    
      var regex = options.hasOwnProperty('allow_leading_zeroes') && !options.allow_leading_zeroes ? int : intLeadingZeroes; // Check min/max/lt/gt
    
      var minCheckPassed = !options.hasOwnProperty('min') || str >= options.min;
      var maxCheckPassed = !options.hasOwnProperty('max') || str <= options.max;
      var ltCheckPassed = !options.hasOwnProperty('lt') || str < options.lt;
      var gtCheckPassed = !options.hasOwnProperty('gt') || str > options.gt;
      return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isJSON.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/isJSON.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isJSON;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
    function isJSON(str) {
      (0, _assertString.default)(str);
    
      try {
        var obj = JSON.parse(str);
        return !!obj && _typeof(obj) === 'object';
      } catch (e) {
        /* ignore */
      }
    
      return false;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isJWT.js":
    /*!*********************************************!*\
      !*** ./node_modules/validator/lib/isJWT.js ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isJWT;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var jwt = /^([A-Za-z0-9\-_~+\/]+[=]{0,2})\.([A-Za-z0-9\-_~+\/]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+\/]+[=]{0,2}))?$/;
    
    function isJWT(str) {
      (0, _assertString.default)(str);
      return jwt.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isLatLong.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/isLatLong.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
    var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
    
    function _default(str) {
      (0, _assertString.default)(str);
      if (!str.includes(',')) return false;
      var pair = str.split(',');
      return lat.test(pair[0]) && long.test(pair[1]);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isLength.js":
    /*!************************************************!*\
      !*** ./node_modules/validator/lib/isLength.js ***!
      \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isLength;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
    /* eslint-disable prefer-rest-params */
    function isLength(str, options) {
      (0, _assertString.default)(str);
      var min;
      var max;
    
      if (_typeof(options) === 'object') {
        min = options.min || 0;
        max = options.max;
      } else {
        // backwards compatibility: isLength(str, min [, max])
        min = arguments[1];
        max = arguments[2];
      }
    
      var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
      var len = str.length - surrogatePairs.length;
      return len >= min && (typeof max === 'undefined' || len <= max);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isLowercase.js":
    /*!***************************************************!*\
      !*** ./node_modules/validator/lib/isLowercase.js ***!
      \***************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isLowercase;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isLowercase(str) {
      (0, _assertString.default)(str);
      return str === str.toLowerCase();
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isMACAddress.js":
    /*!****************************************************!*\
      !*** ./node_modules/validator/lib/isMACAddress.js ***!
      \****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isMACAddress;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var macAddress = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
    var macAddressNoColons = /^([0-9a-fA-F]){12}$/;
    
    function isMACAddress(str, options) {
      (0, _assertString.default)(str);
    
      if (options && options.no_colons) {
        return macAddressNoColons.test(str);
      }
    
      return macAddress.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isMD5.js":
    /*!*********************************************!*\
      !*** ./node_modules/validator/lib/isMD5.js ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isMD5;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var md5 = /^[a-f0-9]{32}$/;
    
    function isMD5(str) {
      (0, _assertString.default)(str);
      return md5.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isMagnetURI.js":
    /*!***************************************************!*\
      !*** ./node_modules/validator/lib/isMagnetURI.js ***!
      \***************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isMagnetURI;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var magnetURI = /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}&dn=.+&tr=.+$/i;
    
    function isMagnetURI(url) {
      (0, _assertString.default)(url);
      return magnetURI.test(url.trim());
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isMimeType.js":
    /*!**************************************************!*\
      !*** ./node_modules/validator/lib/isMimeType.js ***!
      \**************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isMimeType;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    /*
      Checks if the provided string matches to a correct Media type format (MIME type)
    
      This function only checks is the string format follows the
      etablished rules by the according RFC specifications.
      This function supports 'charset' in textual media types
      (https://tools.ietf.org/html/rfc6657).
    
      This function does not check against all the media types listed
      by the IANA (https://www.iana.org/assignments/media-types/media-types.xhtml)
      because of lightness purposes : it would require to include
      all these MIME types in this librairy, which would weigh it
      significantly. This kind of effort maybe is not worth for the use that
      this function has in this entire librairy.
    
      More informations in the RFC specifications :
      - https://tools.ietf.org/html/rfc2045
      - https://tools.ietf.org/html/rfc2046
      - https://tools.ietf.org/html/rfc7231#section-3.1.1.1
      - https://tools.ietf.org/html/rfc7231#section-3.1.1.5
    */
    // Match simple MIME types
    // NB :
    //   Subtype length must not exceed 100 characters.
    //   This rule does not comply to the RFC specs (what is the max length ?).
    var mimeTypeSimple = /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+]{1,100}$/i; // eslint-disable-line max-len
    // Handle "charset" in "text/*"
    
    var mimeTypeText = /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i; // eslint-disable-line max-len
    // Handle "boundary" in "multipart/*"
    
    var mimeTypeMultipart = /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i; // eslint-disable-line max-len
    
    function isMimeType(str) {
      (0, _assertString.default)(str);
      return mimeTypeSimple.test(str) || mimeTypeText.test(str) || mimeTypeMultipart.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isMobilePhone.js":
    /*!*****************************************************!*\
      !*** ./node_modules/validator/lib/isMobilePhone.js ***!
      \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isMobilePhone;
    exports.locales = void 0;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    /* eslint-disable max-len */
    var phones = {
      'ar-AE': /^((\+?971)|0)?5[024568]\d{7}$/,
      'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
      'ar-EG': /^((\+?20)|0)?1[012]\d{8}$/,
      'ar-IQ': /^(\+?964|0)?7[0-9]\d{8}$/,
      'ar-JO': /^(\+?962|0)?7[789]\d{7}$/,
      'ar-KW': /^(\+?965)[569]\d{7}$/,
      'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
      'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
      'ar-TN': /^(\+?216)?[2459]\d{7}$/,
      'be-BY': /^(\+?375)?(24|25|29|33|44)\d{7}$/,
      'bg-BG': /^(\+?359|0)?8[789]\d{7}$/,
      'bn-BD': /\+?(88)?0?1[356789][0-9]{8}\b/,
      'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      'da-DK': /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
      'de-DE': /^(\+49)?0?1(5[0-25-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7}$/,
      'el-GR': /^(\+?30|0)?(69\d{8})$/,
      'en-AU': /^(\+?61|0)4\d{8}$/,
      'en-GB': /^(\+?44|0)7\d{9}$/,
      'en-GH': /^(\+233|0)(20|50|24|54|27|57|26|56|23|28)\d{7}$/,
      'en-HK': /^(\+?852\-?)?[456789]\d{3}\-?\d{4}$/,
      'en-IE': /^(\+?353|0)8[356789]\d{7}$/,
      'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
      'en-KE': /^(\+?254|0)?[7]\d{8}$/,
      'en-MU': /^(\+?230|0)?\d{8}$/,
      'en-NG': /^(\+?234|0)?[789]\d{9}$/,
      'en-NZ': /^(\+?64|0)[28]\d{7,9}$/,
      'en-PK': /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
      'en-RW': /^(\+?250|0)?[7]\d{8}$/,
      'en-SG': /^(\+65)?[89]\d{7}$/,
      'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
      'en-UG': /^(\+?256|0)?[7]\d{8}$/,
      'en-US': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
      'en-ZA': /^(\+?27|0)\d{9}$/,
      'en-ZM': /^(\+?26)?09[567]\d{7}$/,
      'es-ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
      'es-MX': /^(\+?52)?(1|01)?\d{10,11}$/,
      'es-UY': /^(\+598|0)9[1-9][\d]{6}$/,
      'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
      'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
      'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
      'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
      'fr-FR': /^(\+?33|0)[67]\d{8}$/,
      'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
      'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
      'id-ID': /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
      'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
      'ja-JP': /^(\+?81|0)[789]0[ \-]?[1-9]\d{2}[ \-]?\d{5}$/,
      'kk-KZ': /^(\+?7|8)?7\d{9}$/,
      'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
      'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
      'lt-LT': /^(\+370|8)\d{8}$/,
      'ms-MY': /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
      'nb-NO': /^(\+?47)?[49]\d{7}$/,
      'nl-BE': /^(\+?32|0)4?\d{8}$/,
      'nn-NO': /^(\+?47)?[49]\d{7}$/,
      'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
      'pt-BR': /(?=^(\+?5{2}\-?|0)[1-9]{2}\-?\d{4}\-?\d{4}$)(^(\+?5{2}\-?|0)[1-9]{2}\-?[6-9]{1}\d{3}\-?\d{4}$)|(^(\+?5{2}\-?|0)[1-9]{2}\-?9[6-9]{1}\d{3}\-?\d{4}$)/,
      'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
      'ro-RO': /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
      'ru-RU': /^(\+?7|8)?9\d{9}$/,
      'sl-SI': /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
      'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
      'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
      'th-TH': /^(\+66|66|0)\d{9}$/,
      'tr-TR': /^(\+?90|0)?5\d{9}$/,
      'uk-UA': /^(\+?38|8)?0\d{9}$/,
      'vi-VN': /^(\+?84|0)((3([2-9]))|(5([689]))|(7([0|6-9]))|(8([1-5]))|(9([0-9])))([0-9]{7})$/,
      'zh-CN': /^((\+|00)86)?1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
      'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
    };
    /* eslint-enable max-len */
    // aliases
    
    phones['en-CA'] = phones['en-US'];
    phones['fr-BE'] = phones['nl-BE'];
    phones['zh-HK'] = phones['en-HK'];
    
    function isMobilePhone(str, locale, options) {
      (0, _assertString.default)(str);
    
      if (options && options.strictMode && !str.startsWith('+')) {
        return false;
      }
    
      if (Array.isArray(locale)) {
        return locale.some(function (key) {
          if (phones.hasOwnProperty(key)) {
            var phone = phones[key];
    
            if (phone.test(str)) {
              return true;
            }
          }
    
          return false;
        });
      } else if (locale in phones) {
        return phones[locale].test(str); // alias falsey locale as 'any'
      } else if (!locale || locale === 'any') {
        for (var key in phones) {
          if (phones.hasOwnProperty(key)) {
            var phone = phones[key];
    
            if (phone.test(str)) {
              return true;
            }
          }
        }
    
        return false;
      }
    
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    
    var locales = Object.keys(phones);
    exports.locales = locales;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isMongoId.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/isMongoId.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isMongoId;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _isHexadecimal = _interopRequireDefault(__webpack_require__(/*! ./isHexadecimal */ "./node_modules/validator/lib/isHexadecimal.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isMongoId(str) {
      (0, _assertString.default)(str);
      return (0, _isHexadecimal.default)(str) && str.length === 24;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isMultibyte.js":
    /*!***************************************************!*\
      !*** ./node_modules/validator/lib/isMultibyte.js ***!
      \***************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isMultibyte;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    /* eslint-disable no-control-regex */
    var multibyte = /[^\x00-\x7F]/;
    /* eslint-enable no-control-regex */
    
    function isMultibyte(str) {
      (0, _assertString.default)(str);
      return multibyte.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isNumeric.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/isNumeric.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isNumeric;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var numeric = /^[+-]?([0-9]*[.])?[0-9]+$/;
    var numericNoSymbols = /^[0-9]+$/;
    
    function isNumeric(str, options) {
      (0, _assertString.default)(str);
    
      if (options && options.no_symbols) {
        return numericNoSymbols.test(str);
      }
    
      return numeric.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isPort.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/isPort.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isPort;
    
    var _isInt = _interopRequireDefault(__webpack_require__(/*! ./isInt */ "./node_modules/validator/lib/isInt.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isPort(str) {
      return (0, _isInt.default)(str, {
        min: 0,
        max: 65535
      });
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isPostalCode.js":
    /*!****************************************************!*\
      !*** ./node_modules/validator/lib/isPostalCode.js ***!
      \****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = _default;
    exports.locales = void 0;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    // common patterns
    var threeDigit = /^\d{3}$/;
    var fourDigit = /^\d{4}$/;
    var fiveDigit = /^\d{5}$/;
    var sixDigit = /^\d{6}$/;
    var patterns = {
      AD: /^AD\d{3}$/,
      AT: fourDigit,
      AU: fourDigit,
      BE: fourDigit,
      BG: fourDigit,
      CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
      CH: fourDigit,
      CZ: /^\d{3}\s?\d{2}$/,
      DE: fiveDigit,
      DK: fourDigit,
      DZ: fiveDigit,
      EE: fiveDigit,
      ES: fiveDigit,
      FI: fiveDigit,
      FR: /^\d{2}\s?\d{3}$/,
      GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
      GR: /^\d{3}\s?\d{2}$/,
      HR: /^([1-5]\d{4}$)/,
      HU: fourDigit,
      IL: fiveDigit,
      IN: sixDigit,
      IS: threeDigit,
      IT: fiveDigit,
      JP: /^\d{3}\-\d{4}$/,
      KE: fiveDigit,
      LI: /^(948[5-9]|949[0-7])$/,
      LT: /^LT\-\d{5}$/,
      LU: fourDigit,
      LV: /^LV\-\d{4}$/,
      MX: fiveDigit,
      NL: /^\d{4}\s?[a-z]{2}$/i,
      NO: fourDigit,
      PL: /^\d{2}\-\d{3}$/,
      PT: /^\d{4}\-\d{3}?$/,
      RO: sixDigit,
      RU: sixDigit,
      SA: fiveDigit,
      SE: /^\d{3}\s?\d{2}$/,
      SI: fourDigit,
      SK: /^\d{3}\s?\d{2}$/,
      TN: fourDigit,
      TW: /^\d{3}(\d{2})?$/,
      UA: fiveDigit,
      US: /^\d{5}(-\d{4})?$/,
      ZA: fourDigit,
      ZM: fiveDigit
    };
    var locales = Object.keys(patterns);
    exports.locales = locales;
    
    function _default(str, locale) {
      (0, _assertString.default)(str);
    
      if (locale in patterns) {
        return patterns[locale].test(str);
      } else if (locale === 'any') {
        for (var key in patterns) {
          if (patterns.hasOwnProperty(key)) {
            var pattern = patterns[key];
    
            if (pattern.test(str)) {
              return true;
            }
          }
        }
    
        return false;
      }
    
      throw new Error("Invalid locale '".concat(locale, "'"));
    }
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isRFC3339.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/isRFC3339.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isRFC3339;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    /* Based on https://tools.ietf.org/html/rfc3339#section-5.6 */
    var dateFullYear = /[0-9]{4}/;
    var dateMonth = /(0[1-9]|1[0-2])/;
    var dateMDay = /([12]\d|0[1-9]|3[01])/;
    var timeHour = /([01][0-9]|2[0-3])/;
    var timeMinute = /[0-5][0-9]/;
    var timeSecond = /([0-5][0-9]|60)/;
    var timeSecFrac = /(\.[0-9]+)?/;
    var timeNumOffset = new RegExp("[-+]".concat(timeHour.source, ":").concat(timeMinute.source));
    var timeOffset = new RegExp("([zZ]|".concat(timeNumOffset.source, ")"));
    var partialTime = new RegExp("".concat(timeHour.source, ":").concat(timeMinute.source, ":").concat(timeSecond.source).concat(timeSecFrac.source));
    var fullDate = new RegExp("".concat(dateFullYear.source, "-").concat(dateMonth.source, "-").concat(dateMDay.source));
    var fullTime = new RegExp("".concat(partialTime.source).concat(timeOffset.source));
    var rfc3339 = new RegExp("".concat(fullDate.source, "[ tT]").concat(fullTime.source));
    
    function isRFC3339(str) {
      (0, _assertString.default)(str);
      return rfc3339.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isSurrogatePair.js":
    /*!*******************************************************!*\
      !*** ./node_modules/validator/lib/isSurrogatePair.js ***!
      \*******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isSurrogatePair;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
    
    function isSurrogatePair(str) {
      (0, _assertString.default)(str);
      return surrogatePair.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isURL.js":
    /*!*********************************************!*\
      !*** ./node_modules/validator/lib/isURL.js ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isURL;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _isFQDN = _interopRequireDefault(__webpack_require__(/*! ./isFQDN */ "./node_modules/validator/lib/isFQDN.js"));
    
    var _isIP = _interopRequireDefault(__webpack_require__(/*! ./isIP */ "./node_modules/validator/lib/isIP.js"));
    
    var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var default_url_options = {
      protocols: ['http', 'https', 'ftp'],
      require_tld: true,
      require_protocol: false,
      require_host: true,
      require_valid_protocol: true,
      allow_underscores: false,
      allow_trailing_dot: false,
      allow_protocol_relative_urls: false
    };
    var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;
    
    function isRegExp(obj) {
      return Object.prototype.toString.call(obj) === '[object RegExp]';
    }
    
    function checkHost(host, matches) {
      for (var i = 0; i < matches.length; i++) {
        var match = matches[i];
    
        if (host === match || isRegExp(match) && match.test(host)) {
          return true;
        }
      }
    
      return false;
    }
    
    function isURL(url, options) {
      (0, _assertString.default)(url);
    
      if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
        return false;
      }
    
      if (url.indexOf('mailto:') === 0) {
        return false;
      }
    
      options = (0, _merge.default)(options, default_url_options);
      var protocol, auth, host, hostname, port, port_str, split, ipv6;
      split = url.split('#');
      url = split.shift();
      split = url.split('?');
      url = split.shift();
      split = url.split('://');
    
      if (split.length > 1) {
        protocol = split.shift().toLowerCase();
    
        if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
          return false;
        }
      } else if (options.require_protocol) {
        return false;
      } else if (url.substr(0, 2) === '//') {
        if (!options.allow_protocol_relative_urls) {
          return false;
        }
    
        split[0] = url.substr(2);
      }
    
      url = split.join('://');
    
      if (url === '') {
        return false;
      }
    
      split = url.split('/');
      url = split.shift();
    
      if (url === '' && !options.require_host) {
        return true;
      }
    
      split = url.split('@');
    
      if (split.length > 1) {
        if (options.disallow_auth) {
          return false;
        }
    
        auth = split.shift();
    
        if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
          return false;
        }
      }
    
      hostname = split.join('@');
      port_str = null;
      ipv6 = null;
      var ipv6_match = hostname.match(wrapped_ipv6);
    
      if (ipv6_match) {
        host = '';
        ipv6 = ipv6_match[1];
        port_str = ipv6_match[2] || null;
      } else {
        split = hostname.split(':');
        host = split.shift();
    
        if (split.length) {
          port_str = split.join(':');
        }
      }
    
      if (port_str !== null) {
        port = parseInt(port_str, 10);
    
        if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
          return false;
        }
      }
    
      if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
        return false;
      }
    
      host = host || ipv6;
    
      if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
        return false;
      }
    
      if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
        return false;
      }
    
      return true;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isUUID.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/isUUID.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isUUID;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var uuid = {
      3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
      4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
      all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    };
    
    function isUUID(str) {
      var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
      (0, _assertString.default)(str);
      var pattern = uuid[version];
      return pattern && pattern.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isUppercase.js":
    /*!***************************************************!*\
      !*** ./node_modules/validator/lib/isUppercase.js ***!
      \***************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isUppercase;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isUppercase(str) {
      (0, _assertString.default)(str);
      return str === str.toUpperCase();
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isVariableWidth.js":
    /*!*******************************************************!*\
      !*** ./node_modules/validator/lib/isVariableWidth.js ***!
      \*******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isVariableWidth;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _isFullWidth = __webpack_require__(/*! ./isFullWidth */ "./node_modules/validator/lib/isFullWidth.js");
    
    var _isHalfWidth = __webpack_require__(/*! ./isHalfWidth */ "./node_modules/validator/lib/isHalfWidth.js");
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isVariableWidth(str) {
      (0, _assertString.default)(str);
      return _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/isWhitelisted.js":
    /*!*****************************************************!*\
      !*** ./node_modules/validator/lib/isWhitelisted.js ***!
      \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = isWhitelisted;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function isWhitelisted(str, chars) {
      (0, _assertString.default)(str);
    
      for (var i = str.length - 1; i >= 0; i--) {
        if (chars.indexOf(str[i]) === -1) {
          return false;
        }
      }
    
      return true;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/ltrim.js":
    /*!*********************************************!*\
      !*** ./node_modules/validator/lib/ltrim.js ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = ltrim;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function ltrim(str, chars) {
      (0, _assertString.default)(str);
      var pattern = chars ? new RegExp("^[".concat(chars, "]+"), 'g') : /^\s+/g;
      return str.replace(pattern, '');
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/matches.js":
    /*!***********************************************!*\
      !*** ./node_modules/validator/lib/matches.js ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = matches;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function matches(str, pattern, modifiers) {
      (0, _assertString.default)(str);
    
      if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
        pattern = new RegExp(pattern, modifiers);
      }
    
      return pattern.test(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/normalizeEmail.js":
    /*!******************************************************!*\
      !*** ./node_modules/validator/lib/normalizeEmail.js ***!
      \******************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = normalizeEmail;
    
    var _merge = _interopRequireDefault(__webpack_require__(/*! ./util/merge */ "./node_modules/validator/lib/util/merge.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    var default_normalize_email_options = {
      // The following options apply to all email addresses
      // Lowercases the local part of the email address.
      // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
      // The domain is always lowercased, as per RFC 1035
      all_lowercase: true,
      // The following conversions are specific to GMail
      // Lowercases the local part of the GMail address (known to be case-insensitive)
      gmail_lowercase: true,
      // Removes dots from the local part of the email address, as that's ignored by GMail
      gmail_remove_dots: true,
      // Removes the subaddress (e.g. "+foo") from the email address
      gmail_remove_subaddress: true,
      // Conversts the googlemail.com domain to gmail.com
      gmail_convert_googlemaildotcom: true,
      // The following conversions are specific to Outlook.com / Windows Live / Hotmail
      // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
      outlookdotcom_lowercase: true,
      // Removes the subaddress (e.g. "+foo") from the email address
      outlookdotcom_remove_subaddress: true,
      // The following conversions are specific to Yahoo
      // Lowercases the local part of the Yahoo address (known to be case-insensitive)
      yahoo_lowercase: true,
      // Removes the subaddress (e.g. "-foo") from the email address
      yahoo_remove_subaddress: true,
      // The following conversions are specific to Yandex
      // Lowercases the local part of the Yandex address (known to be case-insensitive)
      yandex_lowercase: true,
      // The following conversions are specific to iCloud
      // Lowercases the local part of the iCloud address (known to be case-insensitive)
      icloud_lowercase: true,
      // Removes the subaddress (e.g. "+foo") from the email address
      icloud_remove_subaddress: true
    }; // List of domains used by iCloud
    
    var icloud_domains = ['icloud.com', 'me.com']; // List of domains used by Outlook.com and its predecessors
    // This list is likely incomplete.
    // Partial reference:
    // https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/
    
    var outlookdotcom_domains = ['hotmail.at', 'hotmail.be', 'hotmail.ca', 'hotmail.cl', 'hotmail.co.il', 'hotmail.co.nz', 'hotmail.co.th', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.gr', 'hotmail.com.mx', 'hotmail.com.pe', 'hotmail.com.tr', 'hotmail.com.vn', 'hotmail.cz', 'hotmail.de', 'hotmail.dk', 'hotmail.es', 'hotmail.fr', 'hotmail.hu', 'hotmail.id', 'hotmail.ie', 'hotmail.in', 'hotmail.it', 'hotmail.jp', 'hotmail.kr', 'hotmail.lv', 'hotmail.my', 'hotmail.ph', 'hotmail.pt', 'hotmail.sa', 'hotmail.sg', 'hotmail.sk', 'live.be', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.mx', 'live.de', 'live.es', 'live.eu', 'live.fr', 'live.it', 'live.nl', 'msn.com', 'outlook.at', 'outlook.be', 'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th', 'outlook.com', 'outlook.com.ar', 'outlook.com.au', 'outlook.com.br', 'outlook.com.gr', 'outlook.com.pe', 'outlook.com.tr', 'outlook.com.vn', 'outlook.cz', 'outlook.de', 'outlook.dk', 'outlook.es', 'outlook.fr', 'outlook.hu', 'outlook.id', 'outlook.ie', 'outlook.in', 'outlook.it', 'outlook.jp', 'outlook.kr', 'outlook.lv', 'outlook.my', 'outlook.ph', 'outlook.pt', 'outlook.sa', 'outlook.sg', 'outlook.sk', 'passport.com']; // List of domains used by Yahoo Mail
    // This list is likely incomplete
    
    var yahoo_domains = ['rocketmail.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.com', 'yahoo.de', 'yahoo.fr', 'yahoo.in', 'yahoo.it', 'ymail.com']; // List of domains used by yandex.ru
    
    var yandex_domains = ['yandex.ru', 'yandex.ua', 'yandex.kz', 'yandex.com', 'yandex.by', 'ya.ru']; // replace single dots, but not multiple consecutive dots
    
    function dotsReplacer(match) {
      if (match.length > 1) {
        return match;
      }
    
      return '';
    }
    
    function normalizeEmail(email, options) {
      options = (0, _merge.default)(options, default_normalize_email_options);
      var raw_parts = email.split('@');
      var domain = raw_parts.pop();
      var user = raw_parts.join('@');
      var parts = [user, domain]; // The domain is always lowercased, as it's case-insensitive per RFC 1035
    
      parts[1] = parts[1].toLowerCase();
    
      if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
        // Address is GMail
        if (options.gmail_remove_subaddress) {
          parts[0] = parts[0].split('+')[0];
        }
    
        if (options.gmail_remove_dots) {
          // this does not replace consecutive dots like example..email@gmail.com
          parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
        }
    
        if (!parts[0].length) {
          return false;
        }
    
        if (options.all_lowercase || options.gmail_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
    
        parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1];
      } else if (icloud_domains.indexOf(parts[1]) >= 0) {
        // Address is iCloud
        if (options.icloud_remove_subaddress) {
          parts[0] = parts[0].split('+')[0];
        }
    
        if (!parts[0].length) {
          return false;
        }
    
        if (options.all_lowercase || options.icloud_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
      } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
        // Address is Outlook.com
        if (options.outlookdotcom_remove_subaddress) {
          parts[0] = parts[0].split('+')[0];
        }
    
        if (!parts[0].length) {
          return false;
        }
    
        if (options.all_lowercase || options.outlookdotcom_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
      } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
        // Address is Yahoo
        if (options.yahoo_remove_subaddress) {
          var components = parts[0].split('-');
          parts[0] = components.length > 1 ? components.slice(0, -1).join('-') : components[0];
        }
    
        if (!parts[0].length) {
          return false;
        }
    
        if (options.all_lowercase || options.yahoo_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
      } else if (yandex_domains.indexOf(parts[1]) >= 0) {
        if (options.all_lowercase || options.yandex_lowercase) {
          parts[0] = parts[0].toLowerCase();
        }
    
        parts[1] = 'yandex.ru'; // all yandex domains are equal, 1st preffered
      } else if (options.all_lowercase) {
        // Any other address
        parts[0] = parts[0].toLowerCase();
      }
    
      return parts.join('@');
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/rtrim.js":
    /*!*********************************************!*\
      !*** ./node_modules/validator/lib/rtrim.js ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = rtrim;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function rtrim(str, chars) {
      (0, _assertString.default)(str);
      var pattern = chars ? new RegExp("[".concat(chars, "]")) : /\s/;
      var idx = str.length - 1;
    
      for (; idx >= 0 && pattern.test(str[idx]); idx--) {
        ;
      }
    
      return idx < str.length ? str.substr(0, idx + 1) : str;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/stripLow.js":
    /*!************************************************!*\
      !*** ./node_modules/validator/lib/stripLow.js ***!
      \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = stripLow;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    var _blacklist = _interopRequireDefault(__webpack_require__(/*! ./blacklist */ "./node_modules/validator/lib/blacklist.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function stripLow(str, keep_new_lines) {
      (0, _assertString.default)(str);
      var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
      return (0, _blacklist.default)(str, chars);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/toBoolean.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/toBoolean.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toBoolean;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function toBoolean(str, strict) {
      (0, _assertString.default)(str);
    
      if (strict) {
        return str === '1' || str === 'true';
      }
    
      return str !== '0' && str !== 'false' && str !== '';
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/toDate.js":
    /*!**********************************************!*\
      !*** ./node_modules/validator/lib/toDate.js ***!
      \**********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toDate;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function toDate(date) {
      (0, _assertString.default)(date);
      date = Date.parse(date);
      return !isNaN(date) ? new Date(date) : null;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/toFloat.js":
    /*!***********************************************!*\
      !*** ./node_modules/validator/lib/toFloat.js ***!
      \***********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toFloat;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function toFloat(str) {
      (0, _assertString.default)(str);
      return parseFloat(str);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/toInt.js":
    /*!*********************************************!*\
      !*** ./node_modules/validator/lib/toInt.js ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toInt;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function toInt(str, radix) {
      (0, _assertString.default)(str);
      return parseInt(str, radix || 10);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/trim.js":
    /*!********************************************!*\
      !*** ./node_modules/validator/lib/trim.js ***!
      \********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = trim;
    
    var _rtrim = _interopRequireDefault(__webpack_require__(/*! ./rtrim */ "./node_modules/validator/lib/rtrim.js"));
    
    var _ltrim = _interopRequireDefault(__webpack_require__(/*! ./ltrim */ "./node_modules/validator/lib/ltrim.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function trim(str, chars) {
      return (0, _rtrim.default)((0, _ltrim.default)(str, chars), chars);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/unescape.js":
    /*!************************************************!*\
      !*** ./node_modules/validator/lib/unescape.js ***!
      \************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = unescape;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function unescape(str) {
      (0, _assertString.default)(str);
      return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`');
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/util/assertString.js":
    /*!*********************************************************!*\
      !*** ./node_modules/validator/lib/util/assertString.js ***!
      \*********************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = assertString;
    
    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
    function assertString(input) {
      var isString = typeof input === 'string' || input instanceof String;
    
      if (!isString) {
        var invalidType;
    
        if (input === null) {
          invalidType = 'null';
        } else {
          invalidType = _typeof(input);
    
          if (invalidType === 'object' && input.constructor && input.constructor.hasOwnProperty('name')) {
            invalidType = input.constructor.name;
          } else {
            invalidType = "a ".concat(invalidType);
          }
        }
    
        throw new TypeError("Expected string but received ".concat(invalidType, "."));
      }
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/util/includes.js":
    /*!*****************************************************!*\
      !*** ./node_modules/validator/lib/util/includes.js ***!
      \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    
    var includes = function includes(arr, val) {
      return arr.some(function (arrVal) {
        return val === arrVal;
      });
    };
    
    var _default = includes;
    exports.default = _default;
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/util/merge.js":
    /*!**************************************************!*\
      !*** ./node_modules/validator/lib/util/merge.js ***!
      \**************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = merge;
    
    function merge() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaults = arguments.length > 1 ? arguments[1] : undefined;
    
      for (var key in defaults) {
        if (typeof obj[key] === 'undefined') {
          obj[key] = defaults[key];
        }
      }
    
      return obj;
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/util/toString.js":
    /*!*****************************************************!*\
      !*** ./node_modules/validator/lib/util/toString.js ***!
      \*****************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = toString;
    
    function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
    
    function toString(input) {
      if (_typeof(input) === 'object' && input !== null) {
        if (typeof input.toString === 'function') {
          input = input.toString();
        } else {
          input = '[object Object]';
        }
      } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {
        input = '';
      }
    
      return String(input);
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./node_modules/validator/lib/whitelist.js":
    /*!*************************************************!*\
      !*** ./node_modules/validator/lib/whitelist.js ***!
      \*************************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = whitelist;
    
    var _assertString = _interopRequireDefault(__webpack_require__(/*! ./util/assertString */ "./node_modules/validator/lib/util/assertString.js"));
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function whitelist(str, chars) {
      (0, _assertString.default)(str);
      return str.replace(new RegExp("[^".concat(chars, "]+"), 'g'), '');
    }
    
    module.exports = exports.default;
    module.exports.default = exports.default;
    
    /***/ }),
    
    /***/ "./src/images/cellphone_guy-mobile.png":
    /*!*********************************************!*\
      !*** ./src/images/cellphone_guy-mobile.png ***!
      \*********************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "images/cellphone_guy-mobile.png";
    
    /***/ }),
    
    /***/ "./src/images/costume_guy.png":
    /*!************************************!*\
      !*** ./src/images/costume_guy.png ***!
      \************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "images/costume_guy.png";
    
    /***/ }),
    
    /***/ "./src/images/hero_bg-mobile.png":
    /*!***************************************!*\
      !*** ./src/images/hero_bg-mobile.png ***!
      \***************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "images/hero_bg-mobile.png";
    
    /***/ }),
    
    /***/ "./src/images/home_conversion.png":
    /*!****************************************!*\
      !*** ./src/images/home_conversion.png ***!
      \****************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "images/home_conversion.png";
    
    /***/ }),
    
    /***/ "./src/images/home_deliverables.png":
    /*!******************************************!*\
      !*** ./src/images/home_deliverables.png ***!
      \******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "images/home_deliverables.png";
    
    /***/ }),
    
    /***/ "./src/images/home_hero.png":
    /*!**********************************!*\
      !*** ./src/images/home_hero.png ***!
      \**********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "images/home_hero.png";
    
    /***/ }),
    
    /***/ "./src/images/home_how_it_works.png":
    /*!******************************************!*\
      !*** ./src/images/home_how_it_works.png ***!
      \******************************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    module.exports = __webpack_require__.p + "images/home_how_it_works.png";
    
    /***/ }),
    
    /***/ "./src/index.js":
    /*!**********************!*\
      !*** ./src/index.js ***!
      \**********************/
    /*! no exports provided */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _scss_homepage_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/homepage.scss */ "./src/scss/homepage.scss");
    /* harmony import */ var _scss_homepage_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_homepage_scss__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */ var _images_cellphone_guy_mobile_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/cellphone_guy-mobile.png */ "./src/images/cellphone_guy-mobile.png");
    /* harmony import */ var _images_cellphone_guy_mobile_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_images_cellphone_guy_mobile_png__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */ var _images_costume_guy_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/costume_guy.png */ "./src/images/costume_guy.png");
    /* harmony import */ var _images_costume_guy_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_images_costume_guy_png__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */ var _images_hero_bg_mobile_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/hero_bg-mobile.png */ "./src/images/hero_bg-mobile.png");
    /* harmony import */ var _images_hero_bg_mobile_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_hero_bg_mobile_png__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */ var _images_home_conversion_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/home_conversion.png */ "./src/images/home_conversion.png");
    /* harmony import */ var _images_home_conversion_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_images_home_conversion_png__WEBPACK_IMPORTED_MODULE_4__);
    /* harmony import */ var _images_home_deliverables_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/home_deliverables.png */ "./src/images/home_deliverables.png");
    /* harmony import */ var _images_home_deliverables_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_home_deliverables_png__WEBPACK_IMPORTED_MODULE_5__);
    /* harmony import */ var _images_home_hero_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/home_hero.png */ "./src/images/home_hero.png");
    /* harmony import */ var _images_home_hero_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_home_hero_png__WEBPACK_IMPORTED_MODULE_6__);
    /* harmony import */ var _images_home_how_it_works_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/home_how_it_works.png */ "./src/images/home_how_it_works.png");
    /* harmony import */ var _images_home_how_it_works_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_images_home_how_it_works_png__WEBPACK_IMPORTED_MODULE_7__);
    /* harmony import */ var _js_email_validate_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/email-validate.js */ "./src/js/email-validate.js");
    /* harmony import */ var _js_email_validate_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_email_validate_js__WEBPACK_IMPORTED_MODULE_8__);
    // styles
     // images
    
    
    
    
    
    
    
     // js
    
    
    
    /***/ }),
    
    /***/ "./src/js/email-validate.js":
    /*!**********************************!*\
      !*** ./src/js/email-validate.js ***!
      \**********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    var validator = __webpack_require__(/*! validator */ "./node_modules/validator/index.js");
    
    var api_key = "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";
    var form = document.getElementById('critique-form');
    var nameField = document.getElementById('sef-name');
    var emailField = document.getElementById('sef-email');
    var submitBtn = document.getElementById('sef-submit');
    var allFields = document.querySelectorAll('.critique-form__input');
    var locationHost = 'designcritique.io';
    var invalidInputs = [];
    var isAllSet = false;
    var newEmailData = '';
    var emailData = "{\"personalizations\":[{\"to\":[{\"email\":\"hello@designcritique.io\",\"name\":\"Design Critique\"}],\"dynamic_template_data\":{\"sef-name\":\"\",\"sef-email\":\"\",\"sef-website-from\":\"\"}}],\"from\":{\"email\":\"noreplay@designcritique.io\",\"name\":\"Design Critique\"},\"reply_to\":{\"email\":\"noreplay@designcritique.io\",\"name\":\"Design Critique\"},\"template_id\":\"d-c94f83ca83c4433ca315659cd56c3a8b\"}";
    var emailDataParsed = JSON.parse(emailData);
    
    if (submitBtn) {
      submitBtn.addEventListener('click', onFormSubmit);
    }
    
    function checkValidator(evt) {
      if (!validator.isEmail(emailField.value)) {
        emailField.setCustomValidity('');
        emailField.classList.add('error');
      } else {
        emailField.classList.remove('error');
        emailField.removeEventListener('keyup', checkValidator);
      } // console.log(evt);
    
    }
    
    function onMessageError(evt) {
      // console.log(evt);
      if (evt.target.validity.valueMissing) {
        evt.target.classList.add('error');
      } else {
        evt.target.classList.remove('error');
      }
    } // console.log(newEmailData);
    
    
    function onFormSubmit() {
      var arr = allFields;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
    
      try {
        for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var el = _step.value;
    
          // console.log(el);
          if (el.validity.valueMissing) {
            el.classList.add('error');
            el.addEventListener('keyup', onMessageError);
            invalidInputs.push(el.id); // console.log('breaked', el.id);
    
            break;
          } else {
            el.removeEventListener('keyup', onMessageError);
            el.classList.remove('error');
            var index = invalidInputs.indexOf(el);
            if (index !== -1) array.splice(index, 1);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    
      if (validator.isEmail(emailField.value)) {
        emailField.setCustomValidity('');
        emailField.removeEventListener('keyup', checkValidator);
        emailField.classList.remove('error');
        isAllSet = true;
      } else {
        isAllSet = false;
        emailField.classList.add('error');
        emailField.addEventListener('keyup', checkValidator);
        emailField.setCustomValidity('Please check your email.');
      } // console.log(validator.isEmail(emailField.value));
      // console.log('isAllSet', isAllSet);
      // console.log('invalidInputs', invalidInputs);
    
    
      if (invalidInputs.length === 0 && isAllSet === true) {
        // if everything is ok parse email data, change to form values, stringify again and send email
        emailDataParsed.personalizations[0].dynamic_template_data['sef-website-from'] = locationHost;
        emailDataParsed.personalizations[0].dynamic_template_data['sef-name'] = nameField.value;
        emailDataParsed.personalizations[0].dynamic_template_data['sef-email'] = emailField.value;
        newEmailData = JSON.stringify(emailDataParsed); // console.log(newEmailData);
    
        sendEmail();
      } // reset array after check
    
    
      invalidInputs = [];
    }
    
    function sendEmail() {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.sendgrid.com/v3/mail/send",
        "method": "POST",
        "headers": {
          "authorization": "Bearer ".concat(api_key),
          "content-type": "application/json"
        },
        "processData": false,
        "data": newEmailData
      };
      $.ajax(settings).done(function (response) {
        // console.log('success');
        form.submit();
      });
    }
    
    /***/ }),
    
    /***/ "./src/scss/homepage.scss":
    /*!********************************!*\
      !*** ./src/scss/homepage.scss ***!
      \********************************/
    /*! no static exports found */
    /***/ (function(module, exports, __webpack_require__) {
    
    // extracted by mini-css-extract-plugin
    
    /***/ })
    
    /******/ });
    //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9hbHBoYS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9ibGFja2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvY29udGFpbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvZXF1YWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2VzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0FmdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzQWxwaGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNBbHBoYW51bWVyaWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNBc2NpaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0Jhc2U2NC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0JlZm9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0Jvb2xlYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNCeXRlTGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzQ3JlZGl0Q2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0N1cnJlbmN5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzRGF0YVVSSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0RlY2ltYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNEaXZpc2libGVCeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0VtYWlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzRW1wdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNGUUROLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzRmxvYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNGdWxsV2lkdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNIYWxmV2lkdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNIYXNoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSGV4Q29sb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNIZXhhZGVjaW1hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0lQLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSVBSYW5nZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0lTQk4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJU0lOLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSVNPMzE2NjFBbHBoYTIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJU08zMTY2MUFscGhhMy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0lTTzg2MDEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNJU1JDLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSVNTTi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0lkZW50aXR5Q2FyZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzSlNPTi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0pXVC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc0xhdExvbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNMZW5ndGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNMb3dlcmNhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNNQUNBZGRyZXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzTUQ1LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzTWFnbmV0VVJJLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzTWltZVR5cGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNNb2JpbGVQaG9uZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc01vbmdvSWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNNdWx0aWJ5dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNOdW1lcmljLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzUG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc1Bvc3RhbENvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNSRkMzMzM5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzU3Vycm9nYXRlUGFpci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc1VSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9pc1VVSUQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNVcHBlcmNhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvaXNWYXJpYWJsZVdpZHRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL2lzV2hpdGVsaXN0ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvbHRyaW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvbWF0Y2hlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9ub3JtYWxpemVFbWFpbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9ydHJpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi9zdHJpcExvdy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi90b0Jvb2xlYW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvdG9EYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3RvRmxvYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvdG9JbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvdHJpbS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi91bmVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi91dGlsL2Fzc2VydFN0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi91dGlsL2luY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy92YWxpZGF0b3IvbGliL3V0aWwvbWVyZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3ZhbGlkYXRvci9saWIvdXRpbC90b1N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmFsaWRhdG9yL2xpYi93aGl0ZWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9jZWxscGhvbmVfZ3V5LW1vYmlsZS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9jb3N0dW1lX2d1eS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9oZXJvX2JnLW1vYmlsZS5wbmciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ltYWdlcy9ob21lX2NvbnZlcnNpb24ucG5nIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvaG9tZV9kZWxpdmVyYWJsZXMucG5nIiwid2VicGFjazovLy8uL3NyYy9pbWFnZXMvaG9tZV9oZXJvLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW1hZ2VzL2hvbWVfaG93X2l0X3dvcmtzLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2VtYWlsLXZhbGlkYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL2hvbWVwYWdlLnNjc3M/MmU4MCJdLCJuYW1lcyI6WyJ2YWxpZGF0b3IiLCJyZXF1aXJlIiwiYXBpX2tleSIsInByb2Nlc3MiLCJmb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIm5hbWVGaWVsZCIsImVtYWlsRmllbGQiLCJzdWJtaXRCdG4iLCJhbGxGaWVsZHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibG9jYXRpb25Ib3N0IiwiaW52YWxpZElucHV0cyIsImlzQWxsU2V0IiwibmV3RW1haWxEYXRhIiwiZW1haWxEYXRhIiwiZW1haWxEYXRhUGFyc2VkIiwiSlNPTiIsInBhcnNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uRm9ybVN1Ym1pdCIsImNoZWNrVmFsaWRhdG9yIiwiZXZ0IiwiaXNFbWFpbCIsInZhbHVlIiwic2V0Q3VzdG9tVmFsaWRpdHkiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwib25NZXNzYWdlRXJyb3IiLCJ0YXJnZXQiLCJ2YWxpZGl0eSIsInZhbHVlTWlzc2luZyIsImFyciIsImVsIiwicHVzaCIsImlkIiwiaW5kZXgiLCJpbmRleE9mIiwiYXJyYXkiLCJzcGxpY2UiLCJsZW5ndGgiLCJwZXJzb25hbGl6YXRpb25zIiwiZHluYW1pY190ZW1wbGF0ZV9kYXRhIiwic3RyaW5naWZ5Iiwic2VuZEVtYWlsIiwic2V0dGluZ3MiLCIkIiwiYWpheCIsImRvbmUiLCJyZXNwb25zZSIsInN1Ym1pdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUM4QixNQUFkLEtBQXlCLENBQTFCLElBQWlDN0IsUUFBUSxLQUFLLElBQWxELEVBQXlEO0FBRXJEO0FBRUFHLG1CQUFlLENBQUMyQixnQkFBaEIsQ0FBaUMsQ0FBakMsRUFBb0NDLHFCQUFwQyxDQUEwRCxrQkFBMUQsSUFBZ0ZqQyxZQUFoRjtBQUNBSyxtQkFBZSxDQUFDMkIsZ0JBQWhCLENBQWlDLENBQWpDLEVBQW9DQyxxQkFBcEMsQ0FBMEQsVUFBMUQsSUFBd0V0QyxTQUFTLENBQUNrQixLQUFsRjtBQUNBUixtQkFBZSxDQUFDMkIsZ0JBQWhCLENBQWlDLENBQWpDLEVBQW9DQyxxQkFBcEMsQ0FBMEQsV0FBMUQsSUFBeUVyQyxVQUFVLENBQUNpQixLQUFwRjtBQUVBVixnQkFBWSxHQUFHRyxJQUFJLENBQUM0QixTQUFMLENBQWU3QixlQUFmLENBQWYsQ0FScUQsQ0FTckQ7O0FBRUE4QixhQUFTO0FBQ1osR0FuRG1CLENBcURwQjs7O0FBQ0FsQyxlQUFhLEdBQUcsRUFBaEI7QUFFSDs7QUFFRCxTQUFTa0MsU0FBVCxHQUFxQjtBQUVqQixNQUFJQyxRQUFRLEdBQUc7QUFDWCxhQUFTLElBREU7QUFFWCxtQkFBZSxJQUZKO0FBR1gsV0FBTyx1Q0FISTtBQUlYLGNBQVUsTUFKQztBQUtYLGVBQVc7QUFDUCx3Q0FBMkI5QyxPQUEzQixDQURPO0FBRVAsc0JBQWdCO0FBRlQsS0FMQTtBQVNYLG1CQUFlLEtBVEo7QUFVWCxZQUFRYTtBQVZHLEdBQWY7QUFhQWtDLEdBQUMsQ0FBQ0MsSUFBRixDQUFPRixRQUFQLEVBQWlCRyxJQUFqQixDQUFzQixVQUFVQyxRQUFWLEVBQW9CO0FBQ3RDO0FBQ0FoRCxRQUFJLENBQUNpRCxNQUFMO0FBQ0gsR0FIRDtBQUtILEM7Ozs7Ozs7Ozs7O0FDeEhELHVDIiwiZmlsZSI6ImpzL2luZGV4LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdGZ1bmN0aW9uIGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKSB7XG4gXHRcdGRlbGV0ZSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHR9XG4gXHR2YXIgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2sgPSB3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdO1xuIFx0d2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXSA9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gd2VicGFja0hvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdFx0aWYgKHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKSBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHR9IDtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gXHRcdHNjcmlwdC5jaGFyc2V0ID0gXCJ1dGYtOFwiO1xuIFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjRlNTNhZDk4YmNlM2Y2NDRmNmZjXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImluZGV4XCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKFwiLi9zcmMvaW5kZXguanNcIikoX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3RvRGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3RvRGF0ZVwiKSk7XG5cbnZhciBfdG9GbG9hdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3RvRmxvYXRcIikpO1xuXG52YXIgX3RvSW50ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvdG9JbnRcIikpO1xuXG52YXIgX3RvQm9vbGVhbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3RvQm9vbGVhblwiKSk7XG5cbnZhciBfZXF1YWxzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvZXF1YWxzXCIpKTtcblxudmFyIF9jb250YWlucyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2NvbnRhaW5zXCIpKTtcblxudmFyIF9tYXRjaGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvbWF0Y2hlc1wiKSk7XG5cbnZhciBfaXNFbWFpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzRW1haWxcIikpO1xuXG52YXIgX2lzVVJMID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNVUkxcIikpO1xuXG52YXIgX2lzTUFDQWRkcmVzcyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTUFDQWRkcmVzc1wiKSk7XG5cbnZhciBfaXNJUCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSVBcIikpO1xuXG52YXIgX2lzSVBSYW5nZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSVBSYW5nZVwiKSk7XG5cbnZhciBfaXNGUUROID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNGUUROXCIpKTtcblxudmFyIF9pc0Jvb2xlYW4gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0Jvb2xlYW5cIikpO1xuXG52YXIgX2lzQWxwaGEgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9saWIvaXNBbHBoYVwiKSk7XG5cbnZhciBfaXNBbHBoYW51bWVyaWMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9saWIvaXNBbHBoYW51bWVyaWNcIikpO1xuXG52YXIgX2lzTnVtZXJpYyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTnVtZXJpY1wiKSk7XG5cbnZhciBfaXNQb3J0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNQb3J0XCIpKTtcblxudmFyIF9pc0xvd2VyY2FzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTG93ZXJjYXNlXCIpKTtcblxudmFyIF9pc1VwcGVyY2FzZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzVXBwZXJjYXNlXCIpKTtcblxudmFyIF9pc0FzY2lpID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNBc2NpaVwiKSk7XG5cbnZhciBfaXNGdWxsV2lkdGggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0Z1bGxXaWR0aFwiKSk7XG5cbnZhciBfaXNIYWxmV2lkdGggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0hhbGZXaWR0aFwiKSk7XG5cbnZhciBfaXNWYXJpYWJsZVdpZHRoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNWYXJpYWJsZVdpZHRoXCIpKTtcblxudmFyIF9pc011bHRpYnl0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTXVsdGlieXRlXCIpKTtcblxudmFyIF9pc1N1cnJvZ2F0ZVBhaXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc1N1cnJvZ2F0ZVBhaXJcIikpO1xuXG52YXIgX2lzSW50ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNJbnRcIikpO1xuXG52YXIgX2lzRmxvYXQgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChyZXF1aXJlKFwiLi9saWIvaXNGbG9hdFwiKSk7XG5cbnZhciBfaXNEZWNpbWFsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNEZWNpbWFsXCIpKTtcblxudmFyIF9pc0hleGFkZWNpbWFsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNIZXhhZGVjaW1hbFwiKSk7XG5cbnZhciBfaXNEaXZpc2libGVCeSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzRGl2aXNpYmxlQnlcIikpO1xuXG52YXIgX2lzSGV4Q29sb3IgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0hleENvbG9yXCIpKTtcblxudmFyIF9pc0lTUkMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0lTUkNcIikpO1xuXG52YXIgX2lzTUQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc01ENVwiKSk7XG5cbnZhciBfaXNIYXNoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNIYXNoXCIpKTtcblxudmFyIF9pc0pXVCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSldUXCIpKTtcblxudmFyIF9pc0pTT04gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0pTT05cIikpO1xuXG52YXIgX2lzRW1wdHkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0VtcHR5XCIpKTtcblxudmFyIF9pc0xlbmd0aCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTGVuZ3RoXCIpKTtcblxudmFyIF9pc0J5dGVMZW5ndGggPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0J5dGVMZW5ndGhcIikpO1xuXG52YXIgX2lzVVVJRCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzVVVJRFwiKSk7XG5cbnZhciBfaXNNb25nb0lkID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNNb25nb0lkXCIpKTtcblxudmFyIF9pc0FmdGVyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNBZnRlclwiKSk7XG5cbnZhciBfaXNCZWZvcmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0JlZm9yZVwiKSk7XG5cbnZhciBfaXNJbiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSW5cIikpO1xuXG52YXIgX2lzQ3JlZGl0Q2FyZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzQ3JlZGl0Q2FyZFwiKSk7XG5cbnZhciBfaXNJZGVudGl0eUNhcmQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0lkZW50aXR5Q2FyZFwiKSk7XG5cbnZhciBfaXNJU0lOID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNJU0lOXCIpKTtcblxudmFyIF9pc0lTQk4gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0lTQk5cIikpO1xuXG52YXIgX2lzSVNTTiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzSVNTTlwiKSk7XG5cbnZhciBfaXNNb2JpbGVQaG9uZSA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKHJlcXVpcmUoXCIuL2xpYi9pc01vYmlsZVBob25lXCIpKTtcblxudmFyIF9pc0N1cnJlbmN5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNDdXJyZW5jeVwiKSk7XG5cbnZhciBfaXNJU08gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0lTTzg2MDFcIikpO1xuXG52YXIgX2lzUkZDID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNSRkMzMzM5XCIpKTtcblxudmFyIF9pc0lTTzMxNjYxQWxwaGEgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc0lTTzMxNjYxQWxwaGEyXCIpKTtcblxudmFyIF9pc0lTTzMxNjYxQWxwaGEyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNJU08zMTY2MUFscGhhM1wiKSk7XG5cbnZhciBfaXNCYXNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvaXNCYXNlNjRcIikpO1xuXG52YXIgX2lzRGF0YVVSSSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzRGF0YVVSSVwiKSk7XG5cbnZhciBfaXNNYWduZXRVUkkgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc01hZ25ldFVSSVwiKSk7XG5cbnZhciBfaXNNaW1lVHlwZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTWltZVR5cGVcIikpO1xuXG52YXIgX2lzTGF0TG9uZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2lzTGF0TG9uZ1wiKSk7XG5cbnZhciBfaXNQb3N0YWxDb2RlID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQocmVxdWlyZShcIi4vbGliL2lzUG9zdGFsQ29kZVwiKSk7XG5cbnZhciBfbHRyaW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9sdHJpbVwiKSk7XG5cbnZhciBfcnRyaW0gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9ydHJpbVwiKSk7XG5cbnZhciBfdHJpbSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3RyaW1cIikpO1xuXG52YXIgX2VzY2FwZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL2VzY2FwZVwiKSk7XG5cbnZhciBfdW5lc2NhcGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi91bmVzY2FwZVwiKSk7XG5cbnZhciBfc3RyaXBMb3cgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9zdHJpcExvd1wiKSk7XG5cbnZhciBfd2hpdGVsaXN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9saWIvd2hpdGVsaXN0XCIpKTtcblxudmFyIF9ibGFja2xpc3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9ibGFja2xpc3RcIikpO1xuXG52YXIgX2lzV2hpdGVsaXN0ZWQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2xpYi9pc1doaXRlbGlzdGVkXCIpKTtcblxudmFyIF9ub3JtYWxpemVFbWFpbCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL25vcm1hbGl6ZUVtYWlsXCIpKTtcblxudmFyIF90b1N0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbGliL3V0aWwvdG9TdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHsgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkgeyByZXR1cm4gb2JqOyB9IGVsc2UgeyB2YXIgbmV3T2JqID0ge307IGlmIChvYmogIT0gbnVsbCkgeyBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7IHZhciBkZXNjID0gT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSA6IHt9OyBpZiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld09iaiwga2V5LCBkZXNjKTsgfSBlbHNlIHsgbmV3T2JqW2tleV0gPSBvYmpba2V5XTsgfSB9IH0gfSBuZXdPYmouZGVmYXVsdCA9IG9iajsgcmV0dXJuIG5ld09iajsgfSB9XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB2ZXJzaW9uID0gJzEwLjExLjAnO1xudmFyIHZhbGlkYXRvciA9IHtcbiAgdmVyc2lvbjogdmVyc2lvbixcbiAgdG9EYXRlOiBfdG9EYXRlLmRlZmF1bHQsXG4gIHRvRmxvYXQ6IF90b0Zsb2F0LmRlZmF1bHQsXG4gIHRvSW50OiBfdG9JbnQuZGVmYXVsdCxcbiAgdG9Cb29sZWFuOiBfdG9Cb29sZWFuLmRlZmF1bHQsXG4gIGVxdWFsczogX2VxdWFscy5kZWZhdWx0LFxuICBjb250YWluczogX2NvbnRhaW5zLmRlZmF1bHQsXG4gIG1hdGNoZXM6IF9tYXRjaGVzLmRlZmF1bHQsXG4gIGlzRW1haWw6IF9pc0VtYWlsLmRlZmF1bHQsXG4gIGlzVVJMOiBfaXNVUkwuZGVmYXVsdCxcbiAgaXNNQUNBZGRyZXNzOiBfaXNNQUNBZGRyZXNzLmRlZmF1bHQsXG4gIGlzSVA6IF9pc0lQLmRlZmF1bHQsXG4gIGlzSVBSYW5nZTogX2lzSVBSYW5nZS5kZWZhdWx0LFxuICBpc0ZRRE46IF9pc0ZRRE4uZGVmYXVsdCxcbiAgaXNCb29sZWFuOiBfaXNCb29sZWFuLmRlZmF1bHQsXG4gIGlzQWxwaGE6IF9pc0FscGhhLmRlZmF1bHQsXG4gIGlzQWxwaGFMb2NhbGVzOiBfaXNBbHBoYS5sb2NhbGVzLFxuICBpc0FscGhhbnVtZXJpYzogX2lzQWxwaGFudW1lcmljLmRlZmF1bHQsXG4gIGlzQWxwaGFudW1lcmljTG9jYWxlczogX2lzQWxwaGFudW1lcmljLmxvY2FsZXMsXG4gIGlzTnVtZXJpYzogX2lzTnVtZXJpYy5kZWZhdWx0LFxuICBpc1BvcnQ6IF9pc1BvcnQuZGVmYXVsdCxcbiAgaXNMb3dlcmNhc2U6IF9pc0xvd2VyY2FzZS5kZWZhdWx0LFxuICBpc1VwcGVyY2FzZTogX2lzVXBwZXJjYXNlLmRlZmF1bHQsXG4gIGlzQXNjaWk6IF9pc0FzY2lpLmRlZmF1bHQsXG4gIGlzRnVsbFdpZHRoOiBfaXNGdWxsV2lkdGguZGVmYXVsdCxcbiAgaXNIYWxmV2lkdGg6IF9pc0hhbGZXaWR0aC5kZWZhdWx0LFxuICBpc1ZhcmlhYmxlV2lkdGg6IF9pc1ZhcmlhYmxlV2lkdGguZGVmYXVsdCxcbiAgaXNNdWx0aWJ5dGU6IF9pc011bHRpYnl0ZS5kZWZhdWx0LFxuICBpc1N1cnJvZ2F0ZVBhaXI6IF9pc1N1cnJvZ2F0ZVBhaXIuZGVmYXVsdCxcbiAgaXNJbnQ6IF9pc0ludC5kZWZhdWx0LFxuICBpc0Zsb2F0OiBfaXNGbG9hdC5kZWZhdWx0LFxuICBpc0Zsb2F0TG9jYWxlczogX2lzRmxvYXQubG9jYWxlcyxcbiAgaXNEZWNpbWFsOiBfaXNEZWNpbWFsLmRlZmF1bHQsXG4gIGlzSGV4YWRlY2ltYWw6IF9pc0hleGFkZWNpbWFsLmRlZmF1bHQsXG4gIGlzRGl2aXNpYmxlQnk6IF9pc0RpdmlzaWJsZUJ5LmRlZmF1bHQsXG4gIGlzSGV4Q29sb3I6IF9pc0hleENvbG9yLmRlZmF1bHQsXG4gIGlzSVNSQzogX2lzSVNSQy5kZWZhdWx0LFxuICBpc01ENTogX2lzTUQuZGVmYXVsdCxcbiAgaXNIYXNoOiBfaXNIYXNoLmRlZmF1bHQsXG4gIGlzSldUOiBfaXNKV1QuZGVmYXVsdCxcbiAgaXNKU09OOiBfaXNKU09OLmRlZmF1bHQsXG4gIGlzRW1wdHk6IF9pc0VtcHR5LmRlZmF1bHQsXG4gIGlzTGVuZ3RoOiBfaXNMZW5ndGguZGVmYXVsdCxcbiAgaXNCeXRlTGVuZ3RoOiBfaXNCeXRlTGVuZ3RoLmRlZmF1bHQsXG4gIGlzVVVJRDogX2lzVVVJRC5kZWZhdWx0LFxuICBpc01vbmdvSWQ6IF9pc01vbmdvSWQuZGVmYXVsdCxcbiAgaXNBZnRlcjogX2lzQWZ0ZXIuZGVmYXVsdCxcbiAgaXNCZWZvcmU6IF9pc0JlZm9yZS5kZWZhdWx0LFxuICBpc0luOiBfaXNJbi5kZWZhdWx0LFxuICBpc0NyZWRpdENhcmQ6IF9pc0NyZWRpdENhcmQuZGVmYXVsdCxcbiAgaXNJZGVudGl0eUNhcmQ6IF9pc0lkZW50aXR5Q2FyZC5kZWZhdWx0LFxuICBpc0lTSU46IF9pc0lTSU4uZGVmYXVsdCxcbiAgaXNJU0JOOiBfaXNJU0JOLmRlZmF1bHQsXG4gIGlzSVNTTjogX2lzSVNTTi5kZWZhdWx0LFxuICBpc01vYmlsZVBob25lOiBfaXNNb2JpbGVQaG9uZS5kZWZhdWx0LFxuICBpc01vYmlsZVBob25lTG9jYWxlczogX2lzTW9iaWxlUGhvbmUubG9jYWxlcyxcbiAgaXNQb3N0YWxDb2RlOiBfaXNQb3N0YWxDb2RlLmRlZmF1bHQsXG4gIGlzUG9zdGFsQ29kZUxvY2FsZXM6IF9pc1Bvc3RhbENvZGUubG9jYWxlcyxcbiAgaXNDdXJyZW5jeTogX2lzQ3VycmVuY3kuZGVmYXVsdCxcbiAgaXNJU084NjAxOiBfaXNJU08uZGVmYXVsdCxcbiAgaXNSRkMzMzM5OiBfaXNSRkMuZGVmYXVsdCxcbiAgaXNJU08zMTY2MUFscGhhMjogX2lzSVNPMzE2NjFBbHBoYS5kZWZhdWx0LFxuICBpc0lTTzMxNjYxQWxwaGEzOiBfaXNJU08zMTY2MUFscGhhMi5kZWZhdWx0LFxuICBpc0Jhc2U2NDogX2lzQmFzZS5kZWZhdWx0LFxuICBpc0RhdGFVUkk6IF9pc0RhdGFVUkkuZGVmYXVsdCxcbiAgaXNNYWduZXRVUkk6IF9pc01hZ25ldFVSSS5kZWZhdWx0LFxuICBpc01pbWVUeXBlOiBfaXNNaW1lVHlwZS5kZWZhdWx0LFxuICBpc0xhdExvbmc6IF9pc0xhdExvbmcuZGVmYXVsdCxcbiAgbHRyaW06IF9sdHJpbS5kZWZhdWx0LFxuICBydHJpbTogX3J0cmltLmRlZmF1bHQsXG4gIHRyaW06IF90cmltLmRlZmF1bHQsXG4gIGVzY2FwZTogX2VzY2FwZS5kZWZhdWx0LFxuICB1bmVzY2FwZTogX3VuZXNjYXBlLmRlZmF1bHQsXG4gIHN0cmlwTG93OiBfc3RyaXBMb3cuZGVmYXVsdCxcbiAgd2hpdGVsaXN0OiBfd2hpdGVsaXN0LmRlZmF1bHQsXG4gIGJsYWNrbGlzdDogX2JsYWNrbGlzdC5kZWZhdWx0LFxuICBpc1doaXRlbGlzdGVkOiBfaXNXaGl0ZWxpc3RlZC5kZWZhdWx0LFxuICBub3JtYWxpemVFbWFpbDogX25vcm1hbGl6ZUVtYWlsLmRlZmF1bHQsXG4gIHRvU3RyaW5nOiBfdG9TdHJpbmcuZGVmYXVsdFxufTtcbnZhciBfZGVmYXVsdCA9IHZhbGlkYXRvcjtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5jb21tYURlY2ltYWwgPSBleHBvcnRzLmRvdERlY2ltYWwgPSBleHBvcnRzLmFyYWJpY0xvY2FsZXMgPSBleHBvcnRzLmVuZ2xpc2hMb2NhbGVzID0gZXhwb3J0cy5kZWNpbWFsID0gZXhwb3J0cy5hbHBoYW51bWVyaWMgPSBleHBvcnRzLmFscGhhID0gdm9pZCAwO1xudmFyIGFscGhhID0ge1xuICAnZW4tVVMnOiAvXltBLVpdKyQvaSxcbiAgJ2JnLUJHJzogL15b0JAt0K9dKyQvaSxcbiAgJ2NzLUNaJzogL15bQS1aw4HEjMSOw4nEmsONxYfDk8WYxaDFpMOaxa7DncW9XSskL2ksXG4gICdkYS1ESyc6IC9eW0EtWsOGw5jDhV0rJC9pLFxuICAnZGUtREUnOiAvXltBLVrDhMOWw5zDn10rJC9pLFxuICAnZWwtR1InOiAvXlvOkS3PiV0rJC9pLFxuICAnZXMtRVMnOiAvXltBLVrDgcOJw43DkcOTw5rDnF0rJC9pLFxuICAnZnItRlInOiAvXltBLVrDgMOCw4bDh8OJw4jDisOLw4/DjsOUxZLDmcObw5zFuF0rJC9pLFxuICAnaXQtSVQnOiAvXltBLVrDgMOJw4jDjMOOw5PDksOZXSskL2ksXG4gICduYi1OTyc6IC9eW0EtWsOGw5jDhV0rJC9pLFxuICAnbmwtTkwnOiAvXltBLVrDgcOJw4vDj8OTw5bDnMOaXSskL2ksXG4gICdubi1OTyc6IC9eW0EtWsOGw5jDhV0rJC9pLFxuICAnaHUtSFUnOiAvXltBLVrDgcOJw43Dk8OWxZDDmsOcxbBdKyQvaSxcbiAgJ3BsLVBMJzogL15bQS1axITEhsSYxZrFgcWDw5PFu8W5XSskL2ksXG4gICdwdC1QVCc6IC9eW0EtWsODw4HDgMOCw4fDicOKw43DlcOTw5TDmsOcXSskL2ksXG4gICdydS1SVSc6IC9eW9CQLdCv0IFdKyQvaSxcbiAgJ3NsLVNJJzogL15bQS1axIzEhsSQxaDFvV0rJC9pLFxuICAnc2stU0snOiAvXltBLVrDgcSMxI7DicONxYfDk8WgxaTDmsOdxb3EucWUxL3DhMOUXSskL2ksXG4gICdzci1SU0BsYXRpbic6IC9eW0EtWsSMxIbFvcWgxJBdKyQvaSxcbiAgJ3NyLVJTJzogL15b0JAt0K/QgtCI0InQitCL0I9dKyQvaSxcbiAgJ3N2LVNFJzogL15bQS1aw4XDhMOWXSskL2ksXG4gICd0ci1UUic6IC9eW0EtWsOHxJ7EsMSxw5bFnsOcXSskL2ksXG4gICd1ay1VQSc6IC9eW9CQLdCp0KzQrtCv0IRJ0IfSkNGWXSskL2ksXG4gICdrdS1JUSc6IC9eW9im2KfYqNm+2KrYrNqG2K3Yrtiv2LHaldiy2pjYs9i02LnYutmB2qTZgtqp2q/ZhNq12YXZhtmI24bavtuV24zbjtmK2LfYpNir2KLYpdij2YPYtti12KnYuNiwXSskL2ksXG4gIGFyOiAvXlvYodii2KPYpNil2KbYp9io2KnYqtir2KzYrdiu2K/YsNix2LLYs9i02LXYtti32LjYudi62YHZgtmD2YTZhdmG2YfZiNmJ2YrZi9mM2Y3ZjtmP2ZDZkdmS2bBdKyQvXG59O1xuZXhwb3J0cy5hbHBoYSA9IGFscGhhO1xudmFyIGFscGhhbnVtZXJpYyA9IHtcbiAgJ2VuLVVTJzogL15bMC05QS1aXSskL2ksXG4gICdiZy1CRyc6IC9eWzAtOdCQLdCvXSskL2ksXG4gICdjcy1DWic6IC9eWzAtOUEtWsOBxIzEjsOJxJrDjcWHw5PFmMWgxaTDmsWuw53FvV0rJC9pLFxuICAnZGEtREsnOiAvXlswLTlBLVrDhsOYw4VdKyQvaSxcbiAgJ2RlLURFJzogL15bMC05QS1aw4TDlsOcw59dKyQvaSxcbiAgJ2VsLUdSJzogL15bMC05zpEtz4ldKyQvaSxcbiAgJ2VzLUVTJzogL15bMC05QS1aw4HDicONw5HDk8Oaw5xdKyQvaSxcbiAgJ2ZyLUZSJzogL15bMC05QS1aw4DDgsOGw4fDicOIw4rDi8OPw47DlMWSw5nDm8OcxbhdKyQvaSxcbiAgJ2l0LUlUJzogL15bMC05QS1aw4DDicOIw4zDjsOTw5LDmV0rJC9pLFxuICAnaHUtSFUnOiAvXlswLTlBLVrDgcOJw43Dk8OWxZDDmsOcxbBdKyQvaSxcbiAgJ25iLU5PJzogL15bMC05QS1aw4bDmMOFXSskL2ksXG4gICdubC1OTCc6IC9eWzAtOUEtWsOBw4nDi8OPw5PDlsOcw5pdKyQvaSxcbiAgJ25uLU5PJzogL15bMC05QS1aw4bDmMOFXSskL2ksXG4gICdwbC1QTCc6IC9eWzAtOUEtWsSExIbEmMWaxYHFg8OTxbvFuV0rJC9pLFxuICAncHQtUFQnOiAvXlswLTlBLVrDg8OBw4DDgsOHw4nDisONw5XDk8OUw5rDnF0rJC9pLFxuICAncnUtUlUnOiAvXlswLTnQkC3Qr9CBXSskL2ksXG4gICdzbC1TSSc6IC9eWzAtOUEtWsSMxIbEkMWgxb1dKyQvaSxcbiAgJ3NrLVNLJzogL15bMC05QS1aw4HEjMSOw4nDjcWHw5PFoMWkw5rDncW9xLnFlMS9w4TDlF0rJC9pLFxuICAnc3ItUlNAbGF0aW4nOiAvXlswLTlBLVrEjMSGxb3FoMSQXSskL2ksXG4gICdzci1SUyc6IC9eWzAtOdCQLdCv0ILQiNCJ0IrQi9CPXSskL2ksXG4gICdzdi1TRSc6IC9eWzAtOUEtWsOFw4TDll0rJC9pLFxuICAndHItVFInOiAvXlswLTlBLVrDh8SexLDEscOWxZ7DnF0rJC9pLFxuICAndWstVUEnOiAvXlswLTnQkC3QqdCs0K7Qr9CESdCH0pDRll0rJC9pLFxuICAna3UtSVEnOiAvXlvZoNmh2aLZo9mk2aXZptmn2ajZqTAtOdim2KfYqNm+2KrYrNqG2K3Yrtiv2LHaldiy2pjYs9i02LnYutmB2qTZgtqp2q/ZhNq12YXZhtmI24bavtuV24zbjtmK2LfYpNir2KLYpdij2YPYtti12KnYuNiwXSskL2ksXG4gIGFyOiAvXlvZoNmh2aLZo9mk2aXZptmn2ajZqTAtOdih2KLYo9ik2KXYptin2KjYqdiq2KvYrNit2K7Yr9iw2LHYstiz2LTYtdi22LfYuNi52LrZgdmC2YPZhNmF2YbZh9mI2YnZitmL2YzZjdmO2Y/ZkNmR2ZLZsF0rJC9cbn07XG5leHBvcnRzLmFscGhhbnVtZXJpYyA9IGFscGhhbnVtZXJpYztcbnZhciBkZWNpbWFsID0ge1xuICAnZW4tVVMnOiAnLicsXG4gIGFyOiAn2asnXG59O1xuZXhwb3J0cy5kZWNpbWFsID0gZGVjaW1hbDtcbnZhciBlbmdsaXNoTG9jYWxlcyA9IFsnQVUnLCAnR0InLCAnSEsnLCAnSU4nLCAnTlonLCAnWkEnLCAnWk0nXTtcbmV4cG9ydHMuZW5nbGlzaExvY2FsZXMgPSBlbmdsaXNoTG9jYWxlcztcblxuZm9yICh2YXIgbG9jYWxlLCBpID0gMDsgaSA8IGVuZ2xpc2hMb2NhbGVzLmxlbmd0aDsgaSsrKSB7XG4gIGxvY2FsZSA9IFwiZW4tXCIuY29uY2F0KGVuZ2xpc2hMb2NhbGVzW2ldKTtcbiAgYWxwaGFbbG9jYWxlXSA9IGFscGhhWydlbi1VUyddO1xuICBhbHBoYW51bWVyaWNbbG9jYWxlXSA9IGFscGhhbnVtZXJpY1snZW4tVVMnXTtcbiAgZGVjaW1hbFtsb2NhbGVdID0gZGVjaW1hbFsnZW4tVVMnXTtcbn0gLy8gU291cmNlOiBodHRwOi8vd3d3LmxvY2FsZXBsYW5ldC5jb20vamF2YS9cblxuXG52YXIgYXJhYmljTG9jYWxlcyA9IFsnQUUnLCAnQkgnLCAnRFonLCAnRUcnLCAnSVEnLCAnSk8nLCAnS1cnLCAnTEInLCAnTFknLCAnTUEnLCAnUU0nLCAnUUEnLCAnU0EnLCAnU0QnLCAnU1knLCAnVE4nLCAnWUUnXTtcbmV4cG9ydHMuYXJhYmljTG9jYWxlcyA9IGFyYWJpY0xvY2FsZXM7XG5cbmZvciAodmFyIF9sb2NhbGUsIF9pID0gMDsgX2kgPCBhcmFiaWNMb2NhbGVzLmxlbmd0aDsgX2krKykge1xuICBfbG9jYWxlID0gXCJhci1cIi5jb25jYXQoYXJhYmljTG9jYWxlc1tfaV0pO1xuICBhbHBoYVtfbG9jYWxlXSA9IGFscGhhLmFyO1xuICBhbHBoYW51bWVyaWNbX2xvY2FsZV0gPSBhbHBoYW51bWVyaWMuYXI7XG4gIGRlY2ltYWxbX2xvY2FsZV0gPSBkZWNpbWFsLmFyO1xufSAvLyBTb3VyY2U6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RlY2ltYWxfbWFya1xuXG5cbnZhciBkb3REZWNpbWFsID0gW107XG5leHBvcnRzLmRvdERlY2ltYWwgPSBkb3REZWNpbWFsO1xudmFyIGNvbW1hRGVjaW1hbCA9IFsnYmctQkcnLCAnY3MtQ1onLCAnZGEtREsnLCAnZGUtREUnLCAnZWwtR1InLCAnZXMtRVMnLCAnZnItRlInLCAnaXQtSVQnLCAna3UtSVEnLCAnaHUtSFUnLCAnbmItTk8nLCAnbm4tTk8nLCAnbmwtTkwnLCAncGwtUEwnLCAncHQtUFQnLCAncnUtUlUnLCAnc2wtU0knLCAnc3ItUlNAbGF0aW4nLCAnc3ItUlMnLCAnc3YtU0UnLCAndHItVFInLCAndWstVUEnXTtcbmV4cG9ydHMuY29tbWFEZWNpbWFsID0gY29tbWFEZWNpbWFsO1xuXG5mb3IgKHZhciBfaTIgPSAwOyBfaTIgPCBkb3REZWNpbWFsLmxlbmd0aDsgX2kyKyspIHtcbiAgZGVjaW1hbFtkb3REZWNpbWFsW19pMl1dID0gZGVjaW1hbFsnZW4tVVMnXTtcbn1cblxuZm9yICh2YXIgX2kzID0gMDsgX2kzIDwgY29tbWFEZWNpbWFsLmxlbmd0aDsgX2kzKyspIHtcbiAgZGVjaW1hbFtjb21tYURlY2ltYWxbX2kzXV0gPSAnLCc7XG59XG5cbmFscGhhWydwdC1CUiddID0gYWxwaGFbJ3B0LVBUJ107XG5hbHBoYW51bWVyaWNbJ3B0LUJSJ10gPSBhbHBoYW51bWVyaWNbJ3B0LVBUJ107XG5kZWNpbWFsWydwdC1CUiddID0gZGVjaW1hbFsncHQtUFQnXTsgLy8gc2VlICM4NjJcblxuYWxwaGFbJ3BsLVBsJ10gPSBhbHBoYVsncGwtUEwnXTtcbmFscGhhbnVtZXJpY1sncGwtUGwnXSA9IGFscGhhbnVtZXJpY1sncGwtUEwnXTtcbmRlY2ltYWxbJ3BsLVBsJ10gPSBkZWNpbWFsWydwbC1QTCddOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYmxhY2tsaXN0O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBibGFja2xpc3Qoc3RyLCBjaGFycykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIltcIi5jb25jYXQoY2hhcnMsIFwiXStcIiksICdnJyksICcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gY29udGFpbnM7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfdG9TdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvdG9TdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBjb250YWlucyhzdHIsIGVsZW0pIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHN0ci5pbmRleE9mKCgwLCBfdG9TdHJpbmcuZGVmYXVsdCkoZWxlbSkpID49IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGVxdWFscztcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gZXF1YWxzKHN0ciwgY29tcGFyaXNvbikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gc3RyID09PSBjb21wYXJpc29uO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBlc2NhcGU7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGVzY2FwZShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKS5yZXBsYWNlKC8nL2csICcmI3gyNzsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpLnJlcGxhY2UoL1xcLy9nLCAnJiN4MkY7JykucmVwbGFjZSgvXFxcXC9nLCAnJiN4NUM7JykucmVwbGFjZSgvYC9nLCAnJiM5NjsnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNBZnRlcjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF90b0RhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3RvRGF0ZVwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGlzQWZ0ZXIoc3RyKSB7XG4gIHZhciBkYXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBTdHJpbmcobmV3IERhdGUoKSk7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBjb21wYXJpc29uID0gKDAsIF90b0RhdGUuZGVmYXVsdCkoZGF0ZSk7XG4gIHZhciBvcmlnaW5hbCA9ICgwLCBfdG9EYXRlLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiAhIShvcmlnaW5hbCAmJiBjb21wYXJpc29uICYmIG9yaWdpbmFsID4gY29tcGFyaXNvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQWxwaGE7XG5leHBvcnRzLmxvY2FsZXMgPSB2b2lkIDA7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfYWxwaGEgPSByZXF1aXJlKFwiLi9hbHBoYVwiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNBbHBoYShzdHIpIHtcbiAgdmFyIGxvY2FsZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ2VuLVVTJztcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcblxuICBpZiAobG9jYWxlIGluIF9hbHBoYS5hbHBoYSkge1xuICAgIHJldHVybiBfYWxwaGEuYWxwaGFbbG9jYWxlXS50ZXN0KHN0cik7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvY2FsZSAnXCIuY29uY2F0KGxvY2FsZSwgXCInXCIpKTtcbn1cblxudmFyIGxvY2FsZXMgPSBPYmplY3Qua2V5cyhfYWxwaGEuYWxwaGEpO1xuZXhwb3J0cy5sb2NhbGVzID0gbG9jYWxlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQWxwaGFudW1lcmljO1xuZXhwb3J0cy5sb2NhbGVzID0gdm9pZCAwO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX2FscGhhID0gcmVxdWlyZShcIi4vYWxwaGFcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGlzQWxwaGFudW1lcmljKHN0cikge1xuICB2YXIgbG9jYWxlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnZW4tVVMnO1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmIChsb2NhbGUgaW4gX2FscGhhLmFscGhhbnVtZXJpYykge1xuICAgIHJldHVybiBfYWxwaGEuYWxwaGFudW1lcmljW2xvY2FsZV0udGVzdChzdHIpO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2NhbGUgJ1wiLmNvbmNhdChsb2NhbGUsIFwiJ1wiKSk7XG59XG5cbnZhciBsb2NhbGVzID0gT2JqZWN0LmtleXMoX2FscGhhLmFscGhhbnVtZXJpYyk7XG5leHBvcnRzLmxvY2FsZXMgPSBsb2NhbGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNBc2NpaTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29udHJvbC1yZWdleCAqL1xudmFyIGFzY2lpID0gL15bXFx4MDAtXFx4N0ZdKyQvO1xuLyogZXNsaW50LWVuYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG5cbmZ1bmN0aW9uIGlzQXNjaWkoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBhc2NpaS50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQmFzZTY0O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbm90QmFzZTY0ID0gL1teQS1aMC05K1xcLz1dL2k7XG5cbmZ1bmN0aW9uIGlzQmFzZTY0KHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgbGVuID0gc3RyLmxlbmd0aDtcblxuICBpZiAoIWxlbiB8fCBsZW4gJSA0ICE9PSAwIHx8IG5vdEJhc2U2NC50ZXN0KHN0cikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZmlyc3RQYWRkaW5nQ2hhciA9IHN0ci5pbmRleE9mKCc9Jyk7XG4gIHJldHVybiBmaXJzdFBhZGRpbmdDaGFyID09PSAtMSB8fCBmaXJzdFBhZGRpbmdDaGFyID09PSBsZW4gLSAxIHx8IGZpcnN0UGFkZGluZ0NoYXIgPT09IGxlbiAtIDIgJiYgc3RyW2xlbiAtIDFdID09PSAnPSc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQmVmb3JlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX3RvRGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdG9EYXRlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNCZWZvcmUoc3RyKSB7XG4gIHZhciBkYXRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBTdHJpbmcobmV3IERhdGUoKSk7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBjb21wYXJpc29uID0gKDAsIF90b0RhdGUuZGVmYXVsdCkoZGF0ZSk7XG4gIHZhciBvcmlnaW5hbCA9ICgwLCBfdG9EYXRlLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiAhIShvcmlnaW5hbCAmJiBjb21wYXJpc29uICYmIG9yaWdpbmFsIDwgY29tcGFyaXNvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzQm9vbGVhbjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNCb29sZWFuKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gWyd0cnVlJywgJ2ZhbHNlJywgJzEnLCAnMCddLmluZGV4T2Yoc3RyKSA+PSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0J5dGVMZW5ndGg7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIHByZWZlci1yZXN0LXBhcmFtcyAqL1xuZnVuY3Rpb24gaXNCeXRlTGVuZ3RoKHN0ciwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgbWluO1xuICB2YXIgbWF4O1xuXG4gIGlmIChfdHlwZW9mKG9wdGlvbnMpID09PSAnb2JqZWN0Jykge1xuICAgIG1pbiA9IG9wdGlvbnMubWluIHx8IDA7XG4gICAgbWF4ID0gb3B0aW9ucy5tYXg7XG4gIH0gZWxzZSB7XG4gICAgLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHk6IGlzQnl0ZUxlbmd0aChzdHIsIG1pbiBbLCBtYXhdKVxuICAgIG1pbiA9IGFyZ3VtZW50c1sxXTtcbiAgICBtYXggPSBhcmd1bWVudHNbMl07XG4gIH1cblxuICB2YXIgbGVuID0gZW5jb2RlVVJJKHN0cikuc3BsaXQoLyUuLnwuLykubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGxlbiA+PSBtaW4gJiYgKHR5cGVvZiBtYXggPT09ICd1bmRlZmluZWQnIHx8IGxlbiA8PSBtYXgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0NyZWRpdENhcmQ7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbnZhciBjcmVkaXRDYXJkID0gL14oPzo0WzAtOV17MTJ9KD86WzAtOV17M30pP3w1WzEtNV1bMC05XXsxNH18KDIyMlsxLTldfDIyWzMtOV1bMC05XXwyWzMtNl1bMC05XXsyfXwyN1swMV1bMC05XXwyNzIwKVswLTldezEyfXw2KD86MDExfDVbMC05XVswLTldKVswLTldezEyfXwzWzQ3XVswLTldezEzfXwzKD86MFswLTVdfFs2OF1bMC05XSlbMC05XXsxMX18KD86MjEzMXwxODAwfDM1XFxkezN9KVxcZHsxMX18NlsyN11bMC05XXsxNH0pJC87XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cblxuZnVuY3Rpb24gaXNDcmVkaXRDYXJkKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgc2FuaXRpemVkID0gc3RyLnJlcGxhY2UoL1stIF0rL2csICcnKTtcblxuICBpZiAoIWNyZWRpdENhcmQudGVzdChzYW5pdGl6ZWQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHN1bSA9IDA7XG4gIHZhciBkaWdpdDtcbiAgdmFyIHRtcE51bTtcbiAgdmFyIHNob3VsZERvdWJsZTtcblxuICBmb3IgKHZhciBpID0gc2FuaXRpemVkLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgZGlnaXQgPSBzYW5pdGl6ZWQuc3Vic3RyaW5nKGksIGkgKyAxKTtcbiAgICB0bXBOdW0gPSBwYXJzZUludChkaWdpdCwgMTApO1xuXG4gICAgaWYgKHNob3VsZERvdWJsZSkge1xuICAgICAgdG1wTnVtICo9IDI7XG5cbiAgICAgIGlmICh0bXBOdW0gPj0gMTApIHtcbiAgICAgICAgc3VtICs9IHRtcE51bSAlIDEwICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1bSArPSB0bXBOdW07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1bSArPSB0bXBOdW07XG4gICAgfVxuXG4gICAgc2hvdWxkRG91YmxlID0gIXNob3VsZERvdWJsZTtcbiAgfVxuXG4gIHJldHVybiAhIShzdW0gJSAxMCA9PT0gMCA/IHNhbml0aXplZCA6IGZhbHNlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNDdXJyZW5jeTtcblxudmFyIF9tZXJnZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9tZXJnZVwiKSk7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGN1cnJlbmN5UmVnZXgob3B0aW9ucykge1xuICB2YXIgZGVjaW1hbF9kaWdpdHMgPSBcIlxcXFxke1wiLmNvbmNhdChvcHRpb25zLmRpZ2l0c19hZnRlcl9kZWNpbWFsWzBdLCBcIn1cIik7XG4gIG9wdGlvbnMuZGlnaXRzX2FmdGVyX2RlY2ltYWwuZm9yRWFjaChmdW5jdGlvbiAoZGlnaXQsIGluZGV4KSB7XG4gICAgaWYgKGluZGV4ICE9PSAwKSBkZWNpbWFsX2RpZ2l0cyA9IFwiXCIuY29uY2F0KGRlY2ltYWxfZGlnaXRzLCBcInxcXFxcZHtcIikuY29uY2F0KGRpZ2l0LCBcIn1cIik7XG4gIH0pO1xuICB2YXIgc3ltYm9sID0gXCIoXFxcXFwiLmNvbmNhdChvcHRpb25zLnN5bWJvbC5yZXBsYWNlKC9cXC4vZywgJ1xcXFwuJyksIFwiKVwiKS5jb25jYXQob3B0aW9ucy5yZXF1aXJlX3N5bWJvbCA/ICcnIDogJz8nKSxcbiAgICAgIG5lZ2F0aXZlID0gJy0/JyxcbiAgICAgIHdob2xlX2RvbGxhcl9hbW91bnRfd2l0aG91dF9zZXAgPSAnWzEtOV1cXFxcZConLFxuICAgICAgd2hvbGVfZG9sbGFyX2Ftb3VudF93aXRoX3NlcCA9IFwiWzEtOV1cXFxcZHswLDJ9KFxcXFxcIi5jb25jYXQob3B0aW9ucy50aG91c2FuZHNfc2VwYXJhdG9yLCBcIlxcXFxkezN9KSpcIiksXG4gICAgICB2YWxpZF93aG9sZV9kb2xsYXJfYW1vdW50cyA9IFsnMCcsIHdob2xlX2RvbGxhcl9hbW91bnRfd2l0aG91dF9zZXAsIHdob2xlX2RvbGxhcl9hbW91bnRfd2l0aF9zZXBdLFxuICAgICAgd2hvbGVfZG9sbGFyX2Ftb3VudCA9IFwiKFwiLmNvbmNhdCh2YWxpZF93aG9sZV9kb2xsYXJfYW1vdW50cy5qb2luKCd8JyksIFwiKT9cIiksXG4gICAgICBkZWNpbWFsX2Ftb3VudCA9IFwiKFxcXFxcIi5jb25jYXQob3B0aW9ucy5kZWNpbWFsX3NlcGFyYXRvciwgXCIoXCIpLmNvbmNhdChkZWNpbWFsX2RpZ2l0cywgXCIpKVwiKS5jb25jYXQob3B0aW9ucy5yZXF1aXJlX2RlY2ltYWwgPyAnJyA6ICc/Jyk7XG4gIHZhciBwYXR0ZXJuID0gd2hvbGVfZG9sbGFyX2Ftb3VudCArIChvcHRpb25zLmFsbG93X2RlY2ltYWwgfHwgb3B0aW9ucy5yZXF1aXJlX2RlY2ltYWwgPyBkZWNpbWFsX2Ftb3VudCA6ICcnKTsgLy8gZGVmYXVsdCBpcyBuZWdhdGl2ZSBzaWduIGJlZm9yZSBzeW1ib2wsIGJ1dCB0aGVyZSBhcmUgdHdvIG90aGVyIG9wdGlvbnMgKGJlc2lkZXMgcGFyZW5zKVxuXG4gIGlmIChvcHRpb25zLmFsbG93X25lZ2F0aXZlcyAmJiAhb3B0aW9ucy5wYXJlbnNfZm9yX25lZ2F0aXZlcykge1xuICAgIGlmIChvcHRpb25zLm5lZ2F0aXZlX3NpZ25fYWZ0ZXJfZGlnaXRzKSB7XG4gICAgICBwYXR0ZXJuICs9IG5lZ2F0aXZlO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5uZWdhdGl2ZV9zaWduX2JlZm9yZV9kaWdpdHMpIHtcbiAgICAgIHBhdHRlcm4gPSBuZWdhdGl2ZSArIHBhdHRlcm47XG4gICAgfVxuICB9IC8vIFNvdXRoIEFmcmljYW4gUmFuZCwgZm9yIGV4YW1wbGUsIHVzZXMgUiAxMjMgKHNwYWNlKSBhbmQgUi0xMjMgKG5vIHNwYWNlKVxuXG5cbiAgaWYgKG9wdGlvbnMuYWxsb3dfbmVnYXRpdmVfc2lnbl9wbGFjZWhvbGRlcikge1xuICAgIHBhdHRlcm4gPSBcIiggKD8hXFxcXC0pKT9cIi5jb25jYXQocGF0dGVybik7XG4gIH0gZWxzZSBpZiAob3B0aW9ucy5hbGxvd19zcGFjZV9hZnRlcl9zeW1ib2wpIHtcbiAgICBwYXR0ZXJuID0gXCIgP1wiLmNvbmNhdChwYXR0ZXJuKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLmFsbG93X3NwYWNlX2FmdGVyX2RpZ2l0cykge1xuICAgIHBhdHRlcm4gKz0gJyggKD8hJCkpPyc7XG4gIH1cblxuICBpZiAob3B0aW9ucy5zeW1ib2xfYWZ0ZXJfZGlnaXRzKSB7XG4gICAgcGF0dGVybiArPSBzeW1ib2w7XG4gIH0gZWxzZSB7XG4gICAgcGF0dGVybiA9IHN5bWJvbCArIHBhdHRlcm47XG4gIH1cblxuICBpZiAob3B0aW9ucy5hbGxvd19uZWdhdGl2ZXMpIHtcbiAgICBpZiAob3B0aW9ucy5wYXJlbnNfZm9yX25lZ2F0aXZlcykge1xuICAgICAgcGF0dGVybiA9IFwiKFxcXFwoXCIuY29uY2F0KHBhdHRlcm4sIFwiXFxcXCl8XCIpLmNvbmNhdChwYXR0ZXJuLCBcIilcIik7XG4gICAgfSBlbHNlIGlmICghKG9wdGlvbnMubmVnYXRpdmVfc2lnbl9iZWZvcmVfZGlnaXRzIHx8IG9wdGlvbnMubmVnYXRpdmVfc2lnbl9hZnRlcl9kaWdpdHMpKSB7XG4gICAgICBwYXR0ZXJuID0gbmVnYXRpdmUgKyBwYXR0ZXJuO1xuICAgIH1cbiAgfSAvLyBlbnN1cmUgdGhlcmUncyBhIGRvbGxhciBhbmQvb3IgZGVjaW1hbCBhbW91bnQsIGFuZCB0aGF0XG4gIC8vIGl0IGRvZXNuJ3Qgc3RhcnQgd2l0aCBhIHNwYWNlIG9yIGEgbmVnYXRpdmUgc2lnbiBmb2xsb3dlZCBieSBhIHNwYWNlXG5cblxuICByZXR1cm4gbmV3IFJlZ0V4cChcIl4oPyEtPyApKD89LipcXFxcZClcIi5jb25jYXQocGF0dGVybiwgXCIkXCIpKTtcbn1cblxudmFyIGRlZmF1bHRfY3VycmVuY3lfb3B0aW9ucyA9IHtcbiAgc3ltYm9sOiAnJCcsXG4gIHJlcXVpcmVfc3ltYm9sOiBmYWxzZSxcbiAgYWxsb3dfc3BhY2VfYWZ0ZXJfc3ltYm9sOiBmYWxzZSxcbiAgc3ltYm9sX2FmdGVyX2RpZ2l0czogZmFsc2UsXG4gIGFsbG93X25lZ2F0aXZlczogdHJ1ZSxcbiAgcGFyZW5zX2Zvcl9uZWdhdGl2ZXM6IGZhbHNlLFxuICBuZWdhdGl2ZV9zaWduX2JlZm9yZV9kaWdpdHM6IGZhbHNlLFxuICBuZWdhdGl2ZV9zaWduX2FmdGVyX2RpZ2l0czogZmFsc2UsXG4gIGFsbG93X25lZ2F0aXZlX3NpZ25fcGxhY2Vob2xkZXI6IGZhbHNlLFxuICB0aG91c2FuZHNfc2VwYXJhdG9yOiAnLCcsXG4gIGRlY2ltYWxfc2VwYXJhdG9yOiAnLicsXG4gIGFsbG93X2RlY2ltYWw6IHRydWUsXG4gIHJlcXVpcmVfZGVjaW1hbDogZmFsc2UsXG4gIGRpZ2l0c19hZnRlcl9kZWNpbWFsOiBbMl0sXG4gIGFsbG93X3NwYWNlX2FmdGVyX2RpZ2l0czogZmFsc2Vcbn07XG5cbmZ1bmN0aW9uIGlzQ3VycmVuY3koc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIG9wdGlvbnMgPSAoMCwgX21lcmdlLmRlZmF1bHQpKG9wdGlvbnMsIGRlZmF1bHRfY3VycmVuY3lfb3B0aW9ucyk7XG4gIHJldHVybiBjdXJyZW5jeVJlZ2V4KG9wdGlvbnMpLnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNEYXRhVVJJO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgdmFsaWRNZWRpYVR5cGUgPSAvXlthLXpdK1xcL1thLXowLTlcXC1cXCtdKyQvaTtcbnZhciB2YWxpZEF0dHJpYnV0ZSA9IC9eW2EtelxcLV0rPVthLXowLTlcXC1dKyQvaTtcbnZhciB2YWxpZERhdGEgPSAvXlthLXowLTkhXFwkJidcXChcXClcXCpcXCssOz1cXC1cXC5ffjpAXFwvXFw/JVxcc10qJC9pO1xuXG5mdW5jdGlvbiBpc0RhdGFVUkkoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBkYXRhID0gc3RyLnNwbGl0KCcsJyk7XG5cbiAgaWYgKGRhdGEubGVuZ3RoIDwgMikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBhdHRyaWJ1dGVzID0gZGF0YS5zaGlmdCgpLnRyaW0oKS5zcGxpdCgnOycpO1xuICB2YXIgc2NoZW1lQW5kTWVkaWFUeXBlID0gYXR0cmlidXRlcy5zaGlmdCgpO1xuXG4gIGlmIChzY2hlbWVBbmRNZWRpYVR5cGUuc3Vic3RyKDAsIDUpICE9PSAnZGF0YTonKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIG1lZGlhVHlwZSA9IHNjaGVtZUFuZE1lZGlhVHlwZS5zdWJzdHIoNSk7XG5cbiAgaWYgKG1lZGlhVHlwZSAhPT0gJycgJiYgIXZhbGlkTWVkaWFUeXBlLnRlc3QobWVkaWFUeXBlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpID09PSBhdHRyaWJ1dGVzLmxlbmd0aCAtIDEgJiYgYXR0cmlidXRlc1tpXS50b0xvd2VyQ2FzZSgpID09PSAnYmFzZTY0Jykgey8vIG9rXG4gICAgfSBlbHNlIGlmICghdmFsaWRBdHRyaWJ1dGUudGVzdChhdHRyaWJ1dGVzW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBkYXRhLmxlbmd0aDsgX2krKykge1xuICAgIGlmICghdmFsaWREYXRhLnRlc3QoZGF0YVtfaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRGVjaW1hbDtcblxudmFyIF9tZXJnZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9tZXJnZVwiKSk7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfaW5jbHVkZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvaW5jbHVkZXNcIikpO1xuXG52YXIgX2FscGhhID0gcmVxdWlyZShcIi4vYWxwaGFcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGRlY2ltYWxSZWdFeHAob3B0aW9ucykge1xuICB2YXIgcmVnRXhwID0gbmV3IFJlZ0V4cChcIl5bLStdPyhbMC05XSspPyhcXFxcXCIuY29uY2F0KF9hbHBoYS5kZWNpbWFsW29wdGlvbnMubG9jYWxlXSwgXCJbMC05XXtcIikuY29uY2F0KG9wdGlvbnMuZGVjaW1hbF9kaWdpdHMsIFwifSlcIikuY29uY2F0KG9wdGlvbnMuZm9yY2VfZGVjaW1hbCA/ICcnIDogJz8nLCBcIiRcIikpO1xuICByZXR1cm4gcmVnRXhwO1xufVxuXG52YXIgZGVmYXVsdF9kZWNpbWFsX29wdGlvbnMgPSB7XG4gIGZvcmNlX2RlY2ltYWw6IGZhbHNlLFxuICBkZWNpbWFsX2RpZ2l0czogJzEsJyxcbiAgbG9jYWxlOiAnZW4tVVMnXG59O1xudmFyIGJsYWNrbGlzdCA9IFsnJywgJy0nLCAnKyddO1xuXG5mdW5jdGlvbiBpc0RlY2ltYWwoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIG9wdGlvbnMgPSAoMCwgX21lcmdlLmRlZmF1bHQpKG9wdGlvbnMsIGRlZmF1bHRfZGVjaW1hbF9vcHRpb25zKTtcblxuICBpZiAob3B0aW9ucy5sb2NhbGUgaW4gX2FscGhhLmRlY2ltYWwpIHtcbiAgICByZXR1cm4gISgwLCBfaW5jbHVkZXMuZGVmYXVsdCkoYmxhY2tsaXN0LCBzdHIucmVwbGFjZSgvIC9nLCAnJykpICYmIGRlY2ltYWxSZWdFeHAob3B0aW9ucykudGVzdChzdHIpO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2NhbGUgJ1wiLmNvbmNhdChvcHRpb25zLmxvY2FsZSwgXCInXCIpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNEaXZpc2libGVCeTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF90b0Zsb2F0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi90b0Zsb2F0XCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNEaXZpc2libGVCeShzdHIsIG51bSkge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gKDAsIF90b0Zsb2F0LmRlZmF1bHQpKHN0cikgJSBwYXJzZUludChudW0sIDEwKSA9PT0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNFbWFpbDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9tZXJnZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9tZXJnZVwiKSk7XG5cbnZhciBfaXNCeXRlTGVuZ3RoID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9pc0J5dGVMZW5ndGhcIikpO1xuXG52YXIgX2lzRlFETiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaXNGUUROXCIpKTtcblxudmFyIF9pc0lQID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9pc0lQXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGRlZmF1bHRfZW1haWxfb3B0aW9ucyA9IHtcbiAgYWxsb3dfZGlzcGxheV9uYW1lOiBmYWxzZSxcbiAgcmVxdWlyZV9kaXNwbGF5X25hbWU6IGZhbHNlLFxuICBhbGxvd191dGY4X2xvY2FsX3BhcnQ6IHRydWUsXG4gIHJlcXVpcmVfdGxkOiB0cnVlXG59O1xuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG5cbnZhciBkaXNwbGF5TmFtZSA9IC9eW2EtelxcZCEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XFwuXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXStbYS16XFxkISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5cXCxcXC5cXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZcXHNdKjwoLispPiQvaTtcbnZhciBlbWFpbFVzZXJQYXJ0ID0gL15bYS16XFxkISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5dKyQvaTtcbnZhciBnbWFpbFVzZXJQYXJ0ID0gL15bYS16XFxkXSskLztcbnZhciBxdW90ZWRFbWFpbFVzZXIgPSAvXihbXFxzXFx4MDEtXFx4MDhcXHgwYlxceDBjXFx4MGUtXFx4MWZcXHg3ZlxceDIxXFx4MjMtXFx4NWJcXHg1ZC1cXHg3ZV18KFxcXFxbXFx4MDEtXFx4MDlcXHgwYlxceDBjXFx4MGQtXFx4N2ZdKSkqJC9pO1xudmFyIGVtYWlsVXNlclV0ZjhQYXJ0ID0gL15bYS16XFxkISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5cXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKyQvaTtcbnZhciBxdW90ZWRFbWFpbFVzZXJVdGY4ID0gL14oW1xcc1xceDAxLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXFx4N2ZcXHgyMVxceDIzLVxceDViXFx4NWQtXFx4N2VcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdfChcXFxcW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBkLVxceDdmXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKiQvaTtcbi8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG4vKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cblxuZnVuY3Rpb24gaXNFbWFpbChzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgb3B0aW9ucyA9ICgwLCBfbWVyZ2UuZGVmYXVsdCkob3B0aW9ucywgZGVmYXVsdF9lbWFpbF9vcHRpb25zKTtcblxuICBpZiAob3B0aW9ucy5yZXF1aXJlX2Rpc3BsYXlfbmFtZSB8fCBvcHRpb25zLmFsbG93X2Rpc3BsYXlfbmFtZSkge1xuICAgIHZhciBkaXNwbGF5X2VtYWlsID0gc3RyLm1hdGNoKGRpc3BsYXlOYW1lKTtcblxuICAgIGlmIChkaXNwbGF5X2VtYWlsKSB7XG4gICAgICBzdHIgPSBkaXNwbGF5X2VtYWlsWzFdO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5yZXF1aXJlX2Rpc3BsYXlfbmFtZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnQCcpO1xuICB2YXIgZG9tYWluID0gcGFydHMucG9wKCk7XG4gIHZhciB1c2VyID0gcGFydHMuam9pbignQCcpO1xuICB2YXIgbG93ZXJfZG9tYWluID0gZG9tYWluLnRvTG93ZXJDYXNlKCk7XG5cbiAgaWYgKG9wdGlvbnMuZG9tYWluX3NwZWNpZmljX3ZhbGlkYXRpb24gJiYgKGxvd2VyX2RvbWFpbiA9PT0gJ2dtYWlsLmNvbScgfHwgbG93ZXJfZG9tYWluID09PSAnZ29vZ2xlbWFpbC5jb20nKSkge1xuICAgIC8qXG4gICAgICBQcmV2aW91c2x5IHdlIHJlbW92ZWQgZG90cyBmb3IgZ21haWwgYWRkcmVzc2VzIGJlZm9yZSB2YWxpZGF0aW5nLlxuICAgICAgVGhpcyB3YXMgcmVtb3ZlZCBiZWNhdXNlIGl0IGFsbG93cyBgbXVsdGlwbGUuLmRvdHNAZ21haWwuY29tYFxuICAgICAgdG8gYmUgcmVwb3J0ZWQgYXMgdmFsaWQsIGJ1dCBpdCBpcyBub3QuXG4gICAgICBHbWFpbCBvbmx5IG5vcm1hbGl6ZXMgc2luZ2xlIGRvdHMsIHJlbW92aW5nIHRoZW0gZnJvbSBoZXJlIGlzIHBvaW50bGVzcyxcbiAgICAgIHNob3VsZCBiZSBkb25lIGluIG5vcm1hbGl6ZUVtYWlsXG4gICAgKi9cbiAgICB1c2VyID0gdXNlci50b0xvd2VyQ2FzZSgpOyAvLyBSZW1vdmluZyBzdWItYWRkcmVzcyBmcm9tIHVzZXJuYW1lIGJlZm9yZSBnbWFpbCB2YWxpZGF0aW9uXG5cbiAgICB2YXIgdXNlcm5hbWUgPSB1c2VyLnNwbGl0KCcrJylbMF07IC8vIERvdHMgYXJlIG5vdCBpbmNsdWRlZCBpbiBnbWFpbCBsZW5ndGggcmVzdHJpY3Rpb25cblxuICAgIGlmICghKDAsIF9pc0J5dGVMZW5ndGguZGVmYXVsdCkodXNlcm5hbWUucmVwbGFjZSgnLicsICcnKSwge1xuICAgICAgbWluOiA2LFxuICAgICAgbWF4OiAzMFxuICAgIH0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIF91c2VyX3BhcnRzID0gdXNlcm5hbWUuc3BsaXQoJy4nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3VzZXJfcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghZ21haWxVc2VyUGFydC50ZXN0KF91c2VyX3BhcnRzW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKCEoMCwgX2lzQnl0ZUxlbmd0aC5kZWZhdWx0KSh1c2VyLCB7XG4gICAgbWF4OiA2NFxuICB9KSB8fCAhKDAsIF9pc0J5dGVMZW5ndGguZGVmYXVsdCkoZG9tYWluLCB7XG4gICAgbWF4OiAyNTRcbiAgfSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoISgwLCBfaXNGUUROLmRlZmF1bHQpKGRvbWFpbiwge1xuICAgIHJlcXVpcmVfdGxkOiBvcHRpb25zLnJlcXVpcmVfdGxkXG4gIH0pKSB7XG4gICAgaWYgKCFvcHRpb25zLmFsbG93X2lwX2RvbWFpbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghKDAsIF9pc0lQLmRlZmF1bHQpKGRvbWFpbikpIHtcbiAgICAgIGlmICghZG9tYWluLnN0YXJ0c1dpdGgoJ1snKSB8fCAhZG9tYWluLmVuZHNXaXRoKCddJykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgbm9CcmFja2V0ZG9tYWluID0gZG9tYWluLnN1YnN0cigxLCBkb21haW4ubGVuZ3RoIC0gMik7XG5cbiAgICAgIGlmIChub0JyYWNrZXRkb21haW4ubGVuZ3RoID09PSAwIHx8ICEoMCwgX2lzSVAuZGVmYXVsdCkobm9CcmFja2V0ZG9tYWluKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHVzZXJbMF0gPT09ICdcIicpIHtcbiAgICB1c2VyID0gdXNlci5zbGljZSgxLCB1c2VyLmxlbmd0aCAtIDEpO1xuICAgIHJldHVybiBvcHRpb25zLmFsbG93X3V0ZjhfbG9jYWxfcGFydCA/IHF1b3RlZEVtYWlsVXNlclV0ZjgudGVzdCh1c2VyKSA6IHF1b3RlZEVtYWlsVXNlci50ZXN0KHVzZXIpO1xuICB9XG5cbiAgdmFyIHBhdHRlcm4gPSBvcHRpb25zLmFsbG93X3V0ZjhfbG9jYWxfcGFydCA/IGVtYWlsVXNlclV0ZjhQYXJ0IDogZW1haWxVc2VyUGFydDtcbiAgdmFyIHVzZXJfcGFydHMgPSB1c2VyLnNwbGl0KCcuJyk7XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHVzZXJfcGFydHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgaWYgKCFwYXR0ZXJuLnRlc3QodXNlcl9wYXJ0c1tfaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRW1wdHk7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfbWVyZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvbWVyZ2VcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdF9pc19lbXB0eV9vcHRpb25zID0ge1xuICBpZ25vcmVfd2hpdGVzcGFjZTogZmFsc2Vcbn07XG5cbmZ1bmN0aW9uIGlzRW1wdHkoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIG9wdGlvbnMgPSAoMCwgX21lcmdlLmRlZmF1bHQpKG9wdGlvbnMsIGRlZmF1bHRfaXNfZW1wdHlfb3B0aW9ucyk7XG4gIHJldHVybiAob3B0aW9ucy5pZ25vcmVfd2hpdGVzcGFjZSA/IHN0ci50cmltKCkubGVuZ3RoIDogc3RyLmxlbmd0aCkgPT09IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRlFETjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9tZXJnZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9tZXJnZVwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBkZWZhdWx0X2ZxZG5fb3B0aW9ucyA9IHtcbiAgcmVxdWlyZV90bGQ6IHRydWUsXG4gIGFsbG93X3VuZGVyc2NvcmVzOiBmYWxzZSxcbiAgYWxsb3dfdHJhaWxpbmdfZG90OiBmYWxzZVxufTtcblxuZnVuY3Rpb24gaXNGUUROKHN0ciwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X2ZxZG5fb3B0aW9ucyk7XG4gIC8qIFJlbW92ZSB0aGUgb3B0aW9uYWwgdHJhaWxpbmcgZG90IGJlZm9yZSBjaGVja2luZyB2YWxpZGl0eSAqL1xuXG4gIGlmIChvcHRpb25zLmFsbG93X3RyYWlsaW5nX2RvdCAmJiBzdHJbc3RyLmxlbmd0aCAtIDFdID09PSAnLicpIHtcbiAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSAxKTtcbiAgfVxuXG4gIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnLicpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocGFydHNbaV0ubGVuZ3RoID4gNjMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAob3B0aW9ucy5yZXF1aXJlX3RsZCkge1xuICAgIHZhciB0bGQgPSBwYXJ0cy5wb3AoKTtcblxuICAgIGlmICghcGFydHMubGVuZ3RoIHx8ICEvXihbYS16XFx1MDBhMS1cXHVmZmZmXXsyLH18eG5bYS16MC05LV17Mix9KSQvaS50ZXN0KHRsZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IC8vIGRpc2FsbG93IHNwYWNlc1xuXG5cbiAgICBpZiAoL1tcXHNcXHUyMDAyLVxcdTIwMEJcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHVGRUZGXFx1REI0MFxcdURDMjBdLy50ZXN0KHRsZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBwYXJ0LCBfaSA9IDA7IF9pIDwgcGFydHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgcGFydCA9IHBhcnRzW19pXTtcblxuICAgIGlmIChvcHRpb25zLmFsbG93X3VuZGVyc2NvcmVzKSB7XG4gICAgICBwYXJ0ID0gcGFydC5yZXBsYWNlKC9fL2csICcnKTtcbiAgICB9XG5cbiAgICBpZiAoIS9eW2EtelxcdTAwYTEtXFx1ZmZmZjAtOS1dKyQvaS50ZXN0KHBhcnQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSAvLyBkaXNhbGxvdyBmdWxsLXdpZHRoIGNoYXJzXG5cblxuICAgIGlmICgvW1xcdWZmMDEtXFx1ZmY1ZV0vLnRlc3QocGFydCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAocGFydFswXSA9PT0gJy0nIHx8IHBhcnRbcGFydC5sZW5ndGggLSAxXSA9PT0gJy0nKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRmxvYXQ7XG5leHBvcnRzLmxvY2FsZXMgPSB2b2lkIDA7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfYWxwaGEgPSByZXF1aXJlKFwiLi9hbHBoYVwiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNGbG9hdChzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBmbG9hdCA9IG5ldyBSZWdFeHAoXCJeKD86Wy0rXSk/KD86WzAtOV0rKT8oPzpcXFxcXCIuY29uY2F0KG9wdGlvbnMubG9jYWxlID8gX2FscGhhLmRlY2ltYWxbb3B0aW9ucy5sb2NhbGVdIDogJy4nLCBcIlswLTldKik/KD86W2VFXVtcXFxcK1xcXFwtXT8oPzpbMC05XSspKT8kXCIpKTtcblxuICBpZiAoc3RyID09PSAnJyB8fCBzdHIgPT09ICcuJyB8fCBzdHIgPT09ICctJyB8fCBzdHIgPT09ICcrJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQoc3RyLnJlcGxhY2UoJywnLCAnLicpKTtcbiAgcmV0dXJuIGZsb2F0LnRlc3Qoc3RyKSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21pbicpIHx8IHZhbHVlID49IG9wdGlvbnMubWluKSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ21heCcpIHx8IHZhbHVlIDw9IG9wdGlvbnMubWF4KSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2x0JykgfHwgdmFsdWUgPCBvcHRpb25zLmx0KSAmJiAoIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2d0JykgfHwgdmFsdWUgPiBvcHRpb25zLmd0KTtcbn1cblxudmFyIGxvY2FsZXMgPSBPYmplY3Qua2V5cyhfYWxwaGEuZGVjaW1hbCk7XG5leHBvcnRzLmxvY2FsZXMgPSBsb2NhbGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNGdWxsV2lkdGg7XG5leHBvcnRzLmZ1bGxXaWR0aCA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGZ1bGxXaWR0aCA9IC9bXlxcdTAwMjAtXFx1MDA3RVxcdUZGNjEtXFx1RkY5RlxcdUZGQTAtXFx1RkZEQ1xcdUZGRTgtXFx1RkZFRTAtOWEtekEtWl0vO1xuZXhwb3J0cy5mdWxsV2lkdGggPSBmdWxsV2lkdGg7XG5cbmZ1bmN0aW9uIGlzRnVsbFdpZHRoKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gZnVsbFdpZHRoLnRlc3Qoc3RyKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSGFsZldpZHRoO1xuZXhwb3J0cy5oYWxmV2lkdGggPSB2b2lkIDA7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBoYWxmV2lkdGggPSAvW1xcdTAwMjAtXFx1MDA3RVxcdUZGNjEtXFx1RkY5RlxcdUZGQTAtXFx1RkZEQ1xcdUZGRTgtXFx1RkZFRTAtOWEtekEtWl0vO1xuZXhwb3J0cy5oYWxmV2lkdGggPSBoYWxmV2lkdGg7XG5cbmZ1bmN0aW9uIGlzSGFsZldpZHRoKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gaGFsZldpZHRoLnRlc3Qoc3RyKTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSGFzaDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGxlbmd0aHMgPSB7XG4gIG1kNTogMzIsXG4gIG1kNDogMzIsXG4gIHNoYTE6IDQwLFxuICBzaGEyNTY6IDY0LFxuICBzaGEzODQ6IDk2LFxuICBzaGE1MTI6IDEyOCxcbiAgcmlwZW1kMTI4OiAzMixcbiAgcmlwZW1kMTYwOiA0MCxcbiAgdGlnZXIxMjg6IDMyLFxuICB0aWdlcjE2MDogNDAsXG4gIHRpZ2VyMTkyOiA0OCxcbiAgY3JjMzI6IDgsXG4gIGNyYzMyYjogOFxufTtcblxuZnVuY3Rpb24gaXNIYXNoKHN0ciwgYWxnb3JpdGhtKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBoYXNoID0gbmV3IFJlZ0V4cChcIl5bYS1mMC05XXtcIi5jb25jYXQobGVuZ3Roc1thbGdvcml0aG1dLCBcIn0kXCIpKTtcbiAgcmV0dXJuIGhhc2gudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0hleENvbG9yO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgaGV4Y29sb3IgPSAvXiM/KFswLTlBLUZdezN9fFswLTlBLUZdezZ9KSQvaTtcblxuZnVuY3Rpb24gaXNIZXhDb2xvcihzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIGhleGNvbG9yLnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNIZXhhZGVjaW1hbDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGhleGFkZWNpbWFsID0gL15bMC05QS1GXSskL2k7XG5cbmZ1bmN0aW9uIGlzSGV4YWRlY2ltYWwoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBoZXhhZGVjaW1hbC50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSVA7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBpcHY0TWF5YmUgPSAvXihcXGR7MSwzfSlcXC4oXFxkezEsM30pXFwuKFxcZHsxLDN9KVxcLihcXGR7MSwzfSkkLztcbnZhciBpcHY2QmxvY2sgPSAvXlswLTlBLUZdezEsNH0kL2k7XG5cbmZ1bmN0aW9uIGlzSVAoc3RyKSB7XG4gIHZhciB2ZXJzaW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAnJztcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmVyc2lvbiA9IFN0cmluZyh2ZXJzaW9uKTtcblxuICBpZiAoIXZlcnNpb24pIHtcbiAgICByZXR1cm4gaXNJUChzdHIsIDQpIHx8IGlzSVAoc3RyLCA2KTtcbiAgfSBlbHNlIGlmICh2ZXJzaW9uID09PSAnNCcpIHtcbiAgICBpZiAoIWlwdjRNYXliZS50ZXN0KHN0cikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJy4nKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnRzWzNdIDw9IDI1NTtcbiAgfSBlbHNlIGlmICh2ZXJzaW9uID09PSAnNicpIHtcbiAgICB2YXIgYmxvY2tzID0gc3RyLnNwbGl0KCc6Jyk7XG4gICAgdmFyIGZvdW5kT21pc3Npb25CbG9jayA9IGZhbHNlOyAvLyBtYXJrZXIgdG8gaW5kaWNhdGUgOjpcbiAgICAvLyBBdCBsZWFzdCBzb21lIE9TIGFjY2VwdCB0aGUgbGFzdCAzMiBiaXRzIG9mIGFuIElQdjYgYWRkcmVzc1xuICAgIC8vIChpLmUuIDIgb2YgdGhlIGJsb2NrcykgaW4gSVB2NCBub3RhdGlvbiwgYW5kIFJGQyAzNDkzIHNheXNcbiAgICAvLyB0aGF0ICc6OmZmZmY6YS5iLmMuZCcgaXMgdmFsaWQgZm9yIElQdjQtbWFwcGVkIElQdjYgYWRkcmVzc2VzLFxuICAgIC8vIGFuZCAnOjphLmIuYy5kJyBpcyBkZXByZWNhdGVkLCBidXQgYWxzbyB2YWxpZC5cblxuICAgIHZhciBmb3VuZElQdjRUcmFuc2l0aW9uQmxvY2sgPSBpc0lQKGJsb2Nrc1tibG9ja3MubGVuZ3RoIC0gMV0sIDQpO1xuICAgIHZhciBleHBlY3RlZE51bWJlck9mQmxvY2tzID0gZm91bmRJUHY0VHJhbnNpdGlvbkJsb2NrID8gNyA6IDg7XG5cbiAgICBpZiAoYmxvY2tzLmxlbmd0aCA+IGV4cGVjdGVkTnVtYmVyT2ZCbG9ja3MpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IC8vIGluaXRpYWwgb3IgZmluYWwgOjpcblxuXG4gICAgaWYgKHN0ciA9PT0gJzo6Jykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChzdHIuc3Vic3RyKDAsIDIpID09PSAnOjonKSB7XG4gICAgICBibG9ja3Muc2hpZnQoKTtcbiAgICAgIGJsb2Nrcy5zaGlmdCgpO1xuICAgICAgZm91bmRPbWlzc2lvbkJsb2NrID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHN0ci5zdWJzdHIoc3RyLmxlbmd0aCAtIDIpID09PSAnOjonKSB7XG4gICAgICBibG9ja3MucG9wKCk7XG4gICAgICBibG9ja3MucG9wKCk7XG4gICAgICBmb3VuZE9taXNzaW9uQmxvY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxvY2tzLmxlbmd0aDsgKytpKSB7XG4gICAgICAvLyB0ZXN0IGZvciBhIDo6IHdoaWNoIGNhbiBub3QgYmUgYXQgdGhlIHN0cmluZyBzdGFydC9lbmRcbiAgICAgIC8vIHNpbmNlIHRob3NlIGNhc2VzIGhhdmUgYmVlbiBoYW5kbGVkIGFib3ZlXG4gICAgICBpZiAoYmxvY2tzW2ldID09PSAnJyAmJiBpID4gMCAmJiBpIDwgYmxvY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgaWYgKGZvdW5kT21pc3Npb25CbG9jaykge1xuICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gbXVsdGlwbGUgOjogaW4gYWRkcmVzc1xuICAgICAgICB9XG5cbiAgICAgICAgZm91bmRPbWlzc2lvbkJsb2NrID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZm91bmRJUHY0VHJhbnNpdGlvbkJsb2NrICYmIGkgPT09IGJsb2Nrcy5sZW5ndGggLSAxKSB7Ly8gaXQgaGFzIGJlZW4gY2hlY2tlZCBiZWZvcmUgdGhhdCB0aGUgbGFzdFxuICAgICAgICAvLyBibG9jayBpcyBhIHZhbGlkIElQdjQgYWRkcmVzc1xuICAgICAgfSBlbHNlIGlmICghaXB2NkJsb2NrLnRlc3QoYmxvY2tzW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZvdW5kT21pc3Npb25CbG9jaykge1xuICAgICAgcmV0dXJuIGJsb2Nrcy5sZW5ndGggPj0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmxvY2tzLmxlbmd0aCA9PT0gZXhwZWN0ZWROdW1iZXJPZkJsb2NrcztcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNJUFJhbmdlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX2lzSVAgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2lzSVBcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgc3VibmV0TWF5YmUgPSAvXlxcZHsxLDJ9JC87XG5cbmZ1bmN0aW9uIGlzSVBSYW5nZShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KCcvJyk7IC8vIHBhcnRzWzBdIC0+IGlwLCBwYXJ0c1sxXSAtPiBzdWJuZXRcblxuICBpZiAocGFydHMubGVuZ3RoICE9PSAyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKCFzdWJuZXRNYXliZS50ZXN0KHBhcnRzWzFdKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSAvLyBEaXNhbGxvdyBwcmVjZWRpbmcgMCBpLmUuIDAxLCAwMiwgLi4uXG5cblxuICBpZiAocGFydHNbMV0ubGVuZ3RoID4gMSAmJiBwYXJ0c1sxXS5zdGFydHNXaXRoKCcwJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gKDAsIF9pc0lQLmRlZmF1bHQpKHBhcnRzWzBdLCA0KSAmJiBwYXJ0c1sxXSA8PSAzMiAmJiBwYXJ0c1sxXSA+PSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lTQk47XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBpc2JuMTBNYXliZSA9IC9eKD86WzAtOV17OX1YfFswLTldezEwfSkkLztcbnZhciBpc2JuMTNNYXliZSA9IC9eKD86WzAtOV17MTN9KSQvO1xudmFyIGZhY3RvciA9IFsxLCAzXTtcblxuZnVuY3Rpb24gaXNJU0JOKHN0cikge1xuICB2YXIgdmVyc2lvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZlcnNpb24gPSBTdHJpbmcodmVyc2lvbik7XG5cbiAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIGlzSVNCTihzdHIsIDEwKSB8fCBpc0lTQk4oc3RyLCAxMyk7XG4gIH1cblxuICB2YXIgc2FuaXRpemVkID0gc3RyLnJlcGxhY2UoL1tcXHMtXSsvZywgJycpO1xuICB2YXIgY2hlY2tzdW0gPSAwO1xuICB2YXIgaTtcblxuICBpZiAodmVyc2lvbiA9PT0gJzEwJykge1xuICAgIGlmICghaXNibjEwTWF5YmUudGVzdChzYW5pdGl6ZWQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IDk7IGkrKykge1xuICAgICAgY2hlY2tzdW0gKz0gKGkgKyAxKSAqIHNhbml0aXplZC5jaGFyQXQoaSk7XG4gICAgfVxuXG4gICAgaWYgKHNhbml0aXplZC5jaGFyQXQoOSkgPT09ICdYJykge1xuICAgICAgY2hlY2tzdW0gKz0gMTAgKiAxMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2tzdW0gKz0gMTAgKiBzYW5pdGl6ZWQuY2hhckF0KDkpO1xuICAgIH1cblxuICAgIGlmIChjaGVja3N1bSAlIDExID09PSAwKSB7XG4gICAgICByZXR1cm4gISFzYW5pdGl6ZWQ7XG4gICAgfVxuICB9IGVsc2UgaWYgKHZlcnNpb24gPT09ICcxMycpIHtcbiAgICBpZiAoIWlzYm4xM01heWJlLnRlc3Qoc2FuaXRpemVkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgICBjaGVja3N1bSArPSBmYWN0b3JbaSAlIDJdICogc2FuaXRpemVkLmNoYXJBdChpKTtcbiAgICB9XG5cbiAgICBpZiAoc2FuaXRpemVkLmNoYXJBdCgxMikgLSAoMTAgLSBjaGVja3N1bSAlIDEwKSAlIDEwID09PSAwKSB7XG4gICAgICByZXR1cm4gISFzYW5pdGl6ZWQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lTSU47XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBpc2luID0gL15bQS1aXXsyfVswLTlBLVpdezl9WzAtOV0kLztcblxuZnVuY3Rpb24gaXNJU0lOKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmICghaXNpbi50ZXN0KHN0cikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgY2hlY2tzdW1TdHIgPSBzdHIucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24gKGNoYXJhY3Rlcikge1xuICAgIHJldHVybiBwYXJzZUludChjaGFyYWN0ZXIsIDM2KTtcbiAgfSk7XG4gIHZhciBzdW0gPSAwO1xuICB2YXIgZGlnaXQ7XG4gIHZhciB0bXBOdW07XG4gIHZhciBzaG91bGREb3VibGUgPSB0cnVlO1xuXG4gIGZvciAodmFyIGkgPSBjaGVja3N1bVN0ci5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgIGRpZ2l0ID0gY2hlY2tzdW1TdHIuc3Vic3RyaW5nKGksIGkgKyAxKTtcbiAgICB0bXBOdW0gPSBwYXJzZUludChkaWdpdCwgMTApO1xuXG4gICAgaWYgKHNob3VsZERvdWJsZSkge1xuICAgICAgdG1wTnVtICo9IDI7XG5cbiAgICAgIGlmICh0bXBOdW0gPj0gMTApIHtcbiAgICAgICAgc3VtICs9IHRtcE51bSArIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdW0gKz0gdG1wTnVtO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdW0gKz0gdG1wTnVtO1xuICAgIH1cblxuICAgIHNob3VsZERvdWJsZSA9ICFzaG91bGREb3VibGU7XG4gIH1cblxuICByZXR1cm4gcGFyc2VJbnQoc3RyLnN1YnN0cihzdHIubGVuZ3RoIC0gMSksIDEwKSA9PT0gKDEwMDAwIC0gc3VtKSAlIDEwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lTTzMxNjYxQWxwaGEyO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX2luY2x1ZGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2luY2x1ZGVzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gZnJvbSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fMzE2Ni0xX2FscGhhLTJcbnZhciB2YWxpZElTTzMxNjYxQWxwaGEyQ291bnRyaWVzQ29kZXMgPSBbJ0FEJywgJ0FFJywgJ0FGJywgJ0FHJywgJ0FJJywgJ0FMJywgJ0FNJywgJ0FPJywgJ0FRJywgJ0FSJywgJ0FTJywgJ0FUJywgJ0FVJywgJ0FXJywgJ0FYJywgJ0FaJywgJ0JBJywgJ0JCJywgJ0JEJywgJ0JFJywgJ0JGJywgJ0JHJywgJ0JIJywgJ0JJJywgJ0JKJywgJ0JMJywgJ0JNJywgJ0JOJywgJ0JPJywgJ0JRJywgJ0JSJywgJ0JTJywgJ0JUJywgJ0JWJywgJ0JXJywgJ0JZJywgJ0JaJywgJ0NBJywgJ0NDJywgJ0NEJywgJ0NGJywgJ0NHJywgJ0NIJywgJ0NJJywgJ0NLJywgJ0NMJywgJ0NNJywgJ0NOJywgJ0NPJywgJ0NSJywgJ0NVJywgJ0NWJywgJ0NXJywgJ0NYJywgJ0NZJywgJ0NaJywgJ0RFJywgJ0RKJywgJ0RLJywgJ0RNJywgJ0RPJywgJ0RaJywgJ0VDJywgJ0VFJywgJ0VHJywgJ0VIJywgJ0VSJywgJ0VTJywgJ0VUJywgJ0ZJJywgJ0ZKJywgJ0ZLJywgJ0ZNJywgJ0ZPJywgJ0ZSJywgJ0dBJywgJ0dCJywgJ0dEJywgJ0dFJywgJ0dGJywgJ0dHJywgJ0dIJywgJ0dJJywgJ0dMJywgJ0dNJywgJ0dOJywgJ0dQJywgJ0dRJywgJ0dSJywgJ0dTJywgJ0dUJywgJ0dVJywgJ0dXJywgJ0dZJywgJ0hLJywgJ0hNJywgJ0hOJywgJ0hSJywgJ0hUJywgJ0hVJywgJ0lEJywgJ0lFJywgJ0lMJywgJ0lNJywgJ0lOJywgJ0lPJywgJ0lRJywgJ0lSJywgJ0lTJywgJ0lUJywgJ0pFJywgJ0pNJywgJ0pPJywgJ0pQJywgJ0tFJywgJ0tHJywgJ0tIJywgJ0tJJywgJ0tNJywgJ0tOJywgJ0tQJywgJ0tSJywgJ0tXJywgJ0tZJywgJ0taJywgJ0xBJywgJ0xCJywgJ0xDJywgJ0xJJywgJ0xLJywgJ0xSJywgJ0xTJywgJ0xUJywgJ0xVJywgJ0xWJywgJ0xZJywgJ01BJywgJ01DJywgJ01EJywgJ01FJywgJ01GJywgJ01HJywgJ01IJywgJ01LJywgJ01MJywgJ01NJywgJ01OJywgJ01PJywgJ01QJywgJ01RJywgJ01SJywgJ01TJywgJ01UJywgJ01VJywgJ01WJywgJ01XJywgJ01YJywgJ01ZJywgJ01aJywgJ05BJywgJ05DJywgJ05FJywgJ05GJywgJ05HJywgJ05JJywgJ05MJywgJ05PJywgJ05QJywgJ05SJywgJ05VJywgJ05aJywgJ09NJywgJ1BBJywgJ1BFJywgJ1BGJywgJ1BHJywgJ1BIJywgJ1BLJywgJ1BMJywgJ1BNJywgJ1BOJywgJ1BSJywgJ1BTJywgJ1BUJywgJ1BXJywgJ1BZJywgJ1FBJywgJ1JFJywgJ1JPJywgJ1JTJywgJ1JVJywgJ1JXJywgJ1NBJywgJ1NCJywgJ1NDJywgJ1NEJywgJ1NFJywgJ1NHJywgJ1NIJywgJ1NJJywgJ1NKJywgJ1NLJywgJ1NMJywgJ1NNJywgJ1NOJywgJ1NPJywgJ1NSJywgJ1NTJywgJ1NUJywgJ1NWJywgJ1NYJywgJ1NZJywgJ1NaJywgJ1RDJywgJ1REJywgJ1RGJywgJ1RHJywgJ1RIJywgJ1RKJywgJ1RLJywgJ1RMJywgJ1RNJywgJ1ROJywgJ1RPJywgJ1RSJywgJ1RUJywgJ1RWJywgJ1RXJywgJ1RaJywgJ1VBJywgJ1VHJywgJ1VNJywgJ1VTJywgJ1VZJywgJ1VaJywgJ1ZBJywgJ1ZDJywgJ1ZFJywgJ1ZHJywgJ1ZJJywgJ1ZOJywgJ1ZVJywgJ1dGJywgJ1dTJywgJ1lFJywgJ1lUJywgJ1pBJywgJ1pNJywgJ1pXJ107XG5cbmZ1bmN0aW9uIGlzSVNPMzE2NjFBbHBoYTIoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiAoMCwgX2luY2x1ZGVzLmRlZmF1bHQpKHZhbGlkSVNPMzE2NjFBbHBoYTJDb3VudHJpZXNDb2Rlcywgc3RyLnRvVXBwZXJDYXNlKCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lTTzMxNjYxQWxwaGEzO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX2luY2x1ZGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2luY2x1ZGVzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gZnJvbSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fMzE2Ni0xX2FscGhhLTNcbnZhciB2YWxpZElTTzMxNjYxQWxwaGEzQ291bnRyaWVzQ29kZXMgPSBbJ0FGRycsICdBTEEnLCAnQUxCJywgJ0RaQScsICdBU00nLCAnQU5EJywgJ0FHTycsICdBSUEnLCAnQVRBJywgJ0FURycsICdBUkcnLCAnQVJNJywgJ0FCVycsICdBVVMnLCAnQVVUJywgJ0FaRScsICdCSFMnLCAnQkhSJywgJ0JHRCcsICdCUkInLCAnQkxSJywgJ0JFTCcsICdCTFonLCAnQkVOJywgJ0JNVScsICdCVE4nLCAnQk9MJywgJ0JFUycsICdCSUgnLCAnQldBJywgJ0JWVCcsICdCUkEnLCAnSU9UJywgJ0JSTicsICdCR1InLCAnQkZBJywgJ0JESScsICdLSE0nLCAnQ01SJywgJ0NBTicsICdDUFYnLCAnQ1lNJywgJ0NBRicsICdUQ0QnLCAnQ0hMJywgJ0NITicsICdDWFInLCAnQ0NLJywgJ0NPTCcsICdDT00nLCAnQ09HJywgJ0NPRCcsICdDT0snLCAnQ1JJJywgJ0NJVicsICdIUlYnLCAnQ1VCJywgJ0NVVycsICdDWVAnLCAnQ1pFJywgJ0ROSycsICdESkknLCAnRE1BJywgJ0RPTScsICdFQ1UnLCAnRUdZJywgJ1NMVicsICdHTlEnLCAnRVJJJywgJ0VTVCcsICdFVEgnLCAnRkxLJywgJ0ZSTycsICdGSkknLCAnRklOJywgJ0ZSQScsICdHVUYnLCAnUFlGJywgJ0FURicsICdHQUInLCAnR01CJywgJ0dFTycsICdERVUnLCAnR0hBJywgJ0dJQicsICdHUkMnLCAnR1JMJywgJ0dSRCcsICdHTFAnLCAnR1VNJywgJ0dUTScsICdHR1knLCAnR0lOJywgJ0dOQicsICdHVVknLCAnSFRJJywgJ0hNRCcsICdWQVQnLCAnSE5EJywgJ0hLRycsICdIVU4nLCAnSVNMJywgJ0lORCcsICdJRE4nLCAnSVJOJywgJ0lSUScsICdJUkwnLCAnSU1OJywgJ0lTUicsICdJVEEnLCAnSkFNJywgJ0pQTicsICdKRVknLCAnSk9SJywgJ0tBWicsICdLRU4nLCAnS0lSJywgJ1BSSycsICdLT1InLCAnS1dUJywgJ0tHWicsICdMQU8nLCAnTFZBJywgJ0xCTicsICdMU08nLCAnTEJSJywgJ0xCWScsICdMSUUnLCAnTFRVJywgJ0xVWCcsICdNQUMnLCAnTUtEJywgJ01ERycsICdNV0knLCAnTVlTJywgJ01EVicsICdNTEknLCAnTUxUJywgJ01ITCcsICdNVFEnLCAnTVJUJywgJ01VUycsICdNWVQnLCAnTUVYJywgJ0ZTTScsICdNREEnLCAnTUNPJywgJ01ORycsICdNTkUnLCAnTVNSJywgJ01BUicsICdNT1onLCAnTU1SJywgJ05BTScsICdOUlUnLCAnTlBMJywgJ05MRCcsICdOQ0wnLCAnTlpMJywgJ05JQycsICdORVInLCAnTkdBJywgJ05JVScsICdORksnLCAnTU5QJywgJ05PUicsICdPTU4nLCAnUEFLJywgJ1BMVycsICdQU0UnLCAnUEFOJywgJ1BORycsICdQUlknLCAnUEVSJywgJ1BITCcsICdQQ04nLCAnUE9MJywgJ1BSVCcsICdQUkknLCAnUUFUJywgJ1JFVScsICdST1UnLCAnUlVTJywgJ1JXQScsICdCTE0nLCAnU0hOJywgJ0tOQScsICdMQ0EnLCAnTUFGJywgJ1NQTScsICdWQ1QnLCAnV1NNJywgJ1NNUicsICdTVFAnLCAnU0FVJywgJ1NFTicsICdTUkInLCAnU1lDJywgJ1NMRScsICdTR1AnLCAnU1hNJywgJ1NWSycsICdTVk4nLCAnU0xCJywgJ1NPTScsICdaQUYnLCAnU0dTJywgJ1NTRCcsICdFU1AnLCAnTEtBJywgJ1NETicsICdTVVInLCAnU0pNJywgJ1NXWicsICdTV0UnLCAnQ0hFJywgJ1NZUicsICdUV04nLCAnVEpLJywgJ1RaQScsICdUSEEnLCAnVExTJywgJ1RHTycsICdUS0wnLCAnVE9OJywgJ1RUTycsICdUVU4nLCAnVFVSJywgJ1RLTScsICdUQ0EnLCAnVFVWJywgJ1VHQScsICdVS1InLCAnQVJFJywgJ0dCUicsICdVU0EnLCAnVU1JJywgJ1VSWScsICdVWkInLCAnVlVUJywgJ1ZFTicsICdWTk0nLCAnVkdCJywgJ1ZJUicsICdXTEYnLCAnRVNIJywgJ1lFTScsICdaTUInLCAnWldFJ107XG5cbmZ1bmN0aW9uIGlzSVNPMzE2NjFBbHBoYTMoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiAoMCwgX2luY2x1ZGVzLmRlZmF1bHQpKHZhbGlkSVNPMzE2NjFBbHBoYTNDb3VudHJpZXNDb2Rlcywgc3RyLnRvVXBwZXJDYXNlKCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lTTzg2MDE7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbi8vIGZyb20gaHR0cDovL2dvby5nbC8wZWpISFdcbnZhciBpc284NjAxID0gL14oW1xcKy1dP1xcZHs0fSg/IVxcZHsyfVxcYikpKCgtPykoKDBbMS05XXwxWzAtMl0pKFxcMyhbMTJdXFxkfDBbMS05XXwzWzAxXSkpP3xXKFswLTRdXFxkfDVbMC0zXSkoLT9bMS03XSk/fCgwMFsxLTldfDBbMS05XVxcZHxbMTJdXFxkezJ9fDMoWzAtNV1cXGR8NlsxLTZdKSkpKFtUXFxzXSgoKFswMV1cXGR8MlswLTNdKSgoOj8pWzAtNV1cXGQpP3wyNDo/MDApKFtcXC4sXVxcZCsoPyE6KSk/KT8oXFwxN1swLTVdXFxkKFtcXC4sXVxcZCspPyk/KFt6Wl18KFtcXCstXSkoWzAxXVxcZHwyWzAtM10pOj8oWzAtNV1cXGQpPyk/KT8pPyQvO1xuLyogZXNsaW50LWVuYWJsZSBtYXgtbGVuICovXG5cbnZhciBpc1ZhbGlkRGF0ZSA9IGZ1bmN0aW9uIGlzVmFsaWREYXRlKHN0cikge1xuICAvLyBzdHIgbXVzdCBoYXZlIHBhc3NlZCB0aGUgSVNPODYwMSBjaGVja1xuICAvLyB0aGlzIGNoZWNrIGlzIG1lYW50IHRvIGNhdGNoIGludmFsaWQgZGF0ZXNcbiAgLy8gbGlrZSAyMDA5LTAyLTMxXG4gIC8vIGZpcnN0IGNoZWNrIGZvciBvcmRpbmFsIGRhdGVzXG4gIHZhciBvcmRpbmFsTWF0Y2ggPSBzdHIubWF0Y2goL14oXFxkezR9KS0/KFxcZHszfSkoWyBUXXsxfVxcLip8JCkvKTtcblxuICBpZiAob3JkaW5hbE1hdGNoKSB7XG4gICAgdmFyIG9ZZWFyID0gTnVtYmVyKG9yZGluYWxNYXRjaFsxXSk7XG4gICAgdmFyIG9EYXkgPSBOdW1iZXIob3JkaW5hbE1hdGNoWzJdKTsgLy8gaWYgaXMgbGVhcCB5ZWFyXG5cbiAgICBpZiAob1llYXIgJSA0ID09PSAwICYmIG9ZZWFyICUgMTAwICE9PSAwKSByZXR1cm4gb0RheSA8PSAzNjY7XG4gICAgcmV0dXJuIG9EYXkgPD0gMzY1O1xuICB9XG5cbiAgdmFyIG1hdGNoID0gc3RyLm1hdGNoKC8oXFxkezR9KS0/KFxcZHswLDJ9KS0/KFxcZCopLykubWFwKE51bWJlcik7XG4gIHZhciB5ZWFyID0gbWF0Y2hbMV07XG4gIHZhciBtb250aCA9IG1hdGNoWzJdO1xuICB2YXIgZGF5ID0gbWF0Y2hbM107XG4gIHZhciBtb250aFN0cmluZyA9IG1vbnRoID8gXCIwXCIuY29uY2F0KG1vbnRoKS5zbGljZSgtMikgOiBtb250aDtcbiAgdmFyIGRheVN0cmluZyA9IGRheSA/IFwiMFwiLmNvbmNhdChkYXkpLnNsaWNlKC0yKSA6IGRheTsgLy8gY3JlYXRlIGEgZGF0ZSBvYmplY3QgYW5kIGNvbXBhcmVcblxuICB2YXIgZCA9IG5ldyBEYXRlKFwiXCIuY29uY2F0KHllYXIsIFwiLVwiKS5jb25jYXQobW9udGhTdHJpbmcgfHwgJzAxJywgXCItXCIpLmNvbmNhdChkYXlTdHJpbmcgfHwgJzAxJykpO1xuICBpZiAoaXNOYU4oZC5nZXRVVENGdWxsWWVhcigpKSkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChtb250aCAmJiBkYXkpIHtcbiAgICByZXR1cm4gZC5nZXRVVENGdWxsWWVhcigpID09PSB5ZWFyICYmIGQuZ2V0VVRDTW9udGgoKSArIDEgPT09IG1vbnRoICYmIGQuZ2V0VVRDRGF0ZSgpID09PSBkYXk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIGlzSVNPODYwMShzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIGNoZWNrID0gaXNvODYwMS50ZXN0KHN0cik7XG4gIGlmICghb3B0aW9ucykgcmV0dXJuIGNoZWNrO1xuICBpZiAoY2hlY2sgJiYgb3B0aW9ucy5zdHJpY3QpIHJldHVybiBpc1ZhbGlkRGF0ZShzdHIpO1xuICByZXR1cm4gY2hlY2s7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSVNSQztcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gc2VlIGh0dHA6Ly9pc3JjLmlmcGkub3JnL2VuL2lzcmMtc3RhbmRhcmQvY29kZS1zeW50YXhcbnZhciBpc3JjID0gL15bQS1aXXsyfVswLTlBLVpdezN9XFxkezJ9XFxkezV9JC87XG5cbmZ1bmN0aW9uIGlzSVNSQyhzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIGlzcmMudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0lTU047XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBpc3NuID0gJ15cXFxcZHs0fS0/XFxcXGR7M31bXFxcXGRYXSQnO1xuXG5mdW5jdGlvbiBpc0lTU04oc3RyKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIHRlc3RJc3NuID0gaXNzbjtcbiAgdGVzdElzc24gPSBvcHRpb25zLnJlcXVpcmVfaHlwaGVuID8gdGVzdElzc24ucmVwbGFjZSgnPycsICcnKSA6IHRlc3RJc3NuO1xuICB0ZXN0SXNzbiA9IG9wdGlvbnMuY2FzZV9zZW5zaXRpdmUgPyBuZXcgUmVnRXhwKHRlc3RJc3NuKSA6IG5ldyBSZWdFeHAodGVzdElzc24sICdpJyk7XG5cbiAgaWYgKCF0ZXN0SXNzbi50ZXN0KHN0cikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZGlnaXRzID0gc3RyLnJlcGxhY2UoJy0nLCAnJykudG9VcHBlckNhc2UoKTtcbiAgdmFyIGNoZWNrc3VtID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRpZ2l0cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkaWdpdCA9IGRpZ2l0c1tpXTtcbiAgICBjaGVja3N1bSArPSAoZGlnaXQgPT09ICdYJyA/IDEwIDogK2RpZ2l0KSAqICg4IC0gaSk7XG4gIH1cblxuICByZXR1cm4gY2hlY2tzdW0gJSAxMSA9PT0gMDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNJZGVudGl0eUNhcmQ7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciB2YWxpZGF0b3JzID0ge1xuICBFUzogZnVuY3Rpb24gRVMoc3RyKSB7XG4gICAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgICB2YXIgRE5JID0gL15bMC05WC1aXVswLTldezd9W1RSV0FHTVlGUERYQk5KWlNRVkhMQ0tFXSQvO1xuICAgIHZhciBjaGFyc1ZhbHVlID0ge1xuICAgICAgWDogMCxcbiAgICAgIFk6IDEsXG4gICAgICBaOiAyXG4gICAgfTtcbiAgICB2YXIgY29udHJvbERpZ2l0cyA9IFsnVCcsICdSJywgJ1cnLCAnQScsICdHJywgJ00nLCAnWScsICdGJywgJ1AnLCAnRCcsICdYJywgJ0InLCAnTicsICdKJywgJ1onLCAnUycsICdRJywgJ1YnLCAnSCcsICdMJywgJ0MnLCAnSycsICdFJ107IC8vIHNhbml0aXplIHVzZXIgaW5wdXRcblxuICAgIHZhciBzYW5pdGl6ZWQgPSBzdHIudHJpbSgpLnRvVXBwZXJDYXNlKCk7IC8vIHZhbGlkYXRlIHRoZSBkYXRhIHN0cnVjdHVyZVxuXG4gICAgaWYgKCFETkkudGVzdChzYW5pdGl6ZWQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSAvLyB2YWxpZGF0ZSB0aGUgY29udHJvbCBkaWdpdFxuXG5cbiAgICB2YXIgbnVtYmVyID0gc2FuaXRpemVkLnNsaWNlKDAsIC0xKS5yZXBsYWNlKC9bWCxZLFpdL2csIGZ1bmN0aW9uIChjaGFyKSB7XG4gICAgICByZXR1cm4gY2hhcnNWYWx1ZVtjaGFyXTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2FuaXRpemVkLmVuZHNXaXRoKGNvbnRyb2xEaWdpdHNbbnVtYmVyICUgMjNdKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gaXNJZGVudGl0eUNhcmQoc3RyKSB7XG4gIHZhciBsb2NhbGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdhbnknO1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmIChsb2NhbGUgaW4gdmFsaWRhdG9ycykge1xuICAgIHJldHVybiB2YWxpZGF0b3JzW2xvY2FsZV0oc3RyKTtcbiAgfSBlbHNlIGlmIChsb2NhbGUgPT09ICdhbnknKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHZhbGlkYXRvcnMpIHtcbiAgICAgIGlmICh2YWxpZGF0b3JzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIHZhbGlkYXRvciA9IHZhbGlkYXRvcnNba2V5XTtcblxuICAgICAgICBpZiAodmFsaWRhdG9yKHN0cikpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbG9jYWxlICdcIi5jb25jYXQobG9jYWxlLCBcIidcIikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0luO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX3RvU3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL3RvU3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gaXNJbihzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIGk7XG5cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcHRpb25zKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuICAgIHZhciBhcnJheSA9IFtdO1xuXG4gICAgZm9yIChpIGluIG9wdGlvbnMpIHtcbiAgICAgIGlmICh7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9wdGlvbnMsIGkpKSB7XG4gICAgICAgIGFycmF5W2ldID0gKDAsIF90b1N0cmluZy5kZWZhdWx0KShvcHRpb25zW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXkuaW5kZXhPZihzdHIpID49IDA7XG4gIH0gZWxzZSBpZiAoX3R5cGVvZihvcHRpb25zKSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShzdHIpO1xuICB9IGVsc2UgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBvcHRpb25zLmluZGV4T2Yoc3RyKSA+PSAwO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0ludDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGludCA9IC9eKD86Wy0rXT8oPzowfFsxLTldWzAtOV0qKSkkLztcbnZhciBpbnRMZWFkaW5nWmVyb2VzID0gL15bLStdP1swLTldKyQvO1xuXG5mdW5jdGlvbiBpc0ludChzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307IC8vIEdldCB0aGUgcmVnZXggdG8gdXNlIGZvciB0ZXN0aW5nLCBiYXNlZCBvbiB3aGV0aGVyXG4gIC8vIGxlYWRpbmcgemVyb2VzIGFyZSBhbGxvd2VkIG9yIG5vdC5cblxuICB2YXIgcmVnZXggPSBvcHRpb25zLmhhc093blByb3BlcnR5KCdhbGxvd19sZWFkaW5nX3plcm9lcycpICYmICFvcHRpb25zLmFsbG93X2xlYWRpbmdfemVyb2VzID8gaW50IDogaW50TGVhZGluZ1plcm9lczsgLy8gQ2hlY2sgbWluL21heC9sdC9ndFxuXG4gIHZhciBtaW5DaGVja1Bhc3NlZCA9ICFvcHRpb25zLmhhc093blByb3BlcnR5KCdtaW4nKSB8fCBzdHIgPj0gb3B0aW9ucy5taW47XG4gIHZhciBtYXhDaGVja1Bhc3NlZCA9ICFvcHRpb25zLmhhc093blByb3BlcnR5KCdtYXgnKSB8fCBzdHIgPD0gb3B0aW9ucy5tYXg7XG4gIHZhciBsdENoZWNrUGFzc2VkID0gIW9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2x0JykgfHwgc3RyIDwgb3B0aW9ucy5sdDtcbiAgdmFyIGd0Q2hlY2tQYXNzZWQgPSAhb3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZ3QnKSB8fCBzdHIgPiBvcHRpb25zLmd0O1xuICByZXR1cm4gcmVnZXgudGVzdChzdHIpICYmIG1pbkNoZWNrUGFzc2VkICYmIG1heENoZWNrUGFzc2VkICYmIGx0Q2hlY2tQYXNzZWQgJiYgZ3RDaGVja1Bhc3NlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNKU09OO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBpc0pTT04oc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgdHJ5IHtcbiAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShzdHIpO1xuICAgIHJldHVybiAhIW9iaiAmJiBfdHlwZW9mKG9iaikgPT09ICdvYmplY3QnO1xuICB9IGNhdGNoIChlKSB7XG4gICAgLyogaWdub3JlICovXG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzSldUO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgand0ID0gL14oW0EtWmEtejAtOVxcLV9+K1xcL10rWz1dezAsMn0pXFwuKFtBLVphLXowLTlcXC1ffitcXC9dK1s9XXswLDJ9KSg/OlxcLihbQS1aYS16MC05XFwtX34rXFwvXStbPV17MCwyfSkpPyQvO1xuXG5mdW5jdGlvbiBpc0pXVChzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIGp3dC50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbGF0ID0gL15cXCg/WystXT8oOTAoXFwuMCspP3xbMS04XT9cXGQoXFwuXFxkKyk/KSQvO1xudmFyIGxvbmcgPSAvXlxccz9bKy1dPygxODAoXFwuMCspP3wxWzAtN11cXGQoXFwuXFxkKyk/fFxcZHsxLDJ9KFxcLlxcZCspPylcXCk/JC87XG5cbmZ1bmN0aW9uIF9kZWZhdWx0KHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICBpZiAoIXN0ci5pbmNsdWRlcygnLCcpKSByZXR1cm4gZmFsc2U7XG4gIHZhciBwYWlyID0gc3RyLnNwbGl0KCcsJyk7XG4gIHJldHVybiBsYXQudGVzdChwYWlyWzBdKSAmJiBsb25nLnRlc3QocGFpclsxXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTGVuZ3RoO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItcmVzdC1wYXJhbXMgKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHN0ciwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgbWluO1xuICB2YXIgbWF4O1xuXG4gIGlmIChfdHlwZW9mKG9wdGlvbnMpID09PSAnb2JqZWN0Jykge1xuICAgIG1pbiA9IG9wdGlvbnMubWluIHx8IDA7XG4gICAgbWF4ID0gb3B0aW9ucy5tYXg7XG4gIH0gZWxzZSB7XG4gICAgLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHk6IGlzTGVuZ3RoKHN0ciwgbWluIFssIG1heF0pXG4gICAgbWluID0gYXJndW1lbnRzWzFdO1xuICAgIG1heCA9IGFyZ3VtZW50c1syXTtcbiAgfVxuXG4gIHZhciBzdXJyb2dhdGVQYWlycyA9IHN0ci5tYXRjaCgvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nKSB8fCBbXTtcbiAgdmFyIGxlbiA9IHN0ci5sZW5ndGggLSBzdXJyb2dhdGVQYWlycy5sZW5ndGg7XG4gIHJldHVybiBsZW4gPj0gbWluICYmICh0eXBlb2YgbWF4ID09PSAndW5kZWZpbmVkJyB8fCBsZW4gPD0gbWF4KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNMb3dlcmNhc2U7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGlzTG93ZXJjYXNlKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gc3RyID09PSBzdHIudG9Mb3dlckNhc2UoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNNQUNBZGRyZXNzO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbWFjQWRkcmVzcyA9IC9eKFswLTlhLWZBLUZdWzAtOWEtZkEtRl06KXs1fShbMC05YS1mQS1GXVswLTlhLWZBLUZdKSQvO1xudmFyIG1hY0FkZHJlc3NOb0NvbG9ucyA9IC9eKFswLTlhLWZBLUZdKXsxMn0kLztcblxuZnVuY3Rpb24gaXNNQUNBZGRyZXNzKHN0ciwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMubm9fY29sb25zKSB7XG4gICAgcmV0dXJuIG1hY0FkZHJlc3NOb0NvbG9ucy50ZXN0KHN0cik7XG4gIH1cblxuICByZXR1cm4gbWFjQWRkcmVzcy50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTUQ1O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbWQ1ID0gL15bYS1mMC05XXszMn0kLztcblxuZnVuY3Rpb24gaXNNRDUoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBtZDUudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc01hZ25ldFVSSTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG1hZ25ldFVSSSA9IC9ebWFnbmV0OlxcP3h0PXVybjpbYS16MC05XSs6W2EtejAtOV17MzIsNDB9JmRuPS4rJnRyPS4rJC9pO1xuXG5mdW5jdGlvbiBpc01hZ25ldFVSSSh1cmwpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkodXJsKTtcbiAgcmV0dXJuIG1hZ25ldFVSSS50ZXN0KHVybC50cmltKCkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc01pbWVUeXBlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKlxuICBDaGVja3MgaWYgdGhlIHByb3ZpZGVkIHN0cmluZyBtYXRjaGVzIHRvIGEgY29ycmVjdCBNZWRpYSB0eXBlIGZvcm1hdCAoTUlNRSB0eXBlKVxuXG4gIFRoaXMgZnVuY3Rpb24gb25seSBjaGVja3MgaXMgdGhlIHN0cmluZyBmb3JtYXQgZm9sbG93cyB0aGVcbiAgZXRhYmxpc2hlZCBydWxlcyBieSB0aGUgYWNjb3JkaW5nIFJGQyBzcGVjaWZpY2F0aW9ucy5cbiAgVGhpcyBmdW5jdGlvbiBzdXBwb3J0cyAnY2hhcnNldCcgaW4gdGV4dHVhbCBtZWRpYSB0eXBlc1xuICAoaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY2NTcpLlxuXG4gIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgY2hlY2sgYWdhaW5zdCBhbGwgdGhlIG1lZGlhIHR5cGVzIGxpc3RlZFxuICBieSB0aGUgSUFOQSAoaHR0cHM6Ly93d3cuaWFuYS5vcmcvYXNzaWdubWVudHMvbWVkaWEtdHlwZXMvbWVkaWEtdHlwZXMueGh0bWwpXG4gIGJlY2F1c2Ugb2YgbGlnaHRuZXNzIHB1cnBvc2VzIDogaXQgd291bGQgcmVxdWlyZSB0byBpbmNsdWRlXG4gIGFsbCB0aGVzZSBNSU1FIHR5cGVzIGluIHRoaXMgbGlicmFpcnksIHdoaWNoIHdvdWxkIHdlaWdoIGl0XG4gIHNpZ25pZmljYW50bHkuIFRoaXMga2luZCBvZiBlZmZvcnQgbWF5YmUgaXMgbm90IHdvcnRoIGZvciB0aGUgdXNlIHRoYXRcbiAgdGhpcyBmdW5jdGlvbiBoYXMgaW4gdGhpcyBlbnRpcmUgbGlicmFpcnkuXG5cbiAgTW9yZSBpbmZvcm1hdGlvbnMgaW4gdGhlIFJGQyBzcGVjaWZpY2F0aW9ucyA6XG4gIC0gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzIwNDVcbiAgLSBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjA0NlxuICAtIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tMy4xLjEuMVxuICAtIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMxI3NlY3Rpb24tMy4xLjEuNVxuKi9cbi8vIE1hdGNoIHNpbXBsZSBNSU1FIHR5cGVzXG4vLyBOQiA6XG4vLyAgIFN1YnR5cGUgbGVuZ3RoIG11c3Qgbm90IGV4Y2VlZCAxMDAgY2hhcmFjdGVycy5cbi8vICAgVGhpcyBydWxlIGRvZXMgbm90IGNvbXBseSB0byB0aGUgUkZDIHNwZWNzICh3aGF0IGlzIHRoZSBtYXggbGVuZ3RoID8pLlxudmFyIG1pbWVUeXBlU2ltcGxlID0gL14oYXBwbGljYXRpb258YXVkaW98Zm9udHxpbWFnZXxtZXNzYWdlfG1vZGVsfG11bHRpcGFydHx0ZXh0fHZpZGVvKVxcL1thLXpBLVowLTlcXC5cXC1cXCtdezEsMTAwfSQvaTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBtYXgtbGVuXG4vLyBIYW5kbGUgXCJjaGFyc2V0XCIgaW4gXCJ0ZXh0LypcIlxuXG52YXIgbWltZVR5cGVUZXh0ID0gL150ZXh0XFwvW2EtekEtWjAtOVxcLlxcLVxcK117MSwxMDB9O1xccz9jaGFyc2V0PShcIlthLXpBLVowLTlcXC5cXC1cXCtcXHNdezAsNzB9XCJ8W2EtekEtWjAtOVxcLlxcLVxcK117MCw3MH0pKFxccz9cXChbYS16QS1aMC05XFwuXFwtXFwrXFxzXXsxLDIwfVxcKSk/JC9pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cbi8vIEhhbmRsZSBcImJvdW5kYXJ5XCIgaW4gXCJtdWx0aXBhcnQvKlwiXG5cbnZhciBtaW1lVHlwZU11bHRpcGFydCA9IC9ebXVsdGlwYXJ0XFwvW2EtekEtWjAtOVxcLlxcLVxcK117MSwxMDB9KDtcXHM/KGJvdW5kYXJ5fGNoYXJzZXQpPShcIlthLXpBLVowLTlcXC5cXC1cXCtcXHNdezAsNzB9XCJ8W2EtekEtWjAtOVxcLlxcLVxcK117MCw3MH0pKFxccz9cXChbYS16QS1aMC05XFwuXFwtXFwrXFxzXXsxLDIwfVxcKSk/KXswLDJ9JC9pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG1heC1sZW5cblxuZnVuY3Rpb24gaXNNaW1lVHlwZShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIG1pbWVUeXBlU2ltcGxlLnRlc3Qoc3RyKSB8fCBtaW1lVHlwZVRleHQudGVzdChzdHIpIHx8IG1pbWVUeXBlTXVsdGlwYXJ0LnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNNb2JpbGVQaG9uZTtcbmV4cG9ydHMubG9jYWxlcyA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xudmFyIHBob25lcyA9IHtcbiAgJ2FyLUFFJzogL14oKFxcKz85NzEpfDApPzVbMDI0NTY4XVxcZHs3fSQvLFxuICAnYXItRFonOiAvXihcXCs/MjEzfDApKDV8Nnw3KVxcZHs4fSQvLFxuICAnYXItRUcnOiAvXigoXFwrPzIwKXwwKT8xWzAxMl1cXGR7OH0kLyxcbiAgJ2FyLUlRJzogL14oXFwrPzk2NHwwKT83WzAtOV1cXGR7OH0kLyxcbiAgJ2FyLUpPJzogL14oXFwrPzk2MnwwKT83Wzc4OV1cXGR7N30kLyxcbiAgJ2FyLUtXJzogL14oXFwrPzk2NSlbNTY5XVxcZHs3fSQvLFxuICAnYXItU0EnOiAvXighPyhcXCs/OTY2KXwwKT81XFxkezh9JC8sXG4gICdhci1TWSc6IC9eKCE/KFxcKz85NjMpfDApPzlcXGR7OH0kLyxcbiAgJ2FyLVROJzogL14oXFwrPzIxNik/WzI0NTldXFxkezd9JC8sXG4gICdiZS1CWSc6IC9eKFxcKz8zNzUpPygyNHwyNXwyOXwzM3w0NClcXGR7N30kLyxcbiAgJ2JnLUJHJzogL14oXFwrPzM1OXwwKT84Wzc4OV1cXGR7N30kLyxcbiAgJ2JuLUJEJzogL1xcKz8oODgpPzA/MVszNTY3ODldWzAtOV17OH1cXGIvLFxuICAnY3MtQ1onOiAvXihcXCs/NDIwKT8gP1sxLTldWzAtOV17Mn0gP1swLTldezN9ID9bMC05XXszfSQvLFxuICAnZGEtREsnOiAvXihcXCs/NDUpP1xccz9cXGR7Mn1cXHM/XFxkezJ9XFxzP1xcZHsyfVxccz9cXGR7Mn0kLyxcbiAgJ2RlLURFJzogL14oXFwrNDkpPzA/MSg1WzAtMjUtOV1cXGR8NihbMjNdfDBcXGQ/KXw3KFswLTU3LTldfDZcXGQpKVxcZHs3fSQvLFxuICAnZWwtR1InOiAvXihcXCs/MzB8MCk/KDY5XFxkezh9KSQvLFxuICAnZW4tQVUnOiAvXihcXCs/NjF8MCk0XFxkezh9JC8sXG4gICdlbi1HQic6IC9eKFxcKz80NHwwKTdcXGR7OX0kLyxcbiAgJ2VuLUdIJzogL14oXFwrMjMzfDApKDIwfDUwfDI0fDU0fDI3fDU3fDI2fDU2fDIzfDI4KVxcZHs3fSQvLFxuICAnZW4tSEsnOiAvXihcXCs/ODUyXFwtPyk/WzQ1Njc4OV1cXGR7M31cXC0/XFxkezR9JC8sXG4gICdlbi1JRSc6IC9eKFxcKz8zNTN8MCk4WzM1Njc4OV1cXGR7N30kLyxcbiAgJ2VuLUlOJzogL14oXFwrPzkxfDApP1s2Nzg5XVxcZHs5fSQvLFxuICAnZW4tS0UnOiAvXihcXCs/MjU0fDApP1s3XVxcZHs4fSQvLFxuICAnZW4tTVUnOiAvXihcXCs/MjMwfDApP1xcZHs4fSQvLFxuICAnZW4tTkcnOiAvXihcXCs/MjM0fDApP1s3ODldXFxkezl9JC8sXG4gICdlbi1OWic6IC9eKFxcKz82NHwwKVsyOF1cXGR7Nyw5fSQvLFxuICAnZW4tUEsnOiAvXigoXFwrOTIpfCgwMDkyKSktezAsMX1cXGR7M30tezAsMX1cXGR7N30kfF5cXGR7MTF9JHxeXFxkezR9LVxcZHs3fSQvLFxuICAnZW4tUlcnOiAvXihcXCs/MjUwfDApP1s3XVxcZHs4fSQvLFxuICAnZW4tU0cnOiAvXihcXCs2NSk/Wzg5XVxcZHs3fSQvLFxuICAnZW4tVFonOiAvXihcXCs/MjU1fDApP1s2N11cXGR7OH0kLyxcbiAgJ2VuLVVHJzogL14oXFwrPzI1NnwwKT9bN11cXGR7OH0kLyxcbiAgJ2VuLVVTJzogL14oKFxcKzF8MSk/KCB8LSk/KT8oXFwoWzItOV1bMC05XXsyfVxcKXxbMi05XVswLTldezJ9KSggfC0pPyhbMi05XVswLTldezJ9KCB8LSk/WzAtOV17NH0pJC8sXG4gICdlbi1aQSc6IC9eKFxcKz8yN3wwKVxcZHs5fSQvLFxuICAnZW4tWk0nOiAvXihcXCs/MjYpPzA5WzU2N11cXGR7N30kLyxcbiAgJ2VzLUVTJzogL14oXFwrPzM0KT8oNlxcZHsxfXw3WzEyMzRdKVxcZHs3fSQvLFxuICAnZXMtTVgnOiAvXihcXCs/NTIpPygxfDAxKT9cXGR7MTAsMTF9JC8sXG4gICdlcy1VWSc6IC9eKFxcKzU5OHwwKTlbMS05XVtcXGRdezZ9JC8sXG4gICdldC1FRSc6IC9eKFxcKz8zNzIpP1xccz8oNXw4WzEtNF0pXFxzPyhbMC05XVxccz8pezYsN30kLyxcbiAgJ2ZhLUlSJzogL14oXFwrPzk4W1xcLVxcc10/fDApOVswLTM5XVxcZFtcXC1cXHNdP1xcZHszfVtcXC1cXHNdP1xcZHs0fSQvLFxuICAnZmktRkknOiAvXihcXCs/MzU4fDApXFxzPyg0KDB8MXwyfDR8NXw2KT98NTApXFxzPyhcXGRcXHM/KXs0LDh9XFxkJC8sXG4gICdmby1GTyc6IC9eKFxcKz8yOTgpP1xccz9cXGR7Mn1cXHM/XFxkezJ9XFxzP1xcZHsyfSQvLFxuICAnZnItRlInOiAvXihcXCs/MzN8MClbNjddXFxkezh9JC8sXG4gICdoZS1JTCc6IC9eKFxcKzk3MnwwKShbMjM0ODldfDVbMDEyMzQ1Njg5XXw3NylbMS05XVxcZHs2fSQvLFxuICAnaHUtSFUnOiAvXihcXCs/MzYpKDIwfDMwfDcwKVxcZHs3fSQvLFxuICAnaWQtSUQnOiAvXihcXCs/NjJ8MCk4KDFbMTIzNDU2Nzg5XXwyWzEyMzhdfDNbMTIzOF18NVsxMjM1Njc4OV18N1s3OF18OVs1Njc4OV18OFsxMjM0NTY3ODldKShbXFxzP3xcXGRdezUsMTF9KSQvLFxuICAnaXQtSVQnOiAvXihcXCs/MzkpP1xccz8zXFxkezJ9ID9cXGR7Niw3fSQvLFxuICAnamEtSlAnOiAvXihcXCs/ODF8MClbNzg5XTBbIFxcLV0/WzEtOV1cXGR7Mn1bIFxcLV0/XFxkezV9JC8sXG4gICdray1LWic6IC9eKFxcKz83fDgpPzdcXGR7OX0kLyxcbiAgJ2tsLUdMJzogL14oXFwrPzI5OSk/XFxzP1xcZHsyfVxccz9cXGR7Mn1cXHM/XFxkezJ9JC8sXG4gICdrby1LUic6IC9eKChcXCs/ODIpWyBcXC1dPyk/MD8xKFswfDF8Nnw3fDh8OV17MX0pWyBcXC1dP1xcZHszLDR9WyBcXC1dP1xcZHs0fSQvLFxuICAnbHQtTFQnOiAvXihcXCszNzB8OClcXGR7OH0kLyxcbiAgJ21zLU1ZJzogL14oXFwrPzY/MDEpezF9KChbMDE0NV17MX0oXFwtfFxccyk/XFxkezcsOH0pfChbMjM2Nzg5XXsxfShcXHN8XFwtKT9cXGR7N30pKSQvLFxuICAnbmItTk8nOiAvXihcXCs/NDcpP1s0OV1cXGR7N30kLyxcbiAgJ25sLUJFJzogL14oXFwrPzMyfDApND9cXGR7OH0kLyxcbiAgJ25uLU5PJzogL14oXFwrPzQ3KT9bNDldXFxkezd9JC8sXG4gICdwbC1QTCc6IC9eKFxcKz80OCk/ID9bNS04XVxcZCA/XFxkezN9ID9cXGR7Mn0gP1xcZHsyfSQvLFxuICAncHQtQlInOiAvKD89XihcXCs/NXsyfVxcLT98MClbMS05XXsyfVxcLT9cXGR7NH1cXC0/XFxkezR9JCkoXihcXCs/NXsyfVxcLT98MClbMS05XXsyfVxcLT9bNi05XXsxfVxcZHszfVxcLT9cXGR7NH0kKXwoXihcXCs/NXsyfVxcLT98MClbMS05XXsyfVxcLT85WzYtOV17MX1cXGR7M31cXC0/XFxkezR9JCkvLFxuICAncHQtUFQnOiAvXihcXCs/MzUxKT85WzEyMzZdXFxkezd9JC8sXG4gICdyby1STyc6IC9eKFxcKz80PzApXFxzPzdcXGR7Mn0oXFwvfFxcc3xcXC58XFwtKT9cXGR7M30oXFxzfFxcLnxcXC0pP1xcZHszfSQvLFxuICAncnUtUlUnOiAvXihcXCs/N3w4KT85XFxkezl9JC8sXG4gICdzbC1TSSc6IC9eKFxcKzM4Nlxccz98MCkoXFxkezF9XFxzP1xcZHszfVxccz9cXGR7Mn1cXHM/XFxkezJ9fFxcZHsyfVxccz9cXGR7M31cXHM/XFxkezN9KSQvLFxuICAnc2stU0snOiAvXihcXCs/NDIxKT8gP1sxLTldWzAtOV17Mn0gP1swLTldezN9ID9bMC05XXszfSQvLFxuICAnc3ItUlMnOiAvXihcXCszODE2fDA2KVstIFxcZF17NSw5fSQvLFxuICAnc3YtU0UnOiAvXihcXCs/NDZ8MClbXFxzXFwtXT83W1xcc1xcLV0/WzAyMzY5XShbXFxzXFwtXT9cXGQpezd9JC8sXG4gICd0aC1USCc6IC9eKFxcKzY2fDY2fDApXFxkezl9JC8sXG4gICd0ci1UUic6IC9eKFxcKz85MHwwKT81XFxkezl9JC8sXG4gICd1ay1VQSc6IC9eKFxcKz8zOHw4KT8wXFxkezl9JC8sXG4gICd2aS1WTic6IC9eKFxcKz84NHwwKSgoMyhbMi05XSkpfCg1KFs2ODldKSl8KDcoWzB8Ni05XSkpfCg4KFsxLTVdKSl8KDkoWzAtOV0pKSkoWzAtOV17N30pJC8sXG4gICd6aC1DTic6IC9eKChcXCt8MDApODYpPzEoWzM1OF1bMC05XXw0WzU3OV18NjZ8N1swMTM1Njc4XXw5Wzg5XSlbMC05XXs4fSQvLFxuICAnemgtVFcnOiAvXihcXCs/ODg2XFwtP3wwKT85XFxkezh9JC9cbn07XG4vKiBlc2xpbnQtZW5hYmxlIG1heC1sZW4gKi9cbi8vIGFsaWFzZXNcblxucGhvbmVzWydlbi1DQSddID0gcGhvbmVzWydlbi1VUyddO1xucGhvbmVzWydmci1CRSddID0gcGhvbmVzWydubC1CRSddO1xucGhvbmVzWyd6aC1ISyddID0gcGhvbmVzWydlbi1ISyddO1xuXG5mdW5jdGlvbiBpc01vYmlsZVBob25lKHN0ciwgbG9jYWxlLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zdHJpY3RNb2RlICYmICFzdHIuc3RhcnRzV2l0aCgnKycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkobG9jYWxlKSkge1xuICAgIHJldHVybiBsb2NhbGUuc29tZShmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAocGhvbmVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIHBob25lID0gcGhvbmVzW2tleV07XG5cbiAgICAgICAgaWYgKHBob25lLnRlc3Qoc3RyKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChsb2NhbGUgaW4gcGhvbmVzKSB7XG4gICAgcmV0dXJuIHBob25lc1tsb2NhbGVdLnRlc3Qoc3RyKTsgLy8gYWxpYXMgZmFsc2V5IGxvY2FsZSBhcyAnYW55J1xuICB9IGVsc2UgaWYgKCFsb2NhbGUgfHwgbG9jYWxlID09PSAnYW55Jykge1xuICAgIGZvciAodmFyIGtleSBpbiBwaG9uZXMpIHtcbiAgICAgIGlmIChwaG9uZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB2YXIgcGhvbmUgPSBwaG9uZXNba2V5XTtcblxuICAgICAgICBpZiAocGhvbmUudGVzdChzdHIpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGxvY2FsZSAnXCIuY29uY2F0KGxvY2FsZSwgXCInXCIpKTtcbn1cblxudmFyIGxvY2FsZXMgPSBPYmplY3Qua2V5cyhwaG9uZXMpO1xuZXhwb3J0cy5sb2NhbGVzID0gbG9jYWxlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTW9uZ29JZDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxudmFyIF9pc0hleGFkZWNpbWFsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9pc0hleGFkZWNpbWFsXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNNb25nb0lkKHN0cikge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICByZXR1cm4gKDAsIF9pc0hleGFkZWNpbWFsLmRlZmF1bHQpKHN0cikgJiYgc3RyLmxlbmd0aCA9PT0gMjQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTXVsdGlieXRlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG52YXIgbXVsdGlieXRlID0gL1teXFx4MDAtXFx4N0ZdLztcbi8qIGVzbGludC1lbmFibGUgbm8tY29udHJvbC1yZWdleCAqL1xuXG5mdW5jdGlvbiBpc011bHRpYnl0ZShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIG11bHRpYnl0ZS50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzTnVtZXJpYztcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIG51bWVyaWMgPSAvXlsrLV0/KFswLTldKlsuXSk/WzAtOV0rJC87XG52YXIgbnVtZXJpY05vU3ltYm9scyA9IC9eWzAtOV0rJC87XG5cbmZ1bmN0aW9uIGlzTnVtZXJpYyhzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm5vX3N5bWJvbHMpIHtcbiAgICByZXR1cm4gbnVtZXJpY05vU3ltYm9scy50ZXN0KHN0cik7XG4gIH1cblxuICByZXR1cm4gbnVtZXJpYy50ZXN0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzUG9ydDtcblxudmFyIF9pc0ludCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vaXNJbnRcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpc1BvcnQoc3RyKSB7XG4gIHJldHVybiAoMCwgX2lzSW50LmRlZmF1bHQpKHN0ciwge1xuICAgIG1pbjogMCxcbiAgICBtYXg6IDY1NTM1XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbmV4cG9ydHMubG9jYWxlcyA9IHZvaWQgMDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLy8gY29tbW9uIHBhdHRlcm5zXG52YXIgdGhyZWVEaWdpdCA9IC9eXFxkezN9JC87XG52YXIgZm91ckRpZ2l0ID0gL15cXGR7NH0kLztcbnZhciBmaXZlRGlnaXQgPSAvXlxcZHs1fSQvO1xudmFyIHNpeERpZ2l0ID0gL15cXGR7Nn0kLztcbnZhciBwYXR0ZXJucyA9IHtcbiAgQUQ6IC9eQURcXGR7M30kLyxcbiAgQVQ6IGZvdXJEaWdpdCxcbiAgQVU6IGZvdXJEaWdpdCxcbiAgQkU6IGZvdXJEaWdpdCxcbiAgQkc6IGZvdXJEaWdpdCxcbiAgQ0E6IC9eW0FCQ0VHSEpLTE1OUFJTVFZYWV1cXGRbQUJDRUdISi1OUFJTVFYtWl1bXFxzXFwtXT9cXGRbQUJDRUdISi1OUFJTVFYtWl1cXGQkL2ksXG4gIENIOiBmb3VyRGlnaXQsXG4gIENaOiAvXlxcZHszfVxccz9cXGR7Mn0kLyxcbiAgREU6IGZpdmVEaWdpdCxcbiAgREs6IGZvdXJEaWdpdCxcbiAgRFo6IGZpdmVEaWdpdCxcbiAgRUU6IGZpdmVEaWdpdCxcbiAgRVM6IGZpdmVEaWdpdCxcbiAgRkk6IGZpdmVEaWdpdCxcbiAgRlI6IC9eXFxkezJ9XFxzP1xcZHszfSQvLFxuICBHQjogL14oZ2lyXFxzPzBhYXxbYS16XXsxLDJ9XFxkW1xcZGEtel0/XFxzPyhcXGRbYS16XXsyfSk/KSQvaSxcbiAgR1I6IC9eXFxkezN9XFxzP1xcZHsyfSQvLFxuICBIUjogL14oWzEtNV1cXGR7NH0kKS8sXG4gIEhVOiBmb3VyRGlnaXQsXG4gIElMOiBmaXZlRGlnaXQsXG4gIElOOiBzaXhEaWdpdCxcbiAgSVM6IHRocmVlRGlnaXQsXG4gIElUOiBmaXZlRGlnaXQsXG4gIEpQOiAvXlxcZHszfVxcLVxcZHs0fSQvLFxuICBLRTogZml2ZURpZ2l0LFxuICBMSTogL14oOTQ4WzUtOV18OTQ5WzAtN10pJC8sXG4gIExUOiAvXkxUXFwtXFxkezV9JC8sXG4gIExVOiBmb3VyRGlnaXQsXG4gIExWOiAvXkxWXFwtXFxkezR9JC8sXG4gIE1YOiBmaXZlRGlnaXQsXG4gIE5MOiAvXlxcZHs0fVxccz9bYS16XXsyfSQvaSxcbiAgTk86IGZvdXJEaWdpdCxcbiAgUEw6IC9eXFxkezJ9XFwtXFxkezN9JC8sXG4gIFBUOiAvXlxcZHs0fVxcLVxcZHszfT8kLyxcbiAgUk86IHNpeERpZ2l0LFxuICBSVTogc2l4RGlnaXQsXG4gIFNBOiBmaXZlRGlnaXQsXG4gIFNFOiAvXlxcZHszfVxccz9cXGR7Mn0kLyxcbiAgU0k6IGZvdXJEaWdpdCxcbiAgU0s6IC9eXFxkezN9XFxzP1xcZHsyfSQvLFxuICBUTjogZm91ckRpZ2l0LFxuICBUVzogL15cXGR7M30oXFxkezJ9KT8kLyxcbiAgVUE6IGZpdmVEaWdpdCxcbiAgVVM6IC9eXFxkezV9KC1cXGR7NH0pPyQvLFxuICBaQTogZm91ckRpZ2l0LFxuICBaTTogZml2ZURpZ2l0XG59O1xudmFyIGxvY2FsZXMgPSBPYmplY3Qua2V5cyhwYXR0ZXJucyk7XG5leHBvcnRzLmxvY2FsZXMgPSBsb2NhbGVzO1xuXG5mdW5jdGlvbiBfZGVmYXVsdChzdHIsIGxvY2FsZSkge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmIChsb2NhbGUgaW4gcGF0dGVybnMpIHtcbiAgICByZXR1cm4gcGF0dGVybnNbbG9jYWxlXS50ZXN0KHN0cik7XG4gIH0gZWxzZSBpZiAobG9jYWxlID09PSAnYW55Jykge1xuICAgIGZvciAodmFyIGtleSBpbiBwYXR0ZXJucykge1xuICAgICAgaWYgKHBhdHRlcm5zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIHBhdHRlcm4gPSBwYXR0ZXJuc1trZXldO1xuXG4gICAgICAgIGlmIChwYXR0ZXJuLnRlc3Qoc3RyKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsb2NhbGUgJ1wiLmNvbmNhdChsb2NhbGUsIFwiJ1wiKSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1JGQzMzMzk7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qIEJhc2VkIG9uIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMzMzM5I3NlY3Rpb24tNS42ICovXG52YXIgZGF0ZUZ1bGxZZWFyID0gL1swLTldezR9LztcbnZhciBkYXRlTW9udGggPSAvKDBbMS05XXwxWzAtMl0pLztcbnZhciBkYXRlTURheSA9IC8oWzEyXVxcZHwwWzEtOV18M1swMV0pLztcbnZhciB0aW1lSG91ciA9IC8oWzAxXVswLTldfDJbMC0zXSkvO1xudmFyIHRpbWVNaW51dGUgPSAvWzAtNV1bMC05XS87XG52YXIgdGltZVNlY29uZCA9IC8oWzAtNV1bMC05XXw2MCkvO1xudmFyIHRpbWVTZWNGcmFjID0gLyhcXC5bMC05XSspPy87XG52YXIgdGltZU51bU9mZnNldCA9IG5ldyBSZWdFeHAoXCJbLStdXCIuY29uY2F0KHRpbWVIb3VyLnNvdXJjZSwgXCI6XCIpLmNvbmNhdCh0aW1lTWludXRlLnNvdXJjZSkpO1xudmFyIHRpbWVPZmZzZXQgPSBuZXcgUmVnRXhwKFwiKFt6Wl18XCIuY29uY2F0KHRpbWVOdW1PZmZzZXQuc291cmNlLCBcIilcIikpO1xudmFyIHBhcnRpYWxUaW1lID0gbmV3IFJlZ0V4cChcIlwiLmNvbmNhdCh0aW1lSG91ci5zb3VyY2UsIFwiOlwiKS5jb25jYXQodGltZU1pbnV0ZS5zb3VyY2UsIFwiOlwiKS5jb25jYXQodGltZVNlY29uZC5zb3VyY2UpLmNvbmNhdCh0aW1lU2VjRnJhYy5zb3VyY2UpKTtcbnZhciBmdWxsRGF0ZSA9IG5ldyBSZWdFeHAoXCJcIi5jb25jYXQoZGF0ZUZ1bGxZZWFyLnNvdXJjZSwgXCItXCIpLmNvbmNhdChkYXRlTW9udGguc291cmNlLCBcIi1cIikuY29uY2F0KGRhdGVNRGF5LnNvdXJjZSkpO1xudmFyIGZ1bGxUaW1lID0gbmV3IFJlZ0V4cChcIlwiLmNvbmNhdChwYXJ0aWFsVGltZS5zb3VyY2UpLmNvbmNhdCh0aW1lT2Zmc2V0LnNvdXJjZSkpO1xudmFyIHJmYzMzMzkgPSBuZXcgUmVnRXhwKFwiXCIuY29uY2F0KGZ1bGxEYXRlLnNvdXJjZSwgXCJbIHRUXVwiKS5jb25jYXQoZnVsbFRpbWUuc291cmNlKSk7XG5cbmZ1bmN0aW9uIGlzUkZDMzMzOShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHJmYzMzMzkudGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1N1cnJvZ2F0ZVBhaXI7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBzdXJyb2dhdGVQYWlyID0gL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vO1xuXG5mdW5jdGlvbiBpc1N1cnJvZ2F0ZVBhaXIoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBzdXJyb2dhdGVQYWlyLnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNVUkw7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfaXNGUUROID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9pc0ZRRE5cIikpO1xuXG52YXIgX2lzSVAgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL2lzSVBcIikpO1xuXG52YXIgX21lcmdlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL21lcmdlXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGRlZmF1bHRfdXJsX29wdGlvbnMgPSB7XG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2Z0cCddLFxuICByZXF1aXJlX3RsZDogdHJ1ZSxcbiAgcmVxdWlyZV9wcm90b2NvbDogZmFsc2UsXG4gIHJlcXVpcmVfaG9zdDogdHJ1ZSxcbiAgcmVxdWlyZV92YWxpZF9wcm90b2NvbDogdHJ1ZSxcbiAgYWxsb3dfdW5kZXJzY29yZXM6IGZhbHNlLFxuICBhbGxvd190cmFpbGluZ19kb3Q6IGZhbHNlLFxuICBhbGxvd19wcm90b2NvbF9yZWxhdGl2ZV91cmxzOiBmYWxzZVxufTtcbnZhciB3cmFwcGVkX2lwdjYgPSAvXlxcWyhbXlxcXV0rKVxcXSg/OjooWzAtOV0rKSk/JC87XG5cbmZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuXG5mdW5jdGlvbiBjaGVja0hvc3QoaG9zdCwgbWF0Y2hlcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdGNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbWF0Y2ggPSBtYXRjaGVzW2ldO1xuXG4gICAgaWYgKGhvc3QgPT09IG1hdGNoIHx8IGlzUmVnRXhwKG1hdGNoKSAmJiBtYXRjaC50ZXN0KGhvc3QpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzVVJMKHVybCwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KSh1cmwpO1xuXG4gIGlmICghdXJsIHx8IHVybC5sZW5ndGggPj0gMjA4MyB8fCAvW1xcczw+XS8udGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHVybC5pbmRleE9mKCdtYWlsdG86JykgPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvcHRpb25zID0gKDAsIF9tZXJnZS5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X3VybF9vcHRpb25zKTtcbiAgdmFyIHByb3RvY29sLCBhdXRoLCBob3N0LCBob3N0bmFtZSwgcG9ydCwgcG9ydF9zdHIsIHNwbGl0LCBpcHY2O1xuICBzcGxpdCA9IHVybC5zcGxpdCgnIycpO1xuICB1cmwgPSBzcGxpdC5zaGlmdCgpO1xuICBzcGxpdCA9IHVybC5zcGxpdCgnPycpO1xuICB1cmwgPSBzcGxpdC5zaGlmdCgpO1xuICBzcGxpdCA9IHVybC5zcGxpdCgnOi8vJyk7XG5cbiAgaWYgKHNwbGl0Lmxlbmd0aCA+IDEpIHtcbiAgICBwcm90b2NvbCA9IHNwbGl0LnNoaWZ0KCkudG9Mb3dlckNhc2UoKTtcblxuICAgIGlmIChvcHRpb25zLnJlcXVpcmVfdmFsaWRfcHJvdG9jb2wgJiYgb3B0aW9ucy5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKG9wdGlvbnMucmVxdWlyZV9wcm90b2NvbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmICh1cmwuc3Vic3RyKDAsIDIpID09PSAnLy8nKSB7XG4gICAgaWYgKCFvcHRpb25zLmFsbG93X3Byb3RvY29sX3JlbGF0aXZlX3VybHMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzcGxpdFswXSA9IHVybC5zdWJzdHIoMik7XG4gIH1cblxuICB1cmwgPSBzcGxpdC5qb2luKCc6Ly8nKTtcblxuICBpZiAodXJsID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHNwbGl0ID0gdXJsLnNwbGl0KCcvJyk7XG4gIHVybCA9IHNwbGl0LnNoaWZ0KCk7XG5cbiAgaWYgKHVybCA9PT0gJycgJiYgIW9wdGlvbnMucmVxdWlyZV9ob3N0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzcGxpdCA9IHVybC5zcGxpdCgnQCcpO1xuXG4gIGlmIChzcGxpdC5sZW5ndGggPiAxKSB7XG4gICAgaWYgKG9wdGlvbnMuZGlzYWxsb3dfYXV0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGF1dGggPSBzcGxpdC5zaGlmdCgpO1xuXG4gICAgaWYgKGF1dGguaW5kZXhPZignOicpID49IDAgJiYgYXV0aC5zcGxpdCgnOicpLmxlbmd0aCA+IDIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBob3N0bmFtZSA9IHNwbGl0LmpvaW4oJ0AnKTtcbiAgcG9ydF9zdHIgPSBudWxsO1xuICBpcHY2ID0gbnVsbDtcbiAgdmFyIGlwdjZfbWF0Y2ggPSBob3N0bmFtZS5tYXRjaCh3cmFwcGVkX2lwdjYpO1xuXG4gIGlmIChpcHY2X21hdGNoKSB7XG4gICAgaG9zdCA9ICcnO1xuICAgIGlwdjYgPSBpcHY2X21hdGNoWzFdO1xuICAgIHBvcnRfc3RyID0gaXB2Nl9tYXRjaFsyXSB8fCBudWxsO1xuICB9IGVsc2Uge1xuICAgIHNwbGl0ID0gaG9zdG5hbWUuc3BsaXQoJzonKTtcbiAgICBob3N0ID0gc3BsaXQuc2hpZnQoKTtcblxuICAgIGlmIChzcGxpdC5sZW5ndGgpIHtcbiAgICAgIHBvcnRfc3RyID0gc3BsaXQuam9pbignOicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwb3J0X3N0ciAhPT0gbnVsbCkge1xuICAgIHBvcnQgPSBwYXJzZUludChwb3J0X3N0ciwgMTApO1xuXG4gICAgaWYgKCEvXlswLTldKyQvLnRlc3QocG9ydF9zdHIpIHx8IHBvcnQgPD0gMCB8fCBwb3J0ID4gNjU1MzUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoISgwLCBfaXNJUC5kZWZhdWx0KShob3N0KSAmJiAhKDAsIF9pc0ZRRE4uZGVmYXVsdCkoaG9zdCwgb3B0aW9ucykgJiYgKCFpcHY2IHx8ICEoMCwgX2lzSVAuZGVmYXVsdCkoaXB2NiwgNikpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaG9zdCA9IGhvc3QgfHwgaXB2NjtcblxuICBpZiAob3B0aW9ucy5ob3N0X3doaXRlbGlzdCAmJiAhY2hlY2tIb3N0KGhvc3QsIG9wdGlvbnMuaG9zdF93aGl0ZWxpc3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaG9zdF9ibGFja2xpc3QgJiYgY2hlY2tIb3N0KGhvc3QsIG9wdGlvbnMuaG9zdF9ibGFja2xpc3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVVVJRDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHV1aWQgPSB7XG4gIDM6IC9eWzAtOUEtRl17OH0tWzAtOUEtRl17NH0tM1swLTlBLUZdezN9LVswLTlBLUZdezR9LVswLTlBLUZdezEyfSQvaSxcbiAgNDogL15bMC05QS1GXXs4fS1bMC05QS1GXXs0fS00WzAtOUEtRl17M30tWzg5QUJdWzAtOUEtRl17M30tWzAtOUEtRl17MTJ9JC9pLFxuICA1OiAvXlswLTlBLUZdezh9LVswLTlBLUZdezR9LTVbMC05QS1GXXszfS1bODlBQl1bMC05QS1GXXszfS1bMC05QS1GXXsxMn0kL2ksXG4gIGFsbDogL15bMC05QS1GXXs4fS1bMC05QS1GXXs0fS1bMC05QS1GXXs0fS1bMC05QS1GXXs0fS1bMC05QS1GXXsxMn0kL2lcbn07XG5cbmZ1bmN0aW9uIGlzVVVJRChzdHIpIHtcbiAgdmFyIHZlcnNpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6ICdhbGwnO1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgcGF0dGVybiA9IHV1aWRbdmVyc2lvbl07XG4gIHJldHVybiBwYXR0ZXJuICYmIHBhdHRlcm4udGVzdChzdHIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1VwcGVyY2FzZTtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNVcHBlcmNhc2Uoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBzdHIgPT09IHN0ci50b1VwcGVyQ2FzZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc1ZhcmlhYmxlV2lkdGg7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbnZhciBfaXNGdWxsV2lkdGggPSByZXF1aXJlKFwiLi9pc0Z1bGxXaWR0aFwiKTtcblxudmFyIF9pc0hhbGZXaWR0aCA9IHJlcXVpcmUoXCIuL2lzSGFsZldpZHRoXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBpc1ZhcmlhYmxlV2lkdGgoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBfaXNGdWxsV2lkdGguZnVsbFdpZHRoLnRlc3Qoc3RyKSAmJiBfaXNIYWxmV2lkdGguaGFsZldpZHRoLnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNXaGl0ZWxpc3RlZDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gaXNXaGl0ZWxpc3RlZChzdHIsIGNoYXJzKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgZm9yICh2YXIgaSA9IHN0ci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChjaGFycy5pbmRleE9mKHN0cltpXSkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGx0cmltO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBsdHJpbShzdHIsIGNoYXJzKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHZhciBwYXR0ZXJuID0gY2hhcnMgPyBuZXcgUmVnRXhwKFwiXltcIi5jb25jYXQoY2hhcnMsIFwiXStcIiksICdnJykgOiAvXlxccysvZztcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKHBhdHRlcm4sICcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbWF0Y2hlcztcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gbWF0Y2hlcyhzdHIsIHBhdHRlcm4sIG1vZGlmaWVycykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuXG4gIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocGF0dGVybikgIT09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgcGF0dGVybiA9IG5ldyBSZWdFeHAocGF0dGVybiwgbW9kaWZpZXJzKTtcbiAgfVxuXG4gIHJldHVybiBwYXR0ZXJuLnRlc3Qoc3RyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbm9ybWFsaXplRW1haWw7XG5cbnZhciBfbWVyZ2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvbWVyZ2VcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdF9ub3JtYWxpemVfZW1haWxfb3B0aW9ucyA9IHtcbiAgLy8gVGhlIGZvbGxvd2luZyBvcHRpb25zIGFwcGx5IHRvIGFsbCBlbWFpbCBhZGRyZXNzZXNcbiAgLy8gTG93ZXJjYXNlcyB0aGUgbG9jYWwgcGFydCBvZiB0aGUgZW1haWwgYWRkcmVzcy5cbiAgLy8gUGxlYXNlIG5vdGUgdGhpcyBtYXkgdmlvbGF0ZSBSRkMgNTMyMSBhcyBwZXIgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvOTgwODMzMi8xOTIwMjQpLlxuICAvLyBUaGUgZG9tYWluIGlzIGFsd2F5cyBsb3dlcmNhc2VkLCBhcyBwZXIgUkZDIDEwMzVcbiAgYWxsX2xvd2VyY2FzZTogdHJ1ZSxcbiAgLy8gVGhlIGZvbGxvd2luZyBjb252ZXJzaW9ucyBhcmUgc3BlY2lmaWMgdG8gR01haWxcbiAgLy8gTG93ZXJjYXNlcyB0aGUgbG9jYWwgcGFydCBvZiB0aGUgR01haWwgYWRkcmVzcyAoa25vd24gdG8gYmUgY2FzZS1pbnNlbnNpdGl2ZSlcbiAgZ21haWxfbG93ZXJjYXNlOiB0cnVlLFxuICAvLyBSZW1vdmVzIGRvdHMgZnJvbSB0aGUgbG9jYWwgcGFydCBvZiB0aGUgZW1haWwgYWRkcmVzcywgYXMgdGhhdCdzIGlnbm9yZWQgYnkgR01haWxcbiAgZ21haWxfcmVtb3ZlX2RvdHM6IHRydWUsXG4gIC8vIFJlbW92ZXMgdGhlIHN1YmFkZHJlc3MgKGUuZy4gXCIrZm9vXCIpIGZyb20gdGhlIGVtYWlsIGFkZHJlc3NcbiAgZ21haWxfcmVtb3ZlX3N1YmFkZHJlc3M6IHRydWUsXG4gIC8vIENvbnZlcnN0cyB0aGUgZ29vZ2xlbWFpbC5jb20gZG9tYWluIHRvIGdtYWlsLmNvbVxuICBnbWFpbF9jb252ZXJ0X2dvb2dsZW1haWxkb3Rjb206IHRydWUsXG4gIC8vIFRoZSBmb2xsb3dpbmcgY29udmVyc2lvbnMgYXJlIHNwZWNpZmljIHRvIE91dGxvb2suY29tIC8gV2luZG93cyBMaXZlIC8gSG90bWFpbFxuICAvLyBMb3dlcmNhc2VzIHRoZSBsb2NhbCBwYXJ0IG9mIHRoZSBPdXRsb29rLmNvbSBhZGRyZXNzIChrbm93biB0byBiZSBjYXNlLWluc2Vuc2l0aXZlKVxuICBvdXRsb29rZG90Y29tX2xvd2VyY2FzZTogdHJ1ZSxcbiAgLy8gUmVtb3ZlcyB0aGUgc3ViYWRkcmVzcyAoZS5nLiBcIitmb29cIikgZnJvbSB0aGUgZW1haWwgYWRkcmVzc1xuICBvdXRsb29rZG90Y29tX3JlbW92ZV9zdWJhZGRyZXNzOiB0cnVlLFxuICAvLyBUaGUgZm9sbG93aW5nIGNvbnZlcnNpb25zIGFyZSBzcGVjaWZpYyB0byBZYWhvb1xuICAvLyBMb3dlcmNhc2VzIHRoZSBsb2NhbCBwYXJ0IG9mIHRoZSBZYWhvbyBhZGRyZXNzIChrbm93biB0byBiZSBjYXNlLWluc2Vuc2l0aXZlKVxuICB5YWhvb19sb3dlcmNhc2U6IHRydWUsXG4gIC8vIFJlbW92ZXMgdGhlIHN1YmFkZHJlc3MgKGUuZy4gXCItZm9vXCIpIGZyb20gdGhlIGVtYWlsIGFkZHJlc3NcbiAgeWFob29fcmVtb3ZlX3N1YmFkZHJlc3M6IHRydWUsXG4gIC8vIFRoZSBmb2xsb3dpbmcgY29udmVyc2lvbnMgYXJlIHNwZWNpZmljIHRvIFlhbmRleFxuICAvLyBMb3dlcmNhc2VzIHRoZSBsb2NhbCBwYXJ0IG9mIHRoZSBZYW5kZXggYWRkcmVzcyAoa25vd24gdG8gYmUgY2FzZS1pbnNlbnNpdGl2ZSlcbiAgeWFuZGV4X2xvd2VyY2FzZTogdHJ1ZSxcbiAgLy8gVGhlIGZvbGxvd2luZyBjb252ZXJzaW9ucyBhcmUgc3BlY2lmaWMgdG8gaUNsb3VkXG4gIC8vIExvd2VyY2FzZXMgdGhlIGxvY2FsIHBhcnQgb2YgdGhlIGlDbG91ZCBhZGRyZXNzIChrbm93biB0byBiZSBjYXNlLWluc2Vuc2l0aXZlKVxuICBpY2xvdWRfbG93ZXJjYXNlOiB0cnVlLFxuICAvLyBSZW1vdmVzIHRoZSBzdWJhZGRyZXNzIChlLmcuIFwiK2Zvb1wiKSBmcm9tIHRoZSBlbWFpbCBhZGRyZXNzXG4gIGljbG91ZF9yZW1vdmVfc3ViYWRkcmVzczogdHJ1ZVxufTsgLy8gTGlzdCBvZiBkb21haW5zIHVzZWQgYnkgaUNsb3VkXG5cbnZhciBpY2xvdWRfZG9tYWlucyA9IFsnaWNsb3VkLmNvbScsICdtZS5jb20nXTsgLy8gTGlzdCBvZiBkb21haW5zIHVzZWQgYnkgT3V0bG9vay5jb20gYW5kIGl0cyBwcmVkZWNlc3NvcnNcbi8vIFRoaXMgbGlzdCBpcyBsaWtlbHkgaW5jb21wbGV0ZS5cbi8vIFBhcnRpYWwgcmVmZXJlbmNlOlxuLy8gaHR0cHM6Ly9ibG9ncy5vZmZpY2UuY29tLzIwMTMvMDQvMTcvb3V0bG9vay1jb20tZ2V0cy10d28tc3RlcC12ZXJpZmljYXRpb24tc2lnbi1pbi1ieS1hbGlhcy1hbmQtbmV3LWludGVybmF0aW9uYWwtZG9tYWlucy9cblxudmFyIG91dGxvb2tkb3Rjb21fZG9tYWlucyA9IFsnaG90bWFpbC5hdCcsICdob3RtYWlsLmJlJywgJ2hvdG1haWwuY2EnLCAnaG90bWFpbC5jbCcsICdob3RtYWlsLmNvLmlsJywgJ2hvdG1haWwuY28ubnonLCAnaG90bWFpbC5jby50aCcsICdob3RtYWlsLmNvLnVrJywgJ2hvdG1haWwuY29tJywgJ2hvdG1haWwuY29tLmFyJywgJ2hvdG1haWwuY29tLmF1JywgJ2hvdG1haWwuY29tLmJyJywgJ2hvdG1haWwuY29tLmdyJywgJ2hvdG1haWwuY29tLm14JywgJ2hvdG1haWwuY29tLnBlJywgJ2hvdG1haWwuY29tLnRyJywgJ2hvdG1haWwuY29tLnZuJywgJ2hvdG1haWwuY3onLCAnaG90bWFpbC5kZScsICdob3RtYWlsLmRrJywgJ2hvdG1haWwuZXMnLCAnaG90bWFpbC5mcicsICdob3RtYWlsLmh1JywgJ2hvdG1haWwuaWQnLCAnaG90bWFpbC5pZScsICdob3RtYWlsLmluJywgJ2hvdG1haWwuaXQnLCAnaG90bWFpbC5qcCcsICdob3RtYWlsLmtyJywgJ2hvdG1haWwubHYnLCAnaG90bWFpbC5teScsICdob3RtYWlsLnBoJywgJ2hvdG1haWwucHQnLCAnaG90bWFpbC5zYScsICdob3RtYWlsLnNnJywgJ2hvdG1haWwuc2snLCAnbGl2ZS5iZScsICdsaXZlLmNvLnVrJywgJ2xpdmUuY29tJywgJ2xpdmUuY29tLmFyJywgJ2xpdmUuY29tLm14JywgJ2xpdmUuZGUnLCAnbGl2ZS5lcycsICdsaXZlLmV1JywgJ2xpdmUuZnInLCAnbGl2ZS5pdCcsICdsaXZlLm5sJywgJ21zbi5jb20nLCAnb3V0bG9vay5hdCcsICdvdXRsb29rLmJlJywgJ291dGxvb2suY2wnLCAnb3V0bG9vay5jby5pbCcsICdvdXRsb29rLmNvLm56JywgJ291dGxvb2suY28udGgnLCAnb3V0bG9vay5jb20nLCAnb3V0bG9vay5jb20uYXInLCAnb3V0bG9vay5jb20uYXUnLCAnb3V0bG9vay5jb20uYnInLCAnb3V0bG9vay5jb20uZ3InLCAnb3V0bG9vay5jb20ucGUnLCAnb3V0bG9vay5jb20udHInLCAnb3V0bG9vay5jb20udm4nLCAnb3V0bG9vay5jeicsICdvdXRsb29rLmRlJywgJ291dGxvb2suZGsnLCAnb3V0bG9vay5lcycsICdvdXRsb29rLmZyJywgJ291dGxvb2suaHUnLCAnb3V0bG9vay5pZCcsICdvdXRsb29rLmllJywgJ291dGxvb2suaW4nLCAnb3V0bG9vay5pdCcsICdvdXRsb29rLmpwJywgJ291dGxvb2sua3InLCAnb3V0bG9vay5sdicsICdvdXRsb29rLm15JywgJ291dGxvb2sucGgnLCAnb3V0bG9vay5wdCcsICdvdXRsb29rLnNhJywgJ291dGxvb2suc2cnLCAnb3V0bG9vay5zaycsICdwYXNzcG9ydC5jb20nXTsgLy8gTGlzdCBvZiBkb21haW5zIHVzZWQgYnkgWWFob28gTWFpbFxuLy8gVGhpcyBsaXN0IGlzIGxpa2VseSBpbmNvbXBsZXRlXG5cbnZhciB5YWhvb19kb21haW5zID0gWydyb2NrZXRtYWlsLmNvbScsICd5YWhvby5jYScsICd5YWhvby5jby51aycsICd5YWhvby5jb20nLCAneWFob28uZGUnLCAneWFob28uZnInLCAneWFob28uaW4nLCAneWFob28uaXQnLCAneW1haWwuY29tJ107IC8vIExpc3Qgb2YgZG9tYWlucyB1c2VkIGJ5IHlhbmRleC5ydVxuXG52YXIgeWFuZGV4X2RvbWFpbnMgPSBbJ3lhbmRleC5ydScsICd5YW5kZXgudWEnLCAneWFuZGV4Lmt6JywgJ3lhbmRleC5jb20nLCAneWFuZGV4LmJ5JywgJ3lhLnJ1J107IC8vIHJlcGxhY2Ugc2luZ2xlIGRvdHMsIGJ1dCBub3QgbXVsdGlwbGUgY29uc2VjdXRpdmUgZG90c1xuXG5mdW5jdGlvbiBkb3RzUmVwbGFjZXIobWF0Y2gpIHtcbiAgaWYgKG1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gbWF0Y2g7XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUVtYWlsKGVtYWlsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSAoMCwgX21lcmdlLmRlZmF1bHQpKG9wdGlvbnMsIGRlZmF1bHRfbm9ybWFsaXplX2VtYWlsX29wdGlvbnMpO1xuICB2YXIgcmF3X3BhcnRzID0gZW1haWwuc3BsaXQoJ0AnKTtcbiAgdmFyIGRvbWFpbiA9IHJhd19wYXJ0cy5wb3AoKTtcbiAgdmFyIHVzZXIgPSByYXdfcGFydHMuam9pbignQCcpO1xuICB2YXIgcGFydHMgPSBbdXNlciwgZG9tYWluXTsgLy8gVGhlIGRvbWFpbiBpcyBhbHdheXMgbG93ZXJjYXNlZCwgYXMgaXQncyBjYXNlLWluc2Vuc2l0aXZlIHBlciBSRkMgMTAzNVxuXG4gIHBhcnRzWzFdID0gcGFydHNbMV0udG9Mb3dlckNhc2UoKTtcblxuICBpZiAocGFydHNbMV0gPT09ICdnbWFpbC5jb20nIHx8IHBhcnRzWzFdID09PSAnZ29vZ2xlbWFpbC5jb20nKSB7XG4gICAgLy8gQWRkcmVzcyBpcyBHTWFpbFxuICAgIGlmIChvcHRpb25zLmdtYWlsX3JlbW92ZV9zdWJhZGRyZXNzKSB7XG4gICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnNwbGl0KCcrJylbMF07XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZ21haWxfcmVtb3ZlX2RvdHMpIHtcbiAgICAgIC8vIHRoaXMgZG9lcyBub3QgcmVwbGFjZSBjb25zZWN1dGl2ZSBkb3RzIGxpa2UgZXhhbXBsZS4uZW1haWxAZ21haWwuY29tXG4gICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnJlcGxhY2UoL1xcLisvZywgZG90c1JlcGxhY2VyKTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcnRzWzBdLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFsbF9sb3dlcmNhc2UgfHwgb3B0aW9ucy5nbWFpbF9sb3dlcmNhc2UpIHtcbiAgICAgIHBhcnRzWzBdID0gcGFydHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBwYXJ0c1sxXSA9IG9wdGlvbnMuZ21haWxfY29udmVydF9nb29nbGVtYWlsZG90Y29tID8gJ2dtYWlsLmNvbScgOiBwYXJ0c1sxXTtcbiAgfSBlbHNlIGlmIChpY2xvdWRfZG9tYWlucy5pbmRleE9mKHBhcnRzWzFdKSA+PSAwKSB7XG4gICAgLy8gQWRkcmVzcyBpcyBpQ2xvdWRcbiAgICBpZiAob3B0aW9ucy5pY2xvdWRfcmVtb3ZlX3N1YmFkZHJlc3MpIHtcbiAgICAgIHBhcnRzWzBdID0gcGFydHNbMF0uc3BsaXQoJysnKVswXTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcnRzWzBdLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFsbF9sb3dlcmNhc2UgfHwgb3B0aW9ucy5pY2xvdWRfbG93ZXJjYXNlKSB7XG4gICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKG91dGxvb2tkb3Rjb21fZG9tYWlucy5pbmRleE9mKHBhcnRzWzFdKSA+PSAwKSB7XG4gICAgLy8gQWRkcmVzcyBpcyBPdXRsb29rLmNvbVxuICAgIGlmIChvcHRpb25zLm91dGxvb2tkb3Rjb21fcmVtb3ZlX3N1YmFkZHJlc3MpIHtcbiAgICAgIHBhcnRzWzBdID0gcGFydHNbMF0uc3BsaXQoJysnKVswXTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcnRzWzBdLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFsbF9sb3dlcmNhc2UgfHwgb3B0aW9ucy5vdXRsb29rZG90Y29tX2xvd2VyY2FzZSkge1xuICAgICAgcGFydHNbMF0gPSBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh5YWhvb19kb21haW5zLmluZGV4T2YocGFydHNbMV0pID49IDApIHtcbiAgICAvLyBBZGRyZXNzIGlzIFlhaG9vXG4gICAgaWYgKG9wdGlvbnMueWFob29fcmVtb3ZlX3N1YmFkZHJlc3MpIHtcbiAgICAgIHZhciBjb21wb25lbnRzID0gcGFydHNbMF0uc3BsaXQoJy0nKTtcbiAgICAgIHBhcnRzWzBdID0gY29tcG9uZW50cy5sZW5ndGggPiAxID8gY29tcG9uZW50cy5zbGljZSgwLCAtMSkuam9pbignLScpIDogY29tcG9uZW50c1swXTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcnRzWzBdLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFsbF9sb3dlcmNhc2UgfHwgb3B0aW9ucy55YWhvb19sb3dlcmNhc2UpIHtcbiAgICAgIHBhcnRzWzBdID0gcGFydHNbMF0udG9Mb3dlckNhc2UoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoeWFuZGV4X2RvbWFpbnMuaW5kZXhPZihwYXJ0c1sxXSkgPj0gMCkge1xuICAgIGlmIChvcHRpb25zLmFsbF9sb3dlcmNhc2UgfHwgb3B0aW9ucy55YW5kZXhfbG93ZXJjYXNlKSB7XG4gICAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgcGFydHNbMV0gPSAneWFuZGV4LnJ1JzsgLy8gYWxsIHlhbmRleCBkb21haW5zIGFyZSBlcXVhbCwgMXN0IHByZWZmZXJlZFxuICB9IGVsc2UgaWYgKG9wdGlvbnMuYWxsX2xvd2VyY2FzZSkge1xuICAgIC8vIEFueSBvdGhlciBhZGRyZXNzXG4gICAgcGFydHNbMF0gPSBwYXJ0c1swXS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJ0AnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gcnRyaW07XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHJ0cmltKHN0ciwgY2hhcnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgdmFyIHBhdHRlcm4gPSBjaGFycyA/IG5ldyBSZWdFeHAoXCJbXCIuY29uY2F0KGNoYXJzLCBcIl1cIikpIDogL1xccy87XG4gIHZhciBpZHggPSBzdHIubGVuZ3RoIC0gMTtcblxuICBmb3IgKDsgaWR4ID49IDAgJiYgcGF0dGVybi50ZXN0KHN0cltpZHhdKTsgaWR4LS0pIHtcbiAgICA7XG4gIH1cblxuICByZXR1cm4gaWR4IDwgc3RyLmxlbmd0aCA/IHN0ci5zdWJzdHIoMCwgaWR4ICsgMSkgOiBzdHI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHN0cmlwTG93O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG52YXIgX2JsYWNrbGlzdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vYmxhY2tsaXN0XCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gc3RyaXBMb3coc3RyLCBrZWVwX25ld19saW5lcykge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShzdHIpO1xuICB2YXIgY2hhcnMgPSBrZWVwX25ld19saW5lcyA/ICdcXFxceDAwLVxcXFx4MDlcXFxceDBCXFxcXHgwQ1xcXFx4MEUtXFxcXHgxRlxcXFx4N0YnIDogJ1xcXFx4MDAtXFxcXHgxRlxcXFx4N0YnO1xuICByZXR1cm4gKDAsIF9ibGFja2xpc3QuZGVmYXVsdCkoc3RyLCBjaGFycyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvQm9vbGVhbjtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gdG9Cb29sZWFuKHN0ciwgc3RyaWN0KSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG5cbiAgaWYgKHN0cmljdCkge1xuICAgIHJldHVybiBzdHIgPT09ICcxJyB8fCBzdHIgPT09ICd0cnVlJztcbiAgfVxuXG4gIHJldHVybiBzdHIgIT09ICcwJyAmJiBzdHIgIT09ICdmYWxzZScgJiYgc3RyICE9PSAnJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdG9EYXRlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB0b0RhdGUoZGF0ZSkge1xuICAoMCwgX2Fzc2VydFN0cmluZy5kZWZhdWx0KShkYXRlKTtcbiAgZGF0ZSA9IERhdGUucGFyc2UoZGF0ZSk7XG4gIHJldHVybiAhaXNOYU4oZGF0ZSkgPyBuZXcgRGF0ZShkYXRlKSA6IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvRmxvYXQ7XG5cbnZhciBfYXNzZXJ0U3RyaW5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlsL2Fzc2VydFN0cmluZ1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHRvRmxvYXQoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBwYXJzZUZsb2F0KHN0cik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHRvSW50O1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB0b0ludChzdHIsIHJhZGl4KSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nLmRlZmF1bHQpKHN0cik7XG4gIHJldHVybiBwYXJzZUludChzdHIsIHJhZGl4IHx8IDEwKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdHJpbTtcblxudmFyIF9ydHJpbSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vcnRyaW1cIikpO1xuXG52YXIgX2x0cmltID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9sdHJpbVwiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHRyaW0oc3RyLCBjaGFycykge1xuICByZXR1cm4gKDAsIF9ydHJpbS5kZWZhdWx0KSgoMCwgX2x0cmltLmRlZmF1bHQpKHN0ciwgY2hhcnMpLCBjaGFycyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVuZXNjYXBlO1xuXG52YXIgX2Fzc2VydFN0cmluZyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdXRpbC9hc3NlcnRTdHJpbmdcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB1bmVzY2FwZShzdHIpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mYW1wOy9nLCAnJicpLnJlcGxhY2UoLyZxdW90Oy9nLCAnXCInKS5yZXBsYWNlKC8mI3gyNzsvZywgXCInXCIpLnJlcGxhY2UoLyZsdDsvZywgJzwnKS5yZXBsYWNlKC8mZ3Q7L2csICc+JykucmVwbGFjZSgvJiN4MkY7L2csICcvJykucmVwbGFjZSgvJiN4NUM7L2csICdcXFxcJykucmVwbGFjZSgvJiM5NjsvZywgJ2AnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYXNzZXJ0U3RyaW5nO1xuXG5mdW5jdGlvbiBfdHlwZW9mKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9OyB9IGVsc2UgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2Yob2JqKTsgfVxuXG5mdW5jdGlvbiBhc3NlcnRTdHJpbmcoaW5wdXQpIHtcbiAgdmFyIGlzU3RyaW5nID0gdHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyB8fCBpbnB1dCBpbnN0YW5jZW9mIFN0cmluZztcblxuICBpZiAoIWlzU3RyaW5nKSB7XG4gICAgdmFyIGludmFsaWRUeXBlO1xuXG4gICAgaWYgKGlucHV0ID09PSBudWxsKSB7XG4gICAgICBpbnZhbGlkVHlwZSA9ICdudWxsJztcbiAgICB9IGVsc2Uge1xuICAgICAgaW52YWxpZFR5cGUgPSBfdHlwZW9mKGlucHV0KTtcblxuICAgICAgaWYgKGludmFsaWRUeXBlID09PSAnb2JqZWN0JyAmJiBpbnB1dC5jb25zdHJ1Y3RvciAmJiBpbnB1dC5jb25zdHJ1Y3Rvci5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpKSB7XG4gICAgICAgIGludmFsaWRUeXBlID0gaW5wdXQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludmFsaWRUeXBlID0gXCJhIFwiLmNvbmNhdChpbnZhbGlkVHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIHN0cmluZyBidXQgcmVjZWl2ZWQgXCIuY29uY2F0KGludmFsaWRUeXBlLCBcIi5cIikpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIGluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMoYXJyLCB2YWwpIHtcbiAgcmV0dXJuIGFyci5zb21lKGZ1bmN0aW9uIChhcnJWYWwpIHtcbiAgICByZXR1cm4gdmFsID09PSBhcnJWYWw7XG4gIH0pO1xufTtcblxudmFyIF9kZWZhdWx0ID0gaW5jbHVkZXM7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IG1lcmdlO1xuXG5mdW5jdGlvbiBtZXJnZSgpIHtcbiAgdmFyIG9iaiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gIHZhciBkZWZhdWx0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuXG4gIGZvciAodmFyIGtleSBpbiBkZWZhdWx0cykge1xuICAgIGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBvYmpba2V5XSA9IGRlZmF1bHRzW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gZXhwb3J0cy5kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdG9TdHJpbmc7XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTsgfSByZXR1cm4gX3R5cGVvZihvYmopOyB9XG5cbmZ1bmN0aW9uIHRvU3RyaW5nKGlucHV0KSB7XG4gIGlmIChfdHlwZW9mKGlucHV0KSA9PT0gJ29iamVjdCcgJiYgaW5wdXQgIT09IG51bGwpIHtcbiAgICBpZiAodHlwZW9mIGlucHV0LnRvU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpbnB1dCA9IGlucHV0LnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlucHV0ID0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlucHV0ID09PSBudWxsIHx8IHR5cGVvZiBpbnB1dCA9PT0gJ3VuZGVmaW5lZCcgfHwgaXNOYU4oaW5wdXQpICYmICFpbnB1dC5sZW5ndGgpIHtcbiAgICBpbnB1dCA9ICcnO1xuICB9XG5cbiAgcmV0dXJuIFN0cmluZyhpbnB1dCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cy5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGV4cG9ydHMuZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHdoaXRlbGlzdDtcblxudmFyIF9hc3NlcnRTdHJpbmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWwvYXNzZXJ0U3RyaW5nXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gd2hpdGVsaXN0KHN0ciwgY2hhcnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcuZGVmYXVsdCkoc3RyKTtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoXCJbXlwiLmNvbmNhdChjaGFycywgXCJdK1wiKSwgJ2cnKSwgJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBleHBvcnRzLmRlZmF1bHQ7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1hZ2VzL2NlbGxwaG9uZV9ndXktbW9iaWxlLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltYWdlcy9jb3N0dW1lX2d1eS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvaGVyb19iZy1tb2JpbGUucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1hZ2VzL2hvbWVfY29udmVyc2lvbi5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvaG9tZV9kZWxpdmVyYWJsZXMucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1hZ2VzL2hvbWVfaGVyby5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWFnZXMvaG9tZV9ob3dfaXRfd29ya3MucG5nXCI7IiwiLy8gc3R5bGVzXG5pbXBvcnQgJy4vc2Nzcy9ob21lcGFnZS5zY3NzJztcblxuLy8gaW1hZ2VzXG5pbXBvcnQgJy4vaW1hZ2VzL2NlbGxwaG9uZV9ndXktbW9iaWxlLnBuZyc7XG5pbXBvcnQgJy4vaW1hZ2VzL2Nvc3R1bWVfZ3V5LnBuZyc7XG5pbXBvcnQgJy4vaW1hZ2VzL2hlcm9fYmctbW9iaWxlLnBuZyc7XG5pbXBvcnQgJy4vaW1hZ2VzL2hvbWVfY29udmVyc2lvbi5wbmcnO1xuaW1wb3J0ICcuL2ltYWdlcy9ob21lX2RlbGl2ZXJhYmxlcy5wbmcnO1xuaW1wb3J0ICcuL2ltYWdlcy9ob21lX2hlcm8ucG5nJztcbmltcG9ydCAnLi9pbWFnZXMvaG9tZV9ob3dfaXRfd29ya3MucG5nJztcblxuLy8ganNcbmltcG9ydCAnLi9qcy9lbWFpbC12YWxpZGF0ZS5qcyc7IiwiY29uc3QgdmFsaWRhdG9yID0gcmVxdWlyZSgndmFsaWRhdG9yJyk7XG5jb25zdCBhcGlfa2V5ID0gcHJvY2Vzcy5lbnYuU0VOREdSSURfQVBJX0tFWTtcblxuY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcml0aXF1ZS1mb3JtJyk7XG5jb25zdCBuYW1lRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VmLW5hbWUnKTtcbmNvbnN0IGVtYWlsRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VmLWVtYWlsJyk7XG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VmLXN1Ym1pdCcpO1xuY29uc3QgYWxsRmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNyaXRpcXVlLWZvcm1fX2lucHV0Jyk7XG5cbnZhciBsb2NhdGlvbkhvc3QgPSAnZGVzaWduY3JpdGlxdWUuaW8nO1xudmFyIGludmFsaWRJbnB1dHMgPSBbXTtcbnZhciBpc0FsbFNldCA9IGZhbHNlO1xudmFyIG5ld0VtYWlsRGF0YSA9ICcnO1xudmFyIGVtYWlsRGF0YSA9IFwie1xcXCJwZXJzb25hbGl6YXRpb25zXFxcIjpbe1xcXCJ0b1xcXCI6W3tcXFwiZW1haWxcXFwiOlxcXCJoZWxsb0BkZXNpZ25jcml0aXF1ZS5pb1xcXCIsXFxcIm5hbWVcXFwiOlxcXCJEZXNpZ24gQ3JpdGlxdWVcXFwifV0sXFxcImR5bmFtaWNfdGVtcGxhdGVfZGF0YVxcXCI6e1xcXCJzZWYtbmFtZVxcXCI6XFxcIlxcXCIsXFxcInNlZi1lbWFpbFxcXCI6XFxcIlxcXCIsXFxcInNlZi13ZWJzaXRlLWZyb21cXFwiOlxcXCJcXFwifX1dLFxcXCJmcm9tXFxcIjp7XFxcImVtYWlsXFxcIjpcXFwibm9yZXBsYXlAZGVzaWduY3JpdGlxdWUuaW9cXFwiLFxcXCJuYW1lXFxcIjpcXFwiRGVzaWduIENyaXRpcXVlXFxcIn0sXFxcInJlcGx5X3RvXFxcIjp7XFxcImVtYWlsXFxcIjpcXFwibm9yZXBsYXlAZGVzaWduY3JpdGlxdWUuaW9cXFwiLFxcXCJuYW1lXFxcIjpcXFwiRGVzaWduIENyaXRpcXVlXFxcIn0sXFxcInRlbXBsYXRlX2lkXFxcIjpcXFwiZC1jOTRmODNjYTgzYzQ0MzNjYTMxNTY1OWNkNTZjM2E4YlxcXCJ9XCI7XG52YXIgZW1haWxEYXRhUGFyc2VkID0gSlNPTi5wYXJzZShlbWFpbERhdGEpO1xuXG5pZiAoc3VibWl0QnRuKSB7XG5cdHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uRm9ybVN1Ym1pdCk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrVmFsaWRhdG9yKGV2dCkge1xuICAgIGlmICggIXZhbGlkYXRvci5pc0VtYWlsKGVtYWlsRmllbGQudmFsdWUpICkge1xuICAgICAgICBlbWFpbEZpZWxkLnNldEN1c3RvbVZhbGlkaXR5KCcnKTtcbiAgICAgICAgZW1haWxGaWVsZC5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVtYWlsRmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgICAgICAgZW1haWxGaWVsZC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIGNoZWNrVmFsaWRhdG9yKTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coZXZ0KTtcbn1cblxuZnVuY3Rpb24gb25NZXNzYWdlRXJyb3IoZXZ0KSB7XG4gICAgLy8gY29uc29sZS5sb2coZXZ0KTtcbiAgICBpZiAoIGV2dC50YXJnZXQudmFsaWRpdHkudmFsdWVNaXNzaW5nICkge1xuICAgICAgICBldnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xuICAgIH1cbn1cblxuLy8gY29uc29sZS5sb2cobmV3RW1haWxEYXRhKTtcblxuZnVuY3Rpb24gb25Gb3JtU3VibWl0KCkge1xuXG4gICAgbGV0IGFyciA9IGFsbEZpZWxkcztcbiAgICBcbiAgICBmb3IgKGxldCBlbCBvZiBhcnIpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZWwpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGVsLnZhbGlkaXR5LnZhbHVlTWlzc2luZykge1xuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgb25NZXNzYWdlRXJyb3IpO1xuICAgICAgICAgICAgaW52YWxpZElucHV0cy5wdXNoKGVsLmlkKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdicmVha2VkJywgZWwuaWQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uTWVzc2FnZUVycm9yKTtcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBpbnZhbGlkSW5wdXRzLmluZGV4T2YoZWwpO1xuICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkgYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICBpZiAodmFsaWRhdG9yLmlzRW1haWwoZW1haWxGaWVsZC52YWx1ZSkpIHtcbiAgICAgICAgZW1haWxGaWVsZC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XG4gICAgICAgIGVtYWlsRmllbGQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBjaGVja1ZhbGlkYXRvcik7XG4gICAgICAgIGVtYWlsRmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcbiAgICAgICAgaXNBbGxTZXQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlzQWxsU2V0ID0gZmFsc2U7XG4gICAgICAgIGVtYWlsRmllbGQuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcbiAgICAgICAgZW1haWxGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGNoZWNrVmFsaWRhdG9yKTtcbiAgICAgICAgZW1haWxGaWVsZC5zZXRDdXN0b21WYWxpZGl0eSgnUGxlYXNlIGNoZWNrIHlvdXIgZW1haWwuJyk7XG4gICAgfVxuICAgIFxuICAgIC8vIGNvbnNvbGUubG9nKHZhbGlkYXRvci5pc0VtYWlsKGVtYWlsRmllbGQudmFsdWUpKTtcbiAgICAvLyBjb25zb2xlLmxvZygnaXNBbGxTZXQnLCBpc0FsbFNldCk7XG4gICAgLy8gY29uc29sZS5sb2coJ2ludmFsaWRJbnB1dHMnLCBpbnZhbGlkSW5wdXRzKTtcbiAgICBcbiAgICBpZiAoKGludmFsaWRJbnB1dHMubGVuZ3RoID09PSAwKSAmJiAoaXNBbGxTZXQgPT09IHRydWUpKSB7XG4gICAgICAgIFxuICAgICAgICAvLyBpZiBldmVyeXRoaW5nIGlzIG9rIHBhcnNlIGVtYWlsIGRhdGEsIGNoYW5nZSB0byBmb3JtIHZhbHVlcywgc3RyaW5naWZ5IGFnYWluIGFuZCBzZW5kIGVtYWlsXG4gICAgICAgIFxuICAgICAgICBlbWFpbERhdGFQYXJzZWQucGVyc29uYWxpemF0aW9uc1swXS5keW5hbWljX3RlbXBsYXRlX2RhdGFbJ3NlZi13ZWJzaXRlLWZyb20nXSA9IGxvY2F0aW9uSG9zdDtcbiAgICAgICAgZW1haWxEYXRhUGFyc2VkLnBlcnNvbmFsaXphdGlvbnNbMF0uZHluYW1pY190ZW1wbGF0ZV9kYXRhWydzZWYtbmFtZSddID0gbmFtZUZpZWxkLnZhbHVlO1xuICAgICAgICBlbWFpbERhdGFQYXJzZWQucGVyc29uYWxpemF0aW9uc1swXS5keW5hbWljX3RlbXBsYXRlX2RhdGFbJ3NlZi1lbWFpbCddID0gZW1haWxGaWVsZC52YWx1ZTtcblxuICAgICAgICBuZXdFbWFpbERhdGEgPSBKU09OLnN0cmluZ2lmeShlbWFpbERhdGFQYXJzZWQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdFbWFpbERhdGEpO1xuICAgICAgICBcbiAgICAgICAgc2VuZEVtYWlsKCk7XG4gICAgfVxuXG4gICAgLy8gcmVzZXQgYXJyYXkgYWZ0ZXIgY2hlY2tcbiAgICBpbnZhbGlkSW5wdXRzID0gW107XG4gICAgXG59XG5cbmZ1bmN0aW9uIHNlbmRFbWFpbCgpIHtcbiAgICBcbiAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICAgIFwiYXN5bmNcIjogdHJ1ZSxcbiAgICAgICAgXCJjcm9zc0RvbWFpblwiOiB0cnVlLFxuICAgICAgICBcInVybFwiOiBcImh0dHBzOi8vYXBpLnNlbmRncmlkLmNvbS92My9tYWlsL3NlbmRcIixcbiAgICAgICAgXCJtZXRob2RcIjogXCJQT1NUXCIsXG4gICAgICAgIFwiaGVhZGVyc1wiOiB7XG4gICAgICAgICAgICBcImF1dGhvcml6YXRpb25cIjogYEJlYXJlciAke2FwaV9rZXl9YCxcbiAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicHJvY2Vzc0RhdGFcIjogZmFsc2UsXG4gICAgICAgIFwiZGF0YVwiOiBuZXdFbWFpbERhdGFcbiAgICB9XG4gICAgXG4gICAgJC5hamF4KHNldHRpbmdzKS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcycpO1xuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIH0pO1xuICAgIFxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=