import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orderDetails, setOrderDetails] = useState(null);
    const [totalOrderCost, setTotalOrderCost] = useState(0);

    return (
        <OrderContext.Provider value={{ orderDetails, setOrderDetails, totalOrderCost, setTotalOrderCost }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrderContext = () => {
    return useContext(OrderContext);
};
