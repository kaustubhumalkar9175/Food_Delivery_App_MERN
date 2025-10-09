import React, {createContext, useReducer} from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type){
        case "ADD":{
            return [...state, {id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img}]
        }

        default:{
            console.log("Error in Reducer");
            return state;
        }
    }
}

export const CartProvider = ({children}) => {
    const[state,dispatch] = useReducer(reducer,[])
    return(
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    )
}

export const useCart = () => React.useContext(CartStateContext);
export const useDispatchCart = () => React.useContext(CartDispatchContext);