import React from 'react'
import './../App.css';
import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

function LineGraph({data}) {
    return (
        <>
            <ResponsiveContainer width="50%" aspect={2}>
                <LineChart data={data} margin={{ right: 0 }}>
                    <CartesianGrid />
                    <XAxis dataKey="date" 
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="unit" name='calories consumed'
                        stroke="black" activeDot={{ r: 8 }} />
                    <Line dataKey="dailyCalorieGoal" name='daily goal'
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default LineGraph;