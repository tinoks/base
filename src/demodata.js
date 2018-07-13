map.on('load', function () {
KORTxyz.func.addLayer({
        'id': 'TestPolygoner',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': { "type": "FeatureCollection", "features": [ { "type": "Feature", "properties": {"areaName":"bob"}, "geometry": { "type": "Polygon", "coordinates": [ [ [ 10.3546142578125, 57.50106890607948 ], [ 9.854736328125, 57.347273783306676 ], [ 10.0140380859375, 57.21365975961655 ], [ 10.1239013671875, 57.115367637202795 ], [ 10.360107421875, 57.282011964547515 ], [ 10.3546142578125, 57.50106890607948 ] ] ] } }, { "type": "Feature", "properties": {"areaName":"bertha"}, "geometry": { "type": "Polygon", "coordinates": [ [ [ 9.82177734375, 56.689425036496004 ], [ 9.20654296875, 56.547372053078966 ], [ 9.5416259765625, 56.26471054351882 ], [ 9.876708984375, 56.26471054351882 ], [ 10.2447509765625, 56.480695390196296 ], [ 9.82177734375, 56.689425036496004 ] ] ] } } ] },
        },
        'layout': {},
        'paint': {
            'fill-color': '#1b9e77',
            'fill-opacity': 0.8
        }
    })

KORTxyz.func.addLayer({
        'id': 'TestLinjer',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'data': { "type": "FeatureCollection", "features": [ { "type": "Feature", "properties": {"length":44}, "geometry": { "type": "LineString", "coordinates": [ [ 12.052001953125, 55.93074077571185 ], [ 12.249755859375, 55.801280971180454 ], [ 12.095947265625, 55.62179298063115 ], [ 12.293701171875, 55.63419794625838 ], [ 12.3486328125, 55.8444821875883 ] ] } }, { "type": "Feature", "properties": {"length":34}, "geometry": { "type": "LineString", "coordinates": [ [ 11.678466796874998, 55.57834467218206 ], [ 11.876220703124998, 55.397831459360326 ], [ 11.656494140625, 55.397831459360326 ], [ 11.84326171875, 55.19141243527063 ] ] } } ] }        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#d95f02",
            "line-width": 4
        }
    })


});