import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import s from './Tabs.css';
// import Link from '../Link'
// import history from './../../core/history'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
// import { httpGetJSON } from './../../core/HTTPUtils'

@observer
class SimpleChartComponent extends Component {
    componentDidMount() {
        this.option = {
            title: {
                text: '堆叠区域图',
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告'],
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                },
            ],
            yAxis: [
                {
                    type: 'value',
                },
            ],
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    areaStyle: { normal: {} },
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: { normal: {} },
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    areaStyle: { normal: {} },
                    data: [150, 232, 201, 154, 190, 330, 410],
                },
            ],
        };
    }

    onChartReady(chart) {
        setTimeout(() => {
            chart.hideLoading();
        }, 3000);
    }
    @observable option = undefined
    render() {
        return (
            <div className="examples">
                <div className="parent">
                    <label> render a Simple echart With <strong>option and height</strong>: </label>
                    {!!this.option ? <ReactEcharts
                        option={this.option }
                        style={{ height: '350px', width: '100%' }}
                        className="react_for_echarts"
                        showLoading={true}
                        onChartReady={this.onChartReady}
                        modules={
                            ['echarts/lib/chart/bar',
                                'echarts/lib/component/tooltip',
                                'echarts/lib/component/title']
                        }
                        /> : undefined}
                </div>
            </div>
        );
    }
}


export default SimpleChartComponent;
