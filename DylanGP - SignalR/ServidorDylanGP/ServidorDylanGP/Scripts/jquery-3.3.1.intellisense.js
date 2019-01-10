intellisense.annotate(jQuery, {
  'ajax': function() {
    /// <signature>
    ///   <summary>Perform an asynchronous HTTP (Ajax) request.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="settings" type="PlainObject">A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup(). See jQuery.ajax( settings ) below for a complete list of all settings.</param>
    ///   <returns type="jqXHR" />
    /// </signature>
    /// <signature>
    ///   <summary>Perform an asynchronous HTTP (Ajax) request.</summary>
    ///   <param name="settings" type="PlainObject">A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup().</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'ajaxPrefilter': function() {
    /// <signature>
    ///   <summary>Handle custom Ajax options or modify existing options before each request is sent and before they are processed by $.ajax().</summary>
    ///   <param name="dataTypes" type="String">An optional string containing one or more space-separated dataTypes</param>
    ///   <param name="handler(options, originalOptions, jqXHR)" type="Function">A handler to set default values for future Ajax requests.</param>
    /// </signature>
  },
  'ajaxSetup': function() {
    /// <signature>
    ///   <summary>Set default values for future Ajax requests. Its use is not recommended.</summary>
    ///   <param name="options" type="PlainObject">A set of key/value pairs that configure the default Ajax request. All options are optional.</param>
    /// </signature>
  },
  'ajaxTransport': function() {
    /// <signature>
    ///   <summary>Creates an object that handles the actual transmission of Ajax data.</summary>
    ///   <param name="dataType" type="String">A string identifying the data type to use</param>
    ///   <param name="handler(options, originalOptions, jqXHR)" type="Function">A handler to return the new transport object to use with the data type provided in the first argument.</param>
    /// </signature>
  },
  'boxModel': function() {
    /// <summary>Deprecated in jQuery 1.3 (see jQuery.support). States if the current page, in the user's browser, is being rendered using the W3C CSS Box Model.</summary>
    /// <returns type="Boolean" />
  },
  'browser': function() {
    /// <summary>Contains flags for the useragent, read from navigator.userAgent. This property was removed in jQuery 1.9 and is available only through the jQuery.migrate plugin. Please try to use feature detection instead.</summary>
    /// <returns type="PlainObject" />
  },
  'browser.version': function() {
    /// <summary>The version number of the rendering engine for the user's browser. This property was removed in jQuery 1.9 and is available only through the jQuery.migrate plugin.</summary>
    /// <returns type="String" />
  },
  'Callbacks': function() {
    /// <signature>
    ///   <summary>A multi-purpose callbacks list object that provides a powerful way to manage callback lists.</summary>
    ///   <param name="flags" type="String">An optional list of space-separated flags that change how the callback list behaves.</param>
    ///   <returns type="Callbacks" />
    /// </signature>
  },
  'contains': function() {
    /// <signature>
    ///   <summary>Check to see if a DOM element is a descendant of another DOM element.</summary>
    ///   <param name="container" type="Element">The DOM element that may contain the other element.</param>
    ///   <param name="contained" type="Element">The DOM element that may be contained by (a descendant of) the other element.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'cssHooks': function() {
    /// <summary>Hook directly into jQuery to override how particular CSS properties are retrieved or set, normalize CSS property naming, or create custom properties.</summary>
    /// <returns type="Object" />
  },
  'data': function() {
    /// <signature>
    ///   <summary>Returns value at named data store for the element, as set by jQuery.data(element, name, value), or the full data store for the element.</summary>
    ///   <param name="element" type="Element">The DOM element to query for the data.</param>
    ///   <param name="key" type="String">Name of the data stored.</param>
    ///   <returns type="Object" />
    /// </signature>
    /// <signature>
    ///   <summary>Returns value at named data store for the element, as set by jQuery.data(element, name, value), or the full data store for the element.</summary>
    ///   <param name="element" type="Element">The DOM element to query for the data.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'Deferred': function() {
    /// <signature>
    ///   <summary>A constructor function that returns a chainable utility object with methods to register multiple callbacks into callback queues, invoke callback queues, and relay the success or failure state of any synchronous or asynchronous function.</summary>
    ///   <param name="beforeStart" type="Function">A function that is called just before the constructor returns.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'dequeue': function() {
    /// <signature>
    ///   <summary>Execute the next function on the queue for the matched element.</summary>
    ///   <param name="element" type="Element">A DOM element from which to remove and execute a queued function.</param>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    /// </signature>
  },
  'each': function() {
    /// <signature>
    ///   <summary>A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function's arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.</summary>
    ///   <param name="collection" type="Object">The object or array to iterate over.</param>
    ///   <param name="callback(indexInArray, valueOfElement)" type="Function">The function that will be executed on every object.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'error': function() {
    /// <signature>
    ///   <summary>Takes a string and throws an exception containing it.</summary>
    ///   <param name="message" type="String">The message to send out.</param>
    /// </signature>
  },
  'extend': function() {
    /// <signature>
    ///   <summary>Merge the contents of two or more objects together into the first object.</summary>
    ///   <param name="target" type="Object">An object that will receive the new properties if additional objects are passed in or that will extend the jQuery namespace if it is the sole argument.</param>
    ///   <param name="object1" type="Object">An object containing additional properties to merge in.</param>
    ///   <param name="objectN" type="Object">Additional objects containing properties to merge in.</param>
    ///   <returns type="Object" />
    /// </signature>
    /// <signature>
    ///   <summary>Merge the contents of two or more objects together into the first object.</summary>
    ///   <param name="deep" type="Boolean">If true, the merge becomes recursive (aka. deep copy).</param>
    ///   <param name="target" type="Object">The object to extend. It will receive the new properties.</param>
    ///   <param name="object1" type="Object">An object containing additional properties to merge in.</param>
    ///   <param name="objectN" type="Object">Additional objects containing properties to merge in.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'fn.extend': function() {
    /// <signature>
    ///   <summary>Merge the contents of an object onto the jQuery prototype to provide new jQuery instance methods.</summary>
    ///   <param name="object" type="Object">An object to merge onto the jQuery prototype.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'get': function() {
    /// <signature>
    ///   <summary>Load data from the server using a HTTP GET request.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="data" type="">A plain object or string that is sent to the server with the request.</param>
    ///   <param name="success(data, textStatus, jqXHR)" type="Function">A callback function that is executed if the request succeeds.</param>
    ///   <param name="dataType" type="String">The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'getJSON': function() {
    /// <signature>
    ///   <summary>Load JSON-encoded data from the server using a GET HTTP request.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="data" type="PlainObject">A plain object or string that is sent to the server with the request.</param>
    ///   <param name="success(data, textStatus, jqXHR)" type="Function">A callback function that is executed if the request succeeds.</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'getScript': function() {
    /// <signature>
    ///   <summary>Load a JavaScript file from the server using a GET HTTP request, then execute it.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="success(script, textStatus, jqXHR)" type="Function">A callback function that is executed if the request succeeds.</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'globalEval': function() {
    /// <signature>
    ///   <summary>Execute some JavaScript code globally.</summary>
    ///   <param name="code" type="String">The JavaScript code to execute.</param>
    /// </signature>
  },
  'grep': function() {
    /// <signature>
    ///   <summary>Finds the elements of an array which satisfy a filter function. The original array is not affected.</summary>
    ///   <param name="array" type="Array">The array to search through.</param>
    ///   <param name="function(elementOfArray, indexInArray)" type="Function">The function to process each item against.  The first argument to the function is the item, and the second argument is the index.  The function should return a Boolean value.  this will be the global window object.</param>
    ///   <param name="invert" type="Boolean">If "invert" is false, or not provided, then the function returns an array consisting of all elements for which "callback" returns true.  If "invert" is true, then the function returns an array consisting of all elements for which "callback" returns false.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'hasData': function() {
    /// <signature>
    ///   <summary>Determine whether an element has any jQuery data associated with it.</summary>
    ///   <param name="element" type="Element">A DOM element to be checked for data.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'holdReady': function() {
    /// <signature>
    ///   <summary>Holds or releases the execution of jQuery's ready event.</summary>
    ///   <param name="hold" type="Boolean">Indicates whether the ready hold is being requested or released</param>
    /// </signature>
  },
  'inArray': function() {
    /// <signature>
    ///   <summary>Search for a specified value within an array and return its index (or -1 if not found).</summary>
    ///   <param name="value" type="Anything">The value to search for.</param>
    ///   <param name="array" type="Array">An array through which to search.</param>
    ///   <param name="fromIndex" type="Number">The index of the array at which to begin the search. The default is 0, which will search the whole array.</param>
    ///   <returns type="Number" />
    /// </signature>
  },
  'isArray': function() {
    /// <signature>
    ///   <summary>Determine whether the argument is an array.</summary>
    ///   <param name="obj" type="Object">Object to test whether or not it is an array.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'isEmptyObject': function() {
    /// <signature>
    ///   <summary>Check to see if an object is empty (contains no enumerable properties).</summary>
    ///   <param name="object" type="Object">The object that will be checked to see if it's empty.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'isFunction': function() {
    /// <signature>
    ///   <summary>Determine if the argument passed is a Javascript function object.</summary>
    ///   <param name="obj" type="PlainObject">Object to test whether or not it is a function.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'isNumeric': function() {
    /// <signature>
    ///   <summary>Determines whether its argument is a number.</summary>
    ///   <param name="value" type="PlainObject">The value to be tested.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'isPlainObject': function() {
    /// <signature>
    ///   <summary>Check to see if an object is a plain object (created using "{}" or "new Object").</summary>
    ///   <param name="object" type="PlainObject">The object that will be checked to see if it's a plain object.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'isWindow': function() {
    /// <signature>
    ///   <summary>Determine whether the argument is a window.</summary>
    ///   <param name="obj" type="PlainObject">Object to test whether or not it is a window.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'isXMLDoc': function() {
    /// <signature>
    ///   <summary>Check to see if a DOM node is within an XML document (or is an XML document).</summary>
    ///   <param name="node" type="Element">The DOM node that will be checked to see if it's in an XML document.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'makeArray': function() {
    /// <signature>
    ///   <summary>Convert an array-like object into a true JavaScript array.</summary>
    ///   <param name="obj" type="PlainObject">Any object to turn into a native Array.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'map': function() {
    /// <signature>
    ///   <summary>Translate all items in an array or object to new array of items.</summary>
    ///   <param name="array" type="Array">The Array to translate.</param>
    ///   <param name="callback(elementOfArray, indexInArray)" type="Function">The function to process each item against.  The first argument to the function is the array item, the second argument is the index in array The function can return any value. Within the function, this refers to the global (window) object.</param>
    ///   <returns type="Array" />
    /// </signature>
    /// <signature>
    ///   <summary>Translate all items in an array or object to new array of items.</summary>
    ///   <param name="arrayOrObject" type="">The Array or Object to translate.</param>
    ///   <param name="callback( value, indexOrKey )" type="Function">The function to process each item against.  The first argument to the function is the value; the second argument is the index or key of the array or object property. The function can return any value to add to the array. A returned array will be flattened into the resulting array. Within the function, this refers to the global (window) object.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'merge': function() {
    /// <signature>
    ///   <summary>Merge the contents of two arrays together into the first array.</summary>
    ///   <param name="first" type="Array">The first array to merge, the elements of second added.</param>
    ///   <param name="second" type="Array">The second array to merge into the first, unaltered.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'noConflict': function() {
    /// <signature>
    ///   <summary>Relinquish jQuery's control of the $ variable.</summary>
    ///   <param name="removeAll" type="Boolean">A Boolean indicating whether to remove all jQuery variables from the global scope (including jQuery itself).</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'noop': function() {
    /// <summary>An empty function.</summary>
  },
  'now': function() {
    /// <summary>Return a number representing the current time.</summary>
    /// <returns type="Number" />
  },
  'param': function() {
    /// <signature>
    ///   <summary>Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.</summary>
    ///   <param name="obj" type="">An array or object to serialize.</param>
    ///   <returns type="String" />
    /// </signature>
    /// <signature>
    ///   <summary>Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.</summary>
    ///   <param name="obj" type="">An array or object to serialize.</param>
    ///   <param name="traditional" type="Boolean">A Boolean indicating whether to perform a traditional "shallow" serialization.</param>
    ///   <returns type="String" />
    /// </signature>
  },
  'parseHTML': function() {
    /// <signature>
    ///   <summary>Parses a string into an array of DOM nodes.</summary>
    ///   <param name="data" type="String">HTML string to be parsed</param>
    ///   <param name="context" type="Element">Document element to serve as the context in which the HTML fragment will be created</param>
    ///   <param name="keepScripts" type="Boolean">A Boolean indicating whether to include scripts passed in the HTML string</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'parseJSON': function() {
    /// <signature>
    ///   <summary>Takes a well-formed JSON string and returns the resulting JavaScript object.</summary>
    ///   <param name="json" type="String">The JSON string to parse.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'parseXML': function() {
    /// <signature>
    ///   <summary>Parses a string into an XML document.</summary>
    ///   <param name="data" type="String">a well-formed XML string to be parsed</param>
    ///   <returns type="XMLDocument" />
    /// </signature>
  },
  'post': function() {
    /// <signature>
    ///   <summary>Load data from the server using a HTTP POST request.</summary>
    ///   <param name="url" type="String">A string containing the URL to which the request is sent.</param>
    ///   <param name="data" type="">A plain object or string that is sent to the server with the request.</param>
    ///   <param name="success(data, textStatus, jqXHR)" type="Function">A callback function that is executed if the request succeeds. Required if dataType is provided, but can be null in that case.</param>
    ///   <param name="dataType" type="String">The type of data expected from the server. Default: Intelligent Guess (xml, json, script, text, html).</param>
    ///   <returns type="jqXHR" />
    /// </signature>
  },
  'proxy': function() {
    /// <signature>
    ///   <summary>Takes a function and returns a new one that will always have a particular context.</summary>
    ///   <param name="function" type="Function">The function whose context will be changed.</param>
    ///   <param name="context" type="PlainObject">The object to which the context (this) of the function should be set.</param>
    ///   <returns type="Function" />
    /// </signature>
    /// <signature>
    ///   <summary>Takes a function and returns a new one that will always have a particular context.</summary>
    ///   <param name="context" type="PlainObject">The object to which the context of the function should be set.</param>
    ///   <param name="name" type="String">The name of the function whose context will be changed (should be a property of the context object).</param>
    ///   <returns type="Function" />
    /// </signature>
    /// <signature>
    ///   <summary>Takes a function and returns a new one that will always have a particular context.</summary>
    ///   <param name="function" type="Function">The function whose context will be changed.</param>
    ///   <param name="context" type="PlainObject">The object to which the context (this) of the function should be set.</param>
    ///   <param name="additionalArguments" type="Anything">Any number of arguments to be passed to the function referenced in the function argument.</param>
    ///   <returns type="Function" />
    /// </signature>
    /// <signature>
    ///   <summary>Takes a function and returns a new one that will always have a particular context.</summary>
    ///   <param name="context" type="PlainObject">The object to which the context of the function should be set.</param>
    ///   <param name="name" type="String">The name of the function whose context will be changed (should be a property of the context object).</param>
    ///   <param name="additionalArguments" type="Anything">Any number of arguments to be passed to the function named in the name argument.</param>
    ///   <returns type="Function" />
    /// </signature>
  },
  'queue': function() {
    /// <signature>
    ///   <summary>Manipulate the queue of functions to be executed on the matched element.</summary>
    ///   <param name="element" type="Element">A DOM element where the array of queued functions is attached.</param>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <param name="newQueue" type="Array">An array of functions to replace the current queue contents.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Manipulate the queue of functions to be executed on the matched element.</summary>
    ///   <param name="element" type="Element">A DOM element on which to add a queued function.</param>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <param name="callback()" type="Function">The new function to add to the queue.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeData': function() {
    /// <signature>
    ///   <summary>Remove a previously-stored piece of data.</summary>
    ///   <param name="element" type="Element">A DOM element from which to remove data.</param>
    ///   <param name="name" type="String">A string naming the piece of data to remove.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'sub': function() {
    /// <summary>Creates a new copy of jQuery whose properties and methods can be modified without affecting the original jQuery object.</summary>
    /// <returns type="jQuery" />
  },
  'support': function() {
    /// <summary>A collection of properties that represent the presence of different browser features or bugs. Primarily intended for jQuery's internal use; specific properties may be removed when they are no longer needed internally to improve page startup performance.</summary>
    /// <returns type="Object" />
  },
  'trim': function() {
    /// <signature>
    ///   <summary>Remove the whitespace from the beginning and end of a string.</summary>
    ///   <param name="str" type="String">The string to trim.</param>
    ///   <returns type="String" />
    /// </signature>
  },
  'type': function() {
    /// <signature>
    ///   <summary>Determine the internal JavaScript [[Class]] of an object.</summary>
    ///   <param name="obj" type="PlainObject">Object to get the internal JavaScript [[Class]] of.</param>
    ///   <returns type="String" />
    /// </signature>
  },
  'unique': function() {
    /// <signature>
    ///   <summary>Sorts an array of DOM elements, in place, with the duplicates removed. Note that this only works on arrays of DOM elements, not strings or numbers.</summary>
    ///   <param name="array" type="Array">The Array of DOM elements.</param>
    ///   <returns type="Array" />
    /// </signature>
  },
  'when': function() {
    /// <signature>
    ///   <summary>Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.</summary>
    ///   <param name="deferreds" type="Deferred">One or more Deferred objects, or plain JavaScript objects.</param>
    ///   <returns type="Promise" />
    /// </signature>
  },
});

var _1228819969 = jQuery.Callbacks;
jQuery.Callbacks = function(flags) {
var _object = _1228819969(flags);
intellisense.annotate(_object, {
  'add': function() {
    /// <signature>
    ///   <summary>Add a callback or a collection of callbacks to a callback list.</summary>
    ///   <param name="callbacks" type="">A function, or array of functions, that are to be added to the callback list.</param>
    ///   <returns type="Callbacks" />
    /// </signature>
  },
  'disable': function() {
    /// <summary>Disable a callback list from doing anything more.</summary>
    /// <returns type="Callbacks" />
  },
  'disabled': function() {
    /// <summary>Determine if the callbacks list has been disabled.</summary>
    /// <returns type="Boolean" />
  },
  'empty': function() {
    /// <summary>Remove all of the callbacks from a list.</summary>
    /// <returns type="Callbacks" />
  },
  'fire': function() {
    /// <signature>
    ///   <summary>Call all of the callbacks with the given arguments</summary>
    ///   <param name="arguments" type="Anything">The argument or list of arguments to pass back to the callback list.</param>
    ///   <returns type="Callbacks" />
    /// </signature>
  },
  'fired': function() {
    /// <summary>Determine if the callbacks have already been called at least once.</summary>
    /// <returns type="Boolean" />
  },
  'fireWith': function() {
    /// <signature>
    ///   <summary>Call all callbacks in a list with the given context and arguments.</summary>
    ///   <param name="context" type="">A reference to the context in which the callbacks in the list should be fired.</param>
    ///   <param name="args" type="">An argument, or array of arguments, to pass to the callbacks in the list.</param>
    ///   <returns type="Callbacks" />
    /// </signature>
  },
  'has': function() {
    /// <signature>
    ///   <summary>Determine whether a supplied callback is in a list</summary>
    ///   <param name="callback" type="Function">The callback to search for.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'lock': function() {
    /// <summary>Lock a callback list in its current state.</summary>
    /// <returns type="Callbacks" />
  },
  'locked': function() {
    /// <summary>Determine if the callbacks list has been locked.</summary>
    /// <returns type="Boolean" />
  },
  'remove': function() {
    /// <signature>
    ///   <summary>Remove a callback or a collection of callbacks from a callback list.</summary>
    ///   <param name="callbacks" type="">A function, or array of functions, that are to be removed from the callback list.</param>
    ///   <returns type="Callbacks" />
    /// </signature>
  },
});

return _object;
};
intellisense.redirectDefinition(jQuery.Callbacks, _1228819969);

var _731531622 = jQuery.Deferred;
jQuery.Deferred = function(func) {
var _object = _731531622(func);
intellisense.annotate(_object, {
  'always': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is either resolved or rejected.</summary>
    ///   <param name="alwaysCallbacks" type="Function">A function, or array of functions, that is called when the Deferred is resolved or rejected.</param>
    ///   <param name="alwaysCallbacks" type="Function">Optional additional functions, or arrays of functions, that are called when the Deferred is resolved or rejected.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'done': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is resolved.</summary>
    ///   <param name="doneCallbacks" type="Function">A function, or array of functions, that are called when the Deferred is resolved.</param>
    ///   <param name="doneCallbacks" type="Function">Optional additional functions, or arrays of functions, that are called when the Deferred is resolved.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'fail': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is rejected.</summary>
    ///   <param name="failCallbacks" type="Function">A function, or array of functions, that are called when the Deferred is rejected.</param>
    ///   <param name="failCallbacks" type="Function">Optional additional functions, or arrays of functions, that are called when the Deferred is rejected.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'isRejected': function() {
    /// <summary>Determine whether a Deferred object has been rejected.</summary>
    /// <returns type="Boolean" />
  },
  'isResolved': function() {
    /// <summary>Determine whether a Deferred object has been resolved.</summary>
    /// <returns type="Boolean" />
  },
  'notify': function() {
    /// <signature>
    ///   <summary>Call the progressCallbacks on a Deferred object with the given args.</summary>
    ///   <param name="args" type="Object">Optional arguments that are passed to the progressCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'notifyWith': function() {
    /// <signature>
    ///   <summary>Call the progressCallbacks on a Deferred object with the given context and args.</summary>
    ///   <param name="context" type="Object">Context passed to the progressCallbacks as the this object.</param>
    ///   <param name="args" type="Object">Optional arguments that are passed to the progressCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'pipe': function() {
    /// <signature>
    ///   <summary>Utility method to filter and/or chain Deferreds.</summary>
    ///   <param name="doneFilter" type="Function">An optional function that is called when the Deferred is resolved.</param>
    ///   <param name="failFilter" type="Function">An optional function that is called when the Deferred is rejected.</param>
    ///   <returns type="Promise" />
    /// </signature>
    /// <signature>
    ///   <summary>Utility method to filter and/or chain Deferreds.</summary>
    ///   <param name="doneFilter" type="Function">An optional function that is called when the Deferred is resolved.</param>
    ///   <param name="failFilter" type="Function">An optional function that is called when the Deferred is rejected.</param>
    ///   <param name="progressFilter" type="Function">An optional function that is called when progress notifications are sent to the Deferred.</param>
    ///   <returns type="Promise" />
    /// </signature>
  },
  'progress': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object generates progress notifications.</summary>
    ///   <param name="progressCallbacks" type="">A function, or array of functions, to be called when the Deferred generates progress notifications.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'promise': function() {
    /// <signature>
    ///   <summary>Return a Deferred's Promise object.</summary>
    ///   <param name="target" type="Object">Object onto which the promise methods have to be attached</param>
    ///   <returns type="Promise" />
    /// </signature>
  },
  'reject': function() {
    /// <signature>
    ///   <summary>Reject a Deferred object and call any failCallbacks with the given args.</summary>
    ///   <param name="args" type="Anything">Optional arguments that are passed to the failCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'rejectWith': function() {
    /// <signature>
    ///   <summary>Reject a Deferred object and call any failCallbacks with the given context and args.</summary>
    ///   <param name="context" type="Object">Context passed to the failCallbacks as the this object.</param>
    ///   <param name="args" type="Array">An optional array of arguments that are passed to the failCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'resolve': function() {
    /// <signature>
    ///   <summary>Resolve a Deferred object and call any doneCallbacks with the given args.</summary>
    ///   <param name="args" type="Anything">Optional arguments that are passed to the doneCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'resolveWith': function() {
    /// <signature>
    ///   <summary>Resolve a Deferred object and call any doneCallbacks with the given context and args.</summary>
    ///   <param name="context" type="Object">Context passed to the doneCallbacks as the this object.</param>
    ///   <param name="args" type="Array">An optional array of arguments that are passed to the doneCallbacks.</param>
    ///   <returns type="Deferred" />
    /// </signature>
  },
  'state': function() {
    /// <summary>Determine the current state of a Deferred object.</summary>
    /// <returns type="String" />
  },
  'then': function() {
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.</summary>
    ///   <param name="doneFilter" type="Function">A function that is called when the Deferred is resolved.</param>
    ///   <param name="failFilter" type="Function">An optional function that is called when the Deferred is rejected.</param>
    ///   <param name="progressFilter" type="Function">An optional function that is called when progress notifications are sent to the Deferred.</param>
    ///   <returns type="Promise" />
    /// </signature>
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.</summary>
    ///   <param name="doneCallbacks" type="Function">A function, or array of functions, called when the Deferred is resolved.</param>
    ///   <param name="failCallbacks" type="Function">A function, or array of functions, called when the Deferred is rejected.</param>
    ///   <returns type="Promise" />
    /// </signature>
    /// <signature>
    ///   <summary>Add handlers to be called when the Deferred object is resolved, rejected, or still in progress.</summary>
    ///   <param name="doneCallbacks" type="Function">A function, or array of functions, called when the Deferred is resolved.</param>
    ///   <param name="failCallbacks" type="Function">A function, or array of functions, called when the Deferred is rejected.</param>
    ///   <param name="progressCallbacks" type="Function">A function, or array of functions, called when the Deferred notifies progress.</param>
    ///   <returns type="Promise" />
    /// </signature>
  },
});

return _object;
};
intellisense.redirectDefinition(jQuery.Callbacks, _731531622);

intellisense.annotate(jQuery.Event.prototype, {
  'currentTarget': function() {
    /// <summary>The current DOM element within the event bubbling phase.</summary>
    /// <returns type="Element" />
  },
  'data': function() {
    /// <summary>An optional object of data passed to an event method when the current executing handler is bound.</summary>
    /// <returns type="Object" />
  },
  'delegateTarget': function() {
    /// <summary>The element where the currently-called jQuery event handler was attached.</summary>
    /// <returns type="Element" />
  },
  'isDefaultPrevented': function() {
    /// <summary>Returns whether event.preventDefault() was ever called on this event object.</summary>
    /// <returns type="Boolean" />
  },
  'isImmediatePropagationStopped': function() {
    /// <summary>Returns whether event.stopImmediatePropagation() was ever called on this event object.</summary>
    /// <returns type="Boolean" />
  },
  'isPropagationStopped': function() {
    /// <summary>Returns whether event.stopPropagation() was ever called on this event object.</summary>
    /// <returns type="Boolean" />
  },
  'metaKey': function() {
    /// <summary>Indicates whether the META key was pressed when the event fired.</summary>
    /// <returns type="Boolean" />
  },
  'namespace': function() {
    /// <summary>The namespace specified when the event was triggered.</summary>
    /// <returns type="String" />
  },
  'pageX': function() {
    /// <summary>The mouse position relative to the left edge of the document.</summary>
    /// <returns type="Number" />
  },
  'pageY': function() {
    /// <summary>The mouse position relative to the top edge of the document.</summary>
    /// <returns type="Number" />
  },
  'preventDefault': function() {
    /// <summary>If this method is called, the default action of the event will not be triggered.</summary>
  },
  'relatedTarget': function() {
    /// <summary>The other DOM element involved in the event, if any.</summary>
    /// <returns type="Element" />
  },
  'result': function() {
    /// <summary>The last value returned by an event handler that was triggered by this event, unless the value was undefined.</summary>
    /// <returns type="Object" />
  },
  'stopImmediatePropagation': function() {
    /// <summary>Keeps the rest of the handlers from being executed and prevents the event from bubbling up the DOM tree.</summary>
  },
  'stopPropagation': function() {
    /// <summary>Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.</summary>
  },
  'target': function() {
    /// <summary>The DOM element that initiated the event.</summary>
    /// <returns type="Element" />
  },
  'timeStamp': function() {
    /// <summary>The difference in milliseconds between the time the browser created the event and January 1, 1970.</summary>
    /// <returns type="Number" />
  },
  'type': function() {
    /// <summary>Describes the nature of the event.</summary>
    /// <returns type="String" />
  },
  'which': function() {
    /// <summary>For key or mouse events, this property indicates the specific key or button that was pressed.</summary>
    /// <returns type="Number" />
  },
});

intellisense.annotate(jQuery.fn, {
  'add': function() {
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="selector" type="String">A string representing a selector expression to find additional elements to add to the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="elements" type="Array">One or more elements to add to the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="html" type="htmlString">An HTML fragment to add to the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="jQuery object" type="jQuery object ">An existing jQuery object to add to the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add elements to the set of matched elements.</summary>
    ///   <param name="selector" type="String">A string representing a selector expression to find additional elements to add to the set of matched elements.</param>
    ///   <param name="context" type="Element">The point in the document at which the selector should begin matching; similar to the context argument of the $(selector, context) method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'addBack': function() {
    /// <signature>
    ///   <summary>Add the previous set of elements on the stack to the current set, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match the current set of elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'addClass': function() {
    /// <signature>
    ///   <summary>Adds the specified class(es) to each of the set of matched elements.</summary>
    ///   <param name="className" type="String">One or more space-separated classes to be added to the class attribute of each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Adds the specified class(es) to each of the set of matched elements.</summary>
    ///   <param name="function(index, currentClass)" type="Function">A function returning one or more space-separated class names to be added to the existing class name(s). Receives the index position of the element in the set and the existing class name(s) as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'after': function() {
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, after each element in the set of matched elements.</summary>
    ///   <param name="content" type="">HTML string, DOM element, or jQuery object to insert after each element in the set of matched elements.</param>
    ///   <param name="content" type="">One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert after each element in the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, after each element in the set of matched elements.</summary>
    ///   <param name="function(index)" type="Function">A function that returns an HTML string, DOM element(s), or jQuery object to insert after each element in the set of matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxComplete': function() {
    /// <signature>
    ///   <summary>Register a handler to be called when Ajax requests complete. This is an AjaxEvent.</summary>
    ///   <param name="handler(event, XMLHttpRequest, ajaxOptions)" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxError': function() {
    /// <signature>
    ///   <summary>Register a handler to be called when Ajax requests complete with an error. This is an Ajax Event.</summary>
    ///   <param name="handler(event, jqXHR, ajaxSettings, thrownError)" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxSend': function() {
    /// <signature>
    ///   <summary>Attach a function to be executed before an Ajax request is sent. This is an Ajax Event.</summary>
    ///   <param name="handler(event, jqXHR, ajaxOptions)" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxStart': function() {
    /// <signature>
    ///   <summary>Register a handler to be called when the first Ajax request begins. This is an Ajax Event.</summary>
    ///   <param name="handler()" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxStop': function() {
    /// <signature>
    ///   <summary>Register a handler to be called when all Ajax requests have completed. This is an Ajax Event.</summary>
    ///   <param name="handler()" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'ajaxSuccess': function() {
    /// <signature>
    ///   <summary>Attach a function to be executed whenever an Ajax request completes successfully. This is an Ajax Event.</summary>
    ///   <param name="handler(event, XMLHttpRequest, ajaxOptions)" type="Function">The function to be invoked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'all': function() {
    /// <summary>Selects all elements.</summary>
  },
  'andSelf': function() {
    /// <summary>Add the previous set of elements on the stack to the current set.</summary>
    /// <returns type="jQuery" />
  },
  'animate': function() {
    /// <signature>
    ///   <summary>Perform a custom animation of a set of CSS properties.</summary>
    ///   <param name="properties" type="PlainObject">An object of CSS properties and values that the animation will move toward.</param>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Perform a custom animation of a set of CSS properties.</summary>
    ///   <param name="properties" type="PlainObject">An object of CSS properties and values that the animation will move toward.</param>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'animated': function() {
    /// <summary>Select all elements that are in the progress of an animation at the time the selector is run.</summary>
  },
  'append': function() {
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, to the end of each element in the set of matched elements.</summary>
    ///   <param name="content" type="">DOM element, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.</param>
    ///   <param name="content" type="">One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the end of each element in the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, to the end of each element in the set of matched elements.</summary>
    ///   <param name="function(index, html)" type="Function">A function that returns an HTML string, DOM element(s), or jQuery object to insert at the end of each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'appendTo': function() {
    /// <signature>
    ///   <summary>Insert every element in the set of matched elements to the end of the target.</summary>
    ///   <param name="target" type="">A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.</param>
    ///   <returns type="jQuery" />
    /// </signaturä¬∞2†E´3©hê∑≈Ù +äÑ†áÈó‘t¸«˝h˙˛ºN`‡â9)—‘»ﬁ<)ˇä„W±8¡\Ù.€äGﬂ›ñàƒ@”‚XÛ˘l»∫Àäãã¸¨wÔèfæ©ıºX¸ ›¬ )û6V≈ÄÉ&>%—/˛˘ΩPÏˇÛÚYGr\ ¬jÈ÷„Ä/˚*∆@ß¢ 2à(èÀ∂óK∂eº¡h0@xª%¸ñ/µßNÉ5{tÿ(}£Èr[ú©âÏÎtì√øF.VœÅNçî,¢>Qz•^ûªùÏ\¿1p¸!*W≤»©^ü.ê=Œ∑ﬁﬁ¢*JÑÅ-Arπ}-ëHèñîáM»j)®N2MÉ)·,!~F&t¿êÁ,ñÕ·ë øo‡ı≠÷><]ﬁjê˝ózß{w)Ä¶öa}P˛fÍG"ˇ?eôØJ˛>πG∂v¬o’_ª GóÑw≤&4Õ≤,íŸaêÅ}ìcƒ±%T/Óf&6$Yú~é»%∏@∆…â+}:\^´Zﬁõ¯í>û˘™¡‡ÀB%4N√’*ºÎn™ø†<'ÏÁn∂|π@Î|èßø:GT
eå´ˆ≥˝^ß\‚Ç¯›íÕåùóˇﬂ∆˚íêo7Ñ±3n
eÃà¶7≈àH=4E‰>Æ®Ö∏—î&BüÔŒˆ⁄4ì1ù?2Ì*ã1) w:h)˛›c	î}2Gq¨hú|DµA∏óÚNÌUµ˘Zµ∑1óÅNV^Ö?'∞ó ïÚŸπcCRÂ1Lı≠òÊŸ,ÕÎ∂g/ÂxSdÆ{óz|ºHÉˇÃJL?.∑8ﬁ/lD¶(!óPUª"|$≥πÀõèNÑ6˝!8fõLãÊ/L'›;ßtÛ0Ít"#3‚c“∂ZnsßC¬óx◊â
∞…ﬁhÃ"K¯Öﬁ#N»e!$¡:Dk¸0X‡Qp0ôµÓèRh)B•÷öÑçêH— ,˝üÃêûU'F É—g”ôa¶]*ºé√°L
óü*«˝@,!Uz¿Õ£>çü
hïÀ‘zOznu„œtY£z¢°*«Ñvv˝û/¸”c¯æﬂˇ	[¢‡)˛çPâöŸ8î≠å¨ˇéöm˚ŒÒ°ßÑ]ê‡Sa$ ?„·+ˇ˜«É¯´áDêm˜«ﬂ?¿CU≈E’ë/‡•∆TæóÆr—”Å‡ Y`ÉÒ,~Ç îÆœó{U„C∂∆J≤µä=ª√ÅMQèxI€üµª¥èºªu∑oÉ	^§™$kˆ±“|∂Ï…√≤∂vL Ä¶//WÔÄfõCbÔ—.'y@¬Ùb$Ñµ>ÎlbG¿·|‡Ù Ù¥ì‚8gÌ⁄2˜X◊0w/ÙıÑ4πQx0! ˙6%â`ßOÊi(–ˇæ<∑GÍïOè‰%Y‚Hê·»}`0(Ç ë<·øÛ?[≠©˛> ·)Qpˇ‡_˜â:†÷–T–n	[—∫Âgqöe]ó¶¿¶Ú®»0À≥&	#Â_≤®Às¶>Ø˚˚≠⁄Íxúí—Ø∏L4t,7D|?UÒ˜îYKƒÜøÚ„≈˙`jÅ‘IJÍ≤œ˚—§ ’Nƒg=∆ø7I«¿0˙âc–/¡˚ﬁ}7yReﬂU∂Xîj´∞ú
qtÄÇ  x7¡á⁄>>†'î|∫É6%EΩ[≈•‚œÄÄ‘¡Uû`–!’`¶_~P:$+aQ|’X«∆`âb@¯¡D’@@ºÆÃã—±§¿LÄx7Ä<HÍº¯´ŸÂ“´ ·/ÀÀ£RØ&{ÎÕPh∫AòS*ÿ2° gÌ./ïRπp¸Ÿ˚Ÿµ≠èÄÅ~ƒ©¯®ºJÄ–ΩXÎ≈Ít +V¿⁄ˆ∆ï+_%0ΩG‚F_o¸‹ÅüƒkçƒÓ˛ h)áB[—∂·îüˇ ¸¥X3óˇT_KÑµTJWÎñQpñ]}:ÆK¸Éeñ7{aS¬õx∏!’YÎ’Wæ´8!	#À˚≥67ŒëâSÛ:÷ÚPcÂWr‹ÁNÓ∆çz‚~6‡¿Ä¿2^I "QP @Ÿb•sπ=Í90í=f˜◊7Ö ·(KÚù.¸≥œˆj‹ß{a(SUÂpøﬁˇÄÂk˛¸⁄ë‡≈◊óójeà	E≤g¨ô?≠É"¨êÑ1$!+T™âbP7Kôƒ9ˇä34Ôˆ¶Ö8t®|ÆOÿßôO q|•÷Ûe2·Ê‡ÁõœîVè(Ø˘|Ø≤?”ËæxSˇÒ˜ØeÎ¿:˚,◊ó¯ø◊c_åRÉ‘ΩT¸‘'É*îú)É„"D·∞∑∫ÚÚÒÛW>Lp2∞ê)“ïX£m◊9¥≤.√„¬ˇ[Çm¬Œπ[Ül%‚‚Ïä1ßjèÃ∂t≈T]n+ó1É‡ﬂ./T_b°¯ÎÛAéÏÈ”E4PaÑª+MaﬂZÕŒC„ÂCÿ™Œs[áá‚EEÚ“¸˘tí*S€Œ…´˜ß« ÌÙπ∂√NúÙb‰€¶Ç1x	Hï·*»Æ˙K∫#ØOâ¸óÍ;9(g·)^mæÔÄ≈‡œ™96¥t∫™øí~N]…YNt
l4Éi5âEﬁ™π˚VœÄı@Üßÿ<ì Ø˝¸˛+≤…fquâÇÔ®≥eÕÓ8võßøÒ‹ÏÀÖ6bRø{bòŸ ñ ∞K≤\2Ë0˛≠Q}í∑Yx7¬ ïAB>íÙ%ÿëL5ä{åòÙõeç¬ta»ú*¶c ~vê|á¡öt6¥–gÒÇvc|yÀ)§_ç˝æ¥I√©ÁΩ0œ¨tí6m3‹Â<táÙhúêöQ™h˝I'ØÏ?ú):#¸ÀdoaöVG«¶tœ˘M|˙ü≤hG€
œ⁄ÆF%xïDò"wΩxBR¢àÌúf8π]ù:]=‡ ®[áBô«ﬂ./a¬P[N4m‰ú«˛U{ß´ÓüÃÑ,ojßzE|ä+˝∂NZï ‰©∫y¡LÈq“J=ˇŸË÷vΩVe2©N§Ã7ì'Z&”·L…YÈÔ=∑Ï˛ãïÿ“Ã∏—´% Ñl
i´Ä˚UKy.∏¡ÑÄoˇ‡ÆÍÅ/ˆx∏æà≤ØLàèz÷˙O$º¬Ç¿¶√`›É ˚‚QrØbùü˝ò#@cE¡ UÀÍ≠PÆ€$—#ˆ˙â]™‚ÇÂ`¶Zi(0ê®  xB0À|=üÚøVâáøΩM8Í®∫^PÃ
k◊ÿ’BÔœÌYßÓÀ6~ókuyÉ¡ÄÚµ^ä`Î4ÇIï1Èˆ÷m·LJ%™ˇ)u£µJøè+_˙wC?ˇoÌøV¨ó’˛‘^úé/ûS5ô:(µùÌò~Õ√˛∆®»)ÿ—^2nµ*núUK«√—‰WÂ2µ£¯:óso$?EëBQ®˘0¿¿±ÇÈ˛»µÿÍ´ˇˆ3ì∫…1wï(˙”ßÏŒ•<àÅ£AL%ÑÜ^®|•’R≤Ô˝'U|¯%n§6\^ÇPBT˛Ë4ÊÄw¡‡ˇÔ†2mx‹Çˇ˝˘g‘]›pó	bP˛Ë!ŒA%T‡<G˛ÍñÛÆµG·Â_Ñ SAQ§Ç¢µC@.¯¯ …äÅáÅ)T?UÒU™ˆ˙2]ıscG¡‡ iÖ‡‘}¸ \™ix0¸ Ò(πö·%_Òa(æc ¸|Iá◊ÍB¯ê¨Âa¿:ˇö`ÚºWß¸ƒ†Ä?0(AÑÖ@}G¡-Ö ãË)b±˛∞¸UØ~√ïEƒMπTÿ≥¿¶ç¬@Ä$¡ ≈tãÔ‚™
1(Í\¬∞eÑë˜¿Èw÷Ω˜€U˙·ˆ´˜lË<`¡_PáD∫%âA0A ¿Qï’{@¯˙∑˘ˇ+|“ù ?Óâa	Z°0¸ª Àï˛*.Ñ@P	ˇˇP!è∑Ù +W†o’Xë˙ £_π6ÚS3Iú]CY{Ä ‹)ŸZÛ1ü“ÂU˝´Y≠Xzﬂõd\1¯Ìû´∏B<2™ıóÑU¸=ÛpZÚ·˜Ñ[`1UN∞a¯°˘Që4á‰/S&¯vÒﬁ÷÷á¬
±+À›å«+¯î≠W˜7îÍ:<t)“OâJ˛¨∫®ñˆhËlTJ$_~®πúmóÑ;??ﬁFB¿a$!xª˙©\Â]Ç!‘`iπ„aM¸πb}yrπ˙nlÈˇóyñmô÷<z]&^?ﬁÔq£ò|)ü´)˜)@æœ„U™M4yﬂóÍ•~À}ÈéBj`)Ñ≥TÀpÄ|5TØÆ’Ãéôlìd9˝é
x@U˚µÆU‚Ò’ó€l≥qì
{π—@UÂVÛg0ió~ﬂ¬Òcu©•©‹S ‚âùZcƒ±¸˜î	—ÙıWSˇØ/.Qıe”9>=∫òÈzØ|øÍˇJ≠M=GWÿJ◊8Ω⁄J:zøjŸ‹‚‰”‘uçVtﬁ’˝[Y…ïëDQ9ÿúóëù;Î%ÊnÈ–ß™’~ï´Ù≥˛æª´UÈæÂlúg‡ê%›‰+¸âˇq≈—BèMﬁzPXz‰¨å≥û÷òÕMñ:?ïÔø	D∞ÖÔ+aY–m. ·æ€$A tDç∂Éå}Ä˘?˝Â∆Ì√≥⁄≤ÁYé—{ínÉXy/PñîËÑ∆©bsi;≤∫ÈÙ˚ÉG◊Ñ‰_G˝à0_ÜûüŒúåº>y?≠±’Ω$∑ësÈˆT§5¿$ÑxzËf¬"ﬁøûnŒNü
¬˛˘U≈Qc Ñ1'AE-∫#ºO@g{e·øö
`–ê4ÒzΩ…nß0^]ÂÕ/>>U='K∏√GØâ›4˘Î7h»KÚ≤Ë‹Ωi Ω}÷…3¯µo_ia6∏FÃ!É)U9‚Ëï„˙%˛àéëfŒAÎ≥E¢<èÔdöL\Æﬁ_∑+Ò≥ªÜì≥;Ñ•’«=¨.–»G`}ÌñÏ«MºíºH›º⁄Ô*Ωçêû
x¶…~∂üT ƒ ≠¶Çãˆ⁄wÒ◊ÎÑ =4‚°)H˚ÙºJÁ¡ôUhÈ\XàHı 0ûä>•üHÄ¶’6aƒ <JhˇÍÇ ìAª≤™WrA.A*m:¸®¸|
ˇ‰˙ãà28}‚ÈqWÚ«–/¯ïo≠™¬Ë2OØ´˜ÊQP¯~®ÊU	‹∆çÄj±*&v2·$~qΩÉQ(ºJ®_Èf‹¸†§˚1·I¥∫W’ªwI6œ¯∏º{$ˇ ,ø&/ xºIzÂ’ﬁW	~P¨ºyª·Ú†;cçÜÃôIñ8ÿEG7e"õ'⁄≤è’|ºJóñ∆ø`âSëˇ˛ÊÔ)˛?qÉ°M‘b¢È%çÊıîƒ>/e¡ y‚µcÒˇÍ°î>.V%â%Í÷.ïo’’ƒHÀˇ=Xorhƒx¬Ä˛Ã˙q¯<	c‡Ç¡ß†ñ¸¨ƒ™Ä¨  g•†ë|>//∫$ó™≈j˝»Ÿıjã•¸Èø¸>;Vô°ƒµ` >Å˝P¸˛3¡
óUbP˜¿§›æB_¡ò˘]≠+ä‘	p|%+ |’_ Éf?2>}X1èâ¯=Ñ° ó’E‚R∏> 1xC†ÄØﬁT
1 KQG‡«√˙Tó~k˝oq‡
%É@V%´î~¨!*/™,˝™™øg}˝ˆ‹ÓõˇfŸµ£ÂﬁÏ ÿÃ)¢®!pÑ± lï™À¡Ä8Ô¿ı:†V^
0@Œ¸
ÔƒÖmHE‡0Ñ!¯˙‘º!Q¸˜¸◊ƒ¨˚~âL'∆f xH†G‡  w· èÏˇ—,yóVﬂ”_Ì%˜ãÔˇ%ˇÏÉ©ﬁ`eä˜eòIH.5*Jï!,ΩG†˛‚π"õ&÷ì∑ç:™}{dãËì'O1’Z6nò°1bç$¬*¸$ÕÃÙôÜ¨‡ï ˘v['|.Àﬁ"p®ˆ(æôÒfduc¡LX**K•◊7™ñ+˛˘9—/ÍΩõΩW·µ`zV,ç;ì§˚b‹·–¶"ózÍ:/Ví”ÂIV»˛D’“óc64zYıB<ıúñ	ºC,fC¡LX7˜ ÊYÎ›··˙†h>≥|Æ ß8¬ë√’(õnEŒg’˚˛πbõïà˚ãæ6t)Ö`†ΩÎ˝S≤ŒXù¬P!uöp∫	*°}˙ˇª4é¡˙¶⁄“]ï©N]^Ö3‘J¯â€+4ÈxíõÂ*ö≥˘ÿﬂå	≈È·âBM™ï\–Cüõhg÷?Û⁄÷JF4üBËßÍ]ˇzLÍ∂•¶-∑R”’Ñ&+˘}ıœoïEΩµZ•ÁL`ÂªµÛŸˇ€§%x˝ü¯£√ˇ[ÕüòJ?ˆz]ÿÀã‘vVglè/üTÆF¶^˚ÊÓYΩ›ßïZùmpSAõ€M+ïOÊ⁄ﬁ<øn“]m‚XçÌ¿;nIÖ∏0∂[çƒÁ˝∂'”¡MDë˙Ω ¡˚`¿t~>x:>çÁ8g·|¨H¨Í°ıÏ≥≤—‘,wî_›ì)/Ækwxs±FûÖ9Zﬁ¡xBÄ_˜âIîK4]ÿÅ≤P Ë
1"ÛB>úÆœi¸Óë∏c∏Ba∆ˆ‹äÚö>å7∫)r°Ï#µÖ„·ÍŒ_˝£SÅL"]5ù"ﬂ˛v∑◊ó+ÙUÂ?I	xDp
t&…3&¿0Ip∫I&ˇ˚ Â‡¿ØÍ%˝ˇÌR`Qü˝´ù ¡/¸ëÆfú.∑N~a¿¶òj ˜ª[’…G›…4åπÅêëÎµ˛=¶∆w¡ï qu´ç/˛°ä4QÍ>Uª·—(vØ˙¡¯À∆aõÂ√ÌlóÍˇX!ó§Ùövˇ√ª4˚ÇôÃ∫€¨∂xw¢Ø´.oîû^¨ìg‡ò)˛Vû∏}SH›‹§ÉÂv€&4v¥Ô‰%
x˚§aΩ‚g]™ûŒ”ú>Ò$OFmó*ÚØ˘ŸW|ûüªÆ⁄©W˜fëÉ0∞ `ÁÎÔ{0“¶éyW‘˚0ÿëyFJ –GâÃhé{≤ u&û‰â˙i°“"AxïÔŒõë&≥ﬂ˛ó›˜‚ÊB«˛≥f´ô¿3åª◊¬,}˝ˇ.+ˆ_<‡ÿ˚0ec‡Ç%	j†˛AÍØÕòÿá	áÂÙ|>ÖÍ.Q'Û†®åó	^+it≥◊™c@ÀÇ•C’C©`˜m´wxneùÅNΩ[.4∞|$è®êÂ d‰Áe
>‡øêHsÖﬁW[MêIW'ı_'€J)˝mÆK2«ﬁN∞KÂ◊ù>6EvÌ%ˆΩŸd≥{;Œ•’èÉÀÑê`¡@o,º~´‚Mó|JT$*ÄxXê˛?/á„‡Qèã‘\/ä2üÖ¬Qp6¬¸ˇæÆ˛´4qSü´üSÂyıV˚≈uπÀd(ß7dÏµﬁlOÿ≤»<¯∑‡~	.™áﬁ ¡Úø p@./°!	  G@‡¡¯®H¿4=D†e@– {U_©˝6^^_ÔÑ· !zyWÁï*ìﬁ¬@ï3Â’àÍÌeºä±]œ{æõgºëU≈EéA —4∞Jlh6∞t
/6≠f⁄Ÿˆ⁄ëªw¥ízf≥ºÑÅL¬%¿?—,A≠ÕÙ	(ç◊yVˇÍ[fêÑ%AÍº%	/ïKù≠€bs‚_ï(∆ÿ”ç»é⁄C6)∏¥pSƒõç2J?≥[!ÏÓå¿>DÑxwƒ£:ÁÛ∫É∏π‡⁄√’<)µ/W≥Æ¯÷Ì	º∑Fπnr!:è]Ô\Ï€rN4nU*m˛z76vVøëKq{ƒÕΩWt⁄ø˙S!Mº€ª¡’”°T	^Kë]™Ú%>>¡Í∏´◊v‚B0Ñ’¯z£›äÅé‰ç
w¡ï*ˇ˝ì‹ê»ï 4ÊÌ¥åπ¶OzF˚i=ÁN4Uzl~¯KWÒt.TïX®HÏÏ`Ë ’è}Ë™›WU“Ïlí_ﬂKcö.≤ácÛ”ÚLk4è˝.≈-ne=gΩ2RBıWôZ≤à¯ˆÌúØ˜•ê¿”Ù0É?-ñ≠rÊe`Ô‘≈2›Ò}\F¯¨=‚ı^mUÓl∏±tÊŸ?à!˚©ôπÀª´û
xó?ˇ\ˇ≤ıEπ—pñ®w˚∆Úl·hD?ÚôÃì∑Èí¶{≈ÍÛ™ïdõªˇö∆˚˚9£ ßè¬zë,K€Ï·w∑2yT»—ÚÎ≠Àú&πûåFÌ'Ù˝ú›'€läeÅOÿA7VóÜ ~—$!Yh<˛cÎ⁄„Nc≥áB`0!âAÑRÊ ªæ‘Ôt˚xafı cÍbEˇﬁIÖﬂâÖ“pC¬Ø‚ó*∏H!C_ûÂ√”É·Î¬P|˛xGâZâ%¿Ä<H7h^#6pÉ˘≈üOUâl¸4Ap#C/Ç∆Ò⁄`)ÇË6.ªêFd(újNCVEO_M˛cg˜x5€6T<Q€éÙ÷¥ì„˚“!Ù¸÷N*2Ò¯∫zFàUâﬂ‚reTÕ./Qµi_3¡òê^_K˛¢5„Ö„Í°FÒwˆ‘˙whŸ˝Õñ÷rí…Z≠ë™«˘FfRI#6Æ’.˜Zí≠›7˘ñƒFöâû¸äUÂ1Ô»‹§É˘$˛kuÍ‘y´s5≥4á§√4s=»‹÷ıﬁ≥ ovŸ{‹ﬂ6K;H¬ùÅÌØ[êê}I”9õëÉ#¢åu·L∑Gõ/oRÂ{ê^®wˆÕ+.7pèÒ€úàBù√Úø¡⁄∆ü	˜ß]ˇ¯π_÷" ¿{Ô@ˇˇÕ√≈ÂÌü√B6S>]?,dú{,¢?„&@ÁÓãlœY∑	˙x)ª.JDØzZƒ≠ä …rT‘dóè¨ó@≈÷ì|zà]£©e·’zÿÛˇUYP’K„Tt’!ú∏Ÿ‡ßa_ï‹/U±ZæK;<©%Ï∏ï¿ÁÉ¿¿bØ¿ø	J«ﬁ˝g¿rË1Ví™T%Ô_œKsÌkSö¸?+’WÇ	x¸πYtü˜Ì≥¨V82WæeÉ^æú√ÄSº™,rı¬Â|≤€˚X˜ªˇ†¿@Ç®@ Ò˘qt.™ãÅΩÔ@ÖËÆYç]í3äGg’|Iæ•¯JÍ≤Í>∞øÍG_‰ êxA¶	ÙπQwïjΩ≥ŸüÈ…lŸ;◊‰D±‡)’≥J»ˇﬂ'ÅÄ˙π`ì|£‚, »ΩJÇ>’	~ø“ˇf’
î‚jÃ©L@	^Uw˜º≥πÉá∞¿ˇ*øı†hKUoïÂ1¢¯ñi.˛„\3˘<üXxS<ÿ¸ΩE∏Ø`.'A∑Ã˝VkXxT ‘»%¿ˇØ˚GCµÅçÉ	@‘X™ xƒ°¯@7 (¸J.ƒèQ)O@ÌjRE_¸›`≈Q¥‡Ã<2˚∫ GÚÅÅ®ó~¶∑Å A®A ‚Ì/ï]ÄmP@ƒÅ'Òæ‡Çñ%Q/¿–IÚØ\ˇËëTJ≈SÌñRrËÆT´:ﬂX‹∏NÌó´ˆrÿr{ˆ2”5ü/üºªâÂ8>†⁄Ÿve FåWbÉ Sq¶ôNÉ[ºNı"5∆E‡“|Ÿ≥7¬Ò˜æ_=ñI¨ægIÔE`S˝îï+¸J=e¸Ö÷©b+ÜÇW≤€Ω◊É*VäÌ‡ó-ªªÉ*Ä˘ﬂ˚md⁄èYΩd˙ñ1§Aº]ç3™.ı¨<ïßÅKeNË´ ‡ã	>rg∆aMBæ§æ{iÍK˜¸≈u‰«ãÑ•_T™ó⁄;µG∂Ÿ[Ω Œ¶√Éﬁdçﬁº)˜lì@Í≠Õq|WíƒΩpUmõﬂZˇ÷+º∂ŸÀÎ«‹ÍÃõíﬁdŸâv˚Ìóf2®X?Ê\W2ÏæˇÊ∆ªôfR%ˆˆL∑ˇa?…YàÖÄSFçî,[$…-n˚ΩHD?˝äá¿yMñ˝O÷·¨≥ÏÁ†çî˜ˇı6›í÷!øgrM{RÕx—ÿË|yΩÓ¶◊ÀŸ—√
.é¨ó∑'öπXﬁå}ÀÃÀvßº¶Çö;íf‰L‡ÜìBëYÇYuŸAâoŸ≈v¢ÑˇòëZÄÜ]¡ﬂ8rL©t¿S¡ ¿ÄD∏xÚ‡˛¥¿S¡ ¿ÄF‚Ûœ‡¯É‡@#‡c¿p2¯»SÉ‡@"\< ø◊àÒ!G¡âº£‰œWêı>ôê©<oˆŒ˜+æ»|FL/Å√≈LŸ§EÒL	e≈ﬂ/Wè
vkpUËv˚*À≤Mál»ˇ|¿⁄Y¥ÓmÏYI8¸πq¢q®í]…xÌÓ,Ë‹‡Ã)óÔÌ™ÏbBuJÑwŒmΩ%\˙Wü>Ì{Ú…kFÑ©ŸêóÂ‡kÑ"PM=ÈΩ#ÿ.UÂÿÌöIg]$ıà—÷âk\“á¸˜ò!ÍˆaèÁˆVzÊiˇBßÖÍÅª?x~|πE©›±NM_€Œ∂r◊{Çö?≥`‰kÍÂEÆ˝ﬁ∆t˙•{~Ô)÷£D±¡Lã™Kß∫Ã∑ë£ﬂ/∑ˇZ=U¯!wËè©„FTEŒÒÛıRo™Ω?√Å≈¿÷1#¬ùÚË%[œx…xªçËóÂS=äYx(ˇZ]≥ÛxF€¬õm*QZçã«˛R`‘w~î¸ΩJ|Â`Z#EÙ˜Ì…Ob´&˛÷…Âô	[ÑüG∂ÃíZK-¡E¸dõ∏dˆ("«€tÙäG©åÛÎgÌjKØpSß˝Íœ˜˝ûïj5˙Ø(ìnÎï	m&1Êñ7.ƒ4¯S>Ÿ}˜Ωÿ”·wØïﬂÔ ¿]uNMÔ£NÚøœf\ª∑èU§·MÒëˇ=ı~óëäÒ˛ÒÉj’~_˝NÕŒª√ŸˇD∞ıü§1AÿYçb–{?gã’O™î.Ä>ÇEâa—¸KWK«Í«c’JΩSS1!â±∂N™UÔ˙fbıëß$Îd≠õ†É6êx∏v®|>÷ÏA`@C˘~ß°r´ˇ¬ıQï·ä£l_YÑ `<§K‡~¯z≤—∏Æ4°Thü˛É™—)ù`⁄ √πmô0ä¯J*≤È™.Ç^≈@áwÕ¬+’RÊc[[âüJÀãØÇÑøó˚'jüˆL›õ	á]oqÉ·L„B@!É	>ìåJ¨2<¡áÚ≈ ﬁ≠ˆ¶d–ê¢]˛A&ı•?ö3/. áÂ_∑ÚÀ;<0Í‘É¿vm»õi≤À^$ÅıµU…0‡í=Œ(UÂû´ﬂ’E√ﬁ´Qó6∑Vq¶è’]˛Ú•á „[£Q ˝=2>£Ò‚™_DM»K≠m…X¬)Ÿ–gﬂHØ≈“lìS©Ûô7ÑÛ˝Wı|?Ë≠êœ1£Ú]∂ö
~Àª,mäw}/Ìª(œ¬+¶{-ŸT^∑– Ód·–ß—:Æc ∆¸:ñ[–+*cm‡Ò°Ïä-b:Yw;Ñπ›%ü¢œÂygˇrON`1<˜¢±›ÓIm>]ÄxJUÎ2ﬂnß%Q}ˇ1Bª6ÿ…¶I∆\=(e„…Uf÷sùˇqô⁄—ÌúÚΩLI¨7ëu#ìrV≠ñëL"
} Õ2«‹!
∆¡ª∞åIûı≠⁄ΩØU(Å}"Äf’vP.M6¥‘"ÙΩƒ¶ÇõÙ∆ZM#,˚‚ôT`FÇwÑì§üíﬁø ,BAèÕ&˛ﬂ‡ŒÿF#√?çÓIò
—›÷ÁõGdù>´¸√gì»†˙ıÜ…|êÁè¸‰cògÍ•äÂ«C‡y„©Û¡M•Âˇ≠¨}4∫Â„« )–A.Ä‹¡wÛ∂ÿ·û™V¯5 °Ÿˇñ'™ÆzC!≠F:è&ë˝N´Jca±ôª÷ü=e|F4T∞ŒÒ‚.{˚cG†“”©ˇ⁄I˚~’=5ìû>#≥˘π¯B“å∑≤öÚú”Ö îwcÙ^#˚,J{‹ú·è3ô8kÿé˛É ‡kÔˇ”¢3G≤tˇãˆ£mŸ^›~´.⁄pD˚≠/´“]QSÆ|„-º)á{Ê∑∞Ê∆#õ1®MMlúul1Pa8S±rL$ü‰ùv›d˘uUœhÛd·Oû/:\_ˇÓIHßè{ú9û3<*?—âY˙w“cFs7Æ¥ÙÆ˜a4Ùì¨üﬂ√RC¡Nç∂‰;Ô⁄◊)/Z?/µÁàÒ+1¶„OıP¨GÙHK0Ï=0îGÂ…$jtâRºπcm?!'Æ13Ω;a¡¬ÖÍ‰[9á :ó	_£¯_ÒÔÓ›ø∫I<o◊ﬁ∂[e˙2
iT\]í+ΩÑûæÙª'	’“Ó›Ø‹Ù≤”_`Ô4‡“"—gëf©Xˇ ”T©]˝íàœ ÈÎ^≠R©{Ñﬁ…wZ◊‡È$&
fIº®!¯æﬁp»<¯!ø} Ù˝í4èr™…Á¢DV>ì'‹¢ﬂ{ﬁõu|<_¸uãõöM#MÆ|∫ÓÌ>>T]ùjü4 ≥Û;ÜãÏœ®£?*/ÚπÀóó}UÕ#
h≥5JWènÃÕì∑IÁ’fŸ3&rı˛P¶∆$”úŒh»)—~©˚XAÊKÀÆˇÀ≠¸æ≥3≤æ)ˇÆYq≠tÃË∆(©ÈS˜ﬁ≤_]∞+ÂŒÚ¶;’JˇÃ„Í‘∑5≤°aåf
üú™ÎT_ÎÂ*ÀãπﬂÕDu\Úâ{a
¢ÍUvU/˝p÷bJ`
thh‘œè2/,8´ÿ£l≈s˘+óQMÃ√V˛ÕÃ¸e◊2÷u·Mødì≤Õò RØˆÿ#5√Â¿{ﬂ≤œIuπ>}Uùcú≤ÙáW#ùhXc?veW>¥˝Tû/ü‡U?§mMˇ%≤ÏΩï~¸~%rIU¯¯ÎiäNîˇuàŸÌc	˘˝L3?Ìn›2	ÿÌ<h«Ÿ«ø$¬ˇÌ>áNëøEfÜ#"·yIÀ„
·}—«Dn«‰yyuı¸§ﬁu.1íZD¡/.€_Í:¬Oˇ√∏ÚˇaﬂW˛ò
’Õz∏#X|z#∆ÕW*ø§¸äL=RøÊAÑ¬_bSîÚ:3‘ÆOÒô¯j®!ØMp∂_§bZò≥˛§çZí6…ßƒ~ºwûSùt¶¨ö™ëkd!OÚª9}πÜd1#Ωﬂ\ß’‹√ÈlÔÜ€¶ƒ_ÃµcˆtÃ¬^·ëj∑™5˜MlËÏ1
]Tc∆Û§ç¥N#&S«Êí√–˜IYÔEvº*+tík¶π(ôfôßΩ¬P¢
$)Á´"dõ§B?Øi$ƒ$û€á™Z3
|j”” $ªﬂ˛2m_ΩZ√≤s≤
m∑≤K«©ú÷öÜã¸>≥ÒN…Ø¢>œ*≠≤ÔÊª√ﬁõ
f2zˇ˝åR$“Ysi–bˇèæ¶µ8√ÅÑ∞=≥€∏~Ÿ6ñüQ¯N>áÄpñjï˝Gˇ˚Ãíp2@‡áTjµv©≠ﬁ	ÅÑê.˜Ñod∆» KÃ;ƒøóyDh–ïÂ|âI¬òπpiÅäÌi‚@4ˇ’+ùÃ§† «„Â-C°|Ω ‹0õ˘ÓnS‡¬N*˙ΩÊÄ@ScKî›∂ßèS"Ú£!`˙ÅÈ ÅÚ	WÂÍÂıπpF§Öﬁ˚8h~?.ärjÓ
|‹Ï¸∫∆¥3Ù/π⁄´S¬ı ÅT˛Í>, ¡,UõAΩ8V,¸í˜H6d’êÖ6b@Î÷YˇeÕ™g(‘˙fŸwùæx0@¡Ñà?1B∏ƒä≈Ä6ÉÄD°¸ÉÍ?≈<ïRªÚ‡ôÊÚ%?∂ﬂ45
}WˇNO˙ÿû`Bìˇ˛:‡ëf'˝p<æO	`”ˆ›ﬂ¯π\Ò( |KﬂTvOKÍ#HEw÷nç=Ë;4ÁÆ˜3rÚûû…ıgAçÅùÃŸ‹ß˚=Ó±qE›·[ÔaÄ¶â‡A°ª˝ä8–Èﬁ˝ﬂ»™\≥2û˜ãÏπUY≠ﬂOã≤ÂR˚tø;Ã¢ ÷¸xSGÈÚˇàÍß∫÷üè≠˛[AJ™{>%’e Ñi˝±ö§\Ä6yZ•W‘Ã‰\äÎ4˜˘Ω⁄D  ∂î`r6õL>î,“çÀ£§a˝(≤«t©À“2è])@sÏv;V>ŒDŒ	ÇˆX{ÿ*
0êAf¬%?˝:EÏÀ∞Mì5_óxGWËñ∏HÅJ˚E˛§,›Çu;?“ïåM60‰Ÿ¥lÕëªŸ—Y^T⁄/ÙD®ÍÙ˚ ¡@,P¯pgí∂w§»ºJê∂e*≥g`∏$∆ìe;cªKxÇ5~Œ√“YèËÉÑëˆòàuu…ºDdŸxLo{
I˝áëÛÈewL.•ûqıgå¨∑a-ƒ¬`v·*:!ù[V¡Bºh— ÛÅ@∫oDòrñSpÄà/æù+∂ùéﬁ√”ßsReÃ#ˆ4£¨ñc¯àEZGÿ0¡Pìè„Tú>—!'ÔÖ˛π>ﬂ{„"\æÕ†I=]$1∂ t#|gE^ˇæ√’gˆ∞≠f>·™Ä¢Ã¯T.P©SÚw§Á‡ÕÁOÉ‡Ûy„Ñ¿>’„œâ¢ÎË⁄9]◊<H âf;‡2Áïè•àPgE Ò<‚Q•[ßN.òÿbû˙çÀ1ÏŒ√j·b&Agﬂ™%˝ºp¯*><H‡€4§≥√öhJí’[ø9{h—Jæ|TáL……î‘Qú>‰º≠ƒÓx>çø|^¿E˝?≥‘w≠•¨¸õºﬁ^‹«“/∏¯Å‡W=^8®©«âx‚Û¿˙e({ÿˇû/s∆“*,ké”áû<Æ¬*˚Øòx°ÙjGéá‰ô§j<j:ëñN=‰Ä¥Êjïç¯"$,n%w˝el%"l… ÍZyCíÍ0:tè»l|ÂV]ddaÿ€6ÖNˆ_z≥ºøºC>Ë_
Øx.*˛®Îv‹Tîù¯“)§¢–pdÉı\‘‘/x¯?k Uæ1≤Íc’å£ø∫„:é7‰´∏è4Ú˜’„|yJÑÓ:ëıdQOÿßÏÈ•c¿¶¡B∫™¶dÂ=T2Í#∏∏p‰ú∏ın&ˇ¯ÙﬁÁ¯ÚbËÒÊ68ô∂f€D3ÏÿË’E¯‹#¸`è˛ ¡Ï‚#ﬁùCí‚O.Õ∏8ÇCÂk	«ﬂ‰«Ö+¶ﬁ∏|5mÓ¨#∞I¿Rì™ÍÔ8ë9¿±¥¯¯A1]H6{qÆ¿S,ôO£B- ÿi5œfóQË˙ı@N©d˛1ˆõº≠}Ñk%Û∑Ûñ∂∑ÍıoßdŒ©a±’™ïdﬂp>Ú˙Ûîòøﬂ>%xø#?Ùo÷’IÄ∫DŸb∏ß◊VÆ>aï)8ìãÚÆÂq[òCÉP|e˙5bª8A≤¨ÆÑ0c¿¯N¡çèË	wÑBL˘Ú‡–f$¸∑ÑLõ∂‰Dkã	s¬àÍÎX˜âJ6ûTw¬<JÎxï…ˇ±≠e
ß¡1ÒÁ,û8älÉc{ﬁ
Å0ˇO∆C#ãN QJ$«bÖ≠î¡Ã$≠∂ï∆‡Ê/Í@Vº\qV{œê’ô/ÇíŒœ∆TVb˛£ø€›Œ÷©‡ŸGVÍ¥v™Û+7÷Vm¡é´J⁄Í ÿ˜÷˚AôÒë™îM¶#·œ+£ŒÓ1É‡æ¬ˆ(é±L]¡A‡Ü3 ›&/R‚ÛÁ¿]±≥_äÍÆÜJ‘ÄL√ßÃüﬂ§òÚ„ùˇ?ëD¡!{TGO∞î¬S∞∏+	•¬<â‹≠PÒˇÈyÇeÕ>ç◊Ç€ú¿›Lñ
L¬√1†H&€—Eï*>hXà2—ììı¥£˜/,0˝JñÕÔÍG]∂Œ¿a¬jú»|c´ÉﬂÈuä«ûÃ˙ΩIhËéYl˛yL*¨€â_ª”ﬁÛMbã∑`*œœ[ÀŸÙƒáÄw&zpô±‡e@†∆•ò”ııÏY—›f‡1%ÂﬁüÌ]¿t¸ ëî≈◊˝I']◊Éˇi(1ﬁ∆+Ç°∆Nú2üÈ”ÉÅïΩ‡ò|ÿÍ∫Á™ã®°@.|278¿u‡®A?™mPw¸’%wËûAê!ëÂ"√‘)á*ÉÂIàÑ§À≠∑6qõÃ™ˆ Ää·@ñ¬C(ê
.∂ïáüZF©Zw]≥ˇ/‰ûÔ⁄Ô?Î Ô*˛5∏g4ú:"%[Úˆî`€ËûˇÚ"w≥ä<êrÒ%R†:¢∞;¯∞’7tD˜<->b€É 
¡a »Ûè·=”êÒ‡%∏2àÅ*¶&Q§J*µ§%”l.√¬¡ı\‰‚·‹V∆·˛±Ç†=¿jË&äYA+¥«P¸3. uÒ≤ã»ïO%’›∂ÿ¬Ü@Ï⁄o[$Wl:ê}X.f ì•c¿ÚO±€s[ÅÎÌ·≥‡XÒCy±ú6Æn[[VÖ– øéäÍ±*=eP`†Aó∏)ÅI …–„çÅÕQ$<Ê…JyNY6`aö§ã®&;ƒ‚ÇÕéÑ–n˙≤WUí¡ä2ääQ•£I(há #∞∞Ö¶&:®ım∫OÆÃ¿aú√àò û:ßÉ¢eDBoM¿¢ˆmQÎÏ9Ö,∏|4≥¶-Fíkø»#}\˚?øR1{«Ç(Ÿ¥z
ÖiÒESÔ˙yˇ±0í¸•Y.L†≥a-&a‚â47ºA"Õâ
≈∂„x1zPÙÀ¶ãL‚:Ñ«^`	πà“›å)á∏d∂*´á¨$€s(L„/a⁄‘d»¢¶À|&x˛±˛*§ﬂı˛¯ıøWΩ‡û‰˙∂øOºıÆa€jö-¢î)’T¶K8‹©›˝çâ!(∞|˜™äÈdä]E¿£@â,ìˇÿ€ñ€Ñ⁄AicãÅ')… 'c¡4“ΩÖ∞∏}N\L˙¢≠P<&(\´T˙èÅäÅ·uø˘V®˜â¶Z†qÔ	éÂZç.U®Ãx+ﬂﬁ¬;Ñè01wb¿  V2A3LzH\F”R"K:êÕ•xVØVıQ;Söü™í´(∞îœ:ùS¯Â‰¨b‚e ﬁn´9P úûÌÉøU"Ulô^ùR°8tYÕ[ƒ†¯ ¿RY4zV•`⁄Ω…Êÿ¿2_ÉØœ@;ûJmoa®MπÒWüÎƒ‡@îé≈Î+‡Òı]N©Ÿq\¡äÀÂZ¿v.Kâ¯Õ:‰ÿ…KUﬁ◊r Q£Çÿ@{ÏATÿ∆-óÉòˇ"ˇ∫l†äY¢nˆx7	Òã7JÖ")M˘Pñ4ªÄO◊·ÕNˆÉ§8“·J
]|-ç≥3	öß@\=XkPQ†∂Z‚€ÄMü"à◊r[Jí!A•0v:´Ô\ëÜ¸w\ıA◊ºæ÷eç¬ËEYú@*n“•ﬂÊ≥~7Ä]±∏(åﬂ\Õ¢Ö\∏ -`œ†§⁄ lÑ°Œ›º|Äîâ{Ëâ\±rG5‹cï%_*ﬂ≈˙—œÃåòŸ”î?¢C˝ r`" Ì£ªÙ2â°⁄∂+ñº©J]eÇ‚~íì€k˛Ï˙` B¬<DÚ/ “èÇÁgHÚ€í6îèãø1í»ı#?1œXîTÈ8∏‰Ö'ú6!*rD—ZéƒêBQ©4„›çÇ8•öïiD—¸@I»œzéÁ'USz93°V∏?°RÓéS1ñíkÍí”»ÅÙegt0éˆz¬(˚R¡€	%M(mòﬂ˜Ï^á4W'ÄèOm$UePÄö’—m}ëá
+?}¿2^1#&¡7“ oÈ√Ò¡´ÎFÒ›0jÿÉ‡HR√π
4 °ç•ZÂ…_Ôj∫ã™n`Gtÿ5¥?!Èntî‡ñˆ¬òÆE\!tioÌœrà≤∫x7“™^:ëÃ≤©7∏bº‡◊˝=:ºX/·"/Ci√{ ÆÎ8I@_Ω ´õÄ*SE'±Ç0zk†Õ∞Ê/E4÷:â≤‚Pa§UzƒÀEÌñàZ‘∑fÍM≥,rÈzuo¨.ﬂ©K”¬˙ﬂF≈L üŸîYl‡zÑMW#¢[F£&jFDPı¥Â t
¢K@’∂fu˚œÛ≈cn:Çßzo˙0¶“ànYJ±<Êg´U¿ôÍùˆ—“_y¶ ¸‚ LÕ 0•‹˝‚Ê»™(’Ω¢Ä  @@Ω≥m ·íu˜¥Rg¡*XUx‰˜¯gÛË?∑WÂtÏòeπòp)≠k`ôäD⁄ó*øﬂ§[>”ÔD–˘Ó≠ªu+‹–t‡I)EÃ9⁄	ùÿ¥«ÇøÄ‘D∞%{>d≤»ùﬁpÉêí°ˆ®uÇJÊ≤ªhû≤ê¶∏LO/ÙÔë’–†˜áˇ¯Fﬁ®ÿÊâs4ø∂	$¸÷ÅL%ÅGz"$/*˘2ÈÒÄ√«.&Ÿæ˝¸ÇÏÉ>I¨ﬂ¯∏ïzaUÏê¨;í¸P`F≤ßn¡y»J&pØàî`çyê∑∏»¶8ÍG'+,@±wÖÂ@·¸¿?ˇYt4"î
Q!∫F%I
óW"BØXgµ““á	ÛÙ…òaiS¨˝Ïw±gKYı«ØﬂSKZÂ7ù	ÛˆØ“øs]Ã7Oi>v•˙WÎ‹Vßÿ8®´«~ˇ+ÏÀNÍUÎªK|:PcË,¶€t£√BÊ∫¥…UΩÖJ ÃÔûæÜïı'–°?z˝Ï7µ∫÷™n	ï©áFΩ'œ´l{ΩÙ*’›+*È˙b/“kÉ≠ZöT©¡Ö
ìÍní÷Æ˘SÆ©¶á™‹5O°æÜÂı,ı´WÜˆÍP—6Lñªó–üWTÂÙ5Tì>{U'Jl=|˜ÃxÚﬁåHë"Dâf¸µ{´}J1^¸FGˇ…ÃÄÂJÕ;¨Ù«;≠iÒ…z`Fú®jìﬁÑÙ≤◊4>~9äXÉ:ŒÅ†Å>xr(=ƒÌiâ>ä_ÇïµÓÊÂ9pN•Õ7w≤«ßR@¡≠†MÄ—R°í§áwˆMÆ±ë£!Ωá˜‘^Ú˚‚}H3ú@ëñÌ≠Zo	π/[µf5S∂Ó…ô«#[ÂÊ7k÷å_o√Æ» 'aºåkoyL°@hŒ=æ≥L≈+á$Ue≠ñ_6Ö ıÔe&ÊùBƒ/vD¡´ÌÓ¸«§ùD.$t÷XzíP| `,<ñ÷Ó)áòçXÏ‡Ï≈ØÙë]∫	Î¥+> ì%ÚÕ%O<LN‡˛8Û∂√∑QàûùÍQDß…ù;9¿e˝ï⁄|	XE&éÒ=ª•xíÚ©‰Ï
ΩkŸ^2GgLqúı∞Dk$7ÓtN˛:ïm†6—G§ÕÑ·-»Â˘¿k∏†`ÍZcê§#ôÏ√BÜKW⁄J›,ª#&∞	çÇM2fÿ∏hCq>À4qs◊ZΩ˘]∏èˆ®|9rÀ|¬´4Æ$J7πb-öÀF1Åp"óÍbM˙àSÅE~F…5®Ü±vBΩÀ5uTIúKfÌ‡> 02Î∑€.o#2f	=;§G4VqÒÇLá¸À>ÿë|†√2¥¥UÖó3[ryÚµz⁄X¿6qqtkx•ÉVÃîX˚(Ì^?õ∏»Í˘Ù¯ó#∏é£∫ëÓ˚¢H„ñ¥:ÖâÔ&ÛÃTíC9∑÷Mr™`7ùTËÿ∂5≤˛®>ÄÊÓ¢£k-*êÈ¶˘~on.Œ›,Q›cOö1	.¶4áÙôæNﬁêíâŒÿ7ì¬>€+Kﬂú®N¯áC’øﬁ∆Ão∫∏∆˜±:CP0õÆ3Ê“è?˝“Û„ÓæˇºËsN{\“#Å—n√◊∫ÈTÜS™‘4uWS‡bª{è
+ÍÔíÉWÇøÈ†m8≠ÄärÕÅ‘¿Èç3¡≤Ö¸U  @SéùFÓ··jüõƒYŸ˛íhB´ñ¯MÒ'Ωz∂Ó“'hY.V	`íÌ¢(FÊü%cMÆl„#bÓÇó∏Ç“m≥[="Õ$´¡Ånº00dc     ∂Tœ01wb¿  I,˜t#§mıù◊µÂ;ˆY˜Ÿë~Œå√ié±Ñﬂ!∑ﬁ/Ì´˙$êç-Ãwﬂ≤/$2ÏË≤J ^Ç–b‘Æ›~]øÉGÃ∞◊œûØ—ïpÅ◊))F%X≥-Ò˛Ã!!_Øn:[sà›ˆrœ_ÅEn—’Â,≤ÑêL«%XË@¯ ÄRá∑.Aâ]«S_ÆMBçá’Ë™®£É™ÿ)ÙÆ(¢ŸÙ!˛z˜i⁄˙√]‘∆b“ë‘4h
ºÑƒ`wJ;3[‡-ﬁQ>∞)”«|‰&áWi‡ì±¬ ÜÑ„xπ≥G˛¯í\Ö˘ä4&N#2Ã °ZVBl‹Q∑®±÷#]ojqÛ1ƒ 8$Ñs3KõÃQ-s¬‚Ì-E«Ô{9ˆÂ#Â;ΩVÜx‘°µÜ£dH˜ÊµDä]√§Ùªõµ(	,ì8πÎÃJ8B)£˘¬È∆!ΩÌÜ∂K≥S?ÕQâÿE∫÷"îpæ^›z‘°Lè†?ˇ<=~By(≥”‰ÆúUElD|Lö8> ¿≤=xvÎ÷æôSãè∞á@
©Ω÷'¢ã®Q5#©“‹≤6∏’¢™é€°a·j⁄xf7kúq-ÕåèÊÍ˚kÄ+èuπ«§X∫#˛ìæJ‡ç¥ˆ‰{™ÌΩpÚ&Z{±:‡N$”\«†C⁄eáˇÿ¿ú
)Xm—Ñ9üóùﬁ÷°„?ı	πÜ7í∫X~ÌÜ∑CÙ‹4 -	£ŒÜy2Ü›QΩmFüë©ãå6¥¶Ω,Ω_ﬁu‰*Cµv’\¨ª•˜5Í¢ΩZbêA2bi4Ÿ‡ÊSlfB™∆=ˇ¨˜íÀÜAﬁ^ßªáÊ'^¢û÷”d¯y∞»ÔékAÑQ6JƒPN‡…  ∑ÕˆdËBËòÚò·ögÀ~{ìDÌ/‘”`Swô¬@·¸¿?ˇYt0&íà—QöF%Hâ◊W#S|ÙﬂjT»•Ö^*÷	›UT}a2ïKü\J˘˚ßœ´æÑ˝Ï4œü=Ö^íß”ü¶sPd4∞”9U
î7¥’=}ÃÙVZ≈ÖÍXix;ÁZt°æTπızPl°NôÕmâïf|È”¨‘ü>}ù-75°Bÿ2ö$ƒ_WKJ€Á4˙u5k
°>ÆÍ(OÈXK+Ë+∫T˘˙Wœ»”DÊW±´Q∞ô2g †◊s
∂Æ“√ßZ¬®O£∫~â”õ¶√¶ôYW–üBÕW[Íjï:L˙ön_¡~ôÛ‰–ßB|üø2ﬁê@Å€Ó“‡ˆâæN$º·E¯(L√?£:Úﬂby/µGÁU6Y∏m‹≠ÑH‡ÕvMóªÍÉ•ukÄ⁄O å¢ô
'¶ëP  ˜Õm⁄(Œs68ˆ Q°„û∑}#k88≈7Ü~
Eèo+c±ó±eú¿°‘m˝òîäPÚè-^kÈ¢JçM÷:o‹I€oâd-#S¯&Ë5ÁŒió ÇœqP[œ¯hπ˝√^ìã…\ç]Ç$îNæ¢≠ôú7¿∫øÊ„?OeC≥NAE∫0¢ëT±'£÷âﬂ∑ê∏w/“ÊUwèò–ŸêPvŒÖíTìi’˚ì¢ëπ¶Ÿq∞†>  Êµnœ%RA"ß5πqöµÖE3ƒLπ^ ?C-Ä&IÈˆ=}¥ôx4∆ü#wú√ô‚˛¯å∞áKè‰,áåõpe="PlainObject">An object of property-value pairs to set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'data': function() {
    /// <signature>
    ///   <summary>Store arbitrary data associated with the matched elements.</summary>
    ///   <param name="key" type="String">A string naming the piece of data to set.</param>
    ///   <param name="value" type="Object">The new data value; it can be any Javascript type including Array or Object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Store arbitrary data associated with the matched elements.</summary>
    ///   <param name="obj" type="Object">An object of key-value pairs of data to update.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'dblclick': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "dblclick" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "dblclick" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'delay': function() {
    /// <signature>
    ///   <summary>Set a timer to delay execution of subsequent items in the queue.</summary>
    ///   <param name="duration" type="Number">An integer indicating the number of milliseconds to delay execution of the next item in the queue.</param>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'delegate': function() {
    /// <signature>
    ///   <summary>Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector to filter the elements that trigger the event.</param>
    ///   <param name="eventType" type="String">A string containing one or more space-separated JavaScript event types, such as "click" or "keydown," or custom event names.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector to filter the elements that trigger the event.</param>
    ///   <param name="eventType" type="String">A string containing one or more space-separated JavaScript event types, such as "click" or "keydown," or custom event names.</param>
    ///   <param name="eventData" type="Object">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to one or more events for all elements that match the selector, now or in the future, based on a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector to filter the elements that trigger the event.</param>
    ///   <param name="events" type="PlainObject">A plain object of one or more event types and functions to execute for them.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'dequeue': function() {
    /// <signature>
    ///   <summary>Execute the next function on the queue for the matched elements.</summary>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'descendant': function() {
    /// <signature>
    ///   <summary>Selects all elements that are descendants of a given ancestor.</summary>
    ///   <param name="ancestor" type="String">Any valid selector.</param>
    ///   <param name="descendant" type="String">A selector to filter the descendant elements.</param>
    /// </signature>
  },
  'detach': function() {
    /// <signature>
    ///   <summary>Remove the set of matched elements from the DOM.</summary>
    ///   <param name="selector" type="String">A selector expression that filters the set of matched elements to be removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'die': function() {
    /// <signature>
    ///   <summary>Remove event handlers previously attached using .live() from the elements.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or keydown.</param>
    ///   <param name="handler" type="String">The function that is no longer to be executed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove event handlers previously attached using .live() from the elements.</summary>
    ///   <param name="events" type="PlainObject">A plain object of one or more event types, such as click or keydown and their corresponding functions that are no longer to be executed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'disabled': function() {
    /// <summary>Selects all elements that are disabled.</summary>
  },
  'each': function() {
    /// <signature>
    ///   <summary>Iterate over a jQuery object, executing a function for each matched element.</summary>
    ///   <param name="function(index, Element)" type="Function">A function to execute for each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'element': function() {
    /// <signature>
    ///   <summary>Selects all elements with the given tag name.</summary>
    ///   <param name="element" type="String">An element to search for. Refers to the tagName of DOM nodes.</param>
    /// </signature>
  },
  'empty': function() {
    /// <summary>Select all elements that have no children (including text nodes).</summary>
  },
  'enabled': function() {
    /// <summary>Selects all elements that are enabled.</summary>
  },
  'end': function() {
    /// <summary>End the most recent filtering operation in the current chain and return the set of matched elements to its previous state.</summary>
    /// <returns type="jQuery" />
  },
  'eq': function() {
    /// <signature>
    ///   <summary>Select the element at index n within the matched set.</summary>
    ///   <param name="index" type="Number">Zero-based index of the element to match.</param>
    /// </signature>
    /// <signature>
    ///   <summary>Select the element at index n within the matched set.</summary>
    ///   <param name="-index" type="Number">Zero-based index of the element to match, counting backwards from the last element.</param>
    /// </signature>
  },
  'error': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "error" JavaScript event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "error" JavaScript event.</summary>
    ///   <param name="eventData" type="Object">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'even': function() {
    /// <summary>Selects even elements, zero-indexed.  See also odd.</summary>
  },
  'fadeIn': function() {
    /// <signature>
    ///   <summary>Display the matched elements by fading them to opaque.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display the matched elements by fading them to opaque.</summary>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display the matched elements by fading them to opaque.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'fadeOut': function() {
    /// <signature>
    ///   <summary>Hide the matched elements by fading them to transparent.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Hide the matched elements by fading them to transparent.</summary>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Hide the matched elements by fading them to transparent.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'fadeTo': function() {
    /// <signature>
    ///   <summary>Adjust the opacity of the matched elements.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="opacity" type="Number">A number between 0 and 1 denoting the target opacity.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Adjust the opacity of the matched elements.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="opacity" type="Number">A number between 0 and 1 denoting the target opacity.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'fadeToggle': function() {
    /// <signature>
    ///   <summary>Display or hide the matched elements by animating their opacity.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display or hide the matched elements by animating their opacity.</summary>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'file': function() {
    /// <summary>Selects all elements of type file.</summary>
  },
  'filter': function() {
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that match the selector or pass the function's test.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match the current set of elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that match the selector or pass the function's test.</summary>
    ///   <param name="function(index)" type="Function">A function used as a test for each element in the set. this is the current DOM element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that match the selector or pass the function's test.</summary>
    ///   <param name="element" type="Element">An element to match the current set of elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that match the selector or pass the function's test.</summary>
    ///   <param name="jQuery object" type="Object">An existing jQuery object to match the current set of elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'find': function() {
    /// <signature>
    ///   <summary>Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.</summary>
    ///   <param name="jQuery object" type="Object">A jQuery object to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.</summary>
    ///   <param name="element" type="Element">An element to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'finish': function() {
    /// <signature>
    ///   <summary>Stop the currently-running animation, remove all queued animations, and complete all animations for the matched elements.</summary>
    ///   <param name="queue" type="String">The name of the queue in which to stop animations.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'first': function() {
    /// <summary>Selects the first matched element.</summary>
  },
  'first-child': function() {
    /// <summary>Selects all elements that are the first child of their parent.</summary>
  },
  'first-of-type': function() {
    /// <summary>Selects all elements that are the first among siblings of the same element name.</summary>
  },
  'focus': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "focus" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "focus" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="Object">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'focusin': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "focusin" event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "focusin" event.</summary>
    ///   <param name="eventData" type="Object">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'focusout': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "focusout" JavaScript event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "focusout" JavaScript event.</summary>
    ///   <param name="eventData" type="Object">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'get': function() {
    /// <signature>
    ///   <summary>Retrieve one of the DOM elements matched by the jQuery object.</summary>
    ///   <param name="index" type="Number">A zero-based integer indicating which element to retrieve.</param>
    ///   <returns type="Element" />
    /// </signature>
  },
  'gt': function() {
    /// <signature>
    ///   <summary>Select all elements at an index greater than index within the matched set.</summary>
    ///   <param name="index" type="Number">Zero-based index.</param>
    /// </signature>
    /// <signature>
    ///   <summary>Select all elements at an index greater than index within the matched set.</summary>
    ///   <param name="-index" type="Number">Zero-based index, counting backwards from the last element.</param>
    /// </signature>
  },
  'has': function() {
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Reduce the set of matched elements to those that have a descendant that matches the selector or DOM element.</summary>
    ///   <param name="contained" type="Element">A DOM element to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'hasClass': function() {
    /// <signature>
    ///   <summary>Determine whether any of the matched elements are assigned the given class.</summary>
    ///   <param name="className" type="String">The class name to search for.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'header': function() {
    /// <summary>Selects all elements that are headers, like h1, h2, h3 and so on.</summary>
  },
  'height': function() {
    /// <signature>
    ///   <summary>Set the CSS height of every matched element.</summary>
    ///   <param name="value" type="">An integer representing the number of pixels, or an integer with an optional unit of measure appended (as a string).</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the CSS height of every matched element.</summary>
    ///   <param name="function(index, height)" type="Function">A function returning the height to set. Receives the index position of the element in the set and the old height as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'hidden': function() {
    /// <summary>Selects all elements that are hidden.</summary>
  },
  'hide': function() {
    /// <signature>
    ///   <summary>Hide the matched elements.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Hide the matched elements.</summary>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Hide the matched elements.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'hover': function() {
    /// <signature>
    ///   <summary>Bind two handlers to the matched elements, to be executed when the mouse pointer enters and leaves the elements.</summary>
    ///   <param name="handlerIn(eventObject)" type="Function">A function to execute when the mouse pointer enters the element.</param>
    ///   <param name="handlerOut(eventObject)" type="Function">A function to execute when the mouse pointer leaves the element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'html': function() {
    /// <signature>
    ///   <summary>Set the HTML contents of each element in the set of matched elements.</summary>
    ///   <param name="htmlString" type="htmlString">A string of HTML to set as the content of each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the HTML contents of each element in the set of matched elements.</summary>
    ///   <param name="function(index, oldhtml)" type="Function">A function returning the HTML content to set. Receives the           index position of the element in the set and the old HTML value as arguments.           jQuery empties the element before calling the function;           use the oldhtml argument to reference the previous content.           Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'id': function() {
    /// <signature>
    ///   <summary>Selects a single element with the given id attribute.</summary>
    ///   <param name="id" type="String">An ID to search for, specified via the id attribute of an element.</param>
    /// </signature>
  },
  'image': function() {
    /// <summary>Selects all elements of type image.</summary>
  },
  'index': function() {
    /// <signature>
    ///   <summary>Search for a given element from among the matched elements.</summary>
    ///   <param name="selector" type="String">A selector representing a jQuery collection in which to look for an element.</param>
    ///   <returns type="Number" />
    /// </signature>
    /// <signature>
    ///   <summary>Search for a given element from among the matched elements.</summary>
    ///   <param name="element" type="">The DOM element or first element within the jQuery object to look for.</param>
    ///   <returns type="Number" />
    /// </signature>
  },
  'init': function() {
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression</param>
    ///   <param name="context" type="">A DOM Element, Document, or jQuery to use as context</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="element" type="Element">A DOM element to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="elementArray" type="Array">An array containing a set of DOM elements to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="object" type="PlainObject">A plain object to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="jQuery object" type="PlainObject">An existing jQuery object to clone.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'innerHeight': function() {
    /// <summary>Get the current computed height for the first element in the set of matched elements, including padding but not border.</summary>
    /// <returns type="Number" />
  },
  'innerWidth': function() {
    /// <summary>Get the current computed width for the first element in the set of matched elements, including padding but not border.</summary>
    /// <returns type="Number" />
  },
  'input': function() {
    /// <summary>Selects all input, textarea, select and button elements.</summary>
  },
  'insertAfter': function() {
    /// <signature>
    ///   <summary>Insert every element in the set of matched elements after the target.</summary>
    ///   <param name="target" type="">A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted after the element(s) specified by this parameter.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'insertBefore': function() {
    /// <signature>
    ///   <summary>Insert every element in the set of matched elements before the target.</summary>
    ///   <param name="target" type="">A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted before the element(s) specified by this parameter.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'is': function() {
    /// <signature>
    ///   <summary>Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="Boolean" />
    /// </signature>
    /// <signature>
    ///   <summary>Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.</summary>
    ///   <param name="function(index)" type="Function">A function used as a test for the set of elements. It accepts one argument, index, which is the element's index in the jQuery collection.Within the function, this refers to the current DOM element.</param>
    ///   <returns type="Boolean" />
    /// </signature>
    /// <signature>
    ///   <summary>Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.</summary>
    ///   <param name="jQuery object" type="Object">An existing jQuery object to match the current set of elements against.</param>
    ///   <returns type="Boolean" />
    /// </signature>
    /// <signature>
    ///   <summary>Check the current matched set of elements against a selector, element, or jQuery object and return true if at least one of these elements matches the given arguments.</summary>
    ///   <param name="element" type="Element">An element to match the current set of elements against.</param>
    ///   <returns type="Boolean" />
    /// </signature>
  },
  'jquery': function() {
    /// <summary>A string containing the jQuery version number.</summary>
    /// <returns type="String" />
  },
  'keydown': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "keydown" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "keydown" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'keypress': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "keypress" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "keypress" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'keyup': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "keyup" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "keyup" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'lang': function() {
    /// <signature>
    ///   <summary>Selects all elements of the specified language.</summary>
    ///   <param name="language" type="String">A language code.</param>
    /// </signature>
  },
  'last': function() {
    /// <summary>Selects the last matched element.</summary>
  },
  'last-child': function() {
    /// <summary>Selects all elements that are the last child of their parent.</summary>
  },
  'last-of-type': function() {
    /// <summary>Selects all elements that are the last among siblings of the same element name.</summary>
  },
  'length': function() {
    /// <summary>The number of elements in the jQuery object.</summary>
    /// <returns type="Number" />
  },
  'live': function() {
    /// <signature>
    ///   <summary>Attach an event handler for all elements which match the current selector, now and in the future.</summary>
    ///   <param name="events" type="String">A string containing a JavaScript event type, such as "click" or "keydown." As of jQuery 1.4 the string can contain multiple, space-separated event types or custom event names.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach an event handler for all elements which match the current selector, now and in the future.</summary>
    ///   <param name="events" type="String">A string containing a JavaScript event type, such as "click" or "keydown." As of jQuery 1.4 the string can contain multiple, space-separated event types or custom event names.</param>
    ///   <param name="data" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach an event handler for all elements which match the current selector, now and in the future.</summary>
    ///   <param name="events" type="PlainObject">A plain object of one or more JavaScript event types and functions to execute for them.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'load': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "load" JavaScript event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "load" JavaScript event.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'lt': function() {
    /// <signature>
    ///   <summary>Select all elements at an index less than index within the matched set.</summary>
    ///   <param name="index" type="Number">Zero-based index.</param>
    /// </signature>
    /// <signature>
    ///   <summary>Select all elements at an index less than index within the matched set.</summary>
    ///   <param name="-index" type="Number">Zero-based index, counting backwards from the last element.</param>
    /// </signature>
  },
  'map': function() {
    /// <signature>
    ///   <summary>Pass each element in the current matched set through a function, producing a new jQuery object containing the return values.</summary>
    ///   <param name="callback(index, domElement)" type="Function">A function object that will be invoked for each element in the current set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mousedown': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mousedown" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mousedown" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseenter': function() {
    /// <signature>
    ///   <summary>Bind an event handler to be fired when the mouse enters an element, or trigger that handler on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to be fired when the mouse enters an element, or trigger that handler on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseleave': function() {
    /// <signature>
    ///   <summary>Bind an event handler to be fired when the mouse leaves an element, or trigger that handler on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to be fired when the mouse leaves an element, or trigger that handler on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mousemove': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mousemove" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mousemove" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseout': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseout" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseout" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseover': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseover" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseover" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'mouseup': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseup" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "mouseup" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'multiple': function() {
    /// <signature>
    ///   <summary>Selects the combined results of all the specified selectors.</summary>
    ///   <param name="selector1" type="String">Any valid selector.</param>
    ///   <param name="selector2" type="String">Another valid selector.</param>
    ///   <param name="selectorN" type="String">As many more valid selectors as you like.</param>
    /// </signature>
  },
  'next': function() {
    /// <signature>
    ///   <summary>Get the immediately following sibling of each element in the set of matched elements. If a selector is provided, it retrieves the next sibling only if it matches that selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'next adjacent': function() {
    /// <signature>
    ///   <summary>Selects all next elements matching "next" that are immediately preceded by a sibling "prev".</summary>
    ///   <param name="prev" type="String">Any valid selector.</param>
    ///   <param name="next" type="String">A selector to match the element that is next to the first selector.</param>
    /// </signature>
  },
  'next siblings': function() {
    /// <signature>
    ///   <summary>Selects all sibling elements that follow after the "prev" element, have the same parent, and match the filtering "siblings" selector.</summary>
    ///   <param name="prev" type="String">Any valid selector.</param>
    ///   <param name="siblings" type="String">A selector to filter elements that are the following siblings of the first selector.</param>
    /// </signature>
  },
  'nextAll': function() {
    /// <signature>
    ///   <summary>Get all following siblings of each element in the set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'nextUntil': function() {
    /// <signature>
    ///   <summary>Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to indicate where to stop matching following sibling elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get all following siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object passed.</summary>
    ///   <param name="element" type="Element">A DOM node or jQuery object indicating where to stop matching following sibling elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'not': function() {
    /// <signature>
    ///   <summary>Remove elements from the set of matched elements.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove elements from the set of matched elements.</summary>
    ///   <param name="elements" type="Array">One or more DOM elements to remove from the matched set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove elements from the set of matched elements.</summary>
    ///   <param name="function(index)" type="Function">A function used as a test for each element in the set. this is the current DOM element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove elements from the set of matched elements.</summary>
    ///   <param name="jQuery object" type="PlainObject">An existing jQuery object to match the current set of elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'nth-child': function() {
    /// <signature>
    ///   <summary>Selects all elements that are the nth-child of their parent.</summary>
    ///   <param name="index" type="String">The index of each child to match, starting with 1, the string even or odd, or an equation ( eg. :nth-child(even), :nth-child(4n) )</param>
    /// </signature>
  },
  'nth-last-child': function() {
    /// <signature>
    ///   <summary>Selects all elements that are the nth-child of their parent, counting from the last element to the first.</summary>
    ///   <param name="index" type="String">The index of each child to match, starting with the last one (1), the string even or odd, or an equation ( eg. :nth-last-child(even), :nth-last-child(4n) )</param>
    /// </signature>
  },
  'nth-last-of-type': function() {
    /// <signature>
    ///   <summary>Selects all elements that are the nth-child of their parent, counting from the last element to the first.</summary>
    ///   <param name="index" type="String">The index of each child to match, starting with the last one (1), the string even or odd, or an equation ( eg. :nth-last-of-type(even), :nth-last-of-type(4n) )</param>
    /// </signature>
  },
  'nth-of-type': function() {
    /// <signature>
    ///   <summary>Selects all elements that are the nth child of their parent in relation to siblings with the same element name.</summary>
    ///   <param name="index" type="String">The index of each child to match, starting with 1, the string even or odd, or an equation ( eg. :nth-of-type(even), :nth-of-type(4n) )</param>
    /// </signature>
  },
  'odd': function() {
    /// <summary>Selects odd elements, zero-indexed.  See also even.</summary>
  },
  'off': function() {
    /// <signature>
    ///   <summary>Remove an event handler.</summary>
    ///   <param name="events" type="String">One or more space-separated event types and optional namespaces, or just namespaces, such as "click", "keydown.myPlugin", or ".myPlugin".</param>
    ///   <param name="selector" type="String">A selector which should match the one originally passed to .on() when attaching event handlers.</param>
    ///   <param name="handler(eventObject)" type="Function">A handler function previously attached for the event(s), or the special value false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove an event handler.</summary>
    ///   <param name="events" type="PlainObject">An object where the string keys represent one or more space-separated event types and optional namespaces, and the values represent handler functions previously attached for the event(s).</param>
    ///   <param name="selector" type="String">A selector which should match the one originally passed to .on() when attaching event handlers.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'offset': function() {
    /// <signature>
    ///   <summary>Set the current coordinates of every element in the set of matched elements, relative to the document.</summary>
    ///   <param name="coordinates" type="PlainObject">An object containing the properties top and left, which are integers indicating the new top and left coordinates for the elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the current coordinates of every element in the set of matched elements, relative to the document.</summary>
    ///   <param name="function(index, coords)" type="Function">A function to return the coordinates to set. Receives the index of the element in the collection as the first argument and the current coordinates as the second argument. The function should return an object with the new top and left properties.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'offsetParent': function() {
    /// <summary>Get the closest ancestor element that is positioned.</summary>
    /// <returns type="jQuery" />
  },
  'on': function() {
    /// <signature>
    ///   <summary>Attach an event handler function for one or more events to the selected elements.</summary>
    ///   <param name="events" type="String">One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".</param>
    ///   <param name="selector" type="String">A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.</param>
    ///   <param name="data" type="Anything">Data to be passed to the handler in event.data when an event is triggered.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach an event handler function for one or more events to the selected elements.</summary>
    ///   <param name="events" type="PlainObject">An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).</param>
    ///   <param name="selector" type="String">A selector string to filter the descendants of the selected elements that will call the handler. If the selector is null or omitted, the handler is always called when it reaches the selected element.</param>
    ///   <param name="data" type="Anything">Data to be passed to the handler in event.data when an event occurs.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'one': function() {
    /// <signature>
    ///   <summary>Attach a handler to an event for the elements. The handler is executed at most once per element.</summary>
    ///   <param name="events" type="String">A string containing one or more JavaScript event types, such as "click" or "submit," or custom event names.</param>
    ///   <param name="data" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to an event for the elements. The handler is executed at most once per element.</summary>
    ///   <param name="events" type="String">One or more space-separated event types and optional namespaces, such as "click" or "keydown.myPlugin".</param>
    ///   <param name="selector" type="String">A selector string to filter the descendants of the selected elements that trigger the event. If the selector is null or omitted, the event is always triggered when it reaches the selected element.</param>
    ///   <param name="data" type="Anything">Data to be passed to the handler in event.data when an event is triggered.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered. The value false is also allowed as a shorthand for a function that simply does return false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Attach a handler to an event for the elements. The handler is executed at most once per element.</summary>
    ///   <param name="events" type="PlainObject">An object in which the string keys represent one or more space-separated event types and optional namespaces, and the values represent a handler function to be called for the event(s).</param>
    ///   <param name="selector" type="String">A selector string to filter the descendants of the selected elements that will call the handler. If the selector is null or omitted, the handler is always called when it reaches the selected element.</param>
    ///   <param name="data" type="Anything">Data to be passed to the handler in event.data when an event occurs.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'only-child': function() {
    /// <summary>Selects all elements that are the only child of their parent.</summary>
  },
  'only-of-type': function() {
    /// <summary>Selects all elements that have no siblings with the same element name.</summary>
  },
  'outerHeight': function() {
    /// <signature>
    ///   <summary>Get the current computed height for the first element in the set of matched elements, including padding, border, and optionally margin. Returns an integer (without "px") representation of the value or null if called on an empty set of elements.</summary>
    ///   <param name="includeMargin" type="Boolean">A Boolean indicating whether to include the element's margin in the calculation.</param>
    ///   <returns type="Number" />
    /// </signature>
  },
  'outerWidth': function() {
    /// <signature>
    ///   <summary>Get the current computed width for the first element in the set of matched elements, including padding and border.</summary>
    ///   <param name="includeMargin" type="Boolean">A Boolean indicating whether to include the element's margin in the calculation.</param>
    ///   <returns type="Number" />
    /// </signature>
  },
  'parent': function() {
    /// <signature>
    ///   <summary>Get the parent of each element in the current set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'parents': function() {
    /// <signature>
    ///   <summary>Get the ancestors of each element in the current set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'parentsUntil': function() {
    /// <signature>
    ///   <summary>Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to indicate where to stop matching ancestor elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get the ancestors of each element in the current set of matched elements, up to but not including the element matched by the selector, DOM node, or jQuery object.</summary>
    ///   <param name="element" type="Element">A DOM node or jQuery object indicating where to stop matching ancestor elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'password': function() {
    /// <summary>Selects all elements of type password.</summary>
  },
  'position': function() {
    /// <summary>Get the current coordinates of the first element in the set of matched elements, relative to the offset parent.</summary>
    /// <returns type="Object" />
  },
  'prepend': function() {
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.</summary>
    ///   <param name="content" type="">DOM element, array of elements, HTML string, or jQuery object to insert at the beginning of each element in the set of matched elements.</param>
    ///   <param name="content" type="">One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the beginning of each element in the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Insert content, specified by the parameter, to the beginning of each element in the set of matched elements.</summary>
    ///   <param name="function(index, html)" type="Function">A function that returns an HTML string, DOM element(s), or jQuery object to insert at the beginning of each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'prependTo': function() {
    /// <signature>
    ///   <summary>Insert every element in the set of matched elements to the beginning of the target.</summary>
    ///   <param name="target" type="">A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted at the beginning of the element(s) specified by this parameter.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'prev': function() {
    /// <signature>
    ///   <summary>Get the immediately preceding sibling of each element in the set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'prevAll': function() {
    /// <signature>
    ///   <summary>Get all preceding siblings of each element in the set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'prevUntil': function() {
    /// <signature>
    ///   <summary>Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to indicate where to stop matching preceding sibling elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Get all preceding siblings of each element up to but not including the element matched by the selector, DOM node, or jQuery object.</summary>
    ///   <param name="element" type="Element">A DOM node or jQuery object indicating where to stop matching preceding sibling elements.</param>
    ///   <param name="filter" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'promise': function() {
    /// <signature>
    ///   <summary>Return a Promise object to observe when all actions of a certain type bound to the collection, queued or not, have finished.</summary>
    ///   <param name="type" type="String">The type of queue that needs to be observed.</param>
    ///   <param name="target" type="PlainObject">Object onto which the promise methods have to be attached</param>
    ///   <returns type="Promise" />
    /// </signature>
  },
  'prop': function() {
    /// <signature>
    ///   <summary>Set one or more properties for the set of matched elements.</summary>
    ///   <param name="propertyName" type="String">The name of the property to set.</param>
    ///   <param name="value" type="">A value to set for the property.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set one or more properties for the set of matched elements.</summary>
    ///   <param name="properties" type="PlainObject">An object of property-value pairs to set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set one or more properties for the set of matched elements.</summary>
    ///   <param name="propertyName" type="String">The name of the property to set.</param>
    ///   <param name="function(index, oldPropertyValue)" type="Function">A function returning the value to set. Receives the index position of the element in the set and the old property value as arguments. Within the function, the keyword this refers to the current element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'pushStack': function() {
    /// <signature>
    ///   <summary>Add a collection of DOM elements onto the jQuery stack.</summary>
    ///   <param name="elements" type="Array">An array of elements to push onto the stack and make into a new jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add a collection of DOM elements onto the jQuery stack.</summary>
    ///   <param name="elements" type="Array">An array of elements to push onto the stack and make into a new jQuery object.</param>
    ///   <param name="name" type="String">The name of a jQuery method that generated the array of elements.</param>
    ///   <param name="arguments" type="Array">The arguments that were passed in to the jQuery method (for serialization).</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'queue': function() {
    /// <signature>
    ///   <summary>Manipulate the queue of functions to be executed, once for each matched element.</summary>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <param name="newQueue" type="Array">An array of functions to replace the current queue contents.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Manipulate the queue of functions to be executed, once for each matched element.</summary>
    ///   <param name="queueName" type="String">A string containing the name of the queue. Defaults to fx, the standard effects queue.</param>
    ///   <param name="callback( next )" type="Function">The new function to add to the queue, with a function to call that will dequeue the next item.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'radio': function() {
    /// <summary>Selects all  elements of type radio.</summary>
  },
  'ready': function() {
    /// <signature>
    ///   <summary>Specify a function to execute when the DOM is fully loaded.</summary>
    ///   <param name="handler" type="Function">A function to execute after the DOM is ready.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'remove': function() {
    /// <signature>
    ///   <summary>Remove the set of matched elements from the DOM.</summary>
    ///   <param name="selector" type="String">A selector expression that filters the set of matched elements to be removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeAttr': function() {
    /// <signature>
    ///   <summary>Remove an attribute from each element in the set of matched elements.</summary>
    ///   <param name="attributeName" type="String">An attribute to remove; as of version 1.7, it can be a space-separated list of attributes.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeClass': function() {
    /// <signature>
    ///   <summary>Remove a single class, multiple classes, or all classes from each element in the set of matched elements.</summary>
    ///   <param name="className" type="String">One or more space-separated classes to be removed from the class attribute of each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a single class, multiple classes, or all classes from each element in the set of matched elements.</summary>
    ///   <param name="function(index, class)" type="Function">A function returning one or more space-separated class names to be removed. Receives the index position of the element in the set and the old class value as arguments.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeData': function() {
    /// <signature>
    ///   <summary>Remove a previously-stored piece of data.</summary>
    ///   <param name="name" type="String">A string naming the piece of data to delete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a previously-stored piece of data.</summary>
    ///   <param name="list" type="">An array or space-separated string naming the pieces of data to delete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'removeProp': function() {
    /// <signature>
    ///   <summary>Remove a property for the set of matched elements.</summary>
    ///   <param name="propertyName" type="String">The name of the property to remove.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'replaceAll': function() {
    /// <signature>
    ///   <summary>Replace each target element with the set of matched elements.</summary>
    ///   <param name="target" type="">A selector string, jQuery object, or DOM element reference indicating which element(s) to replace.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'replaceWith': function() {
    /// <signature>
    ///   <summary>Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.</summary>
    ///   <param name="newContent" type="">The content to insert. May be an HTML string, DOM element, or jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Replace each element in the set of matched elements with the provided new content and return the set of elements that was removed.</summary>
    ///   <param name="function" type="Function">A function that returns content with which to replace the set of matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'reset': function() {
    /// <summary>Selects all elements of type reset.</summary>
  },
  'resize': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "resize" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "resize" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'root': function() {
    /// <summary>Selects the element that is the root of the document.</summary>
  },
  'scroll': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "scroll" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "scroll" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'scrollLeft': function() {
    /// <signature>
    ///   <summary>Set the current horizontal position of the scroll bar for each of the set of matched elements.</summary>
    ///   <param name="value" type="Number">An integer indicating the new position to set the scroll bar to.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'scrollTop': function() {
    /// <signature>
    ///   <summary>Set the current vertical position of the scroll bar for each of the set of matched elements.</summary>
    ///   <param name="value" type="Number">An integer indicating the new position to set the scroll bar to.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'select': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "select" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "select" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'selected': function() {
    /// <summary>Selects all elements that are selected.</summary>
  },
  'selector': function() {
    /// <summary>A selector representing selector passed to jQuery(), if any, when creating the original set.</summary>
    /// <returns type="String" />
  },
  'serialize': function() {
    /// <summary>Encode a set of form elements as a string for submission.</summary>
    /// <returns type="String" />
  },
  'serializeArray': function() {
    /// <summary>Encode a set of form elements as an array of names and values.</summary>
    /// <returns type="Array" />
  },
  'show': function() {
    /// <signature>
    ///   <summary>Display the matched elements.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display the matched elements.</summary>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display the matched elements.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'siblings': function() {
    /// <signature>
    ///   <summary>Get the siblings of each element in the set of matched elements, optionally filtered by a selector.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression to match elements against.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'size': function() {
    /// <summary>Return the number of elements in the jQuery object.</summary>
    /// <returns type="Number" />
  },
  'slice': function() {
    /// <signature>
    ///   <summary>Reduce the set of matched elements to a subset specified by a range of indices.</summary>
    ///   <param name="start" type="Number">An integer indicating the 0-based position at which the elements begin to be selected. If negative, it indicates an offset from the end of the set.</param>
    ///   <param name="end" type="Number">An integer indicating the 0-based position at which the elements stop being selected. If negative, it indicates an offset from the end of the set. If omitted, the range continues until the end of the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'slideDown': function() {
    /// <signature>
    ///   <summary>Display the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display the matched elements with a sliding motion.</summary>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'slideToggle': function() {
    /// <signature>
    ///   <summary>Display or hide the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display or hide the matched elements with a sliding motion.</summary>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display or hide the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'slideUp': function() {
    /// <signature>
    ///   <summary>Hide the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Hide the matched elements with a sliding motion.</summary>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Hide the matched elements with a sliding motion.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'stop': function() {
    /// <signature>
    ///   <summary>Stop the currently-running animation on the matched elements.</summary>
    ///   <param name="clearQueue" type="Boolean">A Boolean indicating whether to remove queued animation as well. Defaults to false.</param>
    ///   <param name="jumpToEnd" type="Boolean">A Boolean indicating whether to complete the current animation immediately. Defaults to false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Stop the currently-running animation on the matched elements.</summary>
    ///   <param name="queue" type="String">The name of the queue in which to stop animations.</param>
    ///   <param name="clearQueue" type="Boolean">A Boolean indicating whether to remove queued animation as well. Defaults to false.</param>
    ///   <param name="jumpToEnd" type="Boolean">A Boolean indicating whether to complete the current animation immediately. Defaults to false.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'submit': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "submit" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "submit" JavaScript event, or trigger that event on an element.</summary>
    ///   <param name="eventData" type="PlainObject">An object containing data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'target': function() {
    /// <summary>Selects the target element indicated by the fragment identifier of the document's URI.</summary>
  },
  'text': function() {
    /// <signature>
    ///   <summary>Set the content of each element in the set of matched elements to the specified text.</summary>
    ///   <param name="textString" type="String">A string of text to set as the content of each matched element.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the content of each element in the set of matched elements to the specified text.</summary>
    ///   <param name="function(index, text)" type="Function">A function returning the text content to set. Receives the index position of the element in the set and the old text value as arguments.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'toArray': function() {
    /// <summary>Retrieve all the DOM elements contained in the jQuery set, as an array.</summary>
    /// <returns type="Array" />
  },
  'toggle': function() {
    /// <signature>
    ///   <summary>Display or hide the matched elements.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display or hide the matched elements.</summary>
    ///   <param name="options" type="PlainObject">A map of additional options to pass to the method.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display or hide the matched elements.</summary>
    ///   <param name="duration" type="">A string or number determining how long the animation will run.</param>
    ///   <param name="easing" type="String">A string indicating which easing function to use for the transition.</param>
    ///   <param name="complete" type="Function">A function to call once the animation is complete.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Display or hide the matched elements.</summary>
    ///   <param name="showOrHide" type="Boolean">A Boolean indicating whether to show or hide the elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'toggleClass': function() {
    /// <signature>
    ///   <summary>Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.</summary>
    ///   <param name="className" type="String">One or more class names (separated by spaces) to be toggled for each element in the matched set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.</summary>
    ///   <param name="className" type="String">One or more class names (separated by spaces) to be toggled for each element in the matched set.</param>
    ///   <param name="switch" type="Boolean">A Boolean (not just truthy/falsy) value to determine whether the class should be added or removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.</summary>
    ///   <param name="switch" type="Boolean">A boolean value to determine whether the class should be added or removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Add or remove one or more classes from each element in the set of matched elements, depending on either the class's presence or the value of the switch argument.</summary>
    ///   <param name="function(index, class, switch)" type="Function">A function that returns class names to be toggled in the class attribute of each element in the matched set. Receives the index position of the element in the set, the old class value, and the switch as arguments.</param>
    ///   <param name="switch" type="Boolean">A boolean value to determine whether the class should be added or removed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'trigger': function() {
    /// <signature>
    ///   <summary>Execute all handlers and behaviors attached to the matched elements for the given event type.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or submit.</param>
    ///   <param name="extraParameters" type="">Additional parameters to pass along to the event handler.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Execute all handlers and behaviors attached to the matched elements for the given event type.</summary>
    ///   <param name="event" type="Event">A jQuery.Event object.</param>
    ///   <param name="extraParameters" type="">Additional parameters to pass along to the event handler.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'triggerHandler': function() {
    /// <signature>
    ///   <summary>Execute all handlers attached to an element for an event.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or submit.</param>
    ///   <param name="extraParameters" type="Array">An array of additional parameters to pass along to the event handler.</param>
    ///   <returns type="Object" />
    /// </signature>
  },
  'unbind': function() {
    /// <signature>
    ///   <summary>Remove a previously-attached event handler from the elements.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or submit.</param>
    ///   <param name="handler(eventObject)" type="Function">The function that is to be no longer executed.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a previously-attached event handler from the elements.</summary>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as click or submit.</param>
    ///   <param name="false" type="Boolean">Unbinds the corresponding 'return false' function that was bound using .bind( eventType, false ).</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a previously-attached event handler from the elements.</summary>
    ///   <param name="event" type="Object">A JavaScript event object as passed to an event handler.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'undelegate': function() {
    /// <signature>
    ///   <summary>Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector which will be used to filter the event results.</param>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as "click" or "keydown"</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector which will be used to filter the event results.</param>
    ///   <param name="eventType" type="String">A string containing a JavaScript event type, such as "click" or "keydown"</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute at the time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.</summary>
    ///   <param name="selector" type="String">A selector which will be used to filter the event results.</param>
    ///   <param name="events" type="PlainObject">An object of one or more event types and previously bound functions to unbind from them.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Remove a handler from the event for all elements which match the current selector, based upon a specific set of root elements.</summary>
    ///   <param name="namespace" type="String">A string containing a namespace to unbind all events from.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'unload': function() {
    /// <signature>
    ///   <summary>Bind an event handler to the "unload" JavaScript event.</summary>
    ///   <param name="handler(eventObject)" type="Function">A function to execute when the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Bind an event handler to the "unload" JavaScript event.</summary>
    ///   <param name="eventData" type="Object">A plain object of data that will be passed to the event handler.</param>
    ///   <param name="handler(eventObject)" type="Function">A function to execute each time the event is triggered.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'unwrap': function() {
    /// <summary>Remove the parents of the set of matched elements from the DOM, leaving the matched elements in their place.</summary>
    /// <returns type="jQuery" />
  },
  'val': function() {
    /// <signature>
    ///   <summary>Set the value of each element in the set of matched elements.</summary>
    ///   <param name="value" type="">A string of text or an array of strings corresponding to the value of each matched element to set as selected/checked.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the value of each element in the set of matched elements.</summary>
    ///   <param name="function(index, value)" type="Function">A function returning the value to set. this is the current element. Receives the index position of the element in the set and the old value as arguments.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'visible': function() {
    /// <summary>Selects all elements that are visible.</summary>
  },
  'width': function() {
    /// <signature>
    ///   <summary>Set the CSS width of each element in the set of matched elements.</summary>
    ///   <param name="value" type="">An integer representing the number of pixels, or an integer along with an optional unit of measure appended (as a string).</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Set the CSS width of each element in the set of matched elements.</summary>
    ///   <param name="function(index, width)" type="Function">A function returning the width to set. Receives the index position of the element in the set and the old width as arguments. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'wrap': function() {
    /// <signature>
    ///   <summary>Wrap an HTML structure around each element in the set of matched elements.</summary>
    ///   <param name="wrappingElement" type="">A selector, element, HTML string, or jQuery object specifying the structure to wrap around the matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Wrap an HTML structure around each element in the set of matched elements.</summary>
    ///   <param name="function(index)" type="Function">A callback function returning the HTML content or jQuery object to wrap around the matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'wrapAll': function() {
    /// <signature>
    ///   <summary>Wrap an HTML structure around all elements in the set of matched elements.</summary>
    ///   <param name="wrappingElement" type="">A selector, element, HTML string, or jQuery object specifying the structure to wrap around the matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
  'wrapInner': function() {
    /// <signature>
    ///   <summary>Wrap an HTML structure around the content of each element in the set of matched elements.</summary>
    ///   <param name="wrappingElement" type="String">An HTML snippet, selector expression, jQuery object, or DOM element specifying the structure to wrap around the content of the matched elements.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Wrap an HTML structure around the content of each element in the set of matched elements.</summary>
    ///   <param name="function(index)" type="Function">A callback function which generates a structure to wrap around the content of the matched elements. Receives the index position of the element in the set as an argument. Within the function, this refers to the current element in the set.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
});

intellisense.annotate(window, {
  '$': function() {
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="selector" type="String">A string containing a selector expression</param>
    ///   <param name="context" type="">A DOM Element, Document, or jQuery to use as context</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="element" type="Element">A DOM element to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="elementArray" type="Array">An array containing a set of DOM elements to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="object" type="PlainObject">A plain object to wrap in a jQuery object.</param>
    ///   <returns type="jQuery" />
    /// </signature>
    /// <signature>
    ///   <summary>Accepts a string containing a CSS selector which is then used to match a set of elements.</summary>
    ///   <param name="jQuery object" type="PlainObject">An existing jQuery object to clone.</param>
    ///   <returns type="jQuery" />
    /// </signature>
  },
});

