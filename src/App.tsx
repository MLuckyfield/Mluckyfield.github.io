import React, { useState, useEffect } from 'react';
import './index.css';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import product1 from './images/product1.jpg'
import product2 from './images/product2.jpg'
import product3 from './images/product3.jpg'
import logo from './images/starbucks_logo.svg'

type Product = {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  { id: 1, name: 'カティ カティ ブレンド', price: 1780, imageSrc:product1},
  { id: 2, name: 'ケニア　キリンヤガ', price: 1780, imageSrc:product2},
  { id: 3, name: 'トリビュート ブレンド®', price: 2000, imageSrc:product3 },
];

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [count,setCount] =useState<number>();

   useEffect(()=>{
      setCount(cart.reduce((total, item) => total + item.quantity, 0))
   },[cart])

  const addToCart = (product: Product) => {
    const existingCartItem = cart.find((item) => item.product.id === product.id);

    if (existingCartItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product: Product) => {
    const updatedCart = cart.filter((item) => item.product.id !== product.id);
    setCart(updatedCart);
  };

  return (
    <div>
      <div className="bg-white ">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="mt-4 flex justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          <img
            src={logo}
            className="shadow rounded-full max-w-full h-auto align-middle border-none inline-block"
          /> Product List
          </h2>
        </div>
        <div className="relative inline-flex w-fit">
            <div
              className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-green-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
              {count}
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setOpen(true)}><ShoppingCartIcon className="h-6 w-6" aria-hidden="true"/></button>
        </div>
      </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div>
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price.toLocaleString("en-US")} 円</p>
                </div>
              </div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => addToCart(product)}>カートに入れる</button>
            </div>
          ))}
        </div>
      </div>
    </div>
      <Cart cart={cart} open={open} setOpen={setOpen} removeFromCart={removeFromCart}/>
    </div>
  );
};

export default App;

interface Cart{
  cart:CartItem[],
  open:boolean,
  setOpen:React.Dispatch<React.SetStateAction<boolean>>,
  removeFromCart:(product:Product)=>void
}

const Cart:React.FC<Cart> =({cart,open,setOpen,removeFromCart})=> {

  const [cartValue,setCartValue]=useState<number>()

  useEffect(()=>{
    setCartValue(cart.reduce((total, item) => total + item.product.price * item.quantity, 0))
  },[cart])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((product) => (
                              <li key={product.product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.product.imageSrc}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href='#'>{product.product.name}</a>
                                      </h3>
                                      <p className="ml-4">{product.product.price.toLocaleString("en-US")} 円</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">数量 {product.quantity}</p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => removeFromCart(product.product)}
                                      >
                                        削除
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>税込合計金額（税抜本体価格）</p>
                        <p>{cartValue?cartValue.toLocaleString("en-US"):0} 円</p>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                        >
                          購入に進む
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
