const sWidth = window.screen.width;
const sHeight = window.screen.height;
const months = [ ,'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json';
$.ajax({url: url})
.done(function(res){	
	const data = JSON.parse(res);
	const arr = data['monthlyVariance'];
	const base = data['baseTemperature'];

	
		var h = sHeight * .70;

		var w = sWidth *.80;
	
	const padding = sWidth/ 30;
	
	const barWidth = w / 147;
	
	const barHeight = (h-padding) / 13;
	
	const xScale= d3.scaleLinear()
		.domain([d3.min(arr, (d) => d['year']),d3.max(arr, (d) => d['year'])])
		.range([padding, w-padding]);
	
	const yScale= d3.scaleLinear()
		.domain([d3.min(arr, (d) => d['month']),d3.max(arr, (d) => d['month']+1)])
		.range([padding, h-padding]);
	
	const sColor = d3.scaleSequential()
		.domain([d3.min(arr, (d) => d['variance']+base),d3.max(arr, (d) => d['variance']+base)])
		.interpolator(d3.interpolateInferno);
  
	const info =  d3.select('div.chart')
				  .append('div')
				  .attr('class', 'info hidden')
				  .style('opacity', .75);
		
	const svg = d3.select('div.chart')
				  .append('svg')
				  .attr('width', w)
				  .attr('height', h);
	
	svg.selectAll('rect')
	.data(arr)
	.enter()
	.append('rect')
	.attr('class', 'bar')
	.attr('fill', (d) => sColor(d['variance']+base))
	.attr('width', barWidth)
	.attr('x', (d) => xScale(d['year']))
	.attr('y', (d) => yScale(d['month']))
	.attr('height', barHeight)
	 .on('mouseover', function(d) {				
            info.html("<p>" + d['year'] +" - "+ months[d['month']]+"</p><p>"+ (d['variance']+base).toFixed(2) +"\xB0C</p><p>"+ d['variance'] +"\xB0C</p>")	
                .style('left', (d3.mouse(this)[0] + padding) +'px')		
                .style('top', (d3.mouse(this)[1] + padding)+'px')
				.classed('hidden', false);	
            })					
        .on('mouseout', function(d) {		
            info.classed('hidden', true);	
        });
	
	const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
	
	 svg.append("g")
	   .style('font-size', padding/3.25 + 'px')
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);
	 
	const yAxis = d3.axisLeft(yScale)
	.tickFormat((x) => {return months[x]});
    
    svg.append("g")
	   .style('font-size', padding/4.25 + 'px')
       .attr("transform", "translate("+ (padding) +" ,0 )")
       .call(yAxis);
	
	svg.append('text')
	   .text('Monthly Global Land-Surface Temperature 1753-2015*')
	   .attr('fill', 'black')
	   .attr('font-size', padding/2)
	   .attr('font-weight', 'bold')
	   .attr('x', padding)
	   .attr('y', padding/1.5);
	
	svg.append('text')
	   .text('Year')
	   .attr('fill', 'black')
	   .attr('font-size', padding/4)
	   .attr('font-weight', 'bold')
	   .attr('x', w/2.05)
	   .attr('y', h-(padding/4));
	
	svg.append('text')
	   .text('temp. variance')
	   .attr('fill', 'black')
	   .attr('font-size', padding/6)
	   .attr('x', w-(padding*2.65))
	   .attr('y', h-(padding/2.15));
	
	svg.append('text')
	   .attr('transform', 'rotate(-90)')
	   .text('Month')
	   .attr('fill', 'black')
	   .attr('font-size', padding/4)
	   .attr('font-weight', 'bold')
	   .attr('x',0 -(w/4))
	   .attr('y',w/77);
	   
	svg.append('rect')
	.attr('fill', sColor(15))
	.attr('height', barHeight/3)
	.attr('width', barWidth *2)
	.attr('x',w-padding)
	.attr('y', h-(padding/2.5))
	.append('title')
	.text('15');
	
	svg.append('rect')
	.attr('fill', sColor(12))
	.attr('height', barHeight/3)
	.attr('width', barWidth *2)
	.attr('x',(w-padding)-(barWidth*2))
	.attr('y', h-(padding/2.5))
	.append('title')
	.text('12');
	
	svg.append('rect')
	.attr('fill', sColor(9))
	.attr('height', barHeight/3)
	.attr('width', barWidth *2)
	.attr('x',(w-padding)-(barWidth*4))
	.attr('y', h-(padding/2.5))
	.append('title')
	.text('9');
	
	svg.append('rect')
	.attr('fill', sColor(6))
	.attr('height', barHeight/3)
	.attr('width', barWidth *2)
	.attr('x',(w-padding)-(barWidth*6))
	.attr('y', h-(padding/2.5))
	.append('title')
	.text('6');
	
	svg.append('rect')
	.attr('fill', sColor(3))
	.attr('height', barHeight/3)
	.attr('width', barWidth *2)
	.attr('x',(w-padding)-(barWidth*8))
	.attr('y', h-(padding/2.5))
	.append('title')
	.text('3');
	
	svg.append('rect')
	.attr('fill', sColor(0))
	.attr('height', barHeight/3)
	.attr('width', barWidth *2)
	.attr('x',(w-padding)-(barWidth*10))
	.attr('y', h-(padding/2.5))
	.append('title')
	.text('0');
});