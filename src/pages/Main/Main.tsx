import GoogleMapReact from 'google-map-react';
const Main = () => {


    return(
        <div style={{ height: '100vh', width: '100%' }}>
    <GoogleMapReact
        bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
    defaultCenter={this.props.center}
    defaultZoom={this.props.zoom}
    >
    <AnyReactComponent
        lat={59.955413}
    lng={30.337844}
    text="My Marker"
        />
        </GoogleMapReact>
        </div>
    );
};

export default Main;
