/* Dependent on scrollTo jquery plugin*/

var stroke_color_shot = '#444';
var stroke_color_courtitems = '#ccc';
var fill_color_shot = '#555';


param_shot_location = {'x': function (d) {return 250 + parseInt(d.x)},'y':function (d) {return parseInt(d.y)}};


// New mediator: components: {court background, shot shapes (number/jersey,number/play count/,circle),gameflow,playbyplay,ui elements,players,score }

var VORPED = {};

// var courtviz = function(container_selector, obj_svg) {

//     var court_svg = {};

//     //param = param_shot['circle'];
//     this.drawCourt = function(court_id, court_label_text) {
//         this.config = {
//             'div_container':'#chart',
//             'svg':{
//                 'width':1128,
//                 'height':600,
//                 'class':'courts',
//                 'id':court_id,
//                 'viewBox':"0 0 1128 600",
//             },
//             'court_elements':{
//                 'background': {
//                     'x': 0,
//                     'y': 0,
//                     'width':1128,
//                     'height':600,
//                     'fill': 'none'
//                     // 'fill': 'red'
//                 },
//                 'outline': {
//                     'width': 1128,
//                     'height':600,
//                     'fill':'none',
//                     'stroke':'#777',
//                     'stroke-width':1,
//                     'class':'halfcourt'
//                 },
//                 'label':{
//                     'x':20,
//                     'y':450,
//                     'class':'court_label',
//                     'fill':'#999'
//                 },
//                 'hoop':{'cx':250,'cy':47,'r':7,'stroke':stroke_color_courtitems,'fill':'none','stroke-width':3},
//                 'paint':{'x':190,'y':0,'width':120,'height':190,'stroke':stroke_color_courtitems,'fill':'none','stroke-width':4},
//                 'paint_circle':{'cx':250,'cy':190,'r':60,'stroke':stroke_color_courtitems,'fill':'none','stroke-width':4},
//                 'center_circle':{'d':'M310,470 A50,50 0 0,0 190,470','stroke':stroke_color_courtitems,'fill':'none','stroke-width':4},
//                 'backboard':{'x':220,'y':35,'width':60,'height':5},
//                 'threeptstrleft':{'d':'M30,0 l0,141','stroke':stroke_color_courtitems,'fill':'none','stroke-width':4},
//                 'threeptstrright':{'d':'M470,0 l0,141','stroke':stroke_color_courtitems,'fill':'none','stroke-width':4},
//                 'threeptcurve':{'d':'M30,141 A237,237 0 0,0 250,287 A237,237 0 0,0 470,141','stroke':stroke_color_courtitems,'fill':'none','stroke-width':4},
//             }
//         }

//         choose_container_selector = typeof container_selector === 'undefined' ? this.config.div_container : container_selector;
//         choose_svg_selector = typeof svg_selector === 'undefined' ? this.config.div_container : container_selector;

//         svg                 = typeof obj_svg === 'undefined' ? d3.select(choose_container_selector).append("svg").attr(this.config.svg) : obj_svg;
//         container           = svg.append("g").attr("class","court_container");
//         court               = container.select("svg.courts");
//         background          = container.append("rect")
//                                 .attr(this.config.court_elements.background);
//         court_label         = container.append("text")
//                                 .attr(this.config.court_elements.label)
//                                 .text(court_label_text);
//         hoop                = container.append("circle")
//                                 .attr(this.config.court_elements.hoop);
//         paint               = container.append("rect")
//                                 .attr(this.config.court_elements.paint);
//         paint_circle        = container.append("circle")
//                                 .attr(this.config.court_elements.paint_circle);
//         center_circle       = container.append("path")
//                                 .attr(this.config.court_elements.center_circle);
//         backboard           = container.append("rect")
//                                 .attr(this.config.court_elements.backboard);
//         threeptstrleft      = container.append("path")
//                                 .attr(this.config.court_elements.threeptstrleft);
//         threeptstrright     = container.append("path")
//                                 .attr(this.config.court_elements.threeptstrright);
//         threeptcurve        = container.append("path")
//                                 .attr(this.config.court_elements.threeptcurve);
//         court_outline       = container.append("rect")
//                                 .attr(this.config.court_elements.outline);

//         court_svg = svg;
//         return container;
//     }


//     function drawPlayerBoxes(home_boxscore_data, away_boxscore_data) {

//         home_player_container = d3.select("#home_player_container");
//         away_player_container = d3.select("#away_player_container");

//         home_player_container
//             .selectAll(".players").data(home_boxscore_data)
//             .on("click",function(d){
//                 this.highlightShots('','player_id',d.player_id);
//                 player_id = d.player_id
//                 /*d3.selectAll(".playshot_item").filter(function(data){return data.player_id != player_id})
//                     .attr("style","display:none")*/
//             });
//         away_player_container
//             .selectAll(".players").data(away_boxscore_data)
//             .on("click",function(d){
//                 this.highlightShots('','player_id',d.player_id);
//                 player_id = d.player_id
//                 /*d3.selectAll(".playshot_item").filter(function(data){return data.player_id != player_id})
//                     .attr("style","display:none")*/
//             });
//     }


//     function filterShots(court, filter_attr, val) {
//         court.selectAll(".shots").transition().duration(500)
//             .attr("opacity",0.001);

//         court.selectAll(".shots").filter(function(d){return d[filter_attr] == val;})
//             .transition().duration(2000)
//             .attr("opacity",1);
//     }


//     param_default = {'r':9,'opacity':0.7,'stroke-width':1,'fill':'#444','stroke':'#222'}
//     param_unselected = {'r':9,'opacity':0.2,'stroke-width':1,'fill':'#444','stroke':'#222'}
//     param_selected = {'r':10,'opacity':0.9,'stroke-width':3,'fill':'red','stroke':'red'}

//     this.highlightShots = function(court, filter_attr, val) {
//         // Non-selected shots
//         d3.selectAll(".shots").filter(function(d){return d[filter_attr] != val;}).transition().duration(1000)
//         .attr(param['unselected']);

//         matching_shots = d3.selectAll(".shots").filter(function(d){return d[filter_attr] == val && d['shm'] == 0;}).transition()
//             .duration(1000)
//             .attr(param['selected']);

//         // made shots
//         matching_shots = d3.selectAll(".shots").filter(function(d){return d[filter_attr] == val && d['shm'] == 1;}).transition()
//             .duration(1000)
//             .attr(param['selected']);
//     }


//     function unhighlightShots(court, filter_attr, val) {
//         // Missed shots
//         matching_shots = d3.selectAll(".shots").filter(function(d){
//             return d[filter_attr] == val && d['is_shot_made'] == 0;
//         }).transition().duration(500)
//             .attr("stroke",stroke_color_shot);

//         // made shots
//         matching_shots = d3.selectAll(".shots").filter(function(d){
//             return d[filter_attr] == val && d['is_shot_made'] == 1;
//         }).transition().duration(500)
//             .attr("fill",fill_color_shot);

//     }


//     function showTeamShotsSideBySide() {


//         away_shots = [];
//         home_shots = [];
//         for (obj in shot_locations) {
//             if (shot_locations[obj].tid == away_team_id) {
//                 away_shots.push(shot_locations[obj]);
//             } else {
//                 home_shots.push(shot_locations[obj]);
//             }
//         }
//     }


//     this.shrinkCourts = function() {
//         courts = d3.selectAll(".courts");
//         courts.attr({"width":500/1.428,"height":470/1.428,"viewBox":"0 0 600 520"});
//     }


//     this.shrinkCourtsWidthHeight = function(width, height) {
//         courts = d3.selectAll(".courts");
//         // courts.attr({"width":width,"height":height,"viewBox":"0 0 600 520"});
//         courts.attr({"width":width,"height":height,"viewBox":"0 0 1040 600"});
//     }

//     this.setWidth = function(width) {
//         court_svg.attr("width",width);
//     }
//     this.setHeight = function(height) {
//         court_svg.attr("height",height);
//     }

//     this.flip = function() {
//         court_svg.select(".court_container").attr("transform","rotate(180 250 235)");
//     }
// }


VORPED.court = function(container_selector, obj_svg) {

    var court_svg = {};
    var container = {};
    var selector_container_svg = {};
    
    this.court_type = 'nba'; // nba, wnba, college-men, college-women, fiba, high-school

    var width = function(value) {
        if (typeof value !== 'undefined') {
            court_svg.attr("width", value);
        }
        return court_svg.attr("width");
    }

    var height = function(value) {
        if (typeof value !== 'undefined') {
            court_svg.attr("height", value);
        }
        return court_svg.attr("height");
    }

    this.container = {};
    this.draw = function(court_id, court_label_text) {
        this.config = {
            'div_container':'#chart',
            'svg':{
                'width':620,
                'height':584,
                'class':'courts',
                'id':court_id,
                'viewBox':"0 0 630 580",
            },
            'court_elements':{
                'background': {
                    'x': 0,
                    'y': 0,
                    'width':600,
                    'height':564,
                    'fill': '#ffffff'
                },
                'outline': {
                    'width': 600,
                    'height':564,
                    'fill':'none',
                    'stroke':'#777',
                    'stroke-width':1,
                    'class':'halfcourt'
                },
                'label':{
                    'x':20,
                    'y':450,
                    'class':'court_label',
                    'fill':'#999'
                },
                'markings': {
                     // 三分线
                    'threeptstr':{type:'path', attrs:{'d':'M30,0L30,169A285 285 0 0 0 570 169L570 0Z','stroke':stroke_color_courtitems,'fill':'none','stroke-width':4}},

                    // 绘制限制区
                    'restricted_left':{type:'rect', attrs:{x:204, y:0, width:192, height:228, stroke:stroke_color_courtitems, fill:'none', 'stroke-width':4}},

                   // 绘制油漆区
                    'paint':{type:'rect', attrs:{x:228, y:0, width:144, height:228, stroke:stroke_color_courtitems, fill:'none', 'stroke-width':4}},

                    //绘制篮筐
                    'hoop':{type:'circle', attrs:{cx:300, cy:63, r:9, stroke:stroke_color_courtitems, fill:'none', 'stroke-width':3}},

                    // 绘制罚球区
                    'paint_circle':{type: 'circle', attrs:{'cx':300,'cy':226,'r':72,'stroke':stroke_color_courtitems,'fill':'none','stroke-width':4}},

                    // 绘制篮板
                    'backboard':{type:'rect', attrs:{'x':264,'y':40,'width':72,'height':5}}
                }
            }
        }

        var choose_container_selector = typeof container_selector === 'undefined' ? this.config.div_container : container_selector;
        var choose_svg_selector = typeof svg_selector === 'undefined' ? this.config.div_container : container_selector;

        var svg                 = typeof obj_svg === 'undefined' ? d3.select(choose_container_selector).append("svg").attr(this.config.svg) : obj_svg;
        var container           = svg.append("g").attr("class","court_container").attr("transform","translate(15,15)");
        var court               = container.select("svg.courts");
        var court_label         = container.append("text")
                                .attr(this.config.court_elements.label)
                                .attr("class","court-label")
                                .text(court_label_text);
        var background          = container.append("rect")
                                .attr(this.config.court_elements.background);

        // Court markings
        for (var key in this.config.court_elements.markings) {
            var item = this.config.court_elements.markings[key];
            container.append(item.type).attr(item.attrs);
        }
        var court_outline = container.append("rect").attr(this.config.court_elements.outline);

        court_svg = svg;
        selector_container_svg = choose_container_selector;
        this.container = container;

        return container;
    }

    this.width = function(value) {
        return width(value);
    }

    this.height = function(value) {
        return height(value);
    }
    this.orientation = 'offense';
    this.setOrientation = function(orientation) {
        this.orientation = orientation;
        this.flip();
    }
    this.getOrientation = function(orientation) {
        return this.orientation;
    }
    this.setCourtLabel = function(txt) {
        court_svg.select(".court-label").text(txt);
    }
    this.flip = function() {
        return court_svg.select(".court_container").attr("transform","translate(15, 15) rotate(180 250 235)");
    }
    var autoResize = function(){
        //console.log(selector_container_svg);
        //console.log($(selector_container_svg).width());
        var page_container = $(selector_container_svg);
        var targetWidth = page_container.width() - 10;
        if (targetWidth < 600) {
            width(targetWidth);
            height(Math.round(targetWidth * 470 / 500));
        }
    }
    this.setResizeListener = function() {
        $(window).on("resize",autoResize);
        $(window).on("load",autoResize);
    }

    function drawCircles(data) {
        court_svg.selectAll(".inputted").remove();
        var circles = court_svg.selectAll(".inputted").data(data);

        circles.exit().remove();
        circles.enter().append("circle")
            .attr('class','inputted')
            .attr({'r':4,'cx':function(d){return parseInt(d.x) + 250},'cy':function(d){return d.y}})
            .attr({'fill': 'none','stroke': 'red', 'stroke-width': 2});

        circles.transition().duration(400).attr('r',10);
    }

    this.drawCircles = function(data) {
        drawCircles(data);
    }
    this.addInputListener = function(coordinate_listener) {
        var dc = drawCircles;
        court_svg.on("click",function(d){
            coord = d3.mouse(this);
            coordinate_listener({x:Math.round(coord[0] - 250), y:Math.round(coord[1])});
        });

    }
}
