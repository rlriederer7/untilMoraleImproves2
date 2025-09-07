import React, { useEffect } from "react";
import { useCoefficients } from "../hooks/useCoefficients";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const CoefficientsPage = () => {
    const { coefficients, loading, error, fetchCoefficients, clearCoefficients } = useCoefficients();

    useEffect(() => {
        fetchCoefficients();
    }, []);

    const getChartData = () => {
        if (!coefficients?.feature_ranking) return [];

        return coefficients.feature_ranking.map(item => ({
            feature: item.feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            coefficient: item.coefficient,
            magnitude: item.magnitude,
            impact: item.impact
        }))
    };

    const getBarColor = (coefficient) => {
        return coefficient > 0 ? '#ff6b6b' : '#51cf66';
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div style={{
                    backgroundColor: 'white',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    color: 'black'
                }}>
                    <p style={{ margin: '0 0 5px 0' }}><strong>{label}</strong></p>
                    <p style={{ margin: '0 0 5px 0' }}>Coefficient: {data.coefficient.toFixed(4)}</p>
                    <p style={{ margin: '0 0 5px 0' }}>Impact: {data.impact}</p>
                    <p style={{ margin: '0' }}>Magnitude: {data.magnitude.toFixed(4)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div style={{ maxWidth: '1800px', margin: '0 auto', padding: '20px' }}>
            <h2>Churn Prediction Model Coefficients</h2>

            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={fetchCoefficients}
                    disabled={loading}
                    style={{ padding: '10px 20px', marginRight: '10px' }}
                >
                    {loading ? 'Loading...' : 'Refresh Coefficients'}
                </button>
            </div>

            {error && (
                <div style={{
                    color: 'red',
                    margin: '10px 0',
                    padding: '10px',
                    border: '1px solid red',
                    borderRadius: '4px',
                    backgroundColor: '#ffeeee'
                }}>
                    Error: {error}
                </div>
            )}

            {loading && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <p>Loading coefficients...</p>
                </div>
            )}

            {coefficients && !loading && (
                <>
                    <div style={{
                        margin: '20px 0',
                        padding: '15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        color: 'black'
                    }}>
                        <h3>Model Information</h3>
                        <p><strong>Total Features:</strong> {Object.keys(coefficients.coefficients).length}</p>

                        <div style={{ marginTop: '15px' }}>
                            <h4>Legend:</h4>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: '#ff6b6b',
                                        borderRadius: '3px'
                                    }}></div>
                                    <span>Increases Churn Risk</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <div style={{
                                        width: '20px',
                                        height: '20px',
                                        backgroundColor: '#51cf66',
                                        borderRadius: '3px'
                                    }}></div>
                                    <span>Decreases Churn Risk</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: '600px', width: '150%', marginLeft: '-25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '100%', height: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={getChartData()}
                                    margin={{
                                        top: 20,
                                        right: 140,
                                        left: 100,
                                        bottom: 120
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="feature"
                                        angle={-45}
                                        textAnchor="end"
                                        height={120}
                                        interval={0}
                                        fontSize={12}
                                    />
                                    <YAxis
                                        label={{ value: 'Coefficient Value', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                                        width={80}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="coefficient">
                                        {getChartData().map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getBarColor(entry.coefficient)} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <h3>Top 5 Most Impactful Features</h3>
                        <div style={{ display: 'grid', gap: '10px' }}>
                            {coefficients.feature_ranking?.slice(0, 5).map((feature, index) => (
                                <div
                                    key={feature.feature}
                                    style={{
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div>
                                        <strong>#{index + 1}: {feature.feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</strong>
                                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                                            {feature.impact}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div>Coefficient: {feature.coefficient.toFixed(4)}</div>
                                        <div>Magnitude: {feature.magnitude.toFixed(4)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {coefficients && !coefficients.feature_ranking && (
                <div style={{
                    margin: '20px 0',
                    padding: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <p>No feature coefficient data available.</p>
                </div>
            )}

        </div>
    );
};

export default CoefficientsPage;