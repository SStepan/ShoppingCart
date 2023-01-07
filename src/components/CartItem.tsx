import { Button, Stack } from "react-bootstrap"
import { CardHeaderProps } from "react-bootstrap/esm/CardHeader"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
    id: number
    quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart, cartItems } = useShoppingCart()
    const item = storeItems.find(t => t.id === id);
    if (item == null) return null;

    return (
        <Stack direction="horizontal" gap={2}>
            <img src={item.imgUrl} style={{width: '125px', height: '75px', objectFit:'cover'}}/>
            <div className="me-auto">
                {item.name} {quantity > 1 && <span className="text-muted" style={{fontSize: '0.65rem'}}>x{quantity}</span>}
                <div className="text-muted" style={{fontSize: '0.75rem'}}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div>{formatCurrency(item.price * quantity)}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(id)}>&times;</Button>
        </Stack>
    )
}