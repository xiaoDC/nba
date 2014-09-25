var Zone14 = function(courtobj, data, color_helper){
    ShotchartUi.call(this);

    this.courtobj = courtobj;
    this.court = this.courtobj.container;
    this.data = data;
    this.selector = '.gz14';
    // 从base.js中加载的
    this.helper = ZoneHelper; 
    this.color_helper = color_helper;
    // ShotFilterCrossFilter在base.js中
    this.filterobj = new ShotFilterCrossFilter(data);
};
Zone14.prototype = new ShotchartUi();
Zone14.prototype.constructor = Zone14;
Zone14.prototype.draw = function(court) {

    var court = this.court;
    var PATH_DATA = {
        'nba': [
            {
                shotzone: 1,
                d:"M0,0 L30,0 L30,169 L0,169 Z", //lbl_x: 0, lbl_y: 70, lbl2_x: 0, lbl2_y: 90
                labels: {
                    'offense': {x: 0, y: 80, x2: 0, y2: 90},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 2,
                d:"M30,169 A285,285 0 0,0 204,345 L204,564 L0,564 L0,169 Z", //lbl_x: 70, lbl_y: 300, lbl2_x: 70, lbl2_y: 320
                labels: {
                    'offense': {x: 110, y: 366, x2: 110, y2: 386},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 3,
                d:"M204,345 A285,285 0 0,0 396,345 L396,564 L204,564 Z", //lbl_x: 230, lbl_y: 320, lbl2_x: 230, lbl2_y: 340
                labels: {
                    'offense': {x: 280, y: 420, x2: 280, y2: 440},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 4,
                d:"M396,345 A285,285 0 0,0 570,169 L600,169 L600,564 L396,564 Z", //lbl_x: 360, lbl_y: 300, lbl2_x: 360, lbl2_y: 320
                labels: {
                    'offense': {x: 440, y: 366, x2: 420, y2: 386},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 5,
                d:"M570,0, L600,0 L600,169 L570,169 Z", //lbl_x: 470, lbl_y: 70, lbl2_x: 470, lbl2_y: 90
                labels: {
                    'offense': {x: 550, y: 80, x2: 550, y2: 90},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 6,
                d:"M31,0 204,0 204,114 L31,114 Z", //lbl_x: 80, lbl_y: 60, lbl2_x: 80, lbl2_y: 80
                labels: {
                    'offense': {x: 90, y: 60, x2: 90, y2: 80},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 7,
                d:"M30,169 A285,285 0 0,0 204,345 L204,114 L31,114 Z", //lbl_x: 90, lbl_y: 170, lbl2_x: 90, lbl2_y: 190
                labels: {
                    'offense': {x: 90, y: 170, x2: 90, y2: 190},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 8,
                d:"M204,345 A285,285 0 0,0 396,345 L396,228 L204,228 Z", //lbl_x: 230, lbl_y: 240, lbl2_x: 230, lbl2_y: 260
                labels: {
                    'offense': {x: 280, y: 280, x2: 280, y2: 300},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 9,
                d:"M396,345 A285,285 0 0,0 570,169 L570,114 L396,114 Z", //lbl_x: 360, lbl_y: 170, lbl2_x: 360, lbl2_y: 190
                labels: {
                    'offense': {x: 450, y: 170, x2: 450, y2: 190},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 10,
                d:"M396,0 L570,0 L570,114 L396,114 Z", //lbl_x: 370, lbl_y: 60, lbl2_x: 370, lbl2_y: 80
                labels: {
                    'offense': {x: 450, y: 60, x2: 450, y2: 80},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 11,
                d:"M204,114 L300,114 L300,228 L204,228 Z", //lbl_x: 200, lbl_y: 150, lbl2_x: 200, lbl2_y: 170
                labels: {
                    'offense': {x: 230, y: 150, x2: 230, y2: 170},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 12,
                d:"M300,114 L396,114 L396,228 L300,228 Z", //lbl_x: 270, lbl_y: 150, lbl2_x: 270, lbl2_y: 170
                labels: {
                    'offense': {x: 320, y: 150, x2: 320, y2: 170},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 13,
                d:"M204,0 L300,0 L300,114 L204,114 Z", //lbl_x: 200, lbl_y: 60, lbl2_x: 200, lbl2_y: 80
                labels: {
                    'offense': {x: 230, y: 60, x2: 230, y2: 80},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            },  
            {
                shotzone: 14,
                d:"M300,0 L396,0 L396,114 L300,114 Z", //lbl_x: 270, lbl_y: 60, lbl2_x: 270, lbl2_y: 80
                labels: {
                    'offense': {x: 320, y: 60, x2: 320, y2: 80},
                    'defense': {x: 0, y: 70, x2: 0, y2: 90},
                }
            }
        ]
    };

    var paths = PATH_DATA[this.courtobj.court_type],
        that = this,
        gz14 = this.court.selectAll(".gz14").data(paths).enter()
            .append("g").attr("class","gz14 gzone");

    gz14.each(function(v,i){
        var g = d3.select(this);

        // Shape
        g.append("path").attr("class","shotzone_14 shotzone")
            .attr("d",v.d).datum({shotzone: i + 1, value: 0});   

        // Main text label
        g.append("text")
            .text("zone")
            .attr({"class":"shotzone_14_label zone_label", x: v.labels['offense'].x, y: v.labels['offense'].y});

        // Secondary text label
        g.append("text")
            .text(" ")
            .attr({"class":"shotzone_14_label_sec zone_label", x: v.labels['offense'].x2, y: v.labels['offense'].y2});
    });

    this.court.selectAll(".gz14")
        .attr("opacity",0);

    this.court.selectAll(".shotzone_14").attr({"opacity":0.7,"stroke-width":1,"stroke":"gray","fill":"gray"});

    this.court.selectAll(".shotzone_14_label").attr({"font-size":20,"font-weight":"bolder","font-family":"Oswald,Helvetica","fill":"black"});
    this.court.selectAll(".shotzone_14_label_sec").attr({"font-size":12,"font-family":"Helvetica"});
}
Zone14.prototype.updateData = function() {
    var all_zone_shots  = this.filterobj.format_data(this.data, this.helper); 
    this.helper._appendDataToZoneAndLabels(this.court, all_zone_shots, '14');

    var that = this;
    setTimeout(function(){that.repositionLabels(that.court, that.selector, '.shotzone_14', 0)},500);

    return this;
}
Zone14.prototype.label = function(metric) {
    var label_functions = {};
    var total_shots = this.helper._countTotalShots(this.filterobj.get_shots(this.data));

    label_functions.shot = {
        'label': function(d) {return (total_shots == 0 ? 'N/A' : Math.floor(d.value*1000/total_shots)/10 + "%");},
        'label_sec': function(d) {return d.value;},
    };
    label_functions.fg = {
        'label': function(d) {return (d.value==0 ? "N/A" : Math.round(d.made *1000/ d.value)/10+"%");},
        'label_sec': function(d) {return d.made + "-" + d.value;},
    };
    label_functions.pps = {
        'label': function(d) {return d.value == 0 ? "N/A": Math.round(d.points*100/d.value)/100;},
        'label_sec': function(d) {return d.made + "-" + d.value;},
    };

    this.court.selectAll(".shotzone_14_label")
        .transition().duration(1000)
        .text(function(d){return label_functions[metric].label(d)});

    this.court.selectAll(".shotzone_14_label_sec")
        .transition().duration(1000)
        .text(function(d){return label_functions[metric].label_sec(d)});
}
Zone14.prototype.fill = function(metric, transition_duration) {
    var fill_functions = {};
    var total_shots = this.helper._countTotalShots(this.filterobj.get_shots(this.data));
    var color_helper = this.color_helper;

    this.court.selectAll(".shotzone_14")
        .transition().duration(transition_duration)
        .attr("fill",function(d){
            var zone_id = d.id || parseInt(d.shotzone);
            var func = color_helper.getFillFunction(zone_id, metric, total_shots);
            return func(d);
        });
}
