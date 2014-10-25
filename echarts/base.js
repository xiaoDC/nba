var ShotchartUi = function(courtobj, data){
    this.courtobj = courtobj;
    this.court = {};
    this.selector = '';
    this.data = data;
};
ShotchartUi.prototype = {
    draw: function(){},
    show: function(transition_duration){
        transition_duration = typeof transition_duration !== 'undefined' ? transition_duration : 1000;
        this.court.selectAll(this.selector)
            .transition().duration(transition_duration)
            .attr("opacity",1);

        return this;
    },
    hide: function(transition_duration){
        transition_duration = typeof transition_duration !== 'undefined' ? transition_duration : 1000;
        this.court.selectAll(this.selector)
            .transition().duration(transition_duration)
            .attr("opacity",0);

        return this;
    },
    filter: function(){},
    change_baseline: function(){},
    summarize_stats: function(){},
    updateData: function(){return false;},
    label: function(metric){},
    fill: function(metric){},
    hideLabel: function() {
        this.court.selectAll('.zone_label').attr('opacity',0);
    },
    showLabel: function() {
        this.court.selectAll('.zone_label').attr('opacity',1);
    },
    flipLabel: function(court, gz_selector, shotzone_selector) {
        court.selectAll(gz_selector).each(function(d, i){
            // I don't know why, but choosing el.select rebinds the wrong data to shotzone, so do selectAll instead
            var el = d3.select(this),
                label = el.selectAll(shotzone_selector + "_label"),
                label_bbox = label[0][0].getBBox(),
                label2 = el.selectAll(shotzone_selector + "_label_sec"),
                label2_bbox = label2[0][0].getBBox();

            var label_cx = label_bbox.x + label_bbox.width/2,
                label_cy = label_bbox.y + label_bbox.height/2,
                label2_cx = label2_bbox.x + label2_bbox.width/2,
                label2_cy = label2_bbox.y + label2_bbox.height/2;

            label.transition().duration(500).attr("transform","translate(" + label_translate + ",0)");
            label2.transition().duration(500).attr("transform","translate(" + label2_translate + ",0)");
        });
    },
    repositionLabels: function(court, gz_selector, shotzone_selector, duration) {
        duration =  typeof duration === 'undefined' ? 500 : duration;
        var that = this;
        court.selectAll(gz_selector).each(function(d, i){
            // I don't know why, but choosing el.select rebinds the wrong data to shotzone, so do selectAll instead
            var el = d3.select(this),
                shape = el.selectAll(shotzone_selector),
                shape_bbox = shape[0][0].getBBox();
                label = el.selectAll(shotzone_selector + "_label"),
                label_bbox = label[0][0].getBBox(),
                label2 = el.selectAll(shotzone_selector + "_label_sec"),
                label2_bbox = label2[0][0].getBBox();

            var label_translate = shape_bbox.x + shape_bbox.width/2 - label_bbox.x - label_bbox.width/2,
                label2_translate = shape_bbox.x + shape_bbox.width/2 - label2_bbox.x - label2_bbox.width/2,
                label_cx = label_bbox.x + label_bbox.width/2,
                label_cy = label_bbox.y + label_bbox.height/2,
                label2_cx = label2_bbox.x + label2_bbox.width/2,
                label2_cy = label2_bbox.y + label2_bbox.height/2;

            var label_rotation = '',
                label2_rotation = '';
            if (that.courtobj.orientation == 'defense') {
                label_rotation = "rotate(180 " + label_cx + " " + label_cy + ")";
                label2_rotation = "rotate(180 " + label2_cx + " " + label2_cy + ")";
            }

            label.transition().duration(duration).attr("transform", "translate(" + label_translate + ",0) " + label_rotation);
            label2.transition().duration(duration).attr("transform", "translate(" + label2_translate + ",0) " + label2_rotation);
        });

    }
};

var ColorFillHelper = function(domains){
    var publicobj = {};
    var default_domains = {
        'zonelcr_l':{shot:[0.4, 0.3, 0.1],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zonelcr_c':{shot:[0.4, 0.3, 0.1],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zonelcr_r':{shot:[0.4, 0.3, 0.1],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone23p_2':{shot:[0.4, 0.3, 0.1],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone23p_3':{shot:[0.4, 0.3, 0.1],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone23p_p':{shot:[0.4, 0.3, 0.1],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},

        'zone14_1':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_2':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_3':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_4':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_5':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_6':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_7':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_8':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_9':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_10':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_11':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_12':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_13':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
        'zone14_14':{shot:[0.2, 0.1, 0.05],fg:[0.7, 0.4, 0.3],pps:[2, 1, 0.5]},
    }
    var domains = domains || default_domains;

    var color_range = {};
    color_range.shot = ['red','red','orange','white','white'];
    color_range.fg = ['green','green','white','red','red'];
    color_range.pps = ['green','green','white','red','red'];
    var domains_max_min = {};
    domains_max_min.shot = {min: 0, max: 1};
    domains_max_min.fg = {min: 0, max: 1};
    domains_max_min.pps = {min: 0, max: 3};

    
    // Public functions
    publicobj.getFillFunction = function(zone_id, metric, total_shots) {
        var domain = [];
        domain.push(domains_max_min[metric]['max']);
        domains[zone_id][metric].forEach(function(a){domain.push(parseFloat(a))});
        domain.push(domains_max_min[metric]['min']);

        var chosen_scale = d3.scale.linear().domain(domain).range(color_range[metric]);

        var fill_functions = {};
        fill_functions.shot = function(d) {
            pct = d.value / total_shots;
            return (total_shots == 0  ? 'gray' : chosen_scale(pct));
        };
        fill_functions.fg = function(d) {
            return (d.value == 0 ? 'gray' : chosen_scale(d.made/d.value));
        };
        fill_functions.pps = function(d) {
            pps = d.points / d.value; 
            return (d.value == 0 ? 'gray' : chosen_scale(pps));
        };
        return fill_functions[metric];
    }
    publicobj.changeDomain = function(new_domains) {
        domains = new_domains;
    }

    return publicobj;
};


var ShotCircleHelper = {
    filter_period: function(shots, chosen_periods) {
        return shots.filter(function(d){if ($.inArray(parseInt(d.p),chosen_periods) > -1) return d.p});
    },
    filter_game: function(shots, chosen_games) {
        return shots
            .filter(function(d){if ($.inArray(d.gid,chosen_games) > -1) return d.gid});
    },
    filter_homeaway: function(shots, chosen_homeaway) {
        return shots
            .filter(function(d){return d.ish === chosen_homeaway});
    },
    filter_shot_type: function(shots, chosen_shot_type) {
        return shots
            .filter(function(d){return d.st === chosen_shot_type});
    },
    filter_margin: function(shots, chosen_margin) {
        switch(parseInt(chosen_margin)) {
            case -15:
                return shots.filter(function(d){return d.mgn <= -15});
                break;
            case -7:
                return shots.filter(function(d){return d.mgn >= -14 && d.mgn <= -7});
                break;
            case -1:
                return shots.filter(function(d){return d.mgn >= -6 && d.mgn <= -1});
                break;
            case 0:
                return shots.filter(function(d){return d.mgn == 0});
                break;
            case 1:
                return shots.filter(function(d){return d.mgn >= 1 && d.mgn <= 6});
                break;
            case 7:
                return shots.filter(function(d){return d.mgn >= 7 && d.mgn <= 14});
                break;
            case 15:
                return shots.filter(function(d){return d.mgn >= 15});
                break;
            default:
                return shots;
        }
    }
}
var ZoneHelper = {
    _fillMissingZones: function(shots) {
        for (idx = 1; idx <= 14; idx++) {
            if ((shots.length < idx) || (shots[idx-1].key != idx)) {
                shots.splice(idx-1,0,{key:idx, value:0, made: 0, points: 0,id:'zone14_'+idx}); 
            }
        }
        return shots;
    },
    _appendMadeShots: function(shots, made_shots) {
        for (idx in made_shots) {
            // Append made shot count to base zone data array
            zone = shots[made_shots[idx].key - 1];
            zone.made = made_shots[idx].value;
            zone.id = 'zone14_' + (parseInt(idx)+1);

            // Append points per shot metric
            if (zone.key > 0 && zone.key <= 5) {
                zone.pps = Math.round(zone.made * 3 * 100 / zone.value) / 100;
                zone.points = zone.made * 3;
            } else if (zone.key > 5) {
                zone.pps = Math.round(zone.made * 2 * 100 / zone.value) / 100;
                zone.points = zone.made * 2;
            }
        }
        return shots;
    },
    _countTotalShots: function(shots) {
        total = 0;
        for (idx in shots) {
            zone = shots[idx];
            total += zone.value;
        }
        return total;
    },
    _appendDataToZoneAndLabels: function(court, data, selector) {
        zone_class = ".shotzone_" + selector;
        
        court.selectAll(zone_class + "_label")
            .data(data);
        court.selectAll(zone_class + "_label_sec")
            .data(data);
        court.selectAll(zone_class)
            .data(data);
    },
    _convertCrossFilterDataToArray: function(data) {
        var shots_by_zone       = data.group();

        var shots_made_by_zone  = data.group();
        var shots_made          = shots_made_by_zone.reduceSum(function(d){return d.shm;});

        var zone_all            = shots_by_zone.all();
        var zone_made           = shots_made_by_zone.all();

        var all_zone_shots = this._fillMissingZones(zone_all);
        var all_zone_shots = this._appendMadeShots(zone_all, zone_made);

        return all_zone_shots;
    },
}
var ShotFilter = function(data){
    this.data = data;
};
ShotFilter.prototype = {
    filter: function(){},
}


var ShotFilterArray = function(data) {
    this.data = data;
}
ShotFilterArray.prototype = new ShotFilter();
ShotFilterArray.prototype.constructor = ShotFilterArray;
ShotFilterArray.prototype.filter = function(all_filters) {

    var filtered_shots = this.data;
    
    var filters = {};
    filters.period = function(shots, opts){
        return shots.filter(function(d){return $.inArray(d.p,opts) > -1});
    };
    filters.game = function(shots, opts){
        return shots.filter(function(d){return $.inArray(d.gid,opts) > -1});
    };
    filters.homeaway = function(shots, opts){
        return shots.filter(function(d){return d.ish == opts});
    };
    filters.shot_type = function(shots, opts){
        return shots.filter(function(d){return d.st == opts});
    };
    filters.margin = function(shots, opts){
        switch(parseInt(opts)) {
            case -15:
                return shots.filter(function(d){return d.mgn <= -15});
                break;
            case -7:
                return shots.filter(function(d){return d.mgn >= -14 && d.mgn <= -7});
                break;
            case -1:
                return shots.filter(function(d){return d.mgn >= -6 && d.mgn <= -1});
                break;
            case 0:
                return shots.filter(function(d){return d.mgn == 0});
                break;
            case 1:
                return shots.filter(function(d){return d.mgn >= 1 && d.mgn <= 6});
                break;
            case 7:
                return shots.filter(function(d){return d.mgn >= 7 && d.mgn <= 14});
                break;
            case 15:
                return shots.filter(function(d){return d.mgn >= 15});
                break;
            default:
                return shots;
        }
    };

    for (var key in all_filters) {
        if (all_filters[key] instanceof Array) {
            if (all_filters[key].length > 0) {
                filtered_shots = filters[key](filtered_shots, all_filters[key]);
            }
        } else if (all_filters[key] !== '') {
            filtered_shots = filters[key](filtered_shots, all_filters[key]);
        }
    }
    return filtered_shots;
};

var ShotFilterCrossFilter = function(data) {
    this.data = data;
}
ShotFilterCrossFilter.prototype = new ShotFilter();
ShotFilterCrossFilter.prototype.constructor = ShotFilterCrossFilter;
ShotFilterCrossFilter.prototype.format_data = function(data, helper) {
    var shots_by_zone       = data.group();

    var shots_made_by_zone  = data.group();
    var shots_made          = shots_made_by_zone.reduceSum(function(d){return d.shm;});

    var zone_all            = shots_by_zone.all();
    var zone_made           = shots_made_by_zone.all();

    var all_zone_shots = helper._fillMissingZones(zone_all);
    var all_zone_shots = helper._appendMadeShots(zone_all, zone_made);

    return all_zone_shots;
}
ShotFilterCrossFilter.prototype.get_shots = function(data) {
    return data.group().all();
}


var ShotFilterEmpty = function(data) {
    this.data = data;
}
ShotFilterEmpty.prototype = new ShotFilter();
ShotFilterEmpty.prototype.constructor = ShotFilterEmpty;
ShotFilterEmpty.prototype.format_data = function(data, helper) {
    data = helper._fillMissingZones(data);
    return data;
}
ShotFilterEmpty.prototype.get_shots = function(data) {
    return data;
}



function appendMiniShotCharts(data, div_container, descriptor, href, titles, base_url) {
    var idx = 1;
    for (di in data) {
        var selector = 'shotchart_' + descriptor + idx;
        var si = di.replace(' ','-');

        $(div_container).append("<a href='" + base_url + "index.php/" + href + '/' + titles[di].permalink + "' class='" + selector + " link_shotchart span2'></a>");
        var cobj = new VORPED.court('.' + selector);
        
        var c = cobj.draw('court' + si,'');
        cobj.width(100);
        cobj.height(470*100/500);
        createMiniZones(cobj, data[di]);

        $("." + selector).append("<br />" + titles[di].name);

        idx = idx + 1;
    }

}

function createMiniZones(cobj, data) {

    var z = new Zone14(cobj, data, new ColorFillHelper());
    z.draw();
    z.show(0);
    z.filterobj = new ShotFilterEmpty(data);
    z.updateData();
    z.fill('fg', 0);
    z.label('fg');
    cobj.container.selectAll(".shotzone_14_labels").remove();
    cobj.container.selectAll(".shotzone_14_label_sec").remove();
}


var StatSummaryHelper = function(data){
    var obj = {};
    var data = data;
    var filterobj = new ShotFilterArray(data);
    obj.summarize = function(shots){
        shots_made = 0;
        points_made = 0;
        
        total_shots = shots.length;
        for (idx in shots) {
            shots_made += parseInt(shots[idx].shm);
            points_made += shots[idx].z <= 5 ? 3*parseInt(shots[idx].shm) : 2*parseInt(shots[idx].shm);
        }

        data = {};
        data.pps = Math.round(points_made*100/total_shots)/100;
        data.fg = Math.round(shots_made*1000/total_shots)/10;
        data.shot_count = total_shots;

        return data;
    };
    obj.filter = function(all_filters) {
        return filterobj.filter(all_filters);
    }

    return obj;
};
