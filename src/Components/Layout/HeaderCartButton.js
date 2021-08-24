import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'

import styles from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)

  const { item } = cartCtx
  const numberOfCartItems = cartCtx.item.reduce((curNum, item) => {
    return curNum + item.amount
  }, 0)

  const btnClasses = `${styles.button} ${
    buttonIsHighlighted ? styles.bump : ''
  }`

  useEffect(() => {
    if (item.length === 0) {
      return
    }

    setButtonIsHighlighted(true)
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [item])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
