import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { LoadContext } from '../LoadInput/context';

const Container = styled.div`
  width: 75%;
  background: #ccc;
  height: 100vh;
`;

const Map = () => {
  const { load } = useContext(LoadContext);
  const [mapState, setMap] = useState(null);

  useEffect(() => {
    const defaultLayers = window.platform.createDefaultLayers();
    const service = window.platform.getPlatformDataService();

    const map = new H.Map(
      document.getElementById('mapContainer'),
      defaultLayers.vector.normal.map,
      {
        zoom: 8,
        center: { lat: 40.0115, lng: -75.1327 }
      }
    );

    const style = new H.map.SpatialStyle();
    // create tile provider and layer that displays postcode boundaries
    const boundariesProvider = new H.service.extension.platformData.TileProvider(
      service,
      {
        layer: 'PSTLCB_GEN',
        level: 12
      },
      {
        resultType:
          H.service.extension.platformData.TileProvider.ResultType.POLYLINE,
        styleCallback: () => style
      }
    );
    const boundaries = new H.map.layer.TileLayer(boundariesProvider);
    map.addLayer(boundaries);

    const resizeHandler = () => {
      map.getViewPort().resize();
    };

    window.addEventListener('resize', resizeHandler);
    setMap(map);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (load.start && load.start.length && load.stops.length) {
      const stops = {};
      load.stops.forEach((stop, idx) => {
        stops[
          `waypoint${idx + 1}`
        ] = `geo!${stop.routePosition[0]},${stop.routePosition[1]}`;
      });

      const routingParameters = {
        // The routing mode:
        mode: 'fastest;truck',
        // The start point of the route:
        waypoint0: `geo!${load.start[0].routePosition[0]},${load.start[0].routePosition[1]}`,
        // The end point of the route:
        ...stops,
        // To retrieve the shape of the route we choose the route
        // representation mode 'display'
        representation: 'display'
      };

      const onResult = result => {
        let route;
        let routeShape;
        let linestring;
        if (result.response.route) {
          // Pick the first route from the response:
          [route] = result.response.route;
          // Pick the route's shape:
          routeShape = route.shape;

          // Create a linestring to use as a point source for the route line
          linestring = new H.geo.LineString();

          // Push all the points in the shape into the linestring:
          routeShape.forEach(point => {
            const parts = point.split(',');
            linestring.pushLatLngAlt(parts[0], parts[1]);
          });

          // Retrieve the mapped positions of the requested waypoints:
          const points = route.waypoint.map(point => {
            // Create a marker for the points:
            const { mappedPosition } = point;
            return new H.map.Marker({
              lat: mappedPosition.latitude,
              lng: mappedPosition.longitude
            });
          });

          // Create a polyline to display the route:
          const routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: 'blue', lineWidth: 3 }
          });

          // Add the route polyline and the two markers to the map:
          mapState.addObjects([routeLine, ...points]);

          // Set the map's viewport to make the whole route visible:
          mapState
            .getViewModel()
            .setLookAtData({ bounds: routeLine.getBoundingBox() });
        }
      };

      const routingService = window.platform.getRoutingService();

      routingService.calculateRoute(routingParameters, onResult, function(error) {
        alert(error.message);
      });
    }
  }, [load]);
  return <Container id="mapContainer" />;
};

export default Map;
