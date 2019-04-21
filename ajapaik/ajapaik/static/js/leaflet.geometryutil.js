!function(t){var e;if("function"==typeof define&&define.amd)define(["leaflet"],t);else if("undefined"!=typeof module)e=require("leaflet"),module.exports=t(e);else{if(void 0===window.L)throw"Leaflet must be loaded first";t(window.L)}}(function(h){"use strict";return h.Polyline._flat=h.LineUtil.isFlat||h.Polyline._flat||function(t){return!h.Util.isArray(t[0])||"object"!=typeof t[0][0]&&void 0!==t[0][0]},h.GeometryUtil=h.extend(h.GeometryUtil||{},{distance:function(t,e,n){return t.latLngToLayerPoint(e).distanceTo(t.latLngToLayerPoint(n))},distanceSegment:function(t,e,n,r){var a=t.latLngToLayerPoint(e),i=t.latLngToLayerPoint(n),o=t.latLngToLayerPoint(r);return h.LineUtil.pointToSegmentDistance(a,i,o)},readableDistance:function(t,e){return"imperial"!==e?1e3<t?(t/1e3).toFixed(2)+" km":Math.ceil(t)+" m":1760<(t*=1.09361)?(t/1760).toFixed(2)+" miles":Math.ceil(t)+" yd"},belongsSegment:function(t,e,n,r){r=void 0===r?.2:r;var a=e.distanceTo(n);return(e.distanceTo(t)+t.distanceTo(n)-a)/a<r},length:function(t){var e=h.GeometryUtil.accumulatedLengths(t);return 0<e.length?e[e.length-1]:0},accumulatedLengths:function(t){if("function"==typeof t.getLatLngs&&(t=t.getLatLngs()),0===t.length)return[];for(var e=0,n=[0],r=0,a=t.length-1;r<a;r++)e+=t[r].distanceTo(t[r+1]),n.push(e);return n},closestOnSegment:function(t,e,n,r){var a=t.getMaxZoom();a===1/0&&(a=t.getZoom());var i=t.project(e,a),o=t.project(n,a),l=t.project(r,a),s=h.LineUtil.closestPointOnSegment(i,o,l);return t.unproject(s,a)},closest:function(t,e,n,r){var a,i,o,l,s,c=1/0,u=null;if(e instanceof Array){if(e[0]instanceof Array&&"number"!=typeof e[0][0]){for(i=0;i<e.length;i++)(s=h.GeometryUtil.closest(t,e[i],n,r)).distance<c&&(c=s.distance,u=s);return u}if(!(e[0]instanceof h.LatLng||"number"==typeof e[0][0]||"number"==typeof e[0].lat))return u;e=h.polyline(e)}if(!(e instanceof h.Polyline))return u;if(a=JSON.parse(JSON.stringify(e.getLatLngs().slice(0))),e instanceof h.Polygon){var g=function(t){if(h.Polyline._flat(t))t.push(t[0]);else for(var e=0;e<t.length;e++)g(t[e])};g(a)}if(h.Polyline._flat(a)){if(r){for(i=0,o=a.length;i<o;i++){var f=a[i];(l=h.GeometryUtil.distance(t,n,f))<c&&(c=l,(u=f).distance=l)}return u}for(i=0,o=a.length;i<o-1;i++){var y=a[i],L=a[i+1];(l=h.GeometryUtil.distanceSegment(t,n,y,L))<=c&&(c=l,(u=h.GeometryUtil.closestOnSegment(t,n,y,L)).distance=l)}return u}for(i=0;i<a.length;i++)(s=h.GeometryUtil.closest(t,a[i],n,r)).distance<c&&(c=s.distance,u=s);return u},closestLayer:function(t,e,n){for(var r=1/0,a=null,i=null,o=1/0,l=0,s=e.length;l<s;l++){var c=e[l];if(c instanceof h.LayerGroup){var u=h.GeometryUtil.closestLayer(t,c.getLayers(),n);u.distance<r&&(r=u.distance,a=u)}else"function"==typeof c.getLatLng?(i=c.getLatLng(),o=h.GeometryUtil.distance(t,n,i)):(i=h.GeometryUtil.closest(t,c,n))&&(o=i.distance),o<r&&(a={layer:c,latlng:i,distance:r=o})}return a},nClosestLayers:function(t,e,n,r){if((r="number"==typeof r?r:e.length)<1||e.length<1)return null;for(var a,i,o=[],l=0,s=e.length;l<s;l++){var c=e[l];if(c instanceof h.LayerGroup){var u=h.GeometryUtil.closestLayer(t,c.getLayers(),n);o.push(u)}else"function"==typeof c.getLatLng?(i=c.getLatLng(),a=h.GeometryUtil.distance(t,n,i)):(i=h.GeometryUtil.closest(t,c,n))&&(a=i.distance),o.push({layer:c,latlng:i,distance:a})}return o.sort(function(t,e){return t.distance-e.distance}),o.length>r?o.slice(0,r):o},layersWithin:function(t,e,n,r){r="number"==typeof r?r:1/0;for(var a=[],i=null,o=0,l=0,s=e.length;l<s;l++){var c=e[l];"function"==typeof c.getLatLng?(i=c.getLatLng(),o=h.GeometryUtil.distance(t,n,i)):(i=h.GeometryUtil.closest(t,c,n))&&(o=i.distance),i&&o<r&&a.push({layer:c,latlng:i,distance:o})}return a.sort(function(t,e){return t.distance-e.distance})},closestLayerSnap:function(t,e,n,r,a){r="number"==typeof r?r:1/0,a="boolean"!=typeof a||a;var i=h.GeometryUtil.closestLayer(t,e,n);if(!i||i.distance>r)return null;if(a&&"function"==typeof i.layer.getLatLngs){var o=h.GeometryUtil.closest(t,i.layer,i.latlng,!0);o.distance<r&&(i.latlng=o,i.distance=h.GeometryUtil.distance(t,o,n))}return i},interpolateOnPointSegment:function(t,e,n){return h.point(t.x*(1-n)+n*e.x,t.y*(1-n)+n*e.y)},interpolateOnLine:function(t,e,n){var r=(e=e instanceof h.Polyline?e.getLatLngs():e).length;if(r<2)return null;if(0===(n=Math.max(Math.min(n,1),0)))return{latLng:e[0]instanceof h.LatLng?e[0]:h.latLng(e[0]),predecessor:-1};if(1==n)return{latLng:e[e.length-1]instanceof h.LatLng?e[e.length-1]:h.latLng(e[e.length-1]),predecessor:e.length-2};var a=t.getMaxZoom();a===1/0&&(a=t.getZoom());for(var i=[],o=0,l=0;l<r;l++)i[l]=t.project(e[l],a),0<l&&(o+=i[l-1].distanceTo(i[l]));var s=o*n,c=0,u=0;for(l=0;u<s;l++){var g=i[l],f=i[l+1];c=u,u+=g.distanceTo(f)}if(null==g&&null==f)g=i[0],f=i[1],l=1;var y=u-c!=0?(s-c)/(u-c):0,L=h.GeometryUtil.interpolateOnPointSegment(g,f,y);return{latLng:t.unproject(L,a),predecessor:l-1}},locateOnLine:function(t,e,n){var r=e.getLatLngs();if(n.equals(r[0]))return 0;if(n.equals(r[r.length-1]))return 1;for(var a=h.GeometryUtil.closest(t,e,n,!1),i=h.GeometryUtil.accumulatedLengths(r),o=i[i.length-1],l=0,s=!1,c=0,u=r.length-1;c<u;c++){var g=r[c],f=r[c+1];if(l=i[c],h.GeometryUtil.belongsSegment(a,g,f)){l+=g.distanceTo(a),s=!0;break}}if(!s)throw"Could not interpolate "+n.toString()+" within "+e.toString();return l/o},reverse:function(t){return h.polyline(t.getLatLngs().slice(0).reverse())},extract:function(t,e,n,r){if(r<n)return h.GeometryUtil.extract(t,h.GeometryUtil.reverse(e),1-n,1-r);n=Math.max(Math.min(n,1),0),r=Math.max(Math.min(r,1),0);var a=e.getLatLngs(),i=h.GeometryUtil.interpolateOnLine(t,e,n),o=h.GeometryUtil.interpolateOnLine(t,e,r);if(n==r)return[h.GeometryUtil.interpolateOnLine(t,e,r).latLng];-1==i.predecessor&&(i.predecessor=0),-1==o.predecessor&&(o.predecessor=0);var l=a.slice(i.predecessor+1,o.predecessor+1);return l.unshift(i.latLng),l.push(o.latLng),l},isBefore:function(t,e){if(!e)return!1;var n=t.getLatLngs(),r=e.getLatLngs();return n[n.length-1].equals(r[0])},isAfter:function(t,e){if(!e)return!1;var n=t.getLatLngs(),r=e.getLatLngs();return n[0].equals(r[r.length-1])},startsAtExtremity:function(t,e){if(!e)return!1;var n=t.getLatLngs(),r=e.getLatLngs(),a=n[0];return a.equals(r[0])||a.equals(r[r.length-1])},computeAngle:function(t,e){return 180*Math.atan2(e.y-t.y,e.x-t.x)/Math.PI},computeSlope:function(t,e){var n=(e.y-t.y)/(e.x-t.x);return{a:n,b:t.y-n*t.x}},rotatePoint:function(t,e,n,r){var a=t.getMaxZoom();a===1/0&&(a=t.getZoom());var i=n*Math.PI/180,o=t.project(e,a),l=t.project(r,a),s=Math.cos(i)*(o.x-l.x)-Math.sin(i)*(o.y-l.y)+l.x,c=Math.sin(i)*(o.x-l.x)+Math.cos(i)*(o.y-l.y)+l.y;return t.unproject(new h.Point(s,c),a)},bearing:function(t,e){var n=Math.PI/180,r=t.lat*n,a=e.lat*n,i=t.lng*n,o=e.lng*n,l=Math.sin(o-i)*Math.cos(a),s=Math.cos(r)*Math.sin(a)-Math.sin(r)*Math.cos(a)*Math.cos(o-i),c=(180*Math.atan2(l,s)/Math.PI+360)%360;return 180<=c?c-360:c},destination:function(t,e,n){e=(e+360)%360;var r=Math.PI/180,a=180/Math.PI,i=t.lng*r,o=t.lat*r,l=e*r,s=Math.sin(o),c=Math.cos(o),u=Math.cos(n/6378137),g=Math.sin(n/6378137),f=Math.asin(s*u+c*g*Math.cos(l)),y=i+Math.atan2(Math.sin(l)*g*c,u-s*Math.sin(f));return y=180<(y*=a)?y-360:y<-180?y+360:y,h.latLng([f*a,y])},angle:function(t,e,n){var r=t.latLngToContainerPoint(e),a=t.latLngToContainerPoint(n),i=180*Math.atan2(a.y-r.y,a.x-r.x)/Math.PI+90;return i+=i<0?360:0},destinationOnSegment:function(t,e,n,r){var a=h.GeometryUtil.angle(t,e,n),i=h.GeometryUtil.destination(e,a,r);return h.GeometryUtil.closestOnSegment(t,i,e,n)}}),h.GeometryUtil});