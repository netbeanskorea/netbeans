<%@ page pageEncoding="utf-8"%>
<script src="<%=hostIp %>/lib/ext/Highcharts-3.0.2/js/highcharts.src.js" charset="utf-8"></script>
<script>

$.fn['Build'] = $.fn['Build']._super;

void 0!==window.Highcharts&&star.ui.component({name:"ExtHighcharts",constructor:function(a){return this.ExtHighchartsBuild(a)},methods_check:function(){return this.children().hasClass("highcharts-container")},methods:{ExtHighchartsChart:function(a){return this.ExtHighchartsBuild(a)},Build:function(a){this.children().hasClass("highcharts-container")&&(this.data("star-chart").destroy(),a=$.extend(!0,{},this.data("star-option"),a));void 0===a.chart&&(a.chart={});void 0===a.chart.renderTo&&(a.chart.renderTo=
this.attr("id"));void 0===a.title&&(a.title={});void 0===a.title.text&&(a.title.text="");void 0===a.xAxis&&(a.xAxis={});void 0===a.xAxis.title&&(a.xAxis.title={});void 0===a.xAxis.title.text&&(a.xAxis.title.text="");void 0===a.yAxis&&(a.yAxis={});void 0===a.yAxis.title&&(a.yAxis.title={});void 0===a.yAxis.title.text&&(a.yAxis.title.text="");a.credits={enabled:!1};return this.data("star-chart",new Highcharts.Chart(a)).data("star-option",a)}}});

star.define('Build', function(option) {
	if (!this.hasClass('EDU-grid'))
		return star.callSuper(this, arguments);

	//option.rebuild = true;

	option = $.extend({}, this.data('EDU-option'), option);

	var grid = $('<table/>').attr('id', this.attr('id'));

	this.closest('.ui-jqgrid').after(grid);
	this.jqGrid('GridDestroy');

	return $.fn.Grid.apply(grid, [ option ]);
});

if(window.Highcharts!==undefined) {
	// Highcharts 확장 화살표 표시 - 사용시 차트 그릴떄 조금 느림
	// data: [ 30, {y: 50, marker: {symbol: 'arrow'}}, {y: 100, marker: {symbol: 'arrow', radius:8}} ]
	// data: [ 40, 10, {y: 20, marker: {symbol: 'arrow'}} ]
	(function (Highcharts){
	       Highcharts.Renderer.prototype.symbols.arrow = function(x,y,w,h,options){
	           var angle;
	           angle = options.angle; // angle for arrow
	           w = w/1.2;
	           x = x + h/2 - 2*w*Math.sin(angle);
	           y = y + h/2 - 2*w*Math.cos(angle);
	           h = w * 2;
	           return ['M',x,y,
	                   'L',x + w*Math.cos(angle),y - w*Math.sin(angle),
	                   x + h*Math.sin(angle),y + h*Math.cos(angle),
	                   x - w*Math.cos(angle),y + w*Math.sin(angle),
	                   'Z'];
	
	       };
	       Highcharts.Series.prototype.drawPoints = function(){
	           // re-define Highcharts globals
	           var UNDEFINED,
	               NORMAL_STATE = '',
	               SELECT_STATE = 'select';
	           var series = this,
	               pointAttr,
	               points = series.points,
	               chart = series.chart,
	               plotX,
	               plotY,
	               i,
	               l,
	               point,
	               radius,
	               symbol,
	               isImage,
	               theta,
	               lastPoint,
	               thisPoint,
	               graphic;
	           if (series.options.marker.enabled) {
	               i = points.length;
	               l = i;
	               while (i--) {
	                   point = points[i];
	                   plotX = point.plotX;
	                   plotY = point.plotY;
	                   graphic = point.graphic;
	                   // only draw the point if y is defined
	                   if (plotY !== UNDEFINED && !isNaN(plotY)){
	                       if (i>0){ // orient the arrow in the forward direction
	                           lastPoint = points[i-1];
	                           thisPoint = points[i];
	                           theta = Math.atan( (plotX - lastPoint.plotX) / (plotY - lastPoint.plotY) );
	                           if (theta <= 0 && thisPoint.plotY < lastPoint.plotY){ // adjust if angle is negative even though series is moving up
	                               theta = theta + Math.PI;
	                           }
	                       }
	                       else if (l>1){ // orient the arrow in the backwards direction
	                           lastPoint = points[i];
	                           thisPoint = points[i+1];
	                           theta = Math.atan( (thisPoint.plotX - lastPoint.plotX) / (thisPoint.plotY - lastPoint.plotY) );
	                       }
	                       else{ // orient the arrow upwards
	                           lastPoint = points[i];
	                           thisPoint = points[i];
	                           theta = 0;
	                       }
	                       pointAttr = point.pointAttr[point.selected ? SELECT_STATE : NORMAL_STATE];
	                       radius = pointAttr.r;
	                       symbol = Highcharts.pick(point.marker && point.marker.symbol, series.symbol);
	                       isImage = symbol.indexOf('url') === 0;
	                       if (graphic && !(symbol === 'arrow')) { // update by translation. arrows must be re-rendered for angle
	                           graphic.animate({x: plotX - radius,y: plotY - radius,width: 2 * radius,height: 2 * radius});
	                       } else if (radius > 0 || isImage) {
	                           if(point.graphicElement){ // destroy the old marker
	                               point.graphicElement.destroy();
	                           }
	                           point.graphicElement = chart.renderer.symbol(
	                                   symbol,
	                                   plotX - radius,
	                                   plotY - radius,
	                                   2 * radius,
	                                   2 * radius,
	                                   {angle: theta}).attr(pointAttr);
	                           point.graphic = point.graphicElement.add(series.group);
	                       }
	                   }
	               }
	           }
	       };
	})(Highcharts);
}
</script>
