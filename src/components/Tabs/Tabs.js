/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Tabs.css';
// import Link from '../Link'
// import history from './../../core/history'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { httpGetJSON } from './../../core/HTTPUtils'

@observer
class Tabs extends Component {

    componentDidMount() {
        console.log(this.config[this.selectedIndex], this.selectedIndex)
        this.selectedIndex = this.props.selectedTab || this.selectedIndex
        this.getTabData(this.selectedIndex)
    }
    getTabData(index) {
        console.log(index)
        httpGetJSON(this.config[index].navAPI)
            .then(data => {
                this.tabContent = data;
                this.selectedIndex = index
                this.childContent = this.props.children && React.cloneElement(
                    this.props.children[index],
                    { data: this.tabContent }
                );
            })
    }
    @observable selectedIndex = 0;
    @observable tabContent = undefined
    @observable childContent = undefined

    config = [
        { navText: 'A', navLink: 'name', navAPI: 'http://jsonplaceholder.typicode.com/posts/1' },
        { navText: 'B', navLink: 'B', navAPI: 'http://jsonplaceholder.typicode.com/posts/2' },
        { navText: 'C', navLink: 'C', navAPI: 'http://jsonplaceholder.typicode.com/posts/3' },
    ]
    navRender() {
        return this.config.map(
            (item, index) => <div
                className={s.tabItem}
                key={index}
                onClick={() => this.getTabData(index) }
                to = { item.navLink } >
                { item.navText }
            </div>)
    }
    render() {
        return (
            <div>
                <nav>
                    {this.navRender() }
                </nav>
                <section>
                    {this.childContent}
                </section>
            </div>
        );
    }
}
Tabs.propTypes = {
    selectedTab: PropTypes.string,
    children: PropTypes.array,
};

export default withStyles(s)(Tabs);
