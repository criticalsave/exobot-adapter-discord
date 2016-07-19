require("source-map-support").install();
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("@exoplay/exobot"),require("discord.js")):"function"==typeof define&&define.amd?define(["@exoplay/exobot","discord.js"],t):"object"==typeof exports?exports["discord.js"]=t(require("@exoplay/exobot"),require("discord.js")):e["discord.js"]=t(e["@exoplay/exobot"],e["discord.js"])}(this,function(e,t){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,t,n){Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t){e.exports=require("@exoplay/exobot")},function(e,t){e.exports=require("discord.js")},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(1),s=c&&c.__esModule?function(){return c["default"]}:function(){return c};n.d(s,"a",s);var a=n(0),u=a&&a.__esModule?function(){return a["default"]}:function(){return a};n.d(u,"a",u),n.d(t,"EVENTS",function(){return f}),n.d(t,"DISCORD_MENTION_REGEX",function(){return p});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),d=function h(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0===o){var r=Object.getPrototypeOf(e);return null===r?void 0:h(r,t,n)}if("value"in o)return o.value;var i=o.get;if(void 0!==i)return i.call(n)},f={ready:"discordReady",message:"discordMessage",disconnected:"discordDisconnected"},p=/<@!(\d+)>/i,y=function(e){function t(e){var n=e.token,i=e.botId,c=e.username;o(this,t);var s=r(this,Object.getPrototypeOf(t).apply(this,arguments));return s.channels={},s.discordReady=function(){s.status=a.Adapter.STATUS.CONNECTED,s.bot.emitter.emit("connected",s.id),s.bot.log.notice("Connected to Discord."),s.client.setPlayingGame("Exobotting")},s.discordDisconnected=function(){s.status=a.Adapter.STATUS.DISCONNECTED,s.bot.log.critical("Disconnected from Discord.")},s.botId=i,s.username=c,s.token=n,s}return i(t,e),l(t,[{key:"register",value:function(e){var n=this;d(Object.getPrototypeOf(t.prototype),"register",this).apply(this,arguments);var o=this.token,r=this.botId,i=this.username;return o&&r&&i?(this.client=new s.a.Client({autoReconnect:!0}),Object.keys(f).forEach(function(e){var t=n[f[e]];n.client.on(e,function(){return t.bind(n).apply(void 0,arguments)}),n.client.on(e,function(){for(var t,o=arguments.length,r=Array(o),i=0;i<o;i++)r[i]=arguments[i];(t=n.bot.emitter).emit.apply(t,["discord-"+e].concat(r))})}),void this.client.loginWithToken(o)):(this.status=a.Adapter.STATUS.ERROR,void e.log.error("token, botId, and username are required to connect to discord."))}},{key:"send",value:function(e){this.bot.log.debug("Sending "+e.text+" to "+e.channel),this.client.stopTyping(channel),this.client.sendMessage(e.channel,e.text)}},{key:"discordMessage",value:function(e){var n=e.channel,o=(e.server,e.author),r=e.cleanContent;if(o.username!==this.username){this.client.startTyping(n);var i=new a.User(o.username,o.id);return n instanceof s.a.TextChannel?d(Object.getPrototypeOf(t.prototype),"receiveWhisper",this).call(this,{user:i,text:message,channel:n}):void this.receive({user:i,text:r,channel:n})}}},{key:"discordPresence",value:function(e,n,o,r,i){if(n!==this.botId){var c=new a.User(e,n);if("online"===o)return d(Object.getPrototypeOf(t.prototype),"enter",this).call(this,{user:c,channel:i.d.channel_id});if("offline"===o)return d(Object.getPrototypeOf(t.prototype),"leave",this).call(this,{user:c,channel:i.d.channel_id})}}}]),t}(a.Adapter);t["default"]=y}])});
//# sourceMappingURL=discord.js.map