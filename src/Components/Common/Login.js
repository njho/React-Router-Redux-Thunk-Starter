import React, {Component} from 'react';
import agent from '../../Helpers/agent';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Icon from 'react-icon-base';

import history from '../../Helpers/history';
import {geoPath, geoMercator} from 'd3-geo';


const mapStateToProps = state => ({
    ...state.auth,
    beautifulUnsplash: state.common.beautifulUnsplash,
    register: state.common.register,

});

const mapDispatchToProps = dispatch => ({
    getBeautifulUnsplash: () => dispatch(agent.common.beautifulUnsplash()),
    updateFieldAuth: (key, value) =>
        dispatch({type: 'UPDATE_FIELD_AUTH', key: key, value}),
    onSubmit: (email, password) => {
        dispatch({type: 'LOGIN', payload: agent.Auth.login(email, password)})
    },
    onRegister: (name, vendor, email, password, checked) => {
        if (checked === true) {
            dispatch({type: 'REGISTER', payload: agent.Auth.register(email, password), name: name, vendor: vendor})
        }
    },
    onUnload: () =>
        dispatch({type: 'LOGIN_PAGE_UNLOADED'})
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            message: '',
            mode: 'write',
            svgHeight: 150,
            geojson: {
                "type": "LineString",
                "coordinates": [
                    [
                        -101.744384765625,
                        39.32155002466662
                    ],
                    [
                        -101.5521240234375,
                        39.330048552942415
                    ],
                    [
                        -101.40380859375,
                        39.330048552942415
                    ],
                    [
                        -101.33239746093749,
                        39.364032338047984
                    ],
                    [
                        -101.041259765625,
                        39.36827914916011
                    ],
                    [
                        -100.975341796875,
                        39.30454987014581
                    ],
                    [
                        -100.9149169921875,
                        39.24501680713314
                    ],
                    [
                        -100.843505859375,
                        39.16414104768742
                    ],
                    [
                        -100.8050537109375,
                        39.104488809440475
                    ],
                    [
                        -100.491943359375,
                        39.10022600175347
                    ],
                    [
                        -100.43701171875,
                        39.095962936305476
                    ],
                    [
                        -100.338134765625,
                        39.095962936305476
                    ],
                    [
                        -100.1953125,
                        39.027718840211605
                    ],
                    [
                        -100.008544921875,
                        39.01064750994083
                    ],
                    [
                        -99.86572265625,
                        39.00211029922512
                    ],
                    [
                        -99.6844482421875,
                        38.97222194853654
                    ],
                    [
                        -99.51416015625,
                        38.929502416386605
                    ],
                    [
                        -99.38232421875,
                        38.92095542046727
                    ],
                    [
                        -99.3218994140625,
                        38.89530825492018
                    ],
                    [
                        -99.1131591796875,
                        38.86965182408357
                    ],
                    [
                        -99.0802001953125,
                        38.85682013474361
                    ],
                    [
                        -98.82202148437499,
                        38.85682013474361
                    ],
                    [
                        -98.44848632812499,
                        38.84826438869913
                    ],
                    [
                        -98.20678710937499,
                        38.84826438869913
                    ],
                    [
                        -98.02001953125,
                        38.8782049970615
                    ],
                    [
                        -97.635498046875,
                        38.87392853923629
                    ]
                ]
            },
            verbs: ["Explore", "Live", "Inspire", "Define", "Discover", "Celebrate"],
            thing: "Explore",
            whereYou: "Where You",
            verbIndex: 0,
            delay: "2000"

        }
    }

    /*TODO: MAKE DRY CODE*/
    changeEmail = ev => this.props.updateFieldAuth('email', ev.target.value);
    changePassword = ev => this.props.updateFieldAuth('password', ev.target.value);
    changeName = ev => this.props.updateFieldAuth('name', ev.target.value);
    changeVendor = ev => this.props.updateFieldAuth('vendor', ev.target.value);

    tryLogin = (email, password) => ev => {
        ev.preventDefault();
        this.props.onSubmit(email, password);
    };

    componentWillMount() {
        this.props.getBeautifulUnsplash();
        this.timeout = setTimeout(() => this.letterChoreographer(), this.state.delay);
    }

    componentDidMount() {
        const projection = geoMercator();
        const pathGenerator = geoPath().projection(projection)
    }


    componentWillUnmount() {
        this.props.onUnload();
    }

    letterChoreographer() {

        console.log(this.state.mode);
        switch (this.state.mode) {
            case 'write' :
                console.log(this.state.thing);
                if(this.state.thing === 'Celebrate') {
                    this.setState({
                        ...this.state,
                        message: this.state.message + this.state.thing.slice(0, 1),
                        thing: this.state.thing.substr(1),
                        whereYou: ''
                    })
                }

                this.setState({
                    ...this.state,
                    message: this.state.message + this.state.thing.slice(0, 1),
                    thing: this.state.thing.substr(1)
                });

                if (this.state.thing.length === 0 && this.state.verbIndex === (this.state.verbs.length - 1)) {
                    window.clearTimeout(this.timeout);
                    return;
                }

                if (this.state.thing.length === 0) {
                    this.setState({
                        ...this.state,
                        mode: 'delete',
                        delay: 2000
                    })

                } else {
                    this.setState({
                        ...this.state,
                        delay: 32 + Math.round(Math.random() * 10)
                    })

                }
                break;

            case 'delete' :

                this.setState({
                    ...this.state,
                    message: this.state.message.slice(0, -1)
                });

                if (this.state.message.length === 0) {
                    let newVerbIndex = this.state.verbIndex + 1;

                    this.setState({
                        ...this.state,
                        mode: 'write',
                        delay: 1000,
                        verbIndex: newVerbIndex,
                        thing: this.state.verbs[newVerbIndex]
                    });
                } else {
                    this.setState({
                        ...this.state,
                        mode: 'delete',
                        delay: 32 + Math.round(Math.random() * 200)
                    });
                }
                break;
        }
        this.timeout = setTimeout(() => this.letterChoreographer(), this.state.delay);
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;
        const name = this.props.name;
        const vendor = this.props.vendor;


        const projection = geoMercator().fitExtent([[0, 0], [150, this.state.svgHeight]], this.state.geojson);
        const pathGenerator = geoPath().projection(projection)


        return (
            <div className="login-wrapper" style={{
                backgroundImage: `url(${this.props.beautifulUnsplash})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',

            }}>

                <div className={'title'}>
                    {this.state.whereYou} {this.state.message}
                    <br/>
                    Adventure.
                </div>


                <div className="login-sidebar" style={{backgroundColor: 'rgba(240,240,240,0.2)'}}>

                    <div className={'login-social'}>

                        <Icon className={'social-icon'} viewBox="0 0 40 40" size={25}>
                            <g>
                                <path
                                    d="m35 8.8v22.5c0 2.1-1.7 3.7-3.7 3.7h-22.5c-2.1 0-3.8-1.6-3.8-3.7v-22.5c0-2.1 1.7-3.8 3.8-3.8h22.5c2 0 3.7 1.7 3.7 3.8z m-15 5c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.3 6.2 6.3 6.3-2.9 6.3-6.3-2.9-6.2-6.3-6.2z m12.5-1.3v-3.7c0-0.8-0.5-1.3-1.2-1.3h-3.8c-0.7 0-1.2 0.5-1.2 1.3v3.7c0 0.7 0.5 1.3 1.2 1.3h3.8c0.7 0 1.2-0.6 1.2-1.3z m-1.2 20c0.7 0 1.2-0.5 1.2-1.2v-13.8h-4.1c0.3 0.8 0.4 1.6 0.4 2.5 0 2.3-0.9 4.5-2.5 6.2s-4 2.6-6.3 2.6-4.5-1-6.2-2.6-2.5-3.9-2.5-6.2c0-0.9 0.1-1.7 0.3-2.5h-4.1v13.8c0 0.7 0.6 1.2 1.3 1.2h22.5z"/>
                            </g>
                        </Icon>
                        <Icon className={'social-icon'} viewBox="0 0 40 40" size={25}>
                            <g>
                                <path
                                    d="m22.5 15h5l-0.6 5h-4.4v15h-6.5v-15h-3.5v-5h3.5v-3.4c0-4.2 1.8-6.6 7.1-6.6h4.4v5h-2.7c-2.1 0-2.3 0.7-2.3 2v3z m3.3 3.8l0.3-2.5h-4.8v-4.3c0-0.7 0-1.6 0.7-2.3 0.7-0.9 1.9-1 2.8-1h1.5v-2.5h-3.2c-2.2 0-3.8 0.5-4.7 1.5-0.7 0.8-1.1 2.1-1.1 3.9v4.6h-3.5v2.5h3.5v15h4v-15h4.5z"/>
                            </g>
                        </Icon>
                        <Icon className={'social-icon'} viewBox="0 0 40 40" size={25}>
                            <g>
                                <path
                                    d="m14.3 30h-4.3v-13.4h4.3v13.4z m-2-15.4c-1.4 0-2.3-1-2.3-2.3 0-1.3 0.9-2.3 2.3-2.3s2.3 1 2.3 2.3c0 1.3-0.9 2.3-2.3 2.3z m12.8 1.7c2.8 0 4.9 1.9 4.9 5.9v7.8h-4.3v-7.3c0-1.8-0.6-2.9-2.2-2.9-1.2 0-1.9 0.7-2.2 1.5-0.1 0.3-0.1 0.7-0.1 1.1v7.6h-4.3v-13.4h4.3v1.9c0.6-0.8 1.6-2.2 3.9-2.2z m7.5-11.3c1.4 0 2.4 1 2.4 2.3v25.1c0 1.4-1 2.6-2.4 2.6h-25c-1.4 0-2.6-1.2-2.6-2.6v-25.1c0-1.3 1.2-2.3 2.6-2.3h25z m-0.3 27.5c0.1 0 0.2-0.1 0.2-0.2v-24.6c0-0.1-0.1-0.2-0.2-0.2h-24.6s-0.2 0.1-0.2 0.2v24.6s0.1 0.2 0.2 0.2h24.6z"/>
                            </g>
                        </Icon>&emsp;
                        <Icon className={'social-icon'} viewBox="0 0 40 40" size={25}>
                            <g>
                                <path
                                    d="m20.7 7.5h-1.4c-5.1 0-9.2 0.2-13.1 0.3h-0.2c-1.8 0-3.3 1.7-3.3 3.8v0.2c-0.1 2.7-0.2 5.5-0.2 8.2 0 2.7 0.1 5.5 0.2 8.1v0.3c0 1.1 0.4 2 1.1 2.8 0.7 0.7 1.4 1 2.2 1h0.2c4 0.1 8.4 0.3 12.9 0.3h1.8c4.5 0 8.8-0.2 12.9-0.3h0.2c0.8 0 1.5-0.3 2.2-1 0.7-0.8 1.1-1.7 1.1-2.8v-0.3c0.1-2.6 0.2-5.3 0.2-8.1 0-2.8-0.1-5.5-0.2-8.2v-0.2c0-2.1-1.5-3.9-3.3-3.9h-0.2c-3.8-0.1-8-0.2-13.1-0.2z m0-2.5c4.5 0 9 0 13.3 0.2 3.2 0 5.8 2.8 5.8 6.4 0.1 2.8 0.2 5.6 0.2 8.4s-0.1 5.5-0.2 8.4c0 3.5-2.6 6.3-5.8 6.3-4.3 0.2-8.7 0.3-13.1 0.3h-1.8c-4.4 0-8.8-0.1-13.1-0.3-3.2 0-5.8-2.8-5.8-6.3-0.1-2.9-0.2-5.6-0.2-8.4s0.2-5.5 0.3-8.4c0-3.5 2.5-6.4 5.7-6.4 4.3-0.1 8.8-0.2 13.3-0.2h1.4z m-4.5 22.7v-15.4l11.3 7.7z"/>
                            </g>
                        </Icon>
                    </div>

                    <div className="modal-container login">
                        <div className="modal-header">
                            <h3 className="header-title">Account</h3>
                            <span className="header-sub">Create an Account or Login to Journey</span>

                            <form onSubmit={this.tryLogin(email, password)}>
                                <div style={{marginTop: '15px'}} className="button-general"
                                     onClick={() => history.push('/home')}>Login
                                    with Facebook
                                </div>
                                <button type="submit" className="nodisplay"></button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
