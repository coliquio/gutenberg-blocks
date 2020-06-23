(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("wp"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "wp"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("React"), require("wp")) : factory(root["React"], root["wp"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_wp__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cta/index.js":
/*!**************************!*\
  !*** ./src/cta/index.js ***!
  \**************************/
/*! exports provided: name, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"name\", function() { return name; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wp */ \"wp\");\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wp__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ \"./src/cta/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst {\n  Fragment\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"element\"];\nconst {\n  __\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"i18n\"];\nconst {\n  PanelBody,\n  TextControl,\n  ToggleControl,\n  RadioControl\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"components\"];\nconst {\n  RichText,\n  InspectorControls\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"blockEditor\"];\nconst name = 'cta';\n\nfunction renderClassName(defaultClassName, attributes) {\n  let className = defaultClassName;\n\n  if (attributes.style != 'button') {\n    className = `${className} ${className}--${attributes.style}`;\n  }\n\n  return className;\n}\n\nconst settings = {\n  title: __('Call To Action Button'),\n  description: __('A CTA button that links to some content'),\n  icon: 'button',\n  attributes: {\n    text: {\n      type: 'string'\n    },\n    url: {\n      type: 'string'\n    },\n    targetNewWindow: {\n      type: 'boolean'\n    },\n    style: {\n      type: 'string'\n    }\n  },\n\n  edit({\n    attributes,\n    className,\n    setAttributes\n  }) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InspectorControls, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PanelBody, {\n      title: __('CTA settings')\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextControl, {\n      label: __('Link to Content'),\n      value: attributes.url || '/my-path',\n      onChange: val => setAttributes({\n        url: val\n      })\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RadioControl, {\n      label: \"Display Style\",\n      selected: attributes.style || 'button',\n      options: [{\n        label: 'Button',\n        value: 'button'\n      }, {\n        label: 'Link',\n        value: 'link'\n      }],\n      onChange: option => setAttributes({\n        style: option\n      })\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ToggleControl, {\n      label: __('Open hyperlink in new tab?'),\n      onChange: () => setAttributes({\n        targetNewWindow: !attributes.targetNewWindow\n      }),\n      checked: attributes.targetNewWindow\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RichText, {\n      className: renderClassName(className, attributes),\n      tagName: \"a\",\n      value: attributes.text,\n      placeholder: __('Button Text'),\n      target: attributes.targetNewWindow ? '_blank' : '_self',\n      onChange: value => setAttributes({\n        text: value\n      })\n    }));\n  },\n\n  save({\n    attributes,\n    className\n  }) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RichText.Content, {\n      tagName: \"a\",\n      className: renderClassName(className, attributes),\n      href: attributes.url,\n      value: attributes.text,\n      target: attributes.targetNewWindow ? '_blank' : '_self',\n      rel: \"noreferrer noopener\"\n    });\n  }\n\n};\n\n//# sourceURL=webpack:///./src/cta/index.js?");

/***/ }),

/***/ "./src/cta/style.scss":
/*!****************************!*\
  !*** ./src/cta/style.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/cta/style.scss?");

/***/ }),

/***/ "./src/highlight/index.js":
/*!********************************!*\
  !*** ./src/highlight/index.js ***!
  \********************************/
/*! exports provided: name, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"name\", function() { return name; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wp */ \"wp\");\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wp__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ \"./src/highlight/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst {\n  __\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"i18n\"];\nconst {\n  TextControl,\n  PanelBody,\n  SelectControl\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"components\"];\nconst {\n  InspectorControls,\n  InnerBlocks\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"blockEditor\"];\nconst name = 'highlight';\n/**\n * Visual variants for this highlight box\n */\n\nconst styleType = {\n  GREY_BOX: 'grey-box',\n  BLUE_BORDER: 'blue-border'\n};\nconst settings = {\n  title: __('Highlight'),\n  description: __('Visual wrapper with different styles'),\n  icon: 'cover-image',\n  attributes: {\n    title: {\n      type: 'string'\n    },\n    style: {\n      type: 'string',\n      default: styleType.BLUE_BORDER\n    }\n  },\n\n  edit({\n    attributes,\n    className,\n    setAttributes\n  }) {\n    const {\n      title,\n      style\n    } = attributes;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InspectorControls, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PanelBody, {\n      title: __('Highlight settings')\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextControl, {\n      label: __('Box Title'),\n      value: title || '',\n      onChange: title => setAttributes({\n        title\n      })\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectControl, {\n      label: __('Visual Appearance'),\n      value: style,\n      options: [{\n        label: __('Thick Blue Border'),\n        value: styleType.BLUE_BORDER\n      }, {\n        label: __('Soft Grey Box'),\n        value: styleType.GREY_BOX\n      }],\n      onChange: style => setAttributes({\n        style\n      })\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n      className: `${className} ${style}`\n    }, title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"title\"\n    }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"content\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InnerBlocks, null))));\n  },\n\n  save({\n    attributes\n  }) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n      className: attributes.style\n    }, attributes.title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"title\"\n    }, attributes.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"content\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InnerBlocks.Content, null)));\n  }\n\n};\n\n//# sourceURL=webpack:///./src/highlight/index.js?");

/***/ }),

/***/ "./src/highlight/style.scss":
/*!**********************************!*\
  !*** ./src/highlight/style.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/highlight/style.scss?");

/***/ }),

/***/ "./src/iframe/index.js":
/*!*****************************!*\
  !*** ./src/iframe/index.js ***!
  \*****************************/
/*! exports provided: name, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"name\", function() { return name; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wp */ \"wp\");\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wp__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ \"./src/iframe/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst {\n  __\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"i18n\"];\nconst {\n  TextControl,\n  PanelBody,\n  SelectControl\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"components\"];\nconst {\n  InspectorControls\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"blockEditor\"];\nconst name = 'iframe';\nconst heightOptions = {\n  SMALL: 300,\n  MEDIUM: 475,\n  LARGE: 650,\n  DYNAMIC: 0\n};\nconst typeOptions = {\n  IFRAME: 'iframe',\n  IFRAME_VIDEO: 'iframe-video',\n  IFRAME_SURVEY: 'iframe-survey'\n};\nconst settings = {\n  title: __('iFrame'),\n  description: __('Display external content'),\n  icon: 'cover-image',\n  attributes: {\n    type: {\n      type: 'string',\n      default: typeOptions.IFRAME\n    },\n    src: {\n      type: 'string'\n    },\n    srcAttr: {\n      type: 'string'\n    },\n    height: {\n      type: 'number',\n      default: heightOptions.SMALL\n    }\n  },\n\n  edit({\n    attributes,\n    className,\n    setAttributes\n  }) {\n    const {\n      src,\n      height,\n      type\n    } = attributes;\n    const heightOptionsUi = Object.keys(heightOptions).map(item => ({\n      label: `${item} ${heightOptions[item] !== 0 ? `(${heightOptions[item]}px)` : ''}`,\n      value: heightOptions[item]\n    }));\n    const typeOptionsUI = Object.keys(typeOptions).map(item => ({\n      label: item,\n      value: typeOptions[item]\n    }));\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InspectorControls, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PanelBody, {\n      title: __('iFrame settings')\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectControl, {\n      label: __('Type of iFrame (changes styling)'),\n      value: type,\n      options: typeOptionsUI,\n      onChange: type => setAttributes({\n        type\n      })\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextControl, {\n      label: __('Source URL'),\n      value: src,\n      onChange: src => setAttributes({\n        src,\n        srcAttr: src\n      })\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SelectControl, {\n      label: __('Visual Height'),\n      value: height,\n      options: heightOptionsUi,\n      onChange: height => setAttributes({\n        height\n      })\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"iFrame\", {\n      frameborder: 0,\n      className: `${className} ${type}`,\n      src: src,\n      height: height\n    }));\n  },\n\n  save({\n    attributes: {\n      src,\n      height,\n      type\n    }\n  }) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"iFrame\", {\n      className: type,\n      frameborder: 0,\n      src: src,\n      height: height,\n      allowfullscreen: true\n    });\n  }\n\n};\n\n//# sourceURL=webpack:///./src/iframe/index.js?");

/***/ }),

/***/ "./src/iframe/style.scss":
/*!*******************************!*\
  !*** ./src/iframe/style.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/iframe/style.scss?");

/***/ }),

/***/ "./src/image/index.js":
/*!****************************!*\
  !*** ./src/image/index.js ***!
  \****************************/
/*! exports provided: name, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"name\", function() { return name; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wp */ \"wp\");\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wp__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ \"./src/image/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst {\n  __\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"i18n\"];\nconst {\n  Toolbar,\n  IconButton,\n  TextControl,\n  PanelBody\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"components\"];\nconst {\n  RichText,\n  BlockControls,\n  MediaUpload,\n  MediaPlaceholder,\n  InspectorControls\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"blockEditor\"];\nconst name = 'image';\nconst settings = {\n  title: __('coliquio Image'),\n  description: __('Single image'),\n  icon: 'cover-image',\n  attributes: {\n    src: {\n      type: 'string'\n    },\n    alt: {\n      type: 'string'\n    },\n    caption: {\n      type: 'string'\n    },\n    copyright: {\n      type: 'string'\n    }\n  },\n\n  edit({\n    attributes,\n    className,\n    setAttributes,\n    isSelected\n  }) {\n    const onSelectImage = media => {\n      setAttributes({\n        src: media.url,\n        alt: media && media.alt,\n        caption: media && media.caption\n      });\n    };\n\n    const {\n      src = '',\n      alt,\n      caption,\n      copyright,\n      id\n    } = attributes;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InspectorControls, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PanelBody, {\n      title: __('Image settings')\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextControl, {\n      label: __('Alt Tag'),\n      value: alt,\n      onChange: alt => setAttributes({\n        alt\n      })\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextControl, {\n      label: __('Copyright'),\n      value: copyright,\n      onChange: copyright => setAttributes({\n        copyright\n      })\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"figure\", {\n      className: className\n    }, src && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: src,\n      alt: alt,\n      width: \"300\"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RichText, {\n      tagName: \"figcaption\",\n      value: caption,\n      placeholder: __('Put image caption here...'),\n      onChange: caption => setAttributes({\n        caption\n      })\n    }), copyright && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"copyright\"\n    }, copyright)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MediaPlaceholder, {\n      className: className,\n      disableMediaButtons: src && !isSelected,\n      icon: !src && 'dashicons-images-alt',\n      labels: {\n        title: !src && __('Image'),\n        instructions: src ? __('Replace image') : __('Please select image')\n      },\n      onSelect: onSelectImage,\n      accept: \"image/*\",\n      allowedTypes: ['image'],\n      value: {\n        id\n      },\n      onError: alert\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(BlockControls, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Toolbar, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MediaUpload, {\n      allowedTypes: ['image'],\n      onSelect: (...args) => onSelectImage(...args),\n      render: ({\n        open\n      }) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(IconButton, {\n        className: \"components-toolbar__control\",\n        label: __('Edit image'),\n        icon: \"edit\",\n        onClick: open\n      })\n    }))));\n  },\n\n  save({\n    attributes,\n    className\n  }) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"figure\", {\n      className: className\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: attributes.src,\n      alt: attributes.alt\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RichText.Content, {\n      tagName: \"figcaption\",\n      value: attributes.caption\n    }), attributes.copyright && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"copyright\"\n    }, attributes.copyright));\n  }\n\n};\n\n//# sourceURL=webpack:///./src/image/index.js?");

/***/ }),

/***/ "./src/image/style.scss":
/*!******************************!*\
  !*** ./src/image/style.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/image/style.scss?");

/***/ }),

/***/ "./src/image_gallery/index.js":
/*!************************************!*\
  !*** ./src/image_gallery/index.js ***!
  \************************************/
/*! exports provided: name, settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"name\", function() { return name; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"settings\", function() { return settings; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wp */ \"wp\");\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wp__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ \"./src/image_gallery/style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst {\n  __\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"i18n\"];\nconst {\n  PanelBody,\n  TextControl\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"components\"];\nconst {\n  RichText,\n  MediaPlaceholder,\n  InspectorControls\n} = wp__WEBPACK_IMPORTED_MODULE_1__[\"blockEditor\"];\nconst name = 'image-gallery';\nconst settings = {\n  title: __('Image Gallery'),\n  description: __('Simple image gallery that opens as an overlay'),\n  icon: 'format-gallery',\n  attributes: {\n    images: {\n      type: 'array'\n    },\n    galleryTitle: {\n      type: 'string'\n    }\n  },\n\n  edit({\n    attributes,\n    className,\n    setAttributes,\n    isSelected\n  }) {\n    // For debugging purpose within Drupal, please keep\n    console.log(attributes.images);\n    const hasImages = attributes.images && !!attributes.images.length;\n\n    const onSelectImages = images => setAttributes({\n      images\n    });\n\n    const onChangeCaption = (newCaption, id) => {\n      const {\n        images\n      } = attributes;\n      images.filter(img => img.id === id).forEach(img => img.caption = newCaption);\n      return setAttributes({\n        images\n      });\n    };\n\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InspectorControls, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PanelBody, {\n      title: __('Gallery settings')\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TextControl, {\n      label: __('Title of gallery'),\n      value: attributes.galleryTitle,\n      onChange: val => setAttributes({\n        galleryTitle: val\n      })\n    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: className\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"image-gallery-edit-container \"\n    }, !hasImages && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"strong\", null, __('No images selected yet')), hasImages && attributes.images.map(img => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"figure\", {\n      key: img.id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      className: \"\",\n      width: \"90\",\n      src: img.url,\n      alt: img.alt\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RichText, {\n      tagName: \"figcaption\",\n      placeholder: __('Caption'),\n      value: img.caption,\n      inlineToolbar: true,\n      onChange: caption => onChangeCaption(caption, img.id)\n    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MediaPlaceholder, {\n      addToGallery: hasImages,\n      isAppender: hasImages,\n      className: className,\n      disableMediaButtons: hasImages && !isSelected,\n      icon: !hasImages && 'dashicons-images-alt',\n      labels: {\n        title: !hasImages && __('Image Gallery'),\n        instructions: !hasImages && __('Please select images')\n      },\n      onSelect: onSelectImages,\n      accept: \"image/*\",\n      allowedTypes: ['image'],\n      value: attributes.images,\n      onError: alert,\n      multiple: true\n    })));\n  },\n\n  save({\n    attributes,\n    className\n  }) {\n    const len = attributes.images.length;\n    const prevImg = attributes.images[0];\n    const style = {\n      backgroundImage: `url('${prevImg.url}')`\n    };\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: className\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      className: \"btn btn-open-gallery\",\n      style: style\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"txt-container\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"left\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"heading\"\n    }, \"Bildergalerie\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"gallery-title\"\n    }, attributes.galleryTitle || 'Galerietitel')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"amount\"\n    }, len, \" Bilder\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"image-gallery-overlay\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      className: \"header\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      className: \"btn btn-close-gallery\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"svg\", {\n      className: \"arrow-icon\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"path\", {\n      d: \"M12,8l-6,6l1.41,1.41L12,10.83l4.59,4.58L18,14L12,8z\"\n    })), \"Zur\\xFCck zum Beitrag\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n      className: \"amount\"\n    }, len, \" Bilder\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h2\", null, attributes.galleryTitle || 'Galerietitel'), len > 0 && attributes.images.map((img, inx) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"figure\", {\n      key: img.id\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: img.url,\n      alt: img.alt\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"figcaption\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"count\"\n    }, `${(inx + 1).toString()}/${len}`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n      className: \"desc\",\n      dangerouslySetInnerHTML: {\n        __html: img.caption\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n      className: \"copyright\"\n    }, img.copyright)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n      className: \"btn btn-close-gallery bottom\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n      className: \"close-icon\"\n    }, \"X\"), \"Schliessen\"))));\n  }\n\n};\n\n//# sourceURL=webpack:///./src/image_gallery/index.js?");

/***/ }),

/***/ "./src/image_gallery/style.scss":
/*!**************************************!*\
  !*** ./src/image_gallery/style.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/image_gallery/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: registerBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"registerBlocks\", function() { return registerBlocks; });\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wp */ \"wp\");\n/* harmony import */ var wp__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wp__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image */ \"./src/image/index.js\");\n/* harmony import */ var _cta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cta */ \"./src/cta/index.js\");\n/* harmony import */ var _image_gallery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./image_gallery */ \"./src/image_gallery/index.js\");\n/* harmony import */ var _highlight__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./highlight */ \"./src/highlight/index.js\");\n/* harmony import */ var _iframe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./iframe */ \"./src/iframe/index.js\");\n\n\n\n\n\n\nconst {\n  registerBlockType\n} = wp__WEBPACK_IMPORTED_MODULE_0__[\"blocks\"];\nconst {\n  dispatch,\n  select\n} = wp__WEBPACK_IMPORTED_MODULE_0__[\"data\"];\nconst {\n  __\n} = wp__WEBPACK_IMPORTED_MODULE_0__[\"i18n\"];\nconst colBlocks = [_image__WEBPACK_IMPORTED_MODULE_1__, _cta__WEBPACK_IMPORTED_MODULE_2__, _image_gallery__WEBPACK_IMPORTED_MODULE_3__, _highlight__WEBPACK_IMPORTED_MODULE_4__, _iframe__WEBPACK_IMPORTED_MODULE_5__]; // Category name and slug\n\nconst category = {\n  slug: 'coliquio',\n  // needs to match the css class of the block container: \".wp-block-coliquio-[block-name]\"\n  title: __('coliquio Blocks')\n}; // Register the new category and blocks\n\nfunction registerBlocks() {\n  const currentCategories = select('core/blocks').getCategories().filter(item => item.slug !== category.slug);\n  dispatch('core/blocks').setCategories([category, ...currentCategories]);\n  colBlocks.forEach(block => {\n    registerBlockType(`${category.slug}/${block.name}`, {\n      category: category.slug,\n      ...block.settings\n    });\n  });\n}\nregisterBlocks();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ "wp":
/*!*********************!*\
  !*** external "wp" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_wp__;\n\n//# sourceURL=webpack:///external_%22wp%22?");

/***/ })

/******/ });
});