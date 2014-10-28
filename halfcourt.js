/* Dependent on scrollTo jquery plugin*/

var stroke_color_shot = '#444';
var stroke_color_courtitems = '#ccc';
var fill_color_shot = '#555';


param_shot_location = {'x': function (d) {return 250 + parseInt(d.x)},'y':function (d) {return parseInt(d.y)}};


// New mediator: components: {court background, shot shapes (number/jersey,number/play count/,circle),gameflow,playbyplay,ui elements,players,score }

var VORPED = {};

/*
    @ratio 球场图的缩放比率，默认为1
*/
VORPED.court = function(ratio,container_selector, obj_svg) {

    var court_svg = {};
    var container = {};
    var selector_container_svg = {};
    var court_ratio = ratio || 1.0;
    
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
        var _viewBox = "0 0 " + 630*court_ratio +" " + 590 * court_ratio;
        var _threeptstrPath = 'M'+30*court_ratio+','+0*court_ratio+'L'+30*court_ratio+','
                +169*court_ratio+'A'+285*court_ratio+' '+285*court_ratio+' '+0+' '+0+' '+0+' '
                +570*court_ratio+' '+169*court_ratio+'L'+570*court_ratio+' '+0*court_ratio+'Z';
        this.config = {
            'div_container':'#chart',
            'svg':{
                'width':620*court_ratio,
                'height':584*court_ratio,
                'class':'courts',
                'id':court_id,
                // 'viewBox':"0 0 630 580",
                'viewBox':_viewBox
            },
            'court_elements':{
                'background': {
                    'x': 0,
                    'y': 0,
                    'width':600*court_ratio,
                    'height':580*court_ratio,
                    'fill': '#ffffff'
                },
                'outline': {
                    'width': 600*court_ratio,
                    'height':570*court_ratio,
                    'fill':'none',
                    'stroke':'#777',
                    'stroke-width':3*court_ratio,
                    'class':'halfcourt'
                },
                'label':{
                    'x':20*court_ratio,
                    'y':450*court_ratio,
                    'class':'court_label',
                    'fill':'#999'
                },
                'markings': {
                     // 三分线
                    // 'threeptstr':{type:'path', attrs:{'d':'M30,0L30,169A285 285 0 0 0 570 169L570 0Z','stroke':stroke_color_courtitems,'fill':'none','stroke-width':4*court_ratio}},
                    'threeptstr':{type:'path', attrs:{'d':_threeptstrPath,'stroke':stroke_color_courtitems,'fill':'none','stroke-width':3*court_ratio}},

                    // 绘制限制区
                    'restricted_left':{type:'rect', attrs:{x:204*court_ratio, y:0*court_ratio, width:192*court_ratio, height:228*court_ratio, stroke:stroke_color_courtitems, fill:'none', 'stroke-width':3*court_ratio}},

                   // 绘制油漆区
                    'paint':{type:'rect', attrs:{x:228*court_ratio, y:0*court_ratio, width:144*court_ratio, height:228*court_ratio, stroke:stroke_color_courtitems, fill:'none', 'stroke-width':3*court_ratio}},

                    //绘制篮筐
                    'hoop':{type:'circle', attrs:{cx:300*court_ratio, cy:63*court_ratio, r:9*court_ratio, stroke:stroke_color_courtitems, fill:'none', 'stroke-width':3*court_ratio}},

                    // 绘制罚球区
                    'paint_circle':{type: 'circle', attrs:{'cx':300*court_ratio,'cy':226*court_ratio,'r':72*court_ratio,'stroke':stroke_color_courtitems,'fill':'none','stroke-width':3*court_ratio}},

                    // 绘制篮板
                    'backboard':{type:'rect', attrs:{'x':264*court_ratio,'y':40*court_ratio,'width':72*court_ratio,'height':5*court_ratio}}
                }
            }
        }

        var choose_container_selector = typeof container_selector === 'undefined' ? this.config.div_container : container_selector;
        var choose_svg_selector = typeof svg_selector === 'undefined' ? this.config.div_container : container_selector;

        var svg                 = typeof obj_svg === 'undefined' ? d3.select(choose_container_selector).append("svg").attr(this.config.svg) : obj_svg;
        var _transform = "translate("+15*court_ratio+","+15*court_ratio+")";
        var container           = svg.append("g").attr("class","court_container").attr("transform",_transform);
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
