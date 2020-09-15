$(document).ready(function(){
	var data_ajax = '';
	// Ajax lấy dữ liệu
	$.ajax({
					type: 'GET',
					url : '../JSON_3_GIATRI/DS_DT_MDDS2016.js',
					dataType:'script',
					success: function(data) {
									data_ajax =  eval(data);
					}
	});
	$(document).ajaxComplete(function() {
					am4core.ready(function() {

					// Themes begin
					am4core.useTheme(am4themes_animated);
					// Themes end
					
					// Create chart instance
					var chart = am4core.create("chartdiv", am4charts.XYChart);					
					chart.width = am4core.percent(100);
					chart.height = am4core.percent(100);

					chart.scrollbarX = new am4core.Scrollbar();
					
					// Add data
					chart.data = data_ajax ;
					
					// Create axes
					var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
					categoryAxis.dataFields.category = "ten tinh";
					categoryAxis.renderer.grid.template.location = 0;
					categoryAxis.renderer.minGridDistance = 5;
					categoryAxis.renderer.labels.template.horizontalCenter = "right";
					categoryAxis.renderer.labels.template.verticalCenter = "middle";
					categoryAxis.renderer.labels.template.rotation = 270;
					categoryAxis.tooltip.disabled = true;
					// categoryAxis.renderer.minHeight = 110;
					var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
					// valueAxis.renderer.minWidth = 63;
					// valueAxis.numberFormatter.numberFormat = "#' Người/km2'"
					// categoryAxis.title.text = "Hiện trạng sử dụng đất";
					// categoryAxis.title.fontWeight = "bold";
					// Create series
					var series = chart.series.push(new am4charts.ColumnSeries());
					series.sequencedInterpolation = true;
					series.dataFields.valueY = "mat do dan so";
					series.dataFields.categoryX = "ten tinh";
					series.tooltipText = "[{categoryX}: bold]{valueY.formatNumber('#.0')}Người/km2[/]";
					series.columns.template.strokeWidth = 0;
					series.tooltip.pointerOrientation = "vertical";
					series.columns.template.column.cornerRadiusTopLeft = 10;
					series.columns.template.column.cornerRadiusTopRight = 10;
					series.columns.template.column.fillOpacity = 0.8;
					//series.columns.template.fill = am4core.color("red"); // fill
var columnTemplate = series.columns.template;
columnTemplate.tooltipText = "[bold]{valueY}[/]";
columnTemplate.fillOpacity = .8;
columnTemplate.strokeWidth = 0;
columnTemplate.adapter.add("fill", function (fill, target) {
var dataItem = target.dataItem;
if (dataItem.valueY > 121) {
if (dataItem.valueY <208){
return am4core.color("#fecc5c");}
									else{
													if (dataItem.valueY <392){
													return am4core.color("#fd8d3c");}
													else{
																	if (dataItem.valueY <722){
																	return am4core.color("#f03b20");}
																	else{
																					return am4core.color("#bd0026");
																					}
																	}
													}
																				}
else {			
return am4core.color("#f5f54d");
}
	})
// Add legend
// chart.legend = new am4charts.Legend();
					// Cursor
					chart.cursor = new am4charts.XYCursor();
					
					}); // end am4core.ready()
	});
	//end ajax complate
});
// End jquery 