import React from 'react';

const ChartCard = ({ title, children }) => {
    return (
        <div className="card h-full">
            <h3 className="text-gray-800 font-semibold mb-6">{title}</h3>
            <div className="w-full h-[300px]">
                {children}
            </div>
        </div>
    );
};

export default ChartCard;
