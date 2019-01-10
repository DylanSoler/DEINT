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
    // - Firefox shipped moz_indexedDB before FF4b9, but scT�!�쒐����BP�2���;�BV��Mi�`����Kw�7���o �������wZ/� ������x�,�X�����%<�P �$2����_핕J�� �Up��r���M�� �gİP5:#�ch�+���R���7��T.�P����V�C{:>sĠxA��_�J��qEr�� 0 �����)_�ȮL�����c�c"Ax0 +?�1|�����)(��?�Jt%�r����5��-r����x����h<� ����)U�V3�}�b��� w��@8K���JD_V�м���W�_� 38ʥ��c,t�0��A������/,�&pt�x�"��_m�a:�(˳*�
`�~?V$P=t~>��KĪ��,��0D�A�H���l/�������2�j�=������;�Ӌ�����k0�H�c��2ܜxS�@�U7������Xx0 �����$	jj�*Z�(�V��5s)��]�_�)x�$Ԥ%�Y�K7y��
ffz������Y����[��ƉA� KWG��ꁵ]���h��㰿�'��'Dr_�p�p��a#��߉K����L�����G֘��߶kl]��h֑���k�MS���!,63���[<����"t�va �Ԇyp�����#=�s^�~2w(���F���ن&�����RC�"���l���Z�ɟ��]��D�Y��m��n͜���j�Ӷ�)�J�P��Pꥮ�sH$���Ǩez���?ʲZ�%?�]���=����sL?Ó�W���<���j�r��N�3�gf�Yv�ǷنXd�b��S��?1D彦R\�\?;OL�i��̣≯�?�K?�0�W�)�R�&��ܤ@|�������vn�=Sc����D�{W<�ǳ���O��)WfX�'�� :5��0M
Nb|�!O����&>�r�Ԇ�qZv)��Q�|h�D|[s&k��a�)�,��7;�ݬl?�������̂��P�伒E�fӪ��蠹������k�
|�앎�퍙��-k]�~���ۍڱ�(�u��c0�M�����t��J�)�3�iUjW��(��z��%�U�W�l�Q���ʧg�2�� � <`��_����d��^��2�W�W���vx
`6���7��U��~[5������dQ�bk�ĕBH�JUD��QTK���<~$+���l��.A��K�[)�A	s��X�S3Tj�<:�!R��B �����?�.�U�T�v���L� 0C/ �@S(�g�+YXx<	���o{�R�j��$���y]���B��O��Mt����v˚tH޳��J��E���+���7$��䕩z"i)�I�e�k���P@�T qyp���)��� � �$�	g��kO�2��bQw�.�m�2V��<
�@+R^�����˯T'�a +Um�GG�HV]%`��
 �M�/ �l���� 8~K�h�z���}��@��#�����p{�qe�� pC�	�jǿW2z$m�Yu�ocfǳՎ�)�P����R�WA	\j�1s��Yp 	>/�.��nU|�V<�����
�\WT��������x<���J��j�`6��]�<��)��j�M��;,gZ;�V˙�p
a��?�o+�1焱����X�!�4��ĸ�P�� ��;!z�kp�ꁂ���~�J� �x$�{�H����W��q��C>_�����A߼_
�lS[�Ɲ�*'n�^��+P^�������L��$�� �e�8\�A,��'�/�ш��G�v=Uo�LV:'>G�k�S�1�ǲb���N����T>��+���t�F���8�E�=^���>��z��]�E깳����̎�F�!
j ��B�֨ʫ�׊��/1�����l����� �.V�h�HR]T��7�C����BP��}��'����a����[�����/�J�����qqw��~\���x\_ˣ����Q�B��4�ߵ�L�H�-xS V\%�VX�mS ��/���^[����*�ɑ� z��ٗq�V��v@�}`��%~}J�Za�l�p�$+�lbkn�S'W����#)�>f�։�wa7���mH�v%ffs[2��$9��wv���3<;�m%$P�G�'Nz�}����ɧB����N��o�w��ڐ��wt޷�j�rCt{=V&�&�wHS�����z�Wt�18ÝӖ�G��̢����w���)�FI����$�����ӆa S=�d$/���x��T�ek��%�m<�O�|���-�W��h��ҝ�y��%ׅ=��=D���=܇?�Wm��)҅�u!����z���`����a���;Ӌ�Ʊc�#���O�f���N��n��@�����{æm���0���d�ާ:;��Y{rCvej�=�<�ll$o�o���c� �)ޛ�#^�6�a調�n��Xx��ܒ�D5䣃�]�˦��C�O�by23�1��ʉ���}��r�xg�Ο�n�i��cI�Mo�N�sm�ߖ�p���:F��~
@�����'���Q8܆��^Q���X��Uթ�z�{z�
�A6T炟؜�bMvD��&X�t��ON�`8)������;�H�X2��BV�dc�K��NON���0 �+.���=�WUK���W�-�Q���x�ApV\�|��̵M���?����Kı.۪��,�CPb���W��I���U}魐*����~%�Y$����d4$*��/j�nl��	 � �`�%��b�[n�� н_ā,����6�`ea�A,Q'�� ��qP͚��{�����%
` o�`�m�*�_����`�R�g�G��P4Uh����}WjC���$O*/.����s4���@�w���bW��̹0�J���!P �a�X�c�,�?�~Q?������n�d4*�d��!����콖�� ���@�+�_��.���c�EW >t���x*�G p�r�(}�<���F"� ��@�J!_��r˿�������K�u�P)��<������{��PB��W�xz=�^K2N(�1������J �Y}����]�k3Y�]����#\��K���k����e�Ax����0C�E����Cb��E��o��� T�0���$G�T%A!P����%ٿ@�R@`/.�ǅ�/��\�����D{�`ϩw��E���!!}�O~6J�G��si�)�0��wd��8WO+����{�Q�ڒ��n����e9��������Hr)�f�)�j�L��T%��y��W̸����Usg��#���?��>%���{��Ұ���[-����G��}�s�hu;kRsBЧ�����|�e4����!��d����U,�7�j?,��"F58�K���U�̭g+��B�*�7��W�h�5e�~2��R `�1z�_	w���E�1�f��QW�*���`�I.�q������az�G٨�Mj�t�S	��U��ﲪ`�0�� �T�W�3|���@e���uB*�*��VY��O�����<�;�`P*���k۩Y~�]^]!��~[3�K8���Gq6��?�)��]q�̌6�l��X�l�0�/�'.0�sC1�.��OF�'�)�k�� �~=V7fŎ7�U3D�]&
yyr�˧K���]{�'ƛ2Ŧ���t)�{���������E��Q}�,pS��&������Z�7��e[�w�B��/y����R�v�YX4���;=��N��v֚=m�Jg��z��w�lV�\����Y;F#�#r��菈Ψ��S� 蟎�$�8r��7,3j�~�I�ҿ������D�5W�H�����$\�)�����f�ν�"4Y����@,
+���e���
u�{^ƚ�i�{��F����������fP�D����Ce<
>�������_-����?j性w_�kP�Q����Aг�F�|��)՟m�r?�f	��9��2֌�M.�޸)�d�Z��mi�_�1���0ͪ�k� �@���ч���OڶI�mw1�%�3a(C�,y�#r`�)�Ix�!��nS��y\�̀}	�@ss74b�\^]�<�������n8)�f����kI���x��� ���H��xE�� �@�-�4ك ��� �w���ϫ���
+l�G<\��?��ǃ���F��0�@@�����]���*T>��.���U��:``�_g����%CSqT�.�S6tK�U�js�S��� �0��Q�wo������V+��H4I������:�$���p 	a���UK�{v��)�KV��7c5����AL@f���]��a���*Ug���]K�����U=�B�j�/T?�{�;�>�.Rp)�<>@�����J��۝FL$e��7� ���������Hf�NH�?�َɇ��;$h�
���>>/����@����6K�%Ig��d�k���!��C��������r��..���G|��v1ڐC������MĀ��@U��`2���8hJG����ޗ�*�U���蜰�4A-ʨ�������U�c�$_�������PC� �z�^%�AԠx!x	Z����Y��a�w$�����*�.+VD��H�dU;�(���A��:�wY���)��R�OI$+>3y >���B�]����PG�Tu�y���5+YZ2���\3��0o���\��Ӓ�ƥn�4�<�[ �?�����n*Fv�X�:u���|y�j��T���&mi�N5���~���[޼}vڢ�X�0i�5�����`ѓ�L0x��UE�RӂZ��]f����dԢ1C��� ��s� )�41 |�ꢒ����KQ�x����|��5��/��q�b��<.�j����E���S>;�=h�Q�L^���;��{��d)��\$��.2��ip�]�*���k`0�I�(����6(\2U�`�>��T}�Z�8�ap�>��J��T��l���{n�8�;y14xS��QF�D�A��|�u����dp�+K�
{�5).a�Y�ƞ!\�kq)�'yxE�Cӱ��j2�,4�1��HB�Cs{���k�K��iF"<�������;�w"s���S�sxC�5��Z�E�ޢ9�kdt�b{4�S�ֲ'qy�S��`֪��u�ڹ��vtض�|�C��\�RMnsc��l�S�3�~����ӟ��gZ�qȂ�u�D��+P�k)��}�`͓�aO?`����bM��
�Lܱ�[�A/nG�
=��{xk0��f
/-�&u��Ns����I�a/��)�-%�X��j�Fc>�g�vt�(Ĥ�S���dJv��sF���s� S���[u�vƉj��{h�'M�S��x�0SZ�ɝ���I��F��w3�s8f�B����iϗ[�D�xt��%/���&���v����
`t������$�0��n�T- �>
��(^��5/�@_ ��&za�ߥ����F̤�L��?�����^��o���K�����,|>T��cn��4|]�$KSz;�I��x� � �{T����Z�З���z��<�@� <H���/�5Ta;gA�?Á
�C��[6J��0x�����}�*����x����`�X��I?�O���6Nt�f^
a P�ebYv����[������ �$he�GW�؃ʺ��p(�K`���*T%����P+ܞ�`�P������r����` ��%^+�^�핏t�?�]�*�U��� ��~j��b�'��csm�/�N������.5V�W��|K�n�E~�����俷��"�`M����{��4.�P��K���������;W��:�K����a\��ɵ_���/}���j.��2�ʇ�ʿUɪ������%�Vݍ�����nk���i�y���$�	͂:������W�ɦa���KF=w3�sO���ĚL��3�X��>���O��pFG���0��Y�t
a@�dąE��Sg��V��0��@ O���R�/.Ԧ*V��.UϗP��!]�U_��|�_��nrFQle�O ��0�^�����E+.Ȥ
�D��B+�خ1��_����l�-��*N�H��r)�}7��]� �)�{V�e��{��K,���}�`S��e�6����96îe��V������e������;�E�@N�uN�����b�N~d��,%���&�n��!��3&���a��s����L�-�M���MA��m۩�;mg~Uj7�<�\�9��۶]�?m��K�>����ze۬�Q��ׅh�)ӫl�~N�#�����qZfޞ\������֜�zc�0����#�X���d�S��I��H�b�UՏ�qiF�}�x�)(�n�Fb=%
wV�=h��c&�'"L�{�:+ۇ�$1�oP8g�XXޖ�D$��.��|�`)��YX;ٛ�"�gʞ�՜�g ���j�ڼ$��bBxZzvBP)�u�0��W:�9��n"'��S�f��јcf���O��mw[̹�Xܶ�6������`�S0:$�j���t�0C����[=	�0H�_�ծV$���|�<��/T$���Mqx�O˵KG�@/��.yR�{���3��'�@�����OZ.W�-_��ڮ'�9���?� �U�}i{%�($/�S&�`��K���<"��~����=K�G~����Y0�(}@��=�e���1�@�HA�5?ʫ~����ѭ� ��$��k:ܢ�#�3fJl!�3�� �d
 h
����N\�(�>%@Ud��=4C�a!�.ʩT��`�|�!Z�%R����^]X����9��p��2@�Aw��N+�`]��2I�d�.����5���A��159�Sљ��s�B]h(U����?���'V��G���6rj	�	�bI}��Z㵷�2	\���^�D��x�$����ʯ���J��~IL��BZ%��˸���#����ԧ�����نGY!-0��?ޮD��DdJ��#GcF�:�F���৽Qz�>�j��M����R)���AO��e���wl%�s7���m�yN���z���Sd\�Ej�������#��w�O�:�cOW*��w3����	1���)�u�X;�L��O���g�-�:��2��rjs�T2��)��I#�_q�����q��u�i9(S��1�k��+�w�n�$�;�
���)��ooL�ŷN������O�y-�Sjsc=n8)��:`�n����q#B�)�J
u@�?���U�8(푉�u��<!]�؝?�a���T������	j�;��:l��&� ��~'xS��X �0oߒ��-���O�5��\n';ᩬt�H;jHK�ZS?�����3�h)���{�5�?�C5�Cv�$�O�3	q���j'K�F(!xS��'+VD�����{B��i#&yΛ
c��a۟��Q�G�
z��gvn��,ݦ�szA��
`Q_ �N�䣿����x���f뷇#t�S1&�o�0�0�\� ?د�����1yx0 ފ�Ȓ�����^L�\�ݒ��8 �h�{�z�.Y���o�'��x<�>��r�vr�&p<�� �J��=j�e�v�x�U�	tS��۞d���ZMK�Aԑ�N���輸ER���m�X�V^�����,/<_AB��+�J���m�o}����5}e�?��P���i��>e�"{�ɭ�Gln8� �����_�6��H���шݧ��l�U�E���	HԎ�M�ӳ���.�.KzA���m��+y��v4ǽ ";M��~	ջ��K�IX|a9�OA}t�L����Q�|=(�)ܾQRх�l\Ǉ��W}��Bs���<G�'�ۥ�&ա���ԭ�n'7���]ڱ�i1���B$��;��	x�i��3���*�Gz�B_aЧ��6�h��KY7��h�Sٚ0�����ZSL�)��H���<�����F ��!;M�����t��ί�1W'v������J�l�gV�@M�jbF�T>�]�5�v���"����|�^��,�i��i8T�V���%ď�7�?#�.���>�C�?1�7���80Ԥ^<���Ъ3Z����I3��?�a�R�u������Jj�6Z�O�]���:�4j����&�Vo7	�K�|��MT���ID�+��(�d
[G�0��k$ݒ7�A��+D�V�&=2���M�)#X��)߼�i�&�ˍw"s�Hqc!O�~r^�y	ꍝ̴�f��L��+K�����k'A��|��.�A(P�{/�8�o����x�-��2��ˠ�j����Y6�l�dK�l4V `4��C/�s�bK��/Hx)�p�`0A*����T�&U�Od�$���>����YÙ/)��BG["c�LX_b�Z����l.�u��F�����*�f�����I�C��=y�@�&v�(м]��pO�[0����R�	^�ci�+��K:[�<`d�k���J���4h�G5^�5V��8t}�����6��[�Ə$<_rG�_����;U~ý�>���,�8��4qL0w�4re�U<#滇f`�����B��nG�ܶ-^_p�s�j�3:��
�S'�Iz���b�~��ҝ�q�?�I��!�C�ޟZ4Z4mmD� b3֒e�����.�_ɒaS�k(�%4v�����?r��T\Տ:����ŕWg2�cX��  ���d���n���K�S��꼩����>#�������;����즽�\�t���h�R��#����]߻.V�߄g��0�Ƿ�/�������W�����0S�7����D�@?���Z-����"��_�^?�>K�W:��/�ҹ��s�#��׈떼J.�d`�n�n�۷n�t�ݻ�@ؓ�9:Y1�]�O�g\|۔�}�{U�ý�ڲ��/����5�:�2pǿ Ɛ�-�fC wįx� W�˫�>��>?#y��x������\ m\�T6�Q0q0���PQ������kϦ[�݈`b�T��RUr���3�5�@I�� d�n۵��:ge�MZ��Z�K�:nݕ���x���W���$��׏@�8 ��Y�0�;!���  �%]�:=_7�.!4�����X��XqS��O<x����f>�΍}����ʑ�ՀR���L?�j�0��V�K��f�Hp\�[�&Ɏ�9:sv�[+[��Ęġa���1�-�d>��B R���!ɀw�v�ʼ������<����?>�-�L`dj{���ˤ"�	�:
a��ǆD�4�t~�S�4�4��Ox���[���`H�O�g�`>U��^ ��Ҁ��ו0f��i\o�ҧ*T�Ü�ȁ�Uݲl�&���qjrR"�vﱦӦvPTW�|��G����n���F=����%qװ�}o?c��"6�D`���?�^(�Տ��{[x �����r�<��׏���L~��I=`t����	G�PPH���t�5��0(;<z|yG�r�������:F\����$�U�+q���OcϐS�����B]<F���f������A�>�|F�H�� �*�<%��f�����ܻ4��o�+-�����ۻViਾ�q�l!�O$�0��#i���+*�kQ��	j��?�AbH��u띦�_߮�AYp��4	%Q58�w:�k����~9êa��j8|0�0��\]��J�.;����� *�=�'q�� 5ņ��Oo vU����i]��a�� (
.U���z�w�Ο��`>\��rl3��gt�ۺt�黥kt京�o>_T^��g�w(��p~c�!�X<��G���� 3x3��+�����P����)���
 ��B>X3��q��b@��a��ỉ\>8}m�G�C=#�>>@��wC�4&��� �����wM�:��պ/�|�g�d}�g�ϑ�F�Xn�l�vٷ�u�ҝ6��:Tݸ���6{�9���	O��J.V
,!���_�5E����T�K���љ�x�A�0?��jm�I��j����O@0��8`2:��1#��ל��BaӖ�w�$8EQ�g��8a�c��=:�J10HM�d%��_�����g��Vm��9H��S�?�e�:��Q����t�t�m:m7�դ뫒�un���TvZN��	�G�"C����$�R<�ƐKI���*x�x��+��I/�:5�g���2��|�ߎ>�E�SVK�M./>1A�0c�t�����ʤ���(�h��8���Z1O��L:�*2��o���\�T�CRJ{��S����\מA۷j���}����wM�d�D'�H'#�QzpJ/���=��e`���.�8�+V��w�q���T��%�����5�?R��F".SO}Z�~)�Pګ��4|ӾU�=��|p~`�>VTT�R��T��T�=P��+�w"w�������G�g���.�DpB�G�L�W�i����C��@xM��>�N>x���}��׷t߷�V��t(=��u������ἧO�������@xe����s�G�/�JF��)��AY ���8��{����v����W�G���'`*1�B�2�a��}��w�����]D������҈�_�dv�h�+.7�N�c������8���뇝6�:��/�J�q���}��} �����|xu�s��@�D������x�B�G��W��<}�X�vO1z6�*d���m���n�p@�x�	ׇ�H";,�t돉������3�;��H����Z0V��v�ު��)$�X�Z`��Î����w/��4G����n:5��:nݴݽ�R�۷�n�պ�J��T#׉
իÕA&���0X �����xd2x::���L+���c� �b�*�s��!����"c� �#�`�oӻ�a��ed� �����FG
.��v�����3��rۯ������8PHHW+��#@P�E����j��������7��A��w1D�(��3߳J�(nݾ��{�M�L�իgm: �q�������^Nԉ�|'rD�d~a� A���0\�Q��#=�t�ӧM��[��on���6M[�&�eC�'T�<�?�i�4�J�������(����5�� E�}�핻;�[01wb�  ��Wt��(O�%L���Е>V���О�{��u�o��[҉$H�"@<���f� ��
W�҂������8)8����3S�j���jk\&�ikW�N�!�3���b�TD@%1yBoj럎f[�o2���!�����$��,���ca�9PU���;�P�o�B'��Ik<%S�f��[r�m��9�b>���8���5�kQV����~��q/��Q� 6����C믥uL2&���'M�Y�|��yǂ)��Wa?��M�gb��3PL숫���{��   ������Y��g���%�C��Z���Z�~K��A�UQ�;EGNҸ�*�իcƈG���c�������?��U�a��p^xN���2�^f�T�0UFm�k]���s��a�[��6{�1�C���&[��7��좄��AIW&ɘk[|��jħ,���	L��������շ�/�'�ֶ�둹=�(�_h�>i�&Wv��K�H�6���ƨR�d�t`�*��e�@+J�dH�*~�W��ou�q\���s�~��nL�[���	ْ?}��	��O,IbKn�S3�ƧV���c%�u�̢�B�gܢS`Y#w(+_{�WYزQ����}Py�����<��؋�5�]xv_kŠ{ vۚH���A�~����Rx(n��������kOW"kXӑσIښ���$�<G�<J'��ν����B��`��c�D�3����*t|˿� jH�����@�(0!���J��ϚB��@| @"͇<��I�����{��5У>��3����2N��86� �l���tn��D�J2�i�4�4%�m��I��Y~N���w��H��d�����"��w����bYʎ܎%Ex)J��@_A��@#ۙ�����<�� �聽�L�	+��Be��4u����i�+Q'�̿���� �}p��:�9��7\ׇ�O=���E4��3 �b�
q6��C���A�9�������`�uf���'��@>  �qq�1�5�U��ϒ?�d�w�C�	>�Jă��1g#C��ݴ3iphh׆��kL�l�/� y�*�����D#�I����-��c�d�Q���NS!�L���kb6�l���o������?�Ѻ����YFԏ��drȄ�Cb\�RK���C$��5�F|����y�N�0�_�ߡ��m`!�q�V=j�P��A3�o��&+��3�Q�A�&�r�YeU+����&�kܙ0� �  | �Gx�R���O�D��v!����������.�Vǯ�fH��E��G�K�ԍrsOk4���p�~}����s������3�z��w�O�ڹ�ƷޛH h���d`
H���l���^��%�Ζ)a��}�x�9�tI7�8ްn��������i��m�Mv��[{�um��0���B�~��|���`�3*�0#黻���?�}��H"zez�2ĬE���~y Z��jv�:
=�����t�ڮ%��a6P�H�\"�Xan���ƿ���MĜ ��pIW/	�қk0Ko���ـC�w<G@���?�Yt,��ѡ�jSLJ�[(S&��%T�%��ZϮu~�+��/�o�����%}]�T�&�a�~��/������d_:}�p߾�	��﫩�J�XZ��|�S�Δ�{^�4�k����'�i[{M�.�n��7���]�:O�V��S�/�V��AoaC~2=4��:r��ˡ��"�7\��5P��}
��7�{M�*���K2�D�$�MN��*T�Z�˩���K�[}¼7�ү��-o��J���T��'�[҉$H�"@	=�)�,����
�����Е8��"AYYt-4D˱�"�A�A"���-hF���'�D��
�?/G	�rRM��|[f0��Ԉ���d5ek�ʹ]�\%J.j�����w_�$�.5ԇ\� )p|$0	?���β�6T&�l�9��]r��}X�Bkˌ\0�Y���0���*�JgRI4J�ʵ-���\<��PW�t���W�p����D�	�u@�  ˳05
�l�Z~P:*��uH�(���$>5���	��,3�r
��l�=Ju�?q{��%$ ֋f� t�ߠI��R�Y���ۿIu�q��\�mЀ��B����BR���jB�y�G$	�^I��{���98a���2Dʇi��Z6�-l��'P7=�1�(����00dc     �WO01wb�  l'8;����_�OYrGJ�Y�jbA򏸴Z,7�%�ᛰ���ÙyD<X�z~g��]|�j&#[ �  .+�x-�CHp@!R}���UAJ��a���XM�e������-nX����2燆�&i�� �exZ���0xyY�Aw�N�[���#�m�Zʕ5�k�kn!�|g�b}�Wh� Ne�]���̃K��#���O˄��85��6٭w��L3w��� ��η�r�T�D���3t�7�c-���q�JĜ0$'��-ƾ�]��:��X($c���ʖ�7%Η�� Q8t�?V���ok�t�R't�2����h�A��I`�z|m�4�2�z%\��h,��Fۇ^��U��\t��p��j�uD���G������;/.�X���x������?γ���Xd1"��|�1���6������������j����`�Ӵ0��W��\���g��b�2&vJ�#��zW;7,U�i�I�m�	nSj���~>��+Eq�x�;)��~o������
U��ǁ�v`6��f�p�{��/��� �����  ��p�m��T��\[CD
�-+���Ն�	��<;`Ԃ�`s�N�ٛ������bM�cX�x���]q�ּ�Z���\������Ę��w=�Fk��JYr�5Ͳl�C�b���6�2�)4�Q7«��rJ�m�pm���	�>yM�,X��K�{~M��]G�[QA������3�"!���*�4r]�Mh���"�!�To���~?��F���\��<��>5в��7�3̣�  #pp�-�����'�/Z��+��l��x���� �����QG.�����o	�q���ⲅ��B�hi]L�l!?G��Ĺ���dԮ�̨�'�Uj��I�^L�w��W�����o�[�}��h �Y�I4t�$�7]���5�i,��+�0�Y��"L��^���Gu{cH���@}�`^@������Ij_S�!r�����X �)�ܑ�1����,$�Lx2�*��g���VzH��=u�{3�WW
����x��R&9�v�Ό��6چ���:��w��@���?�Yt,��Q��lOM	�W(����jNa?T���x~��C��S�ϩ��P�1�؃I����>|�:T�k֥J�'՟�J��nk�K�
��XJ���;:uI��;"�����:T���ԕ*����0�>��Z������8kO�Fw��*���gΓ%���4��>|��n��uJ�)З�T���<���8o�B���}o��T��*p�B}
(Ou;|���n��~��7ʔ�v��D�S��k���J�Z�Ϡ��;��j~���xS|�3�O��C
T�*s�/�oJ�J�*T� F�DM�g�/𻁸�������O@�}�C��·�=�ӯa�ԫl����lR�H�<���CPO��h������YD�L2�k�l��X$�&���q�K�W��b�Pj�kZw	�G!g(��3�1�R�E ��P�^����P!AD\}�*�[��R߷.�j�$Tm�ѭw"т�I��<��D�g�J��&�!�Vk�Ӎ��� �u��Y>)xc��~����-:R׃}��t�2��<���hŭ�!DQ�  �h���.ӱ���Pk�����(	$IO�BG���q�z���U����4⍌&�ٍt ص����υ�,���o`����&&m��_yv3_� `�~�fA\f��b8�.�,ʘ�@�j�kT�
?PZ����_�y��J�O��&�ؖ�Έt\^d��ڙD�Z6�͛�������+��M�-hgjw�\�����PI���,��Mˡҙu�s�mH�u:���Q�;��H wk�jb�d�@��r��Ds�R�  2�>2�3gҶb8��Z�-=���ʨo����2��%B@2$���aΦ����ֹ���y-��Ğ�#/���������*� ��6U�`��3Q�r�QR�+�fla##G6�Vk�Ŋ���5v���\���A���O/o��p�񂨺����:�A�q��׺ք���h��z����{}�H���A[�"��Iׇ��cv�Q���\3P��Ŗ��E׏�D���<��eXI':t�M��,��|  �����3�4�N��((���E1���������ē�
~'�$ux�$��)�T�0�,�Q����s�˚[���\��Q00dc�\    �Xp<ۙ�Au��ԾjIOA���do��C&��F�	#)��|�']��M���?O�im���{�zM��Ӓ���A���&����;�td�
'�O��Q,?�4���Cl����9�h�)��^v&9�#m�?Z�Y|�7&t�������&���t�3
Ϫ��m�O����P�b�!ç�|��v3�Y������&�i:+��o$t�4����&�};:��)��H����7������)���D��5�E	��ᮺv�� ���l�gq���{α�+pj#|S"�^���O�39n��}x!=.�ȵ6>i!'�uƷw�3� S�[��n6v,��7�}!�暜O��S�o9r��R��y�m}���o�Eߒ���K$N�_=?c�����<˂V�M����1��/�R�Y��5Hd�2�`�$O�U~�\U���~9�O�>S11���*߶� �Ѡ�?�^�~�]kP[�2#�`�P��T�j��Ŕ�`�@��J����B���J5�%���RI��8)�%� i�etz$��C|��鱴�
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
