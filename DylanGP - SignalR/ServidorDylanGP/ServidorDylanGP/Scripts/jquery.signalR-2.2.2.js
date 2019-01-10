/* jquery.signalR.core.js */
/*global window:false */
/*!
 * ASP.NET SignalR JavaScript Library v2.2.2
 * http://signalr.net/
 *
 * Copyright (c) .NET Foundation. All rights reserved.
 * Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
 *
 */

/// <reference path="Scripts/jquery-1.6.4.js" />
/// <reference path="jquery.signalR.version.js" />
(function ($, window, undefined) {

    var resources = {
        nojQuery: "jQuery was not found. Please ensure jQuery is referenced before the SignalR client JavaScript file.",
        noTransportOnInit: "No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.",
        errorOnNegotiate: "Error during negotiation request.",
        stoppedWhileLoading: "The connection was stopped during page load.",
        stoppedWhileNegotiating: "The connection was stopped during the negotiate request.",
        errorParsingNegotiateResponse: "Error parsing negotiate response.",
        errorDuringStartRequest: "Error during start request. Stopping the connection.",
        stoppedDuringStartRequest: "The connection was stopped during the start request.",
        errorParsingStartResponse: "Error parsing start response: '{0}'. Stopping the connection.",
        invalidStartResponse: "Invalid start response: '{0}'. Stopping the connection.",
        protocolIncompatible: "You are using a version of the client that isn't compatible with the server. Client version {0}, server version {1}.",
        sendFailed: "Send failed.",
        parseFailed: "Failed at parsing response: {0}",
        longPollFailed: "Long polling request failed.",
        eventSourceFailedToConnect: "EventSource failed to connect.",
        eventSourceError: "Error raised by EventSource",
        webSocketClosed: "WebSocket closed.",
        pingServerFailedInvalidResponse: "Invalid ping response when pinging server: '{0}'.",
        pingServerFailed: "Failed to ping server.",
        pingServerFailedStatusCode: "Failed to ping server.  Server responded with status code {0}, stopping the connection.",
        pingServerFailedParse: "Failed to parse ping server response, stopping the connection.",
        noConnectionTransport: "Connection is in an invalid state, there is no transport active.",
        webSocketsInvalidState: "The Web Socket transport is in an invalid state, transitioning into reconnecting.",
        reconnectTimeout: "Couldn't reconnect within the configured timeout of {0} ms, disconnecting.",
        reconnectWindowTimeout: "The client has been inactive since {0} and it has exceeded the inactivity timeout of {1} ms. Stopping the connection."
    };

    if (typeof ($) !== "function") {
        // no jQuery!
        throw new Error(resources.nojQuery);
    }

    var signalR,
        _connection,
        _pageLoaded = (window.document.readyState === "complete"),
        _pageWindow = $(window),
        _negotiateAbortText = "__Negotiate Aborted__",
        events = {
            onStart: "onStart",
            onStarting: "onStarting",
            onReceived: "onReceived",
            onError: "onError",
            onConnectionSlow: "onConnectionSlow",
            onReconnecting: "onReconnecting",
            onReconnect: "onReconnect",
            onStateChanged: "onStateChanged",
            onDisconnect: "onDisconnect"
        },
        ajaxDefaults = {
            processData: true,
            timeout: null,
            async: true,
            global: false,
            cache: false
        },
        log = function (msg, logging) {
            if (logging === false) {
                return;
            }
            var m;
            if (typeof (window.console) === "undefined") {
                return;
            }
            m = "[" + new Date().toTimeString() + "] SignalR: " + msg;
            if (window.console.debug) {
                window.console.debug(m);
            } else if (window.console.log) {
                window.console.log(m);
            }
        },

        changeState = function (connection, expectedState, newState) {
            if (expectedState === connection.state) {
                connection.state = newState;

                $(connection).triggerHandler(events.onStateChanged, [{ oldState: expectedState, newState: newState }]);
                return true;
            }

            return false;
        },

        isDisconnecting = function (connection) {
            return connection.state === signalR.connectionState.disconnected;
        },

        supportsKeepAlive = function (connection) {
            return connection._.keepAliveData.activated &&
                   connection.transport.supportsKeepAlive(connection);
        },

        configureStopReconnectingTimeout = function (connection) {
            var stopReconnectingTimeout,
                onReconnectTimeout;

            // Check if this connection has already been configured to stop reconnecting after a specified timeout.
            // Without this check if a connection is stopped then started events will be bound multiple times.
            if (!connection._.configuredStopReconnectingTimeout) {
                onReconnectTimeout = function (connection) {
                    var message = signalR._.format(signalR.resources.reconnectTimeout, connection.disconnectTimeout);
                    connection.log(message);
                    $(connection).triggerHandler(events.onError, [signalR._.error(message, /* source */ "TimeoutException")]);
                    connection.stop(/* async */ false, /* notifyServer */ false);
                };

                connection.reconnecting(function () {
                    var connection = this;

                    // Guard against state changing in a previous user defined even handler
                    if (connection.state === signalR.connectionState.reconnecting) {
                        stopReconnectingTimeout = window.setTimeout(function () { onReconnectTimeout(connection); }, connection.disconnectTimeout);
                    }
                });

                connection.stateChanged(function (data) {
                    if (data.oldState === signalR.connectionState.reconnecting) {
                        // Clear the pending reconnect timeout check
                        window.clearTimeout(stopReconnectingTimeout);
                    }
                });

                connection._.configuredStopReconnectingTimeout = true;
            }
        };

    signalR = function (url, qs, logging) {
        /// <summary>Creates a new SignalR connection for the given url</summary>
        /// <param name="url" type="String">The URL of the long polling endpoint</param>
        /// <param name="qs" type="Object">
        ///     [Optional] Custom querystring parameters to add to the connection URL.
        ///     If an object, every non-function member will be added to the querystring.
        ///     If a string, it's added to the QS as specified.
        /// </param>
        /// <param name="logging" type="Boolean">
        ///     [Optional] A flag indicating whether connection logging is enabled to the browser
        ///     console/log. Defaults to false.
        /// </param>

        return new signalR.fn.init(url, qs, logging);
    };

    signalR._ = {
        defaultContentType: "application/x-www-form-urlencoded; charset=UTF-8",

        ieVersion: (function () {
            var version,
                matches;

            if (window.navigator.appName === 'Microsoft Internet Explorer') {
                // Check if the user agent has the pattern "MSIE (one or more numbers).(one or more numbers)";
                matches = /MSIE ([0-9]+\.[0-9]+)/.exec(window.navigator.userAgent);

                if (matches) {
                    version = window.parseFloat(matches[1]);
                }
            }

            // undefined value means not IE
            return version;
        })(),

        error: function (message, source, context) {
            var e = new Error(message);
            e.source = source;

            if (typeof context !== "undefined") {
                e.context = context;
            }

            return e;
        },

        transportError: function (message, transport, source, context) {
            var e = this.error(message, source, context);
            e.transport = transport ? transport.name : undefined;
            return e;
        },

        format: function () {
            /// <summary>Usage: format("Hi {0}, you are {1}!", "Foo", 100) </summary>
            var s = arguments[0];
            for (var i = 0; i < arguments.length - 1; i++) {
                s = s.replace("{" + i + "}", arguments[i + 1]);
            }
            return s;
        },

        firefoxMajorVersion: function (userAgent) {
            // Firefox user agents: http://useragentstring.com/pages/Firefox/
            var matches = userAgent.match(/Firefox\/(\d+)/);
            if (!matches || !matches.length || matches.length < 2) {
                return 0;
            }
            return parseInt(matches[1], 10 /* radix */);
        },

        configurePingInterval: function (connection) {
            var config = connection._.config,
                onFail = function (error) {
                    $(connection).triggerHandler(events.onError, [error]);
                };

            if (config && !connection._.pingIntervalId && config.pingInterval) {
                connection._.pingIntervalId = window.setInterval(function () {
                    signalR.transports._logic.pingServer(connection).fail(onFail);
                }, config.pingInterval);
            }
        }
    };

    signalR.events = events;

    signalR.resources = resources;

    signalR.ajaxDefaults = ajaxDefaults;

    signalR.changeState = changeState;

    signalR.isDisconnecting = isDisconnecting;

    signalR.connectionState = {
        connecting: 0,
        connected: 1,
        reconnecting: 2,
        disconnected: 4
    };

    signalR.hub = {
        start: function () {
            // This will get replaced with the real hub connection start method when hubs is referenced correctly
            throw new Error("SignalR: Error loading hubs. Ensure your hubs reference is correct, e.g. <script src='/signalr/js'></script>.");
        }
    };

    // .on() was added in version 1.7.0, .load() was removed in version 3.0.0 so we fallback to .load() if .on() does
    // not exist to not break existing applications
    if (typeof _pageWindow.on == "function") {
        _pageWindow.on("load", function () { _pageLoaded = true; });
    }
    else {
        _pageWindow.load(function () { _pageLoaded = true; });
    }

    function validateTransport(requestedTransport, connection) {
        /// <summary>Validates the requested transport by cross checking it with the pre-defined signalR.transports</summary>
        /// <param name="requestedTransport" type="Object">The designated transports that the user has specified.</param>
        /// <param name="connection" type="signalR">The connection that will be using the requested transports.  Used for logging purposes.</param>
        /// <returns type="Object" />

        if ($.isArray(requestedTransport)) {
            // Go through transport array and remove an "invalid" tranports
            for (var i = requestedTransport.length - 1; i >= 0; i--) {
                var transport = requestedTransport[i];
                if ($.type(transport) !== "string" || !signalR.transports[transport]) {
                    connection.log("Invalid transport: " + transport + ", removing it from the transports list.");
                    requestedTransport.splice(i, 1);
                }
            }

            // Verify we still have transports left, if we dont then we have invalid transports
            if (requestedTransport.length === 0) {
                connection.log("No transports remain within the specified transport array.");
                requestedTransport = null;
            }
        } else if (!signalR.transports[requestedTransport] && requestedTransport !== "auto") {
            connection.log("Invalid transport: " + requestedTransport.toString() + ".");
            requestedTransport = null;
        } else if (requestedTransport === "auto" && signalR._.ieVersion <= 8) {
            // If we're doing an auto transport and we're IE8 then force longPolling, #1764
            return ["longPolling"];

        }

        return requestedTransport;
    }

    function getDefaultPort(protocol) {
        if (protocol === "http:") {
            return 80;
        } else if (protocol === "https:") {
            return 443;
        }
    }

    function addDefaultPort(protocol, url) {
        // Remove ports  from url.  We have to check if there's a / or end of line
        // following the port in order to avoid removing ports such as 8080.
        if (url.match(/:\d+$/)) {
            return url;
        } else {
            return url + ":" + getDefaultPort(protocol);
        }
    }

    function ConnectingMessageBuffer(connection, drainCallback) {
        var that = this,
            buffer = [];

        that.tryBuffer = function (message) {
            if (connection.state === $.signalR.connectionState.connecting) {
                buffer.push(message);

                return true;
            }

            return false;
        };

        that.drain = function () {
            // Ensure that the connection is connected when we drain (do not want to drain while a connection is not active)
            if (connection.state === $.signalR.connectionState.connected) {
                while (buffer.length > 0) {
                    drainCallback(buffer.shift());
                }
            }
        };

        that.clear = function () {
            buffer = [];
        };
    }

    signalR.fn = signalR.prototype = {
        init: function (url, qs, logging) {
            var $connection = $(this);

            this.url = url;
            this.qs = qs;
            this.lastError = null;
            this._ = {
                keepAliveData: {},
                connectingMessageBuffer: new ConnectingMessageBuffer(this, function (message) {
                    $connection.triggerHandler(events.onReceived, [message]);
                }),
                lastMessageAt: new Date().getTime(),
                lastActiveAt: new Date().getTime(),
                beatInterval: 5000, // Default value, will only be overridden if keep alive is enabled,
                beatHandle: null,
                totalTransportConnectTimeout: 0 // This will be the sum of the TransportConnectTimeout sent in response to negotiate and connection.transportConnectTimeout
            };
            if (typeof (logging) === "boolean") {
                this.logging = logging;
            }
        },

        _parseResponse: function (response) {
            var that = this;

            if (!response) {
                return response;
            } else if (typeof response === "string") {
                return that.json.parse(response);
            } else {
                return response;
            }
        },

        _originalJson: window.JSON,

        json: window.JSON,

        isCrossDomain: function (url, against) {
            /// <summary>Checks if url is cross domain</summary>
            /// <param name="url" type="String">The base URL</param>
            /// <param name="against" type="Object">
            ///     An optional argument to compare the URL against, if not specified it will be set to window.location.
            ///     If specified it must contain a protocol and a host property.
            /// </param>
            var link;

            url = $.trim(url);

            against = against || window.location;

            if (url.indexOf("http") !== 0) {
                return false;
            }

            // Create an anchor tag.
            link = window.document.createElement("a");
            link.href = url;

            // When checking for cross domain we have to special case port 80 because the window.location will remove the
            return link.protocol + addDefaultPort(link.protocol, link.host) !== against.protocol + addDefaultPort(against.protocol, against.host);
        },

        ajaxDataType: "text",

        contentType: "application/json; charset=UTF-8",

        logging: false,

        state: signalR.connectionState.disconnected,

        clientProtocol: "1.5",

        reconnectDelay: 2000,

        transportConnectTimeout: 0,

        disconnectTimeout: 30000, // This should be set by the server in response to the negotiate request (30s default)

        reconnectWindow: 30000, // This should be set by the server in response to the negotiate request

        keepAliveWarnAt: 2 / 3, // Warn user of slow connection if we breach the X% mark of the keep alive timeout

        start: function (options, callback) {
            /// <summary>Starts the connection</summary>
            /// <param name="options" type="Object">Options map</param>
            /// <param name="callback" type="Function">A callback function to execute when the connection has started</param>
            var connection = this,
                config = {
                    pingInterval: 300000,
                    waitForPageLoad: true,
                    transport: "auto",
                    jsonp: false
                },
                initialize,
                deferred = connection._deferral || $.Deferred(), // Check to see if there is a pre-existing deferral that's being built on, if so we want to keep using it
                parser = window.document.createElement("a");

            connection.lastError = null;

            // Persist the deferral so that if start is called multiple times the same deferral is used.
            connection._deferral = deferred;

            if (!connection.json) {
                // no JSON!
                throw new Error("SignalR: No JSON parser found. Please ensure json2.js is referenced before the SignalR.js file if you need to support clients without native JSON parsing support, e.g. IE<8.");
            }

            if ($.type(options) === "function") {
                // Support calling with single callback parameter
                callback = options;
            } else if ($.type(options) === "object") {
                $.extend(config, options);
                if ($.type(config.callback) === "function") {
                    callback = config.callback;
                }
            }

            config.transport = validateTransport(config.transport, connection);

            // If the transport is invalid throw an error and abort start
            if (!config.transport) {
                throw new Error("SignalR: Invalid transport(s) specified, aborting start.");
            }

            connection._.config = config;

            // Check to see if start is being called prior to page load
            // If waitForPageLoad is true we then want to re-direct function call to the window load event
            if (!_pageLoaded && config.waitForPageLoad === true) {
                connection._.deferredStartHandler = function () {
                    connection.start(options, callback);
                };
                _pageWindow.bind("load", connection._.deferredStartHandler);

                return deferred.promise();
            }

            // If we're already connecting just return the same deferral as the original connection start
            if (connection.state === signalR.connectionState.connecting) {
                return deferred.promise();
            } else if (changeState(connection,
                            signalR.connectionState.disconnected,
                            signalR.connectionState.connecting) === false) {
                // We're not connecting so try and transition into connecting.
                // If we fail to transition then we're either in connected or reconnecting.

                deferred.resolve(connection);
                return deferred.promise();
            }

            configureStopReconnectingTimeout(connection);

            // Resolve the full url
            parser.href = connection.url;
            if (!parser.protocol || parser.protocol === ":") {
                connection.protocol = window.document.location.protocol;
                connection.host = parser.host || window.document.location.host;
            } else {
                connection.protocol = parser.protocol;
                connection.host = parser.host;
            }

            connection.baseUrl = connection.protocol + "//" + connection.host;

            // Set the websocket protocol
            connection.wsProtocol = connection.protocol === "https:" ? "wss://" : "ws://";

            // If jsonp with no/auto transport is specified, then set the transport to long polling
            // since that is the only transport for which jsonp really makes sense.
            // Some developers might actually choose to specify jsonp for same origin requests
            // as demonstrated by Issue #623.
            if (config.transport === "auto" && config.jsonp === true) {
                config.transport = "longPolling";
            }

            // If the url is protocol relative, prepend the current windows protocol to the url.
            if (connection.url.indexOf("//") === 0) {
                connection.url = window.location.protocol + connection.url;
                connection.log("Protocol relative URL detected, normalizing it to '" + connection.url + "'.");
            }

            if (this.isCrossDomain(connection.url)) {
                connection.log("Auto detected cross domain url.");

                if (config.transport === "auto") {
                    // TODO: Support XDM with foreverFrame
                    config.transport = ["webSockets", "serverSentEvents", "longPolling"];
                }

                if (typeof (config.withCredentials) === "undefined") {
                    config.withCredentials = true;
                }

                // Determine if jsonp is the only choice for negotiation, ajaxSend and ajaxAbort.
                // i.e. if the browser doesn't supports CORS
                // If it is, ignore any preference to the contrary, and switch to jsonp.
                if (!config.jsonp) {
                    config.jsonp = !$.support.cors;

                    if (config.jsonp) {
                        connection.log("Using jsonp because this browser doesn't support CORS.");
                    }
                }

                connection.contentType = signalR._.defaultContentType;
            }

            connection.withCredentials = config.withCredentials;

            connection.ajaxDataType = config.jsonp ? "jsonp" : "text";

            $(connection).bind(events.onStart, function (e, data) {
                if ($.type(callback) === "function") {
                    callback.call(connection);
                }
                deferred.resolve(connection);
            });

            connection._.initHandler = signalR.transports._logic.initHandler(connection);

            initialize = function (transports, index) {
                var noTransportError = signalR._.error(resources.noTransportOnInit);

                index = index || 0;
                if (index >= transports.length) {
                    if (index === 0) {
                        connection.log("No transports supported by the server were selected.");
                    } else if (index === 1) {
                        connection.log("No fallback transports were selected.");
                    } else {
                        connection.log("Fallback transports exhausted.");
                    }

                    // No transport initialized successfully
                    $(connection).triggerHandler(events.onError, [noTransportError]);
                    deferred.reject(noTransportError);
                    // Stop the connection if it has connected and move it into the disconnected state
                    connection.stop();
                    return;
                }

                // The connection was aborted
                if (connection.state === signalR.connectionState.disconnected) {
                    return;
                }

                var transportName = transports[index],
                    transport = signalR.transports[transportName],
                    onFallback = function () {
                        initialize(transports, index + 1);
                    };

                connection.transport = transport;

                try {
                    connection._.initHandler.start(transport, function () { // success
                        // Firefox 11+ doesn't allow sync XHR withCredentials: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#withCredentials
                        var isFirefox11OrGreater = signalR._.firefoxMajorVersion(window.navigator.userAgent) >= 11,
                            asyncAbort = !!connection.withCredentials && isFirefox11OrGreater;

                        connection.log("The start request succeeded. Transitioning to the connected state.");

                        if (supportsKeepAlive(connection)) {
                            signalR.transports._logic.monitorKeepAlive(connection);
                        }

                        signalR.transports._logic.startHeartbeat(connection);

                        // Used to ensure low activity clients maintain their authentication.
                        // Must be configured once a transport has been decided to perform valid ping requests.
                        signalR._.configurePingInterval(connection);

                        if (!changeState(connection,
                                            signalR.connectionState.connecting,
                                            signalR.connectionState.connected)) {
                            connection.log("WARNING! The connection was not in the connecting state.");
                        }

                        // Drain any incoming buffered messages (messages that came in prior to connect)
                        connection._.connectingMessageBuffer.drain();

                        $(connection).triggerHandler(events.onStart);

                        // wire the stop handler for when the user leaves the page
                        _pageWindow.bind("unload", function () {
                            connection.log("Window unloading, stopping the connection.");

                            connection.stop(asyncAbort);
                        });

                        if (isFirefox11OrGreater) {
                            // Firefox does not fire cross-domain XHRs in the normal unload handler on tab close.
                            // #2400
                            _pageWindow.bind("beforeunload", function () {
                                // If connection.stop() runs runs in beforeunload and fails, it will also fail
                                // in unload unless connection.stop() runs after a timeout.
                                window.setTimeout(function () {
                                    connection.stop(asyncAbort);
                                }, 0);
                            });
                        }
                    }, onFallback);
                }
                catch (error) {
                    connection.log(transport.name + " transport threw '" + error.message + "' when attempting to start.");
                    onFallback();
                }
            };

            var url = connection.url + "/negotiate",
                onFailed = function (error, connection) {
                    var err = signalR._.error(resources.errorOnNegotiate, error, connection._.negotiateRequest);

                    $(connection).triggerHandler(events.onError, err);
                    deferred.reject(err);
                    // Stop the connection if negotiate failed
                    connection.stop();
                };

            $(connection).triggerHandler(events.onStarting);

            url = signalR.transports._logic.prepareQueryString(connection, url);

            connection.log("Negotiating with '" + url + "'.");

            // Save the ajax negotiate request object so we can abort it if stop is called while the request is in flight.
            connection._.negotiateRequest = signalR.transports._logic.ajax(connection, {
                url: url,
                error: function (error, statusText) {
                    // We don't want to cause any errors if we're aborting our own negotiate request.
                    if (statusText !== _negotiateAbortText) {
                        onFailed(error, connection);
                    } else {
                        // This rejection will noop if the deferred has already been resolved or rejected.
                        deferred.reject(signalR._.error(resources.stoppedWhileNegotiating, null /* error */, connection._.negotiateRequest));
                    }
                },
                success: function (result) {
                    var res,
                        keepAliveData,
                        protocolError,
                        transports = [],
                        supportedTransports = [];

                    try {
                        res = connection._parseResponse(result);
                    } catch (error) {
                        onFailed(signalR._.error(resources.errorParsingNegotiateResponse, error), connection);
                        return;
                    }

                    keepAliveData = connection._.keepAliveData;
                    connection.appRelativeUrl = res.Url;
                    connection.id = res.ConnectionId;
                    connection.token = res.ConnectionToken;
                    connection.webSocketServerUrl = res.WebSocketServerUrl;

                    // The long poll timeout is the ConnectionTimeout plus 10 seconds
                    connection._.pollTimeout = res.ConnectionTimeout * 1000 + 10000; // in ms

                    // Once the server has labeled the PersistentConnection as Disconnected, we should stop attempting to reconnect
                    // after res.DisconnectTimeout seconds.
                    connection.disconnectTimeout = res.DisconnectTimeout * 1000; // in ms

                    // Add the TransportConnectTimeout from the response to the transportConnectTimeout from the client to calculate the total timeout
                    connection._.totalTransportConnectTimeout = connection.transportConnectTimeout + res.TransportConnectTimeout * 1000;

                    // If we have a keep alive
                    if (res.KeepAliveTimeout) {
                        // Register the keep alive data as activated
                        keepAliveData.activated = true;

                        // Timeout to designate when to force the connection into reconnecting converted to milliseconds
                        keepAliveData.timeout = res.KeepAliveTimeout * 1000;

                        // Timeout to designate when to warn the developer that the connection may be dead or is not responding.
                        keepAliveData.timeoutWarning = keepAliveData.timeout * connection.keepAliveWarnAt;

                        // Instantiate the frequency in which we check the keep alive.  It must be short in order to not miss/pick up any changes
                        connection._.beatInterval = (keepAliveData.timeout - keepAliveData.timeoutWarning) / 3;
                    } else {
                        keepAliveData.activated = false;
                    }

                    connection.reconnectWindow = connection.disconnectTimeout + (keepAliveData.timeout || 0);

                    if (!res.ProtocolVersion || res.ProtocolVersion !== connection.clientProtocol) {
                        protocolError = signalR._.error(signalR._.format(resources.protocolIncompatible, connection.clientProtocol, res.ProtocolVersion));
                        $(connection).triggerHandler(events.onError, [protocolError]);
                        deferred.reject(protocolError);

                        return;
                    }

                    $.each(signalR.transports, function (key) {
                        if ((key.indexOf("_") === 0) || (key === "webSockets" && !res.TryWebSockets)) {
                            return true;
                        }
                        supportedTransports.push(key);
                    });

                    if ($.isArray(config.transport)) {
                        $.each(config.transport, function (_, transport) {
                            if ($.inArray(transport, supportedTransports) >= 0) {
                                transports.push(transport);
                            }
                        });
                    } else if (config.transport === "auto") {
                        transports = supportedTransports;
                    } else if ($.inArray(config.transport, supportedTransports) >= 0) {
                        transports.push(config.transport);
                    }

                    initialize(transports);
                }
            });

            return deferred.promise();
        },

        starting: function (callback) {
            /// <summary>Adds a callback that will be invoked before anything is sent over the connection</summary>
            /// <param name="callback" type="Function">A callback function to execute before the connection is fully instantiated.</param>
            /// <returns type="signalR" />
            var connection = this;
            $(connection).bind(events.onStarting, function (e, data) {
                callback.call(connection);
            });
            return connection;
        },

        send: function (data) {
            /// <summary>Sends data over the connection</summary>
            /// <param name="data" type="String">The data to send over the connection</param>
            /// <returns type="signalR" />
            var connection = this;

            if (connection.state === signalR.connectionState.disconnected) {
                // Connection hasn't been started yet
                throw new Error("SignalR: Connection must be started before data can be sent. Call .start() before .send()");
            }

            if (connection.state === signalR.connectionState.connecting) {
                // Connection hasn't been started yet
                throw new Error("SignalR: Connection has not been fully initialized. Use .start().done() or .start().fail() to run logic after the connection has started.");
            }

            connection.transport.send(connection, data);
            // REVIEW: Should we return deferred here?
            return connection;
        },

        received: function (callback) {
            /// <summary>Adds a callback that will be invoked after anything is received over the connection</summary>
            /// <param name="callback" type="Function">A callback function to execute when any data is received on the connection</param>
            /// <returns type="signalR" />
            var connection = this;
            $(connection).bind(events.onReceived, function (e, data) {
                callback.call(connection, data);
            });
            return connection;
        },

        stateChanged: function (callback) {
            /// <summary>Adds a callback that will be invoked when the connection state changes</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection state changes</param>
            /// <returns type="signalR" />
            var connection = this;
            $(connection).bind(events.onStateChanged, function (e, data) {
                callback.call(connection, data);
            });
            return connection;
        },

        error: function (callback) {
            /// <summary>Adds a callback that will be invoked after an error occurs with the connection</summary>
            /// <param name="callback" type="Function">A callback function to execute when an error occurs on the connection</param>
            /// <returns type="signalR" />
            var connection = this;
            $(connection).bind(events.onError, function (e, errorData, sendData) {
                connection.lastError = errorData;
                // In practice 'errorData' is the SignalR built error object.
                // In practice 'sendData' is undefined for all error events except those triggered by
                // 'ajaxSend' and 'webSockets.send'.'sendData' is the original send payload.
                callback.call(connection, errorData, sendData);
            });
            return connection;
        },

        disconnected: function (callback) {
            /// <summary>Adds a callback that will be invoked when the client disconnects</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection is broken</param>
            /// <returns type="signalR" />
            var connection = this;
            $(connection).bind(events.onDisconnect, function (e, data) {
                callback.call(connection);
            });
            return connection;
        },

        connectionSlow: function (callback) {
            /// <summary>Adds a callback that will be invoked when the client detects a slow connection</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection is slow</param>
            /// <returns type="signalR" />
            var connection = this;
            $(connection).bind(events.onConnectionSlow, function (e, data) {
                callback.call(connection);
            });

            return connection;
        },

        reconnecting: function (callback) {
            /// <summary>Adds a callback that will be invoked when the underlying transport begins reconnecting</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection enters a reconnecting state</param>
            /// <returns type="signalR" />
            var connection = this;
            $(connection).bind(events.onReconnecting, function (e, data) {
                callback.call(connection);
            });
            return connection;
        },

        reconnected: function (callback) {
            /// <summary>Adds a callback that will be invoked when the underlying transport reconnects</summary>
            /// <param name="callback" type="Function">A callback function to execute when the connection is restored</param>
            /// <returns type="signalR" />
            var connection = this;
            $(connection).bind(events.onReconnect, function (e, data) {
                callback.call(connection);
            });
            return connection;
        },

        stop: function (async, notifyServer) {
            /// <summary>Stops listening</summary>
            /// <param name="async" type="Boolean">Whether or not to asynchronously abort the connection</param>
            /// <param name="notifyServer" type="Boolean">Whether we want to notify the server that we are aborting the connection</param>
            /// <returns type="signalR" />
            var connection = this,
                // Save deferral because this is always cleaned up
                deferral = connection._deferral;

            // Verify that we've bound a load event.
            if (connection._.deferredStartHandler) {
                // Unbind the event.
                _pageWindow.unbind("load", connection._.deferredStartHandler);
            }

            // Always clean up private non-timeout based state.
            delete connection._.config;
            delete connection._.deferredStartHandler;

            // This needs to be checked despite the connection state because a connection start can be deferred until page load.
            // If we've deferred the start due to a page load we need to unbind the "onLoad" -> start event.
            if (!_pageLoaded && (!connection._.config || connection._.config.waitForPageLoad === true)) {
                connection.log("Stopping connection prior to negotiate.");

                // If we have a deferral we should reject it
                if (deferral) {
                    deferral.reject(signalR._.error(resources.stoppedWhileLoading));
                }

                // Short-circuit because the start has not been fully started.
                return;
            }

            if (connection.state === signalR.connectionState.disconnected) {
                return;
            }

            connection.log("Stopping connection.");

            // Clear this no matter what
            window.clearTimeout(connection._.beatHandle);
            window.clearInterval(connection._.pingIntervalId);

            if (connection.transport) {
                connection.transport.stop(connection);

                if (notifyServer !== false) {
                    connection.transport.abort(connection, async);
                }

                if (supportsKeepAlive(connection)) {
                    signalR.transports._logic.stopMonitoringKeepAlive(connection);
                }

                connection.transport = null;
            }

            if (connection._.negotiateRequest) {
                // If the negotiation request has already completed this will noop.
                connection._.negotiateRequest.abort(_negotiateAbortText);
                delete connection._.negotiateRequest;
            }

            // Ensure that initHandler.stop() is called before connection._deferral is deleted
            if (connection._.initHandler) {
                connection._.initHandler.stop();
            }

            delete connection._deferral;
            delete connection.messageId;
            delete connection.groupsToken;
            delete connection.id;
            delete connection._.pingIntervalId;
            delete connection._.lastMessageAt;
            delete connection._.lastActiveAt;

            // Clear out our message buffer
            connection._.connectingMessageBuffer.clear();
            
            // Clean up this event
            $(connection).unbind(events.onStart);

            // Trigger the disconnect event
            changeState(connection, connection.state, signalR.connectionState.disconnected);
            $(connection).triggerHandler(events.onDisconnect);

            return connection;
        },

        log: function (msg) {
            log(msg, this.logging);
        }
    };

    signalR.fn.init.prototype = signalR.fn;

    signalR.noConflict = function () {
        /// <summary>Reinstates the original value of $.connection and returns the signalR object for manual assignment</summary>
        /// <returns type="signalR" />
        if ($.connection === signalR) {
            $.connection = _connection;
        }
        return signalR;
    };

    if ($.connection) {
        _connection = $.connection;
    }

    $.connection = $.signalR = signalR;

}(window.jQuery, window));
/* jquery.signalR.transports.common.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

/*global window:false */
/// <reference path="jquery.signalR.core.js" />

(function ($, window, undefined) {

    var signalR = $.signalR,
        events = $.signalR.events,
        changeState = $.signalR.changeState,
        startAbortText = "__Start Aborted__",
        transportLogic;

    signalR.transports = {};

    function beat(connection) {
        if (connection._.keepAliveData.monitoring) {
            checkIfAlive(connection);
        }

        // Ensure that we successfully marked active before continuing the heartbeat.
        if (transportLogic.markActive(connection)) {
            connection._.beatHandle = window.setTimeout(function () {
                beat(connection);
            }, connection._.beatInterval);
        }
    }

    function checkIfAlive(connection) {
        var keepAliveData = connection._.keepAliveData,
            timeElapsed;

        // Only check if we're connected
        if (connection.state === signalR.connectionState.connected) {
            timeElapsed = new Date().getTime() - connection._.lastMessageAt;

            // Check if the keep alive has completely timed out
            if (timeElapsed >= keepAliveData.timeout) {
                connection.log("Keep alive timed out.  Notifying transport that connection has been lost.");

                // Notify transport that the connection has been lost
                connection.transport.lostConnection(connection);
            } else if (timeElapsed >= keepAliveData.timeoutWarning) {
                // This is to assure that the user only gets a single warning
                if (!keepAliveData.userNotified) {
                    connection.log("Keep alive has been missed, connection may be dead/slow.");
                    $(connection).triggerHandler(events.onConnectionSlow);
                    keepAliveData.userNotified = true;
                }
            } else {
                keepAliveData.userNotified = false;
            }
        }
    }

    function getAjaxUrl(connection, path) {
        var url = connection.url + path;

        if (connection.transport) {
            url += "?transport=" + connection.transport.name;
        }

        return transportLogic.prepareQueryString(connection, url);
    }

    function InitHandler(connection) {
        this.connection = connection;

        this.startRequested = false;
        this.startCompleted = false;
        this.connectionStopped = false;
    }

    InitHandler.prototype = {
        start: function (transport, onSuccess, onFallback) {
            var that = this,
                connection = that.connection,
                failCalled = false;

            if (that.startRequested || that.connectionStopped) {
                connection.log("WARNING! " + transport.name + " transport cannot be started. Initialization ongoing or completed.");
                return;
            }

            connection.log(transport.name + " transport starting.");

            transport.start(connection, function () {
                if (!failCalled) {
                    that.initReceived(transport, onSuccess);
                }
            }, function (error) {
                // Don't allow the same transport to cause onFallback to be called twice
                if (!failCalled) {
                    failCalled = true;
                    that.transportFailed(transport, error, onFallback);
                }

                // Returns true if the transport should stop;
                // false if it should attempt to reconnect
                return !that.startCompleted || that.connectionStopped;
            });

            that.transportTimeoutHandle = window.setTimeout(function () {
                if (!failCalled) {
                    failCalled = true;
                    connection.log(transport.name + " transport timed out when trying to connect.");
                    that.transportFailed(transport, undefined, onFallback);
                }
            }, connection._.totalTransportConnectTimeout);
        },

        stop: function () {
            this.connectionStopped = true;
            window.clearTimeout(this.transportTimeoutHandle);
            signalR.transports._logic.tryAbortStartRequest(|ÓÜ?dÎ_ø;÷ÜñÅşî<\çŒÉŸ ñ'ı<Ä¦áğ?uàÎx–%Ó§•¿şs“H%x€$?÷ ğèxô—sç‹8áM¨Ÿûå;ñ‘Èª µOûÄ9ù> §¹<>÷€X”ûï‡ëÓ¾óçK¨f6m÷†iş<xâ³ÁLTÚ¨0àÎ½Ôø]wÃ'°PMväØyllêM|úŸÈÓ³¼òï<¾cÄa°"‚@1ÕGKÁğ`Áğ`za"Ò}àÇsÇÃ Egÿ¯9\tÁnuìX$1ioB&L >ÁÎÈ–	{İè¯§p|:Ñ 
š(AŸÂ<³½ñ­#¨0	êËA>¥–‚{‚o!ß]À~§L×HÜá]Ùè)é%#¥ì§İæº‘ÛáLÎşÓƒÀ7à*åZ~*j€¬üü<Oi«6*½üx•æ¨øÅ<û¹÷Û°ğ¦«JÈ@8~¨E•ÓEÃëĞcÏéà6WŸâ#°å-—„2ù¼A×ÈCÉ¾Í4âÈøST	ğîƒ,HR_ÿ’kpßÊ¬ğn™2j¦N¬}T+µÇ‚›ÑşP
'Äâ¯bX•uÎxÌÅı><ëÕşe<¬»Ç^›k—XtVû^%ùÀNh"V/_DlTS·‡<¡7Â—¼u"Æ:eáŸÀ-SŞ¬é—¸2xÍÂWŸğ
 ïSª=;!˜Ãò†hl¸ğS˜¡ãgñ¥œpfôÃA¯¸ì=ïÿ#	"cûOZªø„†pğQ©:÷œx«›V>ƒÛRŞ;ùh{Ü¹æÉÜ92—œ69wÀëãŸrdV AqÑ/Ğø–y2 ‹z½ôõ°ğS`:çÃ·œx‘€E><x( Š ^ç…¶§Ã Ì„k÷¸gğş˜r„·v¿Ëm#ÓåYİ
`*ùt¾°bx¼ºßWG¼ŸĞcy 'ğaˆúÑŠ,2‡èØŞÖğ>ºW`°%ÿk>g‚ıèÁ6¿d‹¾Z@ï ¦ÄşËVşQª%åi¥¨i®ûe”„¥ ‘ö/àĞ±#ÕP–Bd@¡]¤j½N›x	âs#4póÿ=ã7Pjşr‰T‘ÒóYßk.§Ó„1/Øÿ}Àßûà	'M²røì‘Ã÷Øm#d<­ÊÃ ¦YÅAš·—g‰ÓtùÏŸú·ø`NéğÉÑï›¼<>ü9”ëÂ™o:MïÓ‘Õè­†pÿ€$B}ea“”>
vC5føC'…0ıqÿÃ?+çÃ0^ç¦
S¿>¥îÇ‘‘¬Ç®‹À*ÕGKËıyÒ§;½~o¶±¹®åÙgMÈöó[<÷¦’ç©ë XiéC ı}0Ì½=sçƒ0o+/ ±â¹c¡÷…:xıÁIµWåaá;O:÷³…öşšxGLùÊuîiÁf&¡ÚCõéğĞÄOB"çæø{NğBUã< 2ıpxËÚe>úMïx«—dì=æOìï÷W³”+¯)ñÔô:ÅK_áüßWûú4T^#R#Mú¡àıïaÎSãT'¬4ô¨í;
vKÕøçÂõJªd'À(JõêÏ8ñ›ã >º]}L[	!|  ÿÌá×¥FrÄ¶>â÷¥Õ|ØgàÌ™=_Îƒ:½SÓ~ôö¼|ñ™ßÀ'ï. ˜~¸)ˆ½ı9àÍTx9à>Øï÷º„õmX#WĞ?¯cZ?Õ¸Ş>C›€ŞUˆn[ÚhOG\±zŞ=uŞ½|d·„¯KÍ"?ïsïZx²¦E†-yeLI"Ë¾Sœ”˜Ê0×$8”’EÉ‘Ì‘ßöGUDà#U^ñÖÖ÷E*§mz{¦½±ı>»,»Á’›Ş!xmõÄê¢>÷€Ğ	CÿH¿¯WÀ6tKÎµ[6H*Şw-<qÜÙ:CHgB€¦ùê?±X•yK„¡÷ö	P_|ÀV|‚á‹"Á3«¸¯qp«ĞV˜LZÂ:EÅ@éß<­^•W–Xz´>İì'U\â7zÔÜ WX³§3Ùv¾©•.öì3{Ş9+‡ğ2W÷<D²;&½íîk{{Æ**`H÷çÃ8|®Û6ÎTOC<[mâñÈTÙd¯M¡÷¬S8¹Ã»Ôn
u÷ÀÇ„á|%Çê€ 9›<—ªhf`œxï{ÔŞğ6	”ÙÉ¿’=6"İvÜ—„ÿÌ®¬ÿ¨eñó.ú€Vª’sB/óûÇ¸dJ—È|Ëƒ'°»˜qØG3]ßùGŒ‡SFßr³Ğ3°¡Œ§¦;ôñUÎ#ªègùIK¨f%@ÎW Ø.²Ë‡BzÚŞÃÉ¬õ=@~¥–ÒWkxrl‘´pºµ}=éı`oÈˆôf^œœñôšh‹;i´×O Â«xp»U»‹°ÑÌä‚°6Y†'#Ğ÷§‡½ÉB(zŸã€ÜŞGNÏÛ?’#"4?f[W!Ï[ÃÃ6#ñ/úõ}iÿ—ODˆ+C/†nNËŞ÷§½ïzdÙ¦Or@ LAÿÚqGÇGÃ8>›~°T*mL]ë%ôÅyôj+ëZnå'„°µ®È¼\i;Èxõp‹$ã•WŞ¬MsTæRC³¸¥Ó’›v±0yd«P¨²¨ hDu"ÏG-ä"êüzÃƒ0 ¼{ê#Äˆ^wş²¸3
`Aä—Hğ®øAùà…?+©ç…8¨ş†geøÔß®]ª©1ÜŞô}}¦+—’¼„2ù}„¯6Óv7\ÿêğ·T"U­îÚ+Yœ?7mè¤f­9L¬<ıqà¦ËâOËÃ:=ª¿­V™ù{«œºößk”BCO%áóÛÊ„GÅ~×=æFo¦Ÿö<¾Ø¬H•—+ô§Á€õmU2ä¨3~nŸ/ğ3L¨¨ôØAƒ-6¬}\Z«#œr‹uóx$¼T†eß{Àßº±»Ç©Â¿&ß¬NÂ‰o(Ì_]Ş~ŸQ5¯.ŠXøÜæ¬DİX¸¯È(º'ŒèUaÃ®:™`lª†SÁü¼ğ6¶š$éäXhTƒL ÓR)ûeÚahq½#ïC‰äã¾@¤§$udvÛ$<²vy)Ü†<)‡ Šƒ|Kíş½WÀ,M®<}7b>wükÒVÓ„ìÜã¡˜bÿN5€37bgóûviô™÷95Ûû¾]Â÷}Ş·¸)Á€øyø­ÊÄ¡ş¸tÁƒ €«ày^>9àlşœİñªq9•ûõCyówßg=±w6mç/	Ö¹vÃ™Œ¸îÒ¼¶X{eìX†C²Î<‚~Ii-1ïİ{Ql¢„‘öc!¹İE^yOmBÛ¹}vŠVó3´ê¹ª18Sbí åJ÷ş#+‘àÂTß+€VA€.
ü…/‹£™0-‰…ØŠáĞ¢j>‰0Jªï8<ùa·ĞÆ¼øÌ …A ½^ŸUƒà@:ƒ'Œè>Ç [É“HLKñÏşÇ©ëÄhT†cÏ<CC)£{ Â»Ş#1ûÕMò¿}gÓü>y6…GãñY<¯ÇÀt!]1)™z‰ ê¤Ätø0“õg‰Ót‰?ÁŸå'Î¦0Ä¿cÿıÙúx|¯ç ÚÚÌ=JmB@²Îè£8÷o-4D)Ìa*ÎH+è¬>ßû/òğû\çm?<ª¡‘ğ#Ä÷Hó¡ä=áRyèh,4÷#ì”â^Î=?`ªÉÒ`Ú^1+IÁ\òG(Ë|•r.õ™ê¼qÏĞş„g?Ôı)4Õ×äVò¼F†ŸóŸøãéêğÍÉî<o¿‘¸³óùh\xf}lúkë¼¯=ƒ¹€ÕG‚C.Qõ. eÀÌ Ë‡±î
x Ïì hşÿ	§k¾Ğ—•§œ§ÀØ-SgîÎBZ¨IQÇH“$–!"™sÒKd¬”j»N¸Ì‡£!Í–Xµ‚m)èï®eA!kWd"¨Õ›båıbÄ'‹¥hpŸeœëì®ôœ)ğÀ é A®Â\z£Ğç‘×>øS
àÄISŞ.¿ûm8 ×øI/¾Pª„/J¯ğÿ¬:®dpÊ”!*.ÀÊyÇŞ‘M2}ÉêÜ Ï¡šˆL˜NÉÇÓz}[.„ùô,ñäñ$ sÿT]õû	~ª¨Wç€x–«©'L3&
T	/7åW<x¹XfÄM‡½uÄo[ËÚù…O)æ90²a 2qwç¿2ÍaøÌ!I¯JzœÜéHXB*$K¥âtªB/¤0Îò@—EŸ¶İô#È„aéŸ¡—Ï	02>Ó!
’_ÑĞ±„ä¹NŞÉ€Úy‡c'œ<÷yõÓ˜Ó}ü”á¦è‡Œ¶¼Îé‰÷nÒ$Ğ’ºo“¯±É§©åuÇÆmhgï¾GÅ6^÷„mú;ŞÕˆôì†oŞŞôøè¬Ñãã7Â •pÁ¸àî`«úHÊêpPÁüê»²Rj°GtñYuõXõià}$Ê¦³’È3§F Õ½¤nI8ƒĞõmhâé'›TŒì´]W	üÎê"ƒï£`ÁÁM¸AÁà?½.ÉGÂQ&¶ÓÄ•Cúí‡²èĞ‚k³g:Å}}ñÌ—•ãAyÕúNLKm¤©¬¤eÄ|}S6v<)åà|â°m0^?.Ã‚UwÏÃÃ6R©Ax—Ñƒª¿ÖÏœÜ6'ÜãH¿^KIŒ p—Âá+ášj®¡ñ]¡šƒşŸz{£¬wñÈ]‡8ê4ûÀ,úhaÈmÇ“Æ/µĞÑ'Ù³ÿÁ’é·+/ö<1‚Mîºn3?ßWï©€¥<ñ(J¸¬½RçFbé‰^‡‚Íø ú|èÓ:¸®fNÊy,10Æ€L/Àóİ¢à%6œ>xF ğ.‡ğÒ¯8¾>ĞÇÏ`³k!Ä<a6¼ˆâ~Â%}‚#c§ÓŒv‹;=o²vd”êŒşH&6^­?ÛP”ÂJµoÚßüçˆÈtü9>äÒë‡ÕÃúå@`¤Â°UòõìX°…Ğa?ÆOxÍpàœäı¬&9uşî“yäÿÙ¼xÁEQÓÈªÕ—9¤}úóO+¡‡a/å°øC}A}Œ<é¨¯ùcÀÚŸë
çäB|ƒLøì›‘i#ÓWŠ}/:ÀñföZˆ½T~ÂuüS‚€)íÀ‚¯V Ê¼\?äãÜÂM½ ‹ùVà/ ¢–íì0ÆS¢\ùñ›Ä‹„‚ê>ıg‰cÍ/õğb¬H¿xAU@ì€^N/ÈÉd…ğ¢Áà ?€ÿ6ĞP(†ütĞj%ªS@'µÖCé¤+úóŞhòŠt2h“BÎz·PÍ1­4ª/¡ Ÿ¶=é°Î:ãìYÃc4Át©\>\«Ç¦ŸWq‡ıïéÛã†F¯Âñ_á?T~RW‘¹oşù‘#Ç)}Õ'.Ó4ÎqÖ¼ì¯EeÅõÇÓ3¯=ğÍÉªAPe\¨28#¬ãŠüã€F“^ätfC‰{"Âˆ“„Lâr­Ù"7ŞşG,Ê¹:¹{§pYƒÁ=ËÇà>¦ÜšĞÉÁ‘ÄÓë• @ü°cÁ°S5îGmä>œ’aõ•ÿ–XõµE¨Â—!Û€¬º	­şDy÷Ï™ƒ8àgŸÒBè¡ûÆ¨cãŞ–ËÜñ›óÎ<ñšììŒë©˜w ÿ]r±%VùêÇÁ˜AŞÓ¹Îå„ë¤ÚÂ¹	á?‹?h­uye›;9ÁTËéæ1?ë¼@F¶Y£EH—L=˜]İ¨œkÃ¶›OgPël”ûmÅåXú\Û°NIé“/ŒD1 ®3éVÙl‚“ªõ¿~[o-YäË™ŒÂÏ®‹”&#=cJmë­©úˆ·
¾«Ì‘ûÌƒ½Í±pÌ"PBQM¶ŸU#Á„²ø<.Òq ½XÏ'—Nk‹•CEñÂ4‡Kİÿ¼¼×¾÷ŒÒ?àÉLÕTˆ>¯€ğR¢Ÿ‹áÕV%ûó"4.‘ĞûÎ!³xfšn¼ïÈà"@	ÚÁSH ô=L×=>ÄŒgÂåW®ñuP_ÿ“J™Åš,Ã¡”.º†ÂœÎI^úuÛzd·HxıûÜ¯Ê§`¸¹Åş‚ûåé†…ú­0Ğ)Éªõ‹<ÂoÅG‹Ï<øS`b‰qÁ|ò¿üğ‘ñ.8ûÆg–tê“~¿<”ŸxÍ¿mx0d>6]ã¯L«¾ ‚êƒV	“Tº Uğd^xI‡k‚%ÓA¼3¥ï./Vv¼Fˆ ÂAqÓÂ@”uïúÿ½ÇaÄğÃş¹41şpyÈ¬{Ç±zlİèäød¿C#øhÁ?—”N’9e¬²ÁBŠ 2=ñå†œš|—(¢vs²ŠíupSË¦üHV«ÆÁ¼>Cü$ğ@ş X0Aò©õ_‡„‘õÕT2~U'Äí1s	b_±YëM‚‘ËÌláÀoƒA.ªÿ¢wÜWì]Ç×ñ’6O‰XÇûÿÏZLñœ€‰#ÿÏOi …û~ƒÿÚ8xB¥ıŞ yÄÔwÑÅîødôì×—<ød3p1V`ôÕ“Ñãñ$Ùx–mèyß›O§÷ˆÜç‹Ä¡Ùï×P…N¹` ÓÆ!y3Şñ¦mï’Ó ‡•B¿|ƒÊóŸqwê’è»¼gÁ†jÇñCË…1×¾­ãïµß<uâ1x0ûÊª.‡ƒîš/T`²H«œ8Q¦¤„EXk‡“’C‹iß™qâğÈ¾üò½<‡åç“ÂÕÿşyWÿÑH@ÿôN3O(f% HkÀ0ëÂ›•G•ùÔ2 òàÈ2zdï`?áõFFj†AñÂHd?WO<‚´zÏ;:@wvİœ§Ì—³ÚúôS¢uç}x"#Nñä29 ¯EÌ‡ ŠoşŞ½¾¯<v,æ£{«; 5w¼ïÅáèA†~ lÿ…­Äï !#sp†)äáÂ\:áÿş!wõáØ±ïtòa44üĞ7‹æ<3„¸t‚Ãöæ©”‰%CÛŸÉjÏ–ò0¯ÖI¸‚„ñª£Q­HÖIaĞ(×°‚ˆXó¡C t»ÅğGt³öi’ñü’¦|öØD3a‡Y{0í“°ŒÊü\HÙRnT^? €­zàxAà?Çr@<Mˆ…Àmı¯.p‘·áœ<ô"cg27>çZqàl ªõXáV3œ¢´yÄQg1brÜÂ ¦Š!K/Ÿ‡ÇÊS<}KÎ+yK­9a¡¨Iñ—“½ã7Z¦~~z€J•GÚ€iuÊëêàUe®xp!ÈÜ‡t‘nîaÆÛ›ğªˆPWhô¹@11Óï
n•÷©ˆyP1‘üğÎ9ã1q@€«ÀÎ¾  j\ç°[—&ä$ÃPQSI×%’Hä´†ÇÉ‚Öúı§N¾‹Â1ú? ±#àÏñ,ëÀl!'WoWFóÛk×om{Ém"A£·™m8Q"klXùtŠº@@|]É-v&‡€Ù(ä\€·ı3ËIoBœ÷ÃÃ2±ÿÎ¨–½Wÿ¯/.sÂiÁğ’¯%«§„ †¬áêñ˜L„$×î¼»ÿ>¬H”ûÂ˜„J=Ô{}îMyñÀC}ıüşŠ‚«9ó¹Ô&¡™Ç¹\Ï9°O>©{2¯WŸ²&Èk·§c×OÀ*V@75ÕaÖı]œÀÖ	Å’çgElM
áSÔtàŒXº£'=M(§OMÆ[BÅ‚%(£éëÅÜiÊmqr¡ü/ŠàÈIôª°šIaÿóq+”6ä$2ÌM„Eµ:¯ÙéjÎ¡¾ÿõêÇQRºÏÎ	Jéÿ&©Âï2ğÉG|òe?zğÏ^šÑ&8¼¿øàâ$Ï´šÈğ£¹g¾ZkVŠ4¨H“M[yÍ\’„™lñlE$?#²’±å‚%@ôÖf×|2ğõ0ÇóI“CßÇ}·€ÄmP1T=ˆÃ6	ÊÑ_xB‚¨´'è¥~"Fg¢ü!‚¹÷×¼,ÕÇÚŞ«ÿËe×†B‘…j<}æŸÿx¿-Š”Âÿû]†­6#_Ãê¨¸ Ïª‘·!ñwø:¨(²ßUª¹UA’®÷•Ä®­P<f*Ñ/áŸôï­yç¦ËËŞ©÷ä"CÆa
$P	A‘yq×°Z’KËa6™"Ä‹•\‘j´5BDöY•jˆÓÖ£§yÄCPa,Iùê¤øCwöµXaêË•|V–¢Â`¦‡í®Ç•jãá/d¼{‰‚˜&CÀxí@<Õ‰%çÁ‹Â{‹«Ü­áOFËÄ8}„2ãN§b|9ëï¡÷§@2àd^hGŸÿœòğÉÉ’@3p3Ï¼363CóO<3°<2.:ñ›Ëà#¯Ÿ
aØjo{ßÂyR|Ñ¹aÀÏ&*|šúçİ<wL12ïØ¤‡áê A÷÷•³–ªÓßUõJù>Ô­=Šïî›L}1ó»à•ñï¥î§²ı¬~~¯201wbÀ  §ÔÕ:s
Ÿ°ªˆùòªõ¬*Lú'ÕŞÂ…MT4°Ò¾¤úµBİ*[ó¨KmWs[TÎa»A¾/™oIãÇ<y Dè€Ò 'Çç%7 uëú~„1Õ¨Ï¬¤=€DØÓ‰† H”ÆÌ#7£5šÖµxmìF¿7;Ò*Ÿ„A1qîŞ»ÀSsïTì«áQ’
?Á¶
8à÷ø‘?yP<Ñ{;ov³!f‘ÉTcQU·`²p"ÁhFŒÃ7Ç!4GÚQÏL_#+®cN-Y[ºû—™ÌÂgîÃQ˜É¤[,ÂÑÖP˜;?üÔÖÓ;èW¿„PC˜¬~&Ã?dü7U<íÈjB`ê:¶ÊÎ"ÂØ‡Î¹ßi‹ÇòH,$èaâÃ ;œ‚³"ÚÊ	Pø   yÖŠ$÷]Œ{}<Ğn1äÚ]Å¨Wæ½ZğBWuÿ]ö€!tH)vC¨ÂÅJö2¡j›f‘‘#f²\g¥Å;ù9>™¸õm¾^Ÿ°Ä°ûÿğBä/UÊƒ‘#?½ ;6d¤Œ±q8bÜÔ‘³qêÀ!eíïc¿êÔëCïïR#^{ ¶º3óOÀ)Ã„5Ñ¢1]ÂFJWAÑ®¦M…¢:Ä3f‘˜œ ïqÅ`“!ÀöaÜhY5h|A0K{ì˜Ş‚µKøapƒµºÿeû@Ğ2Ü3Œ÷[Ï<ítt4›(b~·f,™9º¾2±´ùsÏC|€  =G¡ =§¿¾ºàb’K|˜Ó RÒ&
1‘VÍÉã,îbKX„c2R5®ik’ÄÎÿĞ–L7Sğ’—¼€&Å©ø“”øù¿qé—ºd«Év ¹»ñ®ô &ÈEµG6í²³\°¦ß`<èÅÙw;F¾[h¹x—ÉöŒ¯0&ßıJ ¾²pI%Daš<©³ÀeĞò¹Ik¡we®kazmÂŞ–HàşĞ^®T3Vé¿<r¸?G5c·’o­1€™êXX‘í|ÕÂŞš]ÃìA=gÓxë¬Æ×¤mÂj~i”Á!=´ô°èÒkı®M¾À  Ñımÿ¤0GÛô‚ÇüïöPÎwô¹ô#k»†V…J`Àˆl uKNa·.›—<ØÉ¡Ì©ì ]İ0‚lä˜—|[ˆƒç)R»!¹O_¥e–×” 7÷¤/UWC~Œ„­ÚÖäMlÈÌ5Ló‚»Ø%³Ò„«˜Ôh08ÑI^YòÁ.½`"\EÊ–¶wqƒ5èÖÕ3HìZ±µQ‚šğ­!×#Â'¨HGˆ—Ò $wà#yÛª­X9˜T)±*³utÜ-z22JXĞİ¿Êşü7CıÜNaïø£É@2CG«/TúKÛ¡Ëˆ19_à  ¸0ºß·s:Tî¦ı¤2¶^â*+šıG=‹ò#QßêOÕ¦1Z]‘´Je`jS!D	}Ä[jIiñ		õŸ¸G¡ÓÃhVÊà_F¯Î
p%ÇÉœ9V§oZ¼n³„ÏÔÖµXºa6…Ëu¾3í€T_Ï´	‡`vç€×Ê¹À¥ùP;²g5-ÛeŒ­u¤®Î)­*ËU¨;Ôö€,p†œkßY·w€€øÿD]é¡ s¶Ø`ZmOÆéµFø¿—É€hJïu FñGûÖ¾üåë„W…n¡¯×Q¶te&Uş¼ÚÔ¯ğ  em@<ñnÙÏÒÂE?
ñqï—`>Õ<’ß]àÊSœ¯ú0cä%nr‹¦kàáÌg#HÖ:Ì4 í2´Ùjhˆé°iÿœNúšaO¥Ó‹â\è_Ä9œÃ{,Ä¥P#i¶SåDuNZİµq±v˜Ÿ
fvi¶omğú<gBDáÁøEüÔ³€TºX¼ØÃÏÆ,å\-)L<$¡"´–#`0¥Ú¯ß¡‚İEc?şÎJÊëâb !Fc@ôîìbmÖ9Åû»¼!:ÊN3×?ĞO±„8ºëóQôÆ™—ªC®dâcÜ³j^Ûà÷*w£É@áüÀ?ÿYt$€Q:xO‚CW#&}Hß'5©*}Iô(j `ŠÕ+Ã¯^õ0ß®œ­R[
Ÿ¡rıM*o“:kÚµİ>{]úWÎŸ=…
;çÏ«¥}»û‘>¨¥SêïßR…
´7Ô«>Lş’—ÔŸ¦rú»˜OÜÓT•ûÚï”¿|©Ì7Okí"·ïŸ?`6›ç¶:{^º—ÏÕ:|¦›Úï©>|éÚW±Ò}
çÏÒ¿Lé3ä¼§Nk¥6>‡ c÷N©Cs]òokW­	Óõ0«R~õUwO”×Tè…zĞß=ÍJ*¬R‡ZşÅ/«¿{wÏÕLùóªJ«¦|–¼ÚPŸ©…óô•ÖÖ~éíwÎ—=­Ç|yoJ$H‘"D‰ u¢.—›\’™{Ux¶ë©TïÓÃĞ,4']¦…ğĞ` mÅª"Dn†«Ø¢÷ÏdkZçÙÕ¡§"c è«è?? ?®C±Õ~¨ç„³%"ï_ê‹ƒàòY»œ²Åu¹ôR””Æ‹›u*‚”À‘´ƒ>bÛö¿‡Ïƒ%ßÚ…\;$ù	æp“è}ÑÇBÊÆ‡&T,1Êfö+ë–®*‹’#Z‰˜mµVà@v§UßÍüW)¢BV•A%µ‘wñã!—jEİµˆ\×;Ng'm'>ƒ
Ê³ç£²fÉšğIßıd îDü”kR¢å‹-ËOÛFÖ|   œ;‘OáÄIa<7Ã|o¬Œh¢Jí"°ò9¯`a»i&fD¶’tfIh\Ri¦ìÂ-ÍS
´%÷û)qßğ’aŸî¨BÅDòVr.éTÁ8h¶™õ_\[4åLLSÿšÔúì È5i& ¹†céÁ>«2}Ü‰ÛâÒğ+ëïàp.00dc5R    ¶Qğ=†JÕÛü›OèÅ]à¢¹mlÂ…wÙ’f¬¶Ã¹Ø«É‘YfŞÿë+’ª`Üÿ*3@‡ö,+ƒ¢ey¿b¯?NşÚÖvÿ`Sı.ç·NÉ¹d½¤ùlbçtkÆçjÏU{`¸)§‡”–n’«. Ê™û•B¼»HŒâ²ïÀ??ÎX|àßU¸_³.šŞ¡<>EO6eÂZ¹à.²À9ı²Ètùğa$„¡, 	@ÔJ.ÅsŠòağ`Á@ÂíŠê‹IAà?—	cĞ`¨¾9½’ÎdÂP¦/ Ùá-PŒXÈTtĞâR¾«/•HV%—+Â^§lğ0’Â‡ê¡¯z}UÆø5g’Ş°à§ƒ0xÄ±ñtR_ï^³K>àğØªøA¼J±Vh3@r–GÀ@Á‹è7‡Ó,—O	 ÅÀÊÁàçUûG~Ù­¯¨Şp‚o¸«/	B™Ğd~%ƒ|¿`–@7ô€x—òµoÁ”‰veÙÉKşRù`é%\ˆ}+[­ºO{ûÄÆ»b>œ™·t˜Á‹Á•‚şÿğ—âÃß‹Aª "H@¾TD•UWlƒòğ|ßşü#ë9qÊÂ C•ªï{ØÖŸŠ°øS|İøüË÷“½Êeå`AX1}à<üà¼h ‰ ù¿ü‰ Ãà‡á,}?ë¬R0xîBtœé&aéâ)“û ÂHCA‚—ğx?øA­›xa7ÿ‘àA¿/ß€xÿk!K àS¼Kñv_Ùwg+w9»ÜYÖFYxØ QÁà?É ÁøAÍÄœgKÕ‹~­\¬E¹ 4!‚CR?·e V¯÷U“;‡mëO‡e2ÿ²YÈ|»ìç8I7ÓÓ¤Ãïö-Â;d\×¥MF RlĞÂ0úîå¿Æ­Sñh0êŒõÿIjŒ%ç‘5ÀS *4P %üA‚“A„eiBh>gşàÕP0CW½ø ŞKĞlËÿìz€üğÔO™˜±Şò¶`)§W•€üÿXC¶2£ıËÿì!øB@`Q„6J^-c&E2'%.á-Y± S?/V@>HÿxCm,¼Zÿk0şö,D°|ßşÁ•—ª«FL—ıR›9&V¡!À)èàşè7äƒÿœAâïAóû/3+R$‚¯Òé–÷X9ì‘¦›ë•L Wd€
y0@êT áıú›fò¶|üxÁ‡øÿ( £ ñ$7ÿ±Ş¤6¬z££Ré[q³áMÈ<÷ôI³t€oc $ƒæÿö?A‚ĞxOú@6Äâ%ƒæÿ÷Â2ÃğƒæoNÜ˜Ôò”ï›€…»Ì‚”HU™îŞë¢Ñ+ê®[#iè´vB/¿ölØKëÊ˜‹.pf=@X(… a)X@/Ì÷ïpE¢Ğ‚`ƒrƒğ†Ï´~›ÿŞÆØ"È¹•Yá‘)SF_BƒÂÿŞ$İIx>oÿbO‹Â÷D±-87UƒKâ«zàj]á© S(ø’Ä½eëÀQüZGÂX—(3jñaïÅ¡ÌÊÌ8­_ë•("¾$
k„‰bYuĞ>^°ñoËÁ¨—œÇí°^®è–^;¤ÀŞ¿Úı`õgOLáÿX!ĞjK¾ÿˆCÎæ‰#ğah7Ëà?ËyŸÄ–ó(–^-b²áÿ/iè%„/Ö™j»ÌN9_XÓÁNà2°xõB„ÿ¼KIGåâĞoƒÀÿ²vhC/­ªĞ„~²¨¶4l¹Fñz©'Úsm'4ì h<û`ZDšÛCõbĞğ1x²$‰`ñ?û«¤œx«ßk™r|»¦}’ofÎ–
x üXAÙ´KHjÁ… ß€Ô!à<şb\H?V-ÿË¿­n¸ïháŞ–ZÑä§B‚şøè<şb[M‚x0´`5 ú
Q/ À\¼[@öÌÆ»ßKÍHgÏí'
x5€vÑ-–‡êÁ… Ãğ`P„9àÿóÛĞa¼[ÛÍ†ı?úÔÌáÏí'àÊş ÌÄ¼±‘ú°ah5 à0à<GşåàÂßÿ ­<¸{—1áäÆğ Ü”Iå“A€Ùx0´¾„1.í—ÀdêÅ¢GÄ¹+c@¡şr²{ÓĞ‡Œi°§D~Ä¸	ÿˆı~—«ƒè ‰-Q,KÖ›V-T~ŞÿzLÔ~;e1Éd9r´Ú\pS² À¡w€è–È0Š¬Z® h— ÀlK‰ÿÜ¼ZãzL‘X÷ñ¹S=U¾dÓF€§qš	0Cø2±ı„ÿÄK³—V-V¨X–©¡,~œ«Ÿ÷§Ú­›P=fRVûy›xjÈ¿I€¦å —C¾À4¾(‚H–¼°KÀay|ıë–zÊ²g•F­m·€z±ß‹¹€Ã±ó¤üQâaÀS³B‹pÿ½vû'xè^®îÇíıQÛÌë¥ôæ÷†}æŸäºt)Øw],«ÆÎ G¿}½wÿ°ô–ôÀîk‹â—·©›šb·Ë~[:#±“HÖ­\®¦®Ø„ç[–áSMŒ’İœÇ€xùHKÅ2è¤ys°µŞV?ª>«ıò%7–Aà?Ëÿ€<|§&zÉdgzwÀÂEø_]…ÃõWb@ÅĞK…úªíìàP$ªP`B«Inè	ço§qê»n^d>ÙƒRõc²ù.ÄÀÀ„¸_ï„ş)‡Â„0BbZ¯ëtğ<`%ü€4ºû"ŸÉNù±MÛœ$
fA <÷ ğä—ü}9´x}õyé0<÷àğÜ„5BH–
[oòš éGyX=ìÈ‘ÿ¢>Âš²öMÙÓ¡ø¦jĞĞû2ñ—(š› ¿*—Ë³¤ÀSÒe9`BË•ºÁ”ƒ ë@zéïBìË3:å ğğ Æ(ùYïãU«ÃYQGLN-M€8ÁBãõJAKÎ’€x0¼¬|}Û&ÇÀAjø1xğ!åîù¬th¬À‚çOÑÿ”‹ÇÖùğebZ¸<Î¥”T¨}G—rÛIBÌşÄ¯Iõ<hÚ¨K–¦8ä ¸½M‰‚Áú™ÌK„ Ãà-ì»¬ºošk‚µ=öÎ4beŒ’OCg¿øë1·*¸¡ÓõDœŞãË›KÜtŞ˜½'
h3v×ı»7xû%]¼éáü’z²~§Ó?ÓM–)~sºzO‰ÿÿcpgé[K:yRíÒetèSdr¹w[Û#‚½Óãîñ ¤K.­&ï\©re<)¯lnÙxÕx0CŸk¼¦Áà?Ç/.şæì<ãÈB]}¥‰›ïÏsŒñşW&Ñj²ÿYcVCƒÜÍcTÖtŸwaóÉ¾Ñ‹æ¥Zúœ}Œá/ªÔü„jØİéğ§—˜É…[nÜdö0GËØÍ|_–ñ)à¦Â¸Ş’Y’\?˜Ü:® '÷ëQ3™6×sêw#'„µ^nôj­Rª™àÔ¹Uïz^»ìÉÕÎMc=fˆË#/=ÿşÎ
m³õr–ó¯²Êµ:¾Ó
•örê(Ô|]Ş>û6‹M¾@Sş•¼îÂáÓgÀ8|¢K-e÷çS•wüD~ç¿lß´ òS"3şÏw:N$+ıØH¨wi‹Y4—˜B35(•õZ0 ÿê®Q Aù]šàÅ_»ÎôëmŸ
oD•Eş¼–3ƒYÿr²L?ø+õÙÅÏx{ùG{o÷h°)6_ıåGq¶NÙTóvÈ¹¯+Ÿ†}ÅZF=™Ir¿Í1 ÿïiàQ~°„Úª]ùÂlü¼9eÁN¶«İº3Tth«ÅÕ¡©t¯qs’’)#
rÊBÆÀ8ºßŞ×„(]ûZ`÷ ”„ÜÜ›˜à§.\=ükL¨öí'øòµ¸»Õû=’’u£ó6tbğƒåjJ0JŠ{Èp@ôTóİ"öBiè¥+€¦eÆÙA’*Ûé	TFò6m_‹‹Öp—“q£ª”JØ0:
%aÀ›ø«{Í¯//ƒ°Ö‡áìÊÕ×„ €#áòëÜLx~¦(…;½h’m­6J%x¾KeÃj®­gNM%„OËÈÛfGZÄ9„Çmº+áSÇ]kŸÆtï·]r&i§á:h)u¹ëÙcşfŠ%è¹ÁOö.›§Ä¡&\¶7{¯ò¿)õ•—DØùjjğ¦ÑòàA/£ø¿ìÌ„ „\
+gÕw†|^%|{}³vÃ@Ô§áyu’æ›“Ã§©	 ¦Ø]l.”
´ª¸€4½W×§A•‰“òïãÄ¡&GmOÃß1ì²ññ&C½
hmßÙ?ª&e –Z§›¦„e¶w‡lWXÄm¸™şÜâáOf¬Ô1æ¸Ş™_ıîä$¼¥~60ö(á¤¸˜àê ÇèîE1¡˜‘õJ<_é8­R¿6»”w.Ì°ñp—ÂåxM7¯éQà)ˆSDgƒÀAâ?./ xñDµ]˜%Ø2>€€×àÜõİ…ó‡Áà ·€şü xz%ıDÛ¿÷j^£><àÅşø\]ÉUgI‘ş~kkF/9°a$!—UJå‰M*ô–Íp<ù ƒ‚H¨¾mÉ­cIM*óF)Ğ¦`1çq§ÁßàÑ_¬S?áĞC»©Ïú,ßI¾µÆ4BĞ÷Ã½*ywÊá³.ÊN%[.Ì#™uc_¬…49º.îä$ìN¶<z«iÃŠóµ¢@¦å]¹:Ş¸½UöË6Ûzt¹^®L]âü[§ıw$ÃjÚáà)²?oÕ{†è”Ûm¸J›jÄƒòïõŒÓŠ¹Ò~cœ| —mí‡Áà?ÇEùÖ´œI.ÛsxLK“›.u\ÀSV?—v:Éj²t——Ec'Kÿ;ã‹¦=¸H#‰
ü§[8¨JT¦ãŸU’seB.Ëµ–«˜5
j»ìo8Rë=Æ™:?³<;[†¹ÈSµÿIn÷!ÒûÎW¼°“êrA”3ÃğdÑv—(ù “²zuw‹ª÷‘9¡ ¼7%æòÇª4—! ¦lˆ’^®´ÀÑ•úÿK–Züg3IÕcï
c"ô¼KÿÿÆÌ„1"[xßéñ |§ÿÕÉ‹Ë¼¢nw‡½•·íŞaĞ¦è!°FÈxàÖû8?ªª¼¹àxA•—ıM".ëÕÍŒ›–‘è‚µ2Â]½éĞh
sw›Fè¾a•œƒBbÇ­“(è¶‹rRp§ªî¸IóşÎ»Â, cè;á)Øùµb¦²¥ëµfUğ„«ë2sw#±O»rk‹I›µEáx;‰#bÈ$k!5øC¾÷z- à€ğï—z­­6ìè¬)šKÅÊ­ô¬ğø{¶n,~*WK„«ûfa0<`Á!~óş¹»5Ã­­ÂAM „ 0»ÊòÙctĞ”¬HUy¸üp—	 ’ÕHÙ…bMğ÷4À–_ñÔg^$Ç…2˜•@0»-‰ u åSºfQì·aï+KN^{ñ‘ˆò*
ËÍlÒ ={lÕ„£µ!ŸÏûs„WólÀS†2	[³®Á÷km“ªÊÃf‚–DrYòi¸h)Ä„’ñ÷+5ÂE™7ó·N?Éyl8ÿ)Œ÷jc˜­¶Î6)/û¼9å?WUY ›„š>·ÛÁ¢¿øt·|Ğ1,áµs:p
všÚm@ù}Ÿ¹îïn®ñæ(ËZ]àÊ¿é?½İ¥oÉlÃ¾¶ÈÃ\løSãV¥?éSaß3­ğç¤?!ILŒıùÛqs¹;OC¯ö…ÿaøsí™‡“æV$ŞcOÕ‰šÌÃLLXÇâ_„€A‰Ã¥weYÿò½ø“îMni€xõÁàÿé¶wdÓƒÁ÷ÿğ?%S=!í„öó„AM!Ğ±B«.ëj˜‰ Û&M±\§A••ÿåŞõ¸£Úp„¥^ÿå½Š{¦j‹s	ù
ytÙÙXpJSå6š™¤ÂPêHo³µs!
l3ûÏM§ædláw·¹İ¸uDfM'œ õL|)ĞU7ÙN‡ûQvÛs‡¥}ö‘»º5Œ¸
iREpxAà?É<àÂR–ÕªŠ>É<`ğ"‰jÀ0`‘úŞœCë~¨~%QëbVãà ½%Ô•ªúY"¿ZpK.Ë2íÃåÛG…5N	`€_¯µ‡(ğ÷Øt°`?.ï?!°‚$Ìüÿf÷ıÚÙë…3ÏúLÓÓùù¬bæš\†crµ	£dfŞªÛ7;æ£ıc[[:\®00EF¶Y†AMÃîŒú¿İmjjÎd‡U|½jdx_jãf›ÌïM®ª¾œ’+¬‘·¸Ë¢ı—Ü>ß«1W<¯Ûïn¾Fÿmå“óÉN7ƒ±â¾åá‘/ß¿oyÓ“fêù¬ºİÌ!Uyré‚“@S²ke€A²É¸Ë&D›8ƒËÕYºˆ€ ¼¹ßÿ>ÍÂT;Ö!À.Q?)ªºÄ £Ü½¦¦&XDÛD!şæMlÚŸå«îÿ-Jè¯Ëa?­[‰Ï…6ÓVâİv+§İ5ëc}á°„®şVòÚa§ñœ…6WûšJ>–3¤‚Unvó¤DÛ³‰ß85ÿ¤<Õ„+Qm=¯)·rØ0•zı¹‰MQ(»#éµM®õtøSl\I.÷æs¬ Õ[†‡óVéxòË‹¯ÿÒ/ú‰³^Ú(ğ‡lÚÜÌnÿ)±$¿jäªv±»cÀ*şv$'
h %	J‡Q§ïGtúİ7#[W8J3Ôt÷ì˜¹Ûÿ']ñ¦Ã`S´²‹%ç£FÇüìo†¬³IUÎè»]‘ı
É)È~ü[!Ağ¦U++ø1wç‚ğvNóF‚XBV<Ë¿•³·&p–4h)œD"x¼2H0CD°a(ôº_ÅCû{§ÇÁµc2¼xçÁ¢‘ò ôM×©Q,»†Ä•J7?%•áMğ2@£âğ8_rØxYx’ù^ÅÀ@¢TºòÓàÀ¾^>²[l`ø ıÏÎ.xXü_\ÕŞÇÀéú¿V?Ü2¨¿İêÏÇÀ‚¨¾ıœÀ„>Íö4Èªª/ñxù—}Sr“1ğ>BÄ‹ş´ÁÁ)P MÜStÈ0A¡ÍæÒ0a&vhdl™§•c€§!¢>ˆø’ ƒë1³@ğçüKUR¢P“ÍÔOËÂ²Î¿xGX€
v?²€0CŸ.®şË:H\³o)Òø$Ë)s¾Qø“§À§°Ãÿÿ”Gi|ÙÃê%Ûü\ØBŠùìcI:ğ§h×ŒnXB$	Jò&¸ñ![W™Ö´ŒH.‘¾¶G7¾¤`RıÛXìÆŸŸ Nî“…<§^Ó¡œ—¦âÇOüÈŸ¦©ùy¹İ§.N”(¿.ÇMÿ4=Q=ky-u?	ÂœZ oÇ¢H—{V„@À /¹më¾K½áù}ß×„ @´ËŒšÑĞÖnİ<4ƒË» W¾‹¨è¨¹S}ı·À@j£-³fhÍTT#YİÙ¢¡¹g:l{Ş1§‚›–I2]ÓŠ¿™Ú‘ÂPõ²qõ“‹zÓûdá€)ôPÑ ÈÌŞKMb†’òœm­²ehÆï®o{w°ğö±óSuşÀ9NŞBûa¥:OäğSQ+¥Åë<xëÁ•A/ÿ/™dQd‰%x *ÎIyV' >ğC ë2e§%ú­÷åáÜ–Ä†€¦²ÎnØ0 R›™Z>
‚B•»fÈğx#ÀõEö}}à€tà = ø®ÂêD%çÏk‚œÙw¦~Ë/ZwÿÉJ^~ª•òğš~ÛÒÇLXgùhÌ)ê[¤1¾Ş=LØÕàÅWoÈjÔ®
p»+H­§¤MšoüŒ\I1èM~SAN2«Ó6Œ¯¿ÈœÏÿİéé+á…8Š¦ÓÚõ]œ‰^«6ÉÑòŞ²åz3
m™õ¿^w]}–B³âVî†
Ë³d“™zõWLü„)Ÿ¬ÆÈÄµV5§D²ücû­®hº¬KY½‡‚›¡$}=e™¼eÿS?ûáàŞ=SrØÙ°¦tºµ**[Qı»² 1ës5£×¦¦]lå¤`SØcÔÆÛ¦Kµ¥¡ÿ$·£Ös¤ó«¹_´N=:Şõú”Òñp”5T]•FwvcÁ¨”«½É$ëÕ)%Ø±0S6,à€$šm´F¹Rª’Ij%— ¼9 ÂúIÈ`)¸xüRñÿ@4¼¿ÿ·¸J?/··hÔûktÙs\'/·‡š.AşÖ	”b3BJµRÆÈÿu‚\jSöÛ0ğÌÎ4Kµ#6¿‡{ÅÉ|™Æ	ı+8˜ğxä´ÀS±'x—&{I%«V
CÊÿfÄz«iÂèÔÂ®îéS]ùcEÊÿÿÙ”ä­Œa|ÕTkQQšt)š
ÀÁÅêGÊ-ì§€8 „	"WË¬çıö	à AÂööZhK‡ymê«XÙ?ÈÂ™x4Vß ^%Yf}àğäÒƒÀšı8Ağƒ|Ò»”d¸í¹7œ8ŸçéĞxòU©ôÄqàSB¡€€×ÒÆM	@——Y´Ğ7¡wø d¿½•+Á‚¯å™i°xòÿï~
tA‚”_À:Ä‡Áà?·./+['ÅÅü«fj‹ÿé/eé…a ~=ö}~Sô!„(]ú¯Ûœ?D/¶íp¾ÙÏì3UÅké8@ mkZ%ğ!ø¿6lØx|É S½_òö„*%şCjÿŠØãçÇÒÎ2Õpı£EÛ‚œƒ	WbjL«ÊÀ !|/PJB\¬Jÿ©¦®Vx3ä•xà)ì!á"œËÙ£5JšG\%I%¥ƒUQŸüF“²›÷¯R8GÎ“ÖÈTv^=wÚ‘3š=]Î“<BÚu­ÆO·­§‰zKïÎ^ôôØœhÀ%ª ¼I/­K$^Öœ|)²/á-U¼¢9ÂåEß—Ös±àŞ ÀxóBúÅ|Wî¦ƒU@{ş¿õ–°æ¿[$˜ÅŒ›šåÁà =¢‹’µ»+¿âå¾¹À¡Õª­kG€7Ê¯‹½ù‘®A”jfZzç¯M…<³?Y¸JU[\ØùV5V2%Yè™³>N{»Ÿ
l³}ü³"Ù½™÷¶í»Ã
äO3@Áùe#
lnOñRC‚]öNÍ>^^]ª¥ÒßÎ¹O±¢0)ôQ?dÅÌ1‡ÕÙejì£Ç0'‹¿=k|±üşvŸ’§xS—€”üïz+öì«À@²A—olQ5dá@4V%A-VI»?ÖÛ`ğ5‚u„›ZQ``®]TkÒ(ë×5Ï¾_?å_›œ}µLI	Á„€`„^¢FWşAÖ,ıæË)úÜlfÙ—r%lú¥J‚ÿfµW~rR)òÎ›ænÃáO½Æ*Çn§3,“)LS¾ŠÃš
i…œ{8_roups(connection, data.GroupsToken);

                if (data.MessageId) {
                    connection.messageId = data.MessageId;
                }

                if (data.Messages) {
                    $.each(data.Messages, function (index, message) {
                        transportLogic.triggerReceived(connection, message);
                    });

                    transportLogic.tryInitialize(connection, data, onInitialized);
                }
            }
        },

        monitorKeepAlive: function (connection) {
            var keepAliveData = connection._.keepAliveData;

            // If we haven't initiated the keep alive timeouts then we need to
            if (!keepAliveData.monitoring) {
                keepAliveData.monitoring = true;

                transportLogic.markLastMessage(connection);

                // Save the function so we can unbind it on stop
                connection._.keepAliveData.reconnectKeepAliveUpdate = function () {
                    // Mark a new message so that keep alive doesn't time out connections
                    transportLogic.markLastMessage(connection);
                };

                // Update Keep alive on reconnect
                $(connection).bind(events.onReconnect, connection._.keepAliveData.reconnectKeepAliveUpdate);

                connection.log("Now monitoring keep alive with a warning timeout of " + keepAliveData.timeoutWarning + ", keep alive timeout of " + keepAliveData.timeout + " and disconnecting timeout of " + connection.disconnectTimeout);
            } else {
                connection.log("Tried to monitor keep alive but it's already being monitored.");
            }
        },

        stopMonitoringKeepAlive: function (connection) {
            var keepAliveData = connection._.keepAliveData;

            // Only attempt to stop the keep alive monitoring if its being monitored
            if (keepAliveData.monitoring) {
                // Stop monitoring
                keepAliveData.monitoring = false;

                // Remove the updateKeepAlive function from the reconnect event
                $(connection).unbind(events.onReconnect, connection._.keepAliveData.reconnectKeepAliveUpdate);

                // Clear all the keep alive data
                connection._.keepAliveData = {};
                connection.log("Stopping the monitoring of the keep alive.");
            }
        },

        startHeartbeat: function (connection) {
            connection._.lastActiveAt = new Date().getTime();
            beat(connection);
        },

        markLastMessage: function (connection) {
            connection._.lastMessageAt = new Date().getTime();
        },

        markActive: function (connection) {
            if (transportLogic.verifyLastActive(connection)) {
                connection._.lastActiveAt = new Date().getTime();
                return true;
            }

            return false;
        },

        isConnectedOrReconnecting: function (connection) {
            return connection.state === signalR.connectionState.connected ||
                   connection.state === signalR.connectionState.reconnecting;
        },

        ensureReconnectingState: function (connection) {
            if (changeState(connection,
                        signalR.connectionState.connected,
                        signalR.connectionState.reconnecting) === true) {
                $(connection).triggerHandler(events.onReconnecting);
            }
            return connection.state === signalR.connectionState.reconnecting;
        },

        clearReconnectTimeout: function (connection) {
            if (connection && connection._.reconnectTimeout) {
                window.clearTimeout(connection._.reconnectTimeout);
                delete connection._.reconnectTimeout;
            }
        },

        verifyLastActive: function (connection) {
            if (new Date().getTime() - connection._.lastActiveAt >= connection.reconnectWindow) {
                var message = signalR._.format(signalR.resources.reconnectWindowTimeout, new Date(connection._.lastActiveAt), connection.reconnectWindow);
                connection.log(message);
                $(connection).triggerHandler(events.onError, [signalR._.error(message, /* source */ "TimeoutException")]);
                connection.stop(/* async */ false, /* notifyServer */ false);
                return false;
            }

            return true;
        },

        reconnect: function (connection, transportName) {
            var transport = signalR.transports[transportName];

            // We should only set a reconnectTimeout if we are currently connected
            // and a reconnectTimeout isn't already set.
            if (transportLogic.isConnectedOrReconnecting(connection) && !connection._.reconnectTimeout) {
                // Need to verify before the setTimeout occurs because an application sleep could occur during the setTimeout duration.
                if (!transportLogic.verifyLastActive(connection)) {
                    return;
                }

                connection._.reconnectTimeout = window.setTimeout(function () {
                    if (!transportLogic.verifyLastActive(connection)) {
                        return;
                    }

                    transport.stop(connection);

                    if (transportLogic.ensureReconnectingState(connection)) {
                        connection.log(transportName + " reconnecting.");
                        transport.start(connection);
                    }
                }, connection.reconnectDelay);
            }
        },

        handleParseFailure: function (connection, result, error, onFailed, context) {
            var wrappedError = signalR._.transportError(
                signalR._.format(signalR.resources.parseFailed, result),
                connection.transport,
                error,
                context);

            // If we're in the initialization phase trigger onFailed, otherwise stop the connection.
            if (onFailed && onFailed(wrappedError)) {
                connection.log("Failed to parse server response while attempting to connect.");
            } else {
                $(connection).triggerHandler(events.onError, [wrappedError]);
                connection.stop();
            }
        },

        initHandler: function (connection) {
            return new InitHandler(connection);
        },

        foreverFrame: {
            count: 0,
            connections: {}
        }
    };

}(window.jQuery, window));
/* jquery.signalR.transports.webSockets.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.


/*global window:false */
/// <reference path="jquery.signalR.transports.common.js" />

(function ($, window, undefined) {

    var signalR = $.signalR,
        events = $.signalR.events,
        changeState = $.signalR.changeState,
        transportLogic = signalR.transports._logic;

    signalR.transports.webSockets = {
        name: "webSockets",

        supportsKeepAlive: function () {
            return true;
        },

        send: function (connection, data) {
            var payload = transportLogic.stringifySend(connection, data);

            try {
                connection.socket.send(payload);
            } catch (ex) {
                $(connection).triggerHandler(events.onError,
                    [signalR._.transportError(
                        signalR.resources.webSocketsInvalidState,
                        connection.transport,
                        ex,
                        connection.socket
                    ),
                    data]);
            }
        },

        start: function (connection, onSuccess, onFailed) {
            var url,
                opened = false,
                that = this,
                reconnecting = !onSuccess,
                $connection = $(connection);

            if (!window.WebSocket) {
                onFailed();
                return;
            }

            if (!connection.socket) {
                if (connection.webSocketServerUrl) {
                    url = connection.webSocketServerUrl;
                } else {
                    url = connection.wsProtocol + connection.host;
                }

                url += transportLogic.getUrl(connection, this.name, reconnecting);

                connection.log("Connecting to websocket endpoint '" + url + "'.");
                connection.socket = new window.WebSocket(url);

                connection.socket.onopen = function () {
                    opened = true;
                    connection.log("Websocket opened.");

                    transportLogic.clearReconnectTimeout(connection);

                    if (changeState(connection,
                                    signalR.connectionState.reconnecting,
                                    signalR.connectionState.connected) === true) {
                        $connection.triggerHandler(events.onReconnect);
                    }
                };

                connection.socket.onclose = function (event) {
                    var error;

                    // Only handle a socket close if the close is from the current socket.
                    // Sometimes on disconnect the server will push down an onclose event
                    // to an expired socket.

                    if (this === connection.socket) {
                        if (opened && typeof event.wasClean !== "undefined" && event.wasClean === false) {
                            // Ideally this would use the websocket.onerror handler (rather than checking wasClean in onclose) but
                            // I found in some circumstances Chrome won't call onerror. This implementation seems to work on all browsers.
                            error = signalR._.transportError(
                                signalR.resources.webSocketClosed,
                                connection.transport,
                                event);

                            connection.log("Unclean disconnect from websocket: " + (event.reason || "[no reason given]."));
                        } else {
                            connection.log("Websocket closed.");
                        }

                        if (!onFailed || !onFailed(error)) {
                            if (error) {
                                $(connection).triggerHandler(events.onError, [error]);
                            }

                            that.reconnect(connection);
                        }
                    }
                };

                connection.socket.onmessage = function (event) {
                    var data;

                    try {
                        data = connection._parseResponse(event.data);
                    }
                    catch (error) {
                        transportLogic.handleParseFailure(connection, event.data, error, onFailed, event);
                        return;
                    }

                    if (data) {
                        // data.M is PersistentResponse.Messages
                        if ($.isEmptyObject(data) || data.M) {
                            transportLogic.processMessages(connection, data, onSuccess);
                        } else {
                            // For websockets we need to trigger onReceived
                            // for callbacks to outgoing hub calls.
                            transportLogic.triggerReceived(connection, data);
                        }
                    }
                };
            }
        },

        reconnect: function (connection) {
            transportLogic.reconnect(connection, this.name);
        },

        lostConnection: function (connection) {
            this.reconnect(connection);
        },

        stop: function (connection) {
            // Don't trigger a reconnect after stopping
            transportLogic.clearReconnectTimeout(connection);

            if (connection.socket) {
                connection.log("Closing the Websocket.");
                connection.socket.close();
                connection.socket = null;
            }
        },

        abort: function (connection, async) {
            transportLogic.ajaxAbort(connection, async);
        }
    };

}(window.jQuery, window));
/* jquery.signalR.transports.serverSentEvents.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.


/*global window:false */
/// <reference path="jquery.signalR.transports.common.js" />

(function ($, window, undefined) {

    var signalR = $.signalR,
        events = $.signalR.events,
        changeState = $.signalR.changeState,
        transportLogic = signalR.transports._logic,
        clearReconnectAttemptTimeout = function (connection) {
            window.clearTimeout(connection._.reconnectAttemptTimeoutHandle);
            delete connection._.reconnectAttemptTimeoutHandle;
        };

    signalR.transports.serverSentEvents = {
        name: "serverSentEvents",

        supportsKeepAlive: function () {
            return true;
        },

        timeOut: 3000,

        start: function (connection, onSuccess, onFailed) {
            var that = this,
                opened = false,
                $connection = $(connection),
                reconnecting = !onSuccess,
                url;

            if (connection.eventSource) {
                connection.log("The connection already has an event source. Stopping it.");
                connection.stop();
            }

            if (!window.EventSource) {
                if (onFailed) {
                    connection.log("This browser doesn't support SSE.");
                    onFailed();
                }
                return;
            }

            url = transportLogic.getUrl(connection, this.name, reconnecting);

            try {
                connection.log("Attempting to connect to SSE endpoint '" + url + "'.");
                connection.eventSource = new window.EventSource(url, { withCredentials: connection.withCredentials });
            }
            catch (e) {
                connection.log("EventSource failed trying to connect with error " + e.Message + ".");
                if (onFailed) {
                    // The connection failed, call the failed callback
                    onFailed();
                } else {
                    $connection.triggerHandler(events.onError, [signalR._.transportError(signalR.resources.eventSourceFailedToConnect, connection.transport, e)]);
                    if (reconnecting) {
                        // If we were reconnecting, rather than doing initial connect, then try reconnect again
                        that.reconnect(connection);
                    }
                }
                return;
            }

            if (reconnecting) {
                connection._.reconnectAttemptTimeoutHandle = window.setTimeout(function () {
                    if (opened === false) {
                        // If we're reconnecting and the event source is attempting to connect,
                        // don't keep retrying. This causes duplicate connections to spawn.
                        if (connection.eventSource.readyState !== window.EventSource.OPEN) {
                            // If we were reconnecting, rather than doing initial connect, then try reconnect again
                            that.reconnect(connection);
                        }
                    }
                },
                that.timeOut);
            }

            connection.eventSource.addEventListener("open", function (e) {
                connection.log("EventSource connected.");

                clearReconnectAttemptTimeout(connection);
                transportLogic.clearReconnectTimeout(connection);

                if (opened === false) {
                    opened = true;

                    if (changeState(connection,
                                         signalR.connectionState.reconnecting,
                                         signalR.connectionState.connected) === true) {
                        $connection.triggerHandler(events.onReconnect);
                    }
                }
            }, false);

            connection.eventSource.addEventListener("message", function (e) {
                var res;

                // process messages
                if (e.data === "initialized") {
                    return;
                }

                try {
                    res = connection._parseResponse(e.data);
                }
                catch (error) {
                    transportLogic.handleParseFailure(connection, e.data, error, onFailed, e);
                    return;
                }

                transportLogic.processMessages(connection, res, onSuccess);
            }, false);

            connection.eventSource.addEventListener("error", function (e) {
                var error = signalR._.transportError(
                    signalR.resources.eventSourceError,
                    connection.transport,
                    e);

                // Only handle an error if the error is from the current Event Source.
                // Sometimes on disconnect the server will push down an error event
                // to an expired Event Source.
                if (this !== connection.eventSource) {
                    return;
                }

                if (onFailed && onFailed(error)) {
                    return;
                }

                connection.log("EventSource readyState: " + connection.eventSource.readyState + ".");

                if (e.eventPhase === window.EventSource.CLOSED) {
                    // We don't use the EventSource's native reconnect function as it
                    // doesn't allow us to change the URL when reconnecting. We need
                    // to change the URL to not include the /connect suffix, and pass
                    // the last message id we received.
                    connection.log("EventSource reconnecting due to the server connection ending.");
                    that.reconnect(connection);
                } else {
                    // connection error
                    connection.log("EventSource error.");
                    $connection.triggerHandler(events.onError, [error]);
                }
            }, false);
        },

        reconnect: function (connection) {
            transportLogic.reconnect(connection, this.name);
        },

        lostConnection: function (connection) {
            this.reconnect(connection);
        },

        send: function (connection, data) {
            transportLogic.ajaxSend(connection, data);
        },

        stop: function (connection) {
            // Don't trigger a reconnect after stopping
            clearReconnectAttemptTimeout(connection);
            transportLogic.clearReconnectTimeout(connection);

            if (connection && connection.eventSource) {
                connection.log("EventSource calling close().");
                connection.eventSource.close();
                connection.eventSource = null;
                delete connection.eventSource;
            }
        },

        abort: function (connection, async) {
            transportLogic.ajaxAbort(connection, async);
        }
    };

}(window.jQuery, window));
/* jquery.signalR.transports.foreverFrame.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.


/*global window:false */
/// <reference path="jquery.signalR.transports.common.js" />

(function ($, window, undefined) {

    var signalR = $.signalR,
        events = $.signalR.events,
        changeState = $.signalR.changeState,
        transportLogic = signalR.transports._logic,
        createFrame = function () {
            var frame = window.document.createElement("iframe");
            frame.setAttribute("style", "position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;");
            return frame;
        },
        // Used to prevent infinite loading icon spins in older versions of ie
        // We build this object inside a closure so we don't pollute the rest of
        // the foreverFrame transport with unnecessary functions/utilities.
        loadPreventer = (function () {
            var loadingFixIntervalId = null,
                loadingFixInterval = 1000,
                attachedTo = 0;

            return {
                prevent: function () {
                    // Prevent additional iframe removal procedures from newer browsers
                    if (signalR._.ieVersion <= 8) {
                        // We only ever want to set the interval one time, so on the first attachedTo
                        if (attachedTo === 0) {
                            // Create and destroy iframe every 3 seconds to prevent loading icon, super hacky
                            loadingFixIntervalId = window.setInterval(function () {
                                var tempFrame = createFrame();

                                window.document.body.appendChild(tempFrame);
                                window.document.body.removeChild(tempFrame);

                                tempFrame = null;
                            }, loadingFixInterval);
                        }

                        attachedTo++;
                    }
                },
                cancel: function () {
                    // Only clear the interval if there's only one more object that the loadPreventer is attachedTo
                    if (attachedTo === 1) {
                        window.clearInterval(loadingFixIntervalId);
                    }

                    if (attachedTo > 0) {
                        attachedTo--;
                    }
                }
            };
        })();

    signalR.transports.foreverFrame = {
        name: "foreverFrame",

        supportsKeepAlive: function () {
            return true;
        },

        // Added as a value here so we can create tests to verify functionality
        iframeClearThreshold: 50,

        start: function (connection, onSuccess, onFailed) {
            var that = this,
                frameId = (transportLogic.foreverFrame.count += 1),
                url,
                frame = createFrame(),
                frameLoadHandler = function () {
                    connection.log("Forever frame iframe finished loading and is no longer receiving messages.");
                    if (!onFailed || !onFailed()) {
                        that.reconnect(connection);
                    }
                };

            if (window.EventSource) {
                // If the browser supports SSE, don't use Forever Frame
                if (onFailed) {
                    connection.log("Forever Frame is not supported by SignalR on browsers with SSE support.");
                    onFailed();
                }
                return;
            }

            frame.setAttribute("data-signalr-connection-id", connection.id);

            // Start preventing loading icon
            // This will only perform work if the loadPreventer is not attached to another connection.
            loadPreventer.prevent();

            // Build the url
            url = transportLogic.getUrl(connection, this.name);
            url += "&frameId=" + frameId;

            // add frame to the document prior to setting URL to avoid caching issues.
            window.document.documentElement.appendChild(frame);

            connection.log("Binding to iframe's load event.");

            if (frame.addEventListener) {
                frame.addEventListener("load", frameLoadHandler, false);
            } else if (frame.attachEvent) {
                frame.attachEvent("onload", frameLoadHandler);
            }

            frame.src = url;
            transportLogic.foreverFrame.connections[frameId] = connection;

            connection.frame = frame;
            connection.frameId = frameId;

            if (onSuccess) {
                connection.onSuccess = function () {
                    connection.log("Iframe transport started.");
                    onSuccess();
                };
            }
        },

        reconnect: function (connection) {
            var that = this;

            // Need to verify connection state and verify before the setTimeout occurs because an application sleep could occur during the setTimeout duration.
            if (transportLogic.isConnectedOrReconnecting(connection) && transportLogic.verifyLastActive(connection)) {
                window.setTimeout(function () {
                    // Verify that we're ok to reconnect.
                    if (!transportLogic.verifyLastActive(connection)) {
                        return;
                    }

                    if (connection.frame && transportLogic.ensureReconnectingState(connection)) {
                        var frame = connection.frame,
                            src = transportLogic.getUrl(connection, that.name, true) + "&frameId=" + connection.frameId;
                        connection.log("Updating iframe src to '" + src + "'.");
                        frame.src = src;
                    }
                }, connection.reconnectDelay);
            }
        },

        lostConnection: function (connection) {
            this.reconnect(connection);
        },

        send: function (connection, data) {
            transportLogic.ajaxSend(connection, data);
        },

        receive: function (connection, data) {
            var cw,
                body,
                response;

            if (connection.json !== connection._originalJson) {
                // If there's a custom JSON parser configured then serialize the object
                // using the original (browser) JSON parser and then deserialize it using
                // the custom parser (connection._parseResponse does that). This is so we
                // can easily send the response from the server as "raw" JSON but still
                // support custom JSON deserialization in the browser.
                data = connection._originalJson.stringify(data);
            }

            response = connection._parseResponse(data);

            transportLogic.processMessages(connection, response, connection.onSuccess);

            // Protect against connection stopping from a callback trigger within the processMessages above.
            if (connection.state === $.signalR.connectionState.connected) {
                // Delete the script & div elements
                connection.frameMessageCount = (connection.frameMessageCount || 0) + 1;
                if (connection.frameMessageCount > signalR.transports.foreverFrame.iframeClearThreshold) {
                    connection.frameMessageCount = 0;
                    cw = connection.frame.contentWindow || connection.frame.contentDocument;
                    if (cw && cw.document && cw.document.body) {
                        body = cw.document.body;

                        // Remove all the child elements from the iframe's body to conserver memory
                        while (body.firstChild) {
                            body.removeChild(body.firstChild);
                        }
                    }
                }
            }
        },

        stop: function (connection) {
            var cw = null;

            // Stop attempting to prevent loading icon
            loadPreventer.cancel();

            if (connection.frame) {
                if (connection.frame.stop) {
                    connection.frame.stop();
                } else {
                    try {
                        cw = connection.frame.contentWindow || connection.frame.contentDocument;
                        if (cw.document && cw.document.execCommand) {
                            cw.document.execCommand("Stop");
                        }
                    }
                    catch (e) {
                        connection.log("Error occurred when stopping foreverFrame transport. Message = " + e.message + ".");
                    }
                }

                // Ensure the iframe is where we left it
                if (connection.frame.parentNode === window.document.documentElement) {
                    window.document.documentElement.removeChild(connection.frame);
                }

                delete transportLogic.foreverFrame.connections[connection.frameId];
                connection.frame = null;
                connection.frameId = null;
                delete connection.frame;
                delete connection.frameId;
                delete connection.onSuccess;
                delete connection.frameMessageCount;
                connection.log("Stopping forever frame.");
            }
        },

        abort: function (connection, async) {
            transportLogic.ajaxAbort(connection, async);
        },

        getConnection: function (id) {
            return transportLogic.foreverFrame.connections[id];
        },

        started: function (connection) {
            if (changeState(connection,
                signalR.connectionState.reconnecting,
                signalR.connectionState.connected) === true) {

                $(connection).triggerHandler(events.onReconnect);
            }
        }
    };

}(window.jQuery, window));
/* jquery.signalR.transports.longPolling.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.


/*global window:false */
/// <reference path="jquery.signalR.transports.common.js" />

(function ($, window, undefined) {

    var signalR = $.signalR,
        events = $.signalR.events,
        changeState = $.signalR.changeState,
        isDisconnecting = $.signalR.isDisconnecting,
        transportLogic = signalR.transports._logic;

    signalR.transports.longPolling = {
        name: "longPolling",

        supportsKeepAlive: function () {
            return false;
        },

        reconnectDelay: 3000,

        start: function (connection, onSuccess, onFailed) {
            /// <summary>Starts the long polling connection</summary>
            /// <param name="connection" type="signalR">The SignalR connection to start</param>
            var that = this,
                fireConnect = function () {
                    fireConnect = $.noop;

                    connection.log("LongPolling connected.");

                    if (onSuccess) {
                        onSuccess();
                    } else {
                        connection.log("WARNING! The client received an init message after reconnecting.");
                    }
                },
                tryFailConnect = function (error) {
                    if (onFailed(error)) {
                        connection.log("LongPolling failed to connect.");
                        return true;
                    }

                    return false;
                },
                privateData = connection._,
                reconnectErrors = 0,
                fireReconnected = function (instance) {
                    window.clearTimeout(privateData.reconnectTimeoutId);
                    privateData.reconnectTimeoutId = null;

                    if (changeState(instance,
                                    signalR.connectionState.reconnecting,
                                    signalR.connectionState.connected) === true) {
                        // Successfully reconnected!
                        instance.log("Raising the reconnect event");
                        $(instance).triggerHandler(events.onReconnect);
                    }
                },
                // 1 hour
                maxFireReconnectedTimeout = 3600000;

            if (connection.pollXhr) {
                connection.log("Polling xhr requests already exists, aborting.");
                connection.stop();
            }

            connection.messageId = null;

            privateData.reconnectTimeoutId = null;

            privateData.pollTimeoutId = window.setTimeout(function () {
                (function poll(instance, raiseReconnect) {
                    var messageId = instance.messageId,
                        connect = (messageId === null),
                        reconnecting = !connect,
                        polling = !raiseReconnect,
                        url = transportLogic.getUrl(instance, that.name, reconnecting, polling, true /* use Post for longPolling */),
                        postData = {};

                    if (instance.messageId) {
                        postData.messageId = instance.messageId;
                    }

                    if (instance.groupsToken) {
                        postData.groupsToken = instance.groupsToken;
                    }

                    // If we've disconnected during the time we've tried to re-instantiate the poll then stop.
                    if (isDisconnecting(instance) === true) {
                        return;
                    }

                    connection.log("Opening long polling request to '" + url + "'.");
                    instance.pollXhr = transportLogic.ajax(connection, {
                        xhrFields: {
                            onprogress: function () {
                                transportLogic.markLastMessage(connection);
                            }
                        },
                        url: url,
                        type: "POST",
                        contentType: signalR._.defaultContentType,
                        data: postData,
                        timeout: connection._.pollTimeout,
                        success: function (result) {
                            var minData,
                                delay = 0,
                                data,
                                shouldReconnect;

                            connection.log("Long poll complete.");

                            // Reset our reconnect errors so if we transition into a reconnecting state again we trigger
                            // reconnected quickly
                            reconnectErrors = 0;

                            try {
                                // Remove any keep-alives from the beginning of the result
                                minData = connection._parseResponse(result);
                            }
                            catch (error) {
                                transportLogic.handleParseFailure(instance, result, error, tryFailConnect, instance.pollXhr);
                                return;
                            }

                            // If there's currently a timeout to trigger reconnect, fire it now before processing messages
                            if (privateData.reconnectTimeoutId !== null) {
                                fireReconnected(instance);
                            }

                            if (minData) {
                                data = transportLogic.maximizePersistentResponse(minData);
                            }

                            transportLogic.processMessages(instance, minData, fireConnect);

                            if (data &&
                                $.type(data.LongPollDelay) === "number") {
                                delay = data.LongPollDelay;
                            }

                            if (isDisconnecting(instance) === true) {
                                return;
                            }

                            shouldReconnect = data && data.ShouldReconnect;
                            if (shouldReconnect) {
                                // Transition into the reconnecting state
                                // If this fails then that means that the user transitioned the connection into a invalid state in processMessages.
                                if (!transportLogic.ensureReconnectingState(instance)) {
                                    return;
                                }
                            }

                            // We never want to pass a raiseReconnect flag after a successful poll.  This is handled via the error function
                            if (delay > 0) {
                                privateData.pollTimeoutId = window.setTimeout(function () {
                                    poll(instance, shouldReconnect);
                                }, delay);
                            } else {
                                poll(instance, shouldReconnect);
                            }
                        },

                        error: function (data, textStatus) {
                            var error = signalR._.transportError(signalR.resources.longPollFailed, connection.transport, data, instance.pollXhr);

                            // Stop trying to trigger reconnect, connection is in an error state
                            // If we're not in the reconnect state this will noop
                            window.clearTimeout(privateData.reconnectTimeoutId);
                            privateData.reconnectTimeoutId = null;

                            if (textStatus === "abort") {
                                connection.log("Aborted xhr request.");
                                return;
                            }

                            if (!tryFailConnect(error)) {

                                // Increment our reconnect errors, we assume all errors to be reconnect errors
                                // In the case that it's our first error this will cause Reconnect to be fired
                                // after 1 second due to reconnectErrors being = 1.
                                reconnectErrors++;

                                if (connection.state !== signalR.connectionState.reconnecting) {
                                    connection.log("An error occurred using longPolling. Status = " + textStatus + ".  Response = " + data.responseText + ".");
                                    $(instance).triggerHandler(events.onError, [error]);
                                }

                                // We check the state here to verify that we're not in an invalid state prior to verifying Reconnect.
                                // If we're not in connected or reconnecting then the next ensureReconnectingState check will fail and will return.
                                // Therefore we don't want to change that failure code path.
                                if ((connection.state === signalR.connectionState.connected ||
                                    connection.state === signalR.connectionState.reconnecting) &&
                                    !transportLogic.verifyLastActive(connection)) {
                                    return;
                                }

                                // Transition into the reconnecting state
                                // If this fails then that means that the user transitioned the connection into the disconnected or connecting state within the above error handler trigger.
                                if (!transportLogic.ensureReconnectingState(instance)) {
                                    return;
                                }

                                // Call poll with the raiseReconnect flag as true after the reconnect delay
                                privateData.pollTimeoutId = window.setTimeout(function () {
                                    poll(instance, true);
                                }, that.reconnectDelay);
                            }
                        }
                    });

                    // This will only ever pass after an error has occurred via the poll ajax procedure.
                    if (reconnecting && raiseReconnect === true) {
                        // We wait to reconnect depending on how many times we've failed to reconnect.
                        // This is essentially a heuristic that will exponentially increase in wait time before
                        // triggering reconnected.  This depends on the "error" handler of Poll to cancel this
                        // timeout if it triggers before the Reconnected event fires.
                        // The Math.min at the end is to ensure that the reconnect timeout does not overflow.
                        privateData.reconnectTimeoutId = window.setTimeout(function () { fireReconnected(instance); }, Math.min(1000 * (Math.pow(2, reconnectErrors) - 1), maxFireReconnectedTimeout));
                    }
                }(connection));
            }, 250); // Have to delay initial poll so Chrome doesn't show loader spinner in tab
        },

        lostConnection: function (connection) {
            if (connection.pollXhr) {
                connection.pollXhr.abort("lostConnection");
            }
        },

        send: function (connection, data) {
            transportLogic.ajaxSend(connection, data);
        },

        stop: function (connection) {
            /// <summary>Stops the long polling connection</summary>
            /// <param name="connection" type="signalR">The SignalR connection to stop</param>

            window.clearTimeout(connection._.pollTimeoutId);
            window.clearTimeout(connection._.reconnectTimeoutId);

            delete connection._.pollTimeoutId;
            delete connection._.reconnectTimeoutId;

            if (connection.pollXhr) {
                connection.pollXhr.abort();
                connection.pollXhr = null;
                delete connection.pollXhr;
            }
        },

        abort: function (connection, async) {
            transportLogic.ajaxAbort(connection, async);
        }
    };

}(window.jQuery, window));
/* jquery.signalR.hubs.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.

/*global window:false */
/// <reference path="jquery.signalR.core.js" />

(function ($, window, undefined) {

    var eventNamespace = ".hubProxy",
        signalR = $.signalR;

    function makeEventName(event) {
        return event + eventNamespace;
    }

    // Equivalent to Array.prototype.map
    function map(arr, fun, thisp) {
        var i,
            length = arr.length,
            result = [];
        for (i = 0; i < length; i += 1) {
            if (arr.hasOwnProperty(i)) {
                result[i] = fun.call(thisp, arr[i], i, arr);
            }
        }
        return result;
    }

    function getArgValue(a) {
        return $.isFunction(a) ? null : ($.type(a) === "undefined" ? null : a);
    }

    function hasMembers(obj) {
        for (var key in obj) {
            // If we have any properties in our callback map then we have callbacks and can exit the loop via return
            if (obj.hasOwnProperty(key)) {
                return true;
            }
        }

        return false;
    }

    function clearInvocationCallbacks(connection, error) {
        /// <param name="connection" type="hubConnection" />
        var callbacks = connection._.invocationCallbacks,
            callback;

        if (hasMembers(callbacks)) {
            connection.log("Clearing hub invocation callbacks with error: " + error + ".");
        }

        // Reset the callback cache now as we have a local var referencing it
        connection._.invocationCallbackId = 0;
        delete connection._.invocationCallbacks;
        connection._.invocationCallbacks = {};

        // Loop over the callbacks and invoke them.
        // We do this using a local var reference and *after* we've cleared the cache
        // so that if a fail callback itself tries to invoke another method we don't
        // end up with its callback in the list we're looping over.
        for (var callbackId in callbacks) {
            callback = callbacks[callbackId];
            callback.method.call(callback.scope, { E: error });
        }
    }

    // hubProxy
    function hubProxy(hubConnection, hubName) {
        /// <summary>
        ///     Creates a new proxy object for the given hub connection that can be used to invoke
        ///     methods on server hubs and handle client method invocation requests from the server.
        /// </summary>
        return new hubProxy.fn.init(hubConnection, hubName);
    }

    hubProxy.fn = hubProxy.prototype = {
        init: function (connection, hubName) {
            this.state = {};
            this.connection = connection;
            this.hubName = hubName;
            this._ = {
                callbackMap: {}
            };
        },

        constructor: hubProxy,

        hasSubscriptions: function () {
            return hasMembers(this._.callbackMap);
        },

        on: function (eventName, callback) {
            /// <summary>Wires up a callback to be invoked when a invocation request is received from the server hub.</summary>
            /// <param name="eventName" type="String">The name of the hub event to register the callback for.</param>
            /// <param name="callback" type="Function">The callback to be invoked.</param>
            var that = this,
                callbackMap = that._.callbackMap;

            // Normalize the event name to lowercase
            eventName = eventName.toLowerCase();

            // If there is not an event registered for this callback yet we want to create its event space in the callback map.
            if (!callbackMap[eventName]) {
                callbackMap[eventName] = {};
            }

            // Map the callback to our encompassed function
            callbackMap[eventName][callback] = function (e, data) {
                callback.apply(that, data);
            };

            $(that).bind(makeEventName(eventName), callbackMap[eventName][callback]);

            return that;
        },

        off: function (eventName, callback) {
            /// <summary>Removes the callback invocation request from the server hub for the given event name.</summary>
            /// <param name="eventName" type="String">The name of the hub event to unregister the callback for.</param>
            /// <param name="callback" type="Function">The callback to be invoked.</param>
            var that = this,
                callbackMap = that._.callbackMap,
                callbackSpace;

            // Normalize the event name to lowercase
            eventName = eventName.toLowerCase();

            callbackSpace = callbackMap[eventName];

            // Verify that there is an event space to unbind
            if (callbackSpace) {
                // Only unbind if there's an event bound with eventName and a callback with the specified callback
                if (callbackSpace[callback]) {
                    $(that).unbind(makeEventName(eventName), callbackSpace[callback]);

                    // Remove the callback from the callback map
                    delete callbackSpace[callback];

                    // Check if there are any members left on the event, if not we need to destroy it.
                    if (!hasMembers(callbackSpace)) {
                        delete callbackMap[eventName];
                    }
                } else if (!callback) { // Check if we're removing the whole event and we didn't error because of an invalid callback
                    $(that).unbind(makeEventName(eventName));

                    delete callbackMap[eventName];
                }
            }

            return that;
        },

        invoke: function (methodName) {
            /// <summary>Invokes a server hub method with the given arguments.</summary>
            /// <param name="methodName" type="String">The name of the server hub method.</param>

            var that = this,
                connection = that.connection,
                args = $.makeArray(arguments).slice(1),
                argValues = map(args, getArgValue),
                data = { H: that.hubName, M: methodName, A: argValues, I: connection._.invocationCallbackId },
                d = $.Deferred(),
                callback = function (minResult) {
                    var result = that._maximizeHubResponse(minResult),
                        source,
                        error;

                    // Update the hub state
                    $.extend(that.state, result.State);

                    if (result.Progress) {
                        if (d.notifyWith) {
                            // Progress is only supported in jQuery 1.7+
                            d.notifyWith(that, [result.Progress.Data]);
                        } else if(!connection._.progressjQueryVersionLogged) {
                            connection.log("A hub method invocation progress update was received but the version of jQuery in use (" + $.prototype.jquery + ") does not support progress updates. Upgrade to jQuery 1.7+ to receive progress notifications.");
                            connection._.progressjQueryVersionLogged = true;
                        }
                    } else if (result.Error) {
                        // Server hub method threw an exception, log it & reject the deferred
                        if (result.StackTrace) {
                            connection.log(result.Error + "\n" + result.StackTrace + ".");
                        }

                        // result.ErrorData is only set if a HubException was thrown
                        source = result.IsHubException ? "HubException" : "Exception";
                        error = signalR._.error(result.Error, source);
                        error.data = result.ErrorData;

                        connection.log(that.hubName + "." + methodName + " failed to execute. Error: " + error.message);
                        d.rejectWith(that, [error]);
                    } else {
                        // Server invocation succeeded, resolve the deferred
                        connection.log("Invoked " + that.hubName + "." + methodName);
                        d.resolveWith(that, [result.Result]);
                    }
                };

            connection._.invocationCallbacks[connection._.invocationCallbackId.toString()] = { scope: that, method: callback };
            connection._.invocationCallbackId += 1;

            if (!$.isEmptyObject(that.state)) {
                data.S = that.state;
            }

            connection.log("Invoking " + that.hubName + "." + methodName);
            connection.send(data);

            return d.promise();
        },

        _maximizeHubResponse: function (minHubResponse) {
            return {
                State: minHubResponse.S,
                Result: minHubResponse.R,
                Progress: minHubResponse.P ? {
                    Id: minHubResponse.P.I,
                    Data: minHubResponse.P.D
                } : null,
                Id: minHubResponse.I,
                IsHubException: minHubResponse.H,
                Error: minHubResponse.E,
                StackTrace: minHubResponse.T,
                ErrorData: minHubResponse.D
            };
        }
    };

    hubProxy.fn.init.prototype = hubProxy.fn;

    // hubConnection
    function hubConnection(url, options) {
        /// <summary>Creates a new hub connection.</summary>
        /// <param name="url" type="String">[Optional] The hub route url, defaults to "/signalr".</param>
        /// <param name="options" type="Object">[Optional] Settings to use when creating the hubConnection.</param>
        var settings = {
            qs: null,
            logging: false,
            useDefaultPath: true
        };

        $.extend(settings, options);

        if (!url || settings.useDefaultPath) {
            url = (url || "") + "/signalr";
        }
        return new hubConnection.fn.init(url, settings);
    }

    hubConnection.fn = hubConnection.prototype = $.connection();

    hubConnection.fn.init = function (url, options) {
        var settings = {
                qs: null,
                logging: false,
                useDefaultPath: true
            },
            connection = this;

        $.extend(settings, options);

        // Call the base constructor
        $.signalR.fn.init.call(connection, url, settings.qs, settings.logging);

        // Object to store hub proxies for this connection
        connection.proxies = {};

        connection._.invocationCallbackId = 0;
        connection._.invocationCallbacks = {};

        // Wire up the received handler
        connection.received(function (minData) {
            var data, proxy, dataCallbackId, callback, hubName, eventName;
            if (!minData) {
                return;
            }

            // We have to handle progress updates first in order to ensure old clients that receive
            // progress updates enter the return value branch and then no-op when they can't find
            // the callback in the map (because the minData.I value will not be a valid callback ID)
            if (typeof (minData.P) !== "undefined") {
                // Process progress notification
                dataCallbackId = minData.P.I.toString();
                callback = connection._.invocationCallbacks[dataCallbackId];
                if (callback) {
                    callback.method.call(callback.scope, minData);
                }
            } else if (typeof (minData.I) !== "undefined") {
                // We received the return value from a server method invocation, look up callback by id and call it
                dataCallbackId = minData.I.toString();
                callback = connection._.invocationCallbacks[dataCallbackId];
                if (callback) {
                    // Delete the callback from the proxy
                    connection._.invocationCallbacks[dataCallbackId] = null;
                    delete connection._.invocationCallbacks[dataCallbackId];

                    // Invoke the callback
                    callback.method.call(callback.scope, minData);
                }
            } else {
                data = this._maximizeClientHubInvocation(minData);

                // We received a client invocation request, i.e. broadcast from server hub
                connection.log("Triggering client hub event '" + data.Method + "' on hub '" + data.Hub + "'.");

                // Normalize the names to lowercase
                hubName = data.Hub.toLowerCase();
                eventName = data.Method.toLowerCase();

                // Trigger the local invocation event
                proxy = this.proxies[hubName];

                // Update the hub state
                $.extend(proxy.state, data.State);
                $(proxy).triggerHandler(makeEventName(eventName), [data.Args]);
            }
        });

        connection.error(function (errData, origData) {
            var callbackId, callback;

            if (!origData) {
                // No original data passed so this is not a send error
                return;
            }

            callbackId = origData.I;
            callback = connection._.invocationCallbacks[callbackId];

            // Verify that there is a callback bound (could have been cleared)
            if (callback) {
                // Delete the callback
                connection._.invocationCallbacks[callbackId] = null;
                delete connection._.invocationCallbacks[callbackId];

                // Invoke the callback with an error to reject the promise
                callback.method.call(callback.scope, { E: errData });
            }
        });

        connection.reconnecting(function () {
            if (connection.transport && connection.transport.name === "webSockets") {
                clearInvocationCallbacks(connection, "Connection started reconnecting before invocation result was received.");
            }
        });

        connection.disconnected(function () {
            clearInvocationCallbacks(connection, "Connection was disconnected before invocation result was received.");
        });
    };

    hubConnection.fn._maximizeClientHubInvocation = function (minClientHubInvocation) {
        return {
            Hub: minClientHubInvocation.H,
            Method: minClientHubInvocation.M,
            Args: minClientHubInvocation.A,
            State: minClientHubInvocation.S
        };
    };

    hubConnection.fn._registerSubscribedHubs = function () {
        /// <summary>
        ///     Sets the starting event to loop through the known hubs and register any new hubs
        ///     that have been added to the proxy.
        /// </summary>
        var connection = this;

        if (!connection._subscribedToHubs) {
            connection._subscribedToHubs = true;
            connection.starting(function () {
                // Set the connection's data object with all the hub proxies with active subscriptions.
                // These proxies will receive notifications from the server.
                var subscribedHubs = [];

                $.each(connection.proxies, function (key) {
                    if (this.hasSubscriptions()) {
                        subscribedHubs.push({ name: key });
                        connection.log("Client subscribed to hub '" + key + "'.");
                    }
                });

                if (subscribedHubs.length === 0) {
                    connection.log("No hubs have been subscribed to.  The client will not receive data from hubs.  To fix, declare at least one client side function prior to connection start for each hub you wish to subscribe to.");
                }

                connection.data = connection.json.stringify(subscribedHubs);
            });
        }
    };

    hubConnection.fn.createHubProxy = function (hubName) {
        /// <summary>
        ///     Creates a new proxy object for the given hub connection that can be used to invoke
        ///     methods on server hubs and handle client method invocation requests from the server.
        /// </summary>
        /// <param name="hubName" type="String">
        ///     The name of the hub on the server to create the proxy for.
        /// </param>

        // Normalize the name to lowercase
        hubName = hubName.toLowerCase();

        var proxy = this.proxies[hubName];
        if (!proxy) {
            proxy = hubProxy(this, hubName);
            this.proxies[hubName] = proxy;
        }

        this._registerSubscribedHubs();

        return proxy;
    };

    hubConnection.fn.init.prototype = hubConnection.fn;

    $.hubConnection = hubConnection;

}(window.jQuery, window));
/* jquery.signalR.version.js */
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.


/*global window:false */
/// <reference path="jquery.signalR.core.js" />
(function ($, undefined) {
    $.signalR.version = "2.2.2";
}(window.jQuery));
