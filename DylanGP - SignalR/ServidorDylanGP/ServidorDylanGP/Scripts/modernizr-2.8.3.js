/*!
 * Modernizr v2.8.3
 * www.modernizr.com
 *
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexton
 * Available under the BSD and MIT licenses: www.modernizr.com/license/
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in
 * the current UA and makes the results available to you in two ways:
 * as properties on a global Modernizr object, and as classes on the
 * <html> element. This information allows you to progressively enhance
 * your pages with a granular level of control over the experience.
 *
 * Modernizr has an optional (not included) conditional resource loader
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com).
 * To get a build that includes Modernizr.load(), as well as choosing
 * which tests to include, go to www.modernizr.com/download/
 *
 * Authors        Faruk Ates, Paul Irish, Alex Sexton
 * Contributors   Ryan Seddon, Ben Alman
 */

window.Modernizr = (function( window, document, undefined ) {

    var version = '2.8.3',

    Modernizr = {},

    /*>>cssclasses*/
    // option for enabling the HTML classes to be added
    enableClasses = true,
    /*>>cssclasses*/

    docElement = document.documentElement,

    /**
     * Create our "modernizr" element that we do most feature tests on.
     */
    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    /**
     * Create the input element for various Web Forms feature tests.
     */
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ ,

    /*>>smile*/
    smile = ':)',
    /*>>smile*/

    toString = {}.toString,

    // TODO :: make the prefixes more granular
    /*>>prefixes*/
    // List of property values to set for css tests. See ticket #21
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),
    /*>>prefixes*/

    /*>>domprefixes*/
    // Following spec is to expose vendor-specific style properties as:
    //   elem.style.WebkitBorderRadius
    // and the following would be incorrect:
    //   elem.style.webkitBorderRadius

    // Webkit ghosts their properties in lowercase but Opera & Moz do not.
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8+
    //   erik.eae.net/archives/2008/03/10/21.48.10/

    // More here: github.com/Modernizr/Modernizr/issues/issue/21
    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),
    /*>>domprefixes*/

    /*>>ns*/
    ns = {'svg': 'http://www.w3.org/2000/svg'},
    /*>>ns*/

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, // used in testing loop


    /*>>teststyles*/
    // Inject element with style element and some CSS rules
    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
          // After page load injecting a fake body doesn't work so check if body exists
          body = document.body,
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it.
          fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
          // In order not to give false positives we create a node for each test
          // This also allows the method to scale for unspecified uses
          while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be removed
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' element
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements.
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.aspx
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #277
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody.
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #270
      (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
          //avoid crashing IE8, if background image is used
          fakeBody.style.background = '';
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
      // If this is done after page load we don't want to remove the body so check if body exists
      if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },
    /*>>teststyles*/

    /*>>mq*/
    // adapted from matchMedia polyfill
    // by Scott Jehl and Paul Irish
    // gist.github.com/786768
    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },
     /*>>mq*/


    /*>>hasevent*/
    //
    // isEventSupported determines if a given element supports the given event
    // kangax.github.com/iseventsupported/
    //
    // The following results are known incorrects:
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negative
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/333
    //   ...
    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" those
        var isSupported = eventName in element;

        if ( !isSupported ) {
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic element
          if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

            // If property was created, "remove it" (by setting value to `undefined`)
            if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),
    /*>>hasevent*/

    // TODO :: Add flag for hasownprop ? didn't last time

    // hasOwnProperty shim by kangax needed for Safari 2.0 support
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those */
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.js
    // es5.github.com/#x15.3.4.5

    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    /**
     * setCss applies given styles to the Modernizr DOM node.
     */
    function setCss( str ) {
        mStyle.cssText = str;
    }

    /**
     * setCssAll extrapolates all vendor-specific css strings.
     */
    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    /**
     * is returns a boolean for if typeof obj is exactly type.
     */
    function is( obj, type ) {
        return typeof obj === type;
    }

    /**
     * contains returns a boolean for if substr is found within str.
     */
    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    /*>>testprop*/

    // testProps is a generic CSS / DOM property test.

    // In testing support for a given CSS property, it's legit to test:
    //    `elem.style[styleName] !== undefined`
    // If the property is supported it will return an empty string,
    // if unsupported it will return undefined.

    // We'll take advantage of this quick test and skip setting a style
    // on our modernizr element, but instead just testing undefined vs
    // empty string.

    // Because the testing of the CSS property names (with "-", as
    // opposed to the camelCase DOM properties) is non-portable and
    // non-standard but works in WebKit and IE (but not Gecko or Opera),
    // we explicitly reject properties with dashes so that authors
    // developing in WebKit or IE first don't end up with
    // browser-specific content by accident.

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }
    /*>>testprop*/

    // TODO :: add testDOMProps
    /**
     * testDOMProps is a generic DOM property test; if a browser supports
     *   a certain property, it won't return undefined for it.
     */
    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                // return the property name as a string
                if (elem === false) return props[i];

                // let's bind a function
                if (is(item, 'function')){
                  // default to autobind unless override
                  return item.bind(elem || obj);
                }

                // return the unbound function or obj or value
                return item;
            }
        }
        return false;
    }

    /*>>testallprops*/
    /**
     * testPropsAll tests a list of DOM properties we want to check against.
     *   We specify literally ALL possible (known and/or likely) properties on
     *   the element including the non-vendor prefixed one, for forward-
     *   compatibility.
     */
    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

        // did they call .prefixed('boxSizing') or are we just testing a prop?
        if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem])
        } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }
    /*>>testallprops*/


    /**
     * Tests
     * -----
     */

    // The *new* flexbox
    // dev.w3.org/csswg/css3-flexbox

    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };

    // The *old* flexbox
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723/

    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };

    // On the S60 and BB Storm, getContext exists, but always returns undefined
    // so we actually have to call getContext() to verify
    // github.com/Modernizr/Modernizr/issues/issue/97/

    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };

    // webk.it/70117 is tracking a legit WebGL feature detect proposal

    // We do a soft detect which may false positive in order to avoid
    // an expensive context creation: bugzil.la/732441

    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };

    /*
     * The Modernizr.touch test only indicates if the browser supports
     *    touch events, which does not necessarily reflect a touchscreen
     *    device, as evidenced by tablets running Windows 7 or, alas,
     *    the Palm Pre / WebOS (touch) phones.
     *
     * Additionally, Chrome (desktop) used to lie about its support on this,
     *    but that has since been rectified: crbug.com/36415
     *
     * We also test for Firefox 4 Multitouch Support.
     *
     * For more info, see: modernizr.github.com/Modernizr/touch.html
     */

    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };


    // geolocation is often considered a trivial feature detect...
    // Turns out, it's quite tricky to get right:
    //
    // Using !!navigator.geolocation does two things we don't want. It:
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
    //   2. Disables page caching in WebKit: webk.it/43956
    //
    // Meanwhile, in Firefox < 8, an about:config setting could expose
    // a false positive that would throw an exception: bugzil.la/688158

    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    // Chrome incognito mode used to throw an exception when using openDatabase
    // It doesn't anymore.
    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    // Vendors had inconsistent prefixing with the experimental Indexed DB:
    // - Webkit's implementation is accessible through webkitIndexedDB
    // - Firefox shipped moz_indexedDB before FF4b9, but scT„!ì’§çí’BP§2²ûà;ĞBV¯÷Mi `„ËïöKwò7‘¨ğo ƒà÷¬»¾ÅwZ/ğ´ „±÷‡ş‚x¸,±X²˜ä™úŞ%<ÂP Ú$2òëëÂ_í••JØá ƒUp¾àròˆ…ğÄM¸à €gÄ°P5:#øchÏ+Õ•ÏRëÿÙ7òï“ª«T.¾P§³°äV¥C{:>sÄ xA„¿_ÅJä»qEr¬É 0 ƒÀÿ·ñ)_ÕÈ®LÒïÜãÀcñc"Ax0 +?¢1|şø¼¸±)( ğ?ó—Jt%Àr«ôú5áÔ-r¬ÙûÊx»‚™€h<ø „‹âñ)U‰V3Š}üb¸ü¿ w‹¿@8K“õ¥JD_V¨Ğ¼ÇÁşWí±_· 38Ê¥•Æc,tà0“ğA€Ô‹‹Õí/,Á&pt±xº"ˆÉ_mÙa:¯(Ë³*Ï
`À~?V$P=t~>–ì—KÄªº ,¿˜0DµA¼Hö—úl/—ªÀ³Á•„2åj¾=Šíõ¶Ê;‰Ó‹ÿ…Òòßk0ÆH·cÕÕ2ÜœxS‚@ğU7òş«²ÏÖXx0 •ªúª$	jj¿*ZÎ(ÕVª²5s)ğ†]‚_½)x÷$Ô¤%ùYÈK7y”ˆ
ffz”÷À¡÷ÔY›·ç¿å[İÙÆ‰Aà KWGååêµ]¥ÿ»hˆİã°¿Ê'“Ù'Dr_çpÙpú©a#€©ß‰Kõı’LùÊØÕáGÖ˜”–ß¶kl]šìhÖ‘Œü”kÊMSÁ¯õ!,63¸¯”[<¹Íõ¦"tÇva ÏÔ†ypÒÉéáÃ#=¾s^©~2w(²ÖúFÉñÿÙ†&ö´ÙêÏRC—"·£l»ˆİZØÉŸÏé]“úDÿYş´mšnÍœ¶ºjïÓ¶à)§J¿P‘³Pê¥®¹sH$úš˜Ç¨ez¶“…?Ê²ZÙ%?ş]ÅéÙ=ş†õ¶sL?Ã“×W†˜Ó<ŒŒ¦jæ²rñáNø3şgf’YvÒÇ·Ù†Xd‚bĞèSÔå?1Då½¦R\¥\?;OL“i§Ì£>Ì¸Ù?ò‘K?’0èW¸)ÜR£&·¯Ü¤@|¹¼³Š‡²vnä=ScÀ§ı¥Dø{W<ÊÇ³’õáO•Ø)WfXİ'­Ç :5üÎ0M
Nb|¤!O’úï&>är¹Ô†ºqZv)€§Qƒ|h›D|[s&kªıaĞ)ı,šÁ7;¶İ¬l?³±§ıäÌ‚€§Pä¼’E¿fÓª¿îè ¹ÃÔåú½k®
|÷ì•ší™é…-k]Ø~ìŞÛÚ±ğ(­uÿ¶c0šMšÁë¸Éît’©Jğ)¦3€iUjWüî(€z‚%ªUõWólõQ³¯ƒÊ§gî2À¨ ‚ <`Ş‰_ºªßûd„ñ^›İ2­WìWı›åvx
`6­€è7ÇÂUÇÀ~[5ªøş” ÔdQëbk†Ä•BHüJUDİQTK†Á€<~$+ÿïÔlÿ¿.A¨øKò•[)ğA	sßüXĞS3Tj°<:¡!R¹ğB ÿşûÁà?Í.åU•T—vıàğL‚ 0C/ à@S(èg¿+YXx<	ğúĞo{òRõj•ÿ$¥Õy]ô±¦BòÿOİMt—¨ùvËštHŞ³„Jş‰EßÊÔ+üôï7$ƒÑä•©z"i)íšIïeÆkÀ§P@ T qypÿşß)ÄÆà  ú$„	gÿİkOÀ2¬µbQw¤.Şm”2Vü¸<
â@+R^ªáüªË¯T'„a +UmÔGGÁHV]%`ĞÀ
 M‚/ Ël³ìã 8~K•h€zËïù}‡ƒ@Ãá#ŞÙï«ú»p{öqeŒƒ pC—	ÕjÇ¿W2z$mâYuüocfÇ³Õ¸)€P•ü¨òRè­WA	\jÀ1s²¸Yp 	>/õ.ınU|€V<¸€„¾È
µ\WTıÙôÏ€şôx<ùàÂJ¿—j°`6ş]ğ<¥¯)ğjèM—«;,gZ;õVË™Úp
a€ì?ào+„1ç„±ôú¨ÎX¦!Ê4€şÄ¸½P•ê ï¦À;!z”kp˜ê‚¾Ğ~ÂJ± åx$—{ñHø½…õWØûq“êC>_€ÃÒú®Aß¼_
½lS[ÏÆõ*'nÆ^À±+P^«ºªû¿åÌLğ‚$ş« âŸeÜ8\ªA,¾'•/ŸÑˆûÊGÔv=UoñLV:'>G–kÀS„1‘Ç²bŒõ±N¶«ó³ğT>ğ—ß+£Ùt¾F•ìÅ8œE=^èêû>¯z „]åEê¹³÷Óñ¯Ì•Fì!
j …àBåÖ¨Ê«ó×Š¾/1òòëïÙlçì•ÀÁ¸ ª.VçhøHR]TÑâ7âCàğæÕBP“´}ı¹'ı…®“aÿßûò[¼áÀ§„/‰JËØÃŞñqqwçë~\œãéx\_Ë£¯ÌìƒQøBÿã4Şßµ¼LïHÌ-xS V\%‰VX¦mS Á¤/øóâ^[ÃàÃñ*ÏÉ‘— z±âÙ—q¡Vá¬Ùv@§}`ÅÀ%~}J¾Za©lÜp$+ªlbknôS'WÃğßó#)Ï>fæÖ‰“wa7ìÛËmHév%ffs[2ù­$9Êíwv™’¬3<;¯m%$PËGî'Nz‡}©şÙÉ§B«š»Núo„w¤ê²ÚìöwtŞ·jûrCt{=V&é&—wHS¦Â§üz¤WtÇ18ÃÓ–´Gøğ§Ì¢‹•‡şwíÎÙ)¼FI§‚Û$±¡†•¤Ó†a S=©d$/ò°æ³x™ÕTªek°ô%÷m<íO³|Ÿâ‚-¿WÿÛh»Ò—y—ç%×…=¤Ò=D‡›§=Ü‡?¯WmàÀ)Ò…Ìu!ù¶Üzñ¢íÒ`§µºÎaÌŞã;Ó‹šÆ±cú#ÔñáOİf˜ÛÒNné¤Ç@¦¿©Û“{Ã¦m­ÅÖ0ÓşÃdŒŞ§:;úöY{rCvej¤=Õ<’ll$oŒo·íêc¢ À)Ş›ß#^Š6ïaïª¹ùnŞáXxü¼Ü’˜D5ä£ƒÜ]ªË¦ôÎCÁO•by23İ1ëÌÊ‰ŞÊÅ}–ÛršxgûÎŸónÍi®–cIÍMo„NÛsmÕß–Öp—ØÓ:F®†~
@§÷ù¶š'™›Q8Ü†ı¶^QÄçX˜á“UÕ©Ÿzë{zĞ
’A6Tç‚ŸØœbMvDçÿ&X×tÿóONë`8)ƒŒ¾‰³;ÈHşX2­ğBV¯dc¦KËÕNONÿÈ0 ƒ+. Ş•=õWUK—°ÌWä-Q»Šğxğ¦ApV\¢|¸ºÌµM§Áà?Ã€€çKÄ±.Ûª•æ,ÓCPbà€âWàüI¿ŠäU}é­*€€äÿ~%ÏY$õ³Ùßd4$*ò¸Û/jänl‡˜	 Á ‰`†%«ò©b[nóä Ğ½_Ä,»ùËõ6‚`ea—A,Q'•©î‘‰ ÅàqPÍšÙî{˜±¯Ûı%
` o„`ım¶*Í_‡ Å`ÑR™gıG”€P4Uhø¸»²}WjC£à„$O*/.¾µîs4ä½ö@¦wàğ‰bW‡ÿÌ¹0ˆJ€€ü!P Ğaâ¡Xûc£,‘?å~Q?éîîŸ€ïìn÷d4*¿d·›!ğ…òïì½–˜Ì ¢â‘ğ@ş+Ú_áİ.•œĞc¢EW >t—«æx*ÖG p‚r±(}õ<·ßüF"† ÅÂ@üJ!_ örË¿ø’¹ø¦²Ku’P)½< Á»ŞËù{»éPB‡ªWïxz=‘^K2N(™1¬Î›€€ÜJ è¡Y}ôŠâ¯]»k3Y²]ûøûû#\‡¿KûœÎk§½»eŞAxÂ¡¡ø0C‚EåÅêÁCb²åEÊÿo–ÌÅ TĞ0”ãñ$GşT%A!Pü»Êş%Ù¿@ÖR@`/.ÿÇ…Ş/¡\ô¤òŸ”¼D{ì`Ï©w‡±E“§µ!!}’O~6J¨Gısià)‡0Ìwdí™8WO+Ûñğö{¾QüÚ’ŸªnÍô›Ûe9âéùûÛÿşòHr)Äf²)åjLƒT%ªğ“yáåWÌ¸†ª¤Usg›Ø#ø»?á÷>%«£¯{¿ÿÒ°à†ğ[-ÁÖÔôG€Ä}­sºhu;kRsBĞ§ ¢·ø©|òe4«‚Çô!ÔÁd¥şì€ÉU,â7Åj?,¹“"F58¸K÷·­UôÌ­g+£¦B˜*À7ÅÿWËhö5eá~2ªŞR `ğ1z_	wãÆ¨EØ1›fÿĞQWù*›öó`ĞI.ùq€ÿ¬ß¿éazé¿GÙ¨­MjŞtÀS	ÀßUéïï²ª`è0’¬ ıT•Wû3|Éà‡@eÀ†ÙuB*¢*£õVYù¹O³•£µ<Ş;ğ`P*èûÕkÛ©Y~Ï]^]!€ş~[3ÖK8ºéÉGq6òÖ?¾)¼ã]q—ÌŒ6òlƒğXül0ù/ë'.0üsC1Ÿ.·—OFã'õ)ÏkøÉ ~=V7fÅ7ÓU3DÌ]&
yyr©Ë§KÕÿÓ]{›'Æ›2Å¦­’Êt)ğ{¼óùÆøı÷óEñ™¸îQ}—,pSşª&é¿ç’öËZ–7çe[í­w†BÛ/yŒœÌÈRõvöYX4¯–Ú;=“N¾òvÖš=mÌJgäûzîw¯lVø\ÎôÖÜY;F#É#rö“èˆÎ¨SÑ èŸØ$÷8r±§7,3j’~’IóÒ¿¤¼ëÎôœDóš5WìH±ü‹ó$\”)êÿö™á»fìÎ½¥"4YùøĞÈ@,
+«¬Áeœ
u“{^Æš‰ië{¨Fˆ€§åûï³ùë™fPÛDş„œ¸Ce<
>şªöö÷Ò_-Åôü—?jæ€§w_§kPüQ¹ÊÎ×AĞ³ğF‹|–¸)ÕŸmîr?ñf	÷Ê9ÿÓ2ÖŒ¬M.¶Ş¸)ùd¥Z†³mi†_ô†1®Ÿõ0Íª÷k³ ¹@ÂíûÑ‡õƒOÚ¶IËmw1Ê%—3a(CòŸ,y–#r`È)˜Ixø!¯ìnSÀÖy\ÖÌ€}	õ@ss74bü\^]Ğ<®äÛÒÏòín8)‚fá¾‚íkIÁ½xÁ‹ï´ „ü¸H•¯xEùÀ Ğ@Š-¢4Ùƒ ¥ÁÁ ŞwãÅÆÏ«ëÖ÷
+lŞG<\¬„?ÑÿÇƒßÅFƒŒ0ğ@@‚‹‹ş©]”Îƒ*T>üõ.ª­“U©‚:``†_gËâ¢áò±%CSqT¥.ò›S6tKU–jsÀS”ÿÔ „0ÏQñwo½˜¤„¢V+í¾ÚH4Iø¬¿Şƒà:­$“ˆíp 	aÅà·UKõ{vûÌ)ÎKV‡ı7c5“ÃûÓAL@f„áê•]ÊaÑìä¬*UgŞğ€]K¨ü¿üôU=éB¥j¥/T?Á{€;Ë>¯.Rp)Œ<>@ñøûà¬J›ËÛFL$e™’7Ã ÃèÀ şíÿËñHf¡NHÙ?ÔÙÉ‡À¦;$h¼
‡××>>/¸®ƒÀ@š¿ÿ÷6KÉ%Ig‹½dÖk•—ƒ!üøCıƒÁğªªÕşrßİ..òÿ¥G|®Ïv1ÚCÿÒÿïMÄ€€ @UÔ±`2ÿíë8hJGóÃëáŞ—Ù*“U—ı‰èœ°È4A-Ê¨–ËÔÂá÷¯U«c¢$_÷‘ÀÅÀÅÂPC´ €z¸^%òAÔ x!x	Z˜«½ıYßûaïw$“§‚ƒ*á.+VDœ‚HşdU;á(¹‚éAŠé:‰wYÇ)ÍÓRÛOI$+>3y >´ÈÓBø]¾ıŠâµPGÅTuôyÊş¯5+YZ2×ÿ\3œ™0oªûè\ª‰Ó’çÆ¥n§4Â<ª[ êµ?£º´ın*FvıX—:u™æ¬|yŠjµ¦T·Ù&mi¤N5š£Å~Ÿ³»[Ş¼}vÚ¢ßXÛ0iì±5¤…Ùù¹`Ñ“ÁL0x¨æUE®RÓ‚Z¢ø]füº°¦dÔ¢1CùÆì ÖòŸ²sÂ )Â41 |¯ê¢’âûâõKQÑx†Ãèñ|¥â5ı¾/Ï¥q¹bÃ€<.”jª¼‘ÃEÓêíS>;÷=híQL^ÎÁ;¿Ê{‰¸d)Á\$«¥.2Ñ÷ip–]å*‡•…k`0ÈIƒ(õ’Ë6(\2Uå`†>şŸT}ñZÕ8ºap’>÷¶JªõTçÛlº“À{nï8ğ;y14xSä«ÃQFD…A¸é|¿uº”ŠÄdpß+KŸ
{Ü5).aY¢Æ!\·kq)û'yxE¼CÓ±›j2ü,4Å1†ıHBCs{…§ìk²KÒŒiF"<ºÏö˜ğïò;şw"sø„àSòsxCÿ5³ÓZÛEŞŞ¢9kdtíµb{4ÀSîÖ²'qy‹Sÿ`Öª¡uôÚ¹ §vtÂØ¶å|‘CêÇ\æRMnscí½ÌløS©3¤~å©ô÷ÓŸ˜îgZ¸qÈ‚®uØD¼»+Pşk)Ïö}ü`Í“„aO?`Ÿ²ŸºbM‹œ
ó»LÜ±[ÊA/nGœ
=¥Í{xk0Áğf
/-È&uNs¹ìIŒa/í»Â)Ö-%åXØ‹j»Fc>gÁvt–(Ä¤ SïåŞdJv½ësF“—˜s„ SêûŞ[ušvÆ‰j†Ñ{h'MÆSŞÚxä‘0SZÒÉıô©Iµ¶F³ğw3˜s8f‹BŸü·›iÏ—[İDÿxtŞÌ%/÷¶±&ä×æv×Ëô®
`tñú²âëí$€0ş¯nÚT- Ø>
¼–(^Á5/@_ öï&zaáß¥²Û®ıFÌ¤¡LÁà?›‚‡€„^£üoö€ÿK€€ôÿá,|>Tç÷cn€ÿ4|]ñ$KSz;í…IŞúx‚ – ï—{TóÔ›ÛZÁĞ—ıÙŞzš˜<@ş <H–—„/ë5Ta;gAà?Ã
àC²—[6J²0xìËÁ‚é}•*ë¿ˆıx–ı¿»`ùXÿòI?ùO«´½6Ntè‹f^
a PğebYv•¬‹[ÂÆÒ«—ë ”$heôGW‹ØƒÊº»Âp(şK`÷ğ¥*T%Á‡÷ÂP+Üš`¹PÑáıä¶ÿr™İòğ` òñ%^+º^®í•t˜?ú]ï*÷Uş–’ —ü~j¼ä¹bş'•æcsm¦/²NŒÕşßş­.5V©Wàú|KªnÂE~ı¶ê–ÑÑä¿·ÓÙ"˜`M‘€Æö{´à4.‚P”¬K£âéêËÀøşÈ;Wõé:‰KóÿâÑa\ÆúÉµ_·ÒÆ/}üûj.Ê…2ÇÊ‡ÅÊ¿UÉªîö‹ª„%ÕVİ»Óñ«ãßnkÙôi‡y¢¦û$ã	Í‚:ª»óªı‘WşÉ¦aÁ«õKF=w3“sO‹¹¿ÄšLê3ÊXÀ½>–º®O„¸pFG®ò…›0À«Yéºt
a@ÂdÄ…Eÿê¬SgªŸV¿‡0ÀĞ@ OÊ•ÕRª/.Ô¦*V©».UÏ—P‡á!]öU_çı|Õ_”–nrFQleÁO ñğ0”^§ãíğıE+.È¤
øD©çB+•Ø®1‡ƒ_—«Ÿ·l¹-²â*N¢H—‰r)Û}7“­]¯ °)÷{V´e¢³{œÈK,—Œ²}£`S¯çeå6®´‰ƒ96Ã®eÖÏV…éåÔÇŸe¨ÍİÖÏÚ;í˜Eü@N¬uN³ºñÍb³N~dŸÿ,%Ÿßõ&änÊ!¿ò3&œÆa°§s³°±ÕL—-šMù‰·MAàë³mÛ©É;mg~Uj7…<¾\œ9ûéÛ¶]å?m¾ŒK’>ûã­ÄøzeÛ¬ŸQêÄ×…hî)Ó«lÙ~Nê#¨œ¾¥¶qZfŞ\øŒ®êİÖœ×zc½0òŸüÃ#¾XÉÊÌdğS½‘IßÎHëbôUÕ¡qiF¤}úxù)(nïFb=%
wV½=hÁc&Ô'"LÒ{×:+Û‡ì»$1å‰oP8gÿXXŞ–¶D$ßŞ.êÛ|Â`)÷öYX;Ù›Ç"âgÊ™Õœ³g §õØjÇÚ¼$ü’bBxZzvBP)÷u³0ïõW:´9­Ÿn"'èSñ„fÙïÑ˜cfºõáOÎåmw[Ì¹­XÜ¶É6ÛÔ²¡¤¿`ØS0:$øj½ËËtè0C¡§íû[=	À0Hş_êÕ®V$Çê|£<ÂÚ/T$«òMqxùOËµKGÂœû@/£á.yR¯{Ú‚¬3€ı'Â@—üüçí–OZ.Wá-_‚ƒÚ®'¼9Àà?· àUĞ}i{%ÿ($/¨S&Ú`¸¼K€òË<"ƒÀ~î ğ=KıG~ïì¼—Y0á(}@ÿ¼=ªe¿‘€1Ó@ÂHAø5?Ê«~¯–ˆ…Ñ­‚ ‹¼$Ïâ•k:Ü¢¡#û3fJl!û3–Ò ¦d
 h
ùòÿêºN\ş(—>%@Ud¶Å=4Cõa!Ñ.Ê©T¶É`¸|ñ!Z±%R¼æßæ°^]XÆôøÿ9öópøà°2@ÂAw¢‹N+·`]ª½2I’d.ğûÅÂ5·’ÛAİî“¬159ÀSÑ™¯ıs˜B]h(U´¸—â ?œôş'V¨¹G§¤é6rj	À	‰bI}«›Zãµ·É2	\ûÏı^îDÇìxŞ$’ƒ“Ê¯şĞÌJçÑ~ILàĞBZ%ÕÓË¸ÿœÃ#âúËøÔ§¢Á«ÑÙ†GY!-0•‚?Ş®D»—DdJ›ß#GcFÃ:ÃF®Œáà§½Qz¥>ôjËÊMôô›ìR)¤ùÃAO«¿eºÙïwl%Ës7˜¸ÆmïyN¢°ûzÙÀ§Sd\˜Ejñ“şÄëáñç#µ½w™O…:ÉcOW*æçw3ÚÈË	1­”€)àu¶X;ŸLá×OŞÎëgã-¹:¼2‹ºrjs·T2±À)õŞI#õ_q§³¸ÙÛq¸ùuŠi9(S÷×1˜kı»+•wÛn±$†;™
Íî¸)ûíooLÕÅ·Nş©ÈÚæíOÒy-îSjsc=n8)ûÈ:`ÇnÉıŒşq#Bú)—J
u@Ã?š–UÒ8(í‘‰íuÇÍ<!]†Ø?aôğ‹Tş›ÿ³¢ù	j™;‘â:lçÛ&å ‹°~'xS¥ïX 0oß’‹û-œ„õOÔ5ü„\n';á©¬tH;jHKéZS?Ö”´š3Èh)öó›{È5–?ŒC5®Cvë$OÖ3	q¢×Æj'KÙF(!xSóœã'+VDæ«ßîİÙ{BµÎi#&yÎ›
c¸æaÛŸÖÏQÒG
z±Ögvnğ÷,İ¦£szAé§í­
`Q_ ©NÁä£¿ ‚ÿÏxäü³fë·‡#tøS1&€o£0ğ0’\¨ ?Ø¯İÆíÁ1yx0 ŞŠğÈ’«•ôÀñ^L—\ßİ’‘…8 àh˜{àzª.Yòù€oâ'µ™x<ù>ªár…vrÑ&p<ö¡ ¼J„€=j«e”vàxòU‚	tS¥ûÛdèßöZMK”AÔ‘ÁN„°ğè¼¸ER£İëm½X‰V^¶ş›µš,/<_AB¯’+¶Jòûæmíºo}ñîó‘Ö5}eãÂ™?ÙèPî¨õ´iû›>eø"{¨É­öGln8Û €†•_Õ6ö¶HÿÌÓÑˆİ§¯ÛlUÿE‚ÉÖ	HÔïMªÓ³ĞèÏ.¯.KzAª¯Şm‘·+yºñv4Ç½ ";M¦Á~	Õ»½ŸKÛIX|a9òOA}t¶L§©ÇöQ¡|=(À)Ü¾QRÑ…l\Ç‡ıôW}ƒ¿Bsõˆ–<Gë'¼Û¥ä&Õ¡ŠÑà§Ô­œn'7û·í¾]Ú±i1°§å­B$¬é;¤ó	xÑişõ3ÂŸ Æß*íGzêB_aĞ§ı6æ›h“®KY7šıhÀSÙš0ŒÙÄÇÚZSL¸)ĞêH¹ù‘<„êğ‚áF ¿·!;M‚áµ²§tşîÎ¯È1W'vµ®ı¸Üá›J³l¸gV@M›jbFóT>ğ]’5ÒvÏòé"½¹†„|æ’^æÊ,™i¼Ëi8TùV¨œ¥%Äı7Ÿ?#ì§.–˜“>î’Câ?1§7¤º£80Ô¤^<îµÄæ¾Ğª3Zµ“–¥I3Íé?ïaàRßu¿ÖÏÙûîJjî6ZíOÓ]»ÕÉ:Î4j¥…Õ&úVo7	ÁK÷|´ßMT˜Œ­ID›+‘²(˜d
[Gş0¹×k$İ’7ÒAï+D­Vò&=2ş³˜Mù)#Xœ˜)ß¼ßiÊ&³Ëw"s»Hqc!Oœ~r^y	êÌ´Îf„áLØ+K‹‹¿ùÉk'A•€|²É.ÒA(Pô{/Ú8¢oµ˜üÅxÂ-À2ĞË òjÎş şY6Ål´dKël4V `4£ğC/ÙsÀbKé¿ë/Hx)€p€`0A*¡ßÿ¦TÜ&UïOd“$œ‘©>÷­·ìYÃ™/)ïñBG["c¡LX_b¯Z›ˆáÀl.Ïu½ÚFªúËó*fÅÿ‚à’I„CßÌ=y£@¸&vÚ(Ğ¼]ôúpO×[0©·¿R‘	^µci˜+§«K:[¦<`d“k±±–J±ÍØ4hœG5^º5V¯—8t}ë„ü¿»„6ó§Á[»Æ$<_rG‰_û³¤‚;U~Ã½é>«Şá,·8ë¤Â4qL0wÒ4reÁU<#æ»‡f`¢ú·ÍöB™nGûÜ¶-^_pÇsüj¦3:Ş
ÎS'ãŠIzà¤Ïàbè~ÿàÒÂq‹?“I®†!CëŞŸZ4Z4mmDù b3Ö’e‘£ÿŸ¹.Â_É’aSÛk(Ò%4v®æõµœ?r‰£T\Õ:–·˜Å•Wg2õcX–¹  ¶–àd¯·µn¾¾İKµSëíê¼©ò½ğò>#úîÛ×Êıè;‚Ñğ§ì¦½Ò\³tğ’áğhìRŞä#¹ÿ³ü]ß».Vß„gˆ0ªÇ·â/áˆ¿ªüšƒWù†«‡„0S–7Êş†‹D©@?ÍÊâZ-‹‰˜ "áÕ_®^?ò>K¥W:¦ş/ñÒ¹±sÏ#’×ˆë–¼J.Åd`n·nßÛ·nßtİİ»±@Ø“İ9:Y1º]¥Oƒg\|Û”ñ}ö{U´Ã½Ú²ëñ/í¤À5Â:§2pÇ¿ ÆÛ-ÏfC wÄ¯xø WÊË«ı>½¯>?#y÷Ÿxü›ëÁ¼\ m\¡T6ªQ0q0ÙÄÃPQ“Ãø¿ÕÄkÏ¦[âİˆ`bT•ŞRUr§ñ€È3€5€@Içªñ d÷nÛµ»İ:geéMZÙİZ³K‰:nİ•©ğƒxõ„çW„á–$Ùì×@Ã8 «ÅY¤0È;!µçÏ  %]®:=_7¼.!4ˆçÏàXÁÏXqS•†O<x•‡ãÿf>ËÎ}öü­™Ê‘êÕ€R¨ÕğL?­jÇ0ïüVïK”ğfàHp\ó““[§&ÉÙ9:sví[+[’®Ä˜Ä¡aÜÙì1‘-àd>‚B RßÖ!É€wÄvˆÊ¼¿Æïš×À½<óá¿Õ?>ê™-¸L`dj{ÊıûË¤"à	ğ:
a¬·Ç†Dú4Êt~ŞSç4ç­4óàOxõõÕ[`HÙO†g¾`>UÇé»^ ÿåƒÒ€ÏÅ×•0fÿÅi\oÀÒ§*T¬Ãœ­ÈUİ²l›&Ó°‡qjrR"Ÿvï±¦Ó¦vPTWİ|óàGÅô¥Ñn‹¤ÕF=µãëÁ%q×°„}o?cøò"6 D`Ôü?ö^(Õ‡À{[x «ŸòÙr”<¸ç×€€°L~©úI=`t¼¤Éù	GÀPPH±òÍtœ5ŸÁ0(;<z|yG¤rÊêğÌù—Ğ:F\£§•Æ$«U²+qÁ‡•OcÏS‡ÕÃ¾¤B]<F­Şğf­ÇØø—´A¢>—|FÒHóØ Ï*Ÿ<%ĞÎfÓõç‘äÍÜ»4äÚoİ+-´íÍÆĞÛ»Vià¨¾qğ˜l!«O$à0ê#iéÒñ+*»kQÇÁ	jËÿ?ÿAbHËôuë¦ß_ß®ÒAYp€4	%Q58»w:÷kÇÂîØ~9Ãªa«—j8|0 0‡û\]àÍJî.;§üóÛè *®=í'qáğ 5Å†ŠıOo vUÛÓÿÚi]÷a°ø (
.Uå†¤zµwÛÎŸœÀ`>\á‰ºrl3“gtÚÛºtêé»¥ktäº¬­o>_T^¨¼g¸w(ŒÈp~c¢!ğX<ª¼Gß÷‹¿ 3x3öß+ü½±ãğPø–Õ)ˆœõ
  B>X3ôìqáğb@½Ãaœ»iÌ‰\>8}mGûC=#Ë>>@§êwCâ4&’¬á ¤èø†ßwM¨:óá„Õº/ß|“g¼d}ÀgÑÏ‘ÙF¯XnïlØvÙ·‰uÕÒ6î•ê½:Tİ¸¾ïÜ6{í9çÇÖ	OÑ€J.V
,!ÈĞù_ó£5Eõ£…ÂT”K•®çÑ™šxøA”0?üò¥jmßIÂæjÓêöòO@0áğ8`2:áğ1#´×œñğBaÓ–úwş$8EQ¿gÙë”8a‚c“=:ÍJ10HM”d%«‘_µßõ¾úg Vmõ9HõÏSú?Æeá¬:ñ¹ÔQ‘ü‡ÒtÚtÚm:m7×Õ¤ë«’ïunŞİĞTvZNáô	—Gâ"Cãáú˜$ê¬R<æ°ÆKIÇãé*xÑxøÆ+ö•I/”:5±gÏ ì2¸|á’ß>£EêSVKõM./>1Aß0cët‡ÎÃ¤°Ê¤ØÙ(øh· 8îõØZ1OœÆL:Ÿ*2ËÅoÃ›Ö\€T½CRJ{æôS¸ğÊÅ\×AÛ·jêéÕ}ºı½»wMêdœD'¼H'#ÁQzpJ/¬Ÿ›=ï e`Šš.¿8ø+Vşœw–qÃÿÙTãÍ%À¤ü—5à?RàğF".SO}Z¥~)ûPÚ«Ÿì4|Ó¾Uõ=“|p~`–>VTTõRúƒTßTË=P•ß+Îw"w¼ùÿÊù…şGág¼´Ş.éDpBµGãLûW¬iõ†ÂÄCâ@xMÆÎ>†N>xÑş¼}éû×·tß·ºVõÒt(=îªÒuû¦Òúû¢á¼§O‰ïÔŞÓãà@xeêšş·êsôGù/„JFƒ÷)ıØAY ÁŠ8î“¸‚ı{å‰À”vÙñğWØGõôØ'`*1¯B³2ùa¤ô}ÇÉwßçÿ””]DÀöü°‡óÒˆƒ_ëdvÓhé+.7ØN€c©Œ—­™×8ù£ºë‡6:îİ/«Jé»q•½»}¾Ü} èê­éë|xu¿sÇĞ@D«å÷îô¶xâ°B«G«¢WÀÈ<}ĞXøvO1z6ú*dÿ”¬mæÂØn¹p@¾xÑ	×‡ÀH";,Øtë‰ÿóİëìê3—;¤ÿH°ÌøÃZ0Vâê¬v£Şªş´)$ıX¨Z`ŠÛÃ„€Ğw/¶4GçÉø»n:5ñÙ:nİ´İ½ÕRíÛ·¯nİÕºïJ€T#×‰
Õ«Ã•A&ğØú0X ¯áİÓêxd2x::©¯üL+¸½ícÑ æ‘bÁ*‚sâû!Ÿ‡"cá Ú#à`íoÓ»ßa‡²edö ¢‡­ÉFG
.ÿ”vÀÌ÷·’3î¶êrÛ¯·¯ª¶8PHHW+Çà#@PûE—½ÿÚjüûÁğÏğ“ì›7µãAÀôw1DÀ(€¨3ß³J¼(nİ¾ßû{§MİL“Õ«gm: àqäåüÇø‹Ç^NÔ‰Ş|'rD´d~aş A Ó0\ˆQ‰˜#=ÚtéÓ§Míİ[©Òon¼Ûİ6M[©&eCÃ'T€<ä?·iÍ4ªJ œ‡§ (ÏúØÚ5Êñ E½}¬í•»;§[01wbÀ  êÔWt¬Œ(OÓ%Lº“÷Ğ•>V•óçĞ×{­ò›u£o‹æ[Ò‰$H‘"@<•·Üf† µí—
WåÒ‚°Ğë÷Ø‡8)8‡äĞ‰3S†jª‡jk\&ÎikWıNš!Ú3ñÖÄbÿTD@%1yBojëŸf[•o2¾Ğ!˜œ¿äÍ$ÂÕ,¡ºca›9PUÕğ;¢PéoÃB'ê×Ik<%S fè³[r mŠ9–b>—°ª8ñ‚¥5£kQV×Õïñ~¬±q/üßQó 6û²Š–Cë¯¥uL2&‹¬¯'M°Y¢|í§ßyÇ‚)ìÁWa?ÂÅMşgbÙø3PLìˆ«àõ{¾À   Ùı‚—„ıY–ÂgÎúÔ%ŞCßïZˆ§»Z®~K £AƒUQ²;EGNÒ¸*šÕ«cÆˆG³¾ìcŸÃÿù÷Öì?òÓU™aã£p^xNòã¾2·^fÙTŠ0UFmÇk]ìÈs¯ñaş[óú6{Ä1„C¸¿&[ô‚7õì¢„ËøAIW&É˜k[|’¹jÄ§,êãÌ	L–ô±Š¥¦ùÕ·ã/ª'Ö¶Ëë‘¹=(ñœ_h€>iª&Wv¨ëKâH„6†áì”Æ¨R‡d°t`Ğ*Ÿàeì@+JâdH©*~«W”ou®q\ˆâõsï~×ânLï[ ‚Ş	Ù’?}—ò	İÄO,IbKníS3†Æ§VâöÒc%¥u½Ì¢‚B»gÜ¢S`Y#w(+_{çWYØ²Q¡¨®}Py‡êıéÜ<âé©Ø‹—5‡]xv_kÅ { vÛšH‚¤‰A ~¡¥ÅëRx(n–“—ı©ÕÕkOW"kXÓ‘ÏƒIÚš“À$¶<G <J'…ğÎ½ˆş€ BğË`ø©cŒD¥3é°ûÂ*t|Ë¿¬ jH°°’ƒ²@Ç(0!·ˆ»J®¦ÏšBğŒ@| @"Í‡<ª…Iûô¯Ÿª{šÕ5Ğ£>¦™3ìˆúñ¤2NÉ86ƒ úl–İÓtnÈÃDê·J2¹i«4¥4%³mÅ¬IİÉY~N‡òâwÕŞHº§dşêÏõ¹"¸¦wğ†òébYÊÜ%Ex)JÃå@_Aîª@#Û™—¼»¿·<»Ğ ôè½á¯Lã	+æÛBe¶ø4uàµÒiš+Q'¾Ì¿®³îş Æ}pÂè:â9§­7\×‡‡O=¤ı©E4¸–3 ³bÿ
q6¿ïC¾œñA°9è¦«·’üæ`ñ€ufô¤Ô'Àš@>  €qqö1£5ÁUºÏ’?…dw¼Cƒ	>ÀJÄƒ¤Ø1g#Cº™İ´3iphh×†±kL¨lò/¢ y®*œ˜§ÃõD#ãªI€§«ó-«Ãc…dè„Q„…ÔNS!¦L¸›³kb6Ílç®øåo»¯…ş„Ñ?îÑºˆÆÛöYFÔƒ­drÈ„ÖCb\àRK¸€’C$í›¨5ˆF|›şûÿy“N¢0—_Âß¡·°m`!°q½V=j²P¶‹A3ÿoÀ¿&+ı¼3›QïA×&ØrùYeU+¦ÛôÊ&kÜ™0ä™ ø  | ›GxáR¨û–O·Dµ–v!ŠŞîüŠ’èù¯ã.‰VÇ¯™fHÁEİÂGŸK˜ÔrsOk4¯‘›p«~}˜´•¿sÍùõ¿û3Ğz¢wÖO€Ú¹©Æ·Ş›H h“ÊÜd`
Hœ«l­šª^¹Á%€Î–)a‡„}ÍxÊ9ÌtI7£8Ş°n¤ëşÿ·ÑÒÀi…m£Mv”†[{Éumü0•¥Bó~˜£|àš`ş3*Ÿ0#é»»ÜÄ?±}’ó¿H"zez2Ä¬E•ış~y Z‰¸jvÖ:
=Á’õ‰tÃÚ®%»¿a6PíH\"œXan¤ƒ¹Æ¿™¼MÄœ í à®pIW/	ÔÒ›k0KoÖÀßÙ€CÊw<G@áüÀ?ÿYt,‰Ñ¡ÚjSLJ•[(S&¤åŸ%T%†úZÏ®u~Ñ+ğ¨ªÉ/”o·®´¯ç%}]òšïŸ¥Té&Îa¾~–÷/¡¤®ùûêd_:}Äpß¾¥	úšï«©­JÁXZ¡¾|ùSùÎ”Ò{^µ4Ôk¾ƒ½Õ'éi[{M‚.ŸnûŒ7Ö¾‡]õ:O©V°™Sç/ŸV¸“AoaC~2=4°ß:rú—Ë¡‘¨"”7\¯¯5PÔ×}
ãç7¿{MÍ*ğÒÓK2”DŸ$áMNªîŸ*T—Z§Ë©©¤úK¸[}Â¼7ÏÒ¯¤ı-o¸ºJú³¨TÊñ'æ[Ò‰$H‘"@	=¸)ü,‚¢èò
Ÿº¿§Ğ•8µŒ"AYYt-4DË±»"³A¡A"×‹´-hF•êæ'©D‡Â
À?/G	–rRMº|[f0äşÔˆ²Şì‘d5ek¢Í´]é\%J.jí†Û‰çßw_µ$’.5Ô‡\¦ )p|$0	?ÜÜÀÎ²“6T&ÍlÛ9™]r¢ì}X³BkËŒ\0¬Y–×É0¿æä©*JgRI4JåÊµ-ûÚö\<½PW¡t…ÁŒW¼pöİ­‹DÃ	ïu@ø  Ë³05
ÏlŞZ~P:*·uHĞ(Å$>5øƒƒ	úÅ,3›r
ù³lò=Juø?q{Ê%$ Ö‹fÅ tí‡ß Iø”RäYŸµ©Û¿Iuê§q«ì\ÁmĞ€ ½B­½ŞëBRßÏêjB‚yÿG$	¨^I¯ç{·©íœ98a•¾2DÊ‡i©ÕZ6¶-l¦ô'P7=°1ƒ(À­¯¾00dc     ¶WO01wbÀ  l'8;•’½±_ÅOYrGJİY„jbAò¸´Z,7Ñ%ıá›°„…ìÃ™yD<Xz~gÉä]|¢j&#[ €  .+øx-ÙCHp@!R}îßÒUAJ¶õaŒ”±XM’eÛ‰¡”í·-nXÖÓÆÎ2ç‡†ç&i›« …exZÑç‹Ô0xyYËAw†Nò[¤°ƒ#‘mÛZÊ•5íkkn!¾|gñ™b}ÄWh Ne•]‹‡ìÌƒKß„#¡„ÕOË„ÌÉ85°±6Ù­wÒòL3wüĞı ûï•’Î·šr¦T¼DÅñÿ3tœ7×c-’ÚöqòJÄœ0$'š‚-Æ¾¸]®õ:«„X($c¨€÷Ê–‹7%Î—æ€ø Q8tä?V¦º¨ok¿tåR'î¡¡t2—ø¹îh´AºI`ßz|m´4˜2ãz%\ h,¡ÚFÛ‡^ÍÍU»ô\t²›p±éjÛuDöÔ×G‹œş®ş©;/.‡Xôìëx÷¡¿¹?Î³àªÖXd1"Ôë|»1°ìâ6³˜À¦ƒé£ÈÚÿ°j¡°³é`×Ó´0ŸªW½ì\ÂÉÜgÖÅb2&vJÍ#©£zW;7,U‚iIäm¼	nSj—°Õ~>¸§+Eqïxà;)‹Œ~oŞ¥ÜÛ»è
UÏèÇ¹v`6ŞÅfÁpÜ{èÌ/ëËã ğ—ÿ«€ü  Êõp×m×ÖT»¿\[CD
€-+ˆ¥ˆÕ†ê	œß<;`Ô‚`s¸NİÙ›¥–Ëª±bMcX„xèıç]qúÖ¼äZäÌò‚\‹€‘é‡â¿Ä˜Ïàw=ãFk”“JYrØ5Í²lŞC…bµ×ô6¢2±)4ŸQ7Â«åÛrJãm‘pmñÍî	´>yM­,XØ¤KÚ{~M‡š]GÚ[QA—‹ñ‚ü·ğ3Ğ"!Åş¥*Ç4r]ŠMhû²İ"ş!ÙToüÄÔ~?êüF˜¾Ô\ªƒ<>5Ğ²½¦7Ì3Ì£À  #pp…-ª£Óí«¾Ä'ë/Zˆ+¶şlÊìx¤ãíö ¾•úßQG.¯Èø—Éo	¨qü€â²…°úBãhi]Lˆl!?GüúÄ¹Æ‹ÂdÔ®ÔÌ¨à'±Ujâæ•Iâ^Lñ‚¾wÍ—W™‡¦ôoâ[×}Ïç¶h ÏYÅI4tÊ$ 7]©ƒ²5­i,Ôï+ü0ÙY×Æ"Lßï¨^™Ôï¹Gu{cH°œâ@}Ø`^@–«…Õù‡Ij_Sª!rŸ–óÜßX ¦)ØÜ‘ü1»÷Ûè,$ñLx2‘*š¬gÎê³VzH±¢=u‰{3ÔWW
¡“·óxŒ¬R&9v ÎŒüË6Ú†¾ÀØ:ÈÑwˆû@áüÀ?ÿYt,‰QúlOM	•W(©®õŸjNa?Tùò´±êx~êìCˆS¤Ï©½·P‘1ÒØƒIóçõ¡>|é:TÎkÖ¥J•'ÕŸ’JúªnkºKÃ
ïßXJú“õ;:uIîºîŸ;"ùôôµß:Tü‹äÔ•*›®š¥0Ÿ>®çZ§°«îÿ¤8kO€FwÏİ*öšgÎ“%ùõ4°•>|óƒên’ÂuJ”)Ğ—ªT¦›ò<¿ˆú8o—BƒÑí}oĞ×TªŒ*p¡B}
(Ou;|ú»Øn×~…í7Ê”Ãv–·DßS®ıkêğ¡ØJûZ§Ï ¾÷;éêj~’»ç´xS|©3èOŸ¢C
T*sÆ/™oJ¥J•*T© FÿDMğg/ğ»¸«³Ü…ÀùŸO@ç»}ÂCîÄÂ·…=Ó¯aáÔ«l¨‚¢ºlR HÖ<ŸöøCPOÈáhô—íø•ÄYD´L2Ñk¦l³‰X$¦&µãÈqÌK”W±è¬bçPj¯kZw	G!g(’Ô3–1°R‡E ¹àPÁ^™€ãP!AD\}é*ı[—ğRß·.Ëjé$Tm‹Ñ­w"Ñ‚÷Iÿ<Ü–DÄgøJà&Ñ!ÆVk„Ó‚”Û ˜u¯Y>)xcğ¯~è¤Ù -:R×ƒ}â¦£tìµ2­¥<áÌÆhÅ­Ì!DQğ  æh¿±….Ó±­õèPkœÌÔıç(	$IOãBG€Ìöq‡zèÿÁUˆù…4âŒ&öÙt Øµùåî†Ï…à,‘…Áo`¯èúÁ&&mŒù_yv3_Ø `~€fA\fËàb8œ.Û,Ê˜Ö@—j¦kT·
?PZøöú³_¤yıµJO”Ö&²Ø–ÛÎˆt\^dƒ®Ú™DáZ6¶Í›Œƒ¿±êØ+¼çMË-hgjwæ\‡¥øåèPIú—,‹âMË¡Ò™uœs£mH§u:¶‹ÿQƒ;×H wkjb¬d¤@ÕãrµÈDsùR€  2>2£3gÒ¶b8„ğZ·-=ş»Ê¨oå½‚é2ğˆ%B@2$Ò–‘aÎ¦‘­…„Ö¹„“Ñy-éÊÄÌ#/´Ğùöàû°æñ*€ ‡ì6Uö`ï³3QŒrÖQR¯+´fla##G6µVk—ÅŠÄúª5v½ÎÇ\’¤ôA˜ÕÄO/oŠËpåñ‚¨º©°´»:“A‘qªÊ×ºÖ„ÚõÌhßşzÛõÛà{}²H­•A[ñ"¿˜I×‡¨¬cv£Q´…³\3P»ŸÅ–›¢E×D÷îÆ<›üeXI':tšMàË,«Ğ|  åß÷œ©3À4•N¤ì((Íüğ½E1€ÃĞùÍĞóÚœÄ“à
~'Ş$uxÑ$â¤Ò)°T 0“,ËQà·‘ sßËš[Åó›Å\âîQ00dc§\    ¶Xp<Û™•AuÿÕÔ¾jIOAğùdo‰üC&¬×F»	#)‰„|Ê']´MéÈË?OíimÁ”ë{³zMœ™Ó’…«A ¿Ú&áßù;Ætd©
'OíÄQ,?ë4£‚ÈCl˜Ÿ‡£9´hà)ş­^v&9ù#m¦?Z™Y|»7&tó¡şßìÙÉÍ&”’tÇ3
Ïª§–mÁO—¨ÇPñbï!Ã§„|¿²v3ÂYŸ¹Î³ÍÒ&ãi:+ŸÓo$tÎ4üÎ‘&‘};:°Ô)şœHÉéÕé7¤î‚ü‡©ğ)úíéDş¬5‰E	Œ á®ºvÆÈ §¯ãlõgq†“ı{Î±ä+pj#|S"Ä^ÔóOñ£39n™ò}x!=.¼Èµ6>i!'©uÆ·wæ3„ Sû[ÛÎn6v,ß7µ}!ŒæšœO¤ÀSõo9rÚ®Rª¯yÓm}´ğo‰Eß’—¨–K$NÙ_=?cÂŸ³½¹Í<Ë‚VÅM®€ş¤1ıô/µR¯Y¼¢5Hdü2ğ`‚$O«U~©\Uë³Š~9æOü>S11°¦„*ß¶ úÑ ?Ÿ^Š~­]kP[º2#ğ`ò¯P„‚T‰jä¹Å”ò°`½@—õJÇãûíµB‰–¥J5Ù%àÊÕRI¼¬8)%ƒ iğetz$ş‰C|şÿé±´´
                      //  even make it here.

                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                      // Real url and email support comes with prebaked validation.
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                      // If the upgraded input compontent rejects the :) text, we got a winner
                      bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        /*>>inputtypes*/
    }
    /*>>webforms*/


    // End of test definitions
    // -----------------------



    // Run through all tests and detect their support in the current UA.
    // todo: hypothetically we could be doing an array of tests and use a basic loop here.
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
            // run the test, throw the return value into the Modernizr,
            //   then based on that boolean, define an appropriate className
            //   and push it into an array of classes we'll join later.
            featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    /*>>webforms*/
    // input tests need to run.
    Modernizr.input || webforms();
    /*>>webforms*/


    /**
     * addTest allows the user to define their own feature tests
     * the result will be added onto the Modernizr object,
     * as well as an appropriate className set on the html element
     *
     * @param feature - String naming the feature
     * @param test - Function returning true if feature is supported, false if not
     */
     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
           // we're going to quit if you're trying to overwrite an existing test
           // if we were to allow it, we'd do this:
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b");
           //   docElement.className = docElement.className.replace( re, '' );
           // but, no rly, stuff 'em.
           return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr; // allow chaining.
     };


    // Reset modElem.cssText to nothing to reduce memory footprint.
    setCss('');
    modElem = inputElem = null;

    /*>>shiv*/
    /**
     * @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
     */
    ;(function(window, document) {
        /*jshint evil:true */
        /** version */
        var version = '3.7.0';

        /** Preset options */
        var options = window.html5 || {};

        /** Used to skip problem elements */
        var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

        /** Not all elements can be cloned in IE **/
        var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

        /** Detect whether the browser supports default html5 styles */
        var supportsHtml5Styles;

        /** Name of the expando, to work with multiple documents or to re-shiv one document */
        var expando = '_html5shiv';

        /** The id for the the documents expando */
        var expanID = 0;

        /** Cached data for each document */
        var expandoData = {};

        /** Detect whether the browser supports unknown elements */
        var supportsUnknownElements;

        (function() {
          try {
            var a = document.createElement('a');
            a.innerHTML = '<xyz></xyz>';
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
            supportsHtml5Styles = ('hidden' in a);

            supportsUnknownElements = a.childNodes.length == 1 || (function() {
              // assign a false positive if unable to shiv
              (document.createElement)('a');
              var frag = document.createDocumentFragment();
              return (
                typeof frag.cloneNode == 'undefined' ||
                typeof frag.createDocumentFragment == 'undefined' ||
                typeof frag.createElement == 'undefined'
              );
            }());
          } catch(e) {
            // assign a false positive if detection fails => unable to shiv
            supportsHtml5Styles = true;
            supportsUnknownElements = true;
          }

        }());

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a style sheet with the given CSS text and adds it to the document.
         * @private
         * @param {Document} ownerDocument The document.
         * @param {String} cssText The CSS text.
         * @returns {StyleSheet} The style element.
         */
        function addStyleSheet(ownerDocument, cssText) {
          var p = ownerDocument.createElement('p'),
          parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

          p.innerHTML = 'x<style>' + cssText + '</style>';
          return parent.insertBefore(p.lastChild, parent.firstChild);
        }

        /**
         * Returns the value of `html5.elements` as an array.
         * @private
         * @returns {Array} An array of shived element node names.
         */
        function getElements() {
          var elements = html5.elements;
          return typeof elements == 'string' ? elements.split(' ') : elements;
        }

        /**
         * Returns the data associated to the given document
         * @private
         * @param {Document} ownerDocument The document.
         * @returns {Object} An object of data.
         */
        function getExpandoData(ownerDocument) {
          var data = expandoData[ownerDocument[expando]];
          if (!data) {
            data = {};
            expanID++;
            ownerDocument[expando] = expanID;
            expandoData[expanID] = data;
          }
          return data;
        }

        /**
         * returns a shived element for the given nodeName and document
         * @memberOf html5
         * @param {String} nodeName name of the element
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived element.
         */
        function createElement(nodeName, ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createElement(nodeName);
          }
          if (!data) {
            data = getExpandoData(ownerDocument);
          }
          var node;

          if (data.cache[nodeName]) {
            node = data.cache[nodeName].cloneNode();
          } else if (saveClones.test(nodeName)) {
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
          } else {
            node = data.createElem(nodeName);
          }

          // Avoid adding some elements to fragments in IE < 9 because
          // * Attributes like `name` or `type` cannot be set/changed once an element
          //   is inserted into a document/fragment
          // * Link elements with `src` attributes that are inaccessible, as with
          //   a 403 response, will cause the tab/window to crash
          // * Script elements appended to fragments will execute when their `src`
          //   or `text` property is set
          return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
        }

        /**
         * returns a shived DocumentFragment for the given document
         * @memberOf html5
         * @param {Document} ownerDocument The context document.
         * @returns {Object} The shived DocumentFragment.
         */
        function createDocumentFragment(ownerDocument, data){
          if (!ownerDocument) {
            ownerDocument = document;
          }
          if(supportsUnknownElements){
            return ownerDocument.createDocumentFragment();
          }
          data = data || getExpandoData(ownerDocument);
          var clone = data.frag.cloneNode(),
          i = 0,
          elems = getElements(),
          l = elems.length;
          for(;i<l;i++){
            clone.createElement(elems[i]);
          }
          return clone;
        }

        /**
         * Shivs the `createElement` and `createDocumentFragment` methods of the document.
         * @private
         * @param {Document|DocumentFragment} ownerDocument The document.
         * @param {Object} data of the document.
         */
        function shivMethods(ownerDocument, data) {
          if (!data.cache) {
            data.cache = {};
            data.createElem = ownerDocument.createElement;
            data.createFrag = ownerDocument.createDocumentFragment;
            data.frag = data.createFrag();
          }


          ownerDocument.createElement = function(nodeName) {
            //abort shiv
            if (!html5.shivMethods) {
              return data.createElem(nodeName);
            }
            return createElement(nodeName, ownerDocument, data);
          };

          ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
                                                          'var n=f.cloneNode(),c=n.createElement;' +
                                                          'h.shivMethods&&(' +
                                                          // unroll the `createElement` calls
                                                          getElements().join().replace(/[\w\-]+/g, function(nodeName) {
            data.createElem(nodeName);
            data.frag.createElement(nodeName);
            return 'c("' + nodeName + '")';
          }) +
            ');return n}'
                                                         )(html5, data.frag);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Shivs the given document.
         * @memberOf html5
         * @param {Document} ownerDocument The document to shiv.
         * @returns {Document} The shived document.
         */
        function shivDocument(ownerDocument) {
          if (!ownerDocument) {
            ownerDocument = document;
          }
          var data = getExpandoData(ownerDocument);

          if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
            data.hasCSS = !!addStyleSheet(ownerDocument,
                                          // corrects block display not defined in IE6/7/8/9
                                          'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
                                            // adds styling not present in IE6/7/8/9
                                            'mark{background:#FF0;color:#000}' +
                                            // hides non-rendered elements
                                            'template{display:none}'
                                         );
          }
          if (!supportsUnknownElements) {
            shivMethods(ownerDocument, data);
          }
          return ownerDocument;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * The `html5` object is exposed so that more elements can be shived and
         * existing shiving can be detected on iframes.
         * @type Object
         * @example
         *
         * // options can be changed before the script is included
         * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
         */
        var html5 = {

          /**
           * An array or space separated string of node names of the elements to shiv.
           * @memberOf html5
           * @type Array|String
           */
          'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

          /**
           * current version of html5shiv
           */
          'version': version,

          /**
           * A flag to indicate that the HTML5 style sheet should be inserted.
           * @memberOf html5
           * @type Boolean
           */
          'shivCSS': (options.shivCSS !== false),

          /**
           * Is equal to true if a browser supports creating unknown/HTML5 elements
           * @memberOf html5
           * @type boolean
           */
          'supportsUnknownElements': supportsUnknownElements,

          /**
           * A flag to indicate that the document's `createElement` and `createDocumentFragment`
           * methods should be overwritten.
           * @memberOf html5
           * @type Boolean
           */
          'shivMethods': (options.shivMethods !== false),

          /**
           * A string to describe the type of `html5` object ("default" or "default print").
           * @memberOf html5
           * @type String
           */
          'type': 'default',

          // shivs the document according to the specified `html5` object options
          'shivDocument': shivDocument,

          //creates a shived element
          createElement: createElement,

          //creates a shived documentFragment
          createDocumentFragment: createDocumentFragment
        };

        /*--------------------------------------------------------------------------*/

        // expose html5
        window.html5 = html5;

        // shiv the document
        shivDocument(document);

    }(this, document));
    /*>>shiv*/

    // Assign private properties to the return object with prefix
    Modernizr._version      = version;

    // expose these for the plugin API. Look in the source for how to join() them against your input
    /*>>prefixes*/
    Modernizr._prefixes     = prefixes;
    /*>>prefixes*/
    /*>>domprefixes*/
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;
    /*>>domprefixes*/

    /*>>mq*/
    // Modernizr.mq tests a given media query, live against the current state of the window
    // A few important notes:
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return false
    //   * A max-width or orientation query will be evaluated against the current state, which may change later.
    //   * You must specify values. Eg. If you are testing support for the min-width media query use:
    //       Modernizr.mq('(min-width:0)')
    // usage:
    // Modernizr.mq('only screen and (max-width:768)')
    Modernizr.mq            = testMediaQuery;
    /*>>mq*/

    /*>>hasevent*/
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test on
    // Modernizr.hasEvent('gesturestart', elem)
    Modernizr.hasEvent      = isEventSupported;
    /*>>hasevent*/

    /*>>testprop*/
    // Modernizr.testProp() investigates whether a given style property is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testProp('pointerEvents')
    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };
    /*>>testprop*/

    /*>>testallprops*/
    // Modernizr.testAllProps() investigates whether a given style property,
    //   or any of its vendor-prefixed variants, is recognized
    // Note that the property names must be provided in the camelCase variant.
    // Modernizr.testAllProps('boxSizing')
    Modernizr.testAllProps  = testPropsAll;
    /*>>testallprops*/


    /*>>teststyles*/
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterwards
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... })
    Modernizr.testStyles    = injectElementWithStyles;
    /*>>teststyles*/


    /*>>prefixed*/
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your input
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing'

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style.
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use:
    //
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');

    // If you're trying to ascertain which transition end event to bind to, you might do something like...
    //
    //     var transEndEventNames = {
    //       'WebkitTransition' : 'webkitTransitionEnd',
    //       'MozTransition'    : 'transitionend',
    //       'OTransition'      : 'oTransitionEnd',
    //       'msTransition'     : 'MSTransitionEnd',
    //       'transition'       : 'transitionend'
    //     },
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];

    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame'
        return testPropsAll(prop, obj, elem);
      }
    };
    /*>>prefixed*/


    /*>>cssclasses*/
    // Remove "no-js" class from <html> element, if it exists:
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                            // Add the new classes to the <html> element.
                            (enableClasses ? ' js ' + classes.join(' ') : '');
    /*>>cssclasses*/

    return Modernizr;

})(this, this.document);
